"use strict";

var browserSync = require("browser-sync");

browserSync.init({
    "ui": false,
    "files": [
        "./app/**/*.e2e.html",
        "./app/**/*{js, css}"
    ],
    "server": {},
    "open": false,
    "watchOptions": {
        "ignored": "*"
    },
    "logFileChanges": false
});