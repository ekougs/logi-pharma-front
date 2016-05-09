import { Component, Input } from '@angular/core';
import _ = require('lodash');
import moment = require('moment');

import {PolicyHolder, Person} from "./health-insurance.service";
import {MomentPipe} from "../util/moment.pipe";

const EMPTY_PERSON:Person = {name: "", firstName: "", birthDate: moment()};

@Component({
               selector: 'policy-holders',
               templateUrl: 'app/com/tiays/pharma/healthinsurance/policy-holders.component.html',
               styleUrls: ['app/com/tiays/pharma/healthinsurance/policy-holders.component.css'],
               pipes: [MomentPipe]
           })
export class PolicyHoldersComponent {
    @Input()
    private policyHolders:Person[];
    @Input()
    private selectedPolicyHolder:Person;
    @Input()
    private edit:boolean = false;

    private _policyHoldersInvisible:boolean = true;
    private _editSelectedIdx:number = -1;

    showPolicyHolders() {
        this._policyHoldersInvisible = false;
    }

    hidePolicyHolders() {
        this._policyHoldersInvisible = true;
    }

    policyHolderInvisible(policyHolder:PolicyHolder):boolean {
        return this._policyHoldersInvisible && !_.isEqual(this.selectedPolicyHolder, policyHolder);
    }

    hasSeveralPolicyHolders():boolean {
        return !_.isEmpty(this.policyHolders) && this.policyHolders.length > 1;
    }

    addPolicyHolder() {
        this.policyHolders.push(EMPTY_PERSON);
    }

    toggleSelect(policyHolderIdx:number) {
        if (this._editSelectedIdx === policyHolderIdx) {
            this._editSelectedIdx = -1;
        } else {
            this._editSelectedIdx = policyHolderIdx;
        }
    }

    hasSelectedPolicyHolderForEdition() {
        return this._editSelectedIdx !== -1;
    }

    removeSelectedPolicyHolder() {
        if (this.hasSelectedPolicyHolderForEdition()) {
            this.policyHolders.splice(this._editSelectedIdx, 1);
            this._editSelectedIdx = -1;
        }
    }

    setBirthDate(policyHolder:Person, birthDateChangeEvent) {
        policyHolder.birthDate = moment(birthDateChangeEvent.target.value, "DD/MM/YYYY");
    }

    selected(idx:number):boolean {
        return this._editSelectedIdx === idx;
    }
}