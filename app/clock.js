/* eslint-disable import/no-unresolved */
import document from 'document';
import clock from 'clock';
import { vibration } from "haptics";

const theHour = document.getElementById('clock-hour');
const theMinutes = document.getElementById('clock-minutes');
const theSeconds = document.getElementById('clock-seconds');
const theSecondsHand = document.getElementById('clock-seconds-hand');
const clockTouch = document.getElementById('clock-touch');

// The timer to move the seconds hand
let theMillisTimer = null;
let firstTouch = false;
let secondsHandOn = false;

function zeroPad(i) {
  return i < 10 ? `0${i}` : i;
}

function drawDate(date) {
  // Update the hour an minutes
  theHour.text = date.getHours();
  theMinutes.text = `.${zeroPad(date.getMinutes())}`;
  // Update the seconds
  theSeconds.text = zeroPad(date.getSeconds());
}

function draw(evt) {
  drawDate(evt.date);
}

function turnOnSecondHand() {
  secondsHandOn = true;
  // Move the hand
  theMillisTimer = setInterval(() => {
    const date = new Date();
    theSecondsHand.groupTransform.rotate.angle = 6 * date.getSeconds() + 0.006 * date.getMilliseconds();
    theSecondsHand.style.opacity = 1;
  }, 100);
}

function turnOffSecondHand() {
  vibration.stop();
  secondsHandOn = false;
  firstTouch = false;
  theSecondsHand.style.opacity = 0;
  clearInterval(theMillisTimer);
  theMillisTimer = null;
}

export function initialize() {
  clock.granularity = 'seconds';
  clockTouch.addEventListener('mousedown', () => {
    vibration.start("bump");
    if (firstTouch) {
      if (secondsHandOn) {
        turnOffSecondHand();
      } else {
        turnOnSecondHand();
      }
    } else {
      firstTouch = true;
      setTimeout(() => { firstTouch = false }, 500);
    }
  });
}

export function onScreenOn() {
  // Start the draw of time
  clock.addEventListener('tick', draw);

  // Draw!
  drawDate(new Date());

  // Show the time
  theHour.style.opacity = 1;
  theMinutes.style.opacity = 1;
}

export function onScreenOff() {
  clock.removeEventListener('tick', draw);
  theSecondsHand.style.opacity = 0;
  clearInterval(theMillisTimer);
  theMillisTimer = null;

  // Hide the time
  theHour.style.opacity = 0;
  theMinutes.style.opacity = 0;
}

export function onPresent() {
  theHour.style.fill = 'fb-white';
  theMinutes.style.fill = 'fb-white';
}

export function onAbsent() {
  theHour.style.fill = 'fb-light-gray';
  theMinutes.style.fill = 'fb-light-gray';
}
