class CreateAtacadoPedidos < ActiveRecord::Migration[7.1]
  def change
    create_table :atacado_pedidos do |t|
      t.references :cliente, null: false, foreign_key: true
      t.float :peso_total
      t.float :preco_total
      t.string :forma_pagamento, null: false
      t.timestamps
    end
  end
end
