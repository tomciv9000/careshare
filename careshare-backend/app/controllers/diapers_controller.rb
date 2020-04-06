class DiapersController < ApplicationController
    before_action :set_diaper, only: [:show, :update, :destroy]
  
  
    def index
      @diapers = Diaper.all
      render json: DiaperSerializer.new(@diapers)
    end
  
    
    def show
      render json: DiaperSerializer.new(@diaper)
    end
  
    
    def create
      @diaper = Diaper.new(diaper_params)
  
      if @diaper.save
        render json: DiaperSerializer.new(@diaper)

      else
        render json: @diaper.errors, status: :unprocessable_entity
      end
    end
  
    
    def update
      if @diaper.update(diaper_params)
        render json: @diaper
      else
        render json: @diaper.errors, status: :unprocessable_entity
      end
    end
  
   
    def destroy
      unless @diaper.nil?
        @diaper.destroy
        render json: @diaper
      else
        render json: { error: "diaper not Found!" }, status: 404
      end
    end

  
    private
      
      def set_diaper
        @diaper = Diaper.find(params[:id])
      end
  
      
      def diaper_params
        params.require(:diaper).permit(:wet, :soiled, :time, :shift_id)
      end

  
end
