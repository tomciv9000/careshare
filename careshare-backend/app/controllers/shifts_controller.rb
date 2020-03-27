class ShiftsController < ApplicationController
    before_action :set_shift, only: [:show, :update, :destroy]
  
    # GET /shifts
    def index
      @shifts = Shift.all
      render json: ShiftSerializer.new(@shifts)
    end
  
    # GET /shifts/1
    def show
      render json: ShiftSerializer.new(@shift)
    end
  
    # POST /shifts
    def create
      @shift = Shift.new(shift_params)
  
      if @shift.save
        render json: ShiftSerializer.new(@shift)

      else
        render json: @shift.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /shifts/1
    def update
      if @shift.update(shift_params)
        render json: @shift
      else
        render json: @shift.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /shifts/1
    def destroy
      unless @shift.nil?
        @shift.destroy
        render json: @shift
      else
        render json: { error: "Shift not Found!" }, status: 404
      end
    end

  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_shift
        @shift = Shift.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def shift_params
        params.require(:shift).permit(:caregiver, :date)
      end
  end
  