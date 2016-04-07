///<reference path="../declar/levenshtein/index.d.ts" />

import {Injectable,Inject} from "angular2/core";
import levenshtein = require('levenshtein');

@Injectable()
export class LevenshteinService {
    distance(str1:string, str2:string):number {
        return levenshtein.get(str1, str2);
    }
}