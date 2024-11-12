class BackTable < ApplicationRecord
  validates :back_id,:startTime, presence: true 
end
