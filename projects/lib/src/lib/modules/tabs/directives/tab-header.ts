import { Input, Directive, EventEmitter, HostListener, Output, ElementRef, signal } from "@angular/core";

@Directive({
    selector: "[suiTabHeader]",
    host: {
        "class": "item",
        "[class.active]": "isActive",
        "[class.disabled]": "isDisabled"
    }
})
export class SuiTabHeader {
    @Input("suiTabHeader")
    public id!:any; // string

    // Internally keeps track of whether the header is active.
    // Signals so state changes notify (zoneless) change detection, even from within `setTimeout`.
    private _isActive = signal(false);
    private _isDisabled = signal(false);

    // Enables use of [(isActive)] so state can be set using booleans.
    @Output()
    public isActiveChange:EventEmitter<boolean>;

    // Fires only when `isActive` changes due to user input.
    public isActiveExternalChange:EventEmitter<boolean>;

    // Fires whenever a tab is activated having previously been deactivated.
    @Output("activate")
    public onActivate:EventEmitter<void>;

    // Fires whenever a tab is deactivated having previously been activated.
    @Output("deactivate")
    public onDeactivate:EventEmitter<void>;

    public get isActive():boolean {
        return this._isActive();
    }

    @Input()
    public set isActive(active:boolean) {
        // Only used by @Input(), runs whenever user input changes `isActive`.
        // Run in timeout because `isDisabled` can prohibit user from changing `isActive`,
        // so update is delayed to avoid 'changed after checked' error.
        setTimeout(() => {
            // Only allow change if tab header is not disabled.
            const isActive = !this.isDisabled ? active : false;
            this.setActiveState(isActive);

            // Fire 'external change' event as user input has occured.
            this.isActiveExternalChange.emit(isActive);
        });
    }

    public get isDisabled():boolean {
        return this._isDisabled();
    }

    @Input()
    public set isDisabled(disabled:boolean) {
        // Only update if value provided is different to current one.
        if (this._isDisabled() !== disabled) {
            this._isDisabled.set(disabled);

            // If now disabled, then tab header must be deactivated.
            if (disabled) {
                this.isActive = false;
            }
        }
    }

    constructor(public eleRef: ElementRef) {
        this.isActiveChange = new EventEmitter<boolean>();
        this.isActiveExternalChange = new EventEmitter<boolean>();

        this.onActivate = new EventEmitter<void>();
        this.onDeactivate = new EventEmitter<void>();
    }

    // Internally update active state.
    public setActiveState(active:boolean):void {
        // If (cast) active value has changed:
        if (!!this._isActive() !== active) {
            // Update to the new value.
            this._isActive.set(active);

            // Fire the appropriate activation event.
            if (active) {
                this.onActivate.emit();
            } else {
                this.onDeactivate.emit();
            }
        }

        // Regardless, emit a change to `isActive`, so [(isActive)] works correctly.
        this.isActiveChange.emit(active);
    }

    @HostListener("click")
    public onClick():void {
        if (!this.isDisabled) {
            // Activate the tab when clicked, so long as it isn't disabled.
            this.isActive = true;
        }
    }
}
