class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.string :name
      t.string :phone_number
      t.string :email
      t.integer :party_size
      t.date :date
      t.time :time

      t.timestamps
    end
  end
end
