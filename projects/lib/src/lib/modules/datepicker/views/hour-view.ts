import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DatePrecision} from '../../../misc/util/internal';
import {DateParser} from '../classes/date-parser';
import {SuiCalendarViewTitle} from '../components/calendar-view-title';
import {CalendarItem, SuiCalendarItem} from '../directives/calendar-item';
import {CalendarRangeService} from '../services/calendar-range.service';
import {CalendarView, CalendarViewType} from './calendar-view';

export class CalendarRangeHourService extends CalendarRangeService {
    public configureItem(item:CalendarItem, _baseDate:Date):void {
        // Set minutes and seconds to 0
        const customFormat:string = this.service.localeValues.formats.time.replace(/[ms]/g, "0");
        item.humanReadable = new DateParser(customFormat, this.service.localeValues).format(item.date);
        item.isOutsideRange = false;
    }
}

@Component({
    selector: "sui-calendar-hour-view",
    template: `
<table class="ui celled center aligned unstackable table four column hour">
  @if (service.config.mode !== 1) {
    <thead>
      <tr>
        <th colspan="4">
          <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
            {{ date }}
          </sui-calendar-view-title>
        </th>
      </tr>
    </thead>
  }
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
export class SuiCalendarHourView extends CalendarView {
    public readonly ranges = new CalendarRangeHourService(DatePrecision.Date, 6, 4);
    protected readonly _type = CalendarViewType.Hour;

    public get date():string {
        return new DateParser(this.service.localeValues.formats.date, this.service.localeValues).format(this.currentDate);
    }
}
