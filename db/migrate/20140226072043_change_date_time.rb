class ChangeDateTime < ActiveRecord::Migration
  def up
    change_column :reservations, :date, :datetime
    remove_column :reservations, :time
  end

  def down
    change column :reservations, :date, :date
    add_column :reservations, :time, :time
  end
end
