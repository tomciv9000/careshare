class Shift {
    
    constructor(caregiver, date) {
        this.caregiver = caregiver;
        this.date = date;
        
    }

    //previouslly displayShift(shift) {
    createShiftTimeline(shift){
        let shiftHeader = document.createElement('h1');
        let timelineDiv = document.querySelector('#timeline');
        let closeBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');
        
        shiftHeader.innerText = `${DateDisplay.formatDate(shift.date)} with ${shift.caregiver}`
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
    
    shiftFound(id){
        let option = shiftsDropDown.querySelector('[value="' + id + '"]');
        return !!option
    }


  }