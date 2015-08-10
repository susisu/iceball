/*
 * iceball : music.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "Music"     : Music,
        "MusicEvent": MusicEvent
    });
}

var ev = require("electronvolt");


function Music() {
    ev.EventDispatcher.call(this);
}

Music.prototype = Object.create(ev.EventDispatcher.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": Music
    },
    "play": {
        "writable"    : true,
        "configurable": true,
        "value": function (startFrame) {
        }
    },
    "pause": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
        }
    }
});

function MusicEvent(type, bubbles, cancelable) {
    ev.Event.call(this, type, bubbles, cancelable);
}

Object.defineProperties(MusicEvent, {
    "TICK": {
        "value": "tick"
    }
});

MusicEvent.prototype = Object.create(ev.Event.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": MusicEvent
    },
    "toString": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
            return this.formatToString("MusicEvent", ["type", "bubbles", "cancelable"]);
        }
    },
    "clone": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
            return new MusicEvent(this.type, this.bubbles, this.cancelable);
        }
    }
});

end_module();
