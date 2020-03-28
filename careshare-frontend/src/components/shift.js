class Shift {
    
    constructor(caregiver, date) {
        this.caregiver = caregiver;
        this.date = date;
        this.wetIcon = document.getElementById('wet-diaper-icon')
        this.soiledIcon = document.getElementById('soiled-diaper-icon')
        this.napIcon = document.getElementById('nap-icon')
        this.bedtimeIcon = document.getElementById('bedtime-icon')
        this.snackIcon = document.getElementById('snack-icon')
        this.breakfastIcon = document.getElementById('breakfast-icon')
        this.lunchIcon = document.getElementById('lunch-icon')
        this.dinnerIcon = document.getElementById('dinner-icon')
        this.toggleSleepPairs = {
            "#f55cd1cf": 'nap-icon',
            "#5c87f5cf": 'bedtime-icon'
        }
        this.toggleFoodPairs = {
            "#00a6ffc8": 'snack-icon',
            "#ff9900fa": 'breakfast-icon',
            "#00ff91db": 'lunch-icon',
            "#6200ffb8": 'dinner-icon'
        }
        this.diaperToggleColorPairs = {
            "#ffff0091": 'wet-diaper-icon',
            "#711e1e66": 'soiled-diaper-icon'
        }
        this.buildDiaperIconEvents()
        this.buildFoodIconEvents()
        this.buildSleepIconEvents()
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

    iconColorToggle(icon, color){
        icon.style.background = color
        icon.lastElementChild.style.color = "#ffffff"
        icon.children[1].style.filter="invert(100%)"
    }

    iconMultiSelect(icon, color){
        if (this.iconSelected(icon)) {
            this.resetIcons(icon)
        } else {
            this.iconColorToggle(icon, color)
        }
    }

    buildDiaperIconEvents(){
        for (let color in this.diaperToggleColorPairs){ 
            let el = document.getElementById(`${this.diaperToggleColorPairs[color]}`);
            el.addEventListener("click", function() {
                this.iconMultiSelect(el, `${color}`)
            }.bind(this));
        }
    }

    buildSleepIconEvents(){
        const sleepIcons = [...document.getElementsByClassName('sleep-radio-icons')]
        for (let color in this.toggleSleepPairs){ 
            let el = document.getElementById(`${this.toggleSleepPairs[color]}`);
            el.addEventListener("click", function() {
                this.resetIcons(sleepIcons)
                this.iconMultiSelect(el, `${color}`)
            }.bind(this));
        }
    }


    buildFoodIconEvents(){
        const foodIcons = [...document.getElementsByClassName('food-radio-icons')]
        for (let color in this.toggleFoodPairs){ 
            let el = document.getElementById(`${this.toggleFoodPairs[color]}`);
            el.addEventListener("click", function() {
                this.resetIcons(foodIcons)
                this.iconMultiSelect(el, `${color}`)
            }.bind(this));
        }
        //const sleepIcons = [...document.getElementsByClassName('sleep-radio-icons')]
        //for (let color in this.toggleColorPairs){ 
        //    let sleepEl = document.getElementById(`${this.toggleColorPairs[color]}`);
        //    sleepEl.addEventListener("click", function() {
        //        this.resetIcons(sleepIcons)
        //        this.iconMultiSelect(sleepEl, `${color}`)
        //    }.bind(this));
        //}
        
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

    clickingOutsideClears(){
        document.addEventListener("click", (evt) => {
            const flyoutElement = document.getElementById("farts");
            let targetElement = evt.target; // clicked element
        
            do {
                if (targetElement == flyoutElement) {
                    // This is a click inside. Do nothing, just return.
                    console.log('you clicked inside')
                    return
                }
                // Go up the DOM
                targetElement = targetElement.parentNode;
            } while (targetElement);
        
            // This is a click outside.
            let fartTest = [...document.getElementsByClassName('food-radio-icons')];
            this.resetIcons(fartTest)
        });
    }


}
