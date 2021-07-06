/* eslint-disable indent */
/* eslint-disable semi */
import { BodyPresenceSensor } from 'body-presence';
import { display } from 'display';
import * as clock from './clock';
import * as hrm from './hrm';
import * as battery from './battery';

// Array of sensors
const sensors = [];

// Add the Clock
sensors.push(clock);

// Add the heartbeat
sensors.push(hrm);

sensors.push(battery);

// Body Presence
{
    class BodyPresence extends BodyPresenceSensor {
        initialize () { }
        onPresent () { }
        onAbsent () { }
        onScreenOn () { this.start(); }
        onScreenOff () { this.stop(); }
    };

    const bodyPresence = new BodyPresence();
    bodyPresence.addEventListener('reading', () => {
        console.log('isWearing? ' + bodyPresence.present);
        bodyPresence.present ? sensors.map(sensor => sensor.onPresent()) : sensors.map(sensor => sensor.onAbsent());
    });
    sensors.push(bodyPresence);
}

// Initialize
sensors.map(sensor => sensor.initialize());

// Automatically stop all sensors when the screen is off to conserve battery
display.addEventListener('change', () => {
    console.log('isDisplayOn? ' + display.on);
    display.on ? sensors.map(sensor => sensor.onScreenOn()) : sensors.map(sensor => sensor.onScreenOff());
});

// Start
sensors.map(sensor => sensor.onScreenOn());
