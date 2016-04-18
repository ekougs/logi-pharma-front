/// <reference path="../../../../../../typings/main/ambient/moment/index.d.ts" />

import moment from "moment";

import {HealthInsuranceCard, Person} from "./health-insurance.service";

export let CARDS:HealthInsuranceCard[] = [
    {
        policyId: "SN09894AZ431",
        policyHolders: [
            {name: "Sow", firstName: "Demba", birthDate: moment('2012-01-16')},
            {name: "Sow", firstName: "Yaya", birthDate: moment('1982-12-01')}
        ],
        company: "Axa",
        expiryDate: moment().add(1, 'y'),
        reimbursements: [
            {categoryCode: "teeth", category: "Soins dentaire", rate: 75},
            {categoryCode: "optical", category: "Optique", rate: 85},
            {categoryCode: "medicine", category: "Médicaments", rate: 95}
        ]
    },
    {
        policyId: "0428000221",
        policyHolders: [{name: "Dembélé", firstName: "Aminata", birthDate: moment('1988-10-18')}],
        company: "Sunu Assurances",
        expiryDate: moment().subtract(3, 'd'),
        reimbursements: [
            {categoryCode: "teeth", category: "Soins dentaire", rate: 100},
            {categoryCode: "optical", category: "Optique", rate: 100},
            {categoryCode: "medicine", category: "Médicaments", rate: 100}
        ]
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
        reimbursements: [
            {categoryCode: "teeth", category: "Soins dentaire", rate: 90},
            {categoryCode: "optical", category: "Optique", rate: 100},
            {categoryCode: "medicine", category: "Médicaments", rate: 75}
        ]
    }
];