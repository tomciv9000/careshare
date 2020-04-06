class Food {
    
    constructor(id, snack, breakfast, lunch, dinner, description, time) {
        this.id = id
        this.snack = snack;
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
        this.description = description;
        this.time = DateDisplay.convertTime(time);
        this.addToShiftTimeline();
        Counters.increaseFoodCount(this.foodLabel());
    }

    foodLabel(){
        if (this.snack){
            return 'snack';
        } else if (this.breakfast){
            return 'breakfast';
        } else if (this.lunch){
            return 'lunch';
        } else if (this.dinner){
            return 'dinner';
        }
    }

    addToShiftTimeline(){
        const timeLineReport = document.getElementById('timeline-report');
        let li = document.createElement('li');
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'delete';
        deleteButton.setAttribute('id', `${this.id}`);
        deleteButton.setAttribute('class', `${this.foodLabel()}-food-delete`);
        li.innerHTML = `${this.foodStatusDisplay()}`;
        timeLineReport.append(li);
        li.append(deleteButton);
        Shift.orderTimeline();
    }

    foodStatusDisplay(){
        if (this.snack){
            return `${this.time} - Snack: ${this.description}   `;
        } else if (this.breakfast){
            return `${this.time} - Breakfast: ${this.description}   `;
        } else if (this.lunch){
            return `${this.time} - Lunch: ${this.description}   `;
        } else if (this.dinner){
            return `${this.time} - Dinner: ${this.description}   `;
        }
    }
    
    static deleteFood(classLabel, id) {
        const configurationObject = {
            method: 'DELETE',
        };
        const adapter = new ResourceAdapter('foods');
        adapter.deleteResourceFromApi(configurationObject, id).then(() => Counters.decreaseFoodCount(classLabel));
    }




}