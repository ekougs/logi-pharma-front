import {Component, Output, EventEmitter} from "@angular/core";

import {PolicyHolder} from "./health-insurance.service";
import {PolicyHolderAutocompleteComponent} from "./policy-holder.autocomplete.component";
import {HealthInsuranceCardComponent} from "./health-insurance.card.component";
import {HealthInsuranceService} from "./health-insurance.service";
import {HealthInsuranceCard} from "./health-insurance.service";
import {PolicyHolderEditionModalComponent} from "./policy-holder.edition.component";

@Component({
               selector: 'health-insurance',
               templateUrl: 'app/com/tiays/pharma/healthinsurance/health-insurance.component.html',
               styleUrls: ['app/com/tiays/pharma/healthinsurance/health-insurance.component.css'],
               providers: [HealthInsuranceService],
               directives: [PolicyHolderAutocompleteComponent, HealthInsuranceCardComponent, PolicyHolderEditionModalComponent]
           })
export class HealthInsuranceComponent {
    private card:HealthInsuranceCard;
    private policyHolder:PolicyHolder;
    private selected:boolean = false;
    @Output() onSelectedCard:EventEmitter<HealthInsuranceCard> = new EventEmitter<HealthInsuranceCard>();
    private policyHolderModalOpened:boolean = false;

    constructor(private _service:HealthInsuranceService) {
    }

    displayCard(policyHolder:PolicyHolder) {
        this._service.getCard(policyHolder).then((card)=> {
            this.selected = true;
            this.setCard(card);
            this.policyHolder = policyHolder;
        });
    }

    unselect() {
        this.selected = false;
        this.setCard(undefined);
        this.policyHolder = undefined;
    }

    setCard(card:HealthInsuranceCard) {
        this.card = card;

        if (card === undefined || this._service.expired(card)) {
            this.onSelectedCard.emit(undefined);
        } else {
            this.onSelectedCard.emit(card);
        }
    }

    openPolicyHolderAdditionModal() {
        this.policyHolderModalOpened = true;
    }
}