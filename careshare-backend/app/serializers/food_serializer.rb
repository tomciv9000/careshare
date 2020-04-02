class FoodSerializer
  include FastJsonapi::ObjectSerializer
  attributes :snack, :breakfast, :lunch, :dinner, :description, :time, :shift_id
  belongs_to :shift 
end
