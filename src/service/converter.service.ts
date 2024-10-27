import { parse } from "./parser.service";

export function convertCron(input: string) {
  const [minutes, hours, days, months, daysOfWeek, command] = input.split(" ");

  return [
    "minute".padEnd(14, " ") + parse(minutes, "minutes"),
    "hour".padEnd(14, " ") + parse(hours, "hours"),
    "day of month".padEnd(14, " ") + parse(days, "days"),
    "month".padEnd(14, " ") + parse(months, "months"),
    "day of week".padEnd(14, " ") + parse(daysOfWeek, "daysOfWeek"),
    "command".padEnd(14, " ") + command,
  ].join("\n");
}
