class CreateClientes < ActiveRecord::Migration[7.1]
  def change
    create_table :clientes do |t|
      t.string :nome
      t.string :desc
      t.bigint :cnpj
      t.bigint :tel
      t.string :endereco
      t.integer :cep, limit: 8

      t.timestamps
    end
  end
end
