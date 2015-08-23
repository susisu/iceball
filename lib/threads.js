/*
 * iceball : threads.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "thread": require("./threads/thread.js"),

        "simple": require("./threads/simple.js")
    });
}

end_module();
