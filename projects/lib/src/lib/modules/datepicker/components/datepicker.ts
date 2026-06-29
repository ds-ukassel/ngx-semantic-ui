import { Component, HostBinding, HostListener, ChangeDetectionStrategy } from "@angular/core";
import { CalendarService } from "./../services/calendar.service";
import { DatetimeConfig } from "../classes/calendar-config";
import { SuiLocalizationService } from "../../../behaviors/localization/internal";

export type DatepickerMode = "year" | "month" | "date" | "datetime" | "time";

export const DatepickerMode = {
    Year: "year" as DatepickerMode,
    Month: "month" as DatepickerMode,
    Date: "date" as DatepickerMode,
    Datetime: "datetime" as DatepickerMode,
    Time: "time" as DatepickerMode
};

@Component({
    selector: "sui-datepicker",
    template: `
@switch (service.currentView) {
  @case (0) {
    <sui-calendar-year-view [service]="service"></sui-calendar-year-view>
  }
  @case (1) {
    <sui-calendar-month-view [service]="service"></sui-calendar-month-view>
  }
  @case (2) {
    <sui-calendar-date-view [service]="service"></sui-calendar-date-view>
  }
  @case (3) {
    <sui-calendar-hour-view [service]="service"></sui-calendar-hour-view>
  }
  @case (4) {
    <sui-calendar-minute-view [service]="service"></sui-calendar-minute-view>
  }
}
`,
    styles: [`
:host {
    user-select: none;
}
`],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SuiDatepicker {
    @HostBinding("class.ui")
    @HostBinding("class.active")
    @HostBinding("class.calendar")
    public readonly hasClasses:boolean;

    public service:CalendarService;

    constructor(localizationService:SuiLocalizationService) {
        this.service = new CalendarService(new DatetimeConfig(), localizationService.get().datepicker);

        this.hasClasses = true;
    }

    @HostListener("mousedown", ["$event"])
    public onMouseDown(e:MouseEvent):void {
        e.preventDefault();
    }
}
