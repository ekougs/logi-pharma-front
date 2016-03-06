import {Component} from "angular2/core";
import {bootstrap}    from 'angular2/platform/browser';

import {SuggestDirective, Representer} from "./suggest.directive";
import {Observable} from "rxjs/Observable";

interface Person {
    title: string;
    name: string;
    firstName: string;
}

let CELEBRITIES:Person[] = [
    {title: "Dr", firstName: "Martin Luther", name: "King"},
    {title: "Mr", name: "X", firstName: "Malcolm"},
    {title: "Mr", name: "Clay", firstName: "Cassius"},
    {title: "Mrs", name: "Parks", firstName: "Rosa"},
    {title: "Mr", name: "Lee", firstName: "Spike"}
];

class PersonRepresenter implements Representer<Person> {
    represent(person:Person):string {
        return person.title + " " + person.firstName + " " + person.name;
    }
}

@Component(
    {
        selector: 'suggest-test',
        template: `
        <div id="outside">Other element</div><input id="test" suggest [observe]="persons" [ngModel]="personRepr"
             [representer]="personRepresenter()" (onSelectedElement)="onSelectedElement($event)"
             (ngModelChange)="filterPersons($event)">
        `,
        directives: [SuggestDirective]
    }
)
export class SuggestTestComponent {
    // Slice provides fastest array copy
    private persons:Person[] = CELEBRITIES.slice();
    private personRepr:string = "";

    personRepresenter():Representer<Person> {
        return new PersonRepresenter();
    }

    onSelectedElement(person:Person) {
        this.personRepr = this.personRepresenter().represent(person);
        this.replacePersons(person);
    }

    filterPersons(filter:string) {
        var personRepresenter = new PersonRepresenter();
        this.replacePersons(...CELEBRITIES.filter(function personFilter(person:Person) {
            return personRepresenter.represent(person).indexOf(filter) !== -1 ||
                person.name.toLowerCase().indexOf(filter.toLowerCase()) != -1 ||
                person.firstName.toLowerCase().indexOf(filter.toLowerCase()) != -1;
        }));
    }

    replacePersons(...persons:Person[]) {
        this.persons.splice(0, this.persons.length);
        this.persons.push(...persons);
    }
}

bootstrap(SuggestTestComponent);