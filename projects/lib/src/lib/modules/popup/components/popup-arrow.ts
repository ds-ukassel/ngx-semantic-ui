import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {PositioningPlacement} from '../../../misc/util/internal';

@Component({
  selector: "sui-popup-arrow",
  templateUrl: './popup-arrow.html',
  styleUrls: ['./popup-arrow.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class SuiPopupArrow {
    @Input()
    public placement!:PositioningPlacement;

    @HostBinding("class.inverted")
    @Input()
    public inverted!:boolean;

    public get direction():string | undefined {
        if (this.placement) {
            return this.placement.split(" ").shift();
        }

        return undefined;
    }

    public get alignment():string | undefined {
        if (this.placement) {
            const alignment = this.placement.split(" ").pop();
            if (alignment === this.direction) {
                return "center";
            }
            return alignment;
        }

        return undefined;
    }
}
