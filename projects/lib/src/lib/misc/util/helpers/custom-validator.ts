import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from "@angular/forms";
import { forwardRef, Type } from "@angular/core";

export interface ICustomValidatorHost {
    validate(c:AbstractControl):ValidationErrors | null;
}

export class CustomValidator<T extends ICustomValidatorHost> implements Validator {
    constructor(private _host:T) {}

    public onValidatorChange = () => {};

    public validate(c:AbstractControl):ValidationErrors | null {
        return this._host.validate(c);
    }

    public registerOnValidatorChange(fn:() => void):void {
        this.onValidatorChange = fn;
    }
}

export interface IValidationProvider {
    provide:typeof NG_VALIDATORS;
    useExisting:Type<Validator>;
    multi:boolean;
}

export function customValidatorFactory(type:Type<Validator>):IValidationProvider {
    return {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => type),
        multi: true
    };
}
