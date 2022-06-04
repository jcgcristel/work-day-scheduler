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
        .attr("id", `row${hour}-event`)
        .val("Texte");

    // save
    var saveEl = $("<div>").addClass("col-1 p-3 saveBtn d-flex justify-content-center align-items-center")
        .attr("id", `row${hour}`);
    // save button
    var saveIco = $("<img>").attr("src", "./assets/images/save.png");
    saveEl.append(saveIco);

    // append elements to hour block
    hourBlock.append(hourEl);
    hourBlock.append(eventEl);
    hourBlock.append(saveEl);

    // append hour block to page
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

// clicking save button will save event
$(".saveBtn").click( function(event) {
    var rowID = $(this).attr("id");
    var textID = `${rowID}-event`;
    var textEl = $(`#${textID}`);

    console.log(textEl.val());
    console.log("saving")
})

