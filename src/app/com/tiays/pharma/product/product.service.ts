import {Injectable} from "@angular/core";

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
    categoryCode: string,
    code: string,
    label: string,
    price: number,
    contraindication?: string,
    stock: number
}