import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { SuiPopupModule, SuiCollapseModule } from "@angular-ex/semantic-ui";
import { CodeblockComponent } from "../codeblock/codeblock.component";

@Component({
    selector: "demo-example",
    templateUrl: "./example.component.html",
    styleUrls: ["./example.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SuiPopupModule, SuiCollapseModule, CodeblockComponent]
})
export class ExampleComponent {
    public detail = false;

    @Input()
    public code!:string;
}
