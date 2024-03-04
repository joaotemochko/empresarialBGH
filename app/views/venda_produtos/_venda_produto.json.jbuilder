json.extract! venda_produto, :id, :nome, :codebar, :created_at, :updated_at
json.url venda_produto_url(venda_produto, format: :json)
