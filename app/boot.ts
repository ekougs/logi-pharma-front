///<reference path="../node_modules/angular2/ts/typings/node/node.d.ts" />

import {provide} from "angular2/core";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from 'angular2/router';
import {bootstrap}    from 'angular2/platform/browser';

import {AppComponent} from "./com/tiays/pharma/app.component";
import {ArrayService} from "./com/tiays/pharma/util/array.service";

var levenshtein = require('fast-levenshtein');

bootstrap(AppComponent, [ROUTER_PROVIDERS,
    provide('levenshtein', {useValue: levenshtein}),
    provide(ArrayService, {useClass: ArrayService}),
    provide(APP_BASE_HREF, {useValue: 'file://' + __dirname}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})]);
