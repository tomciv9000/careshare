class DateDisplay {
  static formatDate(date){
    let split = date.split('-');
    return split[1] + "/" + split[2] + "/" + split[0] ;
  }
// There has to be a better way to convert time
  static convertTime(time) {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { 
      time = time.slice(1); 
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
      time[0] = +time[0] % 12 || 12; 
    }
    return time.join(''); 
  }

  static convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  }

  static convertISO(time){
    let converted = time.split('T')[1].slice(0,5);
    return converted;
  }

}