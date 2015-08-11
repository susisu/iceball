/*!
 * iceball 0.0.0
 * copyright (c) 2015 Susisu | MIT License
 * https://github.com/susisu/iceball
 */
var iceball =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    /*
     * iceball : iceball.js
     * copyright (c) 2015 Susisu
     */

    "use strict";

    function end_module() {
        module.exports = Object.freeze({
            "game" : __webpack_require__(1),
            "music": __webpack_require__(2)
        });
    }

    end_module();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

    var music = __webpack_require__(2);


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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

    /*
     * iceball : music.js
     * copyright (c) 2015 Susisu
     */

    "use strict";

    function end_module() {
        module.exports = Object.freeze({
            "Music"     : Music,
            "MusicEvent": MusicEvent,

            "createWebAudioContext": createWebAudioContext,
            "WebAudioMusic"        : WebAudioMusic
        });
    }

    var window = __webpack_require__(3),
        ev     = __webpack_require__(4);


    function Music() {
        ev.EventDispatcher.call(this);
    }

    Music.prototype = Object.create(ev.EventDispatcher.prototype, {
        "constructor": {
            "writable"    : true,
            "configurable": true,
            "value": Music
        },
        "play": {
            "writable"    : true,
            "configurable": true,
            "value": function (startTime) {
            }
        },
        "stop": {
            "writable"    : true,
            "configurable": true,
            "value": function () {
            }
        }
    });

    function MusicEvent(type, bubbles, cancelable, time) {
        ev.Event.call(this, type, bubbles, cancelable);
        this.time = time;
    }

    Object.defineProperties(MusicEvent, {
        "TICK": {
            "value": "tick"
        },
        "END": {
            "value": "end"
        }
    });

    MusicEvent.prototype = Object.create(ev.Event.prototype, {
        "constructor": {
            "writable"    : true,
            "configurable": true,
            "value": MusicEvent
        },
        "toString": {
            "writable"    : true,
            "configurable": true,
            "value": function () {
                return this.formatToString("MusicEvent", ["type", "bubbles", "cancelable", "time"]);
            }
        },
        "clone": {
            "writable"    : true,
            "configurable": true,
            "value": function () {
                return new MusicEvent(this.type, this.bubbles, this.cancelable, this.time);
            }
        }
    });

    function createWebAudioContext() {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            throw new Error("Web Audio API is not supported");
        }
        return new AudioContext();
    }

    function WebAudioMusic(context, buffer) {
        Music.call(this);
        Object.defineProperties(this, {
            "__WebAudioMusic__context__": {
                "value": context
            },
            "__WebAudioMusic__buffer__": {
                "value": buffer
            },
            "__WebAudioMusic__fps__": {
                "writable": true,
                "value": 60.0
            },
            "__WebAudioMusic__isPlaying__": {
                "writable": true,
                "value": false
            },
            "__WebAudioMusic__source__": {
                "writable": true,
                "value": null
            },
            "__WebAudioMusic__timeOrigin__": {
                "writable": true,
                "value": 0.0
            },
            "__WebAudioMusic__currentTime__": {
                "writable": true,
                "value": 0.0
            },
            "__WebAudioMusic__intervalId__": {
                "writable": true,
                "value": undefined
            },
            "__WebAudioMusic__intervalCallback__": {
                "value": intervalCallback.bind(this)
            }
        });
    }

    Object.defineProperties(WebAudioMusic, {
        "loadAudioData": {
            "value": function (context, audioData, callback) {
                context.decodeAudioData(audioData, function (buffer) {
                    callback.call(null, new WebAudioMusic(context, buffer));
                });
            }
        }
    });

    WebAudioMusic.prototype = Object.create(ev.EventDispatcher.prototype, {
        "constructor": {
            "writable"    : true,
            "configurable": true,
            "value": WebAudioMusic
        },
        "fps": {
            "get": function () {
                return this["__WebAudioMusic__fps__"];
            },
            "set": function (value) {
                if (this["__WebAudioMusic__isPlaying__"]) {
                    throw new Error("FPS cannot be changed");
                }
                this["__WebAudioMusic__fps__"] = value;
            }
        },
        "play": {
            "writable"    : true,
            "configurable": true,
            "value": function (startTime) {
                this["__WebAudioMusic__isPlaying__"] = true;

                var source = this["__WebAudioMusic__context__"].createBufferSource();
                this["__WebAudioMusic__source__"] = source;
                source.buffer = this["__WebAudioMusic__buffer__"];
                source.connect(this["__WebAudioMusic__context__"].destination);
                source.start(this["__WebAudioMusic__context__"].currentTime, startTime);

                this["__WebAudioMusic__timeOrigin__"] = this["__WebAudioMusic__context__"].currentTime
                this["__WebAudioMusic__currentTime__"] = 0.0;

                var interval = 1000.0 / Math.max(this["__WebAudioMusic__fps__"], 60.0);
                this["__WebAudioMusic__intervalId__"] =
                    window.setInterval(this["__WebAudioMusic__intervalCallback__"], interval);
            }
        },
        "stop": {
            "writable"    : true,
            "configurable": true,
            "value": function () {
                if (this["__WebAudioMusic__isPlaying__"]) {
                    this["__WebAudioMusic__isPlaying__"] = false;
                    this["__WebAudioMusic__source__"].stop();
                    window.clearInterval(this["__WebAudioMusic__intervalId__"]);
                    this["__WebAudioMusic__source__"] = null;
                    this["__WebAudioMusic__intervalId__"] = undefined;
                }
            }
        }
    });

    function intervalCallback() {
        var currentTime = this["__WebAudioMusic__currentTime__"];
        var newTime = this["__WebAudioMusic__context__"].currentTime - this["__WebAudioMusic__timeOrigin__"];
        while (newTime > currentTime) {
            this.dispatchEvent(new MusicEvent(MusicEvent.TICK, false, false, currentTime));
            currentTime += 1.0 / this["__WebAudioMusic__fps__"];
        }
        this["__WebAudioMusic__currentTime__"] = currentTime;
    }

    end_module();


/***/ },
/* 3 */
/***/ function(module, exports) {

    module.exports = window;

/***/ },
/* 4 */
/***/ function(module, exports) {

    module.exports = electronvolt;

/***/ }
/******/ ]);