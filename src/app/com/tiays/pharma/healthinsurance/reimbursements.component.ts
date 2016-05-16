import { Component, Input, forwardRef, Directive } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/common';
import _ = require('lodash');

import {Reimbursement, Category, HealthInsuranceService} from "./health-insurance.service";
import {SuggestDirective, Descriptor, SuggestEvent} from "../suggest/suggest.directive";
import {ArrayService} from "../util/array.service";
import {ArrayValidator} from "./array.validator";

export const EMPTY_REIMBURSEMENT:Reimbursement = {categoryCode: "", category: "", rate: 100};

class CategoryDescriptor implements Descriptor<Category> {
    represent(category:Category):string {
        return category.category;
    }
}

const REIMBURSEMENTS_COMP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ReimbursementsComponent),
    multi: true
};
@Component({
               selector: 'reimbursements',
               templateUrl: 'app/com/tiays/pharma/healthinsurance/reimbursements.component.html',
               styleUrls: ['app/com/tiays/pharma/healthinsurance/reimbursements.component.css'],
               providers: [REIMBURSEMENTS_COMP_VALUE_ACCESSOR],
               directives: [SuggestDirective]
           })
export class ReimbursementsComponent implements ControlValueAccessor{
    @Input()
    private reimbursements:Reimbursement[];
    @Input()
    private edit:boolean = false;

    private _categoryDescriptor = new CategoryDescriptor();
    private reimbursementsInvisible:boolean = true;
    private _categoriesQueries:string[] = [];
    private _categories:Category[][] = [];
    private _onChange:Function = (value) => {
    };
    private onTouched:Function = () => {
    };

    constructor(private _service:HealthInsuranceService, private _arrayService:ArrayService) {
    }

    writeValue(reimbursements):void {
        this.reimbursements = reimbursements ? reimbursements : [];
    }

    registerOnChange(onChange) {
        this._onChange = onChange;
    }

    registerOnTouched(onTouched) {
        this.onTouched = onTouched;
    }

    showReimbursements() {
        this.onTouched();
        this.reimbursementsInvisible = false;
    }

    hideReimbursements() {
        this.onTouched();
        this.reimbursementsInvisible = true;
    }

    remove(reimbursement:Reimbursement) {
        this.onTouched();
        _.remove(this.reimbursements, reimbursement);
        this.onChange();
    }

    addReimbursement() {
        this.onTouched();
        let newReimbursement = _.cloneDeep(EMPTY_REIMBURSEMENT);
        this.reimbursements.push(newReimbursement);
        this._categories.push([]);
        this.onChange();
    }

    selectedCategory(event:SuggestEvent<Category>, idx:number) {
        this.onTouched();
        let category:string = event.element.category;
        this.reimbursements[idx].category = category;
        this.reimbursements[idx].categoryCode = event.element.categoryCode;
        event.target.value = category;
        this.resetCategories(idx);
        this.onChange();
    }

    retrieveCategories(query:string, idx:number) {
        this._service.getCategories(query).then((categories) => {
            this._arrayService.replaceAll(this._categories[idx], ...categories);
        });
    }

    private resetCategories(idx:number) {
        this.onTouched();
        _.remove(this._categories[idx]);
        this.onChange();
    }

    private onChange() {
        this._onChange(this.reimbursements);
    }
}