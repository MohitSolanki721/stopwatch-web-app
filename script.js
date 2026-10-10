let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 0;
let previousLapTime = 0;

// Get HTML elements
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");

const startButton = document.getElementById("startBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");
const lapButton = document.getElementById("lapBtn");

const lapsList = document.getElementById("lapsList");


// Start Stopwatch
startButton.addEventListener("click", function() {

    if (running) {
        return;
    }

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(updateDisplay, 10);

    running = true;
});


// Pause Stopwatch
pauseButton.addEventListener("click", function() {

    if (!running) {
        return;
    }

    clearInterval(timerInterval);

    elapsedTime = Date.now() - startTime;

    running = false;
});


// Reset Stopwatch
resetButton.addEventListener("click", function() {

    clearInterval(timerInterval);

    startTime = 0;
    elapsedTime = 0;
    running = false;
    lapCount = 0;
    previousLapTime = 0;

    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    millisecondsElement.textContent = "00";


    lapsList.innerHTML = "";
});

lapButton.addEventListener("click", function() {
    if (!running) {
        return;
    }

    const currentLapTime = Date.now() - startTime;
    const lapDuration = currentLapTime - previousLapTime;

    lapCount++;

    const lapItem = document.createElement("li");

    lapItem.innerHTML = `
        <span>Lap ${lapCount}</span>
        <span>${formatLapTime(lapDuration)}</span>
        <span>${formatLapTime(currentLapTime)}</span>
    `;

    function formatLapTime(time) {
        const minutes = Math.floor(time / 60000);

        const seconds = Math.floor((time % 60000) / 1000);

        const milliseconds = Math.floor((time % 1000) / 10);

        return `${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds)}`;
    }
    lapsList.prepend(lapItem);

    previousLapTime = currentLapTime;
});

// Update Display
function updateDisplay() {

    elapsedTime = Date.now() - startTime;

    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    const minutes = Math.floor(
        (elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
        (elapsedTime % (1000 * 60)) / 1000
    );

    const milliseconds = Math.floor(
        (elapsedTime % 1000) / 10
    );


    hoursElement.textContent = formatTime(hours);

    minutesElement.textContent = formatTime(minutes);

    secondsElement.textContent = formatTime(seconds);

    millisecondsElement.textContent = formatTime(milliseconds);
}


// Add leading zero
function formatTime(time) {

    return time < 10 ? `0${time}` : time;
}