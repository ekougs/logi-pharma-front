import { Component, Input, Output, EventEmitter, forwardRef, provide, OnInit } from '@angular/core';
import { ControlGroup, Validators, Control, NgFormControl, AbstractControl, FormBuilder } from '@angular/common';
import _ = require('lodash');
import moment = require("moment");

import {Descriptor, SuggestDirective, SuggestEvent} from "../suggest/suggest.directive";
import {HealthInsuranceCard, HealthInsuranceService, Person, Reimbursement} from "./health-insurance.service";
import {ArrayService} from "../util/array.service";
import {PolicyHoldersComponent, EMPTY_PERSON} from "./policy-holders.component";
import {ReimbursementsComponent, EMPTY_REIMBURSEMENT} from "./reimbursements.component";
import {ArrayValidator} from "./array.validator";

class InsuranceCompanyDescriptor implements Descriptor<String> {
    represent(insuranceCompany:string):string {
        return insuranceCompany;
    }
}

@Component({
               selector: 'card-edit-modal',
               templateUrl: 'app/com/tiays/pharma/healthinsurance/card.edition.component.html',
               styleUrls: ['app/com/tiays/pharma/healthinsurance/card.edition.component.css'],
               providers: [HealthInsuranceService, ArrayValidator],
               directives: [
                   SuggestDirective, PolicyHoldersComponent, ReimbursementsComponent
               ]
           })
export class CardEditionModalComponent implements OnInit {
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
    private _policyHolders:Person[] = [];
    private _reimbursements:Reimbursement[] = [];
    private _cardForm;

    constructor(private _service:HealthInsuranceService, private _arrayService:ArrayService, private fb:FormBuilder,
                private _arrayValidator:ArrayValidator) {
    }

    ngOnInit() {
        this._cardForm = this.fb.group({
                                           company: ['', Validators.required],
                                           policyHolderNumber: ['', Validators.required],
                                           expiryDate: ['', Validators.required],
                                           policyHolders: [[], this._arrayValidator.validateFn(EMPTY_PERSON)],
                                           reimbursements: [[], this._arrayValidator.validateFn(EMPTY_REIMBURSEMENT)]
                                       });
    }

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

    selectedInsuranceCompany(event:SuggestEvent<string>) {
        let insuranceCompany:string = event.element;
        this._card.company = insuranceCompany;
        event.target.value = insuranceCompany;
        this.resetInsuranceCompanies();
    }

    private resetInsuranceCompanies():void {
        _.remove(this._insuranceCompanies);
    }

    createCard() {
        // call service
        this.reset();
    }

    private reset() {
        // this.model = new Hero(42, '', '');
        this._visible = false;
    }

    valid(propertyName) {
        let property = this._cardForm.controls[propertyName];
        return property.pristine || property.valid;
    }
}