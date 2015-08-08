/*
 * iceball : threads/thread.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "Thread"     : Thread,
        "ThreadEvent": ThreadEvent
    });
}

var ev = require("electronvolt");


function Thread() {
    ev.EventDispatcher.call(this);
    Object.defineProperties(this, {
        "__Thread__currentFrame__": {
            "writable": true,
            "value": 0
        }
    });
}

Thread.prototype = Object.create(ev.EventDispatcher.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": Thread
    },
    "init": {
        "writable"    : true,
        "configurable": true,
        "value": function (frame) {
            this["__Thread__currentFrame__"] = frame;
        }
    },
    "advance": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
            this["__Thread__currentFrame__"] += 1;
        }
    }
});

function ThreadEvent(type, bubbles, cancelable) {
    ev.Event.call(this, type, bubbles, cancelable);
}

ThreadEvent.prototype = Object.create(ev.Event.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": ThreadEvent
    },
    "toString": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
            return this.formatToString("ThreadEvent", ["type", "bubbles", "cancelable"]);
        }
    },
    "clone": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
            return new ThreadEvent(this.type, this.bubbles, this.cancelable);
        }
    }
});

end_module();
