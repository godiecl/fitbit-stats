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
    theBmr.text = 1973; // user.bmr;
    theBmi.text = 35.2; // (user.weight / (user.height * user.height)).toFixed(1);
    theWeight.text = 109.1; // user.weight;
    theResting.text = 69; // user.restingHeartRate;
}

export function onScreenOff() {
}

export function onPresent() {
    /*
    theBmr.style.fill = 'fb-white';
    theBmi.style.fill = 'fb-white';
    theWeight.style.fill = 'fb-white';
    theResting.style.fill = 'fb-white';
    */
}

export function onAbsent() {
    /*
    theBmr.style.fill = 'fb-dark-gray';
    theBmi.style.fill = 'fb-dark-gray';
    theWeight.style.fill = 'fb-dark-gray';
    theResting.style.fill = 'fb-dark-gray';
    */
}