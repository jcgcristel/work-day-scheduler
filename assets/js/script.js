var createHourBlock = function(hour, description, save) {
    // create hour block element
    var hourBlock = $("<div>").addClass("row");

    // create elements for hour block
    var hourEl = $("<div>").addClass("col-2 p-3 hour text-right")
        .text(hour);
    var textEl = $("<div>").addClass("col-9 p-3 text-dark textarea past");
    var saveEl = $("<div>").addClass("col-1 p-3 saveBtn d-flex justify-content-center align-items-center");
    
    // save txt
    var saveTxt = $("<i>").text("Save");
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

createWorkSchedule();
