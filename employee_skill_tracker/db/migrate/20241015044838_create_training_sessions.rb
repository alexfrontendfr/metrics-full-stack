class CreateTrainingSessions < ActiveRecord::Migration[7.2]
    def change
      create_table :training_sessions do |t|
        t.string :name, null: false
        t.date :date, null: false
        t.references :skill, null: false, foreign_key: true
        t.references :employee, null: false, foreign_key: true
  
        t.timestamps
      end
    end
  end