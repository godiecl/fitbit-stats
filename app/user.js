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
    if (seconds >= 86400) {
        return `${Math.floor(seconds / 86400)}d`;
    }
    if (seconds >= 3600) {
        return `${Math.floor(seconds / 3600)}h`;
    }
    if (seconds >= 60) {
        return `${Math.floor(seconds / 60)}m`;
    }
    return `${seconds}s`;
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
