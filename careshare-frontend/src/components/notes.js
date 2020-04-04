class Note {
    
    constructor(id, content) {
        
        //do i need ID - am I passing this value into anything or can I just use this instance
        this.id = id
        this.content = content;
        
        //this.shift_id = shift_id;
        
        
        this.addToShiftTimeline()
        
        //this.adapter = new DiapersAdapter()
    }

    addToShiftTimeline(){
        const timeLineNotes = document.getElementById('timeline-notes')
        let li = document.createElement('li')
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = "delete"
        deleteButton.setAttribute('id', `${this.id}`);
        deleteButton.setAttribute('class', 'note-delete')
        li.innerHTML = `Note: ${this.content}  `
        timeLineNotes.append(li)
        li.append(deleteButton)
        deleteButton.addEventListener("click", (evt) => {
            let target = evt.target
            target.parentElement.remove()
            Note.deleteNote(this.id)
        })
    }
  
    static deleteNote(id) {
        const configurationObject = {
            method: 'DELETE',
        };
        const adapter = new NotesAdapter()
        adapter.deleteNoteFromApi(configurationObject, id).then((json) => console.log(json))
    }

}