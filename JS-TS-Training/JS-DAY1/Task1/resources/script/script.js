let calculator = document.querySelector('.calculator');
let answer = document.getElementById('interest');
let total = document.getElementById('total-amount');
let addInfo = document.getElementById('add-info');
let principalInput = document.getElementById('principal');
let roiInput = document.getElementById('rate-of-interest');
let timeInput = document.getElementById('time');
let interest = 0;

function principalInputCheck() {
    if (principalInput.value < 500 || principalInput.value > 10000 || isNaN(principalInput.value)) {
        let err = document.getElementById('ppl-err');
        err.style.opacity = '1';
        principalInput.style.borderColor = 'rgb(218, 43, 43)';
        return false;
    } else {
        let err = document.getElementById('ppl-err');
        principalInput.style.borderColor = '#d8d8d8';
        err.style.opacity = '0';
        return true;
    }
}

function roiInputCheck() {
    if (isNaN(roiInput.value) || roiInput.value == '') {
        let err = document.getElementById('roi-err');
        err.style.opacity = '1';
        roiInput.style.borderColor = 'rgb(218, 43, 43)';
        return false;
    } else {
        principalInput.style.borderColor = '#d8d8d8';
        let err = document.getElementById('roi-err');
        err.style.opacity = '0';
        return true;
    }
}

function timeInputCheck() {
    if (isNaN(timeInput.value) || timeInput.value == '') {
        let err = document.getElementById('time-err');
        err.style.opacity = '1';
        timeInput.style.borderColor = 'rgb(218, 43, 43)';
        return false;
    } else {
        principalInput.style.borderColor = '#d8d8d8';
        let err = document.getElementById('time-err');
        err.style.opacity = '0';
        return true;
    }
}

principalInput.addEventListener('blur', principalInputCheck);
roiInput.addEventListener('blur', roiInputCheck);
timeInput.addEventListener('blur', timeInputCheck);

calculator.addEventListener("submit", function(def) {
    def.preventDefault();

    if (!principalInputCheck() || !roiInputCheck() || !timeInputCheck()) return;

    let principal = parseFloat(document.getElementById('principal').value);
    let rateOfInterest = parseFloat(document.getElementById('rate-of-interest').value);
    let time = parseFloat(document.getElementById('time').value);

    if (principal < 1000 && rateOfInterest < 5) rateOfInterest = 5;
    if (principal < 5000 && rateOfInterest < 7) rateOfInterest = 7;
    if (principal > 5000 && rateOfInterest < 10) rateOfInterest = 10;

    if (time > 5) {
        rateOfInterest += 2;
        let bonus = (principal / 100) * rateOfInterest;
        addInfo.textContent = 'Additional 2% bonus! - $' + bonus;
    }
    else addInfo.textContent = 'You got no bonus!'

    interest = (principal * rateOfInterest * time) / 100;

    answer.textContent = '$' + interest.toFixed(2);
    total.textContent = '$' + (principal + interest).toFixed(2);
    calculator.reset();
})
