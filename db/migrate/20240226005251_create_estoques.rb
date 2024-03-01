class CreateEstoques < ActiveRecord::Migration[7.1]
  def change
    create_table :estoques do |t|
      t.string :desc
      t.integer :lote, null: false
      t.date :data_compra, null: false
      t.date :validade, null: false
      t.float :quantidade, null: false
      t.float :valor, null: false

      t.timestamps
    end
  end
end