module Api
  module V1
    class RegistrationsController < ApplicationController
      skip_before_action :authenticate_user!, only: [:create]
      skip_before_action :verify_authenticity_token

      def create
        @user = User.new(user_params)
        if @user.save
          token = JWT.encode(
            { user_id: @user.id, exp: 24.hours.from_now.to_i },
            Rails.application.credentials.secret_key_base
          )
          
          render json: {
            data: {
              user: @user.as_json(only: [:id, :email]),
              token: token
            },
            status: { code: 200, message: 'Registered successfully' }
          }, status: :created
        else
          render json: {
            status: { message: "Registration failed" },
            errors: @user.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
  end
end