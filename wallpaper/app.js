const palettes = [
  { name: "January", short: "Jan", base: "#c9d7d9", deep: "#94aeb3", light: "#e6e5d5", season: "Quiet winter light", scene: "january", night: { base: "#24353c", deep: "#17262e", light: "#34464c" } },
  { name: "February", short: "Feb", base: "#e1c0c0", deep: "#bd9095", light: "#f0dcd0", season: "The last cold mornings", scene: "february", night: { base: "#382e36", deep: "#291f2b", light: "#493842" } },
  { name: "March", short: "Mar", base: "#d0d7c0", deep: "#a7b48f", light: "#ece3c9", season: "First signs of green", scene: "march", night: { base: "#30392b", deep: "#212a20", light: "#404b36" } },
  { name: "April", short: "Apr", base: "#e7c5a9", deep: "#c69b7e", light: "#f2dfc0", season: "New leaves and longer days", scene: "april", night: { base: "#3e3027", deep: "#2e211c", light: "#50392b" } },
  { name: "May", short: "May", base: "#c4d7d4", deep: "#97b8b3", light: "#e7e7d2", season: "The year opens up", scene: "may", night: { base: "#263934", deep: "#182a27", light: "#374a40" } },
  { name: "June", short: "Jun", base: "#e4d0a0", deep: "#c5ac76", light: "#f2e6bf", season: "Early summer warmth", scene: "june", night: { base: "#3f3823", deep: "#2c291a", light: "#51452b" } },
  { name: "July", short: "Jul", base: "#c7d1a7", deep: "#a1b17f", light: "#e8dfac", season: "High summer, outside late", scene: "july", night: { base: "#323b26", deep: "#232d1c", light: "#435036" } },
  { name: "August", short: "Aug", base: "#e5bd9e", deep: "#c99478", light: "#f0d4a1", season: "Long afternoons", scene: "august", night: { base: "#413026", deep: "#2f221e", light: "#53402d" } },
  { name: "September", short: "Sep", base: "#d7d2ad", deep: "#b4af8a", light: "#e8d7a9", season: "The first cooler evenings", scene: "september", night: { base: "#373525", deep: "#27271c", light: "#494832" } },
  { name: "October", short: "Oct", base: "#e5b89d", deep: "#bf8f79", light: "#f1d4a1", season: "Warm light, late autumn", scene: "october", night: { base: "#44312a", deep: "#32221e", light: "#584033" } },
  { name: "November", short: "Nov", base: "#d2bbc1", deep: "#ad929c", light: "#e4cbb9", season: "Short days, soft color", scene: "november", night: { base: "#3a2f38", deep: "#2b202a", light: "#4a3b47" } },
  { name: "December", short: "Dec", base: "#c5d3df", deep: "#9eafc2", light: "#d7dbd1", season: "Winter finds its rhythm", scene: "december", night: { base: "#273543", deep: "#1a2634", light: "#39495a" } },
];

const monthMarks = [
  '<path d="M16 4v24M5.6 10l20.8 12M5.6 22 26.4 10M12 6l4 4 4-4M12 26l4-4 4 4M7 14l4-4-1-5m15 11-4 4 1 5M7 18l4 4-1 5m15-11-4-4 1-5"/>',
  '<ellipse cx="16" cy="8" rx="3.3" ry="4"/><ellipse cx="16" cy="8" rx="3.3" ry="4" transform="rotate(60 16 16)"/><ellipse cx="16" cy="8" rx="3.3" ry="4" transform="rotate(120 16 16)"/><circle cx="16" cy="16" r="2"/>',
  '<path d="M16 27V12m0 9c-1-5-5-8-10-8 1 5 4 8 10 8Zm0-5c1-5 5-8 10-8-1 5-4 8-10 8Z"/>',
  '<path d="M7 19h17a4 4 0 0 0 0-8 7 7 0 0 0-13-1 4.5 4.5 0 0 0-4 9Zm4 4-1 3m7-3-1 3m7-3-1 3"/>',
  '<path d="M8 26c5-5 8-11 8-19m-4 9c-4 0-6-2-7-5 4 0 6 2 7 5Zm5-5c4 0 6-2 7-5-4 0-6 2-7 5Z"/><circle cx="9" cy="8" r="2"/><circle cx="22" cy="8" r="2"/>',
  '<circle cx="16" cy="16" r="4"/><path d="M16 3v5m0 16v5M3 16h5m16 0h5M7 7l4 4m10 10 4 4M25 7l-4 4m-10 10-4 4"/>',
  '<path d="M16 28V9m0 12c-7 0-10-4-10-10 6 0 10 3 10 10Zm0-7c0-6 4-10 10-10 0 6-4 10-10 10Z"/>',
  '<circle cx="22" cy="9" r="4"/><path d="M16 9h.1M22 3v-2M28 9h2M10 21c3-2 6 2 9 0s6 2 9 0M7 27c3-2 6 2 9 0s6 2 9 0"/>',
  '<path d="M16 27V8m0 8-6-5m6 10-7-2m7-6 6-5m-6 16 7-4"/><path d="M16 6c-1-3 1-4 3-5m-3 5c-3-2-4-4-3-6m3 6c2-3 4-4 7-3"/>',
  '<path d="M16 27c-1-6-4-10-8-13l5-2 1-6 4 5 6-1-3 5 3 4c-4 0-6 3-8 8Z"/><path d="m11 14 10 4m-5-7-1 12"/>',
  '<path d="M7 26c5-5 7-10 8-16m-7 8c-3-2-4-4-4-7 4 1 6 3 6 7Zm6-7c0-4 2-6 5-8 1 4-1 7-5 8Zm2 3c3-3 6-3 9-2-2 4-5 5-9 2Z"/><circle cx="7" cy="7" r="1.5"/><circle cx="23" cy="8" r="1.5"/>',
  '<path d="m16 4 3 5h-2l4 5h-2l5 6H8l5-6h-2l4-5h-2l3-5Zm-2 16h4v7h-4z"/><circle cx="7" cy="8" r="1"/><circle cx="25" cy="12" r="1"/>',
];

