import { Component, Input, Directive, Host, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/common';
import _ = require('lodash');
import moment = require('moment');

import {PolicyHolder, Person} from "./health-insurance.service";
import {MomentPipe} from "../util/moment.pipe";

export const EMPTY_PERSON:Person = {name: "", firstName: "", birthDate: moment()};

const POLICY_HOLDERS_COMP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PolicyHoldersComponent),
    multi: true
};
@Component({
               selector: 'policyHolders',
               templateUrl: 'app/com/tiays/pharma/healthinsurance/policy-holders.component.html',
               styleUrls: ['app/com/tiays/pharma/healthinsurance/policy-holders.component.css'],
               pipes: [MomentPipe],
               providers: [POLICY_HOLDERS_COMP_VALUE_ACCESSOR]
           })
export class PolicyHoldersComponent implements ControlValueAccessor {
    @Input()
    private policyHolders:Person[];
    @Input()
    private selectedPolicyHolder:Person;
    @Input()
    private edit:boolean = false;

    private _policyHoldersInvisible:boolean = true;
    private _editSelectedIdx:number = -1;
    private _onChange:Function = (value) => {
    };
    private onTouched:Function = () => {
    };

    writeValue(policyHolders):void {
        this.policyHolders = policyHolders ? policyHolders : [];
    }

    registerOnChange(onChange):void {
        this._onChange = onChange;
    }

    registerOnTouched(onTouched):void {
        this.onTouched = onTouched;
    }

    showPolicyHolders() {
        this.onTouched();
        this._policyHoldersInvisible = false;
    }

    hidePolicyHolders() {
        this.onTouched();
        this._policyHoldersInvisible = true;
    }

    policyHolderInvisible(policyHolder:PolicyHolder):boolean {
        return this._policyHoldersInvisible && !_.isEqual(this.selectedPolicyHolder, policyHolder);
    }

    hasSeveralPolicyHolders():boolean {
        return !_.isEmpty(this.policyHolders) && this.policyHolders.length > 1;
    }

    addPolicyHolder() {
        this.onTouched();
        this.policyHolders.push(EMPTY_PERSON);
        this.onChange();
    }

    remove(policyHolder:Person) {
        this.onTouched();
        _.remove(this.policyHolders, policyHolder);
        this.onChange();
    }

    setBirthDate(policyHolder:Person, birthDateChangeEvent) {
        policyHolder.birthDate = moment(birthDateChangeEvent.target.value, "DD/MM/YYYY");
    }

    selected(idx:number):boolean {
        return this._editSelectedIdx === idx;
    }

    private onChange() {
        this._onChange(this.policyHolders);
    }
}