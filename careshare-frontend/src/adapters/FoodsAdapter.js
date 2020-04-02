class FoodsAdapter {
    constructor() {
      this.baseURL = "http://localhost:3000/foods"
    }
  
    getFoods() {
      return fetch(this.baseURL).then(response => response.json()).then(json => (json.data))
    }

  
    postFoodToApi(configurationObject) {
      return fetch(this.baseURL, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }

    deleteFoodFromApi(configurationObject, id) {
      return fetch(this.baseURL + `/${id}`, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }
  
    loadFood(foodID) {
      return fetch(this.baseURL + `/${foodID}`).then(response => response.json())
    }
  }