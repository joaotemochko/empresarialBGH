class CreateFornecedors < ActiveRecord::Migration[7.1]
  def change
    create_table :fornecedors do |t|
      t.string :nome
      t.integer :cnpj
      t.string :endereco
      t.integer :tel
      t.string :obs

      t.timestamps
    end
  end
end
