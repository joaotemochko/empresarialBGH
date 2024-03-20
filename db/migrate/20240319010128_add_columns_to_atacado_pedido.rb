class AddColumnsToAtacadoPedido < ActiveRecord::Migration[7.1]
  def change
    add_column :atacado_pedidos, :status, :string
    add_column :atacado_pedidos, :parcelas, :string
  end
end
