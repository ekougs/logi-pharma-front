import {it, describe, expect} from '@angular/core/testing';
import {MomentPipe} from "./moment.pipe";
import moment = require("moment");

describe('moment.pipe Tests', function () {
    let subject = new MomentPipe();
    it('should return formatted date', function () {
        let formattedDate = subject.transform(moment("20111031", "YYYYMMDD"), undefined);
        expect(formattedDate).toEqual("31/10/2011");
    });
});