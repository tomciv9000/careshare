class Sleep {
    
    constructor(id, nap, bedtime, start, end, duration, shift_id) {
        
        //do i need ID - am I passing this value into anything or can I just use this instance
        this.id = id
        this.nap = nap;
        this.bedtime = bedtime;
        this.start = start;
        this.end = end;
        this.duration = duration
        this.napDuration = document.getElementById('nap-duration')
        this.bedtimeDuration = document.getElementById('bedtime-duration')
        this.sleepTotal = document.getElementById('total-sleep')
        this.increaseSleepCount()
        this.addToShiftTimeline()
        this.adapter = new SleepsAdapter()
    }

   addToShiftTimeline(){
       const timeLineReport = document.getElementById('timeline-report')
       let li = document.createElement('li')
       //look for other examples of setting id on attribute, possibly remove them
       //li.setAttribute('id', `${this.id}`);
       let deleteButton = document.createElement('button')
       deleteButton.innerHTML = "delete"
       deleteButton.setAttribute('id', `${this.id}`);
       deleteButton.setAttribute('class', 'sleep-delete')
       li.innerHTML = this.sleepStatusDisplay()
       timeLineReport.append(li)
       li.append(deleteButton)
       deleteButton.addEventListener("click", (evt) => {
           let target = evt.target
           target.parentElement.remove()
           this.deleteSleep()
       })
   }
   sleepStatusDisplay(){
       let restType = this.nap ? 'Took a nap' : 'Went to bed'
       let downAt = `${DateDisplay.convertTime(this.start)}`
       let upAt = `${DateDisplay.convertTime(this.end)}`
       return `${downAt} - ${restType}, woke up at ${upAt}   `
   }
   
   increaseSleepCount(){
       //this.increaseCounter(this.counter)
       if (this.nap) {
           this.increaseCounter(this.napDuration)
       }
       if (this.bedtime){
           this.increaseCounter(this.bedtimeDuration)
       }
       this.increaseCounter(this.sleepTotal)
   }

   //why does this need to have an array ever passed into it?  Maybe not useful anymore
   //parsefloat floating arithmetic issues is a good write up topic
   increaseCounter(counter){
       counter.innerHTML = (parseFloat(counter.innerHTML)*10 + this.duration * 10)/10
   }


   decreaseCounter(counter){
      counter.innerHTML = (parseFloat(counter.innerHTML)*10 - this.duration * 10)/10
   }


   //try and refactor methods like this into ternary operators
   decreaseSleepCount(){
      if (this.nap) {
         this.decreaseCounter(this.napDuration)
      }
      if (this.bedtime){
         this.decreaseCounter(this.bedtimeDuration)
      }
     this.decreaseCounter(this.sleepTotal)
   }
   
   
   deleteSleep() {
       const configurationObject = {
           method: 'DELETE',
       };
       this.adapter.deleteSleepFromApi(configurationObject, this.id).then(() => this.decreaseSleepCount())
   }

}