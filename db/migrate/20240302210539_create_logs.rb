class CreateLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :logs do |t|
      t.string :usuario
      t.float :retirada
      t.date :data_retirada

      t.timestamps
    end
  end
end
