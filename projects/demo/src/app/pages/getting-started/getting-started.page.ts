import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SuiDropdownModule} from 'lib';
import {CodeblockComponent} from '../../components/codeblock/codeblock.component';
import {PageContentComponent} from '../../components/page-content/page-content.component';
import {PageTitleComponent} from '../../components/page-title/page-title.component';

@Component({
    selector: "demo-page-getting-started",
    templateUrl: "./getting-started.page.html",
    styles: [`
.dividing.header {
    margin-top: 1em;
    margin-bottom: 0.5em;
}
`],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [PageTitleComponent, PageContentComponent, CodeblockComponent, SuiDropdownModule]
})
export class GettingStartedPage {
    public installCode = `$ npm install @ds-ukassel/ngx-semantic-ui --save`;

    public includeCssCode =
`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css">`;

    public importCode = `import {SuiModule} from '@ds-ukassel/ngx-semantic-ui';`;
    public moduleImportCode = `
import {SuiModule} from '@ds-ukassel/ngx-semantic-ui';

@NgModule({
    declarations: [AppComponent, ...],
    imports: [SuiModule, ...],
    bootstrap: [AppComponent]
})
export class AppModule {}
`;
    public systemJSCode = `
var config = {
    ...
    map: {
        ...
        '@ds-ukassel/ngx-semantic-ui': 'npm:@ds-ukassel/ngx-semantic-ui/fesm2022/lib.mjs'
    }
}
`;
    public individualImportCode = `import {SuiCheckboxModule, SuiRatingModule} from '@ds-ukassel/ngx-semantic-ui';`;
}
