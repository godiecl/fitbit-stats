/* eslint-disable semi */
/* eslint-disable indent */
import document from 'document';
import clock from 'clock';
import * as util from './utils';

const theClock = document.getElementById('clock');
const theHour = document.getElementById('clock-hour');
const theSeparator = document.getElementById('clock-separator');
const theMinutes = document.getElementById('clock-minutes');
const theSeconds = document.getElementById('clock-seconds');
const secHand = document.getElementById('secs');

let theMillisTimer = null;

export function initialize () {
    clock.granularity = 'seconds';
    theSeparator.style.display = 'inline'
}

export function onScreenOn () {
  clock.addEventListener('tick', draw);
  theMillisTimer = setInterval(() => {
    const date = new Date();
    secHand.groupTransform.rotate.angle = 6 * date.getSeconds() + 0.006 * date.getMilliseconds();
  }, 100);
}

export function onScreenOff () {
  clock.removeEventListener('tick', draw);
  secHand.style.opacity = 0;
  clearInterval(theMillisTimer);
  theMillisTimer = null;
}

export function onPresent () {
  theClock.style.fill = 'fb-white';
}

export function onAbsent () {
  theClock.style.fill = 'fb-dark-gray';
}

function draw (evt) {
  secHand.style.opacity = 1;
  theSeconds.text = util.zeroPad(evt.date.getSeconds());
  theMinutes.text = util.zeroPad(evt.date.getMinutes());
  theHour.text = evt.date.getHours();
  // `${hours}`;
  theSeparator.style.opacity ^= 1;
  // console.log('Show: ' + theSeparator.style.display);
  // const secs = evt.date.getSeconds();
  // const secAngle = secondsToAngle(secs);
  // secHand.groupTransform.rotate.angle = secAngle;
}
