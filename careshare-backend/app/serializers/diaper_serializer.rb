class DiaperSerializer
  include FastJsonapi::ObjectSerializer
  attributes :wet, :soiled, :time, :created_at
  belongs_to :shift
end
