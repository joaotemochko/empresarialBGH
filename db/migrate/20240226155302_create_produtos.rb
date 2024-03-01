class CreateProdutos < ActiveRecord::Migration[7.1]
  def change
    create_table :produtos do |t|
      t.string :nome, null: false
      t.string :desc
      t.float :quantidade

      t.timestamps
    end
  end
end
