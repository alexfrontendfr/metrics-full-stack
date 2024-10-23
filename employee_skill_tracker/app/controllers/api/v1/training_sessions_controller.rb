module Api
  module V1
    class TrainingSessionsController < ApplicationController
      before_action :set_employee
      before_action :set_training_session, only: [:update, :destroy]

      def create
        @training_session = @employee.training_sessions.build(training_session_params)
        if @training_session.save
          render json: @training_session, status: :created
        else
          render json: { errors: @training_session.errors.full_messages }, 
                 status: :unprocessable_entity
        end
      end

      def update
        if @training_session.update(training_session_params)
          render json: @training_session
        else
          render json: { errors: @training_session.errors.full_messages }, 
                 status: :unprocessable_entity
        end
      end

      def destroy
        @training_session.destroy
        head :no_content
      end

      private

      def set_employee
        @employee = current_user.employees.find(params[:employee_id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Employee not found' }, status: :not_found
      end

      def set_training_session
        @training_session = @employee.training_sessions.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Training session not found' }, status: :not_found
      end

      def training_session_params
        params.require(:training_session).permit(:name, :date, :skill_id)
      end
    end
  end
end