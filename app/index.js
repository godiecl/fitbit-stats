/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
import { BodyPresenceSensor } from 'body-presence';
import { display } from 'display';
import * as clock from './clock';
import * as hrm from './hrm';
import * as battery from './battery';
import * as calendar from './calendar';
import * as torch from './torch';
import * as suntimes from './suntimes';

// Array of sensors
const sensors = [];

// Add the Clock
sensors.push(clock);
// Add the heartbeat
sensors.push(hrm);
// The battery
sensors.push(battery);
// The calendar
sensors.push(calendar);
// The Suntimes
sensors.push(suntimes);

// Body Presence
{
    class BodyPresence extends BodyPresenceSensor {
        initialize() { }

        onPresent() { }

        onAbsent() { }

        onScreenOn() { this.start(); }

        onScreenOff() { this.stop(); }
    };

    const bodyPresence = new BodyPresence();
    bodyPresence.addEventListener('reading', () => {
        // console.log(`isWearing? ${  bodyPresence.present}`);
        if (bodyPresence.present) {
            sensors.map(sensor => sensor.onPresent());
        } else {
            sensors.map(sensor => sensor.onAbsent());
        }
    });
    sensors.push(bodyPresence);
}

// Initialize
sensors.map(sensor => sensor.initialize());

// Automatically stop all sensors when the screen is off to conserve battery
display.addEventListener('change', () => {
    // console.log(`isDisplayOn? ${  display.on}`);
    if (display.on) {
        sensors.map(sensor => sensor.onScreenOn());
    } else {
        sensors.map(sensor => sensor.onScreenOff());
    }
});

// Start
sensors.map(sensor => sensor.onScreenOn());

// Initialize
torch.initialize();
