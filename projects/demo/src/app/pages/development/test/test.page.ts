import { Component, AfterViewInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { PageTitleComponent } from "../../../components/page-title/page-title.component";
import { PageContentComponent } from "../../../components/page-content/page-content.component";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [PageTitleComponent, PageContentComponent]
})
export class TestPage {
    constructor() {}
}
