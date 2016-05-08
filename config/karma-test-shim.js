// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () {
};
//
//var libMap = {
//    // Mapped because I retrieved those through require
//    'levenshtein': getPathMapping('node_modules/fast-levenshtein/levenshtein.js'),
//    'lodash': getPathMapping('node_modules/lodash/lodash.js'),
//    'moment': getPathMapping('node_modules/moment/moment.js'),
//    'crypto-js': getPathMapping('node_modules/crypto-js/crypto-js.js')
//};
//
//function getPathMapping(src) {
//    return getKarmaPathMapping('/base/' + src);
//}
//
//function getKarmaPathMapping(karmaSrc) {
//    return karmaSrc + '?' + window.__karma__.files[karmaSrc];
//}
//
//var appFileMap = Object.keys(window.__karma__.files).filter(onlyAppFiles).reduce(createPathRecords, libMap);
//
//System.config({
//                  packages: packages
//              });
//
//System.import('@angular/platform-browser/src/browser/browser_adapter')
//    .then(function (browser_adapter) {
//        browser_adapter.BrowserDomAdapter.makeCurrent();
//    })
//    .then(function () {
//        return Promise.all(resolveTestFiles());
//    })
//    .then(function () {
//        __karma__.start();
//    }, function (error) {
//        console.log("error", error.stack, error.message);
//        __karma__.error(error.stack || error);
//    });
//
//function createPathRecords(pathsMapping, appPath) {
//    // creates local module name mapping to global path with karma's fingerprint in path, e.g.:
//    // './vg-player/vg-player':
//    // '/base/dist/vg-player/vg-player.js?f4523daf879cfb7310ef6242682ccf10b2041b3e'
//    var pathParts = appPath.split('/');
//    var moduleName = './' + pathParts.slice(Math.max(pathParts.length - 2, 1)).join('/');
//    moduleName = moduleName.replace(/\.js$/, '');
//    pathsMapping[moduleName] = getKarmaPathMapping(appPath);
//    return pathsMapping;
//}
//
//function onlyAppFiles(filePath) {
//    return /\/base\/src\/(?!.*\.spec\.js$).*\.js$/.test(filePath);
//}
//
//function onlySpecFiles(path) {
//    return /\.spec\.js$/.test(path);
//}
//
//function resolveTestFiles() {
//    return Object.keys(window.__karma__.files)  // All files served by Karma.
//        .filter(onlySpecFiles)
//        .map(function (moduleName) {
//            // loads all spec files via their global module names (e.g.
//            // 'base/dist/vg-player/vg-player.spec')
//            return System.import(moduleName);
//        });
//}



System.import('config/angular.test.setup.js')
    .then(function() {
        return Promise.all(
            Object.keys(window.__karma__.files)
                .filter(onlySpecFiles)
                .map(file2moduleName)
                .map(importModules)
        );
    })
    .then(function() {
        __karma__.start();
    }, function(error) {
        __karma__.error(error.name + ": " + error.message);
    });

// Filter spec files
function onlySpecFiles(path) {
    return /\.spec\.js$/.test(path);
}

// Normalize paths to module names.
function file2moduleName(filePath) {
    return filePath.replace(/\\/g, '/')
        .replace(/^\/base\//, '')
        .replace(/\.js/, '');
}

// Import module path
function importModules(path) {
    return System.import(path);
}
