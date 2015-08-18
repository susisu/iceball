/*
 * iceball : threads/simple/speedchange.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "SpeedChange"
    });
}

function SpeedChange(frame, speed) {
    this.frame = frame;
    this.speed = speed;
}

SpeedChange.prototype = Object.create(Object.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": SpeedChange
    }
});

end_module();
