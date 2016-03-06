///<reference path="../../../../../node_modules/angular2/typings/es6-promise/es6-promise.d.ts" />
///<reference path="../../../../../node_modules/angular2/typings/es6-collections/es6-collections.d.ts" />

import {Injectable} from "angular2/core";

import {PRODUCTS} from "./mock-products";

@Injectable()
export class SellService {
    getProducts():Promise<Product[]> {

        return new Promise((resolve, reject) => {
            setTimeout(()=>resolve(PRODUCTS), 500)
        });
    }

    filterProducts(query:string):Promise<Product[]> {
        return this.getProducts().then(function (products:Product[]) {
            return products;
        });
    }
}

export interface Product {
    code: string,
    label: string,
    price: number,
    contraindication?: string,
    stock: number
}