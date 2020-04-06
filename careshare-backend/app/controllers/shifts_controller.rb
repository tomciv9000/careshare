class ShiftsController < ApplicationController
    before_action :set_shift, only: [:show, :update, :destroy]
  
  
    def index
      @shifts = Shift.all
      render json: ShiftSerializer.new(@shifts)
    end
  
    def show
      render json: ShiftSerializer.new(@shift)
    end
  
    def create
      @shift = Shift.new(shift_params)
  
      if @shift.save
        render json: ShiftSerializer.new(@shift)

      else
        render json: @shift.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @shift.update(shift_params)
        render json: @shift
      else
        render json: @shift.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      unless @shift.nil?
        @shift.destroy
        render json: @shift
      else
        render json: { error: "Shift not Found!" }, status: 404
      end
    end

  
    private
  
      def set_shift
        @shift = Shift.find(params[:id])
      end
  
    
      def shift_params
        params.require(:shift).permit(:caregiver, :date)
      end
end
  