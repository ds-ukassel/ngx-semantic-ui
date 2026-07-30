import {ComponentRef, Type} from '@angular/core';
import {PopupConfig} from './popup-config';
import {SuiPopupController} from './popup-controller';

export class SuiPopupComponentController<T> extends SuiPopupController {
    // Stores reference to generated content component.
    private _contentComponentRef?:ComponentRef<T>;

    public get componentInstance():T | undefined {
        if (this._contentComponentRef) {
            return this._contentComponentRef.instance;
        }

        return undefined;
    }

    constructor(private _component:Type<T>, config:PopupConfig) {
        super(config);
    }

    public override open():void {
        if (!this._contentComponentRef) {
            this._contentComponentRef = this._componentFactory.createComponent(this._component as Type<T>);
            this._componentFactory.attachToView(this._contentComponentRef, this.popup.templateSibling);
        }

        super.open();
    }

    protected override cleanup():void {
        super.cleanup();

        if (this._contentComponentRef) {
            this._contentComponentRef.destroy();
            this._contentComponentRef = undefined;
        }
    }
}
