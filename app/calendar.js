/* eslint-disable import/no-unresolved */
import document from 'document';

const theDay = document.getElementById('calendar-day');
const theDate = document.getElementById('calendar-date');

const theMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const theDays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
const theColors = 'red_yellow_magenta_limegreen_orange_cyan_orchid'.split('_');

function zeroPad(i) {
    if (i < 10) {
        return `0${i}`;
    }
    return i;
}

function draw() {
    const now = new Date();

    // const monthIndex = now.getMonth() + 1;
    // const year = now.getYear() % 100;

    theDay.text = theDays[now.getDay()].toUpperCase();
    theDay.style.fill = theColors[now.getDay()];

    theDate.text = `${theMonths[now.getMonth()].toUpperCase()} ${zeroPad(now.getDate())}`;
    theDate.style.fill = theColors[now.getDay()];
}

export function initialize() {
}

export function onScreenOn() {
    draw();
}

export function onScreenOff() {
}

export function onPresent() {
    // theDay.style.fill = 'fb-dark-gray';
    theDate.style.fill = 'fb-white';
    draw();
}

export function onAbsent() {
    theDay.style.fill = 'fb-dark-gray';
    theDate.style.fill = 'fb-dark-gray';
}
