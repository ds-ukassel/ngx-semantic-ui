import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {SuiMessageModule} from 'lib';
import {ApiComponent, ApiDefinition} from '../../../components/api/api.component';
import {CodeblockComponent} from '../../../components/codeblock/codeblock.component';
import {ExampleComponent} from '../../../components/example/example.component';
import {PageContentComponent} from '../../../components/page-content/page-content.component';
import {PageTitleComponent} from '../../../components/page-title/page-title.component';

const exampleStandardTemplate = `
<sui-message class="success">
    <div class="header">
        This is a message!
    </div>
    <p>This message can be styled (as shown) and dismissed with the close icon in the top right.</p>
</sui-message>
`;

const exampleNoDismissTemplate = `
<sui-message class="attached warning" [isDismissable]="false">
    <div class="header">
        Attached message!
    </div>
    <p>This message isn't dismissible.</p>
</sui-message>
<div class="ui bottom attached segment">
    <p>Example content</p>
</div>
`;

const exampleIconTemplate = `
<sui-message class="icon">
    <i class="inbox icon"></i>
    <div class="content">
        <div class="header">
            This is a message with an icon
        </div>
        <p>This message shows an icon.</p>
    </div>
</sui-message>
`;

@Component({
    selector: "demo-page-message",
    templateUrl: "./message.page.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [PageTitleComponent, PageContentComponent, ExampleComponent, forwardRef(() => MessageExampleStandard), forwardRef(() => MessageExampleNoDismiss), forwardRef(() => MessageExampleIcon), CodeblockComponent, ApiComponent]
})
export class MessagePage {
    public api:ApiDefinition = [
        {
            selector: "<sui-message>",
            properties: [
                {
                    name: "isDismissable",
                    type: "boolean",
                    description: "Sets whether or not the message has a dismiss button.",
                    defaultValue: "true"
                },
                {
                    name: "transition",
                    type: "string",
                    description: "Sets the transition used when dismissing the message.",
                    defaultValue: "fade"
                },
                {
                    name: "transitionDuration",
                    type: "number",
                    description: "Sets the duration for the message transition.",
                    defaultValue: "300"
                }
            ],
            events: [
                {
                    name: "dismiss",
                    type: "void",
                    description: "Fires when the message is dismissed by the user."
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleNoDismissTemplate:string = exampleNoDismissTemplate;
    public exampleIconTemplate:string = exampleIconTemplate;

    public manualDismissMarkup = `
<sui-message #message>
    <div class="header">
        Dismiss Manually
    </div>
</sui-message>

<button (click)="message.dismiss()">Dismiss</button>
<button (click)="dismiss(message)">Dismiss (advanced)</button>
`;

    public manualDismissCode = `
import {IMessage} from "@angular-ex/semantic-ui";

@Component({})
export class MyComponent {
    public dismiss(message:IMessage) {
        message.dismiss();
    }
}
`;
}

@Component({
    selector: "example-message-standard",
    template: exampleStandardTemplate,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SuiMessageModule]
})
export class MessageExampleStandard {}

@Component({
    selector: "example-message-no-dismiss",
    template: exampleNoDismissTemplate,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SuiMessageModule]
})
export class MessageExampleNoDismiss {}

@Component({
    selector: "example-message-icon",
    template: exampleIconTemplate,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SuiMessageModule]
})
export class MessageExampleIcon {}

export const MessagePageComponents = [MessagePage, MessageExampleStandard, MessageExampleNoDismiss, MessageExampleIcon];
