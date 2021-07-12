/* eslint-disable semi */
/* eslint-disable indent */
import document from 'document';

import { display } from 'display';

const torchEl = document.getElementById('torch');

const torchEnabled = true;
let firstTouch = false;
let torchOn = false;
let autoOffTimer = null;

export function initialize () {
  torchEl.addEventListener('mousedown', (evt) => {
    if (torchEnabled) {
      if (firstTouch) {
        if (torchOn) {
          TurnOffTorch();
        } else {
          TurnOnTorch();
        }
      } else {
        firstTouch = true;
        setTimeout(function () { firstTouch = false }, 500);
      }
    }
  });
}

function TurnOnTorch () {
  torchEl.style.opacity = 1;
  display.brightnessOverride = 'max';
  display.on = true;
  torchOn = true;
  autoOffTimer = setTimeout(function () { TurnOffTorch() }, 5 * 1000);
}

function TurnOffTorch () {
  torchEl.style.opacity = 0;
  display.brightnessOverride = undefined;
  torchOn = false;
  if (autoOffTimer !== undefined) {
    clearTimeout(autoOffTimer);
    autoOffTimer = undefined;
  }
}
