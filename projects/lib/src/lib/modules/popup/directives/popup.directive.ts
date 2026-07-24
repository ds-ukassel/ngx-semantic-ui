import {Directive, ElementRef, inject, Input, Renderer2, TemplateRef} from '@angular/core';
import {
  BooleanInput,
  coerceBooleanProperty,
  PositioningPlacement,
  SuiComponentFactory,
  Util,
} from '../../../misc/util/internal';
import {PopupConfig, PopupSize, PopupTrigger, PopupWidth} from '../classes/popup-config';
import {
  ITemplatePopupConfig,
  ITemplatePopupContext,
  SuiPopupTemplateController,
} from '../classes/popup-template-controller';
import {SuiPopupConfig} from '../services/popup.service';

const templateRef = TemplateRef;

@Directive({
    selector: "[suiPopup]",
    exportAs: "suiPopup"
})
export class SuiPopupDirective<T> extends SuiPopupTemplateController<T> {
    @Input()
    public set popupHeader(header:string) {
        this.popup.config.header = header;
    }

    @Input()
    public set popupText(text:string) {
        this.popup.config.text = text;
    }

    @Input()
    public set popupInverted(inverted:BooleanInput) {
        this.popup.config.isInverted = Util.DOM.parseBooleanAttribute(coerceBooleanProperty(inverted));
    }

    @Input()
    public set popupBasic(basic:BooleanInput) {
        this.popup.config.isBasic = Util.DOM.parseBooleanAttribute(coerceBooleanProperty(basic));
    }

    @Input()
    public set popupInline(inline:BooleanInput) {
        this.popup.config.isInline = Util.DOM.parseBooleanAttribute(coerceBooleanProperty(inline));
    }

    @Input()
    public set popupFlowing(flowing:BooleanInput) {
        this.popup.config.isFlowing = Util.DOM.parseBooleanAttribute(coerceBooleanProperty(flowing));
    }

    @Input()
    public set popupTransition(transition:string) {
        this.popup.config.transition = transition;
    }

    @Input()
    public set popupTransitionDuration(duration:number) {
        this.popup.config.transitionDuration = duration;
    }

    @Input()
    public set popupPlacement(placement:PositioningPlacement) {
        this.popup.config.placement = placement;
    }

    @Input()
    public set popupWidth(width:PopupWidth) {
        this.popup.config.width = width;
    }

    @Input()
    public set popupSize(size:PopupSize) {
        this.popup.config.size = size;
    }

    @Input()
    public set popupDelay(delay:number) {
        this.popup.config.delay = delay;
    }

    @Input()
    public get popupTrigger():PopupTrigger {
        return this.popup.config.trigger;
    }

    public set popupTrigger(trigger:PopupTrigger) {
        this.popup.config.trigger = trigger;
    }

    @Input()
    public set popupTemplate(template:TemplateRef<ITemplatePopupContext<T>> | undefined) {
        this.template = template;
    }

    @Input()
    public set popupTemplateContext(context:T | undefined) {
        this.context = context;
    }

    @Input()
    public set popupConfig(config:ITemplatePopupConfig<T> | undefined) {
        this.configure(config);
    }

    constructor() {
        const renderer = inject(Renderer2);
        const element = inject(ElementRef);
        const componentFactory = inject(SuiComponentFactory);
        const popupDefaults = inject(SuiPopupConfig);


        super(renderer, element, componentFactory, new PopupConfig(popupDefaults));
    }
}
