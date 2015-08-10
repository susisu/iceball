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
        "__Game__onTick__": {
            "value": onTick.bind(this)
        }
    });
}

Game.prototype = Object.create(Object.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": Game
    },
    "play": {
        "writable"    : true,
        "configurable": true,
        "value": function (startFrame) {
            this["__Game__threads__"].forEach(function (thread) {
                thread.init(startFrame);
            });
            this["__Game__music__"].addEventListener(music.MusicEvent.TICK, this["__Game__onTick__"]);
            this["__Game__music__"].play(startFrame);
        }
    },
    "pause": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
            this["__Game__music__"].removeEventListener(music.MusicEvent.TICK, this["__Game__onTick__"]);
            this["__Game__music__"].pause();
        }
    }
});

function onTick(event) {
    this["__Game__threads__"].forEach(function (thread) {
        thread.advance();
    });
}

end_module();
