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
