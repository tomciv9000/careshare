class Shift {
    
    constructor(caregiver, date) {
        this.caregiver = caregiver;
        this.date = date;
        //this.wetIcon = document.getElementById('wet-diaper-icon')
        //this.soiledIcon = document.getElementById('soiled-diaper-icon')
        //this.napIcon = document.getElementById('nap-icon')
        //this.bedtimeIcon = document.getElementById('bedtime-icon')
        //this.snackIcon = document.getElementById('snack-icon')
        //this.breakfastIcon = document.getElementById('breakfast-icon')
        //this.lunchIcon = document.getElementById('lunch-icon')
        //this.dinnerIcon = document.getElementById('dinner-icon')
        
        this.foodPanel = document.getElementById('food-panel')
        this.sleepPanel = document.getElementById('sleep-panel')
        this.diaperPanel = document.getElementById('diaper-panel')

        this.foodIconArray = [...document.getElementsByClassName('food-radio-icons')]
        this.sleepIconArray = [...document.getElementsByClassName('sleep-radio-icons')]
        this.diaperIconArray = [...document.getElementsByClassName('diaper-checkbox-icons')]
        
        
        this.buildFoodIconEvents()
        this.buildSleepIconEvents()
        this.buildDiaperIconEvents()

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
        icon.lastElementChild.style.color = "#ffffff"
        icon.children[1].style.filter="invert(100%)"
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
            "#ffff0091": 'wet-diaper-icon',
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
            "#00ff91db": 'lunch-icon',
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
                    this.iconToggle(el, `${color}`)
                } else {
                    this.iconToggle(el, `${color}`)
                }
                
            }.bind(this));
        }
    }


    resetIcons(icons) {
        let toBeToggled = [].concat(icons || [])
        for (let index = 0; index < toBeToggled.length; index++) {
            const element = toBeToggled[index];
            if (this.iconSelected(element)){
                element.style.background = ""
                element.lastElementChild.style.color = "#656167"
                element.children[1].style.filter=""
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


}
