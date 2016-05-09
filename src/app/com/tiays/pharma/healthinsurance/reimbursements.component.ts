import { Component, Input } from '@angular/core';
import _ = require('lodash');

import {Reimbursement, Category, HealthInsuranceService} from "./health-insurance.service";
import {SuggestDirective, Descriptor, SuggestEvent} from "../suggest/suggest.directive";
import {ArrayService} from "../util/array.service";

const EMPTY_REIMBURSEMENT:Reimbursement = {categoryCode: "", category: "", rate: 100};

class CategoryDescriptor implements Descriptor<Category> {
    represent(category:Category):string {
        return category.category;
    }
}

@Component({
               selector: 'reimbursements',
               templateUrl: 'app/com/tiays/pharma/healthinsurance/reimbursements.component.html',
               styleUrls: ['app/com/tiays/pharma/healthinsurance/reimbursements.component.css'],
               directives: [SuggestDirective]
           })
export class ReimbursementsComponent {
    @Input()
    private reimbursements:Reimbursement[];
    @Input()
    private edit:boolean = false;

    private _categoryDescriptor = new CategoryDescriptor();
    private reimbursementsInvisible:boolean = true;
    private _editSelectedIdx:number = -1;
    private _categoriesQueries:string[] = [];
    private _categories:Category[][] = [];

    constructor(private _service:HealthInsuranceService, private _arrayService:ArrayService) {
    }

    showReimbursements() {
        this.reimbursementsInvisible = false;
    }

    hideReimbursements() {
        this.reimbursementsInvisible = true;
    }

    selected(index:number):boolean {
        return this._editSelectedIdx === index;
    }

    toggleSelect(index:number) {
        if (this._editSelectedIdx === index) {
            this._editSelectedIdx = -1;
        } else {
            this._editSelectedIdx = index;
        }
    }

    hasSelectedReimbursementForEdition() {
        return this._editSelectedIdx !== -1;
    }

    removeSelectedReimbursement() {
        if (this.hasSelectedReimbursementForEdition()) {
            this.reimbursements.splice(this._editSelectedIdx, 1);
            this._categories.splice(this._editSelectedIdx, 1);
            this._editSelectedIdx = -1;
        }
    }

    addReimbursement() {
        this.reimbursements.push(EMPTY_REIMBURSEMENT);
        this._categories.push([]);
    }

    selectedCategory(event:SuggestEvent<Category>, idx:number) {
        let category:string = event.element.category;
        this.reimbursements[idx].category = category;
        this.reimbursements[idx].categoryCode = event.element.categoryCode;
        event.target.value = category;
        this.resetCategories(idx);
    }

    retrieveCategories(query:string, idx:number) {
        this._service.getCategories(query).then((categories) => {
            this._arrayService.replaceAll(this._categories[idx], ...categories);
        });
    }

    private resetCategories(idx:number) {
        _.remove(this._categories[idx]);
    }
}