import {Injectable} from "angular2/core";

@Injectable()
export class ArrayService {
    replaceAll<T> (source:T[], ...elements:T[]) {
        source.splice(0, source.length);
        source.push(...elements);
    }
}