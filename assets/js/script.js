var createHourBlock = function(hour, description, save) {
    // create hour block element
    var hourBlock = $("<div>").addClass("row");

    // create elements for hour block
    var hourEl = $("<div>").addClass("col-2 p-3 hour");
    var textEl = $("<div>").addClass("col-9 p-3 text-dark textarea past");
    var saveEl = $("<div>").addClass("col-1 p-3 saveBtn d-flex justify-content-center align-items-center")

    // append elements to hour block
    hourBlock.append(hourEl);
    hourBlock.append(textEl);
    hourBlock.append(saveEl);

    // append hour block to page
    $(".container").append(hourBlock);
}

createHourBlock();