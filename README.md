# Logipharma Front App

## Set up
Before starting anything listed below you must  
Install npm (currently using 2.13.0)  
Run `npm install`  
Install typings globally
Run `typings install`

## Run karma tests
`npm test`  
To display coverage after testing `npm run coverage` and get to `localhost:9875`

## Run E2E tests
`npm run e2e`  
A selenium server must be running, before launching this command 

## Start application in default DEV mode
`npm start` or `npm run start:dev`

## Start application in PROD mode
`npm run start:prod`

## Package the application
For mac `npm run package:mac`  
For windows(ia32) `npm run package:windows`
