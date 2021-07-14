/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import document from 'document';
import { goals, today } from "user-activity";

const goalTypes = [
    "steps",
    "distance",
    "elevationGain",
    "calories",
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
        progress: element.getElementsByClassName("progress")[0],
        countGoal: element.getElementsByClassName("countGoal")[0],
        count: element.getElementsByClassName("count")[0],
        icon: element.getElementsByClassName("icon")[0],
        tgtYes: element.getElementsByClassName("tgt-yes")[0],
        tgtNo: element.getElementsByClassName("tgt-no")[0]
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
    el.count.text = `${actual}`;
    el.countGoal.text = `${goal}`;

    // The progress
    let progress = 0;
    if (goal > 0) {
        progress = 100. * actual / goal;
    }
    // console.log(`Progress: ${progress}.`);

    // Show the spot
    if (progress >= 100) {
        progress = 100;
        el.tgtYes.style.opacity = 1;
    } else {
        el.tgtYes.style.opacity = 0;
    }
    // Show the width
    el.progress.width = Math.floor(progressWidth * progress / 100);
}

export function initialize() {
    // goalTypes.map(type => console.log(`Type: ${type}`));
    goalTypes.map(type => elements.push(getElement(type)));
    // elements.map(e => console.log(`Element: ${JSON.stringify(e)}`));
    progressWidth = elements[0].container.getElementsByClassName("line")[0].getBBox().width;
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