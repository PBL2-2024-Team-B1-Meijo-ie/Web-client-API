class Storage < ApplicationRecord
  validates :onbusstop_id,:reserveTime,:reserveDate,:peopleCount, presence: true 
end