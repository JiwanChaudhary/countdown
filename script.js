const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownform');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-Title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Populate Countdown / complete UI
function updateDOM() {
    countdownActive = setInterval(() => {

        const now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);


        // Hide Input
        inputContainer.hidden = true;

        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}.`
            completeEl.hidden = false;
        } else {

            // Populate Countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}

// Set Date input minimum with Today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Take values from input
function updateContdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    if (countdownDate === '') {
        alert('Select the valid date for countdown.')
    } else {
        // Get number version of current date
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset Everything
function reset() {
    // Show Input and hide countdown
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    completeEl.hidden = true;

    // Stop Countdown
    clearInterval(countdownActive);

    // reset countdown date and title
    countdownElTitle = '';
    countdownDate = '';
}

function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        countdownEl.hidden = false;
        savedCountdown = JSON.parse(localStorage.getItem('coutdown'));
        countdownTitle = savedCountdown.title;
        console.log(countdownTitle);
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listners
countdownForm.addEventListener('submit', updateContdown);
countdownButton.addEventListener('click', reset);
completeButton.addEventListener('click', reset);

// on load, check localstorage
restorePreviousCountdown();