// array to hold event information
var eventsArr = [];

var setEvent = function(id, event) {
    $(`#${id}`).val(event);
}

// load events from localstorage 
var load = function() {
    eventsArr = JSON.parse(localStorage.getItem("events"))

    // check if events in localstorage exist
    if (!eventsArr) {
        eventsArr = [];
    }

    for (var i = 0; i < eventsArr.length; i++) {
        setEvent(eventsArr[i].id, eventsArr[i].event);
    }
}

// set current day at the top of the page
var setCurrentDay = function() {
    // grabs current time in [Weekday, Month Day] format
    var today = luxon.DateTime.now().toLocaleString({ 
        weekday: 'long',
        month: 'long', 
        day: '2-digit' });
    
    $("#currentDay").text(today);
}

// create single hour block
var createHourBlock = function(hour, description, save) {
    // create hour block element
    var hourBlock = $("<div>").addClass("row");

    // convert hour int to hour format
    hourText = luxon.DateTime.fromObject({hour: hour}).toLocaleString(luxon.DateTime.TIME_SIMPLE);
    
    // hour
    var hourEl = $("<div>").addClass("col-2 p-3 hour text-right").text(hourText);

    // event
    var eventEl = $("<textarea>").addClass("col-9 p-3 text-dark past")
        .attr("id", `row${hour}-event`);

    // save
    var saveEl = $("<div>").addClass("col-1 p-3 saveBtn d-flex justify-content-center align-items-center")
        .attr("id", `row${hour}`);
    // save button
    var saveIco = $("<img>").attr("src", "./assets/images/save.png");
    saveEl.append(saveIco);

    // append elements to event block
    hourBlock.append(hourEl);
    hourBlock.append(eventEl);
    hourBlock.append(saveEl);

    // append event block to page
    $(".container").append(hourBlock);
}

// create workday agenda
var createWorkSchedule = function() {
    for (var i = 8; i <= 17; i++) {
        createHourBlock(i);        
    }
}


setCurrentDay();
createWorkSchedule();
load();

// check if event already exists in array, returning the id if it does
var eventExists = function(object, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == object.id) {
            return i;
        }
    }
    return false;
}

// update local storage
var save = function(id) {
    console.log(localStorage.setItem("events", JSON.stringify(eventsArr)));
}

// clicking save button will save event
$(".saveBtn").click( function(event) {
    var rowID = $(this).attr("id");
    var textID = `${rowID}-event`;
    var textEl = $(`#${textID}`);

    var event = {
        id: textID,
        event: textEl.val()
    }

    var id = eventExists(event, eventsArr);

     // checks if event already exists in array
     if (id !== false) {
        console.log("exists");
        // updates event
        eventsArr[id].event = event.event;
        console.log(eventsArr);
     }
     else {
        console.log("does not exists")
        // creates new event
        eventsArr.push(event);
     }

     console.log("saving")
     save(event.id);
})

