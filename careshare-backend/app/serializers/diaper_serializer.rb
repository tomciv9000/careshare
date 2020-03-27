class DiaperSerializer
  include FastJsonapi::ObjectSerializer
  attributes :wet, :soiled, :time, :created_at, :shift_id
  belongs_to :shift
end
