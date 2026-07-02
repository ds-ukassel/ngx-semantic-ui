import { Component, HostBinding, ChangeDetectionStrategy } from "@angular/core";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: "demo-page-content",
    template: `
<ng-content></ng-content>
`,
    styleUrls: ["./page-content.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SidebarComponent]
})
export class PageContentComponent {
    @HostBinding("class.ui")
    @HostBinding("class.main")
    @HostBinding("class.container")
    public classes = true;
}
