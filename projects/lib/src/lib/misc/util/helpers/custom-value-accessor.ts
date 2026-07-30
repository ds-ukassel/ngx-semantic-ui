import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { forwardRef, Type } from "@angular/core";

export interface ICustomValueAccessorHost<T> {
    writeValue(value:T):void;
}

export class CustomValueAccessor<U, T extends ICustomValueAccessorHost<U>> implements ControlValueAccessor {
    constructor(private _host:T) {}

    public onChange:(value?:U) => void = () => {};
    public onTouched:() => void = () => {};

    public writeValue(value:U):void {
        this._host.writeValue(value);
    }

    public registerOnChange(fn:(value?: U) => void):void {
        this.onChange = fn;
    }

    public registerOnTouched(fn:() => void):void {
        this.onTouched = fn;
    }
}

export interface IValueAccessorProvider {
    provide:typeof NG_VALUE_ACCESSOR;
    useExisting:Type<ControlValueAccessor>;
    multi:boolean;
}

export function customValueAccessorFactory(type:Type<ControlValueAccessor>):IValueAccessorProvider {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}