const STORAGE_KEY = "better-creating-wallpaper-settings";
const SETTINGS_UPDATED_AT_KEY = `${STORAGE_KEY}:updatedAt`;
const MAX_ICS_FILE_BYTES = 2 * 1024 * 1024;
const systemLocale = navigator.languages?.[0] || navigator.language || Intl.DateTimeFormat().resolvedOptions().locale;
const systemLocaleData = typeof Intl.Locale === "function" ? new Intl.Locale(systemLocale).maximize() : null;
const query = new URLSearchParams(window.location.search);
let previewDesign = ["seasonal", "field-guide", "evening"].includes(query.get("look")) ? query.get("look") : "";
const pageBaseUrl = new URL("./", window.location.href);
const localHostnames = new Set(["localhost", "127.0.0.1", "[::1]"]);
const localApiBaseUrl = localHostnames.has(window.location.hostname) ? new URL("api/", pageBaseUrl) : null;
const colorSchemePreference = window.matchMedia("(prefers-color-scheme: dark)");
let prefersDarkScheme = colorSchemePreference.matches;
const monthPicker = document.querySelector("[data-month-picker]");
const wallpaper = document.querySelector("#wallpaper-art");
const miniCalendar = document.querySelector("[data-calendar]");
const calendarGrid = document.querySelector("[data-calendar-grid]");
const agenda = document.querySelector("[data-agenda]");
const agendaItems = document.querySelector("[data-agenda-items]");
const agendaDate = document.querySelector("[data-agenda-date]");
const editor = document.querySelector("[data-settings-dialog]");
const customizeButton = document.querySelector("[data-open-editor]");
const calendarForm = document.querySelector("[data-calendar-form]");
const calendarNameInput = document.querySelector("#ical-name");
const calendarInput = document.querySelector("#ical-url");
const calendarFileInput = document.querySelector("[data-calendar-file]");
const addCalendarFileButton = document.querySelector("[data-add-calendar-file]");
const calendarDropzone = document.querySelector("[data-calendar-dropzone]");
const refreshAllButton = document.querySelector("[data-refresh-calendars]");
const calendarList = document.querySelector("[data-calendar-list]");
const calendarStatus = document.querySelector("[data-calendar-status]");
const toast = document.querySelector("[data-toast]");
const weatherWidget = document.querySelector("[data-weather-widget]");
const weatherLocationLabel = document.querySelector("[data-weather-location]");
const weatherIcon = document.querySelector("[data-weather-icon]");
const weatherTemperature = document.querySelector("[data-weather-temperature]");
const weatherSummary = document.querySelector("[data-weather-summary]");
const weatherRange = document.querySelector("[data-weather-range]");
const weatherRefreshButton = document.querySelector("[data-weather-refresh]");
const weatherSelectedLocation = document.querySelector("[data-weather-selected-location]");
const weatherSearchForm = document.querySelector("[data-weather-search-form]");
const weatherSearchButton = document.querySelector("[data-weather-search]");
const weatherLocationInput = document.querySelector("[name='location']");
const weatherLocationResults = document.querySelector("[data-weather-results]");
const weatherSettingsStatus = document.querySelector("[data-weather-status]");
const currentLocationButton = document.querySelector("[data-use-current-location]");
const weatherRequests = new Map();
const weatherCache = new Map();
let weatherSearchResults = [];
let weatherStatusMessage = "";
let weatherStatusState = "";

let today = new Date();
let year = today.getFullYear();
let currentMonth = today.getMonth();
let todayDate = today.getDate();
let currentDateKey = dateKey(today);
const refreshingCalendars = new Set();
const settingsCard = document.querySelector(".settings-card");

function syncSettingsScrollCue() {
  const canScroll = settingsCard.scrollHeight > settingsCard.clientHeight + 8;
  settingsCard.dataset.canScroll = String(canScroll);
  settingsCard.dataset.atBottom = String(settingsCard.scrollTop + settingsCard.clientHeight >= settingsCard.scrollHeight - 8);
}

function intParam(value, fallback, min, max) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= min && parsed <= max ? parsed : fallback;
}

function validCalendarUrl(value) {
  if (typeof value !== "string" || value.length > 3000) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    if (!["http:", "https:", "webcal:"].includes(url.protocol) || url.username || url.password) return "";
    return url.href;
  } catch {
    return "";
  }
}

function isIcsCalendar(value) {
  if (typeof value !== "string") return false;
  const text = value.replace(/^\uFEFF/, "");
  return /^BEGIN:VCALENDAR\s*$/im.test(text) && /^END:VCALENDAR\s*$/im.test(text);
}

function readCalendarFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(typeof reader.result === "string" ? reader.result : ""), { once: true });
    reader.addEventListener("error", () => reject(reader.error || new Error("The file could not be read.")), { once: true });
    reader.readAsText(file);
  });
}

function browserCalendarUrl(value) {
  const url = new URL(value);
  if (url.protocol === "webcal:") url.protocol = "https:";
  return url.href;
}

function localApiUrl(path) {
  return localApiBaseUrl ? new URL(path, localApiBaseUrl).href : "";
}

function storedSettings() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function legacySettings() {
  const followLocalDate = query.get("follow") === "today" || !query.has("month");
  return {
    month: followLocalDate ? currentMonth : intParam(query.get("month"), currentMonth, 0, 11),
    style: query.get("style") === "solid" ? "solid" : "gradient",
    hemisphere: query.get("hemisphere") === "south" ? "south" : "north",
    layout: ["combined", "big-date", "calendar", "minimal"].includes(query.get("layout")) ? query.get("layout") : "combined",
    showCalendar: query.get("calendar") !== "off",
    showAgenda: query.get("agenda") === "on",
    showWeather: query.get("weather") !== "off",
    ratio: query.get("ratio") === "16:9" ? "16:9" : "16:10",
    followLocalDate,
  };
}

function defaultSettings() {
  return {
    month: currentMonth,
    design: "seasonal",
    style: "gradient",
    hemisphere: "north",
    layout: "combined",
    showCalendar: true,
    showAgenda: false,
    showWeather: true,
    dateFormat: "system",
    timeFormat: "system",
    weekStart: "system",
    temperatureUnit: "system",
    weatherLocation: null,
    ratio: "16:10",
    followLocalDate: true,
    calendars: [],
  };
}

function createCalendarId() {
  return typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `calendar-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeEvents(events) {
  return Array.isArray(events) ? events.slice(0, 60).filter((event) => event && typeof event.summary === "string").map((event) => ({
    summary: event.summary.slice(0, 200),
    location: typeof event.location === "string" ? event.location.slice(0, 200) : "",
    start: typeof event.start === "string" ? event.start : "",
    allDay: event.allDay === true,
  })) : [];
}

function normalizeCalendar(calendar, index) {
  const id = typeof calendar?.id === "string" && calendar.id ? calendar.id : createCalendarId();
  const name = typeof calendar?.name === "string" && calendar.name.trim() ? calendar.name.trim().slice(0, 60) : `Calendar ${index + 1}`;
  if (calendar?.kind === "file") {
    if (!isIcsCalendar(calendar.icsContent)) return null;
    return {
      id,
      name,
      kind: "file",
      icsContent: calendar.icsContent,
      events: normalizeEvents(calendar.events),
      eventsDate: typeof calendar.eventsDate === "string" ? calendar.eventsDate : currentDateKey,
      lastSync: typeof calendar.lastSync === "string" ? calendar.lastSync : "",
    };
  }
  const url = validCalendarUrl(calendar?.url);
  if (!url) return null;
  return {
    id,
    name,
    kind: "url",
    url,
    events: normalizeEvents(calendar.events),
    eventsDate: typeof calendar.eventsDate === "string" ? calendar.eventsDate : currentDateKey,
    lastSync: typeof calendar.lastSync === "string" ? calendar.lastSync : "",
  };
}

function normalizeSettings(value) {
  const defaults = defaultSettings();
  const source = value && typeof value === "object" ? value : {};
  const useLegacySystemFormats = source.useSystemFormats !== false;
  const sourceCalendars = Array.isArray(source.calendars)
    ? source.calendars
    : source.icalUrl
      ? [{
          name: "Calendar 1",
          url: source.icalUrl,
          events: source.events,
          eventsDate: source.eventsDate,
          lastSync: source.lastSync,
        }]
      : [];
  return {
    month: intParam(source.month, defaults.month, 0, 11),
    design: ["seasonal", "field-guide", "evening"].includes(source.design) ? source.design : defaults.design,
    style: source.style === "solid" ? "solid" : "gradient",
    hemisphere: source.hemisphere === "south" ? "south" : "north",
    layout: ["combined", "big-date", "calendar", "minimal"].includes(source.layout) ? source.layout : "combined",
    showCalendar: source.showCalendar !== false,
    showAgenda: source.showAgenda === true,
    showWeather: source.showWeather !== false,
    dateFormat: ["system", "dmy", "mdy", "iso"].includes(source.dateFormat) ? source.dateFormat : (useLegacySystemFormats ? defaults.dateFormat : "mdy"),
    timeFormat: ["system", "12h", "24h"].includes(source.timeFormat) ? source.timeFormat : (useLegacySystemFormats ? defaults.timeFormat : "12h"),
    weekStart: ["system", "sunday", "monday", "saturday"].includes(source.weekStart) ? source.weekStart : (useLegacySystemFormats ? defaults.weekStart : "sunday"),
    temperatureUnit: ["system", "celsius", "fahrenheit"].includes(source.temperatureUnit) ? source.temperatureUnit : (useLegacySystemFormats ? defaults.temperatureUnit : "fahrenheit"),
    weatherLocation: normalizeWeatherLocation(source.weatherLocation),
    ratio: source.ratio === "16:9" ? "16:9" : "16:10",
    followLocalDate: source.followLocalDate !== false,
    calendars: sourceCalendars.map(normalizeCalendar).filter(Boolean),
  };
}

function normalizeWeatherLocation(location) {
  if (!location || typeof location !== "object") return null;
  const { latitude, longitude } = location;
  if (typeof latitude !== "number" || typeof longitude !== "number") return null;
  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) return null;
  const name = typeof location.name === "string" && location.name.trim() ? location.name.trim().slice(0, 100) : "Selected location";
  return { latitude, longitude, name };
}

const saved = storedSettings();
const state = normalizeSettings(saved || { ...defaultSettings(), ...legacySettings() });

function activeDesign() {
  return previewDesign || state.design;
}

function clearDesignPreview() {
  previewDesign = "";
  query.delete("look");
  const search = query.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`);
}

