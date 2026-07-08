import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {SuiDropdownModule, SuiSidebarModule} from 'lib';
import {ApiComponent, ApiDefinition} from '../../../components/api/api.component';
import {ExampleComponent} from '../../../components/example/example.component';
import {PageContentComponent} from '../../../components/page-content/page-content.component';
import {PageTitleComponent} from '../../../components/page-title/page-title.component';

const exampleStandardTemplate = `
<div class="ui top attached demo menu">
    <a class="item" (click)="sidebar.toggle()">
        <i class="sidebar icon"></i> Menu
    </a>
</div>
<sui-sidebar-container class="ui bottom attached segment">
    <sui-sidebar class="inverted vertical" #sidebar>
        <a class="item">1</a>
        <a class="item">2</a>
    </sui-sidebar>
    <sui-sidebar-sibling [isDimmedWhenVisible]="true">
        <div class="ui basic segment">
            <h3 class="ui header">Content</h3>
            <p>Example content beside the sidebar</p>
            <button class="ui button" (click)="sidebar.open()">Open Sidebar</button>
        </div>
    </sui-sidebar-sibling>
</sui-sidebar-container>
`;

const exampleDirectionTemplate = `
<div class="ui top attached demo menu">
    <a class="item" (click)="sidebar.toggle()">
        <i class="sidebar icon"></i> Menu
    </a>
</div>
<sui-sidebar-container class="ui bottom attached segment">
    <sui-sidebar class="inverted" direction="bottom" [(isVisible)]="isVisible" #sidebar>
        <a class="item">1</a>
        <a class="item">2</a>
    </sui-sidebar>
    <sui-sidebar-sibling>
        <div class="ui basic segment">
            <h3 class="ui header">Content</h3>
            <p>Sidebar visibility: {{ isVisible }}</p>
            <button class="ui button" (click)="sidebar.open()">Open Sidebar</button>
        </div>
    </sui-sidebar-sibling>
</sui-sidebar-container>
`;

@Component({
    selector: "demo-page-sidebar",
    templateUrl: "./sidebar.page.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [PageTitleComponent, PageContentComponent, ExampleComponent, forwardRef(() => SidebarExampleStandard), forwardRef(() => SidebarExampleDirection), ApiComponent]
})
export class SidebarPage {
    public api:ApiDefinition = [
        {
            selector: "<sui-sidebar-container>"
        },
        {
            selector: "<sui-sidebar>",
            properties: [
                {
                    name: "isVisible",
                    type: "boolean",
                    description: "Sets whether or not the sidebar is displayed.",
                    defaultValue: "false"
                },
                {
                    name: "direction",
                    type: "SidebarDirection",
                    description: "Sets the direction of the sidebar relative to the <code>sui-sidebar-sibling</code> contents.",
                    defaultValue: "left"
                },
                {
                    name: "transition",
                    type: "SidebarTransition",
                    description: "Sets the transition used when displaying the sidebar. Options are " +
                                 "<code>overlay</code>, <code>uncover</code>, <code>scale down</code>, " +
                                 "<code>push</code>, <code>slide along</code> & <code>slide out</code>.",
                    defaultValue: "uncover"
                }
            ],
            events: [
                {
                    name: "isVisibleChange",
                    type: "boolean",
                    description: "Fires when the sidebar's visible state is changed. Supports <code>[(isVisible)]</code> syntax."
                }
            ]
        },
        {
            selector: "<sui-sidebar-sibling>",
            properties: [
                {
                    name: "isDimmedWhenVisible",
                    type: "boolean",
                    description: "Sets whether the page content beside the sidebar is dimmed when the sidebar is visible.",
                    defaultValue: "false"
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleDirectionTemplate:string = exampleDirectionTemplate;
}

@Component({
    selector: "example-sidebar-standard",
    template: exampleStandardTemplate,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SuiDropdownModule, SuiSidebarModule]
})
export class SidebarExampleStandard {}

@Component({
    selector: "example-sidebar-direction",
    template: exampleDirectionTemplate,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SuiDropdownModule, SuiSidebarModule]
})
export class SidebarExampleDirection {
    public isVisible = false;
}

export const SidebarPageComponents = [SidebarPage, SidebarExampleStandard, SidebarExampleDirection];
