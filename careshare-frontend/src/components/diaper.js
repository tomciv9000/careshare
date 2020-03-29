class Diaper {
    
    constructor(wet, soiled, time, shift_id) {
        this.wet = wet;
        this.soiled = soiled;
        this.time = time;
        this.shift_id = shift_id;
        this.counter = document.getElementById('diaper-count')
        this.details = document.getElementById('diaper-details')
        id="diaper-details">Wet: 0 Soiled:0
    }

    addToShiftTimeline(shift){
        //let timelineDiv = document.querySelector('#timeline');
        let closeBtn = document.createElement('button');
        
        timelineDiv.append(closeBtn)
        timelineDiv.append(deleteBtn)
    }
    
    increaseDiaperCount(){
        this.counter.innerHTML = parseInt(this.counter.innerHTML) + 1
    }

    decreaseDiaperCount(){
        this.counter.innerHTML = parseInt(this.counter.innerHTML) - 1
    }

  }