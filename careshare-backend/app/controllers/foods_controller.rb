class FoodsController < ApplicationController
    before_action :set_food, only: [:show, :update, :destroy]
  
    # GET /diapers
    def index
      @foods = Food.all
      render json: FoodSerializer.new(@foods)
    end
  
    # GET /diapers/1
    def show
      render json: FoodSerializer.new(@food)
    end
  
    # POST /diapers
    def create
      @food = Food.new(food_params)
  
      if @food.save
        render json: FoodSerializer.new(@food)

      else
        render json: @food.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /diapers/1
    def update
      if @food.update(food_params)
        render json: @food
      else
        render json: @food.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /diapers/1
    def destroy
      unless @food.nil?
        @food.destroy
        render json: @food
      else
        render json: { error: "food not Found!" }, status: 404
      end
    end

  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_food
        @food = Food.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def food_params
        params.require(:food).permit(:snack, :breakfast, :lunch, :dinner, :description, :time, :shift_id)
      end
end
