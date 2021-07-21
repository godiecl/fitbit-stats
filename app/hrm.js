/* eslint-disable import/no-unresolved */
import document from 'document';
import { HeartRateSensor } from 'heart-rate';
import { user } from 'user-profile';

const theZone = document.getElementById('hr-zone');
const theValue = document.getElementById('hr-value');
const theDiastole = document.getElementById('hr-diastole');

let lastTimestamp = null;
let lastRate = null;
let theHRS = null;
let theReadingTimer = null;
let theBeatingTimer = null;

function getZone(rate, zone) {
    if (rate < 60) {
        return 'slothing';
    }
    if (rate < 65) {
        return 'calming';
    }
    if (rate < 70) {
        return 'resting';
    }
    if (rate < 80) {
        return 'regular';
    }
    if (zone === 'out-of-range') {
        return 'high';
    }
    return zone;
}

function beating() {
    // eslint-disable-next-line no-bitwise
    theDiastole.style.opacity ^= 1;
}

function draw(rate) {
    // Clear the rate animation
    if (theBeatingTimer !== null) {
        clearInterval(theBeatingTimer);
        theBeatingTimer = null;
        theDiastole.style.opacity = 0;
    }

    // Hearbeat animation
    const millis = 30000 / rate;
    theBeatingTimer = setInterval(beating, millis);

    theValue.text = rate;

    let zone = user.heartRateZone(rate);
    zone = getZone(rate, zone);
    theZone.text = zone.charAt(0).toUpperCase() + zone.slice(1); // .toUpperCase();// hr_zone.charAt(0).toUpperCase() + hr_zone.slice(1);

    // eslint-disable-next-line default-case
    switch (zone) {
        case 'slothing':
            theZone.style.fill = 'maroon';
            theValue.style.fill = 'maroon';
            return;
        case 'calming':
            theZone.style.fill = 'purple';
            theValue.style.fill = 'purple';
            return;
        case 'resting':
            theZone.style.fill = 'green';
            theValue.style.fill = 'green';
            return;
        case 'regular':
            theZone.style.fill = 'chartreuse';
            theValue.style.fill = 'chartreuse';
            return;
        case 'high':
            theZone.style.fill = 'yellow';
            theValue.style.fill = 'yellow';
            return;
        case 'fat-burn':
            theZone.style.fill = 'orange';
            theValue.style.fill = 'orange';
            return;
        case 'cardio':
            theZone.style.fill = 'red';
            theValue.style.fill = 'red';
            return;
        case 'peak':
            theZone.style.fill = 'magenta';
            theValue.style.fill = 'magenta';
    }
}

function setReading(rate, timestamp) {
    // Same timestamp
    if (timestamp === lastTimestamp) {
        return;
    }
    lastTimestamp = timestamp;

    // Same rate
    if (rate === lastRate) {
        return;
    }
    lastRate = rate;

    draw(lastRate);
}

export function initialize() {
    theHRS = new HeartRateSensor();

    theHRS.addEventListener('reading', () => {
        setReading(theHRS.heartRate, theHRS.timestamp);
    });
}

export function onScreenOn() {
    if (!theReadingTimer) {
        theHRS.start();
    }
}

export function onScreenOff() {
    theHRS.stop();
    lastRate = null;
    lastTimestamp = null;
    if (theReadingTimer !== null) {
        clearInterval(theReadingTimer);
        theReadingTimer = null;
    }
    if (theBeatingTimer !== null) {
        clearInterval(theBeatingTimer);
        theBeatingTimer = null;
        theDiastole.style.opacity = 0;
    }
    theZone.text = '';
    theValue.text = '';
}

export function onPresent() {
    onScreenOn();
}

export function onAbsent() {
    onScreenOff();
    theZone.text = 'No Data';
    theValue.text = '---';
}
