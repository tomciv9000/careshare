Rails.application.routes.draw do
  resources :notes, only: [:show, :create, :destroy]
  resources :foods, only: [:show, :create, :destroy]
  resources :sleeps, only: [:show, :create, :destroy]
  resources :diapers, only: [:show, :create, :destroy]
  resources :shifts, only: [:index, :show, :create, :destroy]

end
