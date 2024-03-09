class CreateListaVendas < ActiveRecord::Migration[7.1]
  def change
    create_table :lista_vendas do |t|
      t.integer :codigo
      t.string :nome
      t.float :peso
      t.float :preco

      t.timestamps
    end
  end
end
