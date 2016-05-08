import { Component, Input, Output, EventEmitter } from '@angular/core';
import _ = require('lodash');
import moment = require("moment");

import {Descriptor} from "../suggest/suggest.directive";
import {HealthInsuranceCard, HealthInsuranceService} from "./health-insurance.service";
import {ArrayService} from "../util/array.service";

class InsuranceCompanyDescriptor implements Descriptor<String> {
    represent(insuranceCompany:string):string {
        return insuranceCompany;
    }
}

@Component({
               selector: 'card-edit-modal',
               templateUrl: 'app/com/tiays/pharma/healthinsurance/policy-holder.edition.component.html',
               styleUrls: ['app/com/tiays/pharma/healthinsurance/policy-holder.edition.component.css'],
               providers: [HealthInsuranceService]
           })
export class CardEditionModalComponent {
    private _card:HealthInsuranceCard = {
        policyId: undefined,
        policyHolders: undefined,
        company: undefined,
        expiryDate: undefined,
        reimbursements: undefined
    };
    private _visible:boolean = false;
    private _insuranceCompanies:string[] = [];
    private _insuranceCompanyDescriptor:InsuranceCompanyDescriptor = new InsuranceCompanyDescriptor();

    constructor(private _service:HealthInsuranceService, private _arrayService:ArrayService){}

    public show() {
        this._visible = true;
    }

    close() {
        this._visible = false;
    }

    retrieveInsuranceCompanies(query) {
        this._service.getInsuranceCompanies(query).then((companies) => {
            this._arrayService.replaceAll(this._insuranceCompanies, ...companies);
        });
    }

    selectedInsuranceCompany(insuranceCompany:string, queryInput:HTMLInputElement) {
        this._card.company = insuranceCompany;
        queryInput.value = null;
        this.resetInsuranceCompanies();
    }

    private resetInsuranceCompanies():void {
        _.remove(this._insuranceCompanies);
    }
}