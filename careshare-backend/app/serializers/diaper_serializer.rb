class DiaperSerializer
  include FastJsonapi::ObjectSerializer
  attributes :wet, :soiled, :time, :shift_id
  belongs_to :shift
end
