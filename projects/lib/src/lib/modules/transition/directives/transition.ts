import {ChangeDetectorRef, Directive, ElementRef, HostBinding, inject, Input, Renderer2} from '@angular/core';
import {TransitionController} from '../classes/transition-controller';

@Directive({
    selector: "[suiTransition]",
    exportAs: "transition"
})
export class SuiTransition {
    protected _renderer = inject(Renderer2);
    protected _element = inject(ElementRef);
    private _changeDetector = inject(ChangeDetectorRef);

    // Each transition must have a controller associated that dispatches the transitions.
    private _controller!:TransitionController;

    @Input()
    public set suiTransition(tC:TransitionController) {
        // Set the transition controller (e.g. '<div [suiTransition]="transitionController"></div>').
        this.setTransitionController(tC);
    }

    @HostBinding("class.transition")
    public transitionClass = true;

    @HostBinding("class.visible")
    public get isVisible():boolean {
        if (this._controller) {
            return this._controller.isVisible;
        }
        return false;
    }

    @HostBinding("class.hidden")
    public get isHidden():boolean {
        if (this._controller) {
            return this._controller.isHidden;
        }
        return false;
    }

    // Initialises the controller with the injected renderer and elementRef.
    public setTransitionController(transitionController:TransitionController):void {
        this._controller = transitionController;
        this._controller.registerRenderer(this._renderer);
        this._controller.registerElement(this._element.nativeElement);
        this._controller.registerChangeDetector(this._changeDetector);
    }
}
