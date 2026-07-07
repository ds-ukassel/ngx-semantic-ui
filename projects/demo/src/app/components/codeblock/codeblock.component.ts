import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
// markup (HTML) is included in the Prism core.

@Component({
    selector: "demo-codeblock",
    template: `
<pre [class]="languageClass" [innerHTML]="html"></pre>
`,
    styleUrls: ["./codeblock.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
})
export class CodeblockComponent implements AfterViewInit {
    @Input()
    public language!:string;

    @Input()
    public src!:string;

    public html!:string;

    public languageClass = "";

    private _changeDetectorRef = inject(ChangeDetectorRef);

    public ngAfterViewInit():void {
        if (this.src[0] === "\n") {
            this.src = this.src.replace("\n", "");
        }
        this.languageClass = `language-${this.language}`;
        this.html = Prism.highlight(this.src || "", Prism.languages[this.language], this.language);
        this._changeDetectorRef.detectChanges();
    }
}
