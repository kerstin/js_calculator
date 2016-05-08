
// display the value of a number button on the calculator's display
function display(el) {
    var buttonValue = el.innerHTML;
    document.getElementById("display").innerHTML = buttonValue;
}

// clear the display
function clear() {
    document.getElementById("display").innerHTML = 0;
}

// wait until the site has finished loading
document.addEventListener('DOMContentLoaded', function() {

    var clear_btn = document.getElementById("clear_btn");
    clear_btn.addEventListener('click', function() {
        clear();
    }, false);

    // create array number buttons
    // iterate over them, adding event listeners for click event
    var num_btn_array = document.getElementsByClassName("number");
    for (var i = 0; i < num_btn_array.length; i++) {
        num_btn_array[i].addEventListener('click', function() {
            display(this);
        }, false);
    }
});