import {IDatepickerLocaleValues} from "../../../behaviors/localization/internal";
import {Day, format, Month, parse} from "date-fns";
import type {Locale, LocaleDayPeriod, LocaleUnitValue, LocaleWidth, LocalizeFn, MatchFn} from "date-fns/locale";
import {enUS} from "date-fns/locale";

type DateFnsWeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type WidthValues = Partial<Record<LocaleWidth, readonly string[]>>;

const matchWidths: LocaleWidth[] = ["wide", "abbreviated", "short", "narrow"];

// The locale only distinguishes am from pm
function dayPeriodIndex(period: LocaleDayPeriod): number {
  switch (period) {
    case "am":
    case "midnight":
    case "morning":
      return 0;
    default:
      return 1;
  }
}

function buildLocalizeFn<T extends LocaleUnitValue | number>(
  values: WidthValues,
  indexOf: (value: T) => number,
): LocalizeFn<T> {
  return (value, options) => {
    const width = options?.width;
    // `wide` is the only width every locale defines
    const names = (width && values[width]) || values.wide as readonly string[];
    return names[indexOf(value)];
  };
}

function buildMatchFn<T>(values: WidthValues, valueOf: (index: number) => T): MatchFn<T> {
  return (dirtyString, options) => {
    const widths = options?.width ? [options.width, ...matchWidths] : matchWidths;
    const candidates = widths
      .flatMap(width => (values[width] || []).map((name, index) => ({name, index})))
      // Longest first, so `September` wins over `Sep`
      .sort((a, b) => b.name.length - a.name.length);

    const lowerCased = dirtyString.toLowerCase();
    const match = candidates.find(candidate => lowerCased.startsWith(candidate.name.toLowerCase()));

    if (!match) {
      return null;
    }

    return {value: valueOf(match.index), rest: dirtyString.slice(match.name.length)};
  };
}

export class DateFnsParser {
  private _weekStartsOn: DateFnsWeekStartsOn;
  private _locale: Locale;

  private get _config(): { weekStartsOn: DateFnsWeekStartsOn; locale: Locale } {
    return {
      weekStartsOn: this._weekStartsOn,
      locale: this._locale
    };
  }

  constructor(locale: IDatepickerLocaleValues) {
    this._weekStartsOn = locale.firstDayOfWeek as DateFnsWeekStartsOn;

    const monthValues: WidthValues = {
      wide: locale.months,
      abbreviated: locale.monthsShort
    };

    const dayValues: WidthValues = {
      wide: locale.weekdays,
      abbreviated: locale.weekdaysShort,
      short: locale.weekdaysShort,
      narrow: locale.weekdaysNarrow
    };

    const dayPeriodValues: WidthValues = {
      wide: locale.timesOfDay,
      abbreviated: locale.timesOfDayUppercase,
      narrow: locale.timesOfDayLowercase
    };

    this._locale = {
      ...enUS,
      localize: {
        ...enUS.localize,
        month: buildLocalizeFn<Month>(monthValues, month => month),
        day: buildLocalizeFn<Day>(dayValues, day => day),
        dayPeriod: buildLocalizeFn<LocaleDayPeriod>(dayPeriodValues, dayPeriodIndex)
      },
      match: {
        ...enUS.match,
        month: buildMatchFn(monthValues, index => index as Month),
        day: buildMatchFn(dayValues, index => index as Day),
        dayPeriod: buildMatchFn<LocaleDayPeriod>(dayPeriodValues, index => index === 0 ? "am" : "pm")
      }
    };
  }

  public format(d: Date, f: string): string {
    return format(d, f, this._config);
  }

  public parse(dS: string, f: string, bD: Date): Date {
    return parse(dS, f, bD, this._config);
  }
}
