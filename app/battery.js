/* eslint-disable semi */
/* eslint-disable indent */
import document from 'document';
import { battery, charger } from 'power';

const theValue = document.getElementById('battery-percent');
const theIcon = document.getElementById('battery-icon');
const theIconCharge = document.getElementById('battery-icon-charge');
const theBar = document.getElementById('battery-bar');
const values = '800000_d20000_ff3200_ff7500_ffb900_f1fc06_b6ff41_7bff7b_41ffb6_06edf1_00a4ff_005bff_0012ff_0000d2_000080_000246'.split('_');

export function initialize () {
    battery.onchange = (charger, evt) => {
        refresh();
    }
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
    theValue.text = `${battery.chargeLevel}%`
    theBar.x2 = Math.floor((battery.chargeLevel * 336) / 100);
    const index = Math.floor((battery.chargeLevel * (values.length - 1)) / 100);
    theValue.style.fill = '#' + values[index];
    theIcon.style.fill = '#' + values[index];
    if (charger.connected) {
        theIcon.style.opacity = 0;
        theIconCharge.style.opacity = 1;
    } else {
        theIcon.style.opacity = 1;
        theIconCharge.style.opacity = 0;
    }
}
