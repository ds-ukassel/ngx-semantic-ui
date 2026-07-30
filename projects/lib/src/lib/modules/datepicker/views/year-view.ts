import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DatePrecision, DateUtil, Util} from '../../../misc/util/internal';
import {SuiCalendarViewTitle} from '../components/calendar-view-title';
import {CalendarItem, SuiCalendarItem} from '../directives/calendar-item';
import {CalendarRangeService} from '../services/calendar-range.service';
import {CalendarView, CalendarViewType} from './calendar-view';

export class CalendarRangeYearService extends CalendarRangeService {
    public configureItem(item:CalendarItem, baseDate:Date):void {
        item.humanReadable = Util.String.padLeft(item.date.getFullYear().toString(), 4, "0");
        item.isOutsideRange = item.date.getFullYear() >= this.calcStart(baseDate).getFullYear() + 10;
    }
}

@Component({
    selector: "sui-calendar-year-view",
    template: `
<table class="ui celled center aligned unstackable table three column year">
  <thead>
    <tr>
      <th colspan="3">
        <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
          {{ pad(decadeStart) }} - {{ pad(decadeStart + 10) }}
        </sui-calendar-view-title>
      </th>
    </tr>
  </thead>
  <tbody>
    @for (group of ranges.current.groupedItems; track group) {
      <tr>
        @for (item of group; track item) {
          <td class="link"
            [suiCalendarItem]="item"
            (click)="setDate(item)">{{ item.humanReadable }}
          </td>
        }
      </tr>
    }
  </tbody>
</table>
`,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SuiCalendarViewTitle, SuiCalendarItem]
})
export class SuiCalendarYearView extends CalendarView {
    public readonly ranges = new CalendarRangeYearService(DatePrecision.Decade, 4, 3);
    protected readonly _type = CalendarViewType.Year;

    public get decadeStart():number {
        return DateUtil
            .startOf(DatePrecision.Decade, DateUtil.clone(this.service.currentDate))
            .getFullYear();
    }

    public pad(year:number):string {
        return Util.String.padLeft(year.toString(), 4, "0");
    }
}
