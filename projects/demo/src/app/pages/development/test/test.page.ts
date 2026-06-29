import { Component, AfterViewInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "demo-page-test",
    templateUrl: "./test.page.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TestPage {
    constructor() {}
}
