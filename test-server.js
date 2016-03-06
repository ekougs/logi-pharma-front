"use strict";

var browserSync = require("browser-sync");

browserSync.init({
    "ui": false,
    "files": [
        "./app/**/*.e2e.html",
        "./app/**/*{js, css}"
    ],
    "server": {
        "routes": {
            "/suggest": "./app/com/tiays/pharma/suggest"
        }
    },
    "open": false,
    "watchOptions": {
        "ignored": "*"
    },
    "logFileChanges": false
});