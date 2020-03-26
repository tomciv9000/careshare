class DateDisplay {
    static formatDate(date){
        let split = date.split('-')
        return split[1] + "/" + split[2] + "/" + split[0] 
    }

}