import {Pipe, PipeTransform} from "@angular/core";
import _ = require("lodash");
import moment = require("moment");
import Moment = moment.Moment;

@Pipe({
          name: "moment"
      })
export class MomentPipe implements PipeTransform {
    transform(value:Moment, format:string):string {
        if(_.isEmpty(format)) {
            format = "DD/MM/YYYY";
        }
        return value.format(format);
    }

}
