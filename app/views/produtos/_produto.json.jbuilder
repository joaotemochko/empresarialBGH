json.extract! produto, :id, :nome, :desc, :string, :quantidade, :created_at, :updated_at
json.url produto_url(produto, format: :json)
