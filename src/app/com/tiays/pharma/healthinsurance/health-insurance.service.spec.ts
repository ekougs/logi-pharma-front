///<reference path="../../../../../../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../../../typings/main/ambient/moment/index.d.ts" />

import {it, describe, expect} from 'angular2/testing';
import moment from 'moment';
import Moment = moment.Moment;

import {HealthInsuranceService, PolicyHolder} from './health-insurance.service';
import {LevenshteinService} from '../util/levenshtein.service';

describe('Health Insurance Service Tests', function () {
    let healthInsuranceService = new HealthInsuranceService(new LevenshteinService());

    const DIEDHIOU_PIERRE = policyHolder('Diedhiou', 'Pierre', '2004-05-22', '0009463U87SN', 'Gras Savoye');
    const DIEDHIOU_FAMILY = [
        policyHolder('Diedhiou', 'Patrick', '1975-04-13', '0009463U87SN', 'Gras Savoye'),
        policyHolder('Diedhiou', 'Bineta', '1982-07-14', '0009463U87SN', 'Gras Savoye'),
        DIEDHIOU_PIERRE
    ];

    it('should return Diedhou family when query is "Diedhiou"', (done) => {
        healthInsuranceService.getPolicyHolders('Diedhiou')
                              .then((policyHolders) => {
                                  expect(policyHolders).toEqual(DIEDHIOU_FAMILY);
                              })
                              .then(done);
    });

    it('should return Diedhou Pierre first when query is "Diedhiou Pie"', (done) => {
        healthInsuranceService.getPolicyHolders('Diedhiou Pie')
                              .then((policyHolders) => {
                                  expect(policyHolders[0]).toEqual(DIEDHIOU_PIERRE);
                              })
                              .then(done);
    });

    it('should return Diedhiou family when query is "0009463U87SN"', (done) => {
        healthInsuranceService.getPolicyHolders('0009463U87SN')
                              .then((policyHolders) => {
                                  expect(policyHolders).toEqual(DIEDHIOU_FAMILY);
                              })
                              .then(done);
    });

    it('should return Diedhiou family card when asked for Pierre Diedhiou card', (done) => {
        healthInsuranceService.getCard(DIEDHIOU_PIERRE)
                              .then((card) => {
                                  expect(card.policyId).toEqual('0009463U87SN');
                              })
                              .then(done);
    });

    function policyHolder(name:string, firstName:string, birthDate:string, policyId:string, company:string):PolicyHolder {
        return {
            person: {name: name, firstName: firstName, birthDate: moment(birthDate)},
            policyId: policyId,
            company: company
        }

    }
});