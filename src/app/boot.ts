
import {provide, enableProdMode} from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {AppComponent} from './com/tiays/pharma/app.component';
import {ArrayService} from './com/tiays/pharma/util/array.service';

// IMPORTANT Because of conflict between node and require typed declarations
declare let __dirname:string;

enableProdMode();

bootstrap(AppComponent, [
    ROUTER_PROVIDERS, HTTP_PROVIDERS,
    provide(ArrayService, {useClass: ArrayService}),
    provide(APP_BASE_HREF, {useValue: 'file://' + __dirname}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
