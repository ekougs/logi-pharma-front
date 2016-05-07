import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class FileService {
    constructor(private http:Http) {
    }

    assetExists(path:string):Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            // TODO implement it with ng2/http
            var request = new XMLHttpRequest();
            request.open('GET', path, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status < 200 || request.status >= 300) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            };
            request.onerror = () => {
                resolve(false);
            };
            try {
                request.send();
            } catch (e) {
                console.log('error', e);
            }
        });
    }
}