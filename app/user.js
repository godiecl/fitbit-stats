/* eslint-disable import/no-unresolved */
import document from 'document';
import { user } from "user-profile";
import { me as device } from "device";

const theBmr = document.getElementById("user-bmr");
const theBmi = document.getElementById("user-bmi");
const theWeight = document.getElementById("user-weight");
const theResting = document.getElementById("user-rhr");
const theLastSync = document.getElementById("user-lastsync");

function getTimeInterval(date) {
    if (typeof date === 'undefined') {
        return "--";
    }
    const seconds = Math.floor((Date.now() - date) / 1000);
    let unit = "s";
    let value = seconds;
    if (seconds >= 31536000) {
        value = Math.floor(seconds / 31536000);
        unit = "y";
    } else if (seconds >= 86400) {
        value = Math.floor(seconds / 86400);
        unit = "d";
    } else if (seconds >= 3600) {
        value = Math.floor(seconds / 3600);
        unit = "h";
    } else if (seconds >= 60) {
        value = Math.floor(seconds / 60);
        unit = "m";
    }
    return `${value}${unit}`;
}

export function initialize() {
}

export function onScreenOn() {
    theBmr.text = user.bmr;
    theBmi.text = (user.weight / (user.height * user.height)).toFixed(1);
    theWeight.text = user.weight;
    theResting.text = user.restingHeartRate;
    theLastSync.text = getTimeInterval(device.lastSyncTime);
}

export function onScreenOff() {
}

export function onPresent() {
}

export function onAbsent() {
}
