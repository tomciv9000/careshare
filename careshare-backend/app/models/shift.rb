class Shift < ApplicationRecord
    has_many :diapers
    has_many :sleeps
    has_many :foods
end