let initializingSettings = true;
let settingsFileReady = false;
let settingsRevision = 0;
let settingsSaveTimer = 0;
let settingsSaveInFlight = false;
let settingsSaveAgain = false;

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Keep the wallpaper usable for this session when storage is unavailable.
  }
  if (initializingSettings || !localApiBaseUrl) return;
  settingsRevision += 1;
  if (!settingsFileReady) return;
  try { window.localStorage.setItem(SETTINGS_UPDATED_AT_KEY, String(Date.now())); } catch { /* The local file remains the durable copy. */ }
  scheduleSettingsFileSave();
}

function scheduleSettingsFileSave() {
  window.clearTimeout(settingsSaveTimer);
  settingsSaveTimer = window.setTimeout(() => saveSettingsFile(), 180);
}

async function saveSettingsFile(keepalive = false) {
  if (!settingsFileReady) return;
  window.clearTimeout(settingsSaveTimer);
  if (settingsSaveInFlight) {
    settingsSaveAgain = true;
    return;
  }
  settingsSaveInFlight = true;
  settingsSaveAgain = false;
  const revision = settingsRevision;
  try {
    const response = await fetch(localApiUrl("settings"), {
      method: "PUT",
      cache: "no-store",
      keepalive,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ settings: state }),
    });
    if (!response.ok) throw new Error("Could not save wallpaper settings.");
    const record = await response.json();
    if (revision === settingsRevision && Number(record.updatedAt) > 0) {
      try { window.localStorage.setItem(SETTINGS_UPDATED_AT_KEY, String(record.updatedAt)); } catch { /* The saved file remains authoritative. */ }
    }
  } catch {
    // localStorage remains available if the local server is temporarily offline.
  } finally {
    settingsSaveInFlight = false;
    if (settingsSaveAgain || revision !== settingsRevision) scheduleSettingsFileSave();
  }
}

async function loadSettingsFile() {
  if (!localApiBaseUrl) return;
  const initialRevision = settingsRevision;
  let localUpdatedAt = 0;
  try { localUpdatedAt = Number(window.localStorage.getItem(SETTINGS_UPDATED_AT_KEY)) || 0; } catch { /* The local file can still restore settings. */ }
  let record = null;
  try {
    const response = await fetch(localApiUrl("settings"), { method: "GET", cache: "no-store", headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Could not load wallpaper settings.");
    record = await response.json();
  } catch {
    // Use the browser copy if the local server is unavailable.
  }

  if (settingsRevision === initialRevision && record?.settings && (localUpdatedAt === 0 || Number(record.updatedAt) >= localUpdatedAt)) {
    Object.assign(state, normalizeSettings(record.settings));
  }
  settingsFileReady = true;
  render();
}

function activePalette(monthIndex = state.month) {
  const offset = state.hemisphere === "south" ? 6 : 0;
  const palette = palettes[(monthIndex + offset) % palettes.length];
  return prefersDarkScheme ? { ...palette, ...palette.night } : palette;
}

function selectedDate() {
  return new Date(year, currentMonth, todayDate);
}

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatSystemDate(date, options) {
  const formatterOptions = { ...options };
  if (formatterOptions.hour && state.timeFormat !== "system") formatterOptions.hourCycle = state.timeFormat === "24h" ? "h23" : "h12";
  const formatter = new Intl.DateTimeFormat(systemLocale, formatterOptions);
  if (state.dateFormat === "system" || !options.month || !options.day) {
    if (state.dateFormat === "iso" && options.month && options.year) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    }
    return formatter.format(date);
  }

  if (state.dateFormat === "iso") {
    const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const weekday = options.weekday ? formatter.formatToParts(date).find((part) => part.type === "weekday")?.value : "";
    return weekday ? `${isoDate} (${weekday})` : isoDate;
  }

  const parts = formatter.formatToParts(date);
  const part = (type) => parts.find((item) => item.type === type)?.value || "";
  const day = part("day");
  const month = part("month");
  const year = options.year ? part("year") : "";
  const weekday = options.weekday ? part("weekday") : "";
  const textualMonth = ["long", "short", "narrow"].includes(options.month);
  let formattedDate;

  if (textualMonth) {
    formattedDate = state.dateFormat === "dmy"
      ? [day, month, year].filter(Boolean).join(" ")
      : `${month} ${day}${year ? `, ${year}` : ""}`;
  } else {
    const orderedParts = state.dateFormat === "dmy" ? [day, month, year] : [month, day, year];
    formattedDate = orderedParts.filter(Boolean).join("/");
  }

  return weekday ? `${weekday}, ${formattedDate}` : formattedDate;
}

function formatSystemNumber(value) {
  return new Intl.NumberFormat(systemLocale, { useGrouping: false }).format(value);
}

function formattingRegion() {
  const region = systemLocaleData?.region;
  if (region) return region;
  return systemLocale.split("-").slice(1).find((part) => /^[a-z]{2}$/i.test(part))?.toUpperCase() || "";
}

function formatLocaleUppercase(value) {
  return value.toLocaleUpperCase(systemLocale);
}

function firstWeekdayIndex() {
  if (state.weekStart !== "system") return { sunday: 0, monday: 1, saturday: 6 }[state.weekStart];
  try {
    const weekInfo = systemLocaleData?.getWeekInfo?.() || systemLocaleData?.weekInfo;
    if (Number.isInteger(weekInfo?.firstDay)) return weekInfo.firstDay % 7;
  } catch { /* Older browsers use the locale-region fallback below. */ }

  const region = formattingRegion();
  if (["US", "CA", "JP", "KR", "TW", "PH", "BR", "MX", "CO", "DO", "GT", "HN", "NI", "PA", "PE", "PR", "SV", "TH", "VE"].includes(region)) return 0;
  if (["AF", "BH", "DJ", "DZ", "EG", "IR", "IQ", "JO", "KW", "LY", "OM", "QA", "SD", "SY"].includes(region)) return 6;
  return 1;
}

function weatherTemperatureUnit() {
  if (state.temperatureUnit !== "system") return state.temperatureUnit;
  const preference = systemLocale.match(/-u(?:-[a-z0-9]{2,8})*-ms-(ussystem|uksystem|metric)(?:-|$)/i)?.[1]?.toLowerCase();
  if (preference) return preference === "ussystem" ? "fahrenheit" : "celsius";
  return ["US", "BS", "BZ", "KY", "PW", "LR"].includes(formattingRegion()) ? "fahrenheit" : "celsius";
}

function monthSwatch(index) {
  const palette = activePalette(index);
  return `linear-gradient(140deg, ${palette.light} 0%, ${palette.base} 52%, ${palette.deep} 100%)`;
}

function renderMonthPicker() {
  monthPicker.innerHTML = palettes.map((month, index) => {
    const date = new Date(2023, index, 1);
    const monthName = formatSystemDate(date, { month: "long" });
    const monthShort = formatSystemDate(date, { month: "short" });
    return `
    <button class="month-choice" type="button" data-month-index="${index}" aria-pressed="${index === state.month}" aria-label="${monthName}${index === state.month ? ", selected" : ""}" title="${monthName}">
      <span class="month-swatch" aria-hidden="true" style="background:${monthSwatch(index)};--month-mark-color:${activePalette(index).deep}"><svg class="month-mark" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${monthMarks[index]}</svg></span>
      <span class="month-short">${monthShort}</span>
    </button>`;
  }).join("");
}

function renderCalendar() {
  const calendarDate = new Date(year, currentMonth, 1);
  const monthYear = formatSystemDate(calendarDate, { month: "long", year: "numeric" });
  const date = selectedDate();
  const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
  const weekStart = firstWeekdayIndex();
  const firstDay = (calendarDate.getDay() - weekStart + 7) % 7;
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const weekdayDate = new Date(2023, 0, 1 + ((weekStart + index) % 7));
    return {
      short: formatSystemDate(weekdayDate, { weekday: "narrow" }),
      full: formatSystemDate(weekdayDate, { weekday: "long" }),
    };
  });
  const cells = weekdays.map(({ short, full }) => `<span class="calendar-cell weekday" role="columnheader" aria-label="${full}">${short}</span>`);

  for (let index = 0; index < firstDay; index += 1) cells.push('<span class="calendar-cell" aria-hidden="true"></span>');
  for (let day = 1; day <= daysInMonth; day += 1) {
    const isToday = day === date.getDate();
    const calendarDay = new Date(year, currentMonth, day);
    const fullDate = formatSystemDate(calendarDay, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    cells.push(`<span class="calendar-cell${isToday ? " is-today" : ""}" role="gridcell" aria-label="${fullDate}${isToday ? ", today" : ""}">${formatSystemNumber(day)}</span>`);
  }

  calendarGrid.innerHTML = cells.join("");
  calendarGrid.setAttribute("aria-label", monthYear);
  miniCalendar.setAttribute("aria-label", `${monthYear} calendar`);
}

