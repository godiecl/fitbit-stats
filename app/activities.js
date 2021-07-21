/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import document from 'document';
import { goals, today } from "user-activity";

const goalTypes = [
    "steps",
    "distance",
    "calories",
    "elevationGain",
    "activeZoneMinutes"
];

const bg1 = '#202020';
const bg2 = 'fb-blue';
const bg3 = 'fb-yellow';
const bg4 = 'maroon';

const elements = [];

let progressWidth = null;

function getElement(type) {
    const element = document.getElementById(type);
    return {
        type,
        prevValue: null,
        container: element,
        background: element.getElementsByClassName("progress-background")[0],
        bar: element.getElementsByClassName("progress-bar")[0],
        value: element.getElementsByClassName("progress-value")[0],
        goal: element.getElementsByClassName("progress-goal")[0],
        icon: element.getElementsByClassName("progress-icon")[0]
    }
}

function draw(el) {
    // The measure
    let actual = (today.adjusted[el.type] || 0);
    let goal = (goals[el.type] || 0);

    // Fix the zone minutes
    if (el.type === "activeZoneMinutes") {
        actual = today.adjusted.activeZoneMinutes.total;
        goal = (goal.total || 0);
    }

    // The same.. return!
    if (el.prevValue === actual) {
        return;
    }
    el.prevValue = actual;

    // Update the values
    el.value.text = `${actual}`;
    el.goal.text = `${goal}`;

    // The progress
    let progress = 0;
    if (goal > 0) {
        progress = 100. * actual / goal;
    }

    const times = Math.floor(progress / 100);
    progress %= 100;
    // console.log(`Progress: ${el.type} -> ${progress} -> ${times}.`);

    switch (times) {
        case 1:
            el.background.style.fill = bg2;
            el.bar.style.fill = bg3;
            break;
        case 2:
        case 3:
        case 4:
        case 5:
            el.background.style.fill = bg3;
            el.bar.style.fill = bg4;
            break;
        default:
            el.background.style.fill = bg1;
            el.bar.style.fill = bg2;
    }

    // Show the width
    const height = Math.floor(progressWidth * progress / 100);
    el.bar.y1 = 172 - height;
}

export function initialize() {
    goalTypes.map(type => elements.push(getElement(type)));
    progressWidth = elements[0].background.getBBox().height;
}

export function onScreenOn() {
    elements.map(element => draw(element));
}

export function onScreenOff() {
}

export function onPresent() {
}

export function onAbsent() {
}
