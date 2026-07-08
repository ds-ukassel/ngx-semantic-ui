import { Directive, HostListener, ElementRef, input, model, output, effect, inject } from "@angular/core";

@Directive({
    selector: "[suiTabHeader]",
    host: {
        "class": "item",
        "[class.active]": "isActive()",
        "[class.disabled]": "isDisabled()"
    }
})
export class SuiTabHeader {
    public readonly eleRef = inject(ElementRef);

    // Links the header to its related [suiTabContent].
    public readonly id = input.required<string | number>({ alias: "suiTabHeader" });

    // Two-way bound active state; `model` provides `[(isActive)]` + `isActiveChange`.
    public readonly isActive = model(false);

    public readonly isDisabled = input(false);

    public readonly activate = output<void>();
    public readonly deactivate = output<void>();

    constructor() {
        // A disabled header can never be active; registered first so it wins before events fire.
        effect(() => {
            if (this.isDisabled() && this.isActive()) {
                this.isActive.set(false);
            }
        });

        // Emit on every transition, whatever the source (parent writes don't notify model.subscribe).
        let wasActive = false;
        effect(() => {
            const active = this.isActive();
            if (active === wasActive) {
                return;
            }
            wasActive = active;
            (active ? this.activate : this.deactivate).emit();
        });
    }

    @HostListener("click")
    public onClick():void {
        if (!this.isDisabled()) {
            this.isActive.set(true);
        }
    }
}
