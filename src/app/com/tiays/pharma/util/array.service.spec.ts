import {it, describe, expect} from '@angular/core/testing';

import {ArrayService} from "./array.service";

describe('Array Service Tests', function () {
    let arrayService = new ArrayService();

    it("should replace array elements", function() {
        let array:String[] = [];
        array.push("one");
        array.push("2");
        let expected:String[] = ["1", "two"];
        arrayService.replaceAll(array, ...expected);
        expect(array).toEqual(expected);
    });
});