class GoTable < ApplicationRecord
  validates go_id,:startTime, presence:true
end
