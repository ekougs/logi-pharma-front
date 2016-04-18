///<reference path="../../../../../../node_modules/angular2/typings/es6-collections/es6-collections.d.ts" />
/// <reference path="../../../../../../typings/main/definitions/lodash/index.d.ts" />

import {Component, Inject} from 'angular2/core';
import {NgFor} from "angular2/common";
import {Observable} from "rxjs/Observable";
import _ = require('lodash');

import {ProductComponent} from "../product/product.component";
import {Product} from "../product/product.service";
import {CartItem, SellService} from "./sell.service";
import {HealthInsuranceComponent} from "../healthinsurance/health-insurance.component";
import {HealthInsuranceCard, Reimbursement} from "../healthinsurance/health-insurance.service";

@Component({
               selector: 'sell',
               templateUrl: 'app/com/tiays/pharma/sell/sell.component.html',
               styleUrls: ['app/com/tiays/pharma/sell/sell.component.css'],
               providers: [SellService],
               directives: [HealthInsuranceComponent, ProductComponent, NgFor]
           })
export class SellComponent {
    private _cartItems:Map<Product, CartItem> = new Map<Product, CartItem>();
    private _productWithVisibleInfo:Product;
    private _card:HealthInsuranceCard;

    constructor(private _sellService:SellService) {
    }


    addProduct(product:Product) {
        if (this._cartItems.has(product)) {
            this._cartItems.get(product).quantity++;
        } else {
            this._cartItems.set(product, {
                product: product,
                quantity: 1
            });
        }
    }

    cartItems():Iterator<CartItem> {
        return this._cartItems.values();
    }

    subtotal(cartItem:CartItem):number {
        return this._subtotal(cartItem) - this.reimbursement(cartItem);
    }

    _subtotal(cartItem:CartItem):number {
        return cartItem.product.price * cartItem.quantity;
    }

    total():number {
        let total:number = 0;
        this._cartItems.forEach(function (cartItem:CartItem) {
            total += this.subtotal(cartItem);
        }.bind(this));
        return total;
    }

    isCartEmpty():boolean {
        return this._cartItems.size === 0;
    }

    resetCart() {
        this._cartItems.clear();
    }

    submitCart() {
        let cartItems:CartItem[] = [];
        this._cartItems.forEach((cartItem:CartItem) => cartItems.push(cartItem));
        this._sellService.submitCart(cartItems);
        this.resetCart();
    }

    removeItem(cartItem:CartItem) {
        this._cartItems.delete(cartItem.product);
    }

    toggleInfo(cartItem:CartItem) {
        if (this._productWithVisibleInfo === cartItem.product) {
            this._productWithVisibleInfo = undefined;
        } else {
            this._productWithVisibleInfo = cartItem.product;
        }
    }

    info(cartItem:CartItem) {
        return {
            text: cartItem.product.contraindication,
            visible: this._productWithVisibleInfo === cartItem.product
        };
    }

    hasInfo(cartItem:CartItem):boolean {
        return !_.isEmpty(cartItem.product.contraindication);
    }

    setCard(card:HealthInsuranceCard) {
        this._card = card;
    }

    hasCard():boolean {
        return this._card !== undefined;
    }

    reimbursementRate(product:Product):number {
        if (!this.hasCard()) {
            return 0;
        }
        // TODO trouver une implémentation avec any
        let reimbursement:Reimbursement = this._card.reimbursements.filter((reimbursement) => {
            return reimbursement.categoryCode === product.categoryCode;
        })[0];
        return reimbursement ? reimbursement.rate / 100 : 0;
    }

    reimbursement(cartItem:CartItem):number {
        return this._subtotal(cartItem) * this.reimbursementRate(cartItem.product);
    }
}