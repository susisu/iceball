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

function LongNote(frame, endFrame, relSpeed) {
    this.frame         = frame;
    this.endFrame      = endFrame;
    this.relSpeed      = relSpeed;
    this.spawnFrame    = 0;
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

function normalize(notes, spdChanges, stdDuration, spdMultiplier) {
    // clone arrays
    notes = notes.slice();
    spdChanges = spdChanges.slice();
    // sort by frame
    notes.sort(function (x, y) { return x.frame - y.frame; });
    spdChanges.sort(function (x, y) { return x.frame - y.frame; });
    
    var numN  = notes.length,      // number of notes
        numSC = spdChanges.length; // number of speed changes

    var ni,      // note index
        sci = 0; // speed change index

    for (ni = 0; ni < numN; ni++) {
        var note = notes[ni];
        // get the index of the former speed change
        while (sci < 0 || (sci < numSC && spdChanges[sci].frame < note.endFrame)) {
            sci++;
        }
        sci--;

        var currSpeed    = sci < 0 ? 1.0 : spdChanges[sci].speed;
        var currFrame    = note.endFrame;
        var currPosition = 0.0;
        var currLength   = 0.0;

        while (currPosition > -1.0) {
            currFrame--;

            while (sci >= 0 && currFrame < spdChanges[sci].frame) {
                sci--;

                if (sci < 0) {
                    currSpeed = 1.0;
                }
                else {
                    currSpeed = spdChanges[sci].speed;
                }
            }

            if (note.frame <= currFrame) {
                currLength += currSpeed * note.relSpeed * speedMultiplier / stdDuration;
            }
            else {
                currPosition -= currSpeed * note.relSpeed * speedMultiplier / stdDuration;
            }
        }

        note.spawnFrame    = currFrame;
        note.length        = currLength;
        note.posCorrection = currPosition + 1.0;
    }

    notes.sort(function (x, y) { return x.spawnFrame - y.spawnFrame; });
    
    return ntoes;
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
