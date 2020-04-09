class ActionPanel {
    
    constructor() {
        this.foodPanel = document.getElementById('food-panel');
        this.sleepPanel = document.getElementById('sleep-panel');
        this.diaperPanel = document.getElementById('diaper-panel');
        this.foodIconArray = [...document.getElementsByClassName('food-radio-icons')];
        this.sleepIconArray = [...document.getElementsByClassName('sleep-radio-icons')];
        this.diaperIconArray = [...document.getElementsByClassName('diaper-checkbox-icons')];
        this.diaperAdapter = new ResourceAdapter('diapers');
        this.sleepAdapter = new ResourceAdapter('sleeps');
        this.foodAdapter = new ResourceAdapter('foods');
        this.noteAdapter = new ResourceAdapter('notes');
        this.buildFoodIconEvents();
        this.buildSleepIconEvents();
        this.buildDiaperIconEvents();
        this.clickingOutsideClears(this.foodPanel, this.foodIconArray);
        this.clickingOutsideClears(this.sleepPanel, this.sleepIconArray);
        this.clickingOutsideClears(this.diaperPanel, this.diaperIconArray);
        this.bindActionSubmits();
    }

    iconSelected(icon){
        return !icon.style.background == "";
    }

    colorizeIcon(icon, color){
        icon.style.background = color;
        icon.children[1].style.color = '#ffffff';
        icon.children[0].style.filter='invert(100%)';
    }

    iconToggle(icon, color){
        if (this.iconSelected(icon)) {
            this.resetIcons(icon);
        } else {
            this.colorizeIcon(icon, color);
        }
    }
    
    buildDiaperIconEvents(){
        const diaperToggleColorPairs = {
            '#a09e3a': 'wet-diaper-icon',
            '#711e1e66': 'soiled-diaper-icon'
        }
        this.attachEventListeners(diaperToggleColorPairs, this.diaperIconArray);
    }

    buildSleepIconEvents(){
        const toggleSleepPairs = {
            '#f55cd1cf': 'nap-icon',
            '#5c87f5cf': 'bedtime-icon'
        }
        this.attachEventListeners(toggleSleepPairs, this.sleepIconArray);
    }

    buildFoodIconEvents(){
        const toggleFoodPairs = {
            '#00a6ffc8': 'snack-icon',
            '#ff9900fa': 'breakfast-icon',
            '#209e67bd': 'lunch-icon',
            '#6200ffb8': 'dinner-icon'
        }
        this.attachEventListeners(toggleFoodPairs, this.foodIconArray);
    }

    clickingOutsideClears(container, iconArray){
        document.addEventListener('click', (event) => {
            const flyoutElement = container;
            let targetElement = event.target; 
            do {
                if (targetElement == flyoutElement) {         
                    return
                }
                targetElement = targetElement.parentNode;
            } while (targetElement);
            this.resetIcons(iconArray);
        });
    }

    attachEventListeners(toggleValues, iconSet){
        for (let color in toggleValues){ 
            let el = document.getElementById(`${toggleValues[color]}`);
            
            el.addEventListener('click', function() {
                if (iconSet == this.sleepIconArray || iconSet == this.foodIconArray){
                    this.resetIcons(iconSet)
                } 
                this.iconToggle(el, `${color}`);
            }.bind(this));
            el.addEventListener('mouseover', function(){
                el.style.border = 'thin solid #1cb523';
            }.bind(this));
            el.addEventListener('mouseout', function(){
                el.style.border = "";
            }.bind(this));
        }
    }

    resetIcons(icons) {
        let toBeToggled = [].concat(icons);
        for (let index = 0; index < toBeToggled.length; index++) {
            const element = toBeToggled[index];
            if (this.iconSelected(element)){
                element.style.background = "";
                element.children[1].style.color = '#656167';
                element.children[0].style.filter="";
            }
        }
    }

    bindActionSubmits(){
        const submitDiaper = document.getElementById('diaper-done');
        const submitSleep = document.getElementById('sleep-done');
        const submitFood = document.getElementById('food-done');
        const submitNote = document.getElementById('shift-notes');
        submitDiaper.addEventListener('click', function() {
            this.createDiaperEvent();
            this.resetIcons(this.diaperIconArray);
            document.getElementById('diaper-time').value = "";
        }.bind(this));
        submitSleep.addEventListener('click', function() {
            this.createSleepEvent();
            this.resetIcons(this.sleepIconArray);
            document.getElementById('start-time').value = "";
            document.getElementById('end-time').value = "";
        }.bind(this));
        submitFood.addEventListener('click', function() {
            this.createFoodEvent();
            this.resetIcons(this.foodIconArray);
            document.getElementById('food-time').value = "";
            document.getElementById('food-description').value = "";
        }.bind(this));
        submitNote.addEventListener('submit', function(event) {
            event.preventDefault();
            this.createNoteEvent();
            submitNote.reset();
        }.bind(this));  
    }   

    grabShiftTag(){
        const closeButton = document.querySelector('.closeButton');
        let shiftTag = closeButton.id.split('-')[1];
        return shiftTag;
    }

    createDiaperEvent(){
        const wetDiaperIcon = this.diaperIconArray[0];
        const soiledDiaperIcon = this.diaperIconArray[1];
        let diaperInput = {
            wet: this.iconSelected(wetDiaperIcon),
            soiled: this.iconSelected(soiledDiaperIcon),
            time: document.getElementById('diaper-time').value,
            shift_id: this.grabShiftTag()
        };
        const configurationObject = {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(diaperInput)
        };
        this.diaperAdapter.postResourceToApi(configurationObject).then(function(json) {
            const diaper = new Diaper(json.data.id, diaperInput.wet, diaperInput.soiled, diaperInput.time, diaperInput.shift_id);
            console.log(json);
            console.log(diaper);
        }.bind(this))
    }

    createFoodEvent(){
        const snackIcon = this.foodIconArray[0];
        const breakfastIcon = this.foodIconArray[1];
        const lunchIcon = this.foodIconArray[2];
        const dinnerIcon = this.foodIconArray[3];
        let foodInput = {
            snack: this.iconSelected(snackIcon),
            breakfast: this.iconSelected(breakfastIcon),
            lunch: this.iconSelected(lunchIcon),
            dinner: this.iconSelected(dinnerIcon),
            description: document.getElementById('food-description').value,
            time: document.getElementById('food-time').value,
            shift_id: this.grabShiftTag()
        };
        const configurationObject = {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(foodInput)
        };
        this.foodAdapter.postResourceToApi(configurationObject).then(function(json) {
            const food = new Food(json.data.id, 
                foodInput.snack, 
                foodInput.breakfast, 
                foodInput.lunch, 
                foodInput.dinner, 
                foodInput.description, 
                foodInput.time, 
                foodInput.shift_id)
            console.log(json);
            console.log(food);
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
            shift_id: this.grabShiftTag()
        }
        const configurationObject = {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(sleepInput)
        };
        this.sleepAdapter.postResourceToApi(configurationObject).then(function(json) {
            const sleep = new Sleep(
                json.data.id, 
                sleepInput.nap, 
                sleepInput.bedtime, 
                sleepInput.start, 
                sleepInput.end, 
                json.data.attributes.duration)
            console.log(json);
            console.log(sleep);
        }.bind(this))
    }

    createNoteEvent(){
        const noteContent = document.getElementById('note-content').value
        let noteInput = {
            content: noteContent,
            shift_id: this.grabShiftTag()
        }
        const configurationObject = {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(noteInput)
        };
        this.noteAdapter.postResourceToApi(configurationObject).then(function(json) {
            const note = new Note(
                json.data.id, 
                noteInput.content, 
                noteInput.shift_id)
            console.log(json);
            console.log(note);
        }.bind(this))
    }


}