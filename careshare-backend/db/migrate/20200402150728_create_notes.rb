class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.references :shift, null: false, foreign_key: true
      t.string :content
      t.timestamps
    end
  end
end
