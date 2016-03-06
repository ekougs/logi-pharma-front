import {Component} from "angular2/core";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, Location } from 'angular2/router';

import {SellComponent} from "./sell/sell.component";

@Component({
    selector: 'pharma-app',
    styleUrls: ['app/com/tiays/pharma/app.component.css'],
    templateUrl: 'app/com/tiays/pharma/app.component.html',
    directives: [ROUTER_DIRECTIVES, SellComponent]
})
@RouteConfig([
    {
        path: '/selling',
        name: 'Selling',
        component: SellComponent,
        useAsDefault: true
    }
])
export class AppComponent {
}