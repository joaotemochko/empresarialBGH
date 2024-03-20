class AddEmailAndPrecoUnidadeToClienteAndProduto < ActiveRecord::Migration[7.1]
  def change
    add_column :clientes, :email, :string
    add_column :produtos, :preco_unidade, :boolean
  end
end
