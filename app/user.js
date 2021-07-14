/* eslint-disable import/no-unresolved */
import document from 'document';
import { user } from "user-profile";

const theBmr = document.getElementById("user-bmr");
const theBmi = document.getElementById("user-bmi");
const theWeight = document.getElementById("user-weight");
const theResting = document.getElementById("user-rhr");

export function initialize() {
}

export function onScreenOn() {
    theBmr.text = `${user.bmr}`;
    const bmi = (user.weight / (user.height * user.height)).toFixed(1);
    theBmi.text = `${bmi}`;
    theWeight.text = `${user.weight}`;
    theResting.text = `${user.restingHeartRate}`;
}

export function onScreenOff() {
}

export function onPresent() {
}

export function onAbsent() {
}