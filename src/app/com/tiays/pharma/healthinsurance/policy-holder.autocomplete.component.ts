import { Component, EventEmitter, Output } from '@angular/core';
import _ = require('lodash');
import moment = require("moment");

import {PolicyHolder, Person, HealthInsuranceService} from './health-insurance.service';
import {ArrayService} from '../util/array.service';
import {SuggestDirective, Descriptor, SuggestEvent} from '../suggest/suggest.directive';

class PolicyHolderDescriptor implements Descriptor<PolicyHolder> {
    represent(policyHolder:PolicyHolder):string {
        return PolicyHolderDescriptor.formatPerson(policyHolder.person) +
            ' ' + PolicyHolderDescriptor.formatPolicy(policyHolder);
    }

    private static formatPerson(person:Person) {
        return person.firstName + ' ' + person.name + ' (' + person.birthDate.format('DD/MM/YYYY') + ')';
    };

    private static formatPolicy(policyHolder:PolicyHolder):String {
        return policyHolder.company + ' #' + policyHolder.policyId;
    }
}

@Component({
               selector: 'policy-holder-autocomplete',
               templateUrl: 'app/com/tiays/pharma/healthinsurance/policy-holder.autocomplete.component.html',
               providers: [HealthInsuranceService, ArrayService],
               directives: [SuggestDirective]
           })
export class PolicyHolderAutocompleteComponent {
    @Output() onSelectedPolicyHolder:EventEmitter<PolicyHolder> = new EventEmitter<PolicyHolder>();

    private _policyHolders:PolicyHolder[] = [];
    private _policyHolderDescriptor:PolicyHolderDescriptor = new PolicyHolderDescriptor();
    private _policyHoldersQuery:string = '';

    constructor(private _service:HealthInsuranceService, private _arrayService:ArrayService) {
    }

    retrievePolicyHolders(query) {
        this._service.getPolicyHolders(query).then((policyHolders) => {
            this._arrayService.replaceAll(this._policyHolders, ...policyHolders);
        });
    }

    reportSelectedPolicyHolder(event:SuggestEvent<PolicyHolder>) {
        this.onSelectedPolicyHolder.emit(event.element);
        event.target.value = null;
        this.resetPolicyHolders();
    }

    private resetPolicyHolders() {
        _.remove(this._policyHolders);
    }
}