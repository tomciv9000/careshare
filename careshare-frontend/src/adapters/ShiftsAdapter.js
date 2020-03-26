class ShiftsAdapter {
    constructor() {
      this.baseURL = "http://localhost:3000/shifts"
    }
  
    getShifts() {
      return fetch(this.baseURL).then(response => response.json()).then(json => (json.data))
    }

  
    postShiftToApi(configurationObject) {
      return fetch(this.baseURL, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }

    deleteShiftFromApi(configurationObject,id) {
      return fetch(this.baseURL + `/${id}`, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }
  
    loadPreviousShift(shiftID) {
      return fetch(this.baseURL + `/${shiftID}`).then(response => response.json())
    }
  }