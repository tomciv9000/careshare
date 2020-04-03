//I need to build functions that take in the loadprevious shift data and repopulate the timeline.





class Shifts {
    constructor() {
        this.today = new Date()
        this.adapter = new ShiftsAdapter();
        this.addShiftForm = document.querySelector('#add-shift-form');
        this.actionPanel = document.querySelector(".action-container");
        this.dropDownDiv = document.querySelector('#all-shifts-dropdown');
        this.shiftsDropDown = document.getElementById("shifts-dropdown");
        this.newShiftButton = document.getElementById('new-shift');
        this.previousShiftsButton = document.getElementById('select-shift');
        this.formButtons = document.querySelector('.form-show-buttons');
        this.goBackButton = document.getElementById('go-back');
        this.actionWrapper = document.getElementById('action-wrapper');
        this.timelineDiv = document.getElementById('timeline')
        this.headerDiv = document.getElementById('timeline-info-header')
        this.timelineButtons = document.querySelector('#timeline-buttons');
        this.bindEventListeners();
        //this.fetchAndPopulateDropDown();
    }

    elementHidden(element){
        return !!element.classList.contains("hidden")
    }
    
    toggle(elements) {
        let toBeToggled = [].concat(elements || []);  
        for (var i = 0; i < toBeToggled.length; i++){
            if (this.elementHidden(this.toBeToggled[i])) {
                toBeToggled[i].classList.remove("hidden");
            } else {
                toBeToggled[i].className += " hidden";
            }       
        }        
    }  

    addShiftFormToggles(){
        this.toggle([this.addShiftForm, this.goBackButton, this.actionWrapper])
    }

    newShiftToggles(){
        this.toggle([this.addShiftForm, this.formButtons, this.goBackButton])
    }

    previousShiftToggles(){
        this.toggle([this.dropDownDiv, this.formButtons, this.goBackButton])
    }

    selectShiftToggles(){
        if (!this.elementHidden(this.goBackButton)) {
            this.toggle(this.goBackButton)
        }
        if (this.elementHidden(this.timelineDiv)) {
            this.toggle(this.timelineDiv)
        }
        
    }

    exitShiftToggles(){
        this.shiftsDropDown.selectedIndex = 0
        this.toggle(this.formButtons)
        if (!this.elementHidden(this.actionWrapper)) {
            this.toggle(this.actionWrapper)
        } else {
            this.toggle(this.dropDownDiv)
        } 
        this.clearTimeLine()

    }

    goBackToggles(){
        this.toggle([this.goBackButton, this.formButtons])
        if (!this.elementHidden(this.addShiftForm)) {
            this.toggle(this.addShiftForm)
        }else {
            this.toggle(this.dropDownDiv)
        }
    }

    bindEventListeners(){
        this.newShiftButton.addEventListener("click", function() {
            this.newShiftToggles()
        }.bind(this));
        this.previousShiftsButton.addEventListener("click", function() {
            //dropdown needs to be cleared every time I do this.
            this.refreshDropDown()
            this.previousShiftToggles()
        }.bind(this));
        this.goBackButton.addEventListener("click", function() {
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
    
    fetchAndPopulateDropDown() {
        this.adapter.getShifts().then(shifts => this.populateShiftsDropDown(shifts))
    }
    
    populateShiftsDropDown(shiftData) {
        //i need to clear the dropdown before populating it 
        let shifts = [].concat(shiftData || [])
        shifts.sort((a, b) => (a.attributes.date < b.attributes.date) ? 1 : -1)
        for (let shift of shifts) {
          let option = document.createElement("option")
          option.value = shift.attributes.id
          option.innerHTML = `${shift.attributes.caregiver} - ${DateDisplay.formatDate(shift.attributes.date)}` 
          //this.shiftsDropDown.appendChild(option)
          this.shiftsDropDown.append(option)
        }
    }

    toggle(elements) {
        let toBeToggled = [].concat(elements || []);  
        for (var i = 0; i < toBeToggled.length; i++){
            if (this.elementHidden(toBeToggled[i])) {
                toBeToggled[i].classList.remove("hidden");
            } else {
                toBeToggled[i].className += " hidden";
            }       
        }        
    }  

    addNewShift(event){
        let shiftInput = {
            caregiver: event.target.caregiver.value,
            date: this.today.toISOString().split('T')[0]
          }
        //const shift = new Shift(shiftInput.caregiver, shiftInput.date)
        const configurationObject = {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(shiftInput)
        };
        this.adapter.postShiftToApi(configurationObject).then(function(json) {
            let shift = new Shift(shiftInput.caregiver, shiftInput.date, json.data.attributes.id)
            //logging to see what ID is passed
            console.log(shift)
            this.toggle(this.timelineDiv)
            this.refreshDropDown()
            //the below method should be moved into shift.js
            this.loadShiftReviewButtons(json.data.attributes.id)
            this.addShiftEventListeners(json.data.attributes.id)
            shift.createShiftTimeline(json.data.attributes)
        }.bind(this)) 
    }


    addShiftEventListeners(id){
        let closeButton = document.querySelector('.closeButton')
        let deleteButton = document.querySelector('.deleteButton')
        closeButton.addEventListener('click', function() {
            console.log('close button was clicked')
            this.exitShiftToggles()
        }.bind(this))
        deleteButton.addEventListener('click', function() {
            console.log('delete button was clicked')
            this.deleteShift(id)
        }.bind(this))
    }

    refreshDropDown(){
        this.resetDropDown()
        this.fetchAndPopulateDropDown()
    
    }
        
    resetDropDown(){
	    for(let i=this.shiftsDropDown.options.length-1;i>=1;i--){
		this.shiftsDropDown.remove(i);
	}
        this.shiftsDropDown.selectedIndex = 0
    }

    
    deleteShift(id) {
        this.exitShiftToggles() 
        const configurationObject = {
            method: 'DELETE',
        };
        this.adapter.deleteShiftFromApi(configurationObject, id).then(() => this.refreshDropDown())
    }

    clearTimeLine(){
        this.toggle(this.timelineDiv)
        this.headerDiv.innerHTML = ""
        this.timelineButtons.innerHTML = ""
    }

    getAndLoadShift(event) {
        this.selectShiftToggles()
        const shiftID = event.target.value
        this.adapter.loadPreviousShift(shiftID).then(json => this.viewPreviousShift(json.data.attributes))
    }

    viewPreviousShift(shift) {
        console.log(shift)
        let footerButtons = document.getElementById('timeline-buttons')
        this.headerDiv.innerHTML = ""
        footerButtons.innerHTML = ""
        this.loadShiftReviewButtons(shift.id)
        const previous = new Shift(shift.caregiver, shift.date)        
        //i can hide the panel possibly to avoid the build of it?
        previous.createShiftTimeline(shift);
        this.addShiftEventListeners(shift.id)
    }

    loadShiftReviewButtons(id){
        let closeBtn = document.createElement('button');
        closeBtn.setAttribute('class', 'closeButton')
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'deleteButton')
        if (this.shiftFound(id)) {
            closeBtn.innerText = 'Review Complete'
            deleteBtn.innerText = 'Delete Shift'
        } else {
            closeBtn.innerText = 'Shift Complete'
            deleteBtn.innerText = 'Cancel Shift'
        }
        this.timelineButtons.append(closeBtn)
        this.timelineButtons.append(deleteBtn)
    }

    shiftFound(id){
        let shiftsDropDown = document.getElementById("shifts-dropdown");
        let option = shiftsDropDown.querySelector('[value="' + id + '"]');
        return !!option
    }
      
    
}

