class AddUfAndCityToClientes < ActiveRecord::Migration[7.1]
  def change
    add_column :clientes, :cidade, :string
    add_column :clientes, :uf, :string
  end
end
