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

    static increaseFoodCount(label){
        let meal = document.getElementById(label)
        const snack = document.getElementById('snack')

        if (label == "snack"){
            snack.innerText += " +"
        } 
        meal.style.color = "#9700d3"
        console.log(meal)
    }

    static toggleFoodName(food){  
        if(food.style.color = "#9700d3"){
            food.style.color = "#7b716345"
        } else {
            food.style.color = "#9700d3"
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

    static decreaseFoodCount(classLabel){
        let meal = classLabel.split('-')[0]
        let reportLabel = document.getElementById(meal)

        console.log(reportLabel)
        if (meal == 'snack' && reportLabel.innerText.includes("+")){
            reportLabel.innerText = reportLabel.innerText.substring(0, reportLabel.innerText.length - 1)
        } 
        if (!reportLabel.innerText.includes("+")){
            this.toggleFoodName(reportLabel)
        }
        
    }

    static resetCounters(){
        const counter = document.getElementById('diaper-count')
        const wetCount = document.getElementById('wet-count')
        const soiledCount = document.getElementById('soiled-count')
        counter.innerHTML = "0"
        wetCount.innerHTML = "0"
        soiledCount.innerHTML = "0"
        //change the below into it's own method
        document.getElementById('nap-duration').innerHTML = "0"
        document.getElementById('bedtime-duration').innerHTML = "0"
        document.getElementById('total-sleep').innerHTML = "0"
        document.getElementById('snack').style.color = "#7b716345"
        document.getElementById('snack').innerHTML = "Snack"
        document.getElementById('breakfast').style.color = "#7b716345"
        document.getElementById('lunch').style.color = "#7b716345"
        document.getElementById('dinner').style.color = "#7b716345"

    }

}