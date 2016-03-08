///<reference path="../../../../../node_modules/angular2/typings/es6-promise/es6-promise.d.ts" />
///<reference path="../../../../../node_modules/angular2/typings/es6-collections/es6-collections.d.ts" />

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
        return this.getProducts().then(function (products:Product[]) {
            return products.filter((product) => {
                var maxDist = ProductService.maxDist(query);
                return this.correctedDistance(product.code, query) <= maxDist ||
                    this.correctedDistance(product.label, query) <= maxDist;
            });
        }.bind(this));
    }

    correctedDistance(str1:string, str2:string):number {
        var distance = this._levenshteinService.distance(str1.toLowerCase(), str2.toLowerCase()).distance;
        return Math.abs(distance - ProductService.lengthDiff(str1, str2));
    }

    static maxDist(str:string):number {
        return Math.round(str.length / 3);
    }

    static lengthDiff(str1:string, str2:string):number {
        return Math.abs(str1.length - str2.length);
    }
}

export interface Product {
    code: string,
    label: string,
    price: number,
    contraindication?: string,
    stock: number
}