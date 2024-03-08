class RefactorVendasAndProdutos < ActiveRecord::Migration[7.1]
  def change
      add_column :produtos, :codigo, :integer
      add_column :produtos, :preco, :float
      add_column :venda_produtos, :preco_total, :float
      add_column :venda_produtos, :quantidade_total, :float
      add_column :venda_produtos, :forma_pagamento, :string
      remove_column :venda_produtos,:codebar
  end
end
