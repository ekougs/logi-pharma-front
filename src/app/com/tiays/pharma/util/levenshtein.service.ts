import {Injectable,Inject} from "angular2/core";

export class Levenshtein {
    constructor(private _distance:number) {
    }

    get distance():number {
        return this._distance;
    }
}

@Injectable()
export class LevenshteinService {
    constructor(@Inject('levenshtein') private _levenshtein) {
    }

    distance(str1:string, str2:string):Levenshtein {
        return new Levenshtein(this._levenshtein.get(str1, str2));
    }
}