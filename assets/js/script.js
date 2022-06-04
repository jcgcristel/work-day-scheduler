// function to set current day at the top of the page
var setCurrentDay = function() {
    // grabs current time in [Weekday, Month Day] format
    var today = luxon.DateTime.now().toLocaleString({ 
        weekday: 'long',
        month: 'long', 
        day: '2-digit' });
    
    $("#currentDay").text(today);
}

var createHourBlock = function(hour, description, save) {
    // create hour block element
    var hourBlock = $("<div>").addClass("row");

    // convert hour int to hour format
    hour = luxon.DateTime.fromObject({hour: hour}).toLocaleString(luxon.DateTime.TIME_SIMPLE);
    
    // create elements for hour block
    var hourEl = $("<div>").addClass("col-2 p-3 hour text-right")
        .text(hour);
    var textEl = $("<div>").addClass("col-9 p-3 text-dark textarea past")
        .attr("id", `text${hour}`);
    var saveEl = $("<div>").addClass("col-1 p-3 saveBtn d-flex justify-content-center align-items-center");
    
    // save txt
    var saveTxt = $("<i>").text("Save")
        .attr("id", `save${hour}`);
    saveEl.append(saveTxt);

    // append elements to hour block
    hourBlock.append(hourEl);
    hourBlock.append(textEl);
    hourBlock.append(saveEl);

    // append hour block to page
    $(".container").append(hourBlock);
}

var createWorkSchedule = function() {
    for (var i = 8; i <= 17; i++) {
        createHourBlock(i);        
    }
}

setCurrentDay();
createWorkSchedule();
