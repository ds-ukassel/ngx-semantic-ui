import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DatePrecision, DateUtil, Util} from '../../../misc/util/internal';
import {DateParser} from '../classes/date-parser';
import {SuiCalendarViewTitle} from '../components/calendar-view-title';
import {CalendarItem, SuiCalendarItem} from '../directives/calendar-item';
import {CalendarRangeService} from '../services/calendar-range.service';
import {CalendarMode} from '../services/calendar.service';
import {CalendarView, CalendarViewType} from './calendar-view';

export class CalendarRangeMinuteService extends CalendarRangeService {
    public override calcStart(start:Date):Date {
        return DateUtil.startOf(DatePrecision.Hour, DateUtil.clone(start), true);
    }

    public override calcDates(start:Date):Date[] {
        return Util.Array
            .range(this.length)
            .map(i => DateUtil.add(DatePrecision.Minute, DateUtil.clone(start), i * 5));
    }

    public configureItem(item:CalendarItem, _baseDate:Date):void {
        item.humanReadable = new DateParser(this.service.localeValues.formats.time, this.service.localeValues).format(item.date);
        item.isOutsideRange = false;
    }
}

@Component({
    selector: "sui-calendar-minute-view",
    template: `
<table class="ui celled center aligned unstackable table three column minute">
  <thead>
    <tr>
      <th colspan="4">
        <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
          {{ date }}
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
export class SuiCalendarMinuteView extends CalendarView {
    public readonly ranges = new CalendarRangeMinuteService(DatePrecision.Hour, 4, 3);
    protected readonly _type = CalendarViewType.Minute;

    public get date():string {
        if (this.service.config.mode !== CalendarMode.TimeOnly) {
            // Set minutes and seconds to 0
            const dateTimeFormat:string = this.service.localeValues.formats.datetime.replace(/[ms]/g, "0");
            return new DateParser(dateTimeFormat, this.service.localeValues).format(this.currentDate);
        } else {
            // Set minutes and seconds to 0
            const timeFormat:string = this.service.localeValues.formats.time.replace(/[ms]/g, "0");
            return new DateParser(timeFormat, this.service.localeValues).format(this.currentDate);
        }
    }
}
