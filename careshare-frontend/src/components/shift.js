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
            "#ffff0091": 'wet-diaper-icon',
            "#711e1e66": 'soiled-diaper-icon',
            "#f55cd1cf": 'nap-icon',
            "#5c87f5cf": 'bedtime-icon',
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

    //bindEventListeners(){
    //    this.wetIcon.addEventListener("click", function() {
    //        this.iconColorToggle(this.wetIcon, "#ffff0091")
    //    }.bind(this));
    //    this.soiledIcon.addEventListener("click", function() {
    //        this.iconColorToggle(this.soiledIcon, "#711e1e66")
    //    }.bind(this));
    //    this.snackIcon.addEventListener("click", function() {
    //        this.iconColorToggle(this.snackIcon, "#00a6ffc8")
    //    }.bind(this));
    //    this.breakfastIcon.addEventListener("click", function() {
    //        this.iconColorToggle(this.breakfastIcon, "#ff9900fa")
    //    }.bind(this));
    //    this.lunchIcon.addEventListener("click", function() {
    //        this.iconColorToggle(this.lunchIcon, "#00ff91db")
    //    }.bind(this));
    //    this.dinnerIcon.addEventListener("click", function() {
    //        this.iconColorToggle(this.dinnerIcon, "#6200ffb8")
    //    }.bind(this));
    //    this.napIcon.addEventListener("click", function() {
    //        this.iconColorToggle(this.napIcon, "#f55cd1cf")
    //    }.bind(this));
    //    this.bedtimeIcon.addEventListener("click", function() {
    //        this.iconColorToggle(this.bedtimeIcon, "#5c87f5cf")
    //    }.bind(this));
        //this.diaperDone.addEventListener("change", function(event) {
        //    this.getAndLoadShift(event);
        //}.bind(this));
        //this.foodDone.addEventListener("change", function(event) {
        //    this.getAndLoadShift(event);
        //}.bind(this));
        //this.sleepDone.addEventListener("change", function(event) {
        //    this.getAndLoadShift(event);
        //}.bind(this));
        //this.noteDone.addEventListener("change", function(event) {
        //    this.getAndLoadShift(event);
        //}.bind(this));
    //}


    wetDiaperSelect(){
        this.iconColorToggle(this.wetIcon, "#ffff0091")
    }
    
    soiledDiaperSelect(){
        this.iconColorToggle(this.soiledIcon, "#711e1e66")
    }
    
    napSelect(){
        this.iconColorToggle(this.napIcon, "#f55cd1cf")
    }
    
    bedtimeSelect(){
        this.iconColorToggle(this.bedtimeIcon, "#5c87f5cf")
    }
    
    snackSelect(){
        this.iconColorToggle(this.snackIcon, "#00a6ffc8")
    }
    
    breakfastSelect(){
        this.iconColorToggle(this.breakfastIcon, "#ff9900fa")
    }
    
    lunchSelect(){
        this.iconColorToggle(this.lunchIcon, "#00ff91db")
    }
    
    dinnerSelect(){
        this.iconColorToggle(this.dinnerIcon, "#6200ffb8")
    }

    iconSelected(icon){
        return !icon.style.background == ""
    }

    iconReset(icon){
        icon.style.background = ""
    }

    iconColorToggle(icon, color){
        if (this.iconSelected(icon)){
            this.iconReset(icon)
        } else {
            icon.style.background = color
        }
    }

    refactoredIconColorToggleandBind(){
        for (const color in this.toggleColorPairs){ 
            let el = document.getElementById(`${this.toggleColorPairs[color]}`);
            el.addEventListener("click", function() {
                this.iconColorToggle(el, `${color}`)
            }.bind(this));
            
        }
    }


  }