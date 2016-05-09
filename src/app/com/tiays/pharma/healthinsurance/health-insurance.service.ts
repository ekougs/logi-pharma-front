import {Injectable} from "@angular/core";
import _ = require('lodash');
import CryptoJS = require('crypto-js');
import moment = require('moment');
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
    categoryCode: string;
    category: string;
    rate: number;
}

export interface Category {
    categoryCode: string;
    category: string;
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

    getInsuranceCompanies(query:string):Promise<string[]> {
        return new Promise((resolve) => {
            setTimeout(()=> {
                resolve(this.filterCompanies(query, HealthInsuranceService.extractMockCompanies()));
            }, 500)
        });
    }

    getCategories(query:string):Promise<Category[]> {
        return new Promise((resolve) => {
            setTimeout(()=> {
                resolve(this.filterCategories(query, HealthInsuranceService.extractMockCategories()));
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

    private static extractMockCompanies():string[] {
        return _.uniq(CARDS.map((card) => {
            return card.company;
        }));
    }

    private static extractMockCategories():Category[] {
        return _.uniqWith(CARDS.map((card) => {
            return card.reimbursements.map((reimbursement) => {
                return {categoryCode: reimbursement.categoryCode, category: reimbursement.category}
            });
        }).reduce<Category[]>((categories, categoryArray) => {
            categoryArray.push(...categories);
            return categoryArray;
        }, []), _.isEqual);
    }

    private filterHolders(query:string, policyHolders:PolicyHolder[]):PolicyHolder[] {
        return this._levenshteinService.matchingItems<PolicyHolder>(query, policyHolders,
                                                                    (pH) => pH.policyId,
                                                                    (pH) => pH.person.name + " " + pH.person.firstName,
                                                                    (pH) => pH.person.firstName + " " + pH.person.name)
    }

    private filterCompanies(query:string, companies:string[]):string[] {
        return this._levenshteinService.matchingItems<string>(query, companies, (company) => company)
    }

    private filterCategories(query:string, categories:Category[]):Category[] {
        return this._levenshteinService.matchingItems<Category>(query, categories, (category) => category.category)
    }

    private static getPolicyHolder(person:Person, card:HealthInsuranceCard):PolicyHolder {
        return {
            person: person,
            policyId: card.policyId,
            company: card.company
        }
    }

    getCard(policyHolder:PolicyHolder):Promise<HealthInsuranceCard> {
        return new Promise((resolve) => {
            setTimeout(()=> {
                let card:HealthInsuranceCard = _.first(CARDS.filter((card) => {
                    return _.some(card.policyHolders, (person) => {
                        return _.isEqual(policyHolder.person, person);
                    });
                }));
                resolve(card);
            }, 500)
        });
    }

    getImageUrl(companyName:string):string {
        var fileName = CryptoJS.MD5(companyName).toString();
        return "app/com/tiays/pharma/healthinsurance/" + fileName + ".png";
    }

    expired(card:HealthInsuranceCard):boolean {
        return card.expiryDate.diff(moment.now(), 'days') < 0;
    }
}
