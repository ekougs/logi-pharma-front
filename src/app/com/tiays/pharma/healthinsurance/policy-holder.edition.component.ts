import { Component, Input, Output } from '@angular/core';

@Component({
               selector: 'policy-holder-edit-modal',
               templateUrl: 'app/com/tiays/pharma/healthinsurance/policy-holder.edition.component.html',
               styleUrls: ['app/com/tiays/pharma/healthinsurance/policy-holder.edition.component.css'],
               providers: []
           })
export class PolicyHolderEditionModalComponent {
    @Input("show")
    private _show:boolean = false;

    close() {
        this._show = false;
    }
}