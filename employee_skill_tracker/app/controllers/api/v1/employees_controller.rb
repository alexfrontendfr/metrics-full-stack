module Api
  module V1
    class EmployeesController < ApplicationController
      before_action :set_user
      before_action :set_employee, only: [:show, :update, :destroy]

      def index
        begin
          @employees = @current_user.employees.includes(:skills, :metrics)
          
          render json: @employees.map { |employee| format_employee(employee) }
        rescue StandardError => e
          Rails.logger.error("Error fetching employees: #{e.message}")
          render json: { error: 'Error fetching employees' }, status: :internal_server_error
        end
      end

      def show
        render json: format_employee(@employee)
      rescue StandardError => e
        Rails.logger.error("Error fetching employee: #{e.message}")
        render json: { error: 'Error fetching employee' }, status: :internal_server_error
      end

      def create
        @employee = @current_user.employees.build(employee_params)

        if @employee.save
          render json: format_employee(@employee), status: :created
        else
          render json: { errors: @employee.errors.full_messages }, 
                 status: :unprocessable_entity
        end
      end

      def update
        if @employee.update(employee_params)
          render json: format_employee(@employee)
        else
          render json: { errors: @employee.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      def destroy
        @employee.destroy
        head :no_content
      end

      def top_performers
        @top_employees = @current_user.employees
          .joins(:metrics)
          .select('employees.*, AVG(metrics.value) as performance')
          .group('employees.id')
          .order('performance DESC')
          .limit(5)
          .includes(:skills)

        render json: @top_employees.map { |employee| format_employee(employee, true) }
      rescue StandardError => e
        Rails.logger.error("Error fetching top performers: #{e.message}")
        render json: { error: 'Error fetching top performers' }, status: :internal_server_error
      end

      private

      def set_user
        @current_user = current_user
      end

      def set_employee
        @employee = @current_user.employees.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Employee not found' }, status: :not_found
      end

      def format_employee(employee, include_performance = false)
        {
          id: employee.id,
          name: employee.name,
          department: employee.department,
          role: employee.role,
          start_date: employee.start_date,
          performance: include_performance ? employee.performance.to_f.round(2) : calculate_performance(employee),
          skills: employee.skills.order(proficiency: :desc).map { |skill|
            {
              id: skill.id,
              name: skill.name,
              proficiency: skill.proficiency,
              level: skill_level_for_proficiency(skill.proficiency)
            }
          }
        }
      end

      def calculate_performance(employee)
        employee.metrics.average(:value)&.round(2) || 0
      end

      def skill_level_for_proficiency(proficiency)
        case proficiency
        when 0..25 then 'Beginner'
        when 26..50 then 'Intermediate'
        when 51..75 then 'Advanced'
        else 'Expert'
        end
      end

      def employee_params
        params.require(:employee).permit(:name, :department, :role, :start_date)
      end
    end
  end
end