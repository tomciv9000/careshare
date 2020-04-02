class FoodSerializer
  include FastJsonapi::ObjectSerializer
  attributes :snack, :breakfast, :lunch, :dinner, :time, :shift_id
  belongs_to :shift 
end
