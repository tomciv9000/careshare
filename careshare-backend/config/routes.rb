Rails.application.routes.draw do
  resources :notes
  resources :foods
  resources :sleeps
  resources :diapers
  resources :shifts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
