/* eslint-disable import/no-unresolved */
import document from 'document';

const theNumber = document.getElementById('calendar-number');
const theDay = document.getElementById('calendar-day');

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// const theMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const theDaysElements = [];

function zeroPad(i) {
    return i < 10 ? `0${i}` : i;
}

function draw() {
    const now = new Date();

    theDay.text = days[now.getDay()].toUpperCase();
    theNumber.text = `${zeroPad(now.getDate())}`;
}

export function initialize() {
}

export function onScreenOn() {
    draw();
}

export function onScreenOff() {
}

export function onPresent() {
    draw();
}

export function onAbsent() {
}
