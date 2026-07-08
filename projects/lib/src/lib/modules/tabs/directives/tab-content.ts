import { Directive, input, signal } from "@angular/core";

@Directive({
    selector: "[suiTabContent]",
    host: {
        "class": "tab",
        "[class.active]": "isActive()"
    }
})
export class SuiTabContent {
    // Unique identifier used to link the content to its related [suiTabHeader].
    public readonly id = input.required<string | number>({ alias: "suiTabContent" });

    // Signal so state changes notify (zoneless) change detection.
    public readonly isActive = signal(false);
}
