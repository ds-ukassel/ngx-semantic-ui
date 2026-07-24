import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {SuiComponentFactory} from '../../../misc/util/internal';
import type {IResultContext} from './search';

@Component({
    selector: "sui-search-result",
    template: `
<span #templateSibling></span>
@if (!template) {
  <span [innerHTML]="formatter(value, query)"></span>
}
`,
    changeDetection: ChangeDetectionStrategy.Eager,
})
export class SuiSearchResult<T> {
    componentFactory = inject(SuiComponentFactory);

    // Sets the Semantic UI classes on the host element.
    @HostBinding("class.result")
    public readonly hasClasses:boolean;

    @Input()
    public value!:T;

    @Input()
    public query!:string;

    // Returns the label from a given value.
    @Input()
    public formatter:(obj:T, query:string) => string;

    private _template?:TemplateRef<IResultContext<T>>;

    @Input()
    public get template():TemplateRef<IResultContext<T>> | undefined {
        return this._template;
    }

    public set template(template:TemplateRef<IResultContext<T>> | undefined) {
        this._template = template;
        if (this.template) {
            this.componentFactory.createView(this.templateSibling, this.template, {
                $implicit: this.value,
                query: this.query
            });
        }
    }

    // Placeholder to draw template beside.
    @ViewChild("templateSibling", { read: ViewContainerRef, static: true })
    public templateSibling!:ViewContainerRef;

    constructor() {
        this.hasClasses = true;

        // By default we make this function return an empty string, for the brief moment when it isn't displaying the correct label.
        this.formatter = value => "";
    }
}
