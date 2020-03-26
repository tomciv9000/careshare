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
  
    loadPreviousShift(shift) {
      return fetch(this.baseURL + `/${shift.id}`).then(response => response.json())
    }
  }