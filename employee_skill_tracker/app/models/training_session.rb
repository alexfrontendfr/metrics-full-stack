class TrainingSession < ApplicationRecord
  belongs_to :employee
  belongs_to :skill

  validates :name, presence: true
  validates :date, presence: true
end