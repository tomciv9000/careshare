class Diaper {
    
    constructor(wet, soiled, time, shift_id) {
        this.wet = wet;
        this.soiled = soiled;
        this.time = time;
        this.shift_id = shift_id;
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
    

  }