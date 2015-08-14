/*
 * iceball : threads/longnote.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "LongNoteThread"
    });
}

var thread = require("./thread.js");

function LongNote(beginFrame, endFrame, relSpeed) {
    this.beginFrame    = beginFrame;
    this.endFrame      = endFrame;
    this.relSpeed      = relSpeed;
    this.appFrame      = 0;
    this.length        = 0.0;
    this.posCorrection = 0.0;
}

LongNote.prototype = Object.create(Object.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": LongNote
    }
});

function LongNoteThread() {
    thread.Thread.call(this);
}

LongNoteThread.prototype = Object.create(thread.Thread.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": LongNoteThread
    }
});

end_module();
