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
        this.toggleColorPairs = {
           // "#ffff0091": 'wet-diaper-icon',
           // "#711e1e66": 'soiled-diaper-icon',
           // "#f55cd1cf": 'nap-icon',
            //"#5c87f5cf": 'bedtime-icon',
            "#00a6ffc8": 'snack-icon',
            "#ff9900fa": 'breakfast-icon',
            "#00ff91db": 'lunch-icon',
            "#6200ffb8": 'dinner-icon'
        }
    }


    createShiftTimeline(shift){
        let shiftHeader = document.createElement('h4');
        //let subHeader = document.createElement('h5')
        let timelineDiv = document.querySelector('#timeline');
        let closeBtn = document.createElement('button');
        closeBtn.setAttribute('id', 'closeButton')
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('id', 'deleteButton')
        shiftHeader.innerHTML = `Caregiver: ${shift.caregiver}` + "<br />" + `Date: ${DateDisplay.formatDate(shift.date)}`
        //subHeader.innerText = `Caregiver: ${shift.caregiver}`
        timelineDiv.append(shiftHeader);
        //timelineDiv.append(subHeader);
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

    iconReset(icon){
        icon.style.background = ""
    }

    iconColorToggle(icon, color){
        icon.style.background = color
        icon.lastElementChild.style.color = "#ffffff"
        icon.children[1].style.filter="invert(100%)"
    }

    buildIconEvents(){
        const icons = [...document.getElementsByClassName('icons')].slice(0,4)
        for (const color in this.toggleColorPairs){ 
            let el = document.getElementById(`${this.toggleColorPairs[color]}`);
            el.addEventListener("click", function() {
                this.resetIcons(icons)
                this.iconColorToggle(el, `${color}`)
            }.bind(this));
            
        }
    }

    foodValueChanged() {
        if (document.getElementById("snack").checked == true) {
           this.snackIcon.background = "#00a6ffc8"
        } else if (document.getElementById("breakfast").checked == true) {
            this.breakfastIcon.background = "#00a6ffc8"
        } else if (document.getElementById("lunch").checked == true) {
            this.lunchIcon.background = "#00a6ffc8"
        } else if (document.getElementById("dinner").checked == true) {
            this.dinnerIcon.background = "#00a6ffc8"
        }
    }
    
    //works
    resetIcons(iconArray) {
        for (let index = 0; index < iconArray.length; index++) {
            const element = iconArray[index];
            if (!element.style.background == "") {
                element.style.background = ""
                element.lastElementChild.style.color = "#656167"
                element.children[1].style.filter=""
            }
        }
    }


  }