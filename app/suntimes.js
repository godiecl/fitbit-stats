/* eslint-disable import/no-unresolved */
import document from 'document';

import { getSunrise, getSunset } from 'sunrise-sunset-js';

const theSunRise = document.getElementById('suntimes-sunrise');
const theSunSet = document.getElementById('suntimes-sunset');

let lastWeekDay = null;

function zeroPad(i) {
    if (i < 10) {
        return `0${i}`;
    }
    return i;
}

function refresh() {
    const now = new Date();
    if (lastWeekDay === now.getDay()) {
        return;
    }
    lastWeekDay = now.getDay();

    // Refresh the sunrise
    const sunrise = getSunrise(-23.65236, -70.3954);
    theSunRise.text = `${sunrise.getHours()}:${zeroPad(sunrise.getMinutes())}`;

    // Refresh the sunrise
    const sunset = getSunset(-23.65236, -70.3954);
    theSunSet.text = `${sunset.getHours()}:${zeroPad(sunset.getMinutes())}`;
}

export function initialize() {
    theSunRise.text = '--:--';
    theSunSet.text = '--:--';
}

export function onScreenOn() {
    refresh();
}

export function onScreenOff() {
}

export function onPresent() {
    theSunRise.style.fill = 'fb-white';
    theSunSet.style.fill = 'fb-white';
}

export function onAbsent() {
    theSunRise.style.fill = 'fb-dark-gray';
    theSunSet.style.fill = 'fb-dark-gray';
}
