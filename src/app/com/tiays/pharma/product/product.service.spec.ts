import {it, describe, expect} from '@angular/core/testing';
import {ProductService} from './product.service';
import {LevenshteinService} from '../util/levenshtein.service';

describe('Product service Tests', function () {
    let productService = new ProductService(new LevenshteinService());
    it('should return doliprane then paracetamol for a "pran" query', function (done) {
        productService.filterProducts('pran').then((products) => {
            expect(products.map((product) => {
                return product.label;
            })).toEqual(['Doliprane', 'Paracetamol']);
        }).then(done);
    });
});