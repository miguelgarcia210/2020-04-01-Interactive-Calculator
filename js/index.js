"use strict";

let form = document.forms["tip-calculator-form"];
let formElements = document.forms["tip-calculator-form"].elements;
let amount = function () {
    return $('#billAmount');
};
let percentage = function () {
    return $('#tipPercentage');
};
let result = function () {
    return $('#result-container');
};

let submitBtn = function () {
    return $('#submit-form-btn');
};

/*
    checkInputs:
    - validates no empty inputs are present
    - enables/disables submit btn
 */
function checkInputs() {
    let canSubmit = true;

    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].value.length === 0) {
            canSubmit = false;
            break;
        }
    }
    // document.getElementById('submit-form-btn').disabled = !canSubmit;
    $('#submit-form-btn').prop("disabled", !canSubmit);
}

/*
    calculateTip:
    - disables input values
    - returns tip amount
 */
function calculateTip() {
    amount().prop("disabled", true);
    percentage().prop("disabled", true);
    return (+amount().val() * (+percentage().val() / 100));
}

/*
    showResult(resultTip):
    - set result display to 'show'
 */
function showResult(resultTip) {
    result().removeClass("hidden");
    console.log(resultTip);
}

function hideResult() {
    result().addClass("")
}

/*
    recalculateTip:
    - reset input values to empty strings
    - enables input values
 */
function recalculateTip() {
    amount().val("");
    percentage().val("");
    amount().prop("disabled", false);
    percentage().prop("disabled", false);
}

/*
    checkStatus:
    - checks current status of the submit button
    1. calculateTip() executes, btn class attribute changes to 're-calc', btn HTML text value changes to 'Re-calculate'
    2. recalculateTIp() executes,
 */
function checkStatus() {
    let btn = submitBtn();
    if (btn.hasClass("calc")) {
        // calculateTip();
        displayResult(calculateTip());
        btn.val("Re-calculate");
        btn.removeClass("calc");
        btn.addClass("re-calc");
    } else {
        recalculateTip();
        checkInputs();
        btn.val("Calculate");
        btn.removeClass("re-calc");
        btn.addClass("calc");
    }
}

$(form).submit(function (e) {
    e.preventDefault();
    checkStatus();
});

window.onload = checkInputs;