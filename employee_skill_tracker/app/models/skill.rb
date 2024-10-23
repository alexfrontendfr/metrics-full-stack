class Skill < ApplicationRecord
  belongs_to :employee
  has_many :training_sessions, dependent: :destroy

  validates :name, presence: true
  validates :proficiency, presence: true, 
            numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
end