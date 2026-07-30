import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ComponentModalConfig, ModalSize, SuiModal} from 'lib';

interface IConfirmModalContext {
    question:string;
    title?:string;
}

@Component({
    selector: "demo-modal-confirm",
    template: `
@if (modal.context.title) {
  <div class="header">{{ modal.context.title }}</div>
}
<div class="content">
  <p>{{ modal.context.question }}</p>
</div>
<div class="actions">
  <button class="ui red button" (click)="modal.deny(undefined)">Cancel</button>
  <button class="ui green button" (click)="modal.approve(undefined)">OK</button>
</div>
`,
    changeDetection: ChangeDetectionStrategy.Eager
})
export class ConfirmModalComponent {
    public modal = inject<SuiModal<IConfirmModalContext, void, void>>(SuiModal);
}

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
    constructor(question:string, title?:string) {
        super(ConfirmModalComponent, { question, title });

        this.isClosable = false;
        this.transitionDuration = 200;
        this.size = ModalSize.Small;
    }
}
