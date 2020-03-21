class CreateShifts < ActiveRecord::Migration[6.0]
  def change
    create_table :shifts do |t|
      t.string :caregiver
      t.date :date

      t.timestamps
    end
  end
end