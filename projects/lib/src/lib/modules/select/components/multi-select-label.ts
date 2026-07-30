import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {HandledEvent, SuiComponentFactory} from '../../../misc/util/internal';
import {SuiTransition, Transition, TransitionController, TransitionDirection} from '../../transition/internal';
import {IOptionContext} from '../classes/select-base';

@Component({
  selector: "sui-multi-select-label",
  templateUrl: './multi-select-label.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [],
})
export class SuiMultiSelectLabel<T> extends SuiTransition {
    componentFactory = inject(SuiComponentFactory);

    // Sets the Semantic UI classes on the host element.
    // Doing it on the host enables use in menus etc.
    @HostBinding("class.ui")
    @HostBinding("class.label")
    public readonly hasClasses:boolean;

    private _transitionController:TransitionController;

    @Input()
    public value!:T;

    @Input()
    public query?:string;

    @Output("deselected")
    public onDeselected:EventEmitter<T>;

    @Input()
    public formatter!:(obj:T) => string;

    private _template?:TemplateRef<IOptionContext<T>>;

    @Input()
    public get template():TemplateRef<IOptionContext<T>> | undefined {
        return this._template;
    }

    public set template(template:TemplateRef<IOptionContext<T>> | undefined) {
        this._template = template;
        if (this.template) {
            this.componentFactory.createView(this.templateSibling, this.template, {
                $implicit: this.value,
                query: this.query
            });
        }
    }

    // Placeholder to draw template beside.
    @ViewChild("templateSibling", { read: ViewContainerRef, static: true })
    public templateSibling!:ViewContainerRef;

    constructor() {
        super();

        // Initialise transition functionality.
        this._transitionController = new TransitionController(false, "inline-block");
        this.setTransitionController(this._transitionController);

        this.onDeselected = new EventEmitter<T>();

        this.hasClasses = true;

        this._transitionController.animate(new Transition("scale", 100, TransitionDirection.In));
    }

    public deselectOption(e:HandledEvent):void {
        e.eventHandled = true;

        this._transitionController.animate(
            new Transition("scale", 100, TransitionDirection.Out, () =>
                this.onDeselected.emit(this.value)));
    }

    @HostListener("click", ["$event"])
    public onClick(e:HandledEvent):void {
        e.eventHandled = true;
    }
}
