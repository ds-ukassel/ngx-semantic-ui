import { Component, HostBinding, Output, EventEmitter, HostListener, isDevMode, ChangeDetectionStrategy } from "@angular/core";
// Polyfill for IE
import "element-closest";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { DemoComponentsModule } from "../demo-components.module";

interface IAugmentedElement extends Element {
    closest(selector:string):IAugmentedElement;
}

@Component({
    selector: "demo-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, RouterLinkActive, DemoComponentsModule]
})
export class SidebarComponent {
    @Output()
    public onItemSelected:EventEmitter<void>;

    public get inDevMode():boolean {
        return isDevMode();
    }

    constructor() {
        this.onItemSelected = new EventEmitter<void>();
    }

    @HostListener("click", ["$event"])
    public onClick(event:MouseEvent):void {
        const target = event.target as IAugmentedElement;
        if (/a/i.test(target.closest(".item").tagName)) {
            this.onItemSelected.emit();
        }
    }
}
