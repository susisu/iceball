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
