class Diaper {
    
    constructor(wet, soiled, time, shift_id) {
        this.wet = wet;
        this.soiled = soiled;
        this.time = time;
        this.shift_id = shift_id;
        this.counter = document.getElementById('diaper-count')
        this.wetCount = document.getElementById('wet-count')
        this.soiledCount = document.getElementById('soiled-count')
        this.increaseDiaperCount()
        this.addToShiftTimeline()
    }

    addToShiftTimeline(){
        const timeLineReport = document.getElementById('timeline-report')
        let li = document.createElement('li')
        let time = DateDisplay.convertTime(this.time)
        li.innerHTML = `${time} - ${this.diaperStatusDisplay()} <button>x</button>`
        timeLineReport.append(li)
    }

    diaperStatusDisplay(){
        if (this.wet && this.soiled){
            return "Changed a wet + soiled diaper"
        }else 
        if (this.wet){
            return "Changed a wet diaper"
        }else
        if (this.soiled){
            return "Changed a soiled diaper"
        }
    }
    
    increaseDiaperCount(){
        this.increaseCounter(this.counter)
        if (this.wet) {
            this.increaseCounter(this.wetCount)
        }
        if (this.soiled){
            this.increaseCounter(this.soiledCount)
        }
    }

    increaseCounter(counters){
        let toBeIncreased = [].concat(counters || [])
        for (let index = 0; index < toBeIncreased.length; index++) {
            const element = toBeIncreased[index];
            element.innerHTML = parseInt(element.innerHTML) + 1
        }
    }

    decreaseCounter(counters){
        let toBeDecreased = [].concat(counters || [])
        for (let index = 0; index < toBeDecreased.length; index++) {
            const element = toBeDecreased[index];
            element.innerHTML = parseInt(element.innerHTML) - 1
        }
    }

    decreaseDiaperCount(){
        this.counter.innerHTML = parseInt(this.counter.innerHTML) - 1
    }


}