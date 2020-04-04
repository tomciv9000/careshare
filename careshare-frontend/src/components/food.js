class Food {
    
    constructor(id, snack, breakfast, lunch, dinner, description, time) {
        
        //do i need ID - am I passing this value into anything or can I just use this instance
        this.id = id
        this.snack = snack;
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
        this.description = description;
        this.time = DateDisplay.convertTime(time);
        //this.shift_id = shift_id;
        //this.counter = document.getElementById('diaper-count')
        //this.wetCount = document.getElementById('wet-count')
        //this.soiledCount = document.getElementById('soiled-count')
        this.addToShiftTimeline()
        Counters.increaseFoodCount(this.foodLabel());
        //this.adapter = new DiapersAdapter()
    }

    foodLabel(){
        if (this.snack){
            return "snack"
        } else if (this.breakfast){
            return "breakfast"
        } else if (this.lunch){
            return "lunch"
        } else if (this.dinner){
            return "dinner"
        }
    }

    addToShiftTimeline(){
        const timeLineReport = document.getElementById('timeline-report')
        let li = document.createElement('li')
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = "delete"
        deleteButton.setAttribute('id', `${this.id}`);
        deleteButton.setAttribute('class', `${this.foodLabel()}-food-delete`)
        li.innerHTML = `${this.foodStatusDisplay()}`
        timeLineReport.append(li)
        li.append(deleteButton)
        //deleteButton.addEventListener("click", (evt) => {
        //    let target = evt.target
        //    target.parentElement.remove()
        //    Diaper.deleteDiaper(this.diaperLabel, this.id)
        //})
        Shift.orderTimeline();
    }

    foodStatusDisplay(){
        if (this.snack){
            return `${this.time} - Snack: ${this.description}   `
        } else if (this.breakfast){
            return `${this.time} - Breakfast: ${this.description}   `
        } else if (this.lunch){
            return `${this.time} - Lunch: ${this.description}   `
        } else if (this.dinner){
            return `${this.time} - Dinner: ${this.description}   `
        }
    }
    
    //increaseDiaperCount(){
    //    this.increaseCounter(this.counter)
    //    if (this.wet) {
    //        this.increaseCounter(this.wetCount)
    //    }
    //    if (this.soiled){
    //        this.increaseCounter(this.soiledCount)
    //    }
    //}
//
    //increaseCounter(counters){
    //    let toBeIncreased = [].concat(counters || [])
    //    for (let index = 0; index < toBeIncreased.length; index++) {
    //        const element = toBeIncreased[index];
    //        element.innerHTML = parseInt(element.innerHTML) + 1
    //    }
    //}
//
    //decreaseCounter(counters){
    //    let toBeDecreased = [].concat(counters || [])
    //    for (let index = 0; index < toBeDecreased.length; index++) {
    //        const element = toBeDecreased[index];
    //        element.innerHTML = parseInt(element.innerHTML) - 1
    //    }
    //}
//
    ////decreaseDiaperCount(){
    //    this.decreaseCounter(this.counter)
    //    if (this.wet) {
    //        this.decreaseCounter(this.wetCount)
    //    }
    //    if (this.soiled){
    //        this.decreaseCounter(this.soiledCount)
    //    }
    //}

    
    //maybe 
    static deleteFood(classLabel, id) {
        const configurationObject = {
            method: 'DELETE',
        };
        const adapter = new FoodsAdapter()
        adapter.deleteFoodFromApi(configurationObject, id).then(() => Counters.decreaseFoodCount(classLabel))
    }




}