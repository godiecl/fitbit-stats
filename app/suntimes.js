/* eslint-disable import/no-unresolved */
import document from 'document';

import { getSunrise, getSunset } from 'sunrise-sunset-js';

const theSunRise = document.getElementById('suntimes-sunrise');
const theSunSet = document.getElementById('suntimes-sunset');

function zeroPad(i) {
    if (i < 10) {
        return `0${i}`;
    }
    return i;
}

export function initialize() {
}

export function onScreenOn() {
    const sunrise = getSunrise(-23.65236, -70.3954);
    theSunRise.text = `${zeroPad(sunrise.getHours())}:${zeroPad(sunrise.getMinutes())}`;

    const sunset = getSunset(-23.65236, -70.3954);
    theSunSet.text = `${zeroPad(sunset.getHours())}:${zeroPad(sunset.getMinutes())}`;
}

export function onScreenOff() {
    theSunRise.text = '--:--';
    theSunSet.text = '--:--';
}

export function onPresent() {
    theSunRise.style.fill = 'fb-white';
    theSunSet.style.fill = 'fb-white';
}

export function onAbsent() {
    theSunRise.style.fill = 'fb-dark-gray';
    theSunSet.style.fill = 'fb-dark-gray';
}
