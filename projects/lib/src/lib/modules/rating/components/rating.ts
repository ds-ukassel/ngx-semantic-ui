import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import {CustomValueAccessor, customValueAccessorFactory, ICustomValueAccessorHost} from '../../../misc/util/internal';

@Component({
    selector: "sui-rating",
    template: `
@for (icon of icons; track $index) {
  <i class="icon"
    (mouseover)="onMouseover($index)"
    (click)="onClick($index)"
    [class.selected]="hoveredIndex >= $index && !isReadonly"
    [class.active]="value > $index">
  </i>
}
`,
    styles: [`
:host.read-only .icon {
    cursor: auto
}
`],
    changeDetection: ChangeDetectionStrategy.Eager,
})
export class SuiRating implements ICustomValueAccessorHost<number> {
    @HostBinding("class.ui")
    @HostBinding("class.rating")
    public readonly hasClasses:boolean;

    public value:number;

    @Output()
    public valueChange:EventEmitter<number>;

    private _maximum!:number;

    @Input()
    public get maximum():number {
        return this._maximum;
    }

    public set maximum(value:number) {
        this._maximum = +value;
    }

    @HostBinding("class.read-only")
    @Input()
    public isReadonly:boolean;

    public get icons():undefined[] {
               return new Array(this.maximum);
    }

    public hoveredIndex = -1;

    constructor() {
        this.value = 0;
        this.valueChange = new EventEmitter<number>();

        this.maximum = 5;
        this.isReadonly = false;

        this.hasClasses = true;
    }

    public onClick(i:number):void {
        if (!this.isReadonly) {
            this.value = i + 1;
            this.valueChange.emit(this.value);
        }
    }

    public onMouseover(i:number):void {
        this.hoveredIndex = i;
    }

    @HostListener("mouseout")
    public onMouseout():void {
        this.hoveredIndex = -1;
    }

    public writeValue(value:number):void {
        this.value = value;
    }
}

@Directive({
    selector: "sui-rating",
    host: { "(valueChange)": "onChange($event)" },
    providers: [customValueAccessorFactory(SuiRatingValueAccessor)]
})
export class SuiRatingValueAccessor extends CustomValueAccessor<number, SuiRating> {
    constructor(host:SuiRating) {
        super(host);
    }
}
