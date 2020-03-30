class Shift {
    
    constructor(caregiver, date, id) {
        this.caregiver = caregiver;
        this.date = date;
        this.id = id
        this.diaperAdapter = new DiapersAdapter
        this.sleepAdapter = new SleepsAdapter
        
        this.foodPanel = document.getElementById('food-panel')
        this.sleepPanel = document.getElementById('sleep-panel')
        this.diaperPanel = document.getElementById('diaper-panel')

        this.foodIconArray = [...document.getElementsByClassName('food-radio-icons')]
        this.sleepIconArray = [...document.getElementsByClassName('sleep-radio-icons')]
        this.diaperIconArray = [...document.getElementsByClassName('diaper-checkbox-icons')]
        
        
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
        let timelineDiv = document.querySelector('#timeline');
        let closeBtn = document.createElement('button');
        closeBtn.setAttribute('id', 'closeButton')
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('id', 'deleteButton')
        shiftHeader.innerHTML = `Caregiver: ${shift.caregiver}` + "<br />" + `Date: ${DateDisplay.formatDate(shift.date)}`
        timelineDiv.append(shiftHeader);
        if (this.shiftFound(shift.id)) {
            closeBtn.innerText = 'Review Complete'
            deleteBtn.innerText = 'Delete Shift'
        } else {
            closeBtn.innerText = 'Shift Complete'
            deleteBtn.innerText = 'Cancel Shift'
        }
        timelineDiv.append(closeBtn)
        timelineDiv.append(deleteBtn)
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
        //submitFood.addEventListener("click", function() {
        //    createFoodEvent()
        //}.bind(this));
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
                sleepInput.duration, 
                sleepInput.shift_id)
            console.log(json)
            console.log(sleep)
        }.bind(this))


    }



}
