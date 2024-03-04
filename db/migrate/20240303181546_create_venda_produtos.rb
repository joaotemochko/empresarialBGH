class CreateVendaProdutos < ActiveRecord::Migration[7.1]
  def change
    create_table :venda_produtos do |t|
      t.string :nome
      t.string :codebar

      t.timestamps
    end
  end
end
