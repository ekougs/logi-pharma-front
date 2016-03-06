import { Component } from 'angular2/core';
import {Observable} from "rxjs/Observable";

import {SuggestDirective} from "../suggest/suggest.directive";
import {SellService} from "./sell.service";
import {Product} from "./sell.service";


@Component({
    selector: 'sell',
    templateUrl: 'app/com/tiays/pharma/sell/sell.component.html',
    styleUrls: ['app/com/tiays/pharma/sell/sell.component.css'],
    providers: [SellService],
    directives: [SuggestDirective]
})
export class SellComponent {
    private products:Product[] = [];

    constructor(private _sellService:SellService) {
    }

    filterProducts(query:string) {
        this._sellService.filterProducts(query).then((products) => {

        });
    }
}