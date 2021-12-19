
export const formatDate = (datestr) => {
    const date = new Date(datestr);
    return date.toLocaleDateString();
};

export const dayOfWeek = (date) => {
    console.log("Day of week for " + date);
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let d = parseDate(date);
    console.log(d.getDay());
    return weekday[d.getDay()];

};

export const parseDate = (datestr) => {
    if (datestr.includes("/")) {
        let dateparts = datestr.split("/");
        console.log(dateparts);
        return new Date(dateparts[2], dateparts[1]-1, dateparts[0]);    
    }
    return new Date(datestr);
};

export const equalDates = (datestr1, datestr2) => {
    let date1 = parseDate(datestr1);
    let date2 = parseDate(datestr2);

    return date1.toDateString() == date2.toDateString();
};


export const filterByDate = (meetings, date) => {
    let filteredMeetings = meetings.filter(meeting => {
        // console.log("Checking " + date + " == " + meeting.date);
        return equalDates(date, meeting.date);
    }) ;
    return filteredMeetings;
}

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export const allDaysInWeek = () => {
    let curr = new Date(); 
    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)); // .toUTCString();
    var lastday = new Date(curr.setDate(last)); // .toUTCString();
    console.log("Getting days between " + firstday + " and " + lastday);
    var dateArray = new Array();
    var currentDate = firstday;
    while (currentDate <= lastday) {
        dateArray.push(formatDate(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;

}