function syncControls() {
  document.querySelectorAll("[data-style-choice]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.styleChoice === state.style)));
  document.querySelectorAll("[data-design-choice]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.designChoice === activeDesign())));
  document.querySelectorAll("[data-hemisphere-choice]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.hemisphereChoice === state.hemisphere)));
  document.querySelectorAll("[data-layout-choice]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.layoutChoice === state.layout)));
  document.querySelectorAll("[data-aspect-choice]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.aspectChoice === state.ratio)));

  const calendarToggle = document.querySelector("[data-toggle-calendar]");
  calendarToggle.setAttribute("aria-pressed", String(state.showCalendar));
  calendarToggle.setAttribute("aria-label", `${state.showCalendar ? "Hide" : "Show"} month calendar`);
  const agendaToggle = document.querySelector("[data-toggle-agenda]");
  agendaToggle.setAttribute("aria-pressed", String(state.showAgenda));
  agendaToggle.setAttribute("aria-label", `${state.showAgenda ? "Hide" : "Show"} today's events`);
  const weatherToggle = document.querySelector("[data-toggle-weather]");
  weatherToggle.setAttribute("aria-pressed", String(state.showWeather));
  weatherToggle.setAttribute("aria-label", `${state.showWeather ? "Hide" : "Show"} weather`);
  document.querySelector("[data-date-format]").value = state.dateFormat;
  document.querySelector("[data-time-format]").value = state.timeFormat;
  document.querySelector("[data-week-start]").value = state.weekStart;
  document.querySelector("[data-temperature-unit]").value = state.temperatureUnit;

  const followMonthToggle = document.querySelector("[data-toggle-follow-month]");
  followMonthToggle.setAttribute("aria-pressed", String(state.followLocalDate));
  followMonthToggle.setAttribute("aria-label", state.followLocalDate ? "Pause automatic monthly background" : "Follow the current month automatically");
  document.querySelector("[data-follow-status]").textContent = state.followLocalDate
    ? "Background updates when the month turns."
    : `Showing ${palettes[state.month].name}; turn this on to follow today.`;

  document.querySelector(".style-swatch-gradient").style.background = monthSwatch(state.month);
  document.querySelector(".style-swatch-solid").style.background = activePalette().base;

  renderCalendarList();
}

function render() {
  const month = palettes[state.month];
  const calendarMonthDate = new Date(year, currentMonth, 1);
  const calendarMonthName = formatSystemDate(calendarMonthDate, { month: "long" });
  const calendarMonthYear = formatSystemDate(calendarMonthDate, { month: "long", year: "numeric" });
  const palette = activePalette();
  const date = selectedDate();
  const weekday = formatSystemDate(date, { weekday: "long" });

  wallpaper.style.setProperty("--wallpaper-base", palette.base);
  wallpaper.style.setProperty("--wallpaper-deep", palette.deep);
  wallpaper.style.setProperty("--wallpaper-light", palette.light);
  wallpaper.style.setProperty("--palette-base", palette.base);
  wallpaper.style.setProperty("--palette-deep", palette.deep);
  wallpaper.style.setProperty("--palette-light", palette.light);
  wallpaper.style.setProperty("--wallpaper-ink", prefersDarkScheme ? "#f1f0e5" : "#202b24");
  wallpaper.style.setProperty("--wallpaper-today-bg", prefersDarkScheme ? "#ecd092" : "#202b24");
  wallpaper.style.setProperty("--wallpaper-today-ink", prefersDarkScheme ? "#29352e" : palette.light);
  wallpaper.dataset.scheme = prefersDarkScheme ? "dark" : "light";
  wallpaper.dataset.scene = palette.scene;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", palette.base);
  wallpaper.dataset.style = state.style;
  wallpaper.dataset.design = activeDesign();
  document.documentElement.dataset.look = activeDesign();
  wallpaper.dataset.layout = state.layout;
  wallpaper.dataset.ratio = state.ratio;
  wallpaper.dataset.showCalendar = String(state.showCalendar);
  wallpaper.dataset.showAgenda = String(state.showAgenda);
  wallpaper.dataset.showWeather = String(state.showWeather);
  const hasWidgets = state.showAgenda || state.showWeather || (state.showCalendar && !["big-date", "minimal"].includes(state.layout));
  wallpaper.dataset.hasWidgets = String(hasWidgets);
  wallpaper.setAttribute("aria-label", `${calendarMonthYear} calendar wallpaper with ${month.name} seasonal colors`);

  document.querySelector("[data-wallpaper-month]").textContent = calendarMonthYear;
  document.querySelector("[data-wallpaper-day]").textContent = formatSystemNumber(date.getDate());
  document.querySelector("[data-wallpaper-weekday]").textContent = weekday;
  document.querySelector("[data-calendar-title]").textContent = formatLocaleUppercase(calendarMonthName);
  document.querySelector("[data-calendar-year]").textContent = formatSystemDate(calendarMonthDate, { year: "numeric" });
  document.querySelector("[data-step-month]").textContent = month.name;
  document.querySelector("[data-step-season]").textContent = month.season;
  agendaDate.textContent = formatLocaleUppercase(formatSystemDate(date, { year: "numeric", month: "2-digit", day: "2-digit" }));

  miniCalendar.hidden = !state.showCalendar;
  agenda.hidden = !state.showAgenda;
  weatherWidget.hidden = !state.showWeather;
  renderWeather();
  renderAgendaItems();
  renderCalendar();
  renderMonthPicker();
  syncControls();
  persist();
}

function weatherLocationKey(location = state.weatherLocation) {
  if (!location) return "";
  const unit = weatherTemperatureUnit();
  return `${location.latitude.toFixed(4)},${location.longitude.toFixed(4)},${unit}`;
}

function renderWeather() {
  const location = state.weatherLocation;
  const key = weatherLocationKey(location);
  weatherLocationLabel.textContent = location?.name || "Location not set";
  weatherSelectedLocation.textContent = location?.name || "No location selected";
  weatherRefreshButton.disabled = !location;
  weatherSettingsStatus.textContent = weatherStatusMessage;
  weatherSettingsStatus.dataset.state = weatherStatusState;

  if (!location) {
    weatherTemperature.textContent = "—°";
    weatherIcon.textContent = "☼";
    weatherSummary.textContent = "Set a location to see current conditions.";
    weatherRange.textContent = "";
    return;
  }

  const cached = weatherCache.get(key);
  if (cached) showWeatherReading(cached);
  else {
    weatherTemperature.textContent = "—°";
    weatherIcon.textContent = "…";
    weatherSummary.textContent = "Loading local conditions…";
    weatherRange.textContent = "";
  }
  if (state.showWeather && (!cached || Date.now() - cached.fetchedAt > 30 * 60 * 1000)) loadWeather();
}

function weatherDescription(code, isDay) {
  if (code === 0) return { label: isDay ? "Clear sky" : "Clear night", icon: isDay ? "☀" : "☾" };
  if (code === 1) return { label: "Mostly clear", icon: isDay ? "◐" : "☾" };
  if (code === 2) return { label: "Partly cloudy", icon: "◐" };
  if (code === 3) return { label: "Overcast", icon: "☁" };
  if ([45, 48].includes(code)) return { label: "Fog", icon: "≋" };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: "Drizzle", icon: "☂" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: "Rain", icon: "☂" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: "Snow", icon: "❄" };
  if ([95, 96, 99].includes(code)) return { label: "Thunderstorm", icon: "ϟ" };
  return { label: "Conditions unavailable", icon: "—" };
}

function showWeatherReading(reading) {
  const description = weatherDescription(reading.code, reading.isDay);
  const unit = reading.unit === "fahrenheit" ? "°F" : "°C";
  weatherIcon.textContent = description.icon;
  weatherTemperature.textContent = `${formatSystemNumber(Math.round(reading.temperature))}${unit}`;
  weatherSummary.textContent = description.label;
  weatherRange.textContent = `H ${formatSystemNumber(Math.round(reading.high))}${unit}  ·  L ${formatSystemNumber(Math.round(reading.low))}${unit}`;
}

async function loadWeather(force = false) {
  const location = state.weatherLocation;
  const key = weatherLocationKey(location);
  if (!location || !key) return;
  const cached = weatherCache.get(key);
  if (!force && cached && Date.now() - cached.fetchedAt < 30 * 60 * 1000) {
    showWeatherReading(cached);
    return;
  }
  if (weatherRequests.has(key)) return weatherRequests.get(key);

  const unit = key.endsWith(",fahrenheit") ? "fahrenheit" : "celsius";
  const endpoint = new URL("https://api.open-meteo.com/v1/forecast");
  endpoint.search = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: "temperature_2m,weather_code,is_day",
    daily: "temperature_2m_max,temperature_2m_min",
    temperature_unit: unit,
    timezone: "auto",
    forecast_days: "1",
  }).toString();
  const request = (async () => {
    try {
      const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Weather service unavailable.");
      const result = await response.json();
      const current = result.current;
      const high = result.daily?.temperature_2m_max?.[0];
      const low = result.daily?.temperature_2m_min?.[0];
      if (![current?.temperature_2m, current?.weather_code, high, low].every(Number.isFinite)) throw new Error("Weather data is incomplete.");
      const reading = {
        temperature: current.temperature_2m,
        code: current.weather_code,
        isDay: current.is_day === 1,
        high,
        low,
        unit,
        fetchedAt: Date.now(),
      };
      weatherCache.set(key, reading);
      if (weatherLocationKey() === key) showWeatherReading(reading);
    } catch {
      if (weatherLocationKey() === key && !weatherCache.has(key)) {
        weatherTemperature.textContent = "—°";
        weatherIcon.textContent = "!";
        weatherSummary.textContent = "Weather is unavailable right now.";
        weatherRange.textContent = "Try refreshing in a moment.";
      }
    } finally {
      weatherRequests.delete(key);
    }
  })();
  weatherRequests.set(key, request);
  return request;
}

function setWeatherSettingsStatus(message, stateName = "") {
  weatherStatusMessage = message;
  weatherStatusState = stateName;
  weatherSettingsStatus.textContent = message;
  weatherSettingsStatus.dataset.state = stateName;
}

function formatGeocodedLocation(result) {
  return [...new Set([result.name, result.admin1, result.country].filter((part) => typeof part === "string" && part.trim()))]
    .filter((part, index, parts) => index === 0 || part.toLocaleLowerCase() !== parts[index - 1].toLocaleLowerCase())
    .join(", ");
}

function selectWeatherLocation(location) {
  state.weatherLocation = normalizeWeatherLocation(location);
  weatherLocationResults.replaceChildren();
  setWeatherSettingsStatus(`Weather set to ${state.weatherLocation.name}.`, "success");
  render();
}

async function searchWeatherLocations(event) {
  event.preventDefault();
  const search = weatherLocationInput.value.trim();
  if (search.length < 2) {
    setWeatherSettingsStatus("Enter at least two letters to search.", "error");
    weatherLocationInput.focus();
    return;
  }
  weatherSearchButton.disabled = true;
  weatherLocationResults.replaceChildren();
  setWeatherSettingsStatus("Searching locations…");
  try {
    const endpoint = new URL("https://geocoding-api.open-meteo.com/v1/search");
    endpoint.search = new URLSearchParams({ name: search, count: "5", language: navigator.language?.split("-")[0] || "en", format: "json" }).toString();
    const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Location search unavailable.");
    const result = await response.json();
    weatherSearchResults = Array.isArray(result.results) ? result.results : [];
    if (!weatherSearchResults.length) {
      setWeatherSettingsStatus("No matching locations found.");
      return;
    }
    const fragment = document.createDocumentFragment();
    weatherSearchResults.forEach((place, index) => {
      const item = document.createElement("div");
      item.setAttribute("role", "listitem");
      const button = document.createElement("button");
      button.className = "weather-location-result";
      button.type = "button";
      button.dataset.weatherResultIndex = String(index);
      button.textContent = formatGeocodedLocation(place);
      item.append(button);
      fragment.append(item);
    });
    weatherLocationResults.replaceChildren(fragment);
    setWeatherSettingsStatus(`${weatherSearchResults.length} locations found. Choose one to update the widget.`);
  } catch {
    setWeatherSettingsStatus("Couldn’t search locations. Check your connection and try again.", "error");
  } finally {
    weatherSearchButton.disabled = false;
  }
}

function useCurrentLocation() {
  if (!navigator.geolocation) {
    setWeatherSettingsStatus("This browser doesn’t provide device location. Search for a city instead.", "error");
    return;
  }
  currentLocationButton.disabled = true;
  setWeatherSettingsStatus("Waiting for this device’s location permission…");
  navigator.geolocation.getCurrentPosition((position) => {
    currentLocationButton.disabled = false;
    selectWeatherLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      name: "Current location",
    });
  }, (error) => {
    currentLocationButton.disabled = false;
    const message = error.code === 1
      ? "Location permission was denied. Search for a city or allow location in browser settings."
      : error.code === 3
        ? "Location took too long. Try again or search for a city."
        : "Couldn’t read this device’s location. Search for a city instead.";
    setWeatherSettingsStatus(message, "error");
  }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 10 * 60 * 1000 });
}

