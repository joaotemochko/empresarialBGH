class ListaVenda < ApplicationRecord
  belongs_to :venda_produto
  has_many :produtos
end
