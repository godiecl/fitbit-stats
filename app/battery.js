/* eslint-disable import/no-unresolved */
import document from 'document';
import { battery, charger } from 'power';

const theValue = document.getElementById('battery-percent');
const theIcon = document.getElementById('battery-icon');
const theIconCharge = document.getElementById('battery-icon-charge');

/**
 * Color code the battery level.
 * @param {Number} level - the level of battery.
 * @returns the battery color.
 */
function getColor(level) {
    if (level <= 20) {
        return 'magenta';
    }
    return 'black';
}

function refresh() {
    // The value
    theValue.text = `${battery.chargeLevel}%`;

    // The color
    theValue.style.fill = `fb-${getColor(battery.chargeLevel)}`;

    // Change if connected
    if (charger.connected) {
        theIcon.style.opacity = 0;
        theIconCharge.style.opacity = 1;
    } else {
        theIcon.style.opacity = 1;
        theIconCharge.style.opacity = 0;
    }
}


export function initialize() {
    battery.onchange = () => {
        refresh();
    };
}

export function onScreenOn() {
    refresh();
}

export function onScreenOff() {
    theValue.text = '--%';
}

export function onPresent() {
}

export function onAbsent() {
}
