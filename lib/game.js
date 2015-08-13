/*
 * iceball : game.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "Game": Game
    });
}

var music = require("./music.js");


function Game(music, threads) {
    Object.defineProperties(this, {
        "__Game__music__": {
            "writable": true,
            "value"   : music
        },
        "__Game__threads__": {
            "writable": true,
            "value"   : threads.slice()
        },
        "__Game__onMusicTick__": {
            "value": onMusicTick.bind(this)
        },
        "__Game__onMusicEnded__": {
            "value": onMusicEnded.bind(this)
        }
    });
}

Game.prototype = Object.create(Object.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": Game
    },
    "start": {
        "writable"    : true,
        "configurable": true,
        "value": function (startTime) {
            this["__Game__threads__"].forEach(function (thread) {
                thread.init(startTime);
            });
            this["__Game__music__"].addEventListener(music.MusicEvent.TICK, this["__Game__onMusicTick__"]);
            this["__Game__music__"].addEventListener(music.MusicEvent.ENDED, this["__Game__onMusicEnded__"]);
            this["__Game__music__"].start(startTime);
        }
    },
    "stop": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
            this["__Game__music__"].removeEventListener(music.MusicEvent.TICK, this["__Game__onMusicTick__"]);
            this["__Game__music__"].removeEventListener(music.MusicEvent.ENDED, this["__Game__onMusicEnded__"]);
            this["__Game__music__"].stop();
        }
    }
});

function onMusicTick(event) {
    this["__Game__threads__"].forEach(function (thread) {
        thread.advance();
    });
}

function onMusicEnded(event) {
    this.stop();
}

end_module();
