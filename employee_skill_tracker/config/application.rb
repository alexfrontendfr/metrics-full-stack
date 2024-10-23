require_relative "boot"
require "rails/all"
require "devise"

Bundler.require(*Rails.groups)

module EmployeeSkillTracker
  class Application < Rails::Application
    config.load_defaults 7.2
    config.autoload_lib(ignore: %w[assets tasks])
    config.session_store :cookie_store, key: '_employee_skill_tracker_session'
    config.api_only = true
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use config.session_store, config.session_options
    
    # Add CORS middleware
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3001'
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          expose: ['Authorization'],
          credentials: true,
          max_age: 1728000
      end
    end
  end
end