class Shifts {
    constructor() {
        this.shifts = []
        this.adapter = new ShiftsAdapter();
        this.addShiftForm = document.querySelector('#add-shift-form')
        //this.actionPanel = document.querySelector(".action-container")
        //this.timelineDiv = document.querySelector('#timeline')
        this.dropDownDiv = document.querySelector('#all-shifts-dropdown')
        this.shiftsDropDown = document.getElementById("shifts-dropdown")
        this.newShiftButton = document.getElementById('new-shift')
        this.previousShiftsButton = document.getElementById('select-shift')
        this.formButtons = document.querySelector('.form-show-buttons')
        this.goBackButton = document.getElementById('go-back')
        this.actionWrapper = document.getElementById('action-wrapper')

        }
}