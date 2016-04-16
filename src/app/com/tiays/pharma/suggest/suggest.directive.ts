// TODO IMPORTANT replace with material2 implementation when available https://github.com/angular/material2
import { Component, Input, OnInit, ElementRef, Directive, ViewContainerRef, Injector, provide, Provider,
    ResolvedProvider, Compiler, Type, Inject, AfterViewChecked, Output, EventEmitter } from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {ListWrapper} from "angular2/src/facade/collection";
import { Observable } from "rxjs/Rx";

const DESCRIPTOR_TOKEN:string = 'suggestComponentElementDescriptor';
const VIEW_STATE_TOKEN:string = 'suggestComponentViewState';
const ON_SELECT_TOKEN:string = 'suggestComponentOnSelect';

@Component({
    selector: 'suggest-view',
    templateUrl: 'app/com/tiays/pharma/suggest/suggest.component.html',
    styleUrls: ['app/com/tiays/pharma/suggest/suggest.component.css'],
    directives: [CORE_DIRECTIVES]
})
class SuggestComponent<T> {
    constructor(@Inject(DESCRIPTOR_TOKEN) private _descriptor:Descriptor<T>,
                @Inject(VIEW_STATE_TOKEN) private _viewState,
                @Inject(ON_SELECT_TOKEN) private _onSelect) {
    }

    represent(element:T) {
        return this._descriptor.represent(element);
    }

    select(element:T) {
        this._onSelect(element);
    }

    highlighted(element:T):boolean {
        return this._viewState.highlighted === element;
    }

    hasElements():boolean {
        return this._viewState.elements.length !== 0;
    }

    emptyMessage():string {
        return "No suggestion available";
    }
}

export interface Descriptor<T> {
    represent(element:T): string;
}

@Directive({
    selector: '[suggest]'
})
export class SuggestDirective<T> implements OnInit {

    private actions = {
        // UP
        38: this.highlightPrevious.bind(this),
        // DOWN
        40: this.highlightNext.bind(this),
        // ENTER
        13: this.selectHighlighted.bind(this),
        // ESCAPE
        27: this.reset.bind(this)
    };

    @Input('observe') elements:any[];
    @Input('descriptor') descriptor:Descriptor<T>;
    @Output() onSelectedElement:EventEmitter<T> = new EventEmitter<T>();
    private _viewState = {visible: false, width: 0, highlighted: undefined, elements: []};
    private _highlighted_idx:number = -1;

    constructor(private _callingElement:ElementRef, private _viewContainer:ViewContainerRef,
                private _compiler:Compiler) {
        let nativeCallingElement = _callingElement.nativeElement;
        nativeCallingElement.addEventListener('mousedown', this.show.bind(this));
        nativeCallingElement.addEventListener('focus', this.show.bind(this));
        nativeCallingElement.addEventListener('blur', this.hide.bind(this));
        nativeCallingElement.addEventListener('keydown', this.navigate.bind(this));
    }

    ngOnInit() {
        this.render();
    }

    show() {
        this._viewState.visible = true;
    }

    hide() {
        this._viewState.visible = false;
    }

    navigate(event) {
        let trigger = this.actions[event.keyCode];
        if (trigger) {
            trigger();
        }
    }

    highlightPrevious() {
        this.highlight(0, this.elements.length - 1, function () {
            this._highlighted_idx -= 1;
        }.bind(this));
    }

    highlightNext() {
        this.highlight(this.elements.length - 1, 0, function () {
            this._highlighted_idx += 1;
        }.bind(this));
    }

    highlight(idxBeforeRestart:number, idxAfterRestart:number, operation:() => any) {
        if (!this._viewState.visible) {
            this.show();
            return;
        }
        this._highlighted_idx = this.elements.indexOf(this._viewState.highlighted);
        if (this.noHighlightedElement()) {
            this._highlighted_idx = 0;
        } else {
            this._viewState.highlighted[this._highlighted_idx] = false;
            if (this._highlighted_idx == idxBeforeRestart) {
                this._highlighted_idx = idxAfterRestart;
            } else {
                operation()
            }
        }
        this._viewState.highlighted = this.elements[this._highlighted_idx];
    }

    selectHighlighted() {
        if (this.noHighlightedElement()) {
            return;
        }
        this.onSelect(this.elements[this._highlighted_idx]);
        this.hide();
    }

    private noHighlightedElement():boolean {
        return this._viewState.highlighted === undefined;
    }

    onSelect(element:T) {
        this.onSelectedElement.emit(element);
    }

    reset() {
        this.hide();
        this.resetHighlighted();
    }

    resetHighlighted() {
        this._viewState.highlighted = undefined;
        this._highlighted_idx = -1;
    }

    private render() {
        this._viewState.width = this._callingElement.nativeElement.offsetWidth;
        this._viewState.elements = this.elements;

        this._compiler.compileInHost(<Type>SuggestComponent).then(function (suggestHostViewFactoryRef) {
            let componentContext:ResolvedProvider[] = this.getComponentContext();
            this._viewContainer.createHostView(suggestHostViewFactoryRef, undefined, componentContext);
        }.bind(this));
    }

    private getComponentContext() {
        return Injector.resolve([new Provider(DESCRIPTOR_TOKEN, {useValue: this.descriptor}),
            new Provider(ON_SELECT_TOKEN, {useValue: this.onSelect.bind(this)}),
            new Provider(VIEW_STATE_TOKEN, {useValue: this._viewState})]);
    };
}