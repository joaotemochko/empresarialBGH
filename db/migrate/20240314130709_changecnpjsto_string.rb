class ChangecnpjstoString < ActiveRecord::Migration[7.1]
  def change
    change_column :fornecedors, :cnpj, :string, limit: 14
    change_column :fornecedors, :tel, :string, limit: 11
    change_column :clientes, :cnpj, :string, limit: 14
    change_column :clientes, :tel, :string, limit: 11
  end
end
