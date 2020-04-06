class Diaper {
    
    constructor(id, wet, soiled, time) {
        this.id = id;
        this.wet = wet;
        this.soiled = soiled;
        this.time = DateDisplay.convertTime(time);
        this.counter = document.getElementById('diaper-count');
        this.wetCount = document.getElementById('wet-count');
        this.soiledCount = document.getElementById('soiled-count');
        this.addToShiftTimeline();
        Counters.increaseDiaperCount(this.diaperLabel());
    }

    diaperLabel(){
        if (this.wet && this.soiled){
            return 'wet-soiled';
        } else if (this.wet){
            return 'wet';
        } else if (this.soiled){
            return 'soiled';
        }
    }

    addToShiftTimeline(){
        const timeLineReport = document.getElementById('timeline-report');
        let li = document.createElement('li');
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'delete';
        deleteButton.setAttribute('id', `${this.id}`);
        deleteButton.setAttribute('class', `${this.diaperLabel()}-diaper-delete`);
        li.innerHTML = `${this.diaperStatusDisplay()}`;
        timeLineReport.append(li);
        li.append(deleteButton);
        Shift.orderTimeline();
    }

    diaperStatusDisplay(){
        if (this.wet && this.soiled){
            return `${this.time} - Changed a wet + soiled diaper   `;
        }else 
        if (this.wet){
            return `${this.time} - Changed a wet diaper   `;
        }else
        if (this.soiled){
            return `${this.time} - Changed a soiled diaper   `;
        }
    }

    static deleteDiaper(classLabel, id) {
        const configurationObject = {
            method: 'DELETE',
        };
        const adapter = new ResourceAdapter('diapers')
        adapter.deleteResourceFromApi(configurationObject, id).then(() => Counters.decreaseDiaperCount(classLabel));
    }




}