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
}