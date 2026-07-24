import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SuiPopupConfig, SuiSidebar, SuiSidebarContainer, SuiSidebarModule, SuiSidebarSibling} from 'lib';
import {GithubButtonsComponent} from './components/github-buttons/github-buttons.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';

@Component({
    selector: "demo-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SuiSidebarModule, SidebarComponent, GithubButtonsComponent, RouterOutlet, SuiSidebarContainer, SuiSidebar, SuiSidebarSibling],
})
export class AppComponent {
    constructor() {
        const popupConfig = inject(SuiPopupConfig);

        popupConfig.isInverted = true;
        popupConfig.delay = 300;
    }
}
