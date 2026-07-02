import { Component, HostBinding, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { SuiDimmer } from "../../dimmer/internal";
import { SuiModal } from "./modal";

@Component({
    selector: "sui-modal-dimmer",
    template: `<ng-content></ng-content>`,
    styles: [`
        :host.ui.dimmer:not(.hidden) {
            transition: none;
            overflow-y: auto;
            display: flex !important; 
        }
    `],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SuiModal]
})
export class SuiModalDimmer extends SuiDimmer {

    @HostBinding("class.page")
    @HostBinding("class.modals")
    public override readonly hasClasses:boolean;

    constructor(renderer:Renderer2, element:ElementRef, changeDetector:ChangeDetectorRef) {
        super(renderer, element, changeDetector);
        this.hasClasses = true;
        this.isClickable = false;
    }
}
