///<reference path="../../../../../../node_modules/angular2/typings/es6-promise/es6-promise.d.ts" />
///<reference path="../../../../../../node_modules/angular2/typings/es6-collections/es6-collections.d.ts" />

import {Injectable} from "angular2/core";

import {LevenshteinService} from "../util/levenshtein.service";
import {PRODUCTS} from "./mock-products";

@Injectable()
export class ProductService {
    constructor(private _levenshteinService:LevenshteinService) {
    }

    getProducts():Promise<Product[]> {
        return new Promise((resolve) => {
            setTimeout(()=>resolve(PRODUCTS), 500)
        });
    }

    filterProducts(query:string):Promise<Product[]> {
        return this.getProducts()
                   .then(function (products:Product[]) {
                       return this._levenshteinService.matchingItems(query, products,
                                                                     (product) => product.label,
                                                                     (product) => product.code);
                   }.bind(this));
    }
}

export interface Product {
    code: string,
    label: string,
    price: number,
    contraindication?: string,
    stock: number
}