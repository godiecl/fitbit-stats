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

export function initialize () {
    clock.granularity = 'seconds';
    theSeparator.style.display = 'inline'
}

export function onScreenOn () {
  clock.addEventListener('tick', draw);
}

export function onScreenOff () {
  clock.removeEventListener('tick', draw);
}

export function onPresent () {
  theClock.style.fill = 'fb-white';
}

export function onAbsent () {
  theClock.style.fill = 'fb-dark-gray';
}

function draw (evt) {
  theSeconds.text = util.zeroPad(evt.date.getSeconds());
  theMinutes.text = util.zeroPad(evt.date.getMinutes());
  theHour.text = evt.date.getHours();
  // `${hours}`;
  if (theSeparator.style.display === 'inline') {
    theSeparator.style.display = 'none';
  } else {
    theSeparator.style.display = 'inline';
  }
  // console.log('Show: ' + theSeparator.style.display);
}
