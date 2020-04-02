class CreateFoods < ActiveRecord::Migration[6.0]
  def change
    create_table :foods do |t|
      t.references :shift, null: false, foreign_key: true
      t.boolean :snack
      t.boolean :breakfast
      t.boolean :lunch
      t.boolean :dinner
      t.timestamps
    end
  end
end
