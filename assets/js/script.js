// array to hold event information
var eventsArr = [];

// css classes
const hourClass = "col-2 p-3 hour text-right";
const eventClass = "col-9 p-3 text-dark";
const saveClass = "col-1 p-3 saveBtn d-flex justify-content-center align-items-center";
const saveIcoPath = "./assets/images/save.png"

// set current day at the top of the page
var setCurrentDay = function() {
    // grabs current time in [Weekday, Month Day] format
    var today = luxon.DateTime.now().toLocaleString({ 
        weekday: 'long',
        month: 'long', 
        day: '2-digit' });
    
    // displays current day
    $("#currentDay").text(today);
}

var setEvent = function(id, event) {
    $(`#${id}`).val(event);
}

// load events from localstorage 
var load = function() {
    eventsArr = JSON.parse(localStorage.getItem("events"))

    // if local doesn't exist, create an array
    if (!eventsArr) {
        eventsArr = [];

        for (var i = 0; i < 10; i++) {
            eventsArr[i] = {
               id: `row${i+8}-event`,
               hour: i+8,
               event: ""
           }
        } 
    }

    // set eventArr to hold localstorage array
    for (var i = 0; i < eventsArr.length; i++) {
        setEvent(eventsArr[i].id, eventsArr[i].event);
    }
}

// create single hour block
var createHourBlock = function(hour, description, save) {
    // create hour block element
    var hourBlock = $("<div>").addClass("row");

    // convert hour int to hour format
    hourText = luxon.DateTime.fromObject({hour: hour}).toLocaleString(luxon.DateTime.TIME_SIMPLE);
    
    // hour
    var hourEl = $("<div>").addClass(hourClass).text(hourText);

    // event
    var eventEl = $("<textarea>").addClass(eventClass + " past")
        .attr("id", `row${hour}-event`)
        .attr("hour", hour);

    // save
    var saveEl = $("<div>").addClass(saveClass)
        .attr("id", `row${hour}`);
    // save button
    var saveIco = $("<img>").attr("src", saveIcoPath);
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

var setBgColour = function() {
    currentHour = luxon.DateTime.now().hour;
    
    for (var i = 0; i < eventsArr.length; i++) {
        var eventEl = $(`#${eventsArr[i].id}`);        
        
        // convert event hour
        eventHour = eventEl.attr("hour")
        eventHour = luxon.DateTime.fromObject({hour: eventHour}).hour;
        
        // remove any time styling
        $(eventEl).removeClass("past present future");
        
        if (eventHour < currentHour) {
            $(eventEl).addClass("past");
        }
        
        if (eventHour == currentHour) {
            $(eventEl).addClass("present");
        }
        
        if (eventHour > currentHour) {
            $(eventEl).addClass("future");           
        }        
    }
}

setCurrentDay();
createWorkSchedule();
load();
setBgColour();

// update local storage
var save = function() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

// get index of array
var getIndex = function(object, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == object.id) {
            return i;
        }
    }
}

// clicking save button will save event
$(".saveBtn").click( function(event) {
    var rowID = $(this).attr("id"); // get row id
    var textID = `${rowID}-event`; // find event id from row id
    var textEl = $(`#${textID}`); // jQuery format of event id

    var event = {
        id: textID,
        event: textEl.val()
    }

    var id = getIndex(event, eventsArr);
    
    // update event array with current event value
    eventsArr[id].event = event.event;

    save();
})

