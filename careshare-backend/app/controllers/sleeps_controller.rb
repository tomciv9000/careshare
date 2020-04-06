class SleepsController < ApplicationController
    before_action :set_sleep, only: [:show, :update, :destroy]
  

    def index
      @sleeps = Sleep.all
      render json: SleepSerializer.new(@sleeps)
    end
  
  
    def show
      render json: SleepSerializer.new(@sleep)
    end
  
  
    def create
      @sleep = Sleep.new(sleep_params)
      if @sleep.save
        render json: SleepSerializer.new(@sleep)

      else
        render json: @Sleep.errors, status: :unprocessable_entity
      end
    end
  

    def update
      if @sleep.update(sleep_params)
        render json: @sleep
      else
        render json: @Sleep.errors, status: :unprocessable_entity
      end
    end
  

    def destroy
      unless @sleep.nil?
        @sleep.destroy
        render json: @sleep
      else
        render json: { error: "sleep not Found!" }, status: 404
      end
    end

  
    private

      def set_sleep
        @sleep = Sleep.find(params[:id])
      end
  
      def sleep_params
        params.require(:sleep).permit(:nap, :bedtime, :start, :end, :duration, :shift_id)
      end

end
