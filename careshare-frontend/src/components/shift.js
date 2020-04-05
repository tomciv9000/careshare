class Shift {
    
    constructor(caregiver, date, id) {
        
        this.foods = []
        this.notes = []
        this.diapers = []
        this.sleeps = []
        this.caregiver = caregiver;
        this.date = date;
        this.id = id
        this.adapter = new ShiftsAdapter()
        this.diaperAdapter = new DiapersAdapter()
        this.sleepAdapter = new SleepsAdapter()
        this.foodAdapter = new FoodsAdapter()
        this.noteAdapter = new NotesAdapter()
        
        this.foodIconArray = [...document.getElementsByClassName('food-radio-icons')]
        this.sleepIconArray = [...document.getElementsByClassName('sleep-radio-icons')]
        this.diaperIconArray = [...document.getElementsByClassName('diaper-checkbox-icons')]
        

    }



    createShiftTimeline(shift){
        let shiftHeader = document.createElement('h4');
        shiftHeader.setAttribute('id', 'shift-header')
        const headerDiv = document.getElementById('timeline-info-header');
        const closeButton = document.querySelector('.closeButton')
        const deleteButton = document.querySelector('.deleteButton')
        closeButton.setAttribute('id', `close-${shift.id}`)
        deleteButton.setAttribute('id', `delete-${shift.id}`)
        shiftHeader.innerHTML = `Caregiver: ${shift.caregiver}` + "<br />" + `Date: ${DateDisplay.formatDate(shift.date)}`
        headerDiv.append(shiftHeader);
        this.getAndLoadResources(shift.id)
    }
    getAndLoadResources(shiftID) {
        this.adapter.loadPreviousShift(shiftID).then(json => this.createResources(json.data.attributes))
    }

    createResources(data){
        this.createFoods(data.foods)
        this.createSleeps(data.sleeps)
        this.createDiapers(data.diapers)
        this.createNotes(data.notes)
    }

    createFoods(foods) {
        for (let food of foods) {
            let time = food.time.split('T')[1].slice(0,5)
            this.foods.push(new Food(food.id, food.snack, food.breakfast, food.lunch, food.dinner, food.description, time))
        }
    }

    createSleeps(sleeps){
        for (let sleep of sleeps) {
            let start = sleep.start.split('T')[1].slice(0,5)
            let end = sleep.end.split('T')[1].slice(0,5)
            this.sleeps.push(new Sleep(sleep.id, sleep.nap, sleep.bedtime, start, end, sleep.duration))
        }
    }

    createDiapers(diapers){
        for (let diaper of diapers) {
            let time = diaper.time.split('T')[1].slice(0,5)
            this.diapers.push(new Diaper(diaper.id, diaper.wet, diaper.soiled, time))
        }
    }

    createNotes(notes){
        for (let note of notes) {
          this.notes.push(new Note(note.id, note.content))
        }
    }

    iconSelected(icon){
        return !icon.style.background == ""
    }

    resetIcons(icons) {
        let toBeToggled = [].concat(icons || [])
        for (let index = 0; index < toBeToggled.length; index++) {
            const element = toBeToggled[index];
            if (this.iconSelected(element)){
                element.style.background = ""
                element.children[1].style.color = "#656167"
                element.children[0].style.filter=""
            }
        }
    }

    static orderTimeline(){
        let orderedArray = this.sortedTimelineArray();
        this.sortCurrentTimeline(orderedArray)
    }

    static sortedTimelineArray(){
        let timelineItems = document.querySelectorAll('#timeline-report')[0].children

        let timelineArray = []
        for(let i=0; i<timelineItems.length; i++){
            timelineArray.push(timelineItems[i].innerHTML);  
        }
        let mapped = timelineArray.map(function(el, i) {
            return {index: i, value: DateDisplay.convertTime12to24(el.split(' - ')[0]).replace(":", "")
            }
        })
        mapped.sort((a,b) => a.value - b.value)
        let result = mapped.map(function(el){
            return timelineArray[el.index];
        })
        return result
        //this returns an HTML string array that includes the button information
        //ie ["3:33 AM - Changed a wet diaper   <button id="1" class="diaper-delete">delete</button>"]
    }

    static addArchievedToShiftTimeline(array){
        //for this function i need to split off the button html since it won't be needed for archived shifts(not an ability)
        const timeLineReport = document.getElementById('timeline-report')
        timeLineReport.innerHTML = '';
        for(let i=0; i<array.length; i++){
            let li = document.createElement('li')
            let description = array[i].innerHTML.split('  ')[0]
            li.innerText = description
            timeLineReport.append(li)
        }
    }

    static sortCurrentTimeline(array){
        const timeLineReport = document.getElementById('timeline-report')
        timeLineReport.innerHTML = ''
        for(let i=0; i<array.length; i++){
            let li = document.createElement('li')
            li.innerHTML = array[i]
            timeLineReport.append(li)
            let button = li.querySelector('button')
            button.addEventListener("click", (evt) => {
                let target = evt.target
                target.parentElement.remove()
                Shift.deleteFromTimeline(evt)
            })
        }        
    }

    static deleteFromTimeline(event){
        let button = event.target
        if (button.classList.contains('wet-soiled-diaper-delete') 
            || button.classList.contains('wet-diaper-delete')
            || button.classList.contains('soiled-diaper-delete')){
            Diaper.deleteDiaper(button.classList.value, button.id)
            console.log(button)
        } else 
        if (button.classList.contains('nap-delete') 
            || button.classList.contains('bedtime-delete')){
            Sleep.deleteSleep(button.classList.value, button.id)
        } else
        if (button.classList.contains('snack-food-delete')
            || button.classList.contains('breakfast-food-delete')
            || button.classList.contains('lunch-food-delete')
            || button.classList.contains('dinner-food-delete')){
            Food.deleteFood(button.classList.value, button.id)
        }
        else {
            console.log(button)
        }
    }


}
