class Counters {

    //this.counter = document.getElementById('diaper-count')
    //this.wetCount = document.getElementById('wet-count')
    //this.soiledCount = document.getElementById('soiled-count')

    static increaseDiaperCount(){
        this.increaseCounter(this.counter)
        if (this.wet) {
            this.increaseCounter(this.wetCount)
        }
        if (this.soiled){
            this.increaseCounter(this.soiledCount)
        }
    }

    static increaseCounter(counters){
        let toBeIncreased = [].concat(counters || [])
        for (let index = 0; index < toBeIncreased.length; index++) {
            const element = toBeIncreased[index];
            element.innerHTML = parseInt(element.innerHTML) + 1
        }
    }

    static decreaseCounter(counters){
        let toBeDecreased = [].concat(counters || [])
        for (let index = 0; index < toBeDecreased.length; index++) {
            const element = toBeDecreased[index];
            element.innerHTML = parseInt(element.innerHTML) - 1
        }
    }

    static decreaseDiaperCount(classLabel){
        const counter = document.getElementById('diaper-count')
        const wetCount = document.getElementById('wet-count')
        const soiledCount = document.getElementById('soiled-count')
        if (classLabel == 'wet-soiled-diaper-delete'){
            Counters.decreaseCounter([counter, wetCount, soiledCount])
        } else
        if (classLabel == 'wet-diaper-delete') {
            Counters.decreaseCounter([counter, wetCount])
        } else
        if (classLabel == 'soiled-diaper-delete') {
            Counters.decreaseCounter([counter, soiledCount])
        }
    }
}