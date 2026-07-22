export interface DateWindow {
  start: Date;
  end: Date;
}

export function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function utcDayWindow(daysFromNow: number, now = new Date()): DateWindow {
  const start = startOfUtcDay(now);
  start.setUTCDate(start.getUTCDate() + daysFromNow);

  const end = new Date(start.getTime());
  end.setUTCDate(end.getUTCDate() + 1);

  return { start, end };
}
