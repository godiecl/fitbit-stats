/* eslint-disable import/no-unresolved */
import document from 'document';
import { battery, charger } from 'power';

const theValue = document.getElementById('battery-percent');
const theIcon = document.getElementById('battery-icon');
const theIconCharge = document.getElementById('battery-icon-charge');

const colors = ['red', 'orange', 'peach', 'white', 'mint', 'mint'];

function refresh() {
    // The value
    theValue.text = `${battery.chargeLevel}%`;

    // The color
    theValue.style.fill = `fb-${colors[Math.floor(battery.chargeLevel / 20)]}`;

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
