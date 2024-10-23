Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users,
        controllers: {
          sessions: 'api/v1/sessions',
          registrations: 'api/v1/registrations'
        },
        path: '',
        path_names: {
          sign_in: 'login',
          sign_out: 'logout',
          registration: 'register'
        }

      get 'current_user', to: 'users#current'
      
      resources :metrics, only: [:index, :create]
      resources :employees do
        collection do
          get :top_performers
        end
        member do
          get :skills
        end
        resources :skills, only: [:create, :update, :destroy]
        resources :training_sessions, only: [:create, :update, :destroy]
      end
    end
  end
end