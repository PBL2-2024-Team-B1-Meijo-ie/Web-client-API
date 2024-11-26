Rails.application.routes.draw do
  namespace :api do
    resources :available_bus_stops, only: [:index]
    resources :reservations, only: [:index]
    resources :buses, only: [:index]
    resources :blebeecon, only: [:index]
    resources :raspi, only: [:index]
  end
end
