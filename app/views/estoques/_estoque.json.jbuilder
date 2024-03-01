json.extract! estoque, :id, :produto, :fornecedor, :desc, :lote, :data_compra, :validade, :quantidade, :valor, :created_at, :updated_at
json.url estoque_url(estoque, format: :json)
