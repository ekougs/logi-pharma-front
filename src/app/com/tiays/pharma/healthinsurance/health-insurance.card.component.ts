import { Component, OnInit, Input } from 'angular2/core';
import _ = require('lodash');
import moment = require('moment');
import Moment = moment.Moment;

import {MomentPipe} from "../util/moment.pipe";
import {FileService} from "../util/file.service";
import {HealthInsuranceCard, PolicyHolder, Person} from "./health-insurance.service";
import {HealthInsuranceService} from "./health-insurance.service";

@Component({
               selector: 'health-insurance-card',
               templateUrl: 'app/com/tiays/pharma/healthinsurance/health-insurance.card.component.html',
               styleUrls: ['app/com/tiays/pharma/healthinsurance/health-insurance.card.component.css'],
               providers: [FileService],
               pipes: [MomentPipe]
           })
export class HealthInsuranceCardComponent implements OnInit {
    @Input() private card:HealthInsuranceCard;
    @Input() private policyHolder:PolicyHolder;
    private personsInvisible:boolean = true;
    private reimbursementsInvisible:boolean = true;
    private companyPictureExists:boolean = false;

    constructor(private _service:HealthInsuranceService, private _fileService:FileService) {
    }

    ngOnInit() {
        this._fileService.assetExists(this.getImageURL(this.card.company)).then((exists) => {
            this.companyPictureExists = exists;
        }).catch(() => {
            this.companyPictureExists = false;
        });
    }

    hasCard():boolean {
        return !_.isEmpty(this.card) && !_.isEmpty(this.policyHolder);
    }

    personInvisible(person:Person):boolean {
        return this.policyHolder.person != person && this.personsInvisible;
    }

    showPersons() {
        this.personsInvisible = false;
    }

    hidePersons() {
        this.personsInvisible = true;
    }

    showReimbursements() {
        this.reimbursementsInvisible = false;
    }

    hideReimbursements() {
        this.reimbursementsInvisible = true;
    }

    getImageURL(company:string):string {
        return this._service.getImageUrl(company);
    }

    expiredClass():string {
        if (this._service.expired(this.card)) {
            return "expired";
        }
        return "";
    }
}