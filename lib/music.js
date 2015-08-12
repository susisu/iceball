/*
 * iceball : music.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "Music"     : Music,
        "MusicEvent": MusicEvent,

        "createWebAudioContext": createWebAudioContext,
        "WebAudioMusic"        : WebAudioMusic
    });
}

var window = require("window"),
    ev     = require("electronvolt");


function Music() {
    ev.EventDispatcher.call(this);
}

Music.prototype = Object.create(ev.EventDispatcher.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": Music
    },
    "start": {
        "writable"    : true,
        "configurable": true,
        "value": function (startTime) {
        }
    },
    "stop": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
        }
    }
});

function MusicEvent(type, bubbles, cancelable, time) {
    ev.Event.call(this, type, bubbles, cancelable);
    this.time = time;
}

Object.defineProperties(MusicEvent, {
    "TICK": {
        "value": "tick"
    },
    "ENDED": {
        "value": "ended"
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
            return this.formatToString("MusicEvent", ["type", "bubbles", "cancelable", "time"]);
        }
    },
    "clone": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
            return new MusicEvent(this.type, this.bubbles, this.cancelable, this.time);
        }
    }
});

function createWebAudioContext() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
        throw new Error("Web Audio API is not supported");
    }
    return new AudioContext();
}

function WebAudioMusic(context, buffer) {
    Music.call(this);
    Object.defineProperties(this, {
        "__WebAudioMusic__context__": {
            "value": context
        },
        "__WebAudioMusic__buffer__": {
            "value": buffer
        },
        "__WebAudioMusic__fps__": {
            "writable": true,
            "value": 60.0
        },
        "__WebAudioMusic__isPlaying__": {
            "writable": true,
            "value": false
        },
        "__WebAudioMusic__source__": {
            "writable": true,
            "value": null
        },
        "__WebAudioMusic__timeOrigin__": {
            "writable": true,
            "value": 0.0
        },
        "__WebAudioMusic__currentTime__": {
            "writable": true,
            "value": 0.0
        },
        "__WebAudioMusic__intervalId__": {
            "writable": true,
            "value": undefined
        },
        "__WebAudioMusic__intervalCallback__": {
            "value": intervalCallback.bind(this)
        },
        "__WebAudioMusic__onEnded__": {
            "value": onEnded.bind(this)
        }
    });
}

Object.defineProperties(WebAudioMusic, {
    "loadAudioData": {
        "value": function (context, audioData, callback) {
            context.decodeAudioData(audioData, function (buffer) {
                callback.call(null, new WebAudioMusic(context, buffer));
            });
        }
    }
});

WebAudioMusic.prototype = Object.create(ev.EventDispatcher.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": WebAudioMusic
    },
    "fps": {
        "get": function () {
            return this["__WebAudioMusic__fps__"];
        },
        "set": function (value) {
            if (this["__WebAudioMusic__isPlaying__"]) {
                throw new Error("FPS cannot be changed");
            }
            this["__WebAudioMusic__fps__"] = value;
        }
    },
    "start": {
        "writable"    : true,
        "configurable": true,
        "value": function (startTime) {
            if (startTime === undefined) {
                startTime = 0.0;
            }
            this["__WebAudioMusic__isPlaying__"] = true;

            var source = this["__WebAudioMusic__context__"].createBufferSource();
            this["__WebAudioMusic__source__"] = source;
            source.buffer = this["__WebAudioMusic__buffer__"];
            source.connect(this["__WebAudioMusic__context__"].destination);
            source.onended = this["__WebAudioMusic__onEnded__"];
            source.start(this["__WebAudioMusic__context__"].currentTime, startTime);

            this["__WebAudioMusic__timeOrigin__"] = this["__WebAudioMusic__context__"].currentTime
            this["__WebAudioMusic__currentTime__"] = 0.0;

            var interval = 1000.0 / Math.max(this["__WebAudioMusic__fps__"], 60.0);
            this["__WebAudioMusic__intervalId__"] =
                window.setInterval(this["__WebAudioMusic__intervalCallback__"], interval);
        }
    },
    "stop": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
            if (this["__WebAudioMusic__isPlaying__"]) {
                this["__WebAudioMusic__isPlaying__"] = false;
                this["__WebAudioMusic__source__"].stop();
                this["__WebAudioMusic__source__"].onended = null;
                window.clearInterval(this["__WebAudioMusic__intervalId__"]);
                this["__WebAudioMusic__source__"] = null;
                this["__WebAudioMusic__intervalId__"] = undefined;
            }
        }
    }
});

function onEnded() {
    this.stop();
    this.dispatchEvent(
        new MusicEvent(MusicEvent.ENDED, false, false,
            this["__WebAudioMusic__context__"].currentTime - this["__WebAudioMusic__timeOrigin__"])
    );
}

function intervalCallback() {
    var currentTime = this["__WebAudioMusic__currentTime__"];
    var newTime = this["__WebAudioMusic__context__"].currentTime - this["__WebAudioMusic__timeOrigin__"];
    while (newTime > currentTime) {
        this.dispatchEvent(new MusicEvent(MusicEvent.TICK, false, false, currentTime));
        currentTime += 1.0 / this["__WebAudioMusic__fps__"];
    }
    this["__WebAudioMusic__currentTime__"] = currentTime;
}

end_module();
