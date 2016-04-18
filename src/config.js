System.config({
                  packages: {
                      app: {
                          format: 'register',
                          defaultExtension: 'js'
                      }
                  },
                  map: {
                      "crypto-js": "../node_modules/crypto-js/crypto-js.js",
                      lodash: '../node_modules/lodash/lodash.js',
                      levenshtein: '../node_modules/fast-levenshtein/levenshtein.js',
                      moment: '../node_modules/moment/moment.js'
                  }
              });
System.import('app/boot')
    .then(null, console.error.bind(console));