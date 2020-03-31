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
      if @sleep.update(sleep_params)
        render json: @sleep
      else
        render json: @Sleep.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /sleeps/1
    def destroy
      unless @sleep.nil?
        @sleep.destroy
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




Started DELETE "/sleeps/22" for ::1 at 2020-03-31 00:21:23 -0400
Processing by SleepsController#destroy as */*
  Parameters: {"id"=>"22"}
  Sleep Load (2.1ms)  SELECT "sleeps".* FROM "sleeps" WHERE "sleeps"."id" = $1 LIMIT $2  [["id", 22], ["LIMIT", 1]]
  ↳ app/controllers/sleeps_controller.rb:49:in `set_sleep'
Completed 404 Not Found in 6ms (Views: 0.3ms | ActiveRecord: 2.6ms | Allocations: 754)


Started DELETE "/diapers/6" for ::1 at 2020-03-31 00:25:57 -0400
Processing by DiapersController#destroy as */*
  Parameters: {"id"=>"6"}
  Diaper Load (0.5ms)  SELECT "diapers".* FROM "diapers" WHERE "diapers"."id" = $1 LIMIT $2  [["id", 6], ["LIMIT", 1]]
  ↳ app/controllers/diapers_controller.rb:50:in `set_diaper'
   (0.2ms)  BEGIN
  ↳ app/controllers/diapers_controller.rb:39:in `destroy'
  Diaper Destroy (1.6ms)  DELETE FROM "diapers" WHERE "diapers"."id" = $1  [["id", 6]]
  ↳ app/controllers/diapers_controller.rb:39:in `destroy'
   (0.5ms)  COMMIT
  ↳ app/controllers/diapers_controller.rb:39:in `destroy'
Completed 200 OK in 9ms (Views: 0.5ms | ActiveRecord: 2.8ms | Allocations: 2374)


