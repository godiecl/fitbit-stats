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

const elements = [];

let progressWidth = null;

function getElement(prefix) {
    const element = document.getElementById(prefix);
    return {
        prefix,
        prevValue: null,
        container: element,
        bar: element.getElementsByClassName("progress-bar")[0],
        value: element.getElementsByClassName("progress-value")[0],
        goal: element.getElementsByClassName("progress-goal")[0],
        icon: element.getElementsByClassName("progress-icon")[0]
    }
}

function draw(el) {
    // The measure
    let actual = (today.adjusted[el.prefix] || 0);
    let goal = (goals[el.prefix] || 0);

    // Fix the zone minutes
    if (el.prefix === "activeZoneMinutes") {
        actual = today.adjusted.activeZoneMinutes.total;
        goal = (goal.total || 0);
    }
    // console.log(`Value: ${el.prefix} -> ${actual}/${goal}.`);

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

    // Show the spot
    if (progress >= 100) {
        progress = 100;
        el.goal.style.fill = 'fb-gray';
    } else {
        el.goal.style.fill = 'fb-extra-dark-gray';
    }
    // console.log(`Progress: ${progress}.`);

    // Show the width
    const height = Math.floor(progressWidth * progress / 100);
    // console.log(`Height: ${height}`);
    el.bar.y1 = 172 - height;
}

export function initialize() {
    // goalTypes.map(type => console.log(`Type: ${type}`));
    goalTypes.map(type => elements.push(getElement(type)));
    // elements.map(e => console.log(`Element: ${JSON.stringify(e)}`));

    progressWidth = elements[0].container.getElementsByClassName("progress-background")[0].getBBox().height;
    // console.log(`ProgresWidth: ${progressWidth}`);
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