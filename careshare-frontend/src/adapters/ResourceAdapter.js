class ResourceAdapter {
    constructor(resource) {
      this.baseURL = `http://localhost:3000/` + `${resource}` 
    }
  
    getResources() {
      return fetch(this.baseURL).then(response => response.json()).then(json => (json.data))
    }
  
    postResourceToApi(configurationObject) {
      return fetch(this.baseURL, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }

    deleteResourceFromApi(configurationObject,id) {
      return fetch(this.baseURL + `/${id}`, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }
  
    loadResource(resourceID) {
      return fetch(this.baseURL + `/${resourceID}`).then(response => response.json())
    }
  }