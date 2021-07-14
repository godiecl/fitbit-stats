/* eslint-disable import/no-unresolved */
import document from 'document';
import { display } from 'display';
import { vibration } from "haptics";

const torch = document.getElementById('torch');

let firstTouch = false;
let torchOn = false;
let autoOffTimer = null;

function turnOffTorch() {
  vibration.stop();
  torch.style.opacity = 0;
  display.brightnessOverride = undefined;
  torchOn = false;
  firstTouch = false;
  if (autoOffTimer !== undefined) {
    clearTimeout(autoOffTimer);
    autoOffTimer = undefined;
  }
}

function turnOnTorch() {
  torch.style.opacity = 1;
  display.brightnessOverride = 'max';
  display.on = true;
  torchOn = true;
  autoOffTimer = setTimeout(() => { turnOffTorch() }, 5 * 1000);
}

export function initialize() {
  torch.addEventListener('mousedown', () => {
    vibration.start("bump");
    if (firstTouch) {
      if (torchOn) {
        turnOffTorch();
      } else {
        turnOnTorch();
      }
    } else {
      firstTouch = true;
      setTimeout(() => { firstTouch = false }, 500);
    }
  });
}

export function onScreenOn() {
}

export function onScreenOff() {
  turnOffTorch();
}

export function onPresent() {
}

export function onAbsent() {
  turnOffTorch();
}
