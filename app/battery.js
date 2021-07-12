/* eslint-disable semi */
/* eslint-disable indent */
import document from 'document';
import { battery, charger } from 'power';

const theValue = document.getElementById('battery-percent');
const theIcon = document.getElementById('battery-icon');
const theIconCharge = document.getElementById('battery-icon-charge');
const theBar = document.getElementById('battery-bar');

export function initialize () {
    battery.onchange = (charger, evt) => {
        refresh();
    };
}

export function onScreenOn () {
    refresh();
}

export function onScreenOff () {
    theValue.text = '--%';
}

export function onPresent () {
    theValue.style.fill = 'fb-white';
    refresh();
}

export function onAbsent () {
    theValue.style.fill = 'fb-dark-gray';
    refresh();
}

function refresh () {
    // The value
    theValue.text = `${battery.chargeLevel}%`;
    // The line
    theBar.x2 = Math.floor((battery.chargeLevel * 336) / 100);

    // The color
    const color = 'fb-' + getColor(battery.chargeLevel);
    theValue.style.fill = color;
    theIcon.style.fill = color;

    // Change if connected
    if (charger.connected) {
        theIcon.style.opacity = 0;
        theIconCharge.style.opacity = 1;
    } else {
        theIcon.style.opacity = 1;
        theIconCharge.style.opacity = 0;
    }
}

/**
 * Color code the battery level.
 * @param {Number} level - the level of battery.
 * @returns the battery color.
 */
function getColor (level) {
    if (level <= 8) {
        return 'red';
    }
    if (level <= 20) {
        return 'orange';
    }
    if (level <= 38) {
        return 'peach';
    }
    if (level <= 61) {
        return 'green';
    }
    return 'lime';
}
