import {Pipe, PipeTransform} from "@angular/core";
import moment = require("moment");
import Moment = moment.Moment;

@Pipe({
          name: "moment"
      })
export class MomentPipe implements PipeTransform {
    transform(value:Moment, args:any[]):string {
        return value.format("DD/MM/YYYY");
    }

}
