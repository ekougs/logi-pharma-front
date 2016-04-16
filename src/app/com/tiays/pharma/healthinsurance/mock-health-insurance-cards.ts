/// <reference path="../../../../../../typings/main/ambient/moment/index.d.ts" />

import moment from "moment";

import {HealthInsuranceCard} from "./health.insurance.service";
import {Person} from "./health.insurance.service";

export let CARDS:HealthInsuranceCard[] = [
    {
        policyId: "SN09894AZ431",
        policyHolders: [
            {name: "Sow", firstName: "Demba", birthDate: moment('2012-01-16')},
            {name: "Sow", firstName: "Yaya", birthDate: moment('1982-12-01')}
        ],
        company: "Axa",
        expiryDate: moment().add(1, 'y'),
        reimbursements: [{category: "Soins dentaire", rate: 75}, {category: "Optique", rate: 85}]
    },
    {
        policyId: "0428000221",
        policyHolders: [{name: "Dembélé", firstName: "Aminata", birthDate: moment('1988-10-18')}],
        company: "Sunu Assurances",
        expiryDate: moment().subtract(3, 'd'),
        reimbursements: [{category: "Soins dentaire", rate: 100}, {category: "Optique", rate: 100}]
    },
    {
        policyId: "0009463U87SN",
        policyHolders: [
            {name: "Diedhiou", firstName: "Patrick", birthDate: moment('1975-04-13')},
            {name: "Diedhiou", firstName: "Bineta", birthDate: moment('1982-07-14')},
            {name: "Diedhiou", firstName: "Pierre", birthDate: moment('2004-05-22')}
        ],
        company: "Gras Savoye",
        expiryDate: moment(),
        reimbursements: [{category: "Soins dentaire", rate: 90}, {category: "Optique", rate: 100}]
    }
];