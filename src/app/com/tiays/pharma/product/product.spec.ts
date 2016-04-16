///<reference path="../../../../../../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts" />
// /<reference path="../../../../../../node_modules/angular2/typings/es6-promise/es6-promise.d.ts" />
///<reference path="../../../../../../node_modules/angular2/typings/es6-collections/es6-collections.d.ts" />

import {it, describe, expect} from 'angular2/testing';
import {ProductService} from './product.service';
import {LevenshteinService} from '../util/levenshtein.service';

describe('product Tests', function () {
    let productService = new ProductService(new LevenshteinService());
    it('should return doliprane then paracetamol for a "pran" query', function (done) {
        productService.filterProducts('pran').then((products) => {
            expect(products.map((product) => {
                return product.label;
            })).toEqual(['Doliprane', 'Paracetamol']);
        }).then(done);
    });
});