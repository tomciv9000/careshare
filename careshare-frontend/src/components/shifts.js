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
        this.bindEventListeners();
        this.fetchAndPopulateDropDown();
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
        this.clearTimeLine()
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
            shift.createShiftTimeline(json.data.attributes);
            this.refreshDropDown()
            this.addShiftEventListeners(json.data.attributes.id)
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

    addShiftEventListeners(id){
        let closeButton = document.getElementById('closeButton')
        let deleteButton = document.getElementById('deleteButton')
        closeButton.addEventListener('click', function() {
            this.exitShiftToggles()
        }.bind(this))
        deleteButton.addEventListener('click', function() {
            this.deleteShift(id)
        }.bind(this))
    }
    
    deleteShift(id) {
        this.exitShiftToggles() 
        const configurationObject = {
            method: 'DELETE',
        };
        this.adapter.deleteShiftFromApi(configurationObject, id).then(() => this.refreshDropDown())
    }

    clearTimeLine(){
        this.timelineDiv.innerHTML = ""
    }

    getAndLoadShift(event) {
        this.selectShiftToggles()
        const shiftID = event.target.value
        this.adapter.loadPreviousShift(shiftID).then(json => this.viewPreviousShift(json.data.attributes))
    }

    viewPreviousShift(shift) {
        const previous = new Shift(shift.caregiver, shift.date)
        //i can hide the panel possibly to avoid the build of it?
        previous.createShiftTimeline(shift);
        this.addShiftEventListeners(shift.id)


//start attempt

        //if I create a new shift from the id, i could call a method from that instance
        //like const prev

      }
      
    
}


// load a shift and for every diaper object in the array of diapers i need to biold

    //i can hide the panel possibly to avoid the build of it?
 
    //printReport would be a function that iterates through the API data and makes the appropriate 
    //adjustments to the DOM based on that data.
    //you have to build all the timeline notes

    //FUCK IT do it on the backend, can't i just compile different data from the API?


//how agout when you hit "shift complte" i grab all the values in the DOM timeline and somehow 
//save them to snapshot object that can be accessed localStorage
//like 

//snapshot {
 //   for every li in the timeline (queryselector array) save its inner text in an array
//}


//or even better, as events are created, push them into the new timeline array of events

  //  previous.createShiftTimeline(shift);
    //this.addShiftEventListeners(shift.id)
//}