import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

export type TemporalInfo = {
  year: 2026;
  month: 4;
  day: 18;
  hour: 12;
  minute: 0;
  timeZone: "America/Los_Angeles";
};

// NOTE: Temporal months are 1-based, date-fns are 0-based, so for April to be 4
//       must subtract 1
export const tzDate = ({
  year,
  month,
  day,
  hour,
  minute,
  timeZone,
}: TemporalInfo) => new TZDate(year, month - 1, day, hour, minute, timeZone);

// 2026-03-07 17:30
export const timeDateTime = (info: TemporalInfo) =>
  format(tzDate(info), "yyyy-MM-dd kk:mm");

// Saturday, March 7th, 12:30PM
export const dateTimeHuman = (info: TemporalInfo) =>
  format(tzDate(info), "eeee LLLL do, h:mmaa");

// 12:30PM
export const timeHuman = (info: TemporalInfo) => format(tzDate(info), "h:mmaa");

// 20260308T013000
// NOTE: This Google Calendar API is weird in that it wants time in UTC but it
// wants the real date. So have to do them separately
export const isoFlatDateTime = (info: TemporalInfo) =>
  `${format(tzDate(info), "yyyyMMdd")}T${format(tzDate(info).withTimeZone("UTC"), "kkmm00")}`;
