Rails.application.routes.draw do
  get 'atacado_pedidos/index'
  get 'clientes/index'
  get 'lista_vendas/:venda_produto_id/index', to: 'lista_vendas#index', as: 'lista_vendas'
  get 'sat/index', to: 'sat#index'
  post 'lista_vendas/:venda_produto_id/set_retirada_quantidade', to: 'lista_vendas#set_retirada_quantidade', as: 'set_retira_quantidade_post'
  post 'lista_vendas/:venda_produto_id/get_desconto', to: 'lista_vendas#get_desconto', as: 'get_desconto'
  post 'lista_vendas/:venda_produto_id/set_cancela', to: 'lista_vendas#set_cancela', as: 'set_cancela'

  resources :venda_produtos do
    post :set_venda, on: :collection
    post :get_barcode, on: :collection
    get :get_barcode, on: :collection
    get :lista_vendas, on: :collection
  end
  resources :clientes
  resources :produtos
  resources :fornecedors
  resources :estoques
  resources :atacado_pedidos
  resources :users, only: [:new, :edit, :update, :create]

  get '/logs/:produto_id/index', to: 'logs#index', as: 'logs'
  get '/users/new', to: 'users#new'
  get '/search_estoque', to: 'estoques#search_estoque'
  get '/search_produto', to: 'produtos#search_produto'
  get '/search_fornecedor', to: 'fornecedors#search_fornecedor'
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

