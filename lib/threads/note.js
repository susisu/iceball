/*
 * iceball : threads/note.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "NoteThread"
    });
}

var thread = require("./thread.js");

function Note(hitFrame, relSpeed) {
    this.hitFrame      = hitFrame;
    this.relSpeed      = relSpeed;
    this.appFrame      = 0;
    this.posCorrection = 0.0;
}

Note.prototype = Object.create(Object.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": Note
    }
});

function NoteThread() {
    thread.Thread.call(this);
}

NoteThread.prototype = Object.create(thread.Thread.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": NoteThread
    }
});

end_module();
