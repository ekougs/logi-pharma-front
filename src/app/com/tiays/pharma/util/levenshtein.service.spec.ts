///<reference path="../../../../../../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts" />
///<reference path="../../../../../../typings/main/ambient/require/index.d.ts" />

import {it, describe, expect} from "angular2/testing";
import {LevenshteinService} from "./levenshtein.service";

describe("Levenshtein Tests", function () {
    var levenshteinService = new LevenshteinService();

    it("should return 1 for distance between para and paro", function () {
        expect(levenshteinService.distance("para", "paro")).toEqual(1);
    });
});