class Shift {
    
    constructor(caregiver, date) {
        this.caregiver = caregiver;
        this.date = date;
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

    bindEventListeners(){
        this.wetDiaperButton.addEventListener("click", function() {
            this.newShiftToggles()
        }.bind(this));
        this.soiledDiaperButton.addEventListener("click", function() {
            this.newShiftToggles()
        }.bind(this));
        this.diaperCompleteButton.addEventListener("click", function() {
            this.previousShiftToggles()
        }.bind(this));
        this.snackButton.addEventListener("click", function() {
            this.goBackToggles();
        }.bind(this));
        this.breakfastButton.addEventListener("click", function() {
            this.goBackToggles();
        }.bind(this));
        this.lunchButton.addEventListener("click", function() {
            this.goBackToggles();
        }.bind(this));
        this.dinnerButton.addEventListener("click", function() {
            this.goBackToggles();
        }.bind(this));
        this.addShiftForm.addEventListener('submit', function(e) {
            event.preventDefault();
            this.addShiftFormToggles()
            //this.grabDate();
            this.addNewShift(e);
            this.addShiftForm.reset();
        }.bind(this));
        this.shiftsDropDown.addEventListener("change", function(event) {
            this.getAndLoadShift(event);
        }.bind(this));
    }

  }