import {Component, OnInit} from "@angular/core";
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {LevenshteinService} from './util/levenshtein.service';

import {SellComponent} from "./sell/sell.component";

@Component({
               selector: 'pharma-app',
               styleUrls: ['app/com/tiays/pharma/app.component.css'],
               templateUrl: 'app/com/tiays/pharma/app.component.html',
               providers: [LevenshteinService],
               directives: [SellComponent, ROUTER_DIRECTIVES]
           })
@Routes([
            {
                path: '/selling',
                component: SellComponent
            }
        ])
export class AppComponent implements OnInit {
    constructor(private _router:Router) {

    }

    ngOnInit() {
        // TODO Replace by useasdefault when available
        this._router.navigate(['/selling'])
    }
}