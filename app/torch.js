/* eslint-disable import/no-unresolved */
import document from 'document';

import { display } from 'display';

const torchEl = document.getElementById('torch');

const torchEnabled = true;
let firstTouch = false;
let torchOn = false;
let autoOffTimer = null;

function turnOffTorch() {
  torchEl.style.opacity = 0;
  display.brightnessOverride = undefined;
  torchOn = false;
  if (autoOffTimer !== undefined) {
    clearTimeout(autoOffTimer);
    autoOffTimer = undefined;
  }
}

function turnOnTorch() {
  torchEl.style.opacity = 1;
  display.brightnessOverride = 'max';
  display.on = true;
  torchOn = true;
  autoOffTimer = setTimeout(() => { turnOffTorch() }, 5 * 1000);
}

// eslint-disable-next-line import/prefer-default-export
export function initialize() {
  torchEl.addEventListener('mousedown', () => {
    if (torchEnabled) {
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
    }
  });
}
