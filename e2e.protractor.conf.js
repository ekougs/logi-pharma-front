var env = require('./environment.js');

// This is the configuration for a smoke test for an Angular2 application.
//
// *** NOTE ***
// As Angular2 is in rapid development, the test application that ships with
// the Protractor repository does not yet contain an Angular2 section. This
// configuration assumes that you are serving the examples from the
// angular/angular repository at localhost:8000.
// See https://github.com/angular/angular/blob/master/DEVELOPER.md for
// setup instructions.
//
// TODO: when Angular2 is beta, include a test application in the
// Protractor repository.
exports.config = {
    seleniumAddress: env.seleniumAddress,

    framework: 'jasmine',

    specs: [
        'app/**/*.e2e.spec.js'
    ],

    capabilities: env.capabilities,

    baseUrl: 'http://localhost:8000',


    onPrepare: function() {
        browser.ignoreSynchronization = true;
    }
};