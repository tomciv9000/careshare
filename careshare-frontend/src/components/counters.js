class Counters {

    static increaseDiaperCount(label){
        const counter = document.getElementById('diaper-count')
        const wetCount = document.getElementById('wet-count')
        const soiledCount = document.getElementById('soiled-count')
        const wetSoiledCount = document.getElementById('wet-soiled-count')
        if (label == 'wet-soiled'){
            this.increaseCounter([counter, wetSoiledCount])
        } else
        if (label == 'wet') {
            this.increaseCounter([counter, wetCount])
        } else
        if (label == 'soiled') {
            this.increaseCounter([counter, soiledCount])
        }
    }
//I need to build a sleep increase counter method to accurately reflect the number of hours, also need to pass this value in
    static increaseSleepCount(label, hours){
        const napCount = document.getElementById('nap-duration')
        const bedtimeCount = document.getElementById('bedtime-duration')
        const totalSleepCount = document.getElementById('total-sleep')
        if (label == 'nap'){
            this.increaseCounter([totalSleepCount, napCount], hours)
        } else
        if (label == 'bedtime') {
            this.increaseCounter([totalSleepCount, bedtimeCount], hours)
        } 
    }

    static increaseCounter(counters, increment=1){
        let toBeIncreased = [].concat(counters || [])
        for (let index = 0; index < toBeIncreased.length; index++) {
            const element = toBeIncreased[index];
            if (increment == 1){
                element.innerHTML = parseInt(element.innerHTML) + increment
            } else
            if (increment != 1){
                element.innerHTML = (parseFloat(element.innerHTML)*10 + increment * 10)/10
            }
        }
    }

    static decreaseCounter(counters, increment=1){
        let toBeDecreased = [].concat(counters || [])
        for (let index = 0; index < toBeDecreased.length; index++) {
            const element = toBeDecreased[index];
            if (increment == 1){
                element.innerHTML = parseInt(element.innerHTML) - increment
            } else
            if (increment != 1){
                element.innerHTML = (parseFloat(element.innerHTML)*10 - increment * 10)/10
            }
        }
    }

    static decreaseDiaperCount(classLabel){
        const counter = document.getElementById('diaper-count')
        const wetCount = document.getElementById('wet-count')
        const soiledCount = document.getElementById('soiled-count')
        const wetSoiledCount = document.getElementById('wet-soiled-count')
        if (classLabel == 'wet-soiled-diaper-delete'){
            this.decreaseCounter([counter, wetSoiledCount])
        } else
        if (classLabel == 'wet-diaper-delete') {
            this.decreaseCounter([counter, wetCount])
        } else
        if (classLabel == 'soiled-diaper-delete') {
            this.decreaseCounter([counter, soiledCount])
        }
    }

    static decreaseSleepCount(classLabel, hours){
        const napCount = document.getElementById('nap-duration')
        const bedtimeCount = document.getElementById('bedtime-duration')
        const totalSleepCount = document.getElementById('total-sleep')
        if (classLabel == 'nap-delete'){
            this.decreaseCounter([napCount, totalSleepCount], hours)
        } else
        if (classLabel == 'bedtime-delete') {
            this.decreaseCounter([bedtimeCount, totalSleepCount], hours)
        } 
    }
}