class SleepsAdapter {
    constructor() {
      this.baseURL = "http://localhost:3000/sleeps"
    }
  
    getSleeps() {
      return fetch(this.baseURL).then(response => response.json()).then(json => (json.data))
    }

  
    postSleepToApi(configurationObject) {
      return fetch(this.baseURL, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }

    deleteSleepFromApi(configurationObject,id) {
      return fetch(this.baseURL + `/${id}`, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }
  
    loadSleep(sleepID) {
      return fetch(this.baseURL + `/${sleepID}`).then(response => response.json())
    }
  }