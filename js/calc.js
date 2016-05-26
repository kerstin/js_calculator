var result = 0;
var currentValue = 0;
var lastAction = "equals";

// regex to find last word and _pressed class
var pattLast = /\s\S+$/;
var pattPressed = /(\s\w+)_pressed/;


// display the value of a number button on the calculator's display
function update_display(value) {
    var dTxt= document.getElementById("display_text");
    dTxt.innerHTML = value;
}

function calculate(action) {
    // la = action;
    var cv = Number(currentValue);

    // debug
    console.log(action);

    switch(lastAction) {
        case "add":
            result = result + cv;
            break;
        case "subtract":
            result = result - cv;
            break;
        case "multiply":
            result = result * cv;
            break;
        case "divide":
            result = result / cv;
            break;
        case "equals":
            result = result + cv;
            break;
        default:
            update_display(0);
            result = result + cv;
            break;
    }
    currentValue = 0;
    lastAction = action;
    update_display(result);
}

// string together digits entered one after the other
function concatNumber(btn) {
    var buttonValue = btn.innerHTML;

    // number pressed without a preceding calculation
    // handled like a reset
    if (lastAction == "equals" && result != 0) {
        result = 0;
    }

    // start the string
    if (currentValue == 0) {
        currentValue = buttonValue;
        // continue current string
    } else {
        currentValue = currentValue + buttonValue;
    }

    // debug
    console.log(buttonValue);

    update_display(currentValue);
}

// clear the display, reset calculator to zero
function clear() {
    result = 0;
    currentValue = 0;
    update_display(0);
}

// show button press
function button_press(btn) {

    // get last class
    var lastClass = pattLast.exec(btn.className);
    console.log(typeof lastClass);

    // check if it's pressed already
    // if not, make new class with _pressed state from it, then append this new class
    if (!pattPressed.test(lastClass[0])) {
        btn.className += lastClass + "_pressed";
    }

    // debug
    // console.log("classes: " + btn.className);
}

// revert button press / show button released
function button_release(btn) {
    btn.className = btn.className.replace( /(\s\w+)_pressed($)/ , '' );

    // debug
    // console.log("classes: " + btn.className);
}


// wait until the site has finished loading
document.addEventListener('DOMContentLoaded', function() {

    var dTxt= document.getElementById("display_text");
    dTxt.innerHTML = currentValue;

    var clear_btn = document.getElementById("clear");
    clear_btn.addEventListener('click', function() {
        clear();
        // reset lastAction to equals
        calculate("equals");
    }, false);

    var calculate_btn = document.getElementById("equals");
    calculate_btn.addEventListener('click', function() {
        calculate(this.id);
    }, false);

    var allButtons = document.getElementsByClassName("button");
    for (i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('mousedown', function() {
            button_press(this);
        }, false);
        allButtons[i].addEventListener('mouseout', function() {
             button_release(this);
        }, false);
    }

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