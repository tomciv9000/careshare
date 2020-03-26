class Shift {
    
    constructor(caregiver, date) {
        this.caregiver = caregiver;
        this.date = date;
        formatDateForDisplay() {
            let today = new Date()
            this.dateDisplay.sql = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            this.dateDisplay.dom = today.toLocaleDateString()
        }
    }

    formatDateForDisplay(date){
        let dateArray = date.split('-')
        return dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0]
    }
    //previouslly displayShift(shift) {
    createShiftTimeline(shift){
        let shiftHeader = document.createElement('h1');
        let timelineDiv = document.querySelector('#timeline');
        let closeBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');
        
        shiftHeader.innerText = `${this.formatDateForDisplay(shift.date)} with ${shift.caregiver}`
        timelineDiv.append(shiftHeader)
        
       //left off here
        if (this.shiftFound(shift.id)) {
            closeBtn.innerText = 'Review Complete'
            deleteBtn.innerText = 'Delete Shift'
        } else {
            closeBtn.innerText = 'Shift Complete'
            deleteBtn.innerText = 'Cancel Shift'
            addShiftToDropDown(shift)
        }
        closeBtn.addEventListener('click', e => closeShift(e))
        deleteBtn.addEventListener('click', e => deleteShift(e, shift.id))
        timelineDiv.append(closeBtn)
        timelineDiv.append(deleteBtn)
        //buildShiftEvents(shift)
    }
    
  }