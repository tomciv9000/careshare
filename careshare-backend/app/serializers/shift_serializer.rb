class ShiftSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :caregiver, :date, :diapers 
  
end
