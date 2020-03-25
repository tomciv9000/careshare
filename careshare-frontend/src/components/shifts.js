class Shifts {
    constructor() {
        this.shifts = []
        this.adapter = new ShiftsAdapter();
        this.addShiftForm = document.querySelector('#add-shift-form');
        this.actionPanel = document.querySelector(".action-container");
        this.timelineDiv = document.querySelector('#timeline');
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

    fetchAndPopulateDropDown() {
        getShifts().then(json => populateShiftsDropDown(json))
    }

    bindEventListeners(){
        this.addShiftForm.addEventListener('submit', e => {
            e.preventDefault()
            this.toggleForm()
            this.toggleGoBack()
            this.toggleActionPanel()
            getDates()
            addNewShift(e)
            addShiftForm.reset()
        })
    }




    addShiftForm.addEventListener('submit', e => {
        e.preventDefault()
        toggleForm()
        toggleGoBack()
        toggleActionPanel()
        getDates()
        addNewShift(e)
        addShiftForm.reset()
    })
    
    newShiftButton.addEventListener("click", function() {
        toggleForm();
        toggleButtons();
        toggleGoBack();
    }.bind(this))
    
    previousShiftsButton.addEventListener("click", function() {
        toggleDropDown();
        toggleButtons();
        toggleGoBack();
    }.bind(this))
    
    goBackButton.addEventListener("click", function() {
        goBack()
    }.bind(this))
    
    function bindEventListeners() {
        shiftsDropDown.addEventListener("change", event => getAndLoadShift(event))
    }
    




}