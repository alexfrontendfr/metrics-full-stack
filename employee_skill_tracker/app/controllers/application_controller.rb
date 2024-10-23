class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :authenticate_user!

  private

  def authenticate_user!
    return if skip_auth_paths?

    token = extract_token
    if token
      begin
        decoded = JWT.decode(
          token, 
          Rails.application.credentials.secret_key_base,
          true, 
          { algorithm: 'HS256' }
        )[0]
        @current_user_id = decoded['user_id']
        @current_user = User.find(@current_user_id)
      rescue JWT::DecodeError
        render json: { error: 'Invalid token' }, status: :unauthorized
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :unauthorized
      end
    else
      render json: { error: 'No token provided' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end

  def extract_token
    auth_header = request.headers['Authorization']
    return nil unless auth_header
    auth_header.split(' ').last if auth_header.start_with?('Bearer ')
  end

  def skip_auth_paths?
    devise_controller? ||
    (controller_path == 'api/v1/sessions' && action_name == 'create') ||
    (controller_path == 'api/v1/registrations' && action_name == 'create') ||
    (controller_path == 'api/v1/metrics' && action_name == 'index' && params[:public] == 'true') ||
    request.method == 'OPTIONS'
  end
end