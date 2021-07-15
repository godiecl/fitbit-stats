/* eslint-disable import/no-unresolved */
import document from 'document';
import { Barometer } from "barometer";

const theBarometer = new Barometer();
const thePressure = document.getElementById("barometer-pressure");
const theAltitude = document.getElementById("barometer-altitude");


// Converts pressure in millibars to altitude in feet
// https://en.wikipedia.org/wiki/Pressure_altitude
function millibarsToMeters(pressure) {
    return (1 - (pressure / 1013.25) ** 0.190284) * 145366.45 * 0.30480371;
}

export function initialize() {
    theBarometer.onreading = () => {
        const kPa = (theBarometer.pressure / 1000).toFixed(1);
        thePressure.text = `${kPa}`;
        const meters = millibarsToMeters(theBarometer.pressure / 100).toFixed(1);
        theAltitude.text = `${meters}`;
    }
}

export function onScreenOn() {
    theBarometer.start();
}

export function onScreenOff() {
    theBarometer.stop();
}

export function onPresent() {
}

export function onAbsent() {
}
