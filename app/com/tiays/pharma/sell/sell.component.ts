///<reference path="../../../../../node_modules/angular2/typings/es6-promise/es6-promise.d.ts" />

import {Component} from 'angular2/core';
import {Observable} from "rxjs/Observable";

import {SuggestDirective, Descriptor} from "../suggest/suggest.directive";
import {ProductService, Product} from "./product.service";
import {ArrayService} from "../util/array.service";

class ProductRepresenter implements Descriptor<Product> {
    represent(product:Product):string {
        return product.code + " - " + product.label;
    }
}

@Component({
    selector: 'sell',
    templateUrl: 'app/com/tiays/pharma/sell/sell.component.html',
    styleUrls: ['app/com/tiays/pharma/sell/sell.component.css'],
    providers: [ProductService],
    directives: [SuggestDirective]
})
export class SellComponent {
    private _products:Product[] = [];
    private _productRepresenter = new ProductRepresenter();
    private _query:string = undefined;
    private _lastPromise:Promise<Product[]> = new Promise<Product[]>((resolve) => {
        resolve();
    });

    constructor(private _productService:ProductService, private _arrayService:ArrayService) {
    }

    filterProducts(query:string) {
        if(query.length < 3) {
            this._lastPromise.then(() => {
                this.resetProducts();
            });
            return;
        }
        this._lastPromise = this._productService.filterProducts(query).then(this.setProducts.bind(this));
    }

    setProducts(products:Product[]) {
        this._arrayService.replaceAll(this._products, ...products);
    }

    private resetProducts() {
        this._arrayService.replaceAll(this._products, ...[]);
    }
}