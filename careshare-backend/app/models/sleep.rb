class Sleep < ApplicationRecord
  belongs_to :shift

  before_save :calculate_sleep_duration

  def calculate_sleep_duration
    sleep_duration = (self.end - self.start) / 3600 # Whatever you need to do here to calculate
    if sleep_duration < 0
      sleep_duration = 24 + sleep_duration
    end 
    self.duration = sleep_duration.round(1)
  end

end
