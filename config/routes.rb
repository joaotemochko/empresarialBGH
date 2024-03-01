Rails.application.routes.draw do
  resources :produtos
  resources :fornecedors
  resources :estoques

  get 'get_dataProduto', to: 'produtos#get_dataProduto'
  get 'produtos/:id/subtrai', to: 'produtos#subtrai', as: 'subtrai'
  get 'welcome/index'
  get 'welcome/edit'
  get 'welcome/new'

  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root  to: "welcome#index"
end
