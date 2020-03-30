class CreateSleeps < ActiveRecord::Migration[6.0]
  def change
    create_table :sleeps do |t|
      t.references :shift, null: false, foreign_key: true
      t.boolean :nap
      t.boolean :bedtime
      t.time :start
      t.time :end
      t.float :duration
      t.timestamps
    end
  end
end
