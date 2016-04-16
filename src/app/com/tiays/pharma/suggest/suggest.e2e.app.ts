import {Component} from "angular2/core";
import {bootstrap}    from 'angular2/platform/browser';

import {SuggestDirective, Descriptor} from "./suggest.directive";
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

class PersonDescriptor implements Descriptor<Person> {
    represent(person:Person):string {
        return person.title + " " + person.firstName + " " + person.name;
    }
}

@Component(
    {
        selector: 'suggest-test',
        template: `
        <div id="outside">Other element</div><input id="test" suggest [observe]="persons" [ngModel]="personDescription"
             [descriptor]="_personDescriptor" (onSelectedElement)="onSelectedElement($event)"
             (ngModelChange)="filterPersons($event)">
        `,
        directives: [SuggestDirective]
    }
)
export class SuggestTestComponent {
    // Slice provides fastest array copy
    private persons:Person[] = CELEBRITIES.slice();
    private personDescription:string = "";
    private _personDescriptor = new PersonDescriptor();

    onSelectedElement(person:Person) {
        this.personDescription = this._personDescriptor.represent(person);
        this.replacePersons(person);
    }

    filterPersons(filter:string) {
        let personDescriptor = this._personDescriptor;
        this.replacePersons(...CELEBRITIES.filter(function personFilter(person:Person) {
            return personDescriptor.represent(person).indexOf(filter) !== -1 ||
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