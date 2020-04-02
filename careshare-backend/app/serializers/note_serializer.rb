class NoteSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :shift_id
  belongs_to :shift  
end
