class Shifts {
    constructor() {
        this.shifts = []
        this.today = new Date()

        this.adapter = new ShiftsAdapter();
        this.addShiftForm = document.querySelector('#add-shift-form');
        this.actionPanel = document.querySelector(".action-container");
        //this.timelineDiv = document.querySelector('#timeline');
        this.dropDownDiv = document.querySelector('#all-shifts-dropdown');
        this.shiftsDropDown = document.getElementById("shifts-dropdown");
        this.newShiftButton = document.getElementById('new-shift');
        this.previousShiftsButton = document.getElementById('select-shift');
        this.formButtons = document.querySelector('.form-show-buttons');
        this.goBackButton = document.getElementById('go-back');
        this.actionWrapper = document.getElementById('action-wrapper');
        
        this.bindEventListeners();
        this.fetchAndPopulateDropDown();
    }
//attempt to make toggle transition functions
    elementHidden(element){
        return !!element.classList.contains("hidden")
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

    addShiftFormToggles(){
        this.toggle([this.addShiftForm, this.goBackButton, this.actionWrapper])
    }

    newShiftToggles(){
        this.toggle([this.addShiftForm, this.formButtons, this.goBackButton])
    }

    previousShiftToggles(){
        this.toggle([this.dropDownDiv, this.formButtons, this.goBackButton])
    }

    goBackToggles(){
        this.toggle([this.goBackButton, this.formButtons])
        if (!this.elementHidden(this.addShiftForm)) {
            this.toggle(this.addShiftForm)
        }else {
            this.toggle(this.dropDownDiv)
        }
    }
//end attempt

    bindEventListeners(){
        this.newShiftButton.addEventListener("click", function() {
            this.newShiftToggles()
        }.bind(this));
        this.previousShiftsButton.addEventListener("click", function() {
            this.previousShiftToggles()
        }.bind(this));
        this.goBackButton.addEventListener("click", function() {
            this.goBackToggles();
        }.bind(this));
        this.addShiftForm.addEventListener('submit', function() {
            event.preventDefault();
            this.addShiftFormToggles()
            this.grabDate();
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
        let shifts = [].concat(shiftData || [])
        shifts.sort((a, b) => (a.attributes.date < b.attributes.date) ? 1 : -1)
        for (let shift of shifts) {
          let option = document.createElement("option")
          option.value = shift.attributes.id
          option.innerHTML = `${shift.attributes.caregiver} - ${DateDisplay.formatDate(shift.attributes.date)}` 
          this.shiftsDropDown.appendChild(option)
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
        const shift = new Shift(shiftInput.caregiver, shiftInput.date)
        const configurationObject = {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(shiftInput)
        };
        this.adapter.postShiftToApi(configurationObject).then(function(json) {
            shift.createShiftTimeline(json.data.attributes);
            this.addShiftToDropDown()
        }.bind(this)) 
    }

    addShiftToDropDown(){
        this.resetDropDown()
        this.fetchAndPopulateDropDown()
    
    }
        
    resetDropDown(){
	    for(let i=shiftsDropDown.options.length-1;i>=1;i--){
		shiftsDropDown.remove(i);
	}
        shiftsDropDown.selectedIndex = 0
    }

    
   // this.createShift(shift)


}