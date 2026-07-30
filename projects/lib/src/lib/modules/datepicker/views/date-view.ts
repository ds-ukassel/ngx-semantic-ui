import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DatePrecision, DateUtil} from '../../../misc/util/internal';
import {DateParser} from '../classes/date-parser';
import {SuiCalendarViewTitle} from '../components/calendar-view-title';
import {CalendarItem, SuiCalendarItem} from '../directives/calendar-item';
import {CalendarRangeService} from '../services/calendar-range.service';
import {CalendarView, CalendarViewType} from './calendar-view';

export class CalendarRangeDateService extends CalendarRangeService {
    public override calcStart(start:Date):Date {
        const monthStart = DateUtil.startOf(DatePrecision.Month, DateUtil.clone(start));
        monthStart.setDate((1 - monthStart.getDay() + this.service.firstDayOfWeek - 7) % 7);
        return monthStart;
    }

    public configureItem(item:CalendarItem, baseDate:Date):void {
        item.humanReadable = item.date.getDate().toString();
        item.isOutsideRange = item.date.getMonth() !== baseDate.getMonth();
        item.isSelectable = item.isDisabled;
    }
}

@Component({
    selector: "sui-calendar-date-view",
    template: `
<table class="ui celled center aligned unstackable table seven column day">
  <thead>
    <tr>
      <th colspan="7">
        <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
          {{ date }}
        </sui-calendar-view-title>
      </th>
    </tr>
    <tr>
      @for (day of days; track $index) {
        <th>{{ day }}</th>
      }
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
export class SuiCalendarDateView extends CalendarView {
    public readonly ranges = new CalendarRangeDateService(DatePrecision.Month, 6, 7);
    protected readonly _type = CalendarViewType.Date;

    public get days():string[] {
        const days = this.service.localeValues.weekdaysNarrow;
        return days.map((d, i) => days[(i + this.service.firstDayOfWeek) % days.length]);
    }

    public get date():string {
        return new DateParser(this.service.localeValues.formats.month, this.service.localeValues).format(this.currentDate);
    }
}
