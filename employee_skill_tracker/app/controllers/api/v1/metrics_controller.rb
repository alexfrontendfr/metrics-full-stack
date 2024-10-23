module Api
  module V1
    class MetricsController < ApplicationController
      skip_before_action :authenticate_user!, only: [:index], if: :public_request?
      before_action :set_user, except: [:index]

      def index
        begin
          @metrics = if public_request?
            Metric.includes(:employee)
                  .order(created_at: :desc)
                  .limit(params[:limit] || 5)
          else
            authenticate_user!
            metrics_scope = current_user.metrics.includes(:employee)
            metrics_scope = apply_filters(metrics_scope)
            metrics_scope.order(timestamp: :desc)
                       .page(params[:page])
                       .per(20)
          end

          render json: {
            metrics: @metrics.map { |metric| format_metric(metric) },
            meta: pagination_meta(@metrics)
          }
        rescue StandardError => e
          Rails.logger.error("Metrics fetch error: #{e.message}")
          render json: { error: e.message }, status: :internal_server_error
        end
      end

      def create
        begin
          @metric = current_user.metrics.build(metric_params)
          @metric.timestamp ||= Time.current

          if @metric.save
            render json: format_metric(@metric), status: :created
          else
            render json: { errors: @metric.errors.full_messages }, 
                   status: :unprocessable_entity
          end
        rescue StandardError => e
          Rails.logger.error("Metric creation error: #{e.message}")
          render json: { error: e.message }, status: :internal_server_error
        end
      end

      private

      def set_user
        @current_user = current_user
      end

      def apply_filters(scope)
        scope = scope.where(employee_id: params[:employee_id]) if params[:employee_id].present?
        if params[:start_date].present? && params[:end_date].present?
          scope = scope.where(timestamp: Time.zone.parse(params[:start_date])..Time.zone.parse(params[:end_date]))
        end
        scope
      end

      def format_metric(metric)
        {
          id: metric.id,
          name: metric.name,
          value: metric.value,
          level: metric.level,
          timestamp: metric.timestamp,
          evidence: metric.evidence,
          employee: {
            id: metric.employee.id,
            name: metric.employee.name,
            department: metric.employee.department,
            role: metric.employee.role
          }
        }
      end

      def metric_params
        params.require(:metric).permit(:name, :value, :level, :timestamp, :employee_id, :evidence)
      end

      def public_request?
        params[:public] == 'true' || params[:limit].present?
      end

      def pagination_meta(metrics)
        return {} if public_request?
        
        {
          current_page: metrics.current_page,
          total_pages: metrics.total_pages,
          total_count: metrics.total_count,
          per_page: metrics.limit_value
        }
      end
    end
  end
end