///<reference path="../node_modules/angular2/ts/typings/node/node.d.ts" />

import {provide} from "angular2/core";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from 'angular2/router';
import {bootstrap}    from 'angular2/platform/browser';

import {AppComponent} from "./com/tiays/pharma/app.component";

// TODO move ROUTER_PROVIDERS to app
bootstrap(AppComponent,
    [ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue: 'file://' + __dirname}),
        provide(LocationStrategy, {useClass: HashLocationStrategy})]);
