class ShiftsAdapter {
    constructor() {
      this.baseURL = "http://localhost:3000/shifts"
    }
  
    getShifts() {
      return fetch(this.baseURL).then(response => response.json()).then(json => (json.data))
    }

    populateShiftsDropDown(data) {
        data.sort((a, b) => (a.attributes.date < b.attributes.date) ? 1 : -1)
        for (let shift of data) {
          let option = document.createElement("option")
          option.value = shift.attributes.id
          option.innerHTML = `${shift.attributes.caregiver}...${shift.attributes.date}` 
          this.shiftDropDown.appendChild(option)
        }
      }
    
    fetchAndPopulateDropDown() {
        this.adapter.getIngredients().then(json => this.populateIngredientDropDown(json))
    }

  
    postShiftToApi(configurationObject) {
      return fetch(this.baseURL, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }
  
    getPreviousShift(shift) {
      return fetch(this.baseURL + `/${shift.id}`).then(response => response.json())
    }
  }