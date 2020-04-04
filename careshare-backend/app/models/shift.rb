class Shift < ApplicationRecord
    has_many :diapers, dependent: :delete_all
    has_many :sleeps, dependent: :delete_all
    has_many :foods, dependent: :delete_all
    has_many :notes, dependent: :delete_all
end