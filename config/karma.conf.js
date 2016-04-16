module.exports = function (config) {
    config.set({
                   basePath: '..',

                   frameworks: ['jasmine', 'requirejs'],

                   files: [
                       // paths loaded by Karma
                       {pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: true},
                       {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
                       {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: true},
                       {pattern: 'node_modules/angular2/bundles/angular2.dev.js', included: true, watched: true},
                       {pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: true},
                       {pattern: 'node_modules/fast-levenshtein/levenshtein.js', included: true, watched: true},
                       {pattern: 'node_modules/lodash/lodash.js', included: true, watched: true},
                       {pattern: 'node_modules/moment/moment.js', included: true, watched: true},

                       {pattern: 'config/karma-test-shim.js', included: true, watched: true},

                       // paths loaded via module imports
                       {pattern: 'src/**/*.js', included: false},

                       // paths to support debugging with source maps in dev tools
                       {pattern: 'src/**/*.ts', included: false},
                       {pattern: 'src/**/*.js.map', included: false}
                   ],

                   exclude: [
                       "src/**/*.e2e.*"
                   ],
                   // proxied base paths
                   proxies: {
                       // required for component assets fetched by Angular's compiler
                       '/src/': '/base/src/'
                   },

                   port: 9876,

                   logLevel: config.LOG_INFO,

                   colors: true,

                   autoWatch: true,

                   browsers: ['Chrome'],

                   // Karma plugins loaded
                   plugins: [
                       'karma-jasmine',
                       'karma-coverage',
                       'karma-chrome-launcher',
                       'karma-requirejs'
                   ],

                   // Coverage reporter generates the coverage
                   reporters: ['progress', 'dots', 'coverage'],

                   // Source files that you wanna generate coverage for.
                   // Do not include tests or libraries (these files will be instrumented by Istanbul)
                   preprocessors: {
                       'src/**/!(*spec).js': ['coverage']
                   },

                   coverageReporter: {
                       reporters: [
                           {type: 'json', subdir: '.', file: 'coverage-final.json'}
                       ]
                   },

                   singleRun: true
               })
};
