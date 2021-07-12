/* eslint-disable import/no-unresolved */
import document from 'document';
import clock from 'clock';

const theClock = document.getElementById('clock');
const theHour = document.getElementById('clock-hour');
const theSeparator = document.getElementById('clock-separator');
const theMinutes = document.getElementById('clock-minutes');
const theSeconds = document.getElementById('clock-seconds');
const theSecondsHand = document.getElementById('clock-seconds-hand');

// The timer to move the seconds hand
let theMillisTimer = null;

function zeroPad(i) {
  if (i < 10) {
    return `0${i}`;
  }
  return i;
}

function draw(evt) {
  // Show the seconds hand
  theSecondsHand.style.opacity = 1;
  // Update the hour:minutes:seconds
  theSeconds.text = zeroPad(evt.date.getSeconds());
  theMinutes.text = zeroPad(evt.date.getMinutes());
  theHour.text = evt.date.getHours();
  // : on/off
  // eslint-disable-next-line no-bitwise
  theSeparator.style.opacity ^= 1;
}

export function initialize() {
  clock.granularity = 'seconds';
  theSeparator.style.display = 'inline'
}

export function onScreenOn() {
  // Start the draw of time
  clock.addEventListener('tick', draw);

  // Move the hand
  theMillisTimer = setInterval(() => {
    const date = new Date();
    theSecondsHand.groupTransform.rotate.angle = 6 * date.getSeconds() + 0.006 * date.getMilliseconds();
  }, 100);
}

export function onScreenOff() {
  clock.removeEventListener('tick', draw);
  theSecondsHand.style.opacity = 0;
  clearInterval(theMillisTimer);
  theMillisTimer = null;
}

export function onPresent() {
  theClock.style.fill = 'fb-white';
  theSeconds.style.fill = 'fb-red';
}

export function onAbsent() {
  theClock.style.fill = 'fb-dark-gray';
  theSeconds.style.fill = 'fb-dark-gray';
}
