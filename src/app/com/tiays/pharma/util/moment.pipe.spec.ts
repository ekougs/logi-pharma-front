///<reference path="../../../../../../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../../../typings/main/ambient/moment/index.d.ts" />

import {it, describe, expect} from 'angular2/testing';
import {MomentPipe} from "./moment.pipe";
import moment from "moment";

describe('moment.pipe Tests', function () {
    let subject = new MomentPipe();
    it('should return formatted date', function () {
        let formattedDate = subject.transform(moment("20111031", "YYYYMMDD"), undefined);
        expect(formattedDate).toEqual("31/10/2011");
    });
});