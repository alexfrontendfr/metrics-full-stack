class Metric < ApplicationRecord
  belongs_to :user
  belongs_to :employee
  
  validates :name, presence: true
  validates :value, presence: true, numericality: true
  validates :timestamp, presence: true
  validates :level, presence: true, inclusion: { 
    in: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    message: "%{value} is not a valid level" 
  }
  
  scope :recent, -> { order(timestamp: :desc) }
  scope :by_date_range, ->(start_date, end_date) { 
    where(timestamp: start_date..end_date) if start_date && end_date 
  }
end