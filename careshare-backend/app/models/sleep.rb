class Sleep < ApplicationRecord
  belongs_to :shift

  before_save :calculate_sleep_duration

def calculate_sleep_duration
  sleep_duration = (self.end - self.start) / 3600 # Whatever you need to do here to calculate
  self.duration = sleep_duration
end

end
