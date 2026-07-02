import {SuiPopupConfig, SuiSidebarModule} from '@angular-ex/semantic-ui';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {GithubButtonsComponent} from './components/github-buttons/github-buttons.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';

@Component({
    selector: "demo-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SuiSidebarModule, SidebarComponent, GithubButtonsComponent, RouterOutlet]
})
export class AppComponent {
    constructor(popupConfig:SuiPopupConfig) {
        popupConfig.isInverted = true;
        popupConfig.delay = 300;
    }
}
