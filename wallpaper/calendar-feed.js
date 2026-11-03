const MAX_EVENTS_PER_FEED = 60;
const FEED_TIMEOUT_MS = 15000;

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function isIcsCalendar(value) {
  if (typeof value !== "string") return false;
  const text = value.replace(/^\uFEFF/, "");
  return /^BEGIN:VCALENDAR\s*$/im.test(text) && /^END:VCALENDAR\s*$/im.test(text);
}

function browserCalendarUrl(value) {
  const url = new URL(value);
  if (url.protocol === "webcal:") url.protocol = "https:";
  return url.href;
}

function parseIcsDate(line, fallbackTimezone = "") {
  if (!line) return null;
  const colon = line.indexOf(":");
  if (colon < 0) return null;
  const lhs = line.slice(0, colon).split(";");
  const params = Object.fromEntries(lhs.slice(1).map((part) => {
    const [key, ...rest] = part.split("=");
    return [key.toUpperCase(), rest.join("=").replace(/^"|"$/g, "")];
  }));
  const value = line.slice(colon + 1).split(",")[0].trim();
  const dateOnly = params.VALUE === "DATE" || /^\d{8}$/.test(value);
  const matched = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/i);
  if (!matched) return null;
  const [, y, m, d, hh = "00", mm = "00", ss = "00", utc] = matched;
  const parts = { year: Number(y), month: Number(m), day: Number(d), hour: Number(hh), minute: Number(mm), second: Number(ss) };
  let date;
  if (utc) date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second));
  else if (params.TZID || fallbackTimezone) date = localTimeInZone(parts, params.TZID || fallbackTimezone);
  else date = new Date(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return { date, allDay: dateOnly, params, parts };
}

function localTimeInZone(parts, timezone) {
  const target = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  let guess = target;
  try {
    const formatter = new Intl.DateTimeFormat("en", {
      timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
    });
    for (let pass = 0; pass < 3; pass += 1) {
      const shown = Object.fromEntries(formatter.formatToParts(new Date(guess)).map((part) => [part.type, Number(part.value)]));
      const represented = Date.UTC(shown.year, shown.month - 1, shown.day, shown.hour, shown.minute, shown.second);
      const difference = target - represented;
      guess += difference;
      if (difference === 0) break;
    }
    return new Date(guess);
  } catch {
    return new Date(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  }
}

function unescapeIcs(value = "") {
  return value.replace(/\\[nN]/g, "\n").replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\").trim();
}

function unfoldedIcs(text) {
  return text.replace(/\r?\n[ \t]/g, "").replace(/\r?\n/g, "\n").split("\n").map((line) => line.trimEnd());
}

function eventProperties(lines) {
  const properties = new Map();
  for (const line of lines) {
    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const name = line.slice(0, colon).split(";")[0].toUpperCase();
    if (!properties.has(name)) properties.set(name, []);
    properties.get(name).push(line);
  }
  return properties;
}

function parseRule(line) {
  if (!line) return null;
  const value = line.slice(line.indexOf(":") + 1);
  return Object.fromEntries(value.split(";").map((part) => {
    const [key, ...rest] = part.split("=");
    return [key.toUpperCase(), rest.join("=").toUpperCase()];
  }));
}

function dateOrdinal(date) { return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000); }
function monthOrdinal(date) { return date.getFullYear() * 12 + date.getMonth(); }
function weekdayCode(date) { return ["SU", "MO", "TU", "WE", "TH", "FR", "SA"][date.getDay()]; }
function mondayWeekOrdinal(date) { return Math.floor((dateOrdinal(date) + 3) / 7); }

