require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Server
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
<<<<<<< HEAD
    config.api_only = true
    # CORS の設定を追加
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000'  # フロントエンドのオリジンを指定
        resource '*',                    # すべてのリソースを許可
          headers: :any,                # すべてのヘッダーを許可
          methods: [:get, :post, :put, :patch, :delete, :options, :head], # 許可するHTTPメソッド
          credentials: true             # 必要に応じて設定（Cookie 送信など）
      end
    end
=======
    config.api_only = false

    # Middleware for sessions and cookies
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore, key: '_your_app_session'

    # Ensure session store configuration
    config.session_store :cookie_store, key: '_your_app_session'
>>>>>>> origin/main
  end
end
