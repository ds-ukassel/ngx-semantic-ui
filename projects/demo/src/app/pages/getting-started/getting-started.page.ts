import { Component, ChangeDetectionStrategy } from "@angular/core";
import { PageTitleComponent } from "../../components/page-title/page-title.component";
import { PageContentComponent } from "../../components/page-content/page-content.component";
import { CodeblockComponent } from "../../components/codeblock/codeblock.component";
import { SuiDropdownModule } from "@angular-ex/semantic-ui";

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
    public installCode = `$ npm install @angular-ex/semantic-ui --save`;

    public includeCssCode =
`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css">`;

    public importCode = `import {SuiModule} from '@angular-ex/semantic-ui';`;
    public moduleImportCode = `
import {SuiModule} from '@angular-ex/semantic-ui';

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
        '@angular-ex/semantic-ui': 'npm:@angular-ex/semantic-ui/fesm2022/lib.mjs'
    }
}
`;
    public individualImportCode = `import {SuiCheckboxModule, SuiRatingModule} from '@angular-ex/semantic-ui';`;
}
