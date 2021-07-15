/* eslint-disable import/no-unresolved */
import document from 'document';

const theDate = document.getElementById('calendar-date');

const theMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const theDaysElements = [];

function zeroPad(i) {
    return i < 10 ? `0${i}` : i;
}

function draw() {
    const now = new Date();

    // eslint-disable-next-line no-return-assign
    theDaysElements.map(e => e.style.fill = 'fb-light-gray');
    theDaysElements[now.getDay()].style.fill = 'fb-black';

    theDate.text = `${theMonths[now.getMonth()]} ${zeroPad(now.getDate())}`;
}

export function initialize() {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    days.map(d => theDaysElements.push(document.getElementById(`days-${d}`)));
}

export function onScreenOn() {
    draw();
}

export function onScreenOff() {
}

export function onPresent() {
    draw();
    theDate.style.fill = 'fb-white';
}

export function onAbsent() {
    theDate.style.fill = 'fb-dark-gray';
}
