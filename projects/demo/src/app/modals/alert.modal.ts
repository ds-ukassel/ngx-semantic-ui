import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ComponentModalConfig, ModalSize, SuiModal} from 'lib';

interface IAlertModalContext {
    message:string;
    title?:string;
}

@Component({
    selector: "demo-modal-alert",
    template: `
@if (modal.context.title) {
  <div class="header">{{ modal.context.title }}</div>
}
<div class="content">
  <p>{{ modal.context.message }}</p>
</div>
<div class="actions">
  <button class="ui green button" (click)="modal.approve(undefined)">OK</button>
</div>
`,
    changeDetection: ChangeDetectionStrategy.Eager
})
export class AlertModalComponent {
    constructor(public modal:SuiModal<IAlertModalContext, void, void>) {}
}

export class AlertModal extends ComponentModalConfig<IAlertModalContext, void, void> {
    constructor(message:string, title?:string) {
        super(AlertModalComponent, { message, title });

        this.transitionDuration = 200;
        this.size = ModalSize.Small;
    }
}