function ruleDateForMonth(yearNumber, monthNumber, start, rule) {
  if (rule.BYMONTHDAY) {
    const length = new Date(yearNumber, monthNumber + 1, 0).getDate();
    const requested = Number(rule.BYMONTHDAY.split(",")[0]);
    return new Date(yearNumber, monthNumber, requested < 0 ? length + requested + 1 : requested);
  }
  if (rule.BYDAY) {
    const match = rule.BYDAY.split(",")[0].match(/^([+-]?\d+)?(MO|TU|WE|TH|FR|SA|SU)$/);
    if (match) {
      const ordinal = Number(match[1] || 1);
      const weekday = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"].indexOf(match[2]);
      const length = new Date(yearNumber, monthNumber + 1, 0).getDate();
      if (ordinal > 0) {
        const first = new Date(yearNumber, monthNumber, 1).getDay();
        return new Date(yearNumber, monthNumber, 1 + ((weekday - first + 7) % 7) + (ordinal - 1) * 7);
      }
      const last = new Date(yearNumber, monthNumber, length).getDay();
      return new Date(yearNumber, monthNumber, length - ((last - weekday + 7) % 7) + (ordinal + 1) * 7);
    }
  }
  return new Date(yearNumber, monthNumber, Math.min(start.getDate(), new Date(yearNumber, monthNumber + 1, 0).getDate()));
}

function ruleOccurrenceIndex(start, target, rule) {
  if (!rule || !rule.FREQ) return -1;
  const frequency = rule.FREQ;
  const interval = Math.max(1, Number(rule.INTERVAL) || 1);
  const startDay = dateOrdinal(start);
  const targetDay = dateOrdinal(target);
  if (targetDay < startDay) return -1;

  let matches = [];
  if (frequency === "DAILY") {
    const difference = targetDay - startDay;
    if (difference % interval !== 0) return -1;
    return difference / interval;
  }
  if (frequency === "WEEKLY") {
    const weekdaySet = (rule.BYDAY ? rule.BYDAY.split(",").map((day) => day.slice(-2)) : [weekdayCode(start)]).filter((day) => ["MO", "TU", "WE", "TH", "FR", "SA", "SU"].includes(day));
    const weekDiff = mondayWeekOrdinal(target) - mondayWeekOrdinal(start);
    if (weekDiff < 0 || weekDiff % interval !== 0 || !weekdaySet.includes(weekdayCode(target))) return -1;
    for (let week = 0; week <= weekDiff; week += interval) {
      for (const code of weekdaySet) {
        const dayOffset = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"].indexOf(code);
        const weekStart = mondayWeekOrdinal(start) * 7 - 3;
        const occurrence = new Date((weekStart + week * 7 + dayOffset) * 86400000);
        if (dateOrdinal(occurrence) >= startDay && dateOrdinal(occurrence) <= targetDay) matches.push(occurrence);
      }
    }
  } else if (frequency === "MONTHLY") {
    const diff = monthOrdinal(target) - monthOrdinal(start);
    if (diff < 0 || diff % interval !== 0) return -1;
    for (let month = monthOrdinal(start); month <= monthOrdinal(target); month += interval) matches.push(ruleDateForMonth(Math.floor(month / 12), month % 12, start, rule));
  } else if (frequency === "YEARLY") {
    const yearDiff = target.getFullYear() - start.getFullYear();
    if (yearDiff < 0 || yearDiff % interval !== 0) return -1;
    for (let yearNumber = start.getFullYear(); yearNumber <= target.getFullYear(); yearNumber += interval) {
      matches.push(ruleDateForMonth(yearNumber, start.getMonth(), start, rule));
    }
  } else return -1;

  matches.sort((a, b) => dateOrdinal(a) - dateOrdinal(b));
  const index = matches.findIndex((date) => dateOrdinal(date) === targetDay);
  if (index < 0) return -1;
  return matches.length - 1;
}

function parseExdates(properties) {
  return new Set((properties.get("EXDATE") || []).flatMap((line) => {
    const [lhs, ...values] = line.split(":");
    const timezone = lhs.match(/TZID=([^;]+)/i)?.[1] || "";
    return values.join(":").split(",").map((value) => parseIcsDate(`${lhs}:${value}`, timezone)).filter(Boolean).map((date) => dateKey(date.date));
  }));
}

