import {provide, enableProdMode} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from 'angular2/router';
import {bootstrap} from 'angular2/platform/browser';

import {AppComponent} from './com/tiays/pharma/app.component';
import {ArrayService} from './com/tiays/pharma/util/array.service';

// IMPORTANT Because of conflict between node and require typed declarations
declare let __dirname: string;

enableProdMode();

bootstrap(AppComponent, [ROUTER_PROVIDERS,
    provide(ArrayService, {useClass: ArrayService}),
    provide(APP_BASE_HREF, {useValue: 'file://' + __dirname}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})]);
