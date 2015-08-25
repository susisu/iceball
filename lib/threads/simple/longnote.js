/*
 * iceball : threads/simple/longnote.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "LongNote"      : LongNote,
        "normalize"     : normalize,
        "LongNoteThread": LongNoteThread
    });
}

var thread = require("../thread.js");

var SpeedChange = require("./speedchange.js").SpeedChange;

function LongNote(time, endTime, relSpeed) {
    this.time      = time;
    this.endTime   = endTime;
    this.relSpeed  = relSpeed;
    this.spawnTime = 0;
    this.length    = 0.0;
}

LongNote.prototype = Object.create(Object.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": LongNote
    }
});

function normalize(notes, spdChanges, initSpeed, spdMultiplier) {
    // clone arrays
    notes = notes.slice();
    spdChanges = spdChanges.slice();
    // sort by time
    notes.sort(function (x, y) { return x.time - y.time; });
    spdChanges.sort(function (x, y) { return x.time - y.time; });
    
    var numN  = notes.length,      // number of notes
        numSC = spdChanges.length; // number of speed changes

    var ni,      // note index
        sci = 0; // speed change index

    for (ni = 0; ni < numN; ni++) {
        var note = notes[ni];
        // get the index of the former speed change
        while (sci < 0 || (sci < numSC && spdChanges[sci].time < note.endTime)) {
            sci++;
        }
        sci--;

        var currPosition = 0.0;
        var currLength   = 0.0;
        var currTime     = note.endTime;
        var currSpeed    = note.relSpeed * spdMultiplier * (sci < 0 ? initSpeed : spdChanges[sci].speed);
        var deltaTime    = currTime - (sci < 0 ? -Infinity : spdChanges[sci].time);

        while (currTime - deltaTime > note.time) {
            currLength += currSpeed * deltaTime;
            currTime    = spdChanges[sci].time;

            sci--;
            currSpeed = note.relSpeed * spdMultiplier * (sci < 0 ? initSpeed : spdChanges[sci].speed);
            deltaTime = currTime - (sci < 0 ? -Infinity : spdChanges[sci].time);
        }

        note.length = currLength + (currTime - note.time) * currSpeed;

        currTime    = note.time;

        while (currPosition - (-1.0) > currSpeed * deltaTime) {
            currPosition -= currSpeed * deltaTime;
            currTime      = spdChanges[sci].time;

            sci--;
            currSpeed = note.relSpeed * spdMultiplier * (sci < 0 ? initSpeed : spdChanges[sci].speed);
            deltaTime = currTime - (sci < 0 ? -Infinity : spdChanges[sci].time);
        }

        note.spawnTime = currTime - (currPosition - (-1.0)) / currSpeed;
    }

    notes.sort(function (x, y) { return x.spawnTime  - y.spawnTime ; });
    
    return notes;
}

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