function parseCalendarEvents(text, targetDate = new Date()) {
  const lines = unfoldedIcs(text);
  const blocks = [];
  let current = null;
  for (const line of lines) {
    if (/^BEGIN:VEVENT$/i.test(line)) current = [];
    else if (/^END:VEVENT$/i.test(line) && current) { blocks.push(current); current = null; }
    else if (current) current.push(line);
  }

  const targetKey = dateKey(targetDate);
  const targetDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const output = [];
  for (const linesInEvent of blocks) {
    const properties = eventProperties(linesInEvent);
    const startLine = properties.get("DTSTART")?.[0];
    const startValue = parseIcsDate(startLine);
    if (!startValue) continue;
    const endValue = parseIcsDate(properties.get("DTEND")?.[0]);
    const duration = endValue && !startValue.allDay ? Math.max(0, endValue.date.getTime() - startValue.date.getTime()) : 0;
    const startKey = dateKey(startValue.date);
    const rule = parseRule(properties.get("RRULE")?.[0]);
    const exclusions = parseExdates(properties);
    const occurrenceIndex = startKey === targetKey ? 0 : ruleOccurrenceIndex(startValue.date, targetDay, rule);
    const extraDates = (properties.get("RDATE") || []).flatMap((line) => {
      const colon = line.indexOf(":");
      return colon < 0 ? [] : line.slice(colon + 1).split(",").map((value) => parseIcsDate(`${line.slice(0, colon)}:${value}`)).filter(Boolean);
    });
    const hasRdate = extraDates.some((date) => dateKey(date.date) === targetKey);
    const matches = (startKey === targetKey || occurrenceIndex >= 0 || hasRdate) && !exclusions.has(targetKey);
    if (!matches) continue;
    if (rule && Number(rule.COUNT) > 0 && occurrenceIndex >= Number(rule.COUNT)) continue;
    if (rule?.UNTIL) {
      const until = parseIcsDate(`UNTIL:${rule.UNTIL}`);
      if (until && targetDay > until.date) continue;
    }

    const summary = unescapeIcs(properties.get("SUMMARY")?.[0]?.slice(properties.get("SUMMARY")[0].indexOf(":") + 1) || "Untitled event");
    const location = unescapeIcs(properties.get("LOCATION")?.[0]?.slice(properties.get("LOCATION")[0].indexOf(":") + 1) || "");
    const occurrenceDate = hasRdate && occurrenceIndex < 0 ? extraDates.find((date) => dateKey(date.date) === targetKey).date : new Date(targetDay.getFullYear(), targetDay.getMonth(), targetDay.getDate(), startValue.date.getHours(), startValue.date.getMinutes(), startValue.date.getSeconds());
    output.push({ summary, location, start: startValue.allDay ? "" : occurrenceDate.toISOString(), allDay: startValue.allDay, _time: occurrenceDate.getTime() });
  }

  const unique = new Map();
  output.forEach((event) => unique.set(`${event.summary}:${event.start}:${event.allDay}`, event));
  return [...unique.values()].sort((a, b) => Number(b.allDay) - Number(a.allDay) || a._time - b._time).map(({ _time, ...event }) => event);
}

export async function loadCalendarFeed(calendar, { targetDate = new Date(), fetchImpl = globalThis.fetch } = {}) {
  let timer;
  try {
    let payload = calendar.kind === "file" ? calendar.icsContent : "";
    if (calendar.kind !== "file") {
      const controller = new AbortController();
      timer = setTimeout(() => controller.abort(), FEED_TIMEOUT_MS);
      const response = await fetchImpl(browserCalendarUrl(calendar.url), {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
        headers: { Accept: "text/calendar,text/plain;q=0.9,*/*;q=0.5" },
      });
      payload = await response.text();
      if (!response.ok) {
        let message = "";
        try { message = JSON.parse(payload).error || ""; } catch { /* Use the HTTP status below. */ }
        throw new Error(message || `The calendar feed returned HTTP ${response.status}.`);
      }
    }

    if (!isIcsCalendar(payload)) throw new Error("The link did not return a valid iCal calendar.");
    return { ok: true, events: parseCalendarEvents(payload, targetDate).slice(0, MAX_EVENTS_PER_FEED) };
  } catch (error) {
    const timeout = error.name === "AbortError";
    const message = timeout
      ? "The calendar took too long to respond."
      : calendar.kind !== "file" && error instanceof TypeError
        ? "The feed could not be read by this browser. Server-free sync requires the provider to allow cross-origin requests."
        : error.message || "Couldn’t refresh the calendar.";
    return { ok: false, timeout, message };
  } finally {
    clearTimeout(timer);
  }
}
