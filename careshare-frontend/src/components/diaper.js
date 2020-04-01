class Diaper {
    
    constructor(id, wet, soiled, time, shift_id) {
        
        //do i need ID - am I passing this value into anything or can I just use this instance
        this.id = id
        this.wet = wet;
        this.soiled = soiled;
        this.time = time;
        this.shift_id = shift_id;
        this.counter = document.getElementById('diaper-count')
        this.wetCount = document.getElementById('wet-count')
        this.soiledCount = document.getElementById('soiled-count')
        this.increaseDiaperCount()
        this.addToShiftTimeline()
        this.adapter = new DiapersAdapter()
    }

    diaperLabel(){
        if (this.wet && this.soiled){
            return "wet-soiled"
        } else if (this.wet){
            return "wet"
        } else if (this.soiled){
            return "soiled"
        }
    }

    addToShiftTimeline(){
        const timeLineReport = document.getElementById('timeline-report')
        let li = document.createElement('li')
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = "delete"
        deleteButton.setAttribute('id', `${this.id}`);
        deleteButton.setAttribute('class', `${this.diaperLabel()}-diaper-delete`)
        let time = DateDisplay.convertTime(this.time)
        li.innerHTML = `${time} - ${this.diaperStatusDisplay()}`
        timeLineReport.append(li)
        li.append(deleteButton)
        deleteButton.addEventListener("click", (evt) => {
            let target = evt.target
            target.parentElement.remove()
            this.deleteDiaper()
        })
        Shift.orderTimeline();
    }

    diaperStatusDisplay(){
        if (this.wet && this.soiled){
            return "Changed a wet + soiled diaper   "
        }else 
        if (this.wet){
            return "Changed a wet diaper   "
        }else
        if (this.soiled){
            return "Changed a soiled diaper   "
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
        this.decreaseCounter(this.counter)
        if (this.wet) {
            this.decreaseCounter(this.wetCount)
        }
        if (this.soiled){
            this.decreaseCounter(this.soiledCount)
        }
    }

    
    //maybe redundant
    deleteDiaper() {
        //this.exitShiftToggles() 
        const configurationObject = {
            method: 'DELETE',
        };
        this.adapter.deleteDiaperFromApi(configurationObject, this.id).then(() => this.decreaseDiaperCount())
    }




}