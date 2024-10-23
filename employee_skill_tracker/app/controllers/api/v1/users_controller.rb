module Api
  module V1
    class UsersController < ApplicationController
      def current
        render json: {
          user: current_user.as_json(only: [:id, :email])
        }, status: :ok
      end
    end
  end
end