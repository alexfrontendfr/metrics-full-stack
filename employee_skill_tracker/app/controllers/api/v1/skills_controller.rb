module Api
  module V1
    class SkillsController < ApplicationController
      before_action :set_employee
      before_action :set_skill, only: [:update, :destroy]

      def create
        @skill = @employee.skills.build(skill_params)
        if @skill.save
          render json: @skill, status: :created
        else
          render json: { errors: @skill.errors.full_messages }, 
                 status: :unprocessable_entity
        end
      end

      def update
        if @skill.update(skill_params)
          render json: @skill
        else
          render json: { errors: @skill.errors.full_messages }, 
                 status: :unprocessable_entity
        end
      end

      def destroy
        @skill.destroy
        head :no_content
      end

      private

      def set_employee
        @employee = current_user.employees.find(params[:employee_id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Employee not found' }, status: :not_found
      end

      def set_skill
        @skill = @employee.skills.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Skill not found' }, status: :not_found
      end

      def skill_params
        params.require(:skill).permit(:name, :proficiency)
      end
    end
  end
end
