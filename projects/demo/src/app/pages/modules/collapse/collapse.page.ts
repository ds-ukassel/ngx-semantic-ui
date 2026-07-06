import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {SuiCollapseModule, SuiMessageModule} from 'lib';
import {ApiComponent, ApiDefinition} from '../../../components/api/api.component';
import {CodeblockComponent} from '../../../components/codeblock/codeblock.component';
import {ExampleComponent} from '../../../components/example/example.component';
import {PageContentComponent} from '../../../components/page-content/page-content.component';
import {PageTitleComponent} from '../../../components/page-title/page-title.component';

const exampleStandardTemplate = `
<div class="ui segments">
    <div class="ui segment">
        <button class="ui primary button" (click)="collapse = !collapse">
            Toggle Collapse
        </button>
    </div>
    <div class="ui segment">
        <div [suiCollapse]="collapse">
            <div class="ui segment">
                <h4 class="ui header">Collapsible Panel</h4>
                <p>Content of the panel.</p>
            </div>
        </div>
    </div>
</div>
`;

@Component({
    selector: "demo-page-collapse",
    templateUrl: "./collapse.page.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [PageTitleComponent, PageContentComponent, ExampleComponent, forwardRef(() => CollapseExampleStandard), SuiMessageModule, CodeblockComponent, ApiComponent]
})
export class CollapsePage {
    public api:ApiDefinition = [
        {
            selector: "[suiCollapse]",
            properties: [
                {
                    name: "suiCollapse",
                    type: "boolean",
                    description: "Sets whether or not the element is collapsed.",
                    required: true
                },
                {
                    name: "collapseDuration",
                    type: "number",
                    description: "Sets the duration of the collapse animation.",
                    defaultValue: "350"
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = exampleStandardTemplate;

    public polyfillInclude =
`<script src="https://rawgit.com/web-animations/web-animations-js/master/web-animations.min.js"></script>`;
}

@Component({
    selector: "example-collapse-standard",
    template: exampleStandardTemplate,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SuiCollapseModule]
})
export class CollapseExampleStandard {
    public collapse = false;
}

export const CollapsePageComponents = [CollapsePage, CollapseExampleStandard];
