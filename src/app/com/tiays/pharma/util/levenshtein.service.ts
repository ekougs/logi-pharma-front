import {Injectable, Inject} from "@angular/core";
import levenshtein = require('levenshtein');

@Injectable()
export class LevenshteinService {
    matchingItems<T>(query:string, items:T[], ...propertyExtractors:((T)=>string)[]):T[] {
        let maxDist:number = query.length / 3;
        return items.map((item) => {
                let properties:string[] = propertyExtractors.map((extractor) => {
                    return extractor(item);
                });
                return {
                    item: item,
                    dist: Math.min(this.distance(query, ...properties))
                }
            })
            .filter((itemWithDist) => {
                return itemWithDist.dist <= maxDist;
            }).sort((item1, item2) => {
                return item1.dist - item2.dist;
            }).map((itemWithDist) => {
                return itemWithDist.item;
            });
    }

    distance(query:string, ...strings:string[]):number {
        let distances:number[] = strings.map((str) => {
            let lengthDiff:number = LevenshteinService.lengthDiff(query, str);
            let distance:number = levenshtein.get(query.toLowerCase(), str.toLowerCase());
            return Math.abs(distance - lengthDiff);
        });
        return Math.min(...distances);
    }

    private static lengthDiff(str1:string, str2:string):number {
        return Math.abs(str1.length - str2.length);
    }
}