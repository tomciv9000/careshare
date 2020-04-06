class FoodsController < ApplicationController
    before_action :set_food, only: [:show, :update, :destroy]
  
   
    def index
      @foods = Food.all
      render json: FoodSerializer.new(@foods)
    end
  
    
    def show
      render json: FoodSerializer.new(@food)
    end
  
   
    def create
      @food = Food.new(food_params)
  
      if @food.save
        render json: FoodSerializer.new(@food)

      else
        render json: @food.errors, status: :unprocessable_entity
      end
    end
  
    
    def update
      if @food.update(food_params)
        render json: @food
      else
        render json: @food.errors, status: :unprocessable_entity
      end
    end
  
  
    def destroy
      unless @food.nil?
        @food.destroy
        render json: @food
      else
        render json: { error: "food not Found!" }, status: 404
      end
    end

  
    private
     
      def set_food
        @food = Food.find(params[:id])
      end
  
      
      def food_params
        params.require(:food).permit(:snack, :breakfast, :lunch, :dinner, :description, :time, :shift_id)
      end
end
