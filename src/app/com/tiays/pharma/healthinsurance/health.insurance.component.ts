import {Component} from "angular2/core";

import {PolicyHolderAutocompleteComponent} from "./policy-holder.autocomplete.component";
import {PolicyHolder} from "./health.insurance.service";

@Component({
               selector: 'health-insurance',
               templateUrl: 'app/com/tiays/pharma/healthinsurance/health.insurance.component.html',
               styleUrls: ['app/com/tiays/pharma/healthinsurance/health.insurance.component.css'],
               directives: [PolicyHolderAutocompleteComponent]
           })
export class HealthInsuranceComponent {
    displayCard(policyHolder:PolicyHolder) {
        console.log(policyHolder);
    }
}