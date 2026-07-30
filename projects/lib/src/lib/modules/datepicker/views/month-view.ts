import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DatePrecision} from '../../../misc/util/internal';
import {DateParser} from '../classes/date-parser';
import {SuiCalendarViewTitle} from '../components/calendar-view-title';
import {CalendarItem, SuiCalendarItem} from '../directives/calendar-item';
import {CalendarRangeService} from '../services/calendar-range.service';
import {CalendarView, CalendarViewType} from './calendar-view';

export class CalendarRangeMonthService extends CalendarRangeService {
    public configureItem(item:CalendarItem, baseDate:Date):void {
        item.humanReadable = this.service.localeValues.monthsShort[item.date.getMonth()];
        item.isOutsideRange = false;
    }
}

@Component({
    selector: "sui-calendar-month-view",
    template: `
<table class="ui celled center aligned unstackable table three column month">
  <thead>
    <tr>
      <th colspan="3">
        <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
          {{ year }}
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
export class SuiCalendarMonthView extends CalendarView {
    public readonly ranges = new CalendarRangeMonthService(DatePrecision.Year, 4, 3);
    protected readonly _type = CalendarViewType.Month;

    public get year():string {
        return new DateParser(this.service.localeValues.formats.year, this.service.localeValues).format(this.currentDate);
    }
}
