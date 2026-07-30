import {AfterContentInit, ContentChildren, Directive, ElementRef, inject, QueryList} from '@angular/core';
import {Subscription} from 'rxjs';
import {Util} from '../../../misc/util/internal';
import {SuiRadio} from '../components/radio';

// We attach to the surrounding form, so this can't have the `sui` prefix.
// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: "form:not([ngForm]):not([[ngForm]]),ngForm,[ngForm]" })
export class SuiRadioManager<T> implements AfterContentInit {
    element = inject(ElementRef);


    public isNested:boolean;

    @ContentChildren(SuiRadioManager, { descendants: true })
    private _subManagers!:QueryList<SuiRadioManager<T>>;

    @ContentChildren(SuiRadio, { descendants: true })
    private _renderedRadios!:QueryList<SuiRadio<T>>;

    private _radioSubs:Subscription[];

    constructor() {
        this.isNested = false;
        this._radioSubs = [];
    }

    public ngAfterContentInit():void {
        this.updateNesting();
        this._subManagers.changes.subscribe(() => this.updateNesting());

        this.updateRadios();
        this._renderedRadios.changes.subscribe(() => this.updateRadios());
    }

    private updateNesting():void {
        this._subManagers
            .filter(m => m !== this)
            .forEach(m => m.isNested = true);
    }

    private updateRadios():void {
        this._radioSubs.forEach(s => s.unsubscribe());
        this._radioSubs = [];

        const groups = Util.Array.groupBy(this._renderedRadios.toArray(), "name");
        Object
            .keys(groups)
            .map(k => groups[k])
            .forEach(g => g
                .forEach(r => this._radioSubs
                    .push(r.onCurrentValueChange
                        .subscribe((v:T) => {
                            if (!this.isNested) {
                                g.forEach(radio => radio.writeValue(v));
                            }
                        }))));
    }
}
