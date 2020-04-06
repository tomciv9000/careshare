class Note {

    constructor(id, content) {
        this.id = id;
        this.content = content;
        this.addToShiftTimeline();
    }

    addToShiftTimeline(){
        const timeLineNotes = document.getElementById('timeline-notes');
        let li = document.createElement('li');
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = "delete";
        deleteButton.setAttribute('id', `${this.id}`);
        deleteButton.setAttribute('class', 'note-delete');
        li.innerHTML = `Note: ${this.content}  `;
        timeLineNotes.append(li);
        li.append(deleteButton);
        deleteButton.addEventListener("click", (event) => {
            let target = event.target;
            target.parentElement.remove();
            Note.deleteNote(this.id);
        })
    }
  
    static deleteNote(id) {
        const configurationObject = {
            method: 'DELETE',
        };
        const adapter = new ResourceAdapter('notes');
        adapter.deleteResourceFromApi(configurationObject, id).then((json) => console.log(json));
    }

}