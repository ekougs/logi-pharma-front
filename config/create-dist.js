(function () {
    var fs = require('fs');
    var cpx = require('cpx');

    distVendor();
    distApp();

    function distApp() {
        cpx.copy('*.{html,css,js,json}', 'dist', logErr);
        cpx.copy('src/*.{html,css,js,json}', 'dist/src', logErr);
        cpx.copy('src/app/**/*.{html,css,js,js.map,json}', 'dist/src/app', logErr);
    }

    function distVendor() {
        fs.readFile('package.json', 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            var dependencies = JSON.parse(data).dependencies;
            for (var dependency in dependencies) {
                if (!dependencies.hasOwnProperty(dependency)) {
                    continue;
                }
                cpx.copy('node_modules/' + dependency + '/**/**.{js,json,eot,svg,ttf,woff,woff2}',
                         'dist/node_modules/' + dependency, logErr);
            }
        });
    }

    function logErr(err) {
        if (err !== null) {
            console.error(err);
        }
    }
}());