(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'src': 'src', // 'dist',
        'app': 'app', // 'dist',
        'rxjs': '../node_modules/rxjs',
        '@angular': '../node_modules/@angular',
        'crypto-js': '../node_modules/crypto-js/crypto-js.js',
        'lodash': '../node_modules/lodash/lodash.js',
        'levenshtein': '../node_modules/fast-levenshtein/levenshtein.js',
        'moment': '../node_modules/moment/moment.js'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'src': {defaultExtension: 'js'},
        'app': {main: 'boot.js', defaultExtension: 'js'},
        'rxjs': {defaultExtension: 'js'}
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/testing'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
    });

    var config = {
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);
    System.import('app').catch(function (err) {
        console.error(err);
    });

})(this);