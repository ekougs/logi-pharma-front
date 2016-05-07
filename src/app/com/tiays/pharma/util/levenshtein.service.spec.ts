import {it, describe, expect} from "@angular/core/testing";
import {LevenshteinService} from "./levenshtein.service";

describe("Levenshtein Tests", function () {
    let levenshteinService = new LevenshteinService();

    it("should return 1 for corrected distance between para and paro", function () {
        expect(levenshteinService.distance("para", "paro")).toEqual(1);
    });

    it("should return 0 for corrected distance between para and paracetamol", function () {
        expect(levenshteinService.distance("para", "paracetamol")).toEqual(0);
    });

    it("should return 0 for corrected distance between pra and paracetamol", function () {
        expect(levenshteinService.distance("pra", "paracetamol")).toEqual(0);
    });
});