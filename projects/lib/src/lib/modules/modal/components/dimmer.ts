import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Renderer2,
} from '@angular/core';
import {SuiDimmer} from '../../dimmer/internal';

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
})
export class SuiModalDimmer extends SuiDimmer {

    @HostBinding("class.page")
    @HostBinding("class.modals")
    public override readonly hasClasses:boolean;

    constructor() {
        const renderer = inject(Renderer2);
        const element = inject(ElementRef);
        const changeDetector = inject(ChangeDetectorRef);

        super(renderer, element, changeDetector);
        this.hasClasses = true;
        this.isClickable = false;
    }
}
