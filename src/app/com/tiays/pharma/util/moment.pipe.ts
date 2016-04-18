import {Pipe, PipeTransform} from "angular2/core";
import Moment = moment.Moment;

@Pipe({
          name: "moment"
      })
export class MomentPipe implements PipeTransform {
    transform(value:Moment, args:any[]):string {
        return value.format("DD/MM/YYYY");
    }

}
