class SleepSerializer
  include FastJsonapi::ObjectSerializer
  attributes :nap, :bedtime, :start, :end, :duration, :shift_id
  belongs_to :shift
end
