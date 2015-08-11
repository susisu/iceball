/*
 * iceball : iceball.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "game" : require("./game.js"),
        "music": require("./music.js")
    });
}

end_module();
