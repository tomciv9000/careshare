class NotesAdapter {
    
    constructor() {
      this.baseURL = "http://localhost:3000/notes"
    }
  
    getNotes() {
      return fetch(this.baseURL).then(response => response.json()).then(json => (json.data))
    }

  
    postNoteToApi(configurationObject) {
      return fetch(this.baseURL, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }

    deleteNoteFromApi(configurationObject, id) {
      return fetch(this.baseURL + `/${id}`, configurationObject)
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
    }
  
    loadDiaper(noteID) {
      return fetch(this.baseURL + `/${noteID}`).then(response => response.json())
    }
}