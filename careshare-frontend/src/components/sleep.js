class Sleep {
    
    constructor(id, nap, bedtime, start, end, duration, shift_id) {
        
        //do i need ID - am I passing this value into anything or can I just use this instance
        this.id = id
        this.nap = nap;
        this.bedtime = bedtime;
        this.start = start;
        this.end = end;
        this.duration = duration
        this.wetCount = document.getElementById('wet-count')
        this.soiledCount = document.getElementById('soiled-count')
        this.increaseDiaperCount()
        this.addToShiftTimeline()
        this.adapter = new DiapersAdapter
    }

    addToShiftTimeline(){
        const timeLineReport = document.getElementById('timeline-report')
        let li = document.createElement('li')
        li.setAttribute('id', `${this.id}`);
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = "delete"
        let time = DateDisplay.convertTime(this.time)
        li.innerHTML = `${time} - ${this.diaperStatusDisplay()}`
        timeLineReport.append(li)
        li.append(deleteButton)
        deleteButton.addEventListener("click", (evt) => {
            let target = evt.target
            target.parentElement.remove()
            this.deleteDiaper()
        })
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

    
    
    deleteDiaper() {
        //this.exitShiftToggles() 
        const configurationObject = {
            method: 'DELETE',
        };
        this.adapter.deleteDiaperFromApi(configurationObject, this.id).then(() => this.decreaseDiaperCount())
    }




}