function renderAgendaItems() {
  agendaItems.replaceChildren();
  if (!state.calendars.length) {
    const empty = document.createElement("p");
    empty.className = "agenda-empty";
    empty.textContent = "Add an iCal link in Customize to show events here.";
    agendaItems.append(empty);
    return;
  }
  const calendarsAreCurrent = state.calendars.every((calendar) => calendar.eventsDate === currentDateKey);
  const events = combinedAgendaEvents();
  if (!calendarsAreCurrent || events.length === 0) {
    const empty = document.createElement("p");
    empty.className = "agenda-empty";
    empty.textContent = calendarsAreCurrent ? "No events scheduled today." : "Calendar events will appear after refresh.";
    agendaItems.append(empty);
    return;
  }

  events.slice(0, 5).forEach((event) => {
    const item = document.createElement("div");
    item.className = "agenda-item";
    const time = document.createElement("time");
    const details = document.createElement("span");
    details.className = "agenda-event-details";
    const title = document.createElement("span");
    title.className = "agenda-event-title";
    if (event.allDay) time.textContent = "ALL DAY";
    else if (event.start && !Number.isNaN(Date.parse(event.start))) time.textContent = formatSystemDate(new Date(event.start), { hour: "numeric", minute: "2-digit" });
    else time.textContent = "";
    title.textContent = event.summary;
    details.append(title);
    if (state.calendars.length > 1 && event.sources.length) {
      const source = document.createElement("small");
      source.className = "agenda-event-source";
      source.textContent = event.sources.join(" · ");
      details.append(source);
    }
    item.append(time, details);
    agendaItems.append(item);
  });
  if (events.length > 5) {
    const more = document.createElement("p");
    more.className = "agenda-empty";
    more.textContent = `And ${events.length - 5} more`;
    agendaItems.append(more);
  }
}

function combinedAgendaEvents() {
  const eventsByKey = new Map();
  for (const calendar of state.calendars) {
    if (calendar.eventsDate !== currentDateKey) continue;
    for (const event of calendar.events) {
      const key = `${event.summary}:${event.start}:${event.allDay}`;
      const existing = eventsByKey.get(key);
      if (existing) {
        if (!existing.sources.includes(calendar.name)) existing.sources.push(calendar.name);
      } else {
        eventsByKey.set(key, { ...event, sources: [calendar.name] });
      }
    }
  }
  return [...eventsByKey.values()].sort((a, b) => Number(b.allDay) - Number(a.allDay) || (Date.parse(a.start) || 0) - (Date.parse(b.start) || 0));
}

function renderCalendarList() {
  calendarList.replaceChildren();
  for (const calendar of state.calendars) {
    const row = document.createElement("div");
    row.className = "calendar-source";
    row.setAttribute("role", "listitem");
    const info = document.createElement("div");
    info.className = "calendar-source-info";
    const name = document.createElement("span");
    name.className = "calendar-source-name";
    name.textContent = calendar.name;
    const status = document.createElement("span");
    status.className = "calendar-source-status";
    status.textContent = refreshingCalendars.has(calendar.id)
      ? "Checking"
      : calendar.error
        ? "Needs attention"
        : calendar.kind === "file"
          ? "Local file · saved on this device"
          : calendar.lastSync ? "Connected" : "Not checked";
    if (calendar.error) status.dataset.state = "error";
    info.append(name, status);

    const actions = document.createElement("div");
    actions.className = "calendar-source-actions";
    const rename = document.createElement("button");
    rename.className = "calendar-source-action";
    rename.type = "button";
    rename.textContent = "Rename";
    rename.setAttribute("aria-label", `Change label for ${calendar.name}`);
    rename.dataset.calendarAction = "rename";
    rename.dataset.calendarId = calendar.id;
    const refresh = document.createElement("button");
    refresh.className = "calendar-source-action";
    refresh.type = "button";
    refresh.textContent = "Refresh";
    refresh.disabled = refreshingCalendars.has(calendar.id);
    refresh.setAttribute("aria-label", `Refresh ${calendar.name}`);
    refresh.dataset.calendarAction = "refresh";
    refresh.dataset.calendarId = calendar.id;
    const remove = document.createElement("button");
    remove.className = "calendar-source-action";
    remove.type = "button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", `Remove ${calendar.name}`);
    remove.dataset.calendarAction = "remove";
    remove.dataset.calendarId = calendar.id;
    actions.append(rename, refresh, remove);
    row.append(info, actions);
    calendarList.append(row);
  }
  refreshAllButton.hidden = state.calendars.length < 2;
  refreshAllButton.disabled = state.calendars.length > 0 && state.calendars.every((calendar) => refreshingCalendars.has(calendar.id));
}

function updateCalendarStatus(message, status = "") {
  calendarStatus.textContent = message;
  calendarStatus.dataset.state = status;
}

function syncLocalDate() {
  const now = new Date();
  const nextKey = dateKey(now);
  if (nextKey === currentDateKey) return;
  today = now;
  year = today.getFullYear();
  currentMonth = today.getMonth();
  todayDate = today.getDate();
  currentDateKey = nextKey;
  if (state.followLocalDate) state.month = currentMonth;
  state.calendars.forEach((calendar) => {
    if (calendar.eventsDate !== currentDateKey) calendar.events = [];
  });
  render();
  if (state.calendars.length) refreshCalendars(true);
}

function scheduleLocalDateUpdate() {
  const now = new Date();
  const nextLocalMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
  window.setTimeout(() => {
    syncLocalDate();
    scheduleLocalDateUpdate();
  }, Math.max(1000, nextLocalMidnight.getTime() - now.getTime()));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
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

async function fetchCalendar(calendar) {
  if (refreshingCalendars.has(calendar.id)) return { ok: false, skipped: true };
  refreshingCalendars.add(calendar.id);
  calendar.error = false;
  renderCalendarList();
  let timer;
  try {
    let payload = calendar.kind === "file" ? calendar.icsContent : "";
    if (calendar.kind !== "file") {
      const controller = new AbortController();
      timer = window.setTimeout(() => controller.abort(), 15000);
      const response = await fetch(browserCalendarUrl(calendar.url), {
        method: "GET", cache: "no-store", signal: controller.signal,
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
    calendar.events = parseCalendarEvents(payload, new Date()).slice(0, 60);
    calendar.eventsDate = currentDateKey;
    calendar.lastSync = new Date().toISOString();
    if (state.calendars.includes(calendar)) persist();
    renderAgendaItems();
    return { ok: true, count: calendar.events.length };
  } catch (error) {
    calendar.error = true;
    const timeout = error.name === "AbortError";
    const message = timeout
      ? "The calendar took too long to respond."
      : calendar.kind !== "file" && error instanceof TypeError
        ? "The feed could not be read by this browser. Server-free sync requires the provider to allow cross-origin requests."
        : error.message || "Couldn’t refresh the calendar.";
    return { ok: false, timeout, message };
  } finally {
    window.clearTimeout(timer);
    refreshingCalendars.delete(calendar.id);
    renderCalendarList();
  }
}

async function refreshCalendar(calendarId, { silent = false } = {}) {
  const calendar = state.calendars.find((entry) => entry.id === calendarId);
  if (!calendar) return;
  if (!silent) updateCalendarStatus(`Checking ${calendar.name}…`);
  const result = await fetchCalendar(calendar);
  if (result.skipped) return;
  if (result.ok) {
    updateCalendarStatus(`${calendar.name} connected · ${result.count} ${result.count === 1 ? "event" : "events"} today.`, "success");
  } else {
    const hasCachedEvents = calendar.eventsDate === currentDateKey && calendar.events.length > 0;
    updateCalendarStatus(`${calendar.name}: ${result.message || "Couldn’t refresh the calendar."}${hasCachedEvents ? " Cached events are still shown." : " Check the link and try again."}`, "error");
  }
}

async function refreshCalendars(silent = false) {
  if (!state.calendars.length) return;
  if (!silent) updateCalendarStatus(`Refreshing ${state.calendars.length} ${state.calendars.length === 1 ? "calendar" : "calendars"}…`);
  const results = await Promise.all(state.calendars.map((calendar) => fetchCalendar(calendar)));
  const failures = results.filter((result) => !result.ok && !result.skipped).length;
  const successes = results.length - failures - results.filter((result) => result.skipped).length;
  if (failures) {
    const detail = results.find((result) => !result.ok && !result.skipped)?.message;
    updateCalendarStatus(failures === results.length
      ? `${failures} ${failures === 1 ? "calendar needs" : "calendars need"} attention. ${detail || "Check the link and refresh again."}`
      : `${successes} refreshed · ${failures} ${failures === 1 ? "calendar needs" : "calendars need"} attention. ${detail || ""}`, "error");
  } else {
    updateCalendarStatus(`${successes} ${successes === 1 ? "calendar" : "calendars"} up to date.`, "success");
  }
}

monthPicker.addEventListener("click", (event) => {
  const button = event.target.closest("[data-month-index]");
  if (!button) return;
  state.followLocalDate = false;
  state.month = Number(button.dataset.monthIndex);
  render();
});
document.querySelector("[data-toggle-follow-month]").addEventListener("click", () => {
  state.followLocalDate = !state.followLocalDate;
  if (state.followLocalDate) state.month = currentMonth;
  render();
});
document.querySelector("[data-previous-month]").addEventListener("click", () => {
  state.followLocalDate = false;
  state.month = (state.month + palettes.length - 1) % palettes.length;
  render();
});
document.querySelector("[data-next-month]").addEventListener("click", () => {
  state.followLocalDate = false;
  state.month = (state.month + 1) % palettes.length;
  render();
});
document.querySelectorAll("[data-style-choice]").forEach((button) => button.addEventListener("click", () => { state.style = button.dataset.styleChoice; render(); }));
document.querySelectorAll("[data-design-choice]").forEach((button) => button.addEventListener("click", () => {
  state.design = button.dataset.designChoice;
  clearDesignPreview();
  render();
}));
document.querySelectorAll("[data-hemisphere-choice]").forEach((button) => button.addEventListener("click", () => { state.hemisphere = button.dataset.hemisphereChoice; render(); }));
document.querySelectorAll("[data-layout-choice]").forEach((button) => button.addEventListener("click", () => { state.layout = button.dataset.layoutChoice; render(); }));
document.querySelectorAll("[data-aspect-choice]").forEach((button) => button.addEventListener("click", () => { state.ratio = button.dataset.aspectChoice; render(); }));
document.querySelector("[data-toggle-calendar]").addEventListener("click", () => { state.showCalendar = !state.showCalendar; render(); });
document.querySelector("[data-toggle-agenda]").addEventListener("click", () => { state.showAgenda = !state.showAgenda; render(); });
document.querySelector("[data-toggle-weather]").addEventListener("click", () => { state.showWeather = !state.showWeather; render(); });
document.querySelector("[data-date-format]").addEventListener("change", (event) => { state.dateFormat = event.target.value; render(); });
document.querySelector("[data-time-format]").addEventListener("change", (event) => { state.timeFormat = event.target.value; render(); });
document.querySelector("[data-week-start]").addEventListener("change", (event) => { state.weekStart = event.target.value; render(); });
document.querySelector("[data-temperature-unit]").addEventListener("change", (event) => { state.temperatureUnit = event.target.value; render(); });
weatherSearchForm.addEventListener("submit", searchWeatherLocations);
weatherLocationResults.addEventListener("click", (event) => {
  const button = event.target.closest("[data-weather-result-index]");
  if (!button) return;
  const result = weatherSearchResults[Number(button.dataset.weatherResultIndex)];
  if (!result) return;
  selectWeatherLocation({ latitude: result.latitude, longitude: result.longitude, name: formatGeocodedLocation(result) });
});
currentLocationButton.addEventListener("click", useCurrentLocation);
document.querySelector("[data-weather-refresh]").addEventListener("click", () => loadWeather(true));
document.querySelector("[data-weather-open-settings]").addEventListener("click", () => {
  customizeButton.click();
  window.requestAnimationFrame(() => document.querySelector("[data-weather-settings]").scrollIntoView({ block: "center", behavior: "smooth" }));
});

document.querySelector("[data-reset-settings]").addEventListener("click", () => {
  state.month = currentMonth;
  state.design = "seasonal";
  state.style = "gradient";
  state.hemisphere = "north";
  state.layout = "combined";
  state.showCalendar = true;
  state.showAgenda = false;
  state.showWeather = true;
  state.dateFormat = "system";
  state.timeFormat = "system";
  state.weekStart = "system";
  state.temperatureUnit = "system";
  state.ratio = "16:10";
  state.followLocalDate = true;
  clearDesignPreview();
  render();
  showToast("Appearance settings reset. Your calendar link is still connected.");
});

calendarForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = validCalendarUrl(calendarInput.value);
  if (!value) {
    updateCalendarStatus("Enter a valid https://, http://, or webcal:// calendar link.", "error");
    calendarInput.focus();
    return;
  }
  const name = calendarNameInput.value.trim().slice(0, 60);
  const existing = state.calendars.find((calendar) => calendar.url === value);
  if (existing) {
    if (name) existing.name = name;
    calendarForm.reset();
    persist();
    render();
    await refreshCalendar(existing.id);
    return;
  }
  const calendar = {
    id: createCalendarId(),
    name: name || `Calendar ${state.calendars.length + 1}`,
    kind: "url",
    url: value,
    events: [],
    eventsDate: currentDateKey,
    lastSync: "",
  };
  state.calendars.push(calendar);
  calendarForm.reset();
  persist();
  render();
  await refreshCalendar(calendar.id);
});

addCalendarFileButton.addEventListener("click", () => calendarFileInput.click());

async function importCalendarFile(file) {
  if (!/\.ics$/i.test(file.name) && file.type !== "text/calendar") {
    return { error: `${file.name} is not an .ics calendar file.` };
  }
  if (file.size > MAX_ICS_FILE_BYTES) {
    return { error: `${file.name} is larger than 2 MB.` };
  }

  try {
    const icsContent = (await readCalendarFile(file)).replace(/^\uFEFF/, "");
    if (!isIcsCalendar(icsContent)) {
      return { error: `${file.name} doesn’t contain a valid iCal calendar.` };
    }
    const existing = state.calendars.find((calendar) => calendar.kind === "file" && calendar.icsContent === icsContent);
    if (existing) {
      return { duplicate: existing.name };
    }

    const name = file.name.replace(/\.ics$/i, "").trim().slice(0, 60) || `Calendar ${state.calendars.length + 1}`;
    const calendar = {
      id: createCalendarId(),
      name,
      kind: "file",
      icsContent,
      events: [],
      eventsDate: currentDateKey,
      lastSync: "",
    };
    const calendars = [...state.calendars, calendar];
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, calendars }));
    } catch {
      return { error: `Couldn’t save ${file.name}. Browser storage may be full.` };
    }
    state.calendars = calendars;
    persist();
    render();
    await refreshCalendar(calendar.id, { silent: true });
    return { added: calendar.name };
  } catch {
    return { error: `Couldn’t read ${file.name}. Choose a valid .ics calendar.` };
  }
}

async function importCalendarFiles(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) return;
  updateCalendarStatus(`Adding ${files.length} ${files.length === 1 ? "calendar" : "calendars"}…`);
  const results = [];
  for (const file of files) results.push(await importCalendarFile(file));

  if (results.length === 1) {
    const [result] = results;
    if (result.added) updateCalendarStatus(`${result.added} added.`, "success");
    else if (result.duplicate) updateCalendarStatus(`${result.duplicate} is already saved on this device.`);
    else updateCalendarStatus(result.error || "Couldn’t add this calendar file.", "error");
    return;
  }

  const added = results.filter((result) => result.added).length;
  const duplicates = results.filter((result) => result.duplicate).length;
  const errors = results.filter((result) => result.error);
  const summary = [];
  if (added) summary.push(`${added} ${added === 1 ? "calendar" : "calendars"} added`);
  if (duplicates) summary.push(`${duplicates} already saved`);
  if (errors.length) summary.push(`${errors.length} couldn’t be added`);
  const detail = errors.length ? `. ${errors[0].error}` : ".";
  updateCalendarStatus(`${summary.join(" · ")}${detail}`, errors.length ? "error" : added ? "success" : "");
}

calendarFileInput.addEventListener("change", async () => {
  const files = Array.from(calendarFileInput.files || []);
  calendarFileInput.value = "";
  await importCalendarFiles(files);
});

let calendarDragDepth = 0;
function clearCalendarDropState() {
  calendarDragDepth = 0;
  delete calendarDropzone.dataset.dragging;
}

calendarDropzone.addEventListener("dragenter", (event) => {
  if (!event.dataTransfer?.types?.includes("Files")) return;
  event.preventDefault();
  calendarDragDepth += 1;
  calendarDropzone.dataset.dragging = "true";
});
calendarDropzone.addEventListener("dragover", (event) => {
  if (!event.dataTransfer?.types?.includes("Files")) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  calendarDropzone.dataset.dragging = "true";
});
calendarDropzone.addEventListener("dragleave", (event) => {
  if (!event.dataTransfer?.types?.includes("Files")) return;
  event.preventDefault();
  calendarDragDepth = Math.max(0, calendarDragDepth - 1);
  if (!calendarDragDepth) delete calendarDropzone.dataset.dragging;
});
calendarDropzone.addEventListener("drop", (event) => {
  if (!event.dataTransfer?.files?.length) return;
  event.preventDefault();
  clearCalendarDropState();
  void importCalendarFiles(event.dataTransfer.files);
});

refreshAllButton.addEventListener("click", () => refreshCalendars());
calendarList.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-calendar-rename-form]");
  if (!form) return;
  event.preventDefault();
  const calendar = state.calendars.find((entry) => entry.id === form.dataset.calendarId);
  if (!calendar) return;
  const input = form.querySelector("[name='calendar-label']");
  const name = input.value.trim().slice(0, 60);
  if (!name) {
    updateCalendarStatus("Enter a calendar label.", "error");
    input.focus();
    return;
  }
  calendar.name = name;
  persist();
  render();
  updateCalendarStatus(`Calendar label changed to ${name}.`, "success");
});
calendarList.addEventListener("click", async (event) => {
  const cancelRename = event.target.closest("[data-cancel-calendar-rename]");
  if (cancelRename) {
    renderCalendarList();
    return;
  }
  const button = event.target.closest("[data-calendar-action]");
  if (!button) return;
  const calendar = state.calendars.find((entry) => entry.id === button.dataset.calendarId);
  if (!calendar) return;
  if (button.dataset.calendarAction === "rename") {
    const form = document.createElement("form");
    form.className = "calendar-source-rename";
    form.dataset.calendarRenameForm = "";
    form.dataset.calendarId = calendar.id;
    const input = document.createElement("input");
    input.className = "calendar-source-rename-input";
    input.type = "text";
    input.name = "calendar-label";
    input.maxLength = 60;
    input.required = true;
    input.value = calendar.name;
    input.setAttribute("aria-label", `Calendar label for ${calendar.name}`);
    const save = document.createElement("button");
    save.className = "calendar-source-action";
    save.type = "submit";
    save.textContent = "Save";
    const cancel = document.createElement("button");
    cancel.className = "calendar-source-action";
    cancel.type = "button";
    cancel.textContent = "Cancel";
    cancel.dataset.cancelCalendarRename = "";
    form.append(input, save, cancel);
    button.closest(".calendar-source-info").querySelector(".calendar-source-name").replaceWith(form);
    input.focus();
    input.select();
    return;
  }
  if (button.dataset.calendarAction === "refresh") {
    await refreshCalendar(calendar.id);
    return;
  }
  state.calendars = state.calendars.filter((entry) => entry.id !== calendar.id);
  refreshingCalendars.delete(calendar.id);
  persist();
  render();
  updateCalendarStatus(`${calendar.name} removed.`);
});

customizeButton.addEventListener("click", () => {
  editor.showModal();
  document.body.dataset.editorOpen = "true";
  customizeButton.setAttribute("aria-expanded", "true");
  window.requestAnimationFrame(() => {
    syncSettingsScrollCue();
    document.querySelector("[data-close-editor]").focus();
  });
});
document.querySelector("[data-close-editor]").addEventListener("click", () => editor.close());
editor.addEventListener("close", () => {
  delete document.body.dataset.editorOpen;
  customizeButton.setAttribute("aria-expanded", "false");
  if (!isPlashWallpaperMode()) customizeButton.focus();
});
settingsCard.addEventListener("scroll", syncSettingsScrollCue, { passive: true });
window.addEventListener("resize", syncSettingsScrollCue);
new ResizeObserver(syncSettingsScrollCue).observe(settingsCard);
editor.addEventListener("click", (event) => {
  if (event.target === editor) editor.close();
});
function isPlashWallpaperMode() {
  return document.documentElement.classList.contains("is-plash-app") && !document.documentElement.classList.contains("plash-is-browsing-mode");
}
new MutationObserver(() => {
  if (editor.open && isPlashWallpaperMode()) editor.close();
}).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && editor.open) editor.close();
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    syncLocalDate();
    const lastSync = Math.max(0, ...state.calendars.map((calendar) => Date.parse(calendar.lastSync) || 0));
    if (state.calendars.length && lastSync && Date.now() - lastSync > 15 * 60 * 1000) refreshCalendars(true);
    if (state.showWeather && state.weatherLocation) loadWeather();
  }
});
window.addEventListener("focus", syncLocalDate);

const handleColorSchemeChange = (event) => {
  prefersDarkScheme = event.matches;
  render();
};
if (typeof colorSchemePreference.addEventListener === "function") {
  colorSchemePreference.addEventListener("change", handleColorSchemeChange);
} else {
  colorSchemePreference.addListener(handleColorSchemeChange);
}

render();
initializingSettings = false;
scheduleLocalDateUpdate();
loadSettingsFile().then(() => {
  if (!state.calendars.length) return;
  updateCalendarStatus("Refreshing saved calendars…");
  refreshCalendars(true);
});
window.setInterval(() => {
  if (state.calendars.length && !document.hidden) refreshCalendars(true);
  if (state.showWeather && state.weatherLocation && !document.hidden) loadWeather();
}, 15 * 60 * 1000);
window.addEventListener("pagehide", () => {
  if (settingsSaveTimer) saveSettingsFile(true);
});
