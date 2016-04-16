///<reference path="../../../../../../typings/main/ambient/moment/index.d.ts" />
///<reference path="../../../../../../node_modules/angular2/typings/es6-promise/es6-promise.d.ts" />
///<reference path="../../../../../../node_modules/angular2/typings/es6-collections/es6-collections.d.ts" />

import {Injectable} from "angular2/core";

import Moment = moment.Moment;
import {CARDS} from "./mock-health-insurance-cards";
import {LevenshteinService} from "../util/levenshtein.service";

export interface HealthInsuranceCard {
    policyId: string,
    policyHolders: Person[];
    company: string;
    expiryDate: Moment;
    reimbursements: Reimbursement[];
}

export interface Person {
    name: string;
    firstName: string;
    birthDate: Moment;
}

export interface Reimbursement {
    category: string;
    rate: number;
}

export interface PolicyHolder {
    person: Person;
    policyId: string;
    company: string;
}


@Injectable()
export class HealthInsuranceService {
    constructor(private _levenshteinService:LevenshteinService) {
    }

    getPolicyHolders(query:string):Promise<PolicyHolder[]> {
        return new Promise((resolve) => {
            setTimeout(()=> {
                resolve(this.filterHolders(query, HealthInsuranceService.extractMockHolders()));
            }, 500)
        });
    }

    private static extractMockHolders():PolicyHolder[] {
        return CARDS.map((card) => {
            return card.policyHolders.map((policyHolder) => {
                return HealthInsuranceService.getPolicyHolder(policyHolder, card);
            });
        }).reduce<PolicyHolder[]>((policyHolders, policyHolderArray) => {
            policyHolders.push(...policyHolderArray);
            return policyHolders;
        }, []);
    }

    private filterHolders(query:string, policyHolders:PolicyHolder[]):PolicyHolder[] {
        return this._levenshteinService.matchingItems<PolicyHolder>(query, policyHolders,
                                                                    (pH) => pH.policyId,
                                                                    (pH) => pH.person.name + " " + pH.person.firstName,
                                                                    (pH) => pH.person.firstName + " " + pH.person.name)
    }

    private static getPolicyHolder(person:Person, card:HealthInsuranceCard):PolicyHolder {
        return {
            person: person,
            policyId: card.policyId,
            company: card.company
        }
    }
}
