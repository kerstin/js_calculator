var result = 0;
var currentValue = 0;
var lastAction = "equals";

// display the value of a number button on the calculator's display
function update_display(value) {
    display.innerHTML = value;
}

function calculate(action) {
    // la = action;
    cv = Number(currentValue);

    // debug
    // alert("result before: " + result + "\ncurrent value before: " + cv);

    switch(lastAction) {
        case "add":
            result = result + cv;
            break;
        case "subtract":
            result = result - cv;
            lastAction = "subtract";
            break;
        case "multiply":
            result = result * cv;
            lastAction = "multiply";
            break;
        case "divide":
            result = result / cv;
            lastAction = "divide";
            break;
        case "equals":
            result = result + cv;
            lastAction = "equals";
            break;
        case "clear":
            update_display(0);
            lastAction = "equals";
            break;
        default:
            break;
    }
    currentValue = 0;
    lastAction = action;
    update_display(result);

    // debug
    // alert("result after: " + result + "\ncurrent value after: " + cv);
}

// string together digits entered one after the other
function concatNumber(btn) {
    var buttonValue = btn.innerHTML;
    
    if (currentValue == 0) {
        currentValue = buttonValue;
    } else {
        currentValue = currentValue + buttonValue;
    }

    display.innerHTML = currentValue;
}

// clear the display, reset calculator to zero
function clear() {
    result = 0;
    currentValue = 0;
    lastAction = "clear";
}

// wait until the site has finished loading
document.addEventListener('DOMContentLoaded', function() {

    var display = document.getElementById("display");
    display.innerHTML = currentValue;

    var clear_btn = document.getElementById("clear");
    clear_btn.addEventListener('click', function() {
        clear();
        calculate("equals");
    }, false);

    var calculate_btn = document.getElementById("calculate");
    calculate_btn.addEventListener('click', function() {
        calculate();
        // result = 0;
    }, false);

    // create number buttons array
    // iterate over no. buttons, adding event listeners for click event
    var num_btn_array = document.getElementsByClassName("number");
    for (var i = 0; i < num_btn_array.length; i++) {
        num_btn_array[i].addEventListener('click', function() {
            concatNumber(this);
        }, false);
    }

    // create operation buttons array
    // iterate over operation buttons, adding event listeners for click event
    var op_btn_array = document.getElementsByClassName("operation");
    for (var j = 0; j < op_btn_array.length; j++) {
        op_btn_array[j].addEventListener('click', function() {
            calculate(this.id);
        }, false);
    }

});