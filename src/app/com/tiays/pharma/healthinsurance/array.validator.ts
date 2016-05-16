import {Injectable} from "@angular/core";
import {AbstractControl} from "@angular/common";
import _ = require('lodash');

@Injectable()
export class ArrayValidator {
    validateFn(emptyElement) {
        return (control:AbstractControl) => {
            var elements = control.value;
            return _.merge(ArrayValidator.validateNotEmpty(elements), ArrayValidator.validateNoneEmpty(elements, emptyElement));
        }
    }

    private static validateNotEmpty(elements):{} {
        return !_.isEmpty(elements) ? null : {
            notEmpty: {
                valid: false
            }
        };
    }

    private static validateNoneEmpty(elements, emptyElement):{} {
        return _.findIndex(elements, (element) => _.isEqual(element, emptyElement)) === -1 ? null : {
            noneEmpty: {
                valid: false
            }
        };
    }
}