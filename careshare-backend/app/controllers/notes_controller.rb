class NotesController < ApplicationController
    before_action :set_note, only: [:show, :update, :destroy]
  

    def index
      @notes = Note.all
      render json: NoteSerializer.new(@notes)
    end
  

    def show
      render json: NoteSerializer.new(@note)
    end
  

    def create
      @note = Note.new(note_params)
  
      if @note.save
        render json: NoteSerializer.new(@note)

      else
        render json: @note.errors, status: :unprocessable_entity
      end
    end

    def update
      if @note.update(note_params)
        render json: @note
      else
        render json: @note.errors, status: :unprocessable_entity
      end
    end
  
 
    def destroy
      unless @note.nil?
        @note.destroy
        render json: @note
      else
        render json: { error: "note not Found!" }, status: 404
      end
    end

  
    private
      
      def set_note
        @note = Note.find(params[:id])
      end
  
      def note_params
        params.require(:note).permit(:content, :shift_id)
      end
end
