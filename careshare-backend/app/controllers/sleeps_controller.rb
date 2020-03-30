class SleepsController < ApplicationController
    before_action :set_sleep, only: [:show, :update, :destroy]
  
    # GET /sleeps
    def index
      @sleeps = Sleep.all
      render json: SleepSerializer.new(@sleeps)
    end
  
    # GET /sleeps/1
    def show
      render json: SleepSerializer.new(@sleep)
    end
  
    # POST /sleeps
    def create
      @sleep = Sleep.new(sleep_params)
      if @sleep.save
        render json: SleepSerializer.new(@sleep)

      else
        render json: @Sleep.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /sleeps/1
    def update
      if @Sleep.update(sleep_params)
        render json: @sleep
      else
        render json: @Sleep.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /sleeps/1
    def destroy
      unless @Sleep.nil?
        @Sleep.destroy
        render json: @sleep
      else
        render json: { error: "sleep not Found!" }, status: 404
      end
    end

  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_sleep
        @sleep = Sleep.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def sleep_params
        params.require(:sleep).permit(:nap, :bedtime, :start, :end, :duration, :shift_id)
      end

end
