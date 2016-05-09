import { Component, Output, EventEmitter, Inject } from '@angular/core';
import _ = require('lodash');

import {ProductService, Product} from "./product.service";
import {SuggestDirective, Descriptor, SuggestEvent} from "../suggest/suggest.directive";
import {ArrayService} from "../util/array.service";

class ProductDescriptor implements Descriptor<Product> {
    represent(product:Product):string {
        return product.code + " - " + product.label;
    }
}

@Component({
    selector: 'product',
    templateUrl: 'app/com/tiays/pharma/product/product.component.html',
    styleUrls: ['app/com/tiays/pharma/product/product.component.css'],
    providers: [ProductService],
    directives: [SuggestDirective]
})
export class ProductComponent {
    @Output() onSelectedProduct:EventEmitter<Product> = new EventEmitter<Product>();

    private _products:Product[] = [];
    private _productDescriptor = new ProductDescriptor();
    private _query:string = undefined;
    private _lastPromise:Promise<Product[]> = new Promise<Product[]>((resolve) => {
        resolve();
    });

    constructor(private _productService:ProductService, private _arrayService:ArrayService) {
    }

    filterProducts(query:string) {
        if(query.length < 3) {
            this._lastPromise.then(this.resetProducts.bind(this));
            return;
        }
        this._lastPromise = this._productService.filterProducts(query).then(this.setProducts.bind(this));
    }

    setProducts(products:Product[]) {
        this._arrayService.replaceAll(this._products, ...products);
    }

    selectProduct(event:SuggestEvent<Product>) {
        event.target.value = null;
        this.onSelectedProduct.emit(event.element);
        this.resetProducts();
    }

    private resetProducts() {
        _.remove(this._products);
    }
}