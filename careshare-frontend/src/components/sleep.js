class Sleep {
    
    constructor(id, nap, bedtime, start, end, duration) {
        this.id = id;
        this.nap = nap;
        this.bedtime = bedtime;
        this.start = DateDisplay.convertTime(start);
        this.end = DateDisplay.convertTime(end);
        this.duration = duration;
        this.napDuration = document.getElementById('nap-duration');
        this.bedtimeDuration = document.getElementById('bedtime-duration');
        this.sleepTotal = document.getElementById('total-sleep');
        this.addToShiftTimeline();
        Counters.increaseSleepCount(this.sleepLabel(), this.duration)
    }

   addToShiftTimeline(){
       const timeLineReport = document.getElementById('timeline-report');
       let li = document.createElement('li');
       let deleteButton = document.createElement('button');
       deleteButton.innerHTML = "delete";
       deleteButton.setAttribute('id', `${this.id}`);
       deleteButton.setAttribute('class', `${this.sleepLabel()}-delete`);
       li.innerHTML = this.sleepStatusDisplay();
       timeLineReport.append(li);
       li.append(deleteButton);
       Shift.orderTimeline();
   }
  
   sleepLabel(){
        let label = this.nap ? 'nap' : 'bedtime';
        return label;
    }

   
   sleepStatusDisplay(){
       let restType = this.nap ? 'Took a nap' : 'Went to bed';
       let downAt = `${DateDisplay.convertTime(this.start)}`;
       let upAt = `${DateDisplay.convertTime(this.end)}`;
       return `${downAt} - ${restType}, woke up at ${upAt}   `;
   }
   
   increaseSleepCount(){
       if (this.nap) {
           this.increaseCounter(this.napDuration);
       }
       if (this.bedtime){
           this.increaseCounter(this.bedtimeDuration);
       }
       this.increaseCounter(this.sleepTotal);
   }
   
   static deleteSleep(classLabel, id) {
       const configurationObject = {
           method: 'DELETE',
       };
       const adapter = new ResourceAdapter('sleeps');
       adapter.deleteResourceFromApi(configurationObject, id).then((json) => Counters.decreaseSleepCount(classLabel, json.duration));
   }

}