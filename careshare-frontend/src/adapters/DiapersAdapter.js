class DiapersAdapter {
    constructor() {
      this.baseURL = "http://localhost:3000/diapers"
    }
  
    getDiapers() {
      return fetch(this.baseURL).then(response => response.json()).then(json => (json.data))
    }

  
    postDiaperToApi(configurationObject) {
      return fetch(this.baseURL, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }

    deleteDiaperFromApi(configurationObject,id) {
      return fetch(this.baseURL + `/${id}`, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }
  
    loadDiaper(diaperID) {
      return fetch(this.baseURL + `/${diaperID}`).then(response => response.json())
    }
  }