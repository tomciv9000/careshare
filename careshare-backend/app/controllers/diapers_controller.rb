class DiapersController < ApplicationController
    before_action :set_diaper, only: [:show, :update, :destroy]
  
    # GET /diapers
    def index
      @diapers = Diaper.all
      render json: DiaperSerializer.new(@diapers)
    end
  
    # GET /diapers/1
    def show
      render json: DiaperSerializer.new(@diaper)
    end
  
    # POST /diapers
    def create
      @diaper = Diaper.new(diaper_params)
  
      if @diaper.save
        render json: DiaperSerializer.new(@diaper)

      else
        render json: @diaper.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /diapers/1
    def update
      if @diaper.update(diaper_params)
        render json: @diaper
      else
        render json: @diaper.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /diapers/1
    def destroy
      unless @diaper.nil?
        @diaper.destroy
        render json: @diaper
      else
        render json: { error: "diaper not Found!" }, status: 404
      end
    end

  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_diaper
        @diaper = Diaper.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def diaper_params
        params.require(:diaper).permit(:wet, :soiled, :time, :shift_id)
      end

  
end
