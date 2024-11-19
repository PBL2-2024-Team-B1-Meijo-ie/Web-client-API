class BlEbeecon < ApplicationRecord
    validates :beecon_id,:device_id, presence: true
end