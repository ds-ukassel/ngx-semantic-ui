import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "demo-github-buttons",
    templateUrl: "./github-buttons.component.html",
    changeDetection: ChangeDetectionStrategy.Eager
})
export class GithubButtonsComponent {
    @Input()
    public mega = true;
}
