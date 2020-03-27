class CreateDiapers < ActiveRecord::Migration[6.0]
  def change
    create_table :diapers do |t|
      t.references :shift, null: false, foreign_key: true
      t.boolean :wet
      t.boolean :soiled
      t.time :time
      t.timestamps
    end
  end
end
