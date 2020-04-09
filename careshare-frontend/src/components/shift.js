class Shift {
    
    constructor(caregiver, date, id) {
        this.foods = [];
        this.notes = [];
        this.diapers = [];
        this.sleeps = [];
        this.caregiver = caregiver;
        this.date = date;
        this.id = id;
        this.adapter = new ResourceAdapter('shifts');
        this.diaperAdapter = new ResourceAdapter('diapers');
        this.sleepAdapter = new ResourceAdapter('sleeps');
        this.foodAdapter = new ResourceAdapter('foods');
        this.noteAdapter = new ResourceAdapter('notes');
    }

    createShiftTimeline(shift){
        const headerDiv = document.getElementById('timeline-info-header');
        const closeButton = document.querySelector('.closeButton');
        const deleteButton = document.querySelector('.deleteButton');
        let shiftHeader = document.createElement('h4');
        shiftHeader.setAttribute('id', 'shift-header');
        closeButton.setAttribute('id', `close-${shift.id}`)
        deleteButton.setAttribute('id', `delete-${shift.id}`);
        shiftHeader.innerHTML = `Caregiver: ${shift.caregiver}` + '<br />' + `Date: ${DateDisplay.formatDate(shift.date)}`;
        headerDiv.append(shiftHeader);
        this.getAndLoadResources(shift.id);
    }

    getAndLoadResources(shiftID) {
        this.adapter.loadResource(shiftID).then(json => this.createResources(json.data.attributes));
    }

    createResources(data){
        this.createFoods(data.foods);
        this.createSleeps(data.sleeps);
        this.createDiapers(data.diapers);
        this.createNotes(data.notes);
    }

    createFoods(foods) {
        for (let food of foods) {
            let time = DateDisplay.convertISO(food.time);
            this.foods.push(new Food(food.id, food.snack, food.breakfast, food.lunch, food.dinner, food.description, time));
        }
    }

    createSleeps(sleeps){
        for (let sleep of sleeps) {
            let start = DateDisplay.convertISO(sleep.start);
            let end = DateDisplay.convertISO(sleep.end);
            this.sleeps.push(new Sleep(sleep.id, sleep.nap, sleep.bedtime, start, end, sleep.duration));
        }
    }

    createDiapers(diapers){
        for (let diaper of diapers) {
            let time = DateDisplay.convertISO(diaper.time);
            this.diapers.push(new Diaper(diaper.id, diaper.wet, diaper.soiled, time));
        }
    }

    createNotes(notes){
        for (let note of notes) {
          this.notes.push(new Note(note.id, note.content));
        }
    }

    iconSelected(icon){
        return !icon.style.background == "";
    }

    resetIcons(icons) {
        let toBeToggled = [].concat(icons);
        for (let index = 0; index < toBeToggled.length; index++) {
            const element = toBeToggled[index];
            if (this.iconSelected(element)){
                element.style.background = "";
                element.children[1].style.color = '#656167';
                element.children[0].style.filter= "";
            }
        }
    }

    static orderTimeline(){
        let orderedArray = this.sortedTimelineArray();
        this.sortCurrentTimeline(orderedArray);
    }

    static sortedTimelineArray(){
        let timelineItems = document.querySelectorAll('#timeline-report')[0].children;
        let timelineArray = [];
        for(let i=0; i<timelineItems.length; i++){
            timelineArray.push(timelineItems[i].innerHTML);  
        }
        let mapped = timelineArray.map(function(el, i) {
            return {index: i, value: DateDisplay.convertTime12to24(el.split(' - ')[0]).replace(':', "")}
        });
        mapped.sort((a,b) => a.value - b.value);
        let result = mapped.map(function(el){
            return timelineArray[el.index];
        })
        return result;
    }

    static sortCurrentTimeline(array){
        const timeLineReport = document.getElementById('timeline-report');
        timeLineReport.innerHTML = "";
        for(let i=0; i<array.length; i++){
            let li = document.createElement('li');
            li.innerHTML = array[i];
            timeLineReport.append(li);
            let button = li.querySelector('button');
            button.addEventListener('click', (event) => {
                let target = event.target;
                target.parentElement.remove();
                Shift.deleteFromTimeline(event);
            })
        }        
    }

    static deleteFromTimeline(event){
        let button = event.target;
        if (button.classList.contains('wet-soiled-diaper-delete') 
            || button.classList.contains('wet-diaper-delete')
            || button.classList.contains('soiled-diaper-delete')){
            Diaper.deleteDiaper(button.classList.value, button.id);
            console.log(button);
        } else 
        if (button.classList.contains('nap-delete') 
            || button.classList.contains('bedtime-delete')){
            Sleep.deleteSleep(button.classList.value, button.id);
        } else
        if (button.classList.contains('snack-food-delete')
            || button.classList.contains('breakfast-food-delete')
            || button.classList.contains('lunch-food-delete')
            || button.classList.contains('dinner-food-delete')){
            Food.deleteFood(button.classList.value, button.id);
        }
        else {
            console.log(button);
        }
    }


}
