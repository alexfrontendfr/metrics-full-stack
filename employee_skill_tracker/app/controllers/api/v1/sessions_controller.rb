module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_user!, only: [:create]
      skip_before_action :verify_authenticity_token

      def create
        user = User.find_by(email: params[:user][:email])
        if user&.valid_password?(params[:user][:password])
          token = generate_jwt_token(user)
          
          render json: {
            data: {
              user: user.as_json(only: [:id, :email]),
              token: token
            },
            status: { code: 200, message: 'Logged in successfully' }
          }, status: :ok
        else
          render json: {
            status: { message: "Login failed" },
            error: "Invalid email or password"
          }, status: :unauthorized
        end
      end

      def destroy
        render json: {
          status: { code: 200, message: "Logged out successfully" }
        }, status: :ok
      end

      private

      def generate_jwt_token(user)
        JWT.encode(
          {
            user_id: user.id,
            exp: 24.hours.from_now.to_i,
            jti: user.jti
          },
          Rails.application.credentials.secret_key_base,
          'HS256'
        )
      end
    end
  end
end