Rails.application.routes.draw do
  namespace :api do
    resources :available_bus_stops, only: [:index]
    resources :reservations, only: [:index,:create]
    resources :buses, only: [:index]
    resources :blebeecon, only: [:create]
    resources :raspi, only: [:create]
  end
end
