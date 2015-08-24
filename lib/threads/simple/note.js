/*
 * iceball : threads/simple/note.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "Note"      : Note,
        "normalize" : normalize,
        "NoteThread": NoteThread
    });
}

var thread = require("../thread.js");

var SpeedChange = require("./speedchange.js").SpeedChange;

function Note(time, relSpeed) {
    this.time         = time;
    this.relSpeed     = relSpeed;
    this.spawnTime    = 0;
}

Note.prototype = Object.create(Object.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": Note
    }
});

function normalize(notes, spdChanges, initSpeed, spdMultiplier) {
    // clone arrays
    notes      = notes.slice();
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
        while (sci < 0 || (sci < numSC && spdChanges[sci].time < note.time)) {
            sci++;
        }
        sci--;

        var currPosition = 0.0;
        var currTime     = note.time;
        var currSpeed    = note.relSpeed * spdMultiplier * (sci < 0 ? initSpeed : spdChanges[sci].speed);
        var deltaTime    = currTime - (sci < 0 ? -Infinity : spdChanges[sci].time);

        while (currPosition - (-1.0) > currSpeed * deltaTime) {
            currPosition -= currSpeed * deltaTime;
            currTime      = spdChanges[sci].time;

            sci--;
            currSpeed = note.relSpeed * spdMultiplier * (sci < 0 ? initSpeed : spdChanges[sci].speed);
            deltaTime = currTime - (sci < 0 ? -Infinity : spdChanges[sci].time);
        }

        note.spawnTime = currTime - (currPosition - (-1.0)) / currSpeed;
    }

    notes.sort(function (x, y) { return x.spawnTime - y.spawnTime; });
    
    return notes;
}

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
