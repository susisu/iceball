/*
 * iceball : threads/simple.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "note"       : require("./simple/note.js"),
        "longnote"   : require("./simple/longnote.js"),
        "speedchange": require("./simple/speedchange.js")
    });
}

end_module();
