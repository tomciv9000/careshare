class Shift {
    
    constructor(caregiver, date, id) {
        this.eventLog = []
        this.notes = []
        this.caregiver = caregiver;
        this.date = date;
        this.id = id
        this.diaperAdapter = new DiapersAdapter()
        this.sleepAdapter = new SleepsAdapter()
        this.foodAdapter = new FoodsAdapter()
        this.noteAdapter = new NotesAdapter()
        
        this.foodPanel = document.getElementById('food-panel')
        this.sleepPanel = document.getElementById('sleep-panel')
        this.diaperPanel = document.getElementById('diaper-panel')

        this.foodIconArray = [...document.getElementsByClassName('food-radio-icons')]
        this.sleepIconArray = [...document.getElementsByClassName('sleep-radio-icons')]
        this.diaperIconArray = [...document.getElementsByClassName('diaper-checkbox-icons')]
        
        //this control panel type stuff should be moved to shifts.js to be able to create a shift without building the panel
        this.buildFoodIconEvents()
        this.buildSleepIconEvents()
        this.buildDiaperIconEvents()
        this.bindActionSubmits()

        this.clickingOutsideClears(this.foodPanel, this.foodIconArray)
        this.clickingOutsideClears(this.sleepPanel, this.sleepIconArray)
        this.clickingOutsideClears(this.diaperPanel, this.diaperIconArray)
    }


    createShiftTimeline(shift){
        let shiftHeader = document.createElement('h4');
        let headerDiv = document.getElementById('timeline-info-header');
        let timelineButtons = document.querySelector('#timeline-buttons');
        let closeBtn = document.createElement('button');
        closeBtn.setAttribute('id', 'closeButton')
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('id', 'deleteButton')
        shiftHeader.innerHTML = `Caregiver: ${shift.caregiver}` + "<br />" + `Date: ${DateDisplay.formatDate(shift.date)}`
        headerDiv.append(shiftHeader);
        if (this.shiftFound(shift.id)) {
            closeBtn.innerText = 'Review Complete'
            deleteBtn.innerText = 'Delete Shift'
        } else {
            closeBtn.innerText = 'Shift Complete'
            deleteBtn.innerText = 'Cancel Shift'
        }
        timelineButtons.append(closeBtn)
        timelineButtons.append(deleteBtn)
    }
    
    shiftFound(id){
        let shiftsDropDown = document.getElementById("shifts-dropdown");
        let option = shiftsDropDown.querySelector('[value="' + id + '"]');
        return !!option
    }
    
    iconSelected(icon){
        return !icon.style.background == ""
    }

    colorizeIcon(icon, color){
        icon.style.background = color
        icon.children[1].style.color = "#ffffff"
        icon.children[0].style.filter="invert(100%)"
    }

    iconToggle(icon, color){
        if (this.iconSelected(icon)) {
            this.resetIcons(icon)
        } else {
            this.colorizeIcon(icon, color)
        }
    }

    buildDiaperIconEvents(){
        const diaperToggleColorPairs = {
            "#a09e3a": 'wet-diaper-icon',
            "#711e1e66": 'soiled-diaper-icon'
        }
        this.attachEventListeners(diaperToggleColorPairs, this.diaperIconArray)
    }

    buildSleepIconEvents(){
        const toggleSleepPairs = {
            "#f55cd1cf": 'nap-icon',
            "#5c87f5cf": 'bedtime-icon'
        }
        this.attachEventListeners(toggleSleepPairs, this.sleepIconArray)
    }


    buildFoodIconEvents(){
        const toggleFoodPairs = {
            "#00a6ffc8": 'snack-icon',
            "#ff9900fa": 'breakfast-icon',
            "#209e67bd": 'lunch-icon',
            "#6200ffb8": 'dinner-icon'
        }
        this.attachEventListeners(toggleFoodPairs, this.foodIconArray)
    }


    attachEventListeners(toggleValues, iconSet){
        for (let color in toggleValues){ 
            let el = document.getElementById(`${toggleValues[color]}`);
            el.addEventListener("click", function() {
                if (iconSet != this.diaperIconArray){
                    this.resetIcons(iconSet)
                } 
                this.iconToggle(el, `${color}`)
            }.bind(this));
            el.addEventListener("mouseover", function(){
                el.style.border = "thin solid #1cb523"
            }.bind(this));
            el.addEventListener("mouseout", function(){
                el.style.border = ""
            }.bind(this));
        }
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



    clickingOutsideClears(container, iconArray){
        document.addEventListener("click", (evt) => {
            const flyoutElement = container;
            let targetElement = evt.target; // clicked element
        
            do {
                if (targetElement == flyoutElement) {
                    // This is a click inside. Do nothing, just return.
                    
                    return
                }
                // Go up the DOM
                targetElement = targetElement.parentNode;
            } while (targetElement);
        
            // This is a click outside.
            this.resetIcons(iconArray)
        });
    }

    bindActionSubmits(){
        const submitDiaper = document.getElementById('diaper-done')
        const submitSleep = document.getElementById('sleep-done')
        const submitFood = document.getElementById('food-done')
        const submitNote = document.getElementById('shift-notes')

        submitDiaper.addEventListener("click", function() {
            this.createDiaperEvent()
            this.resetIcons(this.diaperIconArray)
            document.getElementById('diaper-time').value = ""
        }.bind(this));

        submitSleep.addEventListener("click", function() {
            this.createSleepEvent()
            this.resetIcons(this.sleepIconArray)
            document.getElementById('start-time').value = ""
            document.getElementById('end-time').value = ""
        }.bind(this));
//
        submitFood.addEventListener("click", function() {
            this.createFoodEvent()
            this.resetIcons(this.foodIconArray)
            document.getElementById('food-time').value = ""
            document.getElementById('food-description').value = ""
        }.bind(this));

        submitNote.addEventListener('submit', function(event) {
            event.preventDefault();
            this.createNoteEvent();
            submitNote.reset()
        }.bind(this));  
    }   

    createDiaperEvent(){
        const wetDiaperIcon = this.diaperIconArray[0]
        const soiledDiaperIcon = this.diaperIconArray[1]
        let diaperInput = {
            wet: this.iconSelected(wetDiaperIcon),
            soiled: this.iconSelected(soiledDiaperIcon),
            time: document.getElementById('diaper-time').value,
            shift_id: this.id
        }
        const configurationObject = {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(diaperInput)
        };
        this.diaperAdapter.postDiaperToApi(configurationObject).then(function(json) {
            const diaper = new Diaper(json.data.id, diaperInput.wet, diaperInput.soiled, diaperInput.time, diaperInput.shift_id)
            console.log(json)
            console.log(diaper)
        }.bind(this))
    }
    
    createFoodEvent(){
        const snackIcon = this.foodIconArray[0]
        const breakfastIcon = this.foodIconArray[1]
        const lunchIcon = this.foodIconArray[2]
        const dinnerIcon = this.foodIconArray[3]
        let foodInput = {
            snack: this.iconSelected(snackIcon),
            breakfast: this.iconSelected(breakfastIcon),
            lunch: this.iconSelected(lunchIcon),
            dinner: this.iconSelected(dinnerIcon),
            description: document.getElementById('food-description').value,
            time: document.getElementById('food-time').value,
            shift_id: this.id
        }
        const configurationObject = {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(foodInput)
        };
        this.foodAdapter.postFoodToApi(configurationObject).then(function(json) {
            const food = new Food(json.data.id, 
                foodInput.snack, 
                foodInput.breakfast, 
                foodInput.lunch, 
                foodInput.dinner, 
                foodInput.description, 
                foodInput.time, 
                foodInput.shift_id)
            console.log(json)
            console.log(food)
        }.bind(this))
    }

    createSleepEvent(){
        const napIcon = this.sleepIconArray[0]
        const bedtimeIcon = this.sleepIconArray[1]
        let sleepInput = {
            nap: this.iconSelected(napIcon),
            bedtime: this.iconSelected(bedtimeIcon),
            start: document.getElementById('start-time').value,
            end: document.getElementById('end-time').value,
            shift_id: this.id
        }
        const configurationObject = {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(sleepInput)
        };
        this.sleepAdapter.postSleepToApi(configurationObject).then(function(json) {
            const sleep = new Sleep(
                json.data.id, 
                sleepInput.nap, 
                sleepInput.bedtime, 
                sleepInput.start, 
                sleepInput.end, 
                json.data.attributes.duration, 
                sleepInput.shift_id)
            console.log(json)
            console.log(sleep)
        }.bind(this))
    }

    createNoteEvent(){
        const noteContent = document.getElementById('note-content').value
        //const bedtimeIcon = this.sleepIconArray[1]
        let noteInput = {
            content: noteContent,
            shift_id: this.id
        }
        const configurationObject = {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(noteInput)
        };
        this.noteAdapter.postNoteToApi(configurationObject).then(function(json) {
            const note = new Note(
                json.data.id, 
                noteInput.content, 
                noteInput.shift_id)
            console.log(json)
            console.log(note)
        }.bind(this))
    }

    static orderTimeline(){
        let orderedArray = this.sortedTimelineArray();
        this.sortCurrentTimeline(orderedArray)
    }

    static sortedTimelineArray(){
        let timelineItems = document.querySelectorAll('li')
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
        //this.addToShiftTimeline(result)
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
