/* eslint-disable semi */
/* eslint-disable indent */
import document from 'document';
import { HeartRateSensor } from 'heart-rate';
import { user } from 'user-profile';

const theZone = document.getElementById('hr-zone');
const theValue = document.getElementById('hr-value');
const theDiastole = document.getElementById('hr-diastole');
// const theSystole = document.getElementById('hr-systole');

let lastTimestamp = null;
let lastRate = null;
let theHRS = null;
let theReadingTimer = null;
let theBeatingTimer = null;

export function initialize () {
    theHRS = new HeartRateSensor();

    /*
    theHRS.addEventListener('activate', () => {
        console.log('onActivate HRM!');
    });
    */

    theHRS.addEventListener('reading', () => {
        // console.log('HRM: ' + theHRS.heartRate);
        setReading(theHRS.heartRate, theHRS.timestamp);
    });

    // console.log('HRM Last: ' + theHRS.timestamp);
}

export function onScreenOn () {
    if (!theReadingTimer) {
        theHRS.start();
        // getReading();
        // theReadingTimer = setInterval(getReading, 500);
    }
}

export function onScreenOff () {
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
    // draw(0);
}

export function onPresent () {
    // console.log(`onPresent: HRS activated: ${theHRS.activated}.`);
    onScreenOn();
}

export function onAbsent () {
    onScreenOff();
    theZone.text = 'NO DATA';
    theZone.style.fill = 'fb-dark-gray';
    theValue.text = '---';
    theValue.style.fill = 'fb-dark-gray';
}

function setReading (rate, timestamp) {
    // console.log(`Data: ${timestamp}/${lastTimestamp} - ${rate}/${lastRate}.`);
    if (timestamp === lastTimestamp) {
        // Same timestamp
        // console.log('no redraw: same last timestamp');
        return;
    }
    lastTimestamp = timestamp;

    if (rate === lastRate) {
        // Same rate
        // console.log('no redraw: same last rate');
        return;
    }
    lastRate = rate;

    // console.log(`Redraw with ${lastRate}.`);
    draw(lastRate);
}

function draw (rate) {
    // Clear the rate animation
    if (theBeatingTimer !== null) {
        // console.log("Clear animation inside draw!");
        clearInterval(theBeatingTimer);
        theBeatingTimer = null;
        theDiastole.style.opacity = 0;
    }

    // Hearbeat animation
    const millis = 30000 / rate;
    // console.log("Starting animation with " + millis + "ms.");
    theBeatingTimer = setInterval(beating, millis);

    theValue.text = rate;

    let zone = user.heartRateZone(rate);
    zone = getZone(rate, zone);
    theZone.text = zone.toUpperCase();// hr_zone.charAt(0).toUpperCase() + hr_zone.slice(1);

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

function beating () {
    theDiastole.style.opacity ^= 1;
    /*
    if (theDiastole.style.opacity === SHOW) {
        theDiastole.style.opacity = HIDE;
    } else {
        theDiastole.style.opacity = SHOW;
    }
    */
}

function getZone (rate, zone) {
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
