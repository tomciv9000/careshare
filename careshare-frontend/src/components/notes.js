class Note {
    
    constructor(id, content, shift_id) {
        
        //do i need ID - am I passing this value into anything or can I just use this instance
        this.id = id
        this.content = content;
        
        this.shift_id = shift_id;
        
        
        this.addToShiftTimeline()
        
        //this.adapter = new DiapersAdapter()
    }

    addToShiftTimeline(){
        const timeLineReport = document.getElementById('timeline-report')
        let li = document.createElement('li')
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = "delete"
        deleteButton.setAttribute('id', `${this.id}`);
        deleteButton.setAttribute('class', 'note-delete')
        li.innerHTML = `${this.content}`
        timeLineReport.append(li)
        li.append(deleteButton)
        //deleteButton.addEventListener("click", (evt) => {
        //    let target = evt.target
        //    target.parentElement.remove()
        //    Diaper.deleteDiaper(this.diaperLabel, this.id)
        //})
        Shift.orderTimeline();
    }
  
    static deleteNote(classLabel, id) {
        const configurationObject = {
            method: 'DELETE',
        };
        const adapter = new NotesAdapter()
        adapter.deleteNoteFromApi(configurationObject, id).then((json) => console.log(json))
    }

}