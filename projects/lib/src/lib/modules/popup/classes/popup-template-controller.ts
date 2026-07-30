import {TemplateRef} from '@angular/core';
import {IImplicitContext} from '../../../misc/util/internal';
import {IPopupConfig, PopupConfig} from './popup-config';
import {IPopup, SuiPopupController} from './popup-controller';

export interface ITemplatePopupContext<T> extends IImplicitContext<IPopup> {
    context?:T;
}

export interface ITemplatePopupConfig<T> extends IPopupConfig {
    template?:TemplateRef<ITemplatePopupContext<T>>;
    context?:T;
}

export class TemplatePopupConfig<T> extends PopupConfig {
    public template?:TemplateRef<ITemplatePopupContext<T>>;
    public context?:T;
}

export class SuiPopupTemplateController<T> extends SuiPopupController {
    public template?:TemplateRef<ITemplatePopupContext<T>>;
    public context?:T;

    public override configure(config?:ITemplatePopupConfig<T>):void {
        super.configure(config);

        if (config) {
            this.template = config.template;
            this.context = config.context;
        }
    }

    public override open():void {
        // If there is a template, inject it into the view.
        if (this.template) {
            this.popup.templateSibling.clear();

            this._componentFactory.createView(this.popup.templateSibling, this.template, {
                $implicit: this.popup,
                context: this.context
            });
        }

        super.open();
    }
}
