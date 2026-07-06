import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, isDevMode, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

interface IAugmentedElement extends Element {
    closest(selector:string):IAugmentedElement;
}

@Component({
    selector: "demo-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, RouterLinkActive]
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
