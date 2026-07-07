import { Directive, Input, signal } from "@angular/core";

@Directive({
    selector: "[suiTabContent]",
    host: {
        "class": "tab",
        "[class.active]": "isActive()"
    }
})
export class SuiTabContent {
    @Input("suiTabContent")
    public id!:any; // string

    // Signal so state changes notify (zoneless) change detection.
    public isActive = signal(false);
}
