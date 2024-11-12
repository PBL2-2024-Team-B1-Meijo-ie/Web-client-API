class Storage < ApplicationRecord
  validates :onbusstop_id,:reserveTime,:reserveData,:peopleCount, presence: true 
end