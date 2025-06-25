"use strict";
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let output = '';
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;
        if (value === 'C')
            clearDisplay();
        else if (value === '=')
            calculateResult();
        else
            handleInput(value);
    });
});
function clearDisplay() {
    output = '';
    display.value = '0';
}
function calculateResult() {
    let result;
    try {
        result = eval(output);
    }
    catch (err) {
        display.value = 'Syntax Error!';
        output = '';
    }
    output = result.toString();
    if (output == 'Infinity') {
        display.value = "Can't divide by zero!";
        output = '';
    }
    else
        display.value = output;
}
function handleInput(num) {
    if (output === '0' && num === '0')
        return;
    output += num;
    display.value = output;
}
