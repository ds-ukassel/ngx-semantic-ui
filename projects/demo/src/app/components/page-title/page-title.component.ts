import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {GithubButtonsComponent} from '../github-buttons/github-buttons.component';

@Component({
    selector: "demo-page-title",
    templateUrl: "./page-title.component.html",
    styleUrls: ["./page-title.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
  imports: [GithubButtonsComponent],
})
export class PageTitleComponent {
    @HostBinding("class.ui")
    @HostBinding("class.masthead")
    @HostBinding("class.vertical")
    @HostBinding("class.segment")
    public classes = true;
}
