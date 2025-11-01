var er = Object.defineProperty;
var tr = (e, t, n) => t in e ? er(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var F = (e, t, n) => (tr(e, typeof t != "symbol" ? t + "" : t, n), n);
import { Comment as nr, Text as ar, defineComponent as H, computed as Z, watch as rr, h as oa, resolveComponent as $, openBlock as f, createElementBlock as m, normalizeClass as x, createVNode as L, createElementVNode as T, toDisplayString as C, createCommentVNode as S, Fragment as I, createTextVNode as le, renderList as z, withDirectives as mn, vShow as hn, useCssVars as Oe, normalizeStyle as ce, createBlock as V, renderSlot as Y, withModifiers as Bt, withCtx as U, pushScopeId as la, popScopeId as ca, Transition as ir } from "vue";
var Q = /* @__PURE__ */ ((e) => (e.SINGLE_DAY_TIMED = "SINGLE_DAY_TIMED", e.SINGLE_DAY_FULL_DAY = "SINGLE_DAY_FULL_DAY", e.SINGLE_HYBRID_DAY_TIMED = "SINGLE_HYBRID_DAY_TIMED", e.MULTI_DAY_TIMED = "MULTI_DAY_TIMED", e.MULTI_DAY_FULL_DAY = "MULTI_DAY_FULL_DAY", e))(Q || {});
const xe = {
  yellow: "rgb(244, 180, 0)",
  blue: "rgb(38, 132, 255)",
  green: "rgb(51, 182, 121)",
  red: "rgb(255, 84, 86)",
  pink: "rgb(239, 139, 239)",
  purple: "rgb(157, 114, 245)",
  turquoise: "rgb(64, 190, 190)",
  brown: "rgb(169, 99, 30)"
}, Le = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, ft = /^\d{4}-\d{2}-\d{2}$/;
var q = /* @__PURE__ */ ((e) => (e.REGULAR = "regular", e.SHORTENED = "shortened", e.FLEXIBLE = "flexible", e))(q || {});
class Ee {
  /**
   * If navigator.languages is present (correlating to the browser's Accept-Language header), then use it
   * otherwise just use navigator.language
   * */
  static getBrowserNavigatorLocale() {
    return typeof navigator != "object" ? "en-US" : navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
  }
  /**
   * Solution from https://github.com/vuejs/core/issues/4733#issuecomment-1024816095
   * */
  static hasSlotContent(t) {
    return t ? t().some((n) => n.type === nr || Array.isArray(n.children) && !n.children.length ? !1 : n.type !== ar || typeof n.children == "string" && n.children.trim() !== "") : !1;
  }
  static getEventType(t, n) {
    const a = Le.test(t.time.start) && Le.test(t.time.end), r = ft.test(t.time.start) && ft.test(t.time.end);
    if (a)
      return this.getTimedEventType(t, n);
    if (r)
      return this.getFullDayEventType(t, n);
    throw new Error("Event has invalid type");
  }
  static getTimedEventType(t, n) {
    if (n.dateStringsHaveEqualDates(t.time.start, t.time.end))
      return Q.SINGLE_DAY_TIMED;
    if (n.dayMode === q.FLEXIBLE) {
      const a = n.setHourInDateTimeString(
        n.addDaysToDateTimeString(
          1,
          n.dateStringFrom(t.time.start)
        ),
        se.getHourFromTimePoints(n.DAY_END)
      );
      if (t.time.end < a)
        return Q.SINGLE_HYBRID_DAY_TIMED;
    }
    return Q.MULTI_DAY_TIMED;
  }
  static getFullDayEventType(t, n) {
    return n.dateStringsHaveEqualDates(t.time.start, t.time.end) ? Q.SINGLE_DAY_FULL_DAY : Q.MULTI_DAY_FULL_DAY;
  }
  static isUIEventTouchEvent(t) {
    return "touches" in t && typeof t.touches == "object";
  }
}
var _t = /* @__PURE__ */ ((e) => (e[e.MIDNIGHT = 0] = "MIDNIGHT", e[e.ONE_AM = 100] = "ONE_AM", e[e.TWO_AM = 200] = "TWO_AM", e[e.THREE_AM = 300] = "THREE_AM", e[e.FOUR_AM = 400] = "FOUR_AM", e[e.FIVE_AM = 500] = "FIVE_AM", e[e.SIX_AM = 600] = "SIX_AM", e[e.SEVEN_AM = 700] = "SEVEN_AM", e[e.EIGHT_AM = 800] = "EIGHT_AM", e[e.NINE_AM = 900] = "NINE_AM", e[e.TEN_AM = 1e3] = "TEN_AM", e[e.ELEVEN_AM = 1100] = "ELEVEN_AM", e[e.TWELVE_PM = 1200] = "TWELVE_PM", e[e.ONE_PM = 1300] = "ONE_PM", e[e.TWO_PM = 1400] = "TWO_PM", e[e.THREE_PM = 1500] = "THREE_PM", e[e.FOUR_PM = 1600] = "FOUR_PM", e[e.FIVE_PM = 1700] = "FIVE_PM", e[e.SIX_PM = 1800] = "SIX_PM", e[e.SEVEN_PM = 1900] = "SEVEN_PM", e[e.EIGHT_PM = 2e3] = "EIGHT_PM", e[e.NINE_PM = 2100] = "NINE_PM", e[e.TEN_PM = 2200] = "TEN_PM", e[e.ELEVEN_PM = 2300] = "ELEVEN_PM", e[e.TWELVE_AM = 2400] = "TWELVE_AM", e))(_t || {});
class Ne extends Date {
  get fullYear() {
    return this.getFullYear();
  }
  get month() {
    return this.getMonth();
  }
  get date() {
    return this.getDate();
  }
}
var Mt = /* @__PURE__ */ ((e) => (e.SUNDAY = "sunday", e.MONDAY = "monday", e))(Mt || {});
class se {
  constructor(t = "monday", n = null, a = { start: 0, end: 2400 }) {
    F(this, "FIRST_DAY_OF_WEEK");
    F(this, "CALENDAR_LOCALE");
    F(this, "ALL_HOURS", [
      0,
      100,
      200,
      300,
      400,
      500,
      600,
      700,
      800,
      900,
      1e3,
      1100,
      1200,
      1300,
      1400,
      1500,
      1600,
      1700,
      1800,
      1900,
      2e3,
      2100,
      2200,
      2300
    ]);
    F(this, "DAY_START");
    F(this, "DAY_END");
    F(this, "HOURS_PER_DAY", 24);
    F(this, "MS_PER_DAY");
    this.FIRST_DAY_OF_WEEK = t, this.CALENDAR_LOCALE = n || Ee.getBrowserNavigatorLocale(), this.DAY_START = a.start, this.DAY_END = a.end, this.HOURS_PER_DAY = (() => {
      const r = se.getHourFromTimePoints(this.DAY_END), s = se.getHourFromTimePoints(this.DAY_START);
      return r > s ? r - s : this.HOURS_PER_DAY - s + r;
    })(), this.MS_PER_DAY = 864e5;
  }
  get dayMode() {
    return this.DAY_START === 0 && this.DAY_END === 2400 ? q.REGULAR : this.DAY_START >= this.DAY_END ? q.FLEXIBLE : q.SHORTENED;
  }
  getDatesBetweenTwoDates(t, n) {
    for (var a = [], r = new Date(t); r <= n; r.setDate(r.getDate() + 1))
      a.push(new Date(r.getFullYear(), r.getMonth(), r.getDate()));
    return a;
  }
  getCalendarWeekDateObjects(t) {
    let n;
    this.FIRST_DAY_OF_WEEK === "sunday" ? n = t.getDay() : n = t.getDay() === 0 ? 6 : t.getDay() - 1;
    const a = t.getDate() - n, r = new Date(
      t.getFullYear(),
      t.getMonth(),
      a
    );
    return this.getDatesBetweenTwoDates(
      r,
      new Date(
        r.getFullYear(),
        r.getMonth(),
        r.getDate() + 6
      )
    );
  }
  /**
   * Returns an array of the weeks that comprise a month
   *
   * @param {number} yyyy
   * @param {number} mm - zero indexed (January === 0)
   * */
  getCalendarMonthSplitInWeeks(t, n) {
    const a = [], r = new Date(t, n, 1), s = new Date(
      r.getFullYear(),
      r.getMonth(),
      1
    ), i = this.getCalendarWeekDateObjects(s);
    a.push(i);
    let o = !0, l = i[0];
    const c = r.getMonth();
    for (; o; ) {
      const d = new Date(
        l.getFullYear(),
        l.getMonth(),
        l.getDate() + 7
      );
      d.getMonth() === c ? (a.push(this.getCalendarWeekDateObjects(d)), l = d) : o = !1;
    }
    return a;
  }
  /**
   * Returns an array with the length of 12 dates,
   * one date for the first day of each month of the year
   * */
  getCalendarYearMonths(t) {
    const n = [];
    let a = 0;
    for (; a <= 11; )
      n.push(new Date(t, a, 1)), a++;
    return n;
  }
  getHourAndMinutesFromTimePoints(t) {
    const n = t.toString();
    let a = "0", r = "0";
    return n.length === 4 ? (a = n[0] + n[1], r = n[2] + n[3]) : n.length === 3 && (a = n[0], r = n[1] + n[2]), {
      hour: +a,
      minutes: +r
    };
  }
  /**
   * Given timePoints (0, 100, 200 etc.), this function returns
   * a localized string with the respective hour
   * (in en-US for example: 0 => 12 AM, 1600 => 4 PM )
   * */
  getHourLocaleStringFromHourDigits(t) {
    const { hour: n, minutes: a } = this.getHourAndMinutesFromTimePoints(t), r = new Date(
      2100,
      0,
      1,
      +n,
      +a,
      0
    ).toLocaleTimeString(this.CALENDAR_LOCALE, {
      hour: "2-digit"
    });
    return r[0] === "0" ? r.substring(1) : r;
  }
  getLocalizedNameOfWeekday(t, n = "short") {
    return t.toLocaleDateString(this.CALENDAR_LOCALE, {
      weekday: n
    });
  }
  getLocalizedNameOfMonth(t, n = "short") {
    return t.toLocaleDateString(this.CALENDAR_LOCALE, {
      month: n
    });
  }
  getLocalizedDateString(t) {
    return t.toLocaleDateString(this.CALENDAR_LOCALE);
  }
  /**
   * Takes a date object, and creates a time string from it, in the format of
   * YYYY-MM-DD hh:mm
   * */
  getDateTimeStringFromDate(t, n) {
    const a = t.getFullYear(), r = t.getMonth() + 1, s = t.getDate(), i = `${a}-${r >= 10 ? r : "0" + r}-${s >= 10 ? s : "0" + s}`;
    if (!n) {
      const l = t.getHours(), c = t.getMinutes();
      return `${i} ${l >= 10 ? l : "0" + l}:${c >= 10 ? c : "0" + c}`;
    }
    return `${i} ${n === "start" ? "00:00" : "23:59"}`;
  }
  getLocalizedTime(t) {
    const {
      year: n,
      month: a,
      date: r,
      hour: s,
      minutes: i
    } = this.getAllVariablesFromDateTimeString(t);
    return new Date(n, a, r, s, i).toLocaleTimeString(this.CALENDAR_LOCALE, {
      hour: "numeric",
      minute: "numeric"
    });
  }
  getLocalizedHour(t) {
    return t.toLocaleTimeString(this.CALENDAR_LOCALE, { hour: "2-digit" });
  }
  getLocalizedTimeRange(t, n) {
    return `${this.getLocalizedTime(t)} - ${this.getLocalizedTime(n)}`;
  }
  /**
   * Returns numeric values for year, month, date, hour and minutes, given a dateTimeString
   * All variables are Date-Object compatible, meaning "month" is zero-indexed
   * */
  getAllVariablesFromDateTimeString(t) {
    return {
      year: +t.substring(0, 4),
      month: +t.substring(5, 7) - 1,
      date: +t.substring(8, 10),
      hour: this.hourFrom(t),
      minutes: this.minutesFrom(t)
    };
  }
  dateIsToday(t) {
    const {
      fullYear: n,
      month: a,
      date: r
    } = new Ne(), {
      fullYear: s,
      month: i,
      date: o
    } = new Ne(t);
    return n === s && a === i && r === o;
  }
  dateIsInWeek(t, n) {
    const { date: a, month: r, fullYear: s } = new Ne(t);
    for (const i of n) {
      const o = a === i.getDate(), l = r === i.getMonth(), c = s === i.getFullYear();
      if (o && l && c)
        return !0;
    }
    return !1;
  }
  getDateStringFromDate(t) {
    const n = t.getFullYear(), a = t.getMonth() + 1, r = t.getDate();
    return `${n}-${a >= 10 ? a : "0" + a}-${r >= 10 ? r : "0" + r}`;
  }
  addMinutesToDateTimeString(t, n) {
    const {
      year: a,
      month: r,
      date: s,
      hour: i,
      minutes: o
    } = this.getAllVariablesFromDateTimeString(n), l = new Date(a, r, s, i, o), c = new Date(l.getTime() + t * 6e4);
    return this.getDateTimeStringFromDate(c);
  }
  addDaysToDateTimeString(t, n) {
    return this.addMinutesToDateTimeString(t * 1440, n);
  }
  dateStringsHaveEqualDates(t, n) {
    const { year: a, month: r, date: s } = this.getAllVariablesFromDateTimeString(t), { year: i, month: o, date: l } = this.getAllVariablesFromDateTimeString(n);
    return a === i && r === o && s === l;
  }
  setDateToEndOfDay(t) {
    return new Date(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      23,
      59,
      59,
      999
    );
  }
  turnMinutesIntoPercentageOfHour(t) {
    const a = 1.6666666666666667 * t;
    return a < 10 ? "0" + a : a.toString();
  }
  /**
   * Every hour between 'dayStart' and 'dayEnd' is 100, in this function referred to as 100 points
   * If an event starts 30 minutes after 'dayStart', it should have 50 pointsIntoDay
   * If a day consists of 4 hours (400 points), we then have to count
   * (50 / 400) * 100 = 12.5 => event starts after 12.5 percent of the day
   *
   * Result is supposed to be a number between 0 and 100, and is used for setting the CSS- top- and height-attributes for events
   * */
  getPercentageOfDayFromDateTimeString(t, n, a) {
    const s = this.hourFrom(t) * 100, i = +t.substring(14, 16), o = +this.turnMinutesIntoPercentageOfHour(+i);
    if (a > n) {
      const g = a - n;
      return (s + o - n) / g * 100;
    }
    const l = _t.TWELVE_AM - n, c = l + a, d = s + o;
    return (d >= n ? d - n : l + d) / c * 100;
  }
  getTimeFromClick(t, n) {
    if (n <= 0)
      throw new Error("weekHeight cannot be a negative number");
    if (t < 0)
      throw new Error("clickOffsetY cannot be a negative number");
    const a = this.DAY_START / 100, r = n / this.HOURS_PER_DAY, s = Math.floor(t % r / (r / 60));
    if (this.DAY_END <= this.DAY_START) {
      const l = this.DAY_END / 100 * r, c = n - l;
      if (t > c) {
        const d = Math.floor((t - c) / r);
        return `${this.doubleDigit(d)}:${this.doubleDigit(s)}`;
      }
    }
    const i = Math.floor(t / r) + a;
    return `${this.doubleDigit(i)}:${this.doubleDigit(s)}`;
  }
  setSegmentOfDateTimeString(t, n) {
    if (n.hour < 0 || n.hour > 23)
      throw new Error("Invalid hour");
    const a = this.doubleDigit(n.hour);
    return t = t.replace(/\d{2}:/, a + ":"), t;
  }
  isTrailingOrLeadingDate(t, n) {
    const { month: a } = new Ne(t);
    return n !== a;
  }
  static getTimePointsFromHour(t) {
    if (t < 0 || t > 24 || t % 1 !== 0)
      throw new Error("Invalid day boundary");
    return t === 0 ? t : t * 100;
  }
  static getHourFromTimePoints(t) {
    if (t < 0 || t > 2400 || t % 100 !== 0)
      throw new Error("Invalid time points");
    return t === 0 ? t : t / 100;
  }
  getTimelineHours() {
    return this.dayMode !== q.FLEXIBLE ? this.ALL_HOURS.filter((t) => t >= this.DAY_START && t < this.DAY_END) : [
      ...this.ALL_HOURS.filter((t) => t >= this.DAY_START),
      ...this.ALL_HOURS.filter((t) => t < this.DAY_END)
    ];
  }
  dateStringFrom(t) {
    return t.substring(0, 10);
  }
  timeStringFrom(t) {
    return t.substring(11, 16);
  }
  hourFrom(t) {
    return +t.substring(11, 13);
  }
  minutesFrom(t) {
    return +t.substring(14, 16);
  }
  areDaysConsecutive(t, n) {
    return this.dateStringFrom(this.addDaysToDateTimeString(1, t)) === this.dateStringFrom(n);
  }
  setHourInDateTimeString(t, n) {
    const a = this.doubleDigit(n);
    return t = t.replace(/\d{2}:/, a + ":"), t;
  }
  setMinutesInDateTimeString(t, n) {
    const a = this.doubleDigit(n);
    return t = t.replace(/:\d{2}/, ":" + a), t;
  }
  getDateTimeStringDayBoundariesFrom(t) {
    if (this.DAY_END <= this.DAY_START) {
      const r = this.addDaysToDateTimeString(1, t), s = this.setHourInDateTimeString(r, this.getHourAndMinutesFromTimePoints(this.DAY_END).hour);
      return { start: this.setHourInDateTimeString(t, this.getHourAndMinutesFromTimePoints(this.DAY_START).hour), end: s };
    }
    const n = this.setHourInDateTimeString(t, this.getHourAndMinutesFromTimePoints(this.DAY_START).hour);
    let a;
    return this.DAY_END === _t.TWELVE_AM ? (a = this.setHourInDateTimeString(t, 23), a = this.setMinutesInDateTimeString(a, 59)) : a = this.setHourInDateTimeString(t, this.getHourAndMinutesFromTimePoints(this.DAY_END).hour), { start: n, end: a };
  }
  doubleDigit(t) {
    if (t < 0 || t > 60)
      throw new Error("Invalid number. This is not a valid hour or minute");
    return t < 10 ? "0" + t : String(t);
  }
}
function vn(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function p(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vn(Object(n), !0).forEach(function(a) {
      W(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vn(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function mt(e) {
  return mt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mt(e);
}
function sr(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function gn(e, t) {
  for (var n = 0; n < t.length; n++) {
    var a = t[n];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
  }
}
function or(e, t, n) {
  return t && gn(e.prototype, t), n && gn(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function W(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Ut(e, t) {
  return cr(e) || ur(e, t) || da(e, t) || mr();
}
function qe(e) {
  return lr(e) || dr(e) || da(e) || fr();
}
function lr(e) {
  if (Array.isArray(e))
    return Pt(e);
}
function cr(e) {
  if (Array.isArray(e))
    return e;
}
function dr(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function ur(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var a = [], r = !0, s = !1, i, o;
    try {
      for (n = n.call(e); !(r = (i = n.next()).done) && (a.push(i.value), !(t && a.length === t)); r = !0)
        ;
    } catch (l) {
      s = !0, o = l;
    } finally {
      try {
        !r && n.return != null && n.return();
      } finally {
        if (s)
          throw o;
      }
    }
    return a;
  }
}
function da(e, t) {
  if (e) {
    if (typeof e == "string")
      return Pt(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Pt(e, t);
  }
}
function Pt(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = new Array(t); n < t; n++)
    a[n] = e[n];
  return a;
}
function fr() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mr() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var pn = function() {
}, Xt = {}, ua = {}, fa = null, ma = {
  mark: pn,
  measure: pn
};
try {
  typeof window < "u" && (Xt = window), typeof document < "u" && (ua = document), typeof MutationObserver < "u" && (fa = MutationObserver), typeof performance < "u" && (ma = performance);
} catch {
}
var hr = Xt.navigator || {}, yn = hr.userAgent, bn = yn === void 0 ? "" : yn, ye = Xt, M = ua, Dn = fa, Ze = ma;
ye.document;
var he = !!M.documentElement && !!M.head && typeof M.addEventListener == "function" && typeof M.createElement == "function", ha = ~bn.indexOf("MSIE") || ~bn.indexOf("Trident/"), et, tt, nt, at, rt, de = "___FONT_AWESOME___", Lt = 16, va = "fa", ga = "svg-inline--fa", Se = "data-fa-i2svg", It = "data-fa-pseudo-element", vr = "data-fa-pseudo-element-pending", Vt = "data-prefix", xt = "data-icon", kn = "fontawesome-i2svg", gr = "async", pr = ["HTML", "HEAD", "STYLE", "SCRIPT"], pa = function() {
  try {
    return process.env.NODE_ENV === "production";
  } catch {
    return !1;
  }
}(), _ = "classic", O = "sharp", qt = [_, O];
function Ge(e) {
  return new Proxy(e, {
    get: function(n, a) {
      return a in n ? n[a] : n[_];
    }
  });
}
var je = Ge((et = {}, W(et, _, {
  fa: "solid",
  fas: "solid",
  "fa-solid": "solid",
  far: "regular",
  "fa-regular": "regular",
  fal: "light",
  "fa-light": "light",
  fat: "thin",
  "fa-thin": "thin",
  fad: "duotone",
  "fa-duotone": "duotone",
  fab: "brands",
  "fa-brands": "brands",
  fak: "kit",
  "fa-kit": "kit"
}), W(et, O, {
  fa: "solid",
  fass: "solid",
  "fa-solid": "solid",
  fasr: "regular",
  "fa-regular": "regular"
}), et)), Be = Ge((tt = {}, W(tt, _, {
  solid: "fas",
  regular: "far",
  light: "fal",
  thin: "fat",
  duotone: "fad",
  brands: "fab",
  kit: "fak"
}), W(tt, O, {
  solid: "fass",
  regular: "fasr"
}), tt)), Ue = Ge((nt = {}, W(nt, _, {
  fab: "fa-brands",
  fad: "fa-duotone",
  fak: "fa-kit",
  fal: "fa-light",
  far: "fa-regular",
  fas: "fa-solid",
  fat: "fa-thin"
}), W(nt, O, {
  fass: "fa-solid",
  fasr: "fa-regular"
}), nt)), yr = Ge((at = {}, W(at, _, {
  "fa-brands": "fab",
  "fa-duotone": "fad",
  "fa-kit": "fak",
  "fa-light": "fal",
  "fa-regular": "far",
  "fa-solid": "fas",
  "fa-thin": "fat"
}), W(at, O, {
  "fa-solid": "fass",
  "fa-regular": "fasr"
}), at)), br = /fa(s|r|l|t|d|b|k|ss|sr)?[\-\ ]/, ya = "fa-layers-text", Dr = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i, kr = Ge((rt = {}, W(rt, _, {
  900: "fas",
  400: "far",
  normal: "far",
  300: "fal",
  100: "fat"
}), W(rt, O, {
  900: "fass",
  400: "fasr"
}), rt)), ba = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], wr = ba.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), Er = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], ke = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, Xe = /* @__PURE__ */ new Set();
Object.keys(Be[_]).map(Xe.add.bind(Xe));
Object.keys(Be[O]).map(Xe.add.bind(Xe));
var Sr = [].concat(qt, qe(Xe), ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", ke.GROUP, ke.SWAP_OPACITY, ke.PRIMARY, ke.SECONDARY]).concat(ba.map(function(e) {
  return "".concat(e, "x");
})).concat(wr.map(function(e) {
  return "w-".concat(e);
})), He = ye.FontAwesomeConfig || {};
function Tr(e) {
  var t = M.querySelector("script[" + e + "]");
  if (t)
    return t.getAttribute(e);
}
function Cr(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
if (M && typeof M.querySelector == "function") {
  var Ar = [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
  Ar.forEach(function(e) {
    var t = Ut(e, 2), n = t[0], a = t[1], r = Cr(Tr(n));
    r != null && (He[a] = r);
  });
}
var Da = {
  styleDefault: "solid",
  familyDefault: "classic",
  cssPrefix: va,
  replacementClass: ga,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: "async",
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0
};
He.familyPrefix && (He.cssPrefix = He.familyPrefix);
var Ie = p(p({}, Da), He);
Ie.autoReplaceSvg || (Ie.observeMutations = !1);
var b = {};
Object.keys(Da).forEach(function(e) {
  Object.defineProperty(b, e, {
    enumerable: !0,
    set: function(n) {
      Ie[e] = n, Ye.forEach(function(a) {
        return a(b);
      });
    },
    get: function() {
      return Ie[e];
    }
  });
});
Object.defineProperty(b, "familyPrefix", {
  enumerable: !0,
  set: function(t) {
    Ie.cssPrefix = t, Ye.forEach(function(n) {
      return n(b);
    });
  },
  get: function() {
    return Ie.cssPrefix;
  }
});
ye.FontAwesomeConfig = b;
var Ye = [];
function _r(e) {
  return Ye.push(e), function() {
    Ye.splice(Ye.indexOf(e), 1);
  };
}
var ge = Lt, re = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function Mr(e) {
  if (!(!e || !he)) {
    var t = M.createElement("style");
    t.setAttribute("type", "text/css"), t.innerHTML = e;
    for (var n = M.head.childNodes, a = null, r = n.length - 1; r > -1; r--) {
      var s = n[r], i = (s.tagName || "").toUpperCase();
      ["STYLE", "LINK"].indexOf(i) > -1 && (a = s);
    }
    return M.head.insertBefore(t, a), e;
  }
}
var Pr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function Ve() {
  for (var e = 12, t = ""; e-- > 0; )
    t += Pr[Math.random() * 62 | 0];
  return t;
}
function $e(e) {
  for (var t = [], n = (e || []).length >>> 0; n--; )
    t[n] = e[n];
  return t;
}
function Gt(e) {
  return e.classList ? $e(e.classList) : (e.getAttribute("class") || "").split(" ").filter(function(t) {
    return t;
  });
}
function ka(e) {
  return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Lr(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, '="').concat(ka(e[n]), '" ');
  }, "").trim();
}
function bt(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, ": ").concat(e[n].trim(), ";");
  }, "");
}
function Kt(e) {
  return e.size !== re.size || e.x !== re.x || e.y !== re.y || e.rotate !== re.rotate || e.flipX || e.flipY;
}
function Ir(e) {
  var t = e.transform, n = e.containerWidth, a = e.iconWidth, r = {
    transform: "translate(".concat(n / 2, " 256)")
  }, s = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "), i = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), o = "rotate(".concat(t.rotate, " 0 0)"), l = {
    transform: "".concat(s, " ").concat(i, " ").concat(o)
  }, c = {
    transform: "translate(".concat(a / 2 * -1, " -256)")
  };
  return {
    outer: r,
    inner: l,
    path: c
  };
}
function Or(e) {
  var t = e.transform, n = e.width, a = n === void 0 ? Lt : n, r = e.height, s = r === void 0 ? Lt : r, i = e.startCentered, o = i === void 0 ? !1 : i, l = "";
  return o && ha ? l += "translate(".concat(t.x / ge - a / 2, "em, ").concat(t.y / ge - s / 2, "em) ") : o ? l += "translate(calc(-50% + ".concat(t.x / ge, "em), calc(-50% + ").concat(t.y / ge, "em)) ") : l += "translate(".concat(t.x / ge, "em, ").concat(t.y / ge, "em) "), l += "scale(".concat(t.size / ge * (t.flipX ? -1 : 1), ", ").concat(t.size / ge * (t.flipY ? -1 : 1), ") "), l += "rotate(".concat(t.rotate, "deg) "), l;
}
var $r = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
function wa() {
  var e = va, t = ga, n = b.cssPrefix, a = b.replacementClass, r = $r;
  if (n !== e || a !== t) {
    var s = new RegExp("\\.".concat(e, "\\-"), "g"), i = new RegExp("\\--".concat(e, "\\-"), "g"), o = new RegExp("\\.".concat(t), "g");
    r = r.replace(s, ".".concat(n, "-")).replace(i, "--".concat(n, "-")).replace(o, ".".concat(a));
  }
  return r;
}
var wn = !1;
function St() {
  b.autoAddCss && !wn && (Mr(wa()), wn = !0);
}
var Fr = {
  mixout: function() {
    return {
      dom: {
        css: wa,
        insertCss: St
      }
    };
  },
  hooks: function() {
    return {
      beforeDOMElementCreation: function() {
        St();
      },
      beforeI2svg: function() {
        St();
      }
    };
  }
}, ue = ye || {};
ue[de] || (ue[de] = {});
ue[de].styles || (ue[de].styles = {});
ue[de].hooks || (ue[de].hooks = {});
ue[de].shims || (ue[de].shims = []);
var te = ue[de], Ea = [], Rr = function e() {
  M.removeEventListener("DOMContentLoaded", e), ht = 1, Ea.map(function(t) {
    return t();
  });
}, ht = !1;
he && (ht = (M.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(M.readyState), ht || M.addEventListener("DOMContentLoaded", Rr));
function Nr(e) {
  he && (ht ? setTimeout(e, 0) : Ea.push(e));
}
function Ke(e) {
  var t = e.tag, n = e.attributes, a = n === void 0 ? {} : n, r = e.children, s = r === void 0 ? [] : r;
  return typeof e == "string" ? ka(e) : "<".concat(t, " ").concat(Lr(a), ">").concat(s.map(Ke).join(""), "</").concat(t, ">");
}
function En(e, t, n) {
  if (e && e[t] && e[t][n])
    return {
      prefix: t,
      iconName: n,
      icon: e[t][n]
    };
}
var Wr = function(t, n) {
  return function(a, r, s, i) {
    return t.call(n, a, r, s, i);
  };
}, Tt = function(t, n, a, r) {
  var s = Object.keys(t), i = s.length, o = r !== void 0 ? Wr(n, r) : n, l, c, d;
  for (a === void 0 ? (l = 1, d = t[s[0]]) : (l = 0, d = a); l < i; l++)
    c = s[l], d = o(d, t[c], c, t);
  return d;
};
function Hr(e) {
  for (var t = [], n = 0, a = e.length; n < a; ) {
    var r = e.charCodeAt(n++);
    if (r >= 55296 && r <= 56319 && n < a) {
      var s = e.charCodeAt(n++);
      (s & 64512) == 56320 ? t.push(((r & 1023) << 10) + (s & 1023) + 65536) : (t.push(r), n--);
    } else
      t.push(r);
  }
  return t;
}
function Ot(e) {
  var t = Hr(e);
  return t.length === 1 ? t[0].toString(16) : null;
}
function Yr(e, t) {
  var n = e.length, a = e.charCodeAt(t), r;
  return a >= 55296 && a <= 56319 && n > t + 1 && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (a - 55296) * 1024 + r - 56320 + 65536 : a;
}
function Sn(e) {
  return Object.keys(e).reduce(function(t, n) {
    var a = e[n], r = !!a.icon;
    return r ? t[a.iconName] = a.icon : t[n] = a, t;
  }, {});
}
function $t(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = n.skipHooks, r = a === void 0 ? !1 : a, s = Sn(t);
  typeof te.hooks.addPack == "function" && !r ? te.hooks.addPack(e, Sn(t)) : te.styles[e] = p(p({}, te.styles[e] || {}), s), e === "fas" && $t("fa", t);
}
var it, st, ot, Ae = te.styles, zr = te.shims, jr = (it = {}, W(it, _, Object.values(Ue[_])), W(it, O, Object.values(Ue[O])), it), Qt = null, Sa = {}, Ta = {}, Ca = {}, Aa = {}, _a = {}, Br = (st = {}, W(st, _, Object.keys(je[_])), W(st, O, Object.keys(je[O])), st);
function Ur(e) {
  return ~Sr.indexOf(e);
}
function Xr(e, t) {
  var n = t.split("-"), a = n[0], r = n.slice(1).join("-");
  return a === e && r !== "" && !Ur(r) ? r : null;
}
var Ma = function() {
  var t = function(s) {
    return Tt(Ae, function(i, o, l) {
      return i[l] = Tt(o, s, {}), i;
    }, {});
  };
  Sa = t(function(r, s, i) {
    if (s[3] && (r[s[3]] = i), s[2]) {
      var o = s[2].filter(function(l) {
        return typeof l == "number";
      });
      o.forEach(function(l) {
        r[l.toString(16)] = i;
      });
    }
    return r;
  }), Ta = t(function(r, s, i) {
    if (r[i] = i, s[2]) {
      var o = s[2].filter(function(l) {
        return typeof l == "string";
      });
      o.forEach(function(l) {
        r[l] = i;
      });
    }
    return r;
  }), _a = t(function(r, s, i) {
    var o = s[2];
    return r[i] = i, o.forEach(function(l) {
      r[l] = i;
    }), r;
  });
  var n = "far" in Ae || b.autoFetchSvg, a = Tt(zr, function(r, s) {
    var i = s[0], o = s[1], l = s[2];
    return o === "far" && !n && (o = "fas"), typeof i == "string" && (r.names[i] = {
      prefix: o,
      iconName: l
    }), typeof i == "number" && (r.unicodes[i.toString(16)] = {
      prefix: o,
      iconName: l
    }), r;
  }, {
    names: {},
    unicodes: {}
  });
  Ca = a.names, Aa = a.unicodes, Qt = Dt(b.styleDefault, {
    family: b.familyDefault
  });
};
_r(function(e) {
  Qt = Dt(e.styleDefault, {
    family: b.familyDefault
  });
});
Ma();
function Jt(e, t) {
  return (Sa[e] || {})[t];
}
function Vr(e, t) {
  return (Ta[e] || {})[t];
}
function we(e, t) {
  return (_a[e] || {})[t];
}
function Pa(e) {
  return Ca[e] || {
    prefix: null,
    iconName: null
  };
}
function xr(e) {
  var t = Aa[e], n = Jt("fas", e);
  return t || (n ? {
    prefix: "fas",
    iconName: n
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function be() {
  return Qt;
}
var Zt = function() {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};
function Dt(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.family, a = n === void 0 ? _ : n, r = je[a][e], s = Be[a][e] || Be[a][r], i = e in te.styles ? e : null;
  return s || i || null;
}
var Tn = (ot = {}, W(ot, _, Object.keys(Ue[_])), W(ot, O, Object.keys(Ue[O])), ot);
function kt(e) {
  var t, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.skipLookups, r = a === void 0 ? !1 : a, s = (t = {}, W(t, _, "".concat(b.cssPrefix, "-").concat(_)), W(t, O, "".concat(b.cssPrefix, "-").concat(O)), t), i = null, o = _;
  (e.includes(s[_]) || e.some(function(c) {
    return Tn[_].includes(c);
  })) && (o = _), (e.includes(s[O]) || e.some(function(c) {
    return Tn[O].includes(c);
  })) && (o = O);
  var l = e.reduce(function(c, d) {
    var u = Xr(b.cssPrefix, d);
    if (Ae[d] ? (d = jr[o].includes(d) ? yr[o][d] : d, i = d, c.prefix = d) : Br[o].indexOf(d) > -1 ? (i = d, c.prefix = Dt(d, {
      family: o
    })) : u ? c.iconName = u : d !== b.replacementClass && d !== s[_] && d !== s[O] && c.rest.push(d), !r && c.prefix && c.iconName) {
      var g = i === "fa" ? Pa(c.iconName) : {}, D = we(c.prefix, c.iconName);
      g.prefix && (i = null), c.iconName = g.iconName || D || c.iconName, c.prefix = g.prefix || c.prefix, c.prefix === "far" && !Ae.far && Ae.fas && !b.autoFetchSvg && (c.prefix = "fas");
    }
    return c;
  }, Zt());
  return (e.includes("fa-brands") || e.includes("fab")) && (l.prefix = "fab"), (e.includes("fa-duotone") || e.includes("fad")) && (l.prefix = "fad"), !l.prefix && o === O && (Ae.fass || b.autoFetchSvg) && (l.prefix = "fass", l.iconName = we(l.prefix, l.iconName) || l.iconName), (l.prefix === "fa" || i === "fa") && (l.prefix = be() || "fas"), l;
}
var qr = /* @__PURE__ */ function() {
  function e() {
    sr(this, e), this.definitions = {};
  }
  return or(e, [{
    key: "add",
    value: function() {
      for (var n = this, a = arguments.length, r = new Array(a), s = 0; s < a; s++)
        r[s] = arguments[s];
      var i = r.reduce(this._pullDefinitions, {});
      Object.keys(i).forEach(function(o) {
        n.definitions[o] = p(p({}, n.definitions[o] || {}), i[o]), $t(o, i[o]);
        var l = Ue[_][o];
        l && $t(l, i[o]), Ma();
      });
    }
  }, {
    key: "reset",
    value: function() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function(n, a) {
      var r = a.prefix && a.iconName && a.icon ? {
        0: a
      } : a;
      return Object.keys(r).map(function(s) {
        var i = r[s], o = i.prefix, l = i.iconName, c = i.icon, d = c[2];
        n[o] || (n[o] = {}), d.length > 0 && d.forEach(function(u) {
          typeof u == "string" && (n[o][u] = c);
        }), n[o][l] = c;
      }), n;
    }
  }]), e;
}(), Cn = [], _e = {}, Pe = {}, Gr = Object.keys(Pe);
function Kr(e, t) {
  var n = t.mixoutsTo;
  return Cn = e, _e = {}, Object.keys(Pe).forEach(function(a) {
    Gr.indexOf(a) === -1 && delete Pe[a];
  }), Cn.forEach(function(a) {
    var r = a.mixout ? a.mixout() : {};
    if (Object.keys(r).forEach(function(i) {
      typeof r[i] == "function" && (n[i] = r[i]), mt(r[i]) === "object" && Object.keys(r[i]).forEach(function(o) {
        n[i] || (n[i] = {}), n[i][o] = r[i][o];
      });
    }), a.hooks) {
      var s = a.hooks();
      Object.keys(s).forEach(function(i) {
        _e[i] || (_e[i] = []), _e[i].push(s[i]);
      });
    }
    a.provides && a.provides(Pe);
  }), n;
}
function Ft(e, t) {
  for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++)
    a[r - 2] = arguments[r];
  var s = _e[e] || [];
  return s.forEach(function(i) {
    t = i.apply(null, [t].concat(a));
  }), t;
}
function Te(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  var r = _e[e] || [];
  r.forEach(function(s) {
    s.apply(null, n);
  });
}
function fe() {
  var e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
  return Pe[e] ? Pe[e].apply(null, t) : void 0;
}
function Rt(e) {
  e.prefix === "fa" && (e.prefix = "fas");
  var t = e.iconName, n = e.prefix || be();
  if (t)
    return t = we(n, t) || t, En(La.definitions, n, t) || En(te.styles, n, t);
}
var La = new qr(), Qr = function() {
  b.autoReplaceSvg = !1, b.observeMutations = !1, Te("noAuto");
}, Jr = {
  i2svg: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return he ? (Te("beforeI2svg", t), fe("pseudoElements2svg", t), fe("i2svg", t)) : Promise.reject("Operation requires a DOM of some kind.");
  },
  watch: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.autoReplaceSvgRoot;
    b.autoReplaceSvg === !1 && (b.autoReplaceSvg = !0), b.observeMutations = !0, Nr(function() {
      ei({
        autoReplaceSvgRoot: n
      }), Te("watch", t);
    });
  }
}, Zr = {
  icon: function(t) {
    if (t === null)
      return null;
    if (mt(t) === "object" && t.prefix && t.iconName)
      return {
        prefix: t.prefix,
        iconName: we(t.prefix, t.iconName) || t.iconName
      };
    if (Array.isArray(t) && t.length === 2) {
      var n = t[1].indexOf("fa-") === 0 ? t[1].slice(3) : t[1], a = Dt(t[0]);
      return {
        prefix: a,
        iconName: we(a, n) || n
      };
    }
    if (typeof t == "string" && (t.indexOf("".concat(b.cssPrefix, "-")) > -1 || t.match(br))) {
      var r = kt(t.split(" "), {
        skipLookups: !0
      });
      return {
        prefix: r.prefix || be(),
        iconName: we(r.prefix, r.iconName) || r.iconName
      };
    }
    if (typeof t == "string") {
      var s = be();
      return {
        prefix: s,
        iconName: we(s, t) || t
      };
    }
  }
}, G = {
  noAuto: Qr,
  config: b,
  dom: Jr,
  parse: Zr,
  library: La,
  findIconDefinition: Rt,
  toHtml: Ke
}, ei = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.autoReplaceSvgRoot, a = n === void 0 ? M : n;
  (Object.keys(te.styles).length > 0 || b.autoFetchSvg) && he && b.autoReplaceSvg && G.dom.i2svg({
    node: a
  });
};
function wt(e, t) {
  return Object.defineProperty(e, "abstract", {
    get: t
  }), Object.defineProperty(e, "html", {
    get: function() {
      return e.abstract.map(function(a) {
        return Ke(a);
      });
    }
  }), Object.defineProperty(e, "node", {
    get: function() {
      if (he) {
        var a = M.createElement("div");
        return a.innerHTML = e.html, a.children;
      }
    }
  }), e;
}
function ti(e) {
  var t = e.children, n = e.main, a = e.mask, r = e.attributes, s = e.styles, i = e.transform;
  if (Kt(i) && n.found && !a.found) {
    var o = n.width, l = n.height, c = {
      x: o / l / 2,
      y: 0.5
    };
    r.style = bt(p(p({}, s), {}, {
      "transform-origin": "".concat(c.x + i.x / 16, "em ").concat(c.y + i.y / 16, "em")
    }));
  }
  return [{
    tag: "svg",
    attributes: r,
    children: t
  }];
}
function ni(e) {
  var t = e.prefix, n = e.iconName, a = e.children, r = e.attributes, s = e.symbol, i = s === !0 ? "".concat(t, "-").concat(b.cssPrefix, "-").concat(n) : s;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: p(p({}, r), {}, {
        id: i
      }),
      children: a
    }]
  }];
}
function en(e) {
  var t = e.icons, n = t.main, a = t.mask, r = e.prefix, s = e.iconName, i = e.transform, o = e.symbol, l = e.title, c = e.maskId, d = e.titleId, u = e.extra, g = e.watchable, D = g === void 0 ? !1 : g, y = a.found ? a : n, k = y.width, w = y.height, h = r === "fak", v = [b.replacementClass, s ? "".concat(b.cssPrefix, "-").concat(s) : ""].filter(function(ve) {
    return u.classes.indexOf(ve) === -1;
  }).filter(function(ve) {
    return ve !== "" || !!ve;
  }).concat(u.classes).join(" "), E = {
    children: [],
    attributes: p(p({}, u.attributes), {}, {
      "data-prefix": r,
      "data-icon": s,
      class: v,
      role: u.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(k, " ").concat(w)
    })
  }, A = h && !~u.classes.indexOf("fa-fw") ? {
    width: "".concat(k / w * 16 * 0.0625, "em")
  } : {};
  D && (E.attributes[Se] = ""), l && (E.children.push({
    tag: "title",
    attributes: {
      id: E.attributes["aria-labelledby"] || "title-".concat(d || Ve())
    },
    children: [l]
  }), delete E.attributes.title);
  var N = p(p({}, E), {}, {
    prefix: r,
    iconName: s,
    main: n,
    mask: a,
    maskId: c,
    transform: i,
    symbol: o,
    styles: p(p({}, A), u.styles)
  }), ne = a.found && n.found ? fe("generateAbstractMask", N) || {
    children: [],
    attributes: {}
  } : fe("generateAbstractIcon", N) || {
    children: [],
    attributes: {}
  }, J = ne.children, Et = ne.attributes;
  return N.children = J, N.attributes = Et, o ? ni(N) : ti(N);
}
function An(e) {
  var t = e.content, n = e.width, a = e.height, r = e.transform, s = e.title, i = e.extra, o = e.watchable, l = o === void 0 ? !1 : o, c = p(p(p({}, i.attributes), s ? {
    title: s
  } : {}), {}, {
    class: i.classes.join(" ")
  });
  l && (c[Se] = "");
  var d = p({}, i.styles);
  Kt(r) && (d.transform = Or({
    transform: r,
    startCentered: !0,
    width: n,
    height: a
  }), d["-webkit-transform"] = d.transform);
  var u = bt(d);
  u.length > 0 && (c.style = u);
  var g = [];
  return g.push({
    tag: "span",
    attributes: c,
    children: [t]
  }), s && g.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [s]
  }), g;
}
function ai(e) {
  var t = e.content, n = e.title, a = e.extra, r = p(p(p({}, a.attributes), n ? {
    title: n
  } : {}), {}, {
    class: a.classes.join(" ")
  }), s = bt(a.styles);
  s.length > 0 && (r.style = s);
  var i = [];
  return i.push({
    tag: "span",
    attributes: r,
    children: [t]
  }), n && i.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [n]
  }), i;
}
var Ct = te.styles;
function Nt(e) {
  var t = e[0], n = e[1], a = e.slice(4), r = Ut(a, 1), s = r[0], i = null;
  return Array.isArray(s) ? i = {
    tag: "g",
    attributes: {
      class: "".concat(b.cssPrefix, "-").concat(ke.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(b.cssPrefix, "-").concat(ke.SECONDARY),
        fill: "currentColor",
        d: s[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(b.cssPrefix, "-").concat(ke.PRIMARY),
        fill: "currentColor",
        d: s[1]
      }
    }]
  } : i = {
    tag: "path",
    attributes: {
      fill: "currentColor",
      d: s
    }
  }, {
    found: !0,
    width: t,
    height: n,
    icon: i
  };
}
var ri = {
  found: !1,
  width: 512,
  height: 512
};
function ii(e, t) {
  !pa && !b.showMissingIcons && e && console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
}
function Wt(e, t) {
  var n = t;
  return t === "fa" && b.styleDefault !== null && (t = be()), new Promise(function(a, r) {
    if (fe("missingIconAbstract"), n === "fa") {
      var s = Pa(e) || {};
      e = s.iconName || e, t = s.prefix || t;
    }
    if (e && t && Ct[t] && Ct[t][e]) {
      var i = Ct[t][e];
      return a(Nt(i));
    }
    ii(e, t), a(p(p({}, ri), {}, {
      icon: b.showMissingIcons && e ? fe("missingIconAbstract") || {} : {}
    }));
  });
}
var _n = function() {
}, Ht = b.measurePerformance && Ze && Ze.mark && Ze.measure ? Ze : {
  mark: _n,
  measure: _n
}, We = 'FA "6.3.0"', si = function(t) {
  return Ht.mark("".concat(We, " ").concat(t, " begins")), function() {
    return Ia(t);
  };
}, Ia = function(t) {
  Ht.mark("".concat(We, " ").concat(t, " ends")), Ht.measure("".concat(We, " ").concat(t), "".concat(We, " ").concat(t, " begins"), "".concat(We, " ").concat(t, " ends"));
}, tn = {
  begin: si,
  end: Ia
}, dt = function() {
};
function Mn(e) {
  var t = e.getAttribute ? e.getAttribute(Se) : null;
  return typeof t == "string";
}
function oi(e) {
  var t = e.getAttribute ? e.getAttribute(Vt) : null, n = e.getAttribute ? e.getAttribute(xt) : null;
  return t && n;
}
function li(e) {
  return e && e.classList && e.classList.contains && e.classList.contains(b.replacementClass);
}
function ci() {
  if (b.autoReplaceSvg === !0)
    return ut.replace;
  var e = ut[b.autoReplaceSvg];
  return e || ut.replace;
}
function di(e) {
  return M.createElementNS("http://www.w3.org/2000/svg", e);
}
function ui(e) {
  return M.createElement(e);
}
function Oa(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.ceFn, a = n === void 0 ? e.tag === "svg" ? di : ui : n;
  if (typeof e == "string")
    return M.createTextNode(e);
  var r = a(e.tag);
  Object.keys(e.attributes || []).forEach(function(i) {
    r.setAttribute(i, e.attributes[i]);
  });
  var s = e.children || [];
  return s.forEach(function(i) {
    r.appendChild(Oa(i, {
      ceFn: a
    }));
  }), r;
}
function fi(e) {
  var t = " ".concat(e.outerHTML, " ");
  return t = "".concat(t, "Font Awesome fontawesome.com "), t;
}
var ut = {
  replace: function(t) {
    var n = t[0];
    if (n.parentNode)
      if (t[1].forEach(function(r) {
        n.parentNode.insertBefore(Oa(r), n);
      }), n.getAttribute(Se) === null && b.keepOriginalSource) {
        var a = M.createComment(fi(n));
        n.parentNode.replaceChild(a, n);
      } else
        n.remove();
  },
  nest: function(t) {
    var n = t[0], a = t[1];
    if (~Gt(n).indexOf(b.replacementClass))
      return ut.replace(t);
    var r = new RegExp("".concat(b.cssPrefix, "-.*"));
    if (delete a[0].attributes.id, a[0].attributes.class) {
      var s = a[0].attributes.class.split(" ").reduce(function(o, l) {
        return l === b.replacementClass || l.match(r) ? o.toSvg.push(l) : o.toNode.push(l), o;
      }, {
        toNode: [],
        toSvg: []
      });
      a[0].attributes.class = s.toSvg.join(" "), s.toNode.length === 0 ? n.removeAttribute("class") : n.setAttribute("class", s.toNode.join(" "));
    }
    var i = a.map(function(o) {
      return Ke(o);
    }).join(`
`);
    n.setAttribute(Se, ""), n.innerHTML = i;
  }
};
function Pn(e) {
  e();
}
function $a(e, t) {
  var n = typeof t == "function" ? t : dt;
  if (e.length === 0)
    n();
  else {
    var a = Pn;
    b.mutateApproach === gr && (a = ye.requestAnimationFrame || Pn), a(function() {
      var r = ci(), s = tn.begin("mutate");
      e.map(r), s(), n();
    });
  }
}
var nn = !1;
function Fa() {
  nn = !0;
}
function Yt() {
  nn = !1;
}
var vt = null;
function Ln(e) {
  if (Dn && b.observeMutations) {
    var t = e.treeCallback, n = t === void 0 ? dt : t, a = e.nodeCallback, r = a === void 0 ? dt : a, s = e.pseudoElementsCallback, i = s === void 0 ? dt : s, o = e.observeMutationsRoot, l = o === void 0 ? M : o;
    vt = new Dn(function(c) {
      if (!nn) {
        var d = be();
        $e(c).forEach(function(u) {
          if (u.type === "childList" && u.addedNodes.length > 0 && !Mn(u.addedNodes[0]) && (b.searchPseudoElements && i(u.target), n(u.target)), u.type === "attributes" && u.target.parentNode && b.searchPseudoElements && i(u.target.parentNode), u.type === "attributes" && Mn(u.target) && ~Er.indexOf(u.attributeName))
            if (u.attributeName === "class" && oi(u.target)) {
              var g = kt(Gt(u.target)), D = g.prefix, y = g.iconName;
              u.target.setAttribute(Vt, D || d), y && u.target.setAttribute(xt, y);
            } else
              li(u.target) && r(u.target);
        });
      }
    }), he && vt.observe(l, {
      childList: !0,
      attributes: !0,
      characterData: !0,
      subtree: !0
    });
  }
}
function mi() {
  vt && vt.disconnect();
}
function hi(e) {
  var t = e.getAttribute("style"), n = [];
  return t && (n = t.split(";").reduce(function(a, r) {
    var s = r.split(":"), i = s[0], o = s.slice(1);
    return i && o.length > 0 && (a[i] = o.join(":").trim()), a;
  }, {})), n;
}
function vi(e) {
  var t = e.getAttribute("data-prefix"), n = e.getAttribute("data-icon"), a = e.innerText !== void 0 ? e.innerText.trim() : "", r = kt(Gt(e));
  return r.prefix || (r.prefix = be()), t && n && (r.prefix = t, r.iconName = n), r.iconName && r.prefix || (r.prefix && a.length > 0 && (r.iconName = Vr(r.prefix, e.innerText) || Jt(r.prefix, Ot(e.innerText))), !r.iconName && b.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (r.iconName = e.firstChild.data)), r;
}
function gi(e) {
  var t = $e(e.attributes).reduce(function(r, s) {
    return r.name !== "class" && r.name !== "style" && (r[s.name] = s.value), r;
  }, {}), n = e.getAttribute("title"), a = e.getAttribute("data-fa-title-id");
  return b.autoA11y && (n ? t["aria-labelledby"] = "".concat(b.replacementClass, "-title-").concat(a || Ve()) : (t["aria-hidden"] = "true", t.focusable = "false")), t;
}
function pi() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: re,
    symbol: !1,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function In(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: !0
  }, n = vi(e), a = n.iconName, r = n.prefix, s = n.rest, i = gi(e), o = Ft("parseNodeAttributes", {}, e), l = t.styleParser ? hi(e) : [];
  return p({
    iconName: a,
    title: e.getAttribute("title"),
    titleId: e.getAttribute("data-fa-title-id"),
    prefix: r,
    transform: re,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: !1,
    extra: {
      classes: s,
      styles: l,
      attributes: i
    }
  }, o);
}
var yi = te.styles;
function Ra(e) {
  var t = b.autoReplaceSvg === "nest" ? In(e, {
    styleParser: !1
  }) : In(e);
  return ~t.extra.classes.indexOf(ya) ? fe("generateLayersText", e, t) : fe("generateSvgReplacementMutation", e, t);
}
var De = /* @__PURE__ */ new Set();
qt.map(function(e) {
  De.add("fa-".concat(e));
});
Object.keys(je[_]).map(De.add.bind(De));
Object.keys(je[O]).map(De.add.bind(De));
De = qe(De);
function On(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!he)
    return Promise.resolve();
  var n = M.documentElement.classList, a = function(u) {
    return n.add("".concat(kn, "-").concat(u));
  }, r = function(u) {
    return n.remove("".concat(kn, "-").concat(u));
  }, s = b.autoFetchSvg ? De : qt.map(function(d) {
    return "fa-".concat(d);
  }).concat(Object.keys(yi));
  s.includes("fa") || s.push("fa");
  var i = [".".concat(ya, ":not([").concat(Se, "])")].concat(s.map(function(d) {
    return ".".concat(d, ":not([").concat(Se, "])");
  })).join(", ");
  if (i.length === 0)
    return Promise.resolve();
  var o = [];
  try {
    o = $e(e.querySelectorAll(i));
  } catch {
  }
  if (o.length > 0)
    a("pending"), r("complete");
  else
    return Promise.resolve();
  var l = tn.begin("onTree"), c = o.reduce(function(d, u) {
    try {
      var g = Ra(u);
      g && d.push(g);
    } catch (D) {
      pa || D.name === "MissingIcon" && console.error(D);
    }
    return d;
  }, []);
  return new Promise(function(d, u) {
    Promise.all(c).then(function(g) {
      $a(g, function() {
        a("active"), a("complete"), r("pending"), typeof t == "function" && t(), l(), d();
      });
    }).catch(function(g) {
      l(), u(g);
    });
  });
}
function bi(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  Ra(e).then(function(n) {
    n && $a([n], t);
  });
}
function Di(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = (t || {}).icon ? t : Rt(t || {}), r = n.mask;
    return r && (r = (r || {}).icon ? r : Rt(r || {})), e(a, p(p({}, n), {}, {
      mask: r
    }));
  };
}
var ki = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.transform, r = a === void 0 ? re : a, s = n.symbol, i = s === void 0 ? !1 : s, o = n.mask, l = o === void 0 ? null : o, c = n.maskId, d = c === void 0 ? null : c, u = n.title, g = u === void 0 ? null : u, D = n.titleId, y = D === void 0 ? null : D, k = n.classes, w = k === void 0 ? [] : k, h = n.attributes, v = h === void 0 ? {} : h, E = n.styles, A = E === void 0 ? {} : E;
  if (t) {
    var N = t.prefix, ne = t.iconName, J = t.icon;
    return wt(p({
      type: "icon"
    }, t), function() {
      return Te("beforeDOMElementCreation", {
        iconDefinition: t,
        params: n
      }), b.autoA11y && (g ? v["aria-labelledby"] = "".concat(b.replacementClass, "-title-").concat(y || Ve()) : (v["aria-hidden"] = "true", v.focusable = "false")), en({
        icons: {
          main: Nt(J),
          mask: l ? Nt(l.icon) : {
            found: !1,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: N,
        iconName: ne,
        transform: p(p({}, re), r),
        symbol: i,
        title: g,
        maskId: d,
        titleId: y,
        extra: {
          attributes: v,
          styles: A,
          classes: w
        }
      });
    });
  }
}, wi = {
  mixout: function() {
    return {
      icon: Di(ki)
    };
  },
  hooks: function() {
    return {
      mutationObserverCallbacks: function(n) {
        return n.treeCallback = On, n.nodeCallback = bi, n;
      }
    };
  },
  provides: function(t) {
    t.i2svg = function(n) {
      var a = n.node, r = a === void 0 ? M : a, s = n.callback, i = s === void 0 ? function() {
      } : s;
      return On(r, i);
    }, t.generateSvgReplacementMutation = function(n, a) {
      var r = a.iconName, s = a.title, i = a.titleId, o = a.prefix, l = a.transform, c = a.symbol, d = a.mask, u = a.maskId, g = a.extra;
      return new Promise(function(D, y) {
        Promise.all([Wt(r, o), d.iconName ? Wt(d.iconName, d.prefix) : Promise.resolve({
          found: !1,
          width: 512,
          height: 512,
          icon: {}
        })]).then(function(k) {
          var w = Ut(k, 2), h = w[0], v = w[1];
          D([n, en({
            icons: {
              main: h,
              mask: v
            },
            prefix: o,
            iconName: r,
            transform: l,
            symbol: c,
            maskId: u,
            title: s,
            titleId: i,
            extra: g,
            watchable: !0
          })]);
        }).catch(y);
      });
    }, t.generateAbstractIcon = function(n) {
      var a = n.children, r = n.attributes, s = n.main, i = n.transform, o = n.styles, l = bt(o);
      l.length > 0 && (r.style = l);
      var c;
      return Kt(i) && (c = fe("generateAbstractTransformGrouping", {
        main: s,
        transform: i,
        containerWidth: s.width,
        iconWidth: s.width
      })), a.push(c || s.icon), {
        children: a,
        attributes: r
      };
    };
  }
}, Ei = {
  mixout: function() {
    return {
      layer: function(n) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = a.classes, s = r === void 0 ? [] : r;
        return wt({
          type: "layer"
        }, function() {
          Te("beforeDOMElementCreation", {
            assembler: n,
            params: a
          });
          var i = [];
          return n(function(o) {
            Array.isArray(o) ? o.map(function(l) {
              i = i.concat(l.abstract);
            }) : i = i.concat(o.abstract);
          }), [{
            tag: "span",
            attributes: {
              class: ["".concat(b.cssPrefix, "-layers")].concat(qe(s)).join(" ")
            },
            children: i
          }];
        });
      }
    };
  }
}, Si = {
  mixout: function() {
    return {
      counter: function(n) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = a.title, s = r === void 0 ? null : r, i = a.classes, o = i === void 0 ? [] : i, l = a.attributes, c = l === void 0 ? {} : l, d = a.styles, u = d === void 0 ? {} : d;
        return wt({
          type: "counter",
          content: n
        }, function() {
          return Te("beforeDOMElementCreation", {
            content: n,
            params: a
          }), ai({
            content: n.toString(),
            title: s,
            extra: {
              attributes: c,
              styles: u,
              classes: ["".concat(b.cssPrefix, "-layers-counter")].concat(qe(o))
            }
          });
        });
      }
    };
  }
}, Ti = {
  mixout: function() {
    return {
      text: function(n) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = a.transform, s = r === void 0 ? re : r, i = a.title, o = i === void 0 ? null : i, l = a.classes, c = l === void 0 ? [] : l, d = a.attributes, u = d === void 0 ? {} : d, g = a.styles, D = g === void 0 ? {} : g;
        return wt({
          type: "text",
          content: n
        }, function() {
          return Te("beforeDOMElementCreation", {
            content: n,
            params: a
          }), An({
            content: n,
            transform: p(p({}, re), s),
            title: o,
            extra: {
              attributes: u,
              styles: D,
              classes: ["".concat(b.cssPrefix, "-layers-text")].concat(qe(c))
            }
          });
        });
      }
    };
  },
  provides: function(t) {
    t.generateLayersText = function(n, a) {
      var r = a.title, s = a.transform, i = a.extra, o = null, l = null;
      if (ha) {
        var c = parseInt(getComputedStyle(n).fontSize, 10), d = n.getBoundingClientRect();
        o = d.width / c, l = d.height / c;
      }
      return b.autoA11y && !r && (i.attributes["aria-hidden"] = "true"), Promise.resolve([n, An({
        content: n.innerHTML,
        width: o,
        height: l,
        transform: s,
        title: r,
        extra: i,
        watchable: !0
      })]);
    };
  }
}, Ci = new RegExp('"', "ug"), $n = [1105920, 1112319];
function Ai(e) {
  var t = e.replace(Ci, ""), n = Yr(t, 0), a = n >= $n[0] && n <= $n[1], r = t.length === 2 ? t[0] === t[1] : !1;
  return {
    value: Ot(r ? t[0] : t),
    isSecondary: a || r
  };
}
function Fn(e, t) {
  var n = "".concat(vr).concat(t.replace(":", "-"));
  return new Promise(function(a, r) {
    if (e.getAttribute(n) !== null)
      return a();
    var s = $e(e.children), i = s.filter(function(J) {
      return J.getAttribute(It) === t;
    })[0], o = ye.getComputedStyle(e, t), l = o.getPropertyValue("font-family").match(Dr), c = o.getPropertyValue("font-weight"), d = o.getPropertyValue("content");
    if (i && !l)
      return e.removeChild(i), a();
    if (l && d !== "none" && d !== "") {
      var u = o.getPropertyValue("content"), g = ~["Sharp"].indexOf(l[2]) ? O : _, D = ~["Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit"].indexOf(l[2]) ? Be[g][l[2].toLowerCase()] : kr[g][c], y = Ai(u), k = y.value, w = y.isSecondary, h = l[0].startsWith("FontAwesome"), v = Jt(D, k), E = v;
      if (h) {
        var A = xr(k);
        A.iconName && A.prefix && (v = A.iconName, D = A.prefix);
      }
      if (v && !w && (!i || i.getAttribute(Vt) !== D || i.getAttribute(xt) !== E)) {
        e.setAttribute(n, E), i && e.removeChild(i);
        var N = pi(), ne = N.extra;
        ne.attributes[It] = t, Wt(v, D).then(function(J) {
          var Et = en(p(p({}, N), {}, {
            icons: {
              main: J,
              mask: Zt()
            },
            prefix: D,
            iconName: E,
            extra: ne,
            watchable: !0
          })), ve = M.createElement("svg");
          t === "::before" ? e.insertBefore(ve, e.firstChild) : e.appendChild(ve), ve.outerHTML = Et.map(function(Za) {
            return Ke(Za);
          }).join(`
`), e.removeAttribute(n), a();
        }).catch(r);
      } else
        a();
    } else
      a();
  });
}
function _i(e) {
  return Promise.all([Fn(e, "::before"), Fn(e, "::after")]);
}
function Mi(e) {
  return e.parentNode !== document.head && !~pr.indexOf(e.tagName.toUpperCase()) && !e.getAttribute(It) && (!e.parentNode || e.parentNode.tagName !== "svg");
}
function Rn(e) {
  if (he)
    return new Promise(function(t, n) {
      var a = $e(e.querySelectorAll("*")).filter(Mi).map(_i), r = tn.begin("searchPseudoElements");
      Fa(), Promise.all(a).then(function() {
        r(), Yt(), t();
      }).catch(function() {
        r(), Yt(), n();
      });
    });
}
var Pi = {
  hooks: function() {
    return {
      mutationObserverCallbacks: function(n) {
        return n.pseudoElementsCallback = Rn, n;
      }
    };
  },
  provides: function(t) {
    t.pseudoElements2svg = function(n) {
      var a = n.node, r = a === void 0 ? M : a;
      b.searchPseudoElements && Rn(r);
    };
  }
}, Nn = !1, Li = {
  mixout: function() {
    return {
      dom: {
        unwatch: function() {
          Fa(), Nn = !0;
        }
      }
    };
  },
  hooks: function() {
    return {
      bootstrap: function() {
        Ln(Ft("mutationObserverCallbacks", {}));
      },
      noAuto: function() {
        mi();
      },
      watch: function(n) {
        var a = n.observeMutationsRoot;
        Nn ? Yt() : Ln(Ft("mutationObserverCallbacks", {
          observeMutationsRoot: a
        }));
      }
    };
  }
}, Wn = function(t) {
  var n = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return t.toLowerCase().split(" ").reduce(function(a, r) {
    var s = r.toLowerCase().split("-"), i = s[0], o = s.slice(1).join("-");
    if (i && o === "h")
      return a.flipX = !0, a;
    if (i && o === "v")
      return a.flipY = !0, a;
    if (o = parseFloat(o), isNaN(o))
      return a;
    switch (i) {
      case "grow":
        a.size = a.size + o;
        break;
      case "shrink":
        a.size = a.size - o;
        break;
      case "left":
        a.x = a.x - o;
        break;
      case "right":
        a.x = a.x + o;
        break;
      case "up":
        a.y = a.y - o;
        break;
      case "down":
        a.y = a.y + o;
        break;
      case "rotate":
        a.rotate = a.rotate + o;
        break;
    }
    return a;
  }, n);
}, Ii = {
  mixout: function() {
    return {
      parse: {
        transform: function(n) {
          return Wn(n);
        }
      }
    };
  },
  hooks: function() {
    return {
      parseNodeAttributes: function(n, a) {
        var r = a.getAttribute("data-fa-transform");
        return r && (n.transform = Wn(r)), n;
      }
    };
  },
  provides: function(t) {
    t.generateAbstractTransformGrouping = function(n) {
      var a = n.main, r = n.transform, s = n.containerWidth, i = n.iconWidth, o = {
        transform: "translate(".concat(s / 2, " 256)")
      }, l = "translate(".concat(r.x * 32, ", ").concat(r.y * 32, ") "), c = "scale(".concat(r.size / 16 * (r.flipX ? -1 : 1), ", ").concat(r.size / 16 * (r.flipY ? -1 : 1), ") "), d = "rotate(".concat(r.rotate, " 0 0)"), u = {
        transform: "".concat(l, " ").concat(c, " ").concat(d)
      }, g = {
        transform: "translate(".concat(i / 2 * -1, " -256)")
      }, D = {
        outer: o,
        inner: u,
        path: g
      };
      return {
        tag: "g",
        attributes: p({}, D.outer),
        children: [{
          tag: "g",
          attributes: p({}, D.inner),
          children: [{
            tag: a.icon.tag,
            children: a.icon.children,
            attributes: p(p({}, a.icon.attributes), D.path)
          }]
        }]
      };
    };
  }
}, At = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function Hn(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e;
}
function Oi(e) {
  return e.tag === "g" ? e.children : [e];
}
var $i = {
  hooks: function() {
    return {
      parseNodeAttributes: function(n, a) {
        var r = a.getAttribute("data-fa-mask"), s = r ? kt(r.split(" ").map(function(i) {
          return i.trim();
        })) : Zt();
        return s.prefix || (s.prefix = be()), n.mask = s, n.maskId = a.getAttribute("data-fa-mask-id"), n;
      }
    };
  },
  provides: function(t) {
    t.generateAbstractMask = function(n) {
      var a = n.children, r = n.attributes, s = n.main, i = n.mask, o = n.maskId, l = n.transform, c = s.width, d = s.icon, u = i.width, g = i.icon, D = Ir({
        transform: l,
        containerWidth: u,
        iconWidth: c
      }), y = {
        tag: "rect",
        attributes: p(p({}, At), {}, {
          fill: "white"
        })
      }, k = d.children ? {
        children: d.children.map(Hn)
      } : {}, w = {
        tag: "g",
        attributes: p({}, D.inner),
        children: [Hn(p({
          tag: d.tag,
          attributes: p(p({}, d.attributes), D.path)
        }, k))]
      }, h = {
        tag: "g",
        attributes: p({}, D.outer),
        children: [w]
      }, v = "mask-".concat(o || Ve()), E = "clip-".concat(o || Ve()), A = {
        tag: "mask",
        attributes: p(p({}, At), {}, {
          id: v,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        }),
        children: [y, h]
      }, N = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: E
          },
          children: Oi(g)
        }, A]
      };
      return a.push(N, {
        tag: "rect",
        attributes: p({
          fill: "currentColor",
          "clip-path": "url(#".concat(E, ")"),
          mask: "url(#".concat(v, ")")
        }, At)
      }), {
        children: a,
        attributes: r
      };
    };
  }
}, Fi = {
  provides: function(t) {
    var n = !1;
    ye.matchMedia && (n = ye.matchMedia("(prefers-reduced-motion: reduce)").matches), t.missingIconAbstract = function() {
      var a = [], r = {
        fill: "currentColor"
      }, s = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      a.push({
        tag: "path",
        attributes: p(p({}, r), {}, {
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
      });
      var i = p(p({}, s), {}, {
        attributeName: "opacity"
      }), o = {
        tag: "circle",
        attributes: p(p({}, r), {}, {
          cx: "256",
          cy: "364",
          r: "28"
        }),
        children: []
      };
      return n || o.children.push({
        tag: "animate",
        attributes: p(p({}, s), {}, {
          attributeName: "r",
          values: "28;14;28;28;14;28;"
        })
      }, {
        tag: "animate",
        attributes: p(p({}, i), {}, {
          values: "1;0;1;1;0;1;"
        })
      }), a.push(o), a.push({
        tag: "path",
        attributes: p(p({}, r), {}, {
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        }),
        children: n ? [] : [{
          tag: "animate",
          attributes: p(p({}, i), {}, {
            values: "1;0;0;0;0;1;"
          })
        }]
      }), n || a.push({
        tag: "path",
        attributes: p(p({}, r), {}, {
          opacity: "0",
          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        }),
        children: [{
          tag: "animate",
          attributes: p(p({}, i), {}, {
            values: "0;0;1;1;0;0;"
          })
        }]
      }), {
        tag: "g",
        attributes: {
          class: "missing"
        },
        children: a
      };
    };
  }
}, Ri = {
  hooks: function() {
    return {
      parseNodeAttributes: function(n, a) {
        var r = a.getAttribute("data-fa-symbol"), s = r === null ? !1 : r === "" ? !0 : r;
        return n.symbol = s, n;
      }
    };
  }
}, Ni = [Fr, wi, Ei, Si, Ti, Pi, Li, Ii, $i, Fi, Ri];
Kr(Ni, {
  mixoutsTo: G
});
G.noAuto;
var Na = G.config;
G.library;
G.dom;
var gt = G.parse;
G.findIconDefinition;
G.toHtml;
var Wi = G.icon;
G.layer;
var Hi = G.text;
G.counter;
function Yn(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function ee(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yn(Object(n), !0).forEach(function(a) {
      B(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yn(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function pt(e) {
  return pt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pt(e);
}
function B(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Yi(e, t) {
  if (e == null)
    return {};
  var n = {}, a = Object.keys(e), r, s;
  for (s = 0; s < a.length; s++)
    r = a[s], !(t.indexOf(r) >= 0) && (n[r] = e[r]);
  return n;
}
function zi(e, t) {
  if (e == null)
    return {};
  var n = Yi(e, t), a, r;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++)
      a = s[r], !(t.indexOf(a) >= 0) && Object.prototype.propertyIsEnumerable.call(e, a) && (n[a] = e[a]);
  }
  return n;
}
function zt(e) {
  return ji(e) || Bi(e) || Ui(e) || Xi();
}
function ji(e) {
  if (Array.isArray(e))
    return jt(e);
}
function Bi(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Ui(e, t) {
  if (e) {
    if (typeof e == "string")
      return jt(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return jt(e, t);
  }
}
function jt(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = new Array(t); n < t; n++)
    a[n] = e[n];
  return a;
}
function Xi() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Vi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Wa = { exports: {} };
(function(e) {
  (function(t) {
    var n = function(h, v, E) {
      if (!c(v) || u(v) || g(v) || D(v) || l(v))
        return v;
      var A, N = 0, ne = 0;
      if (d(v))
        for (A = [], ne = v.length; N < ne; N++)
          A.push(n(h, v[N], E));
      else {
        A = {};
        for (var J in v)
          Object.prototype.hasOwnProperty.call(v, J) && (A[h(J, E)] = n(h, v[J], E));
      }
      return A;
    }, a = function(h, v) {
      v = v || {};
      var E = v.separator || "_", A = v.split || /(?=[A-Z])/;
      return h.split(A).join(E);
    }, r = function(h) {
      return y(h) ? h : (h = h.replace(/[\-_\s]+(.)?/g, function(v, E) {
        return E ? E.toUpperCase() : "";
      }), h.substr(0, 1).toLowerCase() + h.substr(1));
    }, s = function(h) {
      var v = r(h);
      return v.substr(0, 1).toUpperCase() + v.substr(1);
    }, i = function(h, v) {
      return a(h, v).toLowerCase();
    }, o = Object.prototype.toString, l = function(h) {
      return typeof h == "function";
    }, c = function(h) {
      return h === Object(h);
    }, d = function(h) {
      return o.call(h) == "[object Array]";
    }, u = function(h) {
      return o.call(h) == "[object Date]";
    }, g = function(h) {
      return o.call(h) == "[object RegExp]";
    }, D = function(h) {
      return o.call(h) == "[object Boolean]";
    }, y = function(h) {
      return h = h - 0, h === h;
    }, k = function(h, v) {
      var E = v && "process" in v ? v.process : v;
      return typeof E != "function" ? h : function(A, N) {
        return E(A, h, N);
      };
    }, w = {
      camelize: r,
      decamelize: i,
      pascalize: s,
      depascalize: i,
      camelizeKeys: function(h, v) {
        return n(k(r, v), h);
      },
      decamelizeKeys: function(h, v) {
        return n(k(i, v), h, v);
      },
      pascalizeKeys: function(h, v) {
        return n(k(s, v), h);
      },
      depascalizeKeys: function() {
        return this.decamelizeKeys.apply(this, arguments);
      }
    };
    e.exports ? e.exports = w : t.humps = w;
  })(Vi);
})(Wa);
var xi = Wa.exports, qi = ["class", "style"];
function Gi(e) {
  return e.split(";").map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t;
  }).reduce(function(t, n) {
    var a = n.indexOf(":"), r = xi.camelize(n.slice(0, a)), s = n.slice(a + 1).trim();
    return t[r] = s, t;
  }, {});
}
function Ki(e) {
  return e.split(/\s+/).reduce(function(t, n) {
    return t[n] = !0, t;
  }, {});
}
function an(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof e == "string")
    return e;
  var a = (e.children || []).map(function(l) {
    return an(l);
  }), r = Object.keys(e.attributes || {}).reduce(function(l, c) {
    var d = e.attributes[c];
    switch (c) {
      case "class":
        l.class = Ki(d);
        break;
      case "style":
        l.style = Gi(d);
        break;
      default:
        l.attrs[c] = d;
    }
    return l;
  }, {
    attrs: {},
    class: {},
    style: {}
  });
  n.class;
  var s = n.style, i = s === void 0 ? {} : s, o = zi(n, qi);
  return oa(e.tag, ee(ee(ee({}, t), {}, {
    class: r.class,
    style: ee(ee({}, r.style), i)
  }, r.attrs), o), a);
}
var Ha = !1;
try {
  Ha = process.env.NODE_ENV === "production";
} catch {
}
function Qi() {
  if (!Ha && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function ze(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? B({}, e, t) : {};
}
function Ji(e) {
  var t, n = (t = {
    "fa-spin": e.spin,
    "fa-pulse": e.pulse,
    "fa-fw": e.fixedWidth,
    "fa-border": e.border,
    "fa-li": e.listItem,
    "fa-inverse": e.inverse,
    "fa-flip": e.flip === !0,
    "fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both",
    "fa-flip-vertical": e.flip === "vertical" || e.flip === "both"
  }, B(t, "fa-".concat(e.size), e.size !== null), B(t, "fa-rotate-".concat(e.rotation), e.rotation !== null), B(t, "fa-pull-".concat(e.pull), e.pull !== null), B(t, "fa-swap-opacity", e.swapOpacity), B(t, "fa-bounce", e.bounce), B(t, "fa-shake", e.shake), B(t, "fa-beat", e.beat), B(t, "fa-fade", e.fade), B(t, "fa-beat-fade", e.beatFade), B(t, "fa-flash", e.flash), B(t, "fa-spin-pulse", e.spinPulse), B(t, "fa-spin-reverse", e.spinReverse), t);
  return Object.keys(n).map(function(a) {
    return n[a] ? a : null;
  }).filter(function(a) {
    return a;
  });
}
function zn(e) {
  if (e && pt(e) === "object" && e.prefix && e.iconName && e.icon)
    return e;
  if (gt.icon)
    return gt.icon(e);
  if (e === null)
    return null;
  if (pt(e) === "object" && e.prefix && e.iconName)
    return e;
  if (Array.isArray(e) && e.length === 2)
    return {
      prefix: e[0],
      iconName: e[1]
    };
  if (typeof e == "string")
    return {
      prefix: "fas",
      iconName: e
    };
}
var Qe = H({
  name: "FontAwesomeIcon",
  props: {
    border: {
      type: Boolean,
      default: !1
    },
    fixedWidth: {
      type: Boolean,
      default: !1
    },
    flip: {
      type: [Boolean, String],
      default: !1,
      validator: function(t) {
        return [!0, !1, "horizontal", "vertical", "both"].indexOf(t) > -1;
      }
    },
    icon: {
      type: [Object, Array, String],
      required: !0
    },
    mask: {
      type: [Object, Array, String],
      default: null
    },
    listItem: {
      type: Boolean,
      default: !1
    },
    pull: {
      type: String,
      default: null,
      validator: function(t) {
        return ["right", "left"].indexOf(t) > -1;
      }
    },
    pulse: {
      type: Boolean,
      default: !1
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: function(t) {
        return [90, 180, 270].indexOf(Number.parseInt(t, 10)) > -1;
      }
    },
    swapOpacity: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: null,
      validator: function(t) {
        return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(t) > -1;
      }
    },
    spin: {
      type: Boolean,
      default: !1
    },
    transform: {
      type: [String, Object],
      default: null
    },
    symbol: {
      type: [Boolean, String],
      default: !1
    },
    title: {
      type: String,
      default: null
    },
    inverse: {
      type: Boolean,
      default: !1
    },
    bounce: {
      type: Boolean,
      default: !1
    },
    shake: {
      type: Boolean,
      default: !1
    },
    beat: {
      type: Boolean,
      default: !1
    },
    fade: {
      type: Boolean,
      default: !1
    },
    beatFade: {
      type: Boolean,
      default: !1
    },
    flash: {
      type: Boolean,
      default: !1
    },
    spinPulse: {
      type: Boolean,
      default: !1
    },
    spinReverse: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(t, n) {
    var a = n.attrs, r = Z(function() {
      return zn(t.icon);
    }), s = Z(function() {
      return ze("classes", Ji(t));
    }), i = Z(function() {
      return ze("transform", typeof t.transform == "string" ? gt.transform(t.transform) : t.transform);
    }), o = Z(function() {
      return ze("mask", zn(t.mask));
    }), l = Z(function() {
      return Wi(r.value, ee(ee(ee(ee({}, s.value), i.value), o.value), {}, {
        symbol: t.symbol,
        title: t.title
      }));
    });
    rr(l, function(d) {
      if (!d)
        return Qi("Could not find one or more icon(s)", r.value, o.value);
    }, {
      immediate: !0
    });
    var c = Z(function() {
      return l.value ? an(l.value.abstract[0], {}, a) : null;
    });
    return function() {
      return c.value;
    };
  }
});
H({
  name: "FontAwesomeLayers",
  props: {
    fixedWidth: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(t, n) {
    var a = n.slots, r = Na.familyPrefix, s = Z(function() {
      return ["".concat(r, "-layers")].concat(zt(t.fixedWidth ? ["".concat(r, "-fw")] : []));
    });
    return function() {
      return oa("div", {
        class: s.value
      }, a.default ? a.default() : []);
    };
  }
});
H({
  name: "FontAwesomeLayersText",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    transform: {
      type: [String, Object],
      default: null
    },
    counter: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      default: null,
      validator: function(t) {
        return ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(t) > -1;
      }
    }
  },
  setup: function(t, n) {
    var a = n.attrs, r = Na.familyPrefix, s = Z(function() {
      return ze("classes", [].concat(zt(t.counter ? ["".concat(r, "-layers-counter")] : []), zt(t.position ? ["".concat(r, "-layers-").concat(t.position)] : [])));
    }), i = Z(function() {
      return ze("transform", typeof t.transform == "string" ? gt.transform(t.transform) : t.transform);
    }), o = Z(function() {
      var c = Hi(t.value.toString(), ee(ee({}, i.value), s.value)), d = c.abstract;
      return t.counter && (d[0].attributes.class = d[0].attributes.class.replace("fa-layers-text", "")), d[0];
    }), l = Z(function() {
      return an(o.value, {}, a);
    });
    return function() {
      return l.value;
    };
  }
});
var Zi = {
  prefix: "fas",
  iconName: "circle-chevron-right",
  icon: [512, 512, ["chevron-circle-right"], "f138", "M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"]
}, es = Zi, ts = {
  prefix: "fas",
  iconName: "user",
  icon: [448, 512, [128100, 62144], "f007", "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"]
}, ns = {
  prefix: "fas",
  iconName: "circle-question",
  icon: [512, 512, [62108, "question-circle"], "f059", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]
}, as = ns, rs = {
  prefix: "fas",
  iconName: "comment",
  icon: [512, 512, [128489, 61669], "f075", "M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"]
}, is = {
  prefix: "fas",
  iconName: "clock",
  icon: [512, 512, [128339, "clock-four"], "f017", "M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]
}, ss = {
  prefix: "fas",
  iconName: "location-dot",
  icon: [384, 512, ["map-marker-alt"], "f3c5", "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"]
}, rn = ss, os = {
  prefix: "fas",
  iconName: "xmark",
  icon: [320, 512, [128473, 10005, 10006, 10060, 215, "close", "multiply", "remove", "times"], "f00d", "M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"]
}, Ya = os, ls = {
  prefix: "fas",
  iconName: "chevron-left",
  icon: [320, 512, [9001], "f053", "M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"]
}, cs = {
  prefix: "fas",
  iconName: "chevron-right",
  icon: [320, 512, [9002], "f054", "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"]
}, ds = {
  prefix: "fas",
  iconName: "circle-chevron-left",
  icon: [512, 512, ["chevron-circle-left"], "f137", "M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"]
}, us = ds, fs = {
  prefix: "fas",
  iconName: "calendar-day",
  icon: [448, 512, [], "f783", "M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z"]
};
const ms = H({
  name: "DatePicker",
  components: { FontAwesomeIcon: Qe },
  props: {
    mode: {
      type: String,
      default: "week"
    },
    timeProp: {
      type: Object,
      default: null
    },
    periodProp: {
      type: Object,
      default: null
    },
    firstDayOfWeek: {
      type: String,
      default: ""
    },
    defaultDate: {
      type: Date,
      default: /* @__PURE__ */ new Date()
    },
    /** For usage of the component as a stand-alone component, outside Qalendar */
    locale: {
      type: String,
      default: ""
    },
    disableDates: {
      type: Object,
      default: null
    }
    /** End of props for stand-alone component  */
  },
  emits: ["updated"],
  data() {
    var e, t;
    return {
      periodText: "",
      weekPickerDates: [],
      monthPickerDates: [],
      icons: {
        calendarIcon: fs,
        chevronLeft: us,
        chevronRight: es
      },
      showDatePicker: !!(this.locale && this.firstDayOfWeek),
      // Set to automatic show, when used as a standalone component
      /**
       * Though selectedDate might look identical to datePickerCurrentDate, it is not
       * There is a need for separate state for:
       * 1. (datePickerCurrentDate) the current date governing what to show in the week picker.
       * This changes as the user browses between weeks, months and years
       *
       * 2. (selectedDate) the selected date of the entire calendar.
       * This should not change as the user browses in the date picker, only when the user
       * PICKS a date in the date picker
       * */
      datePickerCurrentDate: ((e = this.periodProp) == null ? void 0 : e.selectedDate) || this.defaultDate || /* @__PURE__ */ new Date(),
      selectedDate: ((t = this.periodProp) == null ? void 0 : t.selectedDate) || /* @__PURE__ */ new Date(),
      datePickerMode: "month",
      weekDays: [],
      // Used only for printing week day names,
      time: this.timeProp ? this.timeProp : new se(this.firstDayOfWeek, this.locale),
      period: this.periodProp || {
        start: /* @__PURE__ */ new Date(),
        end: /* @__PURE__ */ new Date(),
        selectedDate: this.defaultDate ? this.defaultDate : /* @__PURE__ */ new Date()
      }
    };
  },
  computed: {
    /**
     * If both following props are set, this means the component is being used as a stand alone component
     * and not inside Qalendar
     * */
    isStandAloneComponent() {
      return this.locale && this.firstDayOfWeek;
    }
  },
  mounted() {
    this.hydrateDatePicker();
  },
  methods: {
    setMonthDaysInWeekPicker(e = (/* @__PURE__ */ new Date()).getMonth(), t = (/* @__PURE__ */ new Date()).getFullYear()) {
      this.weekPickerDates = [], this.weekPickerDates = this.time.getCalendarMonthSplitInWeeks(
        t,
        e
      );
    },
    togglePeriodSelector() {
      this.weekPickerDates = this.time.getCalendarMonthSplitInWeeks(
        this.datePickerCurrentDate.getFullYear(),
        this.datePickerCurrentDate.getMonth()
      ), this.showDatePicker = !this.showDatePicker;
    },
    setWeek(e, t = !1) {
      t || (this.datePickerCurrentDate = e);
      const n = this.time.getCalendarWeekDateObjects(e);
      this.weekDays = n;
      const a = n[0], r = n[6];
      switch (this.mode) {
        case "week":
          this.periodText = `${this.time.getLocalizedDateString(
            a
          )} - ${this.time.getLocalizedDateString(r)}`;
          break;
        case "month":
          this.periodText = this.time.getLocalizedNameOfMonth(e);
          break;
        default:
          this.periodText = this.time.getLocalizedDateString(e);
      }
      t || this.emitChange(a, r);
    },
    setMonth(e) {
      this.datePickerCurrentDate = e, this.setMonthDaysInWeekPicker(e.getMonth(), e.getFullYear()), this.datePickerMode = "month", this.showDatePicker = !0;
    },
    emitChange(e, t) {
      if (this.selectedDate = this.datePickerCurrentDate, this.mode === "month") {
        const n = this.time.getCalendarMonthSplitInWeeks(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth()
        );
        e = n[0][0];
        const a = n[n.length - 1];
        t = a[a.length - 1];
      } else
        this.mode === "day" && (e = this.selectedDate, t = this.selectedDate);
      this.isStandAloneComponent ? this.$emit("updated", {
        year: this.datePickerCurrentDate.getFullYear(),
        month: this.datePickerCurrentDate.getMonth(),
        date: this.datePickerCurrentDate.getDate()
      }) : this.$emit("updated", {
        start: new Date(
          e.getFullYear(),
          e.getMonth(),
          e.getDate(),
          0,
          0,
          0
        ),
        end: this.time.setDateToEndOfDay(t),
        selectedDate: this.datePickerCurrentDate
      });
    },
    toggleDatePickerPeriod(e) {
      const t = new Date(this.datePickerCurrentDate);
      if (this.datePickerMode === "month") {
        const n = new Date(
          t.getFullYear(),
          e === "previous" ? t.getMonth() - 1 : t.getMonth() + 1,
          1
        );
        this.setMonthDaysInWeekPicker(
          n.getMonth(),
          n.getFullYear()
        ), this.datePickerCurrentDate = n;
      } else
        this.monthPickerDates = this.time.getCalendarYearMonths(
          e === "previous" ? t.getFullYear() - 1 : t.getFullYear() + 1
        ), this.datePickerCurrentDate = new Date(this.monthPickerDates[0]);
    },
    toggleDatePickerMode() {
      if (this.datePickerMode === "month")
        return this.monthPickerDates = this.time.getCalendarYearMonths(
          this.datePickerCurrentDate.getFullYear()
        ), this.datePickerMode = "year";
      this.weekPickerDates = this.time.getCalendarMonthSplitInWeeks(
        this.datePickerCurrentDate.getFullYear(),
        this.datePickerCurrentDate.getMonth()
      ), this.datePickerMode = "month";
    },
    getLocale() {
      return this.time.CALENDAR_LOCALE;
    },
    goToPeriod(e) {
      let t, n;
      if (this.mode === "week") {
        const a = this.time.getCalendarWeekDateObjects(
          this.datePickerCurrentDate
        );
        t = new Date(a[0]), n = e === "next" ? t.getDate() + 7 : t.getDate() - 7, t.setDate(n);
      } else
        this.mode === "month" ? (t = new Date(this.datePickerCurrentDate), t.setMonth(
          e === "next" ? t.getMonth() + 1 : t.getMonth() - 1
        ), t.setDate(1)) : (t = new Date(this.datePickerCurrentDate), n = e === "next" ? t.getDate() + 1 : t.getDate() - 1, t.setDate(n));
      this.setWeek(t);
    },
    hideDatePicker() {
      this.isStandAloneComponent || setTimeout(() => this.showDatePicker = !1, 100);
    },
    hydrateDatePicker() {
      const e = this.datePickerCurrentDate;
      this.setMonthDaysInWeekPicker(e.getMonth(), e.getFullYear()), this.setWeek(e, !0);
    },
    checkIfDateIsDisabled(e) {
      return this.disableDates ? e.getTime() < this.disableDates.before.getTime() ? !0 : e.getTime() > this.disableDates.after.getTime() : !1;
    }
  }
});
const j = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, r] of t)
    n[a] = r;
  return n;
}, hs = { class: "date-picker__value-display-text" }, vs = { class: "date-picker__week-picker-navigation" }, gs = {
  key: 0,
  class: "date-picker__day-names week"
}, ps = ["onClick"], ys = { class: "months" }, bs = ["onClick"];
function Ds(e, t, n, a, r, s) {
  const i = $("font-awesome-icon");
  return f(), m("div", {
    class: x(["date-picker", e.isStandAloneComponent ? "date-picker-root" : "is-in-qalendar"]),
    onMouseleave: t[5] || (t[5] = (...o) => e.hideDatePicker && e.hideDatePicker(...o))
  }, [
    e.isStandAloneComponent ? S("", !0) : (f(), m("div", {
      key: 0,
      class: "date-picker__value-display",
      onClick: t[0] || (t[0] = (...o) => e.togglePeriodSelector && e.togglePeriodSelector(...o))
    }, [
      L(i, {
        icon: e.icons.calendarIcon
      }, null, 8, ["icon"]),
      T("span", hs, C(e.periodText), 1)
    ])),
    e.showDatePicker ? (f(), m("div", {
      key: 1,
      class: x(["date-picker__week-picker", { "is-in-qalendar": !e.isStandAloneComponent }]),
      onMouseleave: t[4] || (t[4] = (...o) => e.hideDatePicker && e.hideDatePicker(...o))
    }, [
      T("div", vs, [
        L(i, {
          class: "is-icon is-chevron-left",
          icon: e.icons.chevronLeft,
          onClick: t[1] || (t[1] = (o) => e.toggleDatePickerPeriod("previous"))
        }, null, 8, ["icon"]),
        T("span", {
          class: "date-picker__toggle-mode",
          onClick: t[2] || (t[2] = (...o) => e.toggleDatePickerMode && e.toggleDatePickerMode(...o))
        }, [
          e.datePickerMode === "month" ? (f(), m(I, { key: 0 }, [
            le(C(e.datePickerCurrentDate.toLocaleString(e.getLocale(), {
              month: "long",
              year: "numeric"
            })), 1)
          ], 64)) : e.datePickerMode === "year" ? (f(), m(I, { key: 1 }, [
            le(C(new Date(e.datePickerCurrentDate).toLocaleString(e.getLocale(), {
              year: "numeric"
            })), 1)
          ], 64)) : S("", !0)
        ]),
        L(i, {
          class: "is-icon is-chevron-right",
          icon: e.icons.chevronRight,
          onClick: t[3] || (t[3] = (o) => e.toggleDatePickerPeriod("next"))
        }, null, 8, ["icon"])
      ]),
      e.datePickerMode === "month" ? (f(), m("div", gs, [
        (f(!0), m(I, null, z(e.weekDays, (o) => (f(), m("span", {
          key: o.getDate()
        }, C(e.time.getLocalizedNameOfWeekday(o, "short")), 1))), 128))
      ])) : S("", !0),
      (f(!0), m(I, null, z(e.weekPickerDates, (o, l) => mn((f(), m("div", {
        key: l,
        class: x([
          "week",
          e.time.dateIsInWeek(e.selectedDate, o) && !e.isStandAloneComponent ? "is-active" : ""
        ])
      }, [
        (f(!0), m(I, null, z(o, (c, d) => (f(), m("span", {
          key: l + d,
          class: x({
            "is-weekend": [5, 6].includes(d),
            "is-not-in-month": c.getMonth() !== e.datePickerCurrentDate.getMonth(),
            "has-day": c,
            "is-today": e.time.dateIsToday(c),
            "is-disabled": e.checkIfDateIsDisabled(c)
          }),
          onClick: (u) => e.checkIfDateIsDisabled(c) ? null : e.setWeek(c)
        }, C(c ? c.getDate() : ""), 11, ps))), 128))
      ], 2)), [
        [hn, e.datePickerMode === "month"]
      ])), 128)),
      mn(T("div", ys, [
        (f(!0), m(I, null, z(e.monthPickerDates, (o, l) => (f(), m("span", {
          key: l,
          class: "has-month",
          onClick: (c) => e.setMonth(o)
        }, C(new Date(o).toLocaleString(e.getLocale(), { month: "long" })), 9, bs))), 128))
      ], 512), [
        [hn, e.datePickerMode === "year"]
      ])
    ], 34)) : S("", !0)
  ], 34);
}
const ks = /* @__PURE__ */ j(ms, [["render", Ds], ["__scopeId", "data-v-67f77862"]]), ws = {
  /** The following three keys, describe the calendar modes */
  week: {
    "it-IT": "Settimana",
    "en-US": "Week",
    "de-DE": "Woche",
    "sv-SE": "Vecka",
    "zh-CN": "周",
    "pt-BR": "Semana",
    "fr-FR": "Semaine",
    "th-TH": "สัปดาห์",
    "nl-NL": "Week",
    "ru-RU": "Неделя",
    "ar-YE": "إسبوع",
    "es-ES": "Semana",
    "ja-JP": "週",
    "pl-PL": "Tydzień",
    "hu-HU": "Hét"
  },
  month: {
    "it-IT": "Mese",
    "en-US": "Month",
    "de-DE": "Monat",
    "sv-SE": "Månad",
    "zh-CN": "月",
    "pt-BR": "Mês",
    "fr-FR": "Mois",
    "th-TH": "เดือน",
    "nl-NL": "Maand",
    "ru-RU": "Месяц",
    "ar-YE": "شهر",
    "es-ES": "Mes",
    "ja-JP": "月",
    "pl-PL": "Miesiąc",
    "hu-HU": "Hónap"
  },
  day: {
    "it-IT": "Giorno",
    "en-US": "Day",
    "de-DE": "Tag",
    "sv-SE": "Dag",
    "zh-CN": "日",
    "pt-BR": "Dia",
    "fr-FR": "Jour",
    "th-TH": "วัน",
    "nl-NL": "Dag",
    "ru-RU": "День",
    "ar-YE": "يوم",
    "es-ES": "Día",
    "ja-JP": "日",
    "pl-PL": "Dzień",
    "hu-HU": "Nap"
  },
  /** Other keys */
  moreEvents: {
    "it-IT": "+ altri eventi",
    "en-US": "+ more info",
    "de-DE": "+ weitere Ereignisse",
    "sv-SE": "+ fler event",
    "zh-CN": "列出其他结果",
    "pt-BR": "+ mais informações",
    "fr-FR": "+ d'autres événements",
    "th-TH": "+ เหตุการณ์เพิ่มเติม",
    "nl-NL": "meer evenementen",
    "ru-RU": "+ ещё события",
    "ar-YE": "+ المزيد من الأحداث",
    "es-ES": "más eventos",
    "ja-JP": "その他イベント",
    "pl-PL": "+ więcej wydarzeń",
    "hu-HU": "További események"
  },
  noEvent: {
    "it-IT": "Nessun evento",
    "en-US": "No events",
    "de-DE": "Keine Ereignisse",
    "sv-SE": "Inga event",
    "zh-CN": "沒有活動",
    "pt-BR": "Sem eventos",
    "fr-FR": "Aucun Evènement",
    "th-TH": "ไม่มีกิจกรรม",
    "nl-NL": "Geen evenementen",
    "ru-RU": "Нет событий",
    "ar-YE": "لا أحداث",
    "es-ES": "No hay eventos",
    "ja-JP": "イベントなし",
    "pl-PL": "Brak wydarzeń",
    "hu-HU": "Nincs esemény"
  }
}, jn = /* @__PURE__ */ new Map([
  ["de", "de-DE"],
  ["en", "en-US"],
  ["it", "it-IT"],
  ["sv", "sv-SE"],
  ["zh", "zh-CN"],
  ["pt", "pt-BR"],
  ["fr", "fr-FR"],
  ["th", "th-TH"],
  ["nl", "nl-NL"],
  ["ru", "ru-RU"],
  ["ar", "ar-YE"],
  ["es", "es-ES"],
  ["ja", "ja-JP"],
  ["pl", "pl-PL"],
  ["hu", "hu-HU"]
]), sn = {
  data() {
    return {
      languageKeys: ws
    };
  },
  methods: {
    getLanguage(e, t) {
      return t = this.overrideShortLocaleWithLongLocale(t), e[t] ? e[t] : e["en-US"];
    },
    overrideShortLocaleWithLongLocale(e) {
      return jn.has(e) && (e = jn.get(e)), e;
    }
  }
}, Es = H({
  name: "AppHeader",
  components: {
    DatePicker: ks,
    FontAwesomeIcon: Qe
  },
  mixins: [sn],
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    mode: {
      type: String,
      default: "week"
    },
    time: {
      type: Object,
      default: () => ({})
    },
    period: {
      type: Object,
      required: !0
    },
    isSmall: {
      type: Boolean,
      required: !0
    }
  },
  emits: ["change-mode", "updated-period"],
  data() {
    return {
      modeOptions: ["month", "week", "day"],
      icons: {
        chevronLeft: ls,
        chevronRight: cs
      },
      currentPeriod: this.period,
      showModePicker: !1
    };
  },
  computed: {
    periodName() {
      var e, t, n;
      if (this.mode === "week") {
        const a = this.time.getLocalizedNameOfMonth(
          (e = this.currentPeriod) == null ? void 0 : e.start,
          "short"
        ), r = this.time.getLocalizedNameOfMonth(
          (t = this.currentPeriod) == null ? void 0 : t.end,
          "short"
        );
        return a === r ? a : `${a} - ${r}`;
      }
      return this.time.getLocalizedNameOfMonth(
        (n = this.currentPeriod) == null ? void 0 : n.selectedDate,
        "short"
      ) + " " + this.currentPeriod.selectedDate.getFullYear();
    },
    modeName() {
      var e;
      return this.getLanguage(
        this.languageKeys[this.mode],
        (e = this.time) == null ? void 0 : e.CALENDAR_LOCALE
      );
    },
    onlyDayModeIsEnabled() {
      var n, a;
      const e = (n = this.config.disableModes) == null ? void 0 : n.includes("week"), t = (a = this.config.disableModes) == null ? void 0 : a.includes("month");
      return this.config.disableModes && e && t;
    }
  },
  watch: {
    isSmall: {
      handler(e) {
        e ? this.modeOptions = ["month", "day"] : this.modeOptions = ["month", "week", "day"];
      },
      immediate: !0
    }
  },
  methods: {
    handlePeriodChange(e) {
      this.currentPeriod = e, this.$emit("updated-period", e);
    },
    goToPeriod(e) {
      this.$refs.periodSelect.goToPeriod(e);
    }
  }
});
const Ss = { class: "calendar-header" }, Ts = {
  key: 0,
  class: "calendar-header__period-name"
}, Cs = { class: "calendar-header__period" }, As = { class: "calendar-header__chevron-arrows" }, _s = {
  key: 0,
  class: "calendar-header__mode-picker"
}, Ms = ["onClick"];
function Ps(e, t, n, a, r, s) {
  const i = $("FontAwesomeIcon"), o = $("DatePicker");
  return f(), m("div", Ss, [
    e.periodName ? (f(), m("div", Ts, C(e.periodName), 1)) : S("", !0),
    T("div", Cs, [
      T("div", As, [
        L(i, {
          class: "calendar-header__chevron-arrow calendar-header__chevron-arrow-left",
          icon: e.icons.chevronLeft,
          onClick: t[0] || (t[0] = (l) => e.goToPeriod("previous"))
        }, null, 8, ["icon"]),
        L(i, {
          class: "calendar-header__chevron-arrow calendar-header__chevron-arrow-right",
          icon: e.icons.chevronRight,
          onClick: t[1] || (t[1] = (l) => e.goToPeriod("next"))
        }, null, 8, ["icon"])
      ]),
      L(o, {
        ref: "periodSelect",
        mode: e.mode,
        "time-prop": e.time,
        "period-prop": e.period,
        onUpdated: e.handlePeriodChange
      }, null, 8, ["mode", "time-prop", "period-prop", "onUpdated"]),
      e.onlyDayModeIsEnabled ? S("", !0) : (f(), m("div", _s, [
        T("div", {
          class: "calendar-header__mode-value",
          onClick: t[2] || (t[2] = (l) => e.showModePicker = !0)
        }, C(e.modeName), 1),
        e.showModePicker ? (f(), m("div", {
          key: 0,
          class: "calendar-header__mode-options",
          onMouseleave: t[3] || (t[3] = (l) => e.showModePicker = !1)
        }, [
          (f(!0), m(I, null, z(e.modeOptions, (l) => (f(), m(I, { key: l }, [
            !e.config.disableModes || !e.config.disableModes.includes(l) ? (f(), m("div", {
              key: 0,
              class: x(["calendar-header__mode-option", "is-" + l + "-mode"]),
              onClick: (c) => e.$emit("change-mode", l)
            }, C(e.getLanguage(e.languageKeys[l], e.time.CALENDAR_LOCALE)), 11, Ms)) : S("", !0)
          ], 64))), 128))
        ], 32)) : S("", !0)
      ]))
    ])
  ]);
}
const Ls = /* @__PURE__ */ j(Es, [["render", Ps], ["__scopeId", "data-v-37f1c389"]]), on = H({
  name: "DayTimeline",
  props: {
    time: {
      type: Object,
      required: !0
    },
    weekHeight: {
      type: String,
      required: !0
    }
  },
  data() {
    return {
      availableHours: [
        0,
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
        1e3,
        1100,
        1200,
        1300,
        1400,
        1500,
        1600,
        1700,
        1800,
        1900,
        2e3,
        2100,
        2200,
        2300
      ],
      timelineHours: []
    };
  },
  mounted() {
    this.timelineHours = this.time.getTimelineHours();
  },
  methods: {
    getLocaleTimeString(e) {
      const { hour: t } = this.time.getHourAndMinutesFromTimePoints(e);
      return this.time.getLocalizedHour(new Date(2100, 1, 1, t));
    }
  }
}), Bn = () => {
  Oe((e) => ({
    "11371d19": e.weekHeight
  }));
}, Un = on.setup;
on.setup = Un ? (e, t) => (Bn(), Un(e, t)) : Bn;
const Is = { class: "day-timeline" }, Os = { class: "day-timeline__hour-text" };
function $s(e, t, n, a, r, s) {
  return f(), m("div", Is, [
    (f(!0), m(I, null, z(e.timelineHours, (i) => (f(), m("div", {
      key: i,
      class: "day-timeline__hour"
    }, [
      T("span", Os, C(e.getLocaleTimeString(i)), 1)
    ]))), 128))
  ]);
}
const Fs = /* @__PURE__ */ j(on, [["render", $s], ["__scopeId", "data-v-014bf4e0"]]), Rs = H({
  name: "FullDayEvent",
  props: {
    scheduleEvent: {
      type: Object,
      default: null
    },
    config: {
      type: Object,
      required: !0
    },
    mode: {
      type: String,
      required: !0
    }
  },
  emits: ["event-was-clicked"],
  data() {
    return {
      colors: xe,
      eventColor: "#fff",
      eventBackgroundColor: "",
      eventElementIdPrefix: "week-timeline__event-id-"
    };
  },
  computed: {
    eventWidth() {
      return this.mode !== "day" ? `calc(${this.scheduleEvent.nDays * 100}% - 6px)` : "calc(100% - 6px)";
    }
  },
  mounted() {
    this.setColors();
  },
  methods: {
    setColors() {
      var e, t, n;
      return (e = this.scheduleEvent) != null && e.colorScheme && ((t = this.config.style) != null && t.colorSchemes) && this.config.style.colorSchemes[this.scheduleEvent.colorScheme] ? (this.eventColor = this.config.style.colorSchemes[this.scheduleEvent.colorScheme].color, this.eventBackgroundColor = this.config.style.colorSchemes[this.scheduleEvent.colorScheme].backgroundColor) : (n = this.scheduleEvent) != null && n.color ? (this.eventColor = "#fff", this.eventBackgroundColor = this.colors[this.scheduleEvent.color]) : this.eventBackgroundColor = this.colors.blue;
    },
    handleClickOnEvent() {
      const e = document.getElementById(
        this.eventElementIdPrefix + this.scheduleEvent.id
      );
      this.$emit("event-was-clicked", {
        clickedEvent: this.scheduleEvent,
        eventElement: e
      });
    }
  }
});
const Ns = ["id"], Ws = {
  key: 1,
  class: "week-timeline__event"
};
function Hs(e, t, n, a, r, s) {
  return e.scheduleEvent ? (f(), m("div", {
    key: 0,
    id: `${e.eventElementIdPrefix}${e.scheduleEvent.id}`,
    class: "week-timeline__event is-event",
    style: ce({
      width: e.eventWidth,
      color: e.eventColor,
      backgroundColor: e.eventBackgroundColor,
      zIndex: 1
    }),
    onClick: t[0] || (t[0] = (...i) => e.handleClickOnEvent && e.handleClickOnEvent(...i))
  }, C(e.scheduleEvent.title), 13, Ns)) : (f(), m("div", Ws));
}
const Ys = /* @__PURE__ */ j(Rs, [["render", Hs], ["__scopeId", "data-v-778d59fc"]]), zs = H({
  name: "WeekTimeline",
  components: { FullDayEvent: Ys },
  props: {
    days: {
      type: Array,
      required: !0
    },
    time: {
      type: Object,
      required: !0
    },
    fullDayEvents: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      required: !0
    },
    mode: {
      type: String,
      required: !0
    }
  },
  emits: ["event-was-clicked", "day-was-clicked"],
  data() {
    return {
      now: /* @__PURE__ */ new Date()
    };
  },
  methods: {
    getDaysDate(e) {
      const { date: t } = this.time.getAllVariablesFromDateTimeString(
        e.dateTimeString
      );
      return t;
    }
  }
});
const js = { class: "week-timeline" }, Bs = ["onClick"], Us = { class: "week-timeline__day-name" }, Xs = { class: "week-timeline__date" }, Vs = { class: "week-timeline__events" };
function xs(e, t, n, a, r, s) {
  const i = $("FullDayEvent");
  return f(), m("div", js, [
    (f(!0), m(I, null, z(e.days, (o, l) => (f(), m("div", {
      key: l,
      class: x(["week-timeline__day", {
        "is-today": e.time.getDateTimeStringFromDate(e.now, "start") === o.dateTimeString
      }]),
      onClick: (c) => e.$emit("day-was-clicked", e.time.dateStringFrom(o.dateTimeString))
    }, [
      T("div", Us, C(o.dayName.substring(0, 2).toUpperCase()), 1),
      T("div", Xs, C(e.getDaysDate(o)), 1),
      T("div", Vs, [
        (f(!0), m(I, null, z(o.fullDayEvents, (c, d) => (f(), m(I, { key: d }, [
          d !== "date" ? (f(), V(i, {
            key: 0,
            "schedule-event": typeof c == "object" ? c : null,
            config: e.config,
            mode: e.mode,
            onEventWasClicked: t[0] || (t[0] = (u) => e.$emit("event-was-clicked", u))
          }, null, 8, ["schedule-event", "config", "mode"])) : S("", !0)
        ], 64))), 128))
      ])
    ], 10, Bs))), 128))
  ]);
}
const qs = /* @__PURE__ */ j(zs, [["render", xs], ["__scopeId", "data-v-a43746b6"]]);
var oe = /* @__PURE__ */ ((e) => (e.BACKWARDS = "backwards", e.FORWARDS = "forwards", e))(oe || {});
class Gs {
  constructor(t, n) {
    F(this, "dayStart", "");
    F(this, "dayEnd", "");
    this.timeInstance = t, this.date = n, this.setDayBoundariesTimeStrings();
  }
  canEventBeMoved(t, n) {
    return this.timeInstance.dayMode !== q.FLEXIBLE ? this.handleNonFlexibleDays(n, t) : this.handleFlexibleDays(n, t);
  }
  handleNonFlexibleDays(t, n) {
    return t === oe.FORWARDS ? this.handleForwardsMoveForNonFlexibleDays(n) : this.handleBackwardsMoveForNonFlexibleDays(n);
  }
  handleFlexibleDays(t, n) {
    return t == oe.FORWARDS ? this.handleForwardsMoveForFlexibleDays(n) : this.handleBackwardsMoveForFlexibleDays(n);
  }
  handleForwardsMoveForNonFlexibleDays(t) {
    const n = this.timeInstance.addMinutesToDateTimeString(15, t.time.end), a = this.timeInstance.timeStringFrom(n);
    return this.timeInstance.dateStringFrom(n) > this.date ? !1 : a <= this.dayEnd;
  }
  handleBackwardsMoveForNonFlexibleDays(t) {
    const n = this.timeInstance.addMinutesToDateTimeString(-15, t.time.start), a = this.timeInstance.timeStringFrom(n);
    return this.timeInstance.dateStringFrom(n) < this.date ? !1 : a >= this.dayStart;
  }
  handleForwardsMoveForFlexibleDays(t) {
    const n = this.timeInstance.addMinutesToDateTimeString(15, t.time.end), a = this.timeInstance.timeStringFrom(n);
    return this.timeInstance.dateStringFrom(n) === this.date ? !0 : a <= this.dayEnd;
  }
  handleBackwardsMoveForFlexibleDays(t) {
    const n = this.timeInstance.addMinutesToDateTimeString(-15, t.time.start), a = this.timeInstance.timeStringFrom(n);
    return this.timeInstance.dateStringFrom(n) > this.date ? !0 : a >= this.dayStart;
  }
  setDayBoundariesTimeStrings() {
    const t = this.timeInstance.getHourAndMinutesFromTimePoints(this.timeInstance.DAY_START).hour, n = this.timeInstance.getHourAndMinutesFromTimePoints(this.timeInstance.DAY_END).hour, a = this.timeInstance.doubleDigit(t);
    this.dayStart = `${a}:00`;
    const r = this.timeInstance.doubleDigit(n);
    this.dayEnd = `${r}:00`;
  }
}
const Ks = H({
  name: "DayEvent",
  components: {
    FontAwesomeIcon: Qe
  },
  props: {
    eventProp: {
      type: Object,
      required: !0
    },
    time: {
      type: Object,
      required: !0
    },
    config: {
      type: Object,
      required: !0
    },
    dayInfo: {
      type: Object,
      required: !0
    },
    mode: {
      type: String,
      required: !0
    }
  },
  emits: ["event-was-clicked", "event-was-resized", "event-was-dragged", "drag-start", "drag-end"],
  data() {
    return {
      event: this.eventProp,
      icons: {
        clock: is,
        user: ts,
        description: rs,
        location: rn,
        topic: as
      },
      showResizeElements: !1,
      eventTransformValue: "initial",
      eventZIndexValue: "initial",
      dayElement: document.querySelector(".calendar-week__day"),
      dayBoundariesDateTimeStrings: this.time.getDateTimeStringDayBoundariesFrom(this.dayInfo.dateTimeString),
      // Resizing events
      resizingStartingPoint: void 0,
      resizingStartingPointEndOfTime: this.eventProp.time.end,
      resizingStartingPointStartOfTime: this.eventProp.time.start,
      resizingDirection: "",
      changeInQuarterHoursEventStart: 0,
      changeInQuarterHoursEventEnd: 0,
      isEditable: this.eventProp.isEditable || !1,
      colors: xe,
      eventColor: "#fff",
      eventBackgroundColor: "",
      isResizing: !1,
      // Dragging events
      canDrag: !1,
      // set to true on mousedown and false on mouseup
      clientYDragStart: null,
      clientXDragStart: null,
      changeInQuartersOnDrag: 0,
      changeInDaysOnDrag: 0,
      isDragging: !1,
      timeStartDragStart: this.eventProp.time.start,
      timeEndDragStart: this.eventProp.time.end,
      dragMoveListenerNameAndCallbacks: [
        ["mousemove", this.handleDrag],
        ["touchmove", this.handleDrag],
        ["mouseup", this.onMouseUpWhenDragging],
        ["touchend", this.onMouseUpWhenDragging]
      ]
    };
  },
  computed: {
    eventChangeHelper() {
      const e = this.time.addDaysToDateTimeString(this.changeInDaysOnDrag, this.dayInfo.dateTimeString);
      return new Gs(this.time, this.time.dateStringFrom(e));
    },
    isCustomEvent() {
      return Array.isArray(this.eventProp.isCustom) ? this.eventProp.isCustom.includes(this.mode) : this.eventProp.isCustom || !1;
    },
    getEventTime() {
      return this.time.getLocalizedTime(this.event.time.start) + " - " + this.time.getLocalizedTime(this.event.time.end);
    },
    timePointsInDay() {
      return this.time.HOURS_PER_DAY * 100;
    },
    timePointsInOneMinute() {
      return 100 / 60;
    },
    getLeftRule() {
      return !this.event.totalConcurrentEvents || !this.event.nOfPreviousConcurrentEvents ? 0 : this.event.nOfPreviousConcurrentEvents / this.event.totalConcurrentEvents * 100;
    },
    getWidthRule() {
      return 100 - this.getLeftRule;
    },
    getBorderRule() {
      return this.event.nOfPreviousConcurrentEvents ? "1px solid #fff" : "none";
    },
    eventIsLongerThan30Minutes() {
      const { hour: e, minutes: t } = this.time.getAllVariablesFromDateTimeString(this.event.time.start), { hour: n, minutes: a } = this.time.getAllVariablesFromDateTimeString(this.event.time.end), r = new Date(0, 0, 0, e, t).getTime();
      return new Date(0, 0, 0, n, a).getTime() - r >= 18e5;
    },
    hasDisabledDragAndDrop() {
      return !!(this.eventProp.disableDnD && this.eventProp.disableDnD.includes(this.mode));
    },
    hasDisabledResize() {
      return !!(this.eventProp.disableResize && this.eventProp.disableResize.includes(this.mode));
    },
    requiredStyles() {
      return {
        top: this.getPositionInDay(this.event.time.start),
        height: this.getLengthOfEvent(
          this.event.time.start,
          this.event.time.end
        ),
        left: this.getLeftRule + "%",
        width: this.getWidthRule + "%",
        transform: this.eventTransformValue,
        zIndex: this.eventZIndexValue
      };
    }
  },
  watch: {
    changeInQuarterHoursEventStart(e, t) {
      const n = this.time.addMinutesToDateTimeString(
        15 * e,
        this.resizingStartingPointStartOfTime
      ), a = e > t ? oe.FORWARDS : oe.BACKWARDS, r = this.eventChangeHelper.canEventBeMoved(
        this.event,
        a
      );
      n < this.event.time.end && r && (this.event.time.start = n);
    },
    changeInQuarterHoursEventEnd(e, t) {
      const n = this.time.addMinutesToDateTimeString(
        15 * e,
        this.resizingStartingPointEndOfTime
      ), a = e > t ? oe.FORWARDS : oe.BACKWARDS, r = this.eventChangeHelper.canEventBeMoved(
        this.event,
        a
      );
      n > this.event.time.start && r && (this.event.time.end = n);
    },
    changeInQuartersOnDrag(e, t) {
      const n = e > t ? oe.FORWARDS : oe.BACKWARDS;
      this.eventChangeHelper.canEventBeMoved(
        this.event,
        n
      ) && this.updatePositionOnDrag();
    },
    changeInDaysOnDrag(e) {
      if (!this.dayElement)
        return;
      const t = this.dayInfo.daysTotalN - (this.dayInfo.thisDayIndex + 1), n = 0 - this.dayInfo.thisDayIndex;
      if (e > t || e < n)
        return;
      const a = e * this.dayElement.clientWidth;
      this.eventTransformValue = `translateX(${a}px)`, this.updatePositionOnDrag();
    }
  },
  mounted() {
    this.setColors();
  },
  methods: {
    getPositionInDay(e) {
      return this.time.getPercentageOfDayFromDateTimeString(
        e,
        this.time.DAY_START,
        this.time.DAY_END
      ).toString() + "%";
    },
    getLengthOfEvent(e, t) {
      const n = this.time.getPercentageOfDayFromDateTimeString(
        e,
        this.time.DAY_START,
        this.time.DAY_END
      ), a = this.time.getPercentageOfDayFromDateTimeString(
        t,
        this.time.DAY_START,
        this.time.DAY_END
      );
      return Math.abs(a - n) + "%";
    },
    handleClickOnEvent(e) {
      const t = this.getEventElementFromChildElement(e);
      t && this.$emit("event-was-clicked", {
        clickedEvent: this.event,
        eventElement: t
      });
    },
    /**
     * When a child element of the event is clicked, return the parent event element
     * */
    getEventElementFromChildElement(e) {
      const t = e.target;
      return !t || typeof t.className.includes != "function" ? null : t.className.includes(".calendar-week__event") ? e.target : t.closest(".calendar-week__event");
    },
    /**
     * Handle mousemove-events, while the event is being resized
     * */
    onMouseMoveResize(e) {
      const t = document.querySelector(".calendar-week__events");
      if (!t)
        return;
      typeof this.resizingStartingPoint > "u" && (this.resizingStartingPoint = e.clientY);
      const a = e.clientY - this.resizingStartingPoint, r = t.clientHeight, s = a / r * 100, i = this.timePointsInDay / 100 * s, o = this.getMinutesFromTimePoints(i);
      this.resizingDirection === "down" ? this.changeInQuarterHoursEventEnd = Math.floor(o / 15) : this.changeInQuarterHoursEventStart = Math.floor(o / 15);
    },
    /**
     * Handle mouseup-events, for when an event stops being resized
     * */
    onMouseUpWhenResizing() {
      this.stopResizing();
    },
    resizeEvent(e) {
      this.isResizing = !0, this.resizingDirection = e, document.addEventListener("mousemove", this.onMouseMoveResize), document.addEventListener("mouseup", this.onMouseUpWhenResizing);
    },
    stopResizing() {
      document.removeEventListener("mousemove", this.onMouseMoveResize), document.removeEventListener("mouseup", this.onMouseUpWhenResizing), this.resetResizingValues(), this.$emit("event-was-resized", this.event), this.isResizing = !1;
    },
    /**
     * Reset values used for resizing an event, to prepare for upcoming resizing events
     * */
    resetResizingValues() {
      this.resizingStartingPoint = void 0, this.resizingStartingPointStartOfTime = this.eventProp.time.start, this.resizingStartingPointEndOfTime = this.eventProp.time.end, this.changeInQuarterHoursEventEnd = 0;
    },
    /**
     * Calculate the change of an event in minutes, based on the number of time points that changed
     * */
    getMinutesFromTimePoints(e) {
      return e / this.timePointsInOneMinute;
    },
    setColors() {
      var e, t, n;
      if ((e = this.event) != null && e.colorScheme && ((t = this.config.style) != null && t.colorSchemes) && this.config.style.colorSchemes[this.event.colorScheme])
        return this.eventColor = this.config.style.colorSchemes[this.event.colorScheme].color, this.eventBackgroundColor = this.config.style.colorSchemes[this.event.colorScheme].backgroundColor;
      if ((n = this.event) != null && n.color) {
        this.eventColor = "#fff", this.eventBackgroundColor = this.colors[this.event.color];
        return;
      }
      this.eventBackgroundColor = this.colors.blue;
    },
    initDrag(e) {
      var t, n;
      !this.event.isEditable || this.hasDisabledDragAndDrop || (this.$emit("drag-start"), this.dragMoveListenerNameAndCallbacks.forEach(([a, r]) => {
        document.addEventListener(a, r);
      }), Ee.isUIEventTouchEvent(e) ? this.setInitialDragValues(
        (t = e.touches[0]) == null ? void 0 : t.clientX,
        (n = e.touches[0]) == null ? void 0 : n.clientY
      ) : this.setInitialDragValues(e.clientX, e.clientY));
    },
    setInitialDragValues(e, t) {
      this.canDrag = !0, this.eventZIndexValue = 10, this.clientYDragStart = t, this.clientXDragStart = e, this.timeStartDragStart = this.event.time.start, this.timeEndDragStart = this.event.time.end;
    },
    onMouseUpWhenDragging() {
      this.$emit("drag-end"), this.handleDragEnd();
    },
    handleDragEnd() {
      this.canDrag = !1, this.eventZIndexValue = "initial", this.dragMoveListenerNameAndCallbacks.forEach(([n, a]) => {
        document.removeEventListener(n, a);
      });
      const e = this.changeInDaysOnDrag <= -1 || this.changeInDaysOnDrag > 0, t = this.changeInQuartersOnDrag <= -1 || this.changeInQuartersOnDrag > 0;
      (e || t) && this.$emit("event-was-dragged", this.event);
    },
    handleDrag(e) {
      this.isResizing || !this.canDrag || !this.clientYDragStart || (Ee.isUIEventTouchEvent(e) ? (this.handleVerticalDrag(e.touches[0].clientY), this.handleHorizontalDrag(e.touches[0].clientX)) : (this.handleVerticalDrag(e.clientY), this.handleHorizontalDrag(e.clientX)));
    },
    /**
     * Handle dragging within days
     * */
    handleVerticalDrag(e) {
      const t = document.querySelector(".calendar-week__events");
      if (!t || !this.clientYDragStart)
        return;
      const n = e - this.clientYDragStart, a = t.clientHeight, r = n / a * 100, s = this.timePointsInDay / 100 * r, i = this.getMinutesFromTimePoints(s);
      this.changeInQuartersOnDrag = i < 0 ? Math.ceil(i / 15) : Math.floor(i / 15);
    },
    /**
     * Handle dragging between days
     * */
    handleHorizontalDrag(e) {
      if (!this.dayElement || !this.clientXDragStart)
        return;
      const t = this.dayElement.clientWidth, n = e - this.clientXDragStart;
      this.changeInDaysOnDrag = n < 0 ? Math.ceil(n / t) : Math.floor(n / t);
    },
    updatePositionOnDrag() {
      const e = this.changeInQuartersOnDrag * 15, t = this.changeInDaysOnDrag * 1440;
      this.event.time.start = this.time.addMinutesToDateTimeString(
        e + t,
        this.timeStartDragStart
      ), this.event.time.end = this.time.addMinutesToDateTimeString(
        e + t,
        this.timeEndDragStart
      );
    }
  }
});
const Qs = ["data-ref"], Js = { class: "calendar-week__event-row is-title" }, Zs = { class: "calendar-week__event-row is-time" }, eo = {
  key: 0,
  class: "calendar-week__event-row is-location"
}, to = {
  key: 1,
  class: "calendar-week__event-row is-with"
}, no = {
  key: 2,
  class: "calendar-week__event-row is-topic"
}, ao = {
  key: 3,
  class: "calendar-week__event-row is-description"
}, ro = ["innerHTML"];
function io(e, t, n, a, r, s) {
  const i = $("font-awesome-icon");
  return f(), m("div", {
    class: x(["calendar-week__event is-event", {
      "is-editable": e.isEditable,
      "has-disabled-dnd": e.hasDisabledDragAndDrop
    }]),
    style: ce({
      ...e.requiredStyles,
      border: e.getBorderRule
    }),
    "data-ref": "event-" + e.event.id,
    onClick: t[2] || (t[2] = (...o) => e.handleClickOnEvent && e.handleClickOnEvent(...o)),
    onMouseenter: t[3] || (t[3] = (o) => e.showResizeElements = e.isEditable && !e.hasDisabledResize),
    onMouseleave: t[4] || (t[4] = (o) => e.showResizeElements = !1),
    onMousedown: t[5] || (t[5] = (...o) => e.initDrag && e.initDrag(...o)),
    onTouchstart: t[6] || (t[6] = (...o) => e.initDrag && e.initDrag(...o))
  }, [
    e.isCustomEvent ? Y(e.$slots, "weekDayEvent", {
      key: 1,
      eventData: e.event
    }, void 0, !0) : (f(), m("div", {
      key: 0,
      class: "calendar-week__event-info-wrapper",
      style: ce({
        color: e.eventColor,
        width: "100%",
        height: "100%",
        backgroundColor: e.eventBackgroundColor
      })
    }, [
      T("div", Js, C(e.event.title), 1),
      T("div", Zs, [
        L(i, {
          icon: e.icons.clock,
          class: "calendar-week__event-icon"
        }, null, 8, ["icon"]),
        T("span", null, C(e.getEventTime), 1)
      ]),
      e.event.location ? (f(), m("div", eo, [
        L(i, {
          icon: e.icons.location,
          class: "calendar-week__event-icon"
        }, null, 8, ["icon"]),
        T("span", null, C(e.event.location), 1)
      ])) : S("", !0),
      e.event.with ? (f(), m("div", to, [
        L(i, {
          icon: e.icons.user,
          class: "calendar-week__event-icon"
        }, null, 8, ["icon"]),
        T("span", null, C(e.event.with), 1)
      ])) : S("", !0),
      e.event.topic ? (f(), m("div", no, [
        L(i, {
          icon: e.icons.topic,
          class: "calendar-week__event-icon"
        }, null, 8, ["icon"]),
        T("span", null, C(e.event.topic), 1)
      ])) : S("", !0),
      e.event.description ? (f(), m("div", ao, [
        L(i, {
          icon: e.icons.description,
          class: "calendar-week__event-icon"
        }, null, 8, ["icon"]),
        T("p", {
          innerHTML: e.event.description
        }, null, 8, ro)
      ])) : S("", !0),
      e.eventIsLongerThan30Minutes ? (f(), m("div", {
        key: 4,
        class: "calendar-week__event-blend-out",
        style: ce({
          backgroundImage: "linear-gradient(to bottom, transparent, " + e.eventBackgroundColor + ")"
        })
      }, null, 4)) : S("", !0)
    ], 4)),
    e.showResizeElements ? (f(), m("div", {
      key: 2,
      class: "calendar-week__event-resize calendar-week__event-resize-up",
      onMousedown: t[0] || (t[0] = (o) => e.resizeEvent("up"))
    }, null, 32)) : S("", !0),
    e.showResizeElements ? (f(), m("div", {
      key: 3,
      class: "calendar-week__event-resize calendar-week__event-resize-down",
      onMousedown: t[1] || (t[1] = (o) => e.resizeEvent("down"))
    }, null, 32)) : S("", !0)
  ], 46, Qs);
}
const so = /* @__PURE__ */ j(Ks, [["render", io], ["__scopeId", "data-v-5564d436"]]);
class oo {
  sortEventsAccordingToStartOfTime(t) {
    function n(a, r) {
      return a.time.start < r.time.start ? -1 : a.time.start > r.time.start ? 1 : 0;
    }
    return t.sort(n);
  }
  /**
   * Sets the "zIndex" and "nOfPreviousConcurrentEvents" properties on an event
   *
   * zIndex - lets the event know with which z-index it should be displayed
   * nOfPreviousConcurrentEvents - lets the event know, how many other, previous events, are competing for the same width
   * */
  calculateConcurrencyForEvents(t) {
    const n = this.sortEventsAccordingToStartOfTime(t);
    if (!n.length)
      return [];
    for (const [a, r] of n.entries()) {
      if (a === 0)
        continue;
      n[a - 1];
      let s = 0, i = 0;
      for (; s < a; )
        n[s].time.end > r.time.start && i++, s++;
      i && (n[a].nOfPreviousConcurrentEvents = i);
    }
    for (let a = n.length - 1; a >= 0; a--) {
      let r = 0, s = n.length - 1;
      for (; s > a; )
        n[s].time.start < n[a].time.end && r++, s--;
      const i = n[a].nOfPreviousConcurrentEvents || 0;
      n[a].totalConcurrentEvents = i + r + 1;
    }
    return t;
  }
}
class lo extends se {
  constructor(n, a, r = 24) {
    super();
    F(this, "INTERVAL_MINUTES");
    F(this, "DAY_START_DATE_TIME_STRING");
    F(this, "HOURS_PER_DAY", 24);
    this.INTERVAL_MINUTES = n, this.DAY_START_DATE_TIME_STRING = a, this.HOURS_PER_DAY = r;
  }
  getIntervals() {
    const n = [], a = this.HOURS_PER_DAY * (60 / this.INTERVAL_MINUTES);
    let r = this.DAY_START_DATE_TIME_STRING;
    for (; n.length < a; ) {
      const s = this.addMinutesToDateTimeString(this.INTERVAL_MINUTES, r);
      n.push({
        intervalStart: r,
        intervalEnd: s,
        // Only show a border at the bottom of an interval, when the upcoming interval is not the start of a new hour.
        // This prevents double borders
        hasBorder: s.substring(14, 16) !== "00"
      }), r = s;
    }
    return n;
  }
}
const co = new oo(), uo = H({
  name: "Day",
  components: { DayEvent: so },
  props: {
    day: {
      type: Object,
      required: !0
    },
    time: {
      type: Object,
      required: !0
    },
    config: {
      type: Object,
      required: !0
    },
    dayInfo: {
      type: Object,
      required: !0
    },
    mode: {
      type: String,
      required: !0
    },
    dayIntervals: {
      type: Object,
      required: !0
    },
    weekHeight: {
      type: Number,
      required: !0
    }
  },
  emits: [
    "event-was-clicked",
    "event-was-resized",
    "event-was-dragged",
    "interval-was-clicked",
    "day-was-clicked",
    "datetime-was-clicked",
    "drag-start",
    "drag-end"
  ],
  data() {
    return {
      events: [],
      intervals: []
    };
  },
  computed: {
    intervalStyles() {
      var e;
      return (e = this.config.dayIntervals) != null && e.intervalStyles ? this.config.dayIntervals.intervalStyles : {};
    }
  },
  mounted() {
    this.calculateEventConcurrency(), this.dayIntervals.displayClickableInterval && this.setClickableIntervals();
  },
  methods: {
    calculateEventConcurrency() {
      this.events = co.calculateConcurrencyForEvents(
        this.day.events
      );
    },
    handleEventWasResized(e) {
      this.$emit("event-was-resized", e), this.calculateEventConcurrency();
    },
    handleClickOnInterval(e) {
      const { intervalStart: t, intervalEnd: n } = e;
      this.$emit("interval-was-clicked", { intervalStart: t, intervalEnd: n });
    },
    setClickableIntervals() {
      let e = this.day.dateTimeString;
      if (this.time.DAY_START !== 0) {
        const { hour: t } = this.time.getHourAndMinutesFromTimePoints(this.time.DAY_START);
        e = this.time.setSegmentOfDateTimeString(e, { hour: t });
      }
      this.intervals = new lo(
        this.dayIntervals.length || 60,
        e,
        this.time.HOURS_PER_DAY
      ).getIntervals();
    },
    handleClickOnDay(e) {
      const t = this.time.getTimeFromClick(e.offsetY, this.weekHeight);
      let n = this.time.dateStringFrom(this.day.dateTimeString);
      this.time.DAY_END <= this.time.DAY_START && (n = this.getDateStringForFlexibleDayBoundaries(n, t));
      const r = `${n} ${t}`;
      this.$emit("day-was-clicked", n), this.$emit("datetime-was-clicked", r);
    },
    getDateStringForFlexibleDayBoundaries(e, t) {
      const a = `${this.time.doubleDigit(this.time.DAY_START / 100)}:00`;
      return t < a && (e = this.time.dateStringFrom(
        this.time.addDaysToDateTimeString(1, e)
      )), e;
    }
  }
});
const fo = ["id", "onClick"];
function mo(e, t, n, a, r, s) {
  const i = $("DayEvent");
  return f(), m("div", {
    class: "calendar-week__day",
    onClick: t[4] || (t[4] = Bt((...o) => e.handleClickOnDay && e.handleClickOnDay(...o), ["self"]))
  }, [
    (f(!0), m(I, null, z(e.events, (o, l) => (f(), V(i, {
      key: l,
      "data-test": "day-event",
      "event-prop": o,
      day: e.day,
      time: e.time,
      config: e.config,
      "day-info": e.dayInfo,
      mode: e.mode,
      onEventWasClicked: t[0] || (t[0] = (c) => e.$emit("event-was-clicked", c)),
      onEventWasDragged: t[1] || (t[1] = (c) => e.$emit("event-was-dragged", c)),
      onEventWasResized: e.handleEventWasResized,
      onDragStart: t[2] || (t[2] = (c) => e.$emit("drag-start")),
      onDragEnd: t[3] || (t[3] = (c) => e.$emit("drag-end"))
    }, {
      weekDayEvent: U((c) => [
        Y(e.$slots, "weekDayEvent", {
          eventData: c.eventData
        }, void 0, !0)
      ]),
      _: 2
    }, 1032, ["event-prop", "day", "time", "config", "day-info", "mode", "onEventWasResized"]))), 128)),
    e.dayIntervals && e.dayIntervals.displayClickableInterval ? (f(!0), m(I, { key: 0 }, z(e.intervals, (o, l) => (f(), m("div", {
      id: "interval-" + l,
      key: o.intervalStart,
      class: x(["calendar-week__day-interval", { "has-border": o.hasBorder }]),
      style: ce(e.intervalStyles),
      onClick: (c) => e.handleClickOnInterval(o)
    }, C(e.time.getLocalizedTime(o.intervalStart)), 15, fo))), 128)) : S("", !0)
  ]);
}
const ho = /* @__PURE__ */ j(uo, [["render", mo], ["__scopeId", "data-v-b268be7e"]]), vo = {
  x: 8,
  y: 26,
  width: 903,
  height: 702,
  top: 26,
  right: 911,
  bottom: 728,
  left: 8
}, go = 400;
class po {
  calculateFlyoutPosition(t, n, a = null) {
    const r = a || vo, s = t.top - r.top, i = r.right - t.right, o = r.bottom - t.bottom, l = t.left - r.left, c = n.width + 10, d = o < 0 ? r.bottom - n.height - 10 : null, u = s < 0 ? r.top + 10 : null;
    return o > n.height && i > c ? {
      top: u || Math.round(t.top),
      left: Math.round(t.right) + 10
    } : s > n.height && i > c ? {
      top: d || Math.round(t.bottom) - n.height,
      left: Math.round(t.right) + 10
    } : l > c && o > n.height ? {
      top: u || t.top,
      left: Math.round(
        t.left - (n.width + 10)
      )
    } : l > c && s > n.height ? {
      top: d || Math.round(t.bottom - n.height),
      left: Math.round(
        t.left - (n.width + 10)
      )
    } : o < n.height ? { top: r.bottom - n.height, left: null } : { top: t.top, left: null };
  }
}
var yo = {
  prefix: "far",
  iconName: "trash-can",
  icon: [448, 512, [61460, "trash-alt"], "f2ed", "M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"]
}, za = yo, bo = {
  prefix: "far",
  iconName: "pen-to-square",
  icon: [512, 512, ["edit"], "f044", "M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"]
}, ja = bo, Ba = {
  prefix: "far",
  iconName: "user",
  icon: [448, 512, [128100, 62144], "f007", "M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"]
}, Do = {
  prefix: "far",
  iconName: "circle-question",
  icon: [512, 512, [62108, "question-circle"], "f059", "M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]
}, Ua = Do, Xa = {
  prefix: "far",
  iconName: "comment",
  icon: [512, 512, [128489, 61669], "f075", "M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"]
}, Va = {
  prefix: "far",
  iconName: "clock",
  icon: [512, 512, [128339, "clock-four"], "f017", "M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]
};
const ko = new po(), ln = H({
  name: "EventFlyout",
  components: {
    FontAwesomeIcon: Qe
  },
  props: {
    calendarEventProp: {
      type: Object,
      default: () => ({})
    },
    eventElement: {
      type: Object,
      default: null
    },
    time: {
      type: Object,
      required: !0
    },
    config: {
      type: Object,
      required: !0
    }
  },
  emits: ["hide", "edit-event", "delete-event"],
  data() {
    return {
      isVisible: !1,
      top: 0,
      left: 0,
      icons: {
        clock: Va,
        user: Ba,
        description: Xa,
        trash: za,
        edit: ja,
        times: Ya,
        topic: Ua,
        location: rn
      },
      calendarEvent: this.calendarEventProp,
      flyoutWidth: go + "px",
      colors: xe
    };
  },
  computed: {
    getEventTime() {
      if (!this.calendarEvent || !this.calendarEvent.time)
        return null;
      const e = Ee.getEventType(this.calendarEvent, this.time);
      if ([Q.MULTI_DAY_TIMED].includes(e)) {
        const a = this.getDateFromDateString(
          this.calendarEvent.time.start
        ) + " " + this.time.getLocalizedTime(this.calendarEvent.time.start), r = this.getDateFromDateString(
          this.calendarEvent.time.end
        ) + " " + this.time.getLocalizedTime(this.calendarEvent.time.end);
        return `${a} - ${r}`;
      }
      if ([Q.SINGLE_DAY_FULL_DAY, Q.MULTI_DAY_FULL_DAY].includes(e)) {
        const a = this.getDateFromDateString(this.calendarEvent.time.start), r = this.getDateFromDateString(this.calendarEvent.time.end);
        return a === r ? a : `${a} - ${r}`;
      }
      const t = this.getDateFromDateString(this.calendarEvent.time.start), n = this.time.getLocalizedTimeRange(
        this.calendarEvent.time.start,
        this.calendarEvent.time.end
      );
      return `${t} ⋅ ${n}`;
    },
    eventFlyoutInlineStyles() {
      return typeof this.top == "number" && !this.left ? {
        top: this.top + "px",
        left: "50%",
        position: "fixed",
        transform: "translateX(-50%)"
      } : {
        top: this.top + "px",
        left: this.left + "px",
        position: "fixed"
        // casting, since tsc otherwise thinks we're casting 'string' to 'PositionProperty'
      };
    },
    isEditable() {
      var e;
      return ((e = this.calendarEventProp) == null ? void 0 : e.isEditable) || !1;
    },
    eventBackgroundColor() {
      var e, t, n;
      return (e = this.calendarEvent) != null && e.colorScheme && ((t = this.config.style) != null && t.colorSchemes) && this.config.style.colorSchemes[this.calendarEvent.colorScheme] ? this.config.style.colorSchemes[this.calendarEvent.colorScheme].backgroundColor : this.colors[((n = this.calendarEvent) == null ? void 0 : n.color) || "blue"];
    }
  },
  watch: {
    calendarEventProp: {
      deep: !0,
      handler(e) {
        setTimeout(() => {
          this.calendarEvent = e, this.isVisible = !!e, this.$nextTick(() => this.setFlyoutPosition());
        }, 10);
      }
    }
  },
  mounted() {
    this.listenForClickOutside();
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeFlyoutOnClickOutside);
  },
  methods: {
    setFlyoutPosition() {
      var a, r;
      const e = (a = this.eventElement) == null ? void 0 : a.closest(".calendar-root"), t = document.querySelector(".event-flyout");
      if (!this.eventElement)
        return;
      const n = ko.calculateFlyoutPosition(
        (r = this.eventElement) == null ? void 0 : r.getBoundingClientRect(),
        {
          height: (t == null ? void 0 : t.clientHeight) || 300,
          width: (t == null ? void 0 : t.clientWidth) || 0
        },
        e ? e.getBoundingClientRect() : null
      );
      this.top = typeof (n == null ? void 0 : n.top) == "number" ? n.top : null, this.left = typeof (n == null ? void 0 : n.left) == "number" ? n.left : null;
    },
    editEvent() {
      var e;
      this.$emit("edit-event", (e = this.calendarEvent) == null ? void 0 : e.id), this.closeFlyout();
    },
    deleteEvent() {
      var e;
      this.$emit("delete-event", (e = this.calendarEvent) == null ? void 0 : e.id), this.closeFlyout();
    },
    closeFlyout() {
      this.isVisible = !1, setTimeout(() => {
        this.$emit("hide");
      }, 100);
    },
    getDateFromDateString(e) {
      const { year: t, month: n, date: a } = this.time.getAllVariablesFromDateTimeString(e);
      return new Date(t, n, a).toLocaleDateString(
        this.time.CALENDAR_LOCALE,
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );
    },
    listenForClickOutside() {
      document.addEventListener("click", this.closeFlyoutOnClickOutside);
    },
    closeFlyoutOnClickOutside(e) {
      var s;
      const t = document.querySelector(".event-flyout");
      if (!t || !this.isVisible)
        return;
      const n = !t.contains(e.target), a = !!e.target.closest(".is-event"), r = ((s = this.config.eventDialog) == null ? void 0 : s.closeOnClickOutside) ?? !0;
      this.isVisible && n && !a && r && this.closeFlyout();
    }
  }
}), Xn = () => {
  Oe((e) => ({
    "7c0b2114": e.flyoutWidth
  }));
}, Vn = ln.setup;
ln.setup = Vn ? (e, t) => (Xn(), Vn(e, t)) : Xn;
const wo = {
  key: 0,
  class: "event-flyout__relative-wrapper"
}, Eo = { class: "event-flyout__menu" }, So = {
  key: 0,
  class: "event-flyout__menu-editable"
}, To = { class: "event-flyout__menu-close" }, Co = {
  key: 0,
  class: "event-flyout__info-wrapper"
}, Ao = {
  key: 0,
  class: "event-flyout__row is-title"
}, _o = {
  key: 1,
  class: "event-flyout__row is-time"
}, Mo = {
  key: 2,
  class: "event-flyout__row is-location"
}, Po = {
  key: 3,
  class: "event-flyout__row is-with"
}, Lo = {
  key: 4,
  class: "event-flyout__row is-topic"
}, Io = {
  key: 5,
  class: "event-flyout__row is-description"
}, Oo = ["innerHTML"];
function $o(e, t, n, a, r, s) {
  const i = $("font-awesome-icon");
  return f(), m("div", {
    class: x(["event-flyout", { "is-visible": e.isVisible, "is-not-editable": !e.isEditable }]),
    style: ce(e.eventFlyoutInlineStyles)
  }, [
    !e.config.eventDialog || !e.config.eventDialog.isCustom ? (f(), m("div", wo, [
      T("div", Eo, [
        e.isEditable ? (f(), m("span", So, [
          L(i, {
            class: "event-flyout__menu-item is-edit-icon",
            icon: e.icons.edit,
            onClick: e.editEvent
          }, null, 8, ["icon", "onClick"]),
          L(i, {
            class: "event-flyout__menu-item is-trash-icon",
            icon: e.icons.trash,
            onClick: e.deleteEvent
          }, null, 8, ["icon", "onClick"])
        ])) : S("", !0),
        T("span", To, [
          L(i, {
            class: "event-flyout__menu-item is-times-icon",
            icon: e.icons.times,
            onClick: e.closeFlyout
          }, null, 8, ["icon", "onClick"])
        ])
      ]),
      e.calendarEvent ? (f(), m("div", Co, [
        e.calendarEvent.title ? (f(), m("div", Ao, [
          T("div", {
            class: "event-flyout__color-icon",
            style: ce({ backgroundColor: e.eventBackgroundColor })
          }, null, 4),
          le(" " + C(e.calendarEvent.title), 1)
        ])) : S("", !0),
        e.calendarEvent.time ? (f(), m("div", _o, C(e.getEventTime), 1)) : S("", !0),
        e.calendarEvent.location ? (f(), m("div", Mo, [
          L(i, {
            icon: e.icons.location
          }, null, 8, ["icon"]),
          le(" " + C(e.calendarEvent.location), 1)
        ])) : S("", !0),
        e.calendarEvent.with ? (f(), m("div", Po, [
          L(i, {
            icon: e.icons.user
          }, null, 8, ["icon"]),
          le(" " + C(e.calendarEvent.with), 1)
        ])) : S("", !0),
        e.calendarEvent.topic ? (f(), m("div", Lo, [
          L(i, {
            icon: e.icons.topic,
            class: "calendar-week__event-icon"
          }, null, 8, ["icon"]),
          le(" " + C(e.calendarEvent.topic), 1)
        ])) : S("", !0),
        e.calendarEvent.description ? (f(), m("div", Io, [
          L(i, {
            icon: e.icons.description,
            class: "calendar-week__event-icon"
          }, null, 8, ["icon"]),
          T("p", {
            innerHTML: e.calendarEvent.description
          }, null, 8, Oo)
        ])) : S("", !0)
      ])) : S("", !0)
    ])) : Y(e.$slots, "default", {
      key: 1,
      eventDialogData: e.calendarEvent,
      closeEventDialog: e.closeFlyout
    }, void 0, !0)
  ], 6);
}
const xa = /* @__PURE__ */ j(ln, [["render", $o], ["__scopeId", "data-v-d6a61e37"]]);
class qa extends se {
  /**
   * Yields a full calendar week, with all full-day events positioned in it
   * */
  positionFullDayEventsInWeek(t, n, a) {
    const r = a.map((l) => {
      const { year: c, month: d, date: u } = this.getAllVariablesFromDateTimeString(l.time.start), { year: g, month: D, date: y } = this.getAllVariablesFromDateTimeString(l.time.end);
      return l.timeJS = {
        start: new Date(c, d, u),
        end: new Date(g, D, y)
      }, l;
    }).sort((l, c) => l.time.start < c.time.start ? -1 : l.time.start > c.time.start ? 1 : 0), i = this.getDatesBetweenTwoDates(t, n).map((l) => ({ date: l }));
    for (const l of r)
      for (const [c, d] of i.entries()) {
        const u = this.getDateStringFromDate(d.date);
        if (this.getDateStringFromDate(l.timeJS.start) <= u && this.getDateStringFromDate(l.timeJS.end) >= u) {
          let g = 1;
          for (; typeof i[c][`level${g}`] < "u"; )
            g++;
          let D = Math.ceil((l.timeJS.end.getTime() - d.date.getTime()) / this.MS_PER_DAY) + 1;
          const y = i.length - c;
          D > y && (D = y), i[c][`level${g}`] = {
            ...l,
            nDays: D
            // Denotes the number of days to display in the week, not the actual number of days
          };
          for (let k = 1; k < D; k++)
            i[c + k][`level${g}`] = "blocked";
          break;
        }
      }
    const o = [];
    for (const l of i)
      o.push(Object.keys(l).sort().reduce(
        (c, d) => (c[d] = l[d], c),
        {}
      ));
    return o;
  }
  positionFullDayEventsInMonth(t, n) {
    const a = [], r = t.flat(), s = /* @__PURE__ */ new Map();
    r.forEach((o) => s.set(this.dateStringFrom(o.dateTimeString), o)), n = n.sort((o, l) => o.time.start < l.time.start ? 1 : o.time.start > l.time.start ? -1 : 0);
    for (const o of n) {
      const { year: l, month: c, date: d } = this.getAllVariablesFromDateTimeString(o.time.start), { year: u, month: g, date: D } = this.getAllVariablesFromDateTimeString(o.time.end), y = this.getDatesBetweenTwoDates(
        new Date(l, c, d),
        new Date(u, g, D)
      );
      for (const k of y) {
        const w = this.getDateStringFromDate(k), h = s.get(w);
        h && s.set(w, {
          ...h,
          // Since we're iterating over the fullDayEvents sorted backwards, the earliest events will end up first (which is the wanted behavior)
          events: [o, ...h.events]
        });
      }
    }
    let i = 0;
    return s.forEach((o) => {
      a.length ? a[i] && a[i].length < 7 ? a[i].push(o) : a[i] && a[i].length === 7 && (a.push([o]), i++) : a.push([o]);
    }), a;
  }
}
/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */
function ie(e) {
  return getComputedStyle(e);
}
function X(e, t) {
  for (var n in t) {
    var a = t[n];
    typeof a == "number" && (a = a + "px"), e.style[n] = a;
  }
  return e;
}
function lt(e) {
  var t = document.createElement("div");
  return t.className = e, t;
}
var xn = typeof Element < "u" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
function pe(e, t) {
  if (!xn)
    throw new Error("No element matching method supported");
  return xn.call(e, t);
}
function Me(e) {
  e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e);
}
function qn(e, t) {
  return Array.prototype.filter.call(
    e.children,
    function(n) {
      return pe(n, t);
    }
  );
}
var R = {
  main: "ps",
  rtl: "ps__rtl",
  element: {
    thumb: function(e) {
      return "ps__thumb-" + e;
    },
    rail: function(e) {
      return "ps__rail-" + e;
    },
    consuming: "ps__child--consume"
  },
  state: {
    focus: "ps--focus",
    clicking: "ps--clicking",
    active: function(e) {
      return "ps--active-" + e;
    },
    scrolling: function(e) {
      return "ps--scrolling-" + e;
    }
  }
}, Ga = { x: null, y: null };
function Ka(e, t) {
  var n = e.element.classList, a = R.state.scrolling(t);
  n.contains(a) ? clearTimeout(Ga[t]) : n.add(a);
}
function Qa(e, t) {
  Ga[t] = setTimeout(
    function() {
      return e.isAlive && e.element.classList.remove(R.state.scrolling(t));
    },
    e.settings.scrollingThreshold
  );
}
function Fo(e, t) {
  Ka(e, t), Qa(e, t);
}
var Je = function(t) {
  this.element = t, this.handlers = {};
}, Ja = { isEmpty: { configurable: !0 } };
Je.prototype.bind = function(t, n) {
  typeof this.handlers[t] > "u" && (this.handlers[t] = []), this.handlers[t].push(n), this.element.addEventListener(t, n, !1);
};
Je.prototype.unbind = function(t, n) {
  var a = this;
  this.handlers[t] = this.handlers[t].filter(function(r) {
    return n && r !== n ? !0 : (a.element.removeEventListener(t, r, !1), !1);
  });
};
Je.prototype.unbindAll = function() {
  for (var t in this.handlers)
    this.unbind(t);
};
Ja.isEmpty.get = function() {
  var e = this;
  return Object.keys(this.handlers).every(
    function(t) {
      return e.handlers[t].length === 0;
    }
  );
};
Object.defineProperties(Je.prototype, Ja);
var Fe = function() {
  this.eventElements = [];
};
Fe.prototype.eventElement = function(t) {
  var n = this.eventElements.filter(function(a) {
    return a.element === t;
  })[0];
  return n || (n = new Je(t), this.eventElements.push(n)), n;
};
Fe.prototype.bind = function(t, n, a) {
  this.eventElement(t).bind(n, a);
};
Fe.prototype.unbind = function(t, n, a) {
  var r = this.eventElement(t);
  r.unbind(n, a), r.isEmpty && this.eventElements.splice(this.eventElements.indexOf(r), 1);
};
Fe.prototype.unbindAll = function() {
  this.eventElements.forEach(function(t) {
    return t.unbindAll();
  }), this.eventElements = [];
};
Fe.prototype.once = function(t, n, a) {
  var r = this.eventElement(t), s = function(i) {
    r.unbind(n, s), a(i);
  };
  r.bind(n, s);
};
function ct(e) {
  if (typeof window.CustomEvent == "function")
    return new CustomEvent(e);
  var t = document.createEvent("CustomEvent");
  return t.initCustomEvent(e, !1, !1, void 0), t;
}
function yt(e, t, n, a, r) {
  a === void 0 && (a = !0), r === void 0 && (r = !1);
  var s;
  if (t === "top")
    s = [
      "contentHeight",
      "containerHeight",
      "scrollTop",
      "y",
      "up",
      "down"
    ];
  else if (t === "left")
    s = [
      "contentWidth",
      "containerWidth",
      "scrollLeft",
      "x",
      "left",
      "right"
    ];
  else
    throw new Error("A proper axis should be provided");
  Ro(e, n, s, a, r);
}
function Ro(e, t, n, a, r) {
  var s = n[0], i = n[1], o = n[2], l = n[3], c = n[4], d = n[5];
  a === void 0 && (a = !0), r === void 0 && (r = !1);
  var u = e.element;
  e.reach[l] = null, u[o] < 1 && (e.reach[l] = "start"), u[o] > e[s] - e[i] - 1 && (e.reach[l] = "end"), t && (u.dispatchEvent(ct("ps-scroll-" + l)), t < 0 ? u.dispatchEvent(ct("ps-scroll-" + c)) : t > 0 && u.dispatchEvent(ct("ps-scroll-" + d)), a && Fo(e, l)), e.reach[l] && (t || r) && u.dispatchEvent(ct("ps-" + l + "-reach-" + e.reach[l]));
}
function P(e) {
  return parseInt(e, 10) || 0;
}
function No(e) {
  return pe(e, "input,[contenteditable]") || pe(e, "select,[contenteditable]") || pe(e, "textarea,[contenteditable]") || pe(e, "button,[contenteditable]");
}
function Wo(e) {
  var t = ie(e);
  return P(t.width) + P(t.paddingLeft) + P(t.paddingRight) + P(t.borderLeftWidth) + P(t.borderRightWidth);
}
var Ce = {
  isWebKit: typeof document < "u" && "WebkitAppearance" in document.documentElement.style,
  supportsTouch: typeof window < "u" && ("ontouchstart" in window || "maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof navigator < "u" && navigator.msMaxTouchPoints,
  isChrome: typeof navigator < "u" && /Chrome/i.test(navigator && navigator.userAgent)
};
function me(e) {
  var t = e.element, n = Math.floor(t.scrollTop), a = t.getBoundingClientRect();
  e.containerWidth = Math.round(a.width), e.containerHeight = Math.round(a.height), e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || (qn(t, R.element.rail("x")).forEach(
    function(r) {
      return Me(r);
    }
  ), t.appendChild(e.scrollbarXRail)), t.contains(e.scrollbarYRail) || (qn(t, R.element.rail("y")).forEach(
    function(r) {
      return Me(r);
    }
  ), t.appendChild(e.scrollbarYRail)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = Gn(
    e,
    P(e.railXWidth * e.containerWidth / e.contentWidth)
  ), e.scrollbarXLeft = P(
    (e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth)
  )) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = Gn(
    e,
    P(e.railYHeight * e.containerHeight / e.contentHeight)
  ), e.scrollbarYTop = P(
    n * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight)
  )) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), Ho(t, e), e.scrollbarXActive ? t.classList.add(R.state.active("x")) : (t.classList.remove(R.state.active("x")), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = e.isRtl === !0 ? e.contentWidth : 0), e.scrollbarYActive ? t.classList.add(R.state.active("y")) : (t.classList.remove(R.state.active("y")), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, t.scrollTop = 0);
}
function Gn(e, t) {
  return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t;
}
function Ho(e, t) {
  var n = { width: t.railXWidth }, a = Math.floor(e.scrollTop);
  t.isRtl ? n.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : n.left = e.scrollLeft, t.isScrollbarXUsingBottom ? n.bottom = t.scrollbarXBottom - a : n.top = t.scrollbarXTop + a, X(t.scrollbarXRail, n);
  var r = { top: a, height: t.railYHeight };
  t.isScrollbarYUsingRight ? t.isRtl ? r.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth - 9 : r.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? r.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth * 2 - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : r.left = t.scrollbarYLeft + e.scrollLeft, X(t.scrollbarYRail, r), X(t.scrollbarX, {
    left: t.scrollbarXLeft,
    width: t.scrollbarXWidth - t.railBorderXWidth
  }), X(t.scrollbarY, {
    top: t.scrollbarYTop,
    height: t.scrollbarYHeight - t.railBorderYWidth
  });
}
function Yo(e) {
  e.element, e.event.bind(e.scrollbarY, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarYRail, "mousedown", function(t) {
    var n = t.pageY - window.pageYOffset - e.scrollbarYRail.getBoundingClientRect().top, a = n > e.scrollbarYTop ? 1 : -1;
    e.element.scrollTop += a * e.containerHeight, me(e), t.stopPropagation();
  }), e.event.bind(e.scrollbarX, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarXRail, "mousedown", function(t) {
    var n = t.pageX - window.pageXOffset - e.scrollbarXRail.getBoundingClientRect().left, a = n > e.scrollbarXLeft ? 1 : -1;
    e.element.scrollLeft += a * e.containerWidth, me(e), t.stopPropagation();
  });
}
function zo(e) {
  Kn(e, [
    "containerWidth",
    "contentWidth",
    "pageX",
    "railXWidth",
    "scrollbarX",
    "scrollbarXWidth",
    "scrollLeft",
    "x",
    "scrollbarXRail"
  ]), Kn(e, [
    "containerHeight",
    "contentHeight",
    "pageY",
    "railYHeight",
    "scrollbarY",
    "scrollbarYHeight",
    "scrollTop",
    "y",
    "scrollbarYRail"
  ]);
}
function Kn(e, t) {
  var n = t[0], a = t[1], r = t[2], s = t[3], i = t[4], o = t[5], l = t[6], c = t[7], d = t[8], u = e.element, g = null, D = null, y = null;
  function k(v) {
    v.touches && v.touches[0] && (v[r] = v.touches[0].pageY), u[l] = g + y * (v[r] - D), Ka(e, c), me(e), v.stopPropagation(), v.type.startsWith("touch") && v.changedTouches.length > 1 && v.preventDefault();
  }
  function w() {
    Qa(e, c), e[d].classList.remove(R.state.clicking), e.event.unbind(e.ownerDocument, "mousemove", k);
  }
  function h(v, E) {
    g = u[l], E && v.touches && (v[r] = v.touches[0].pageY), D = v[r], y = (e[a] - e[n]) / (e[s] - e[o]), E ? e.event.bind(e.ownerDocument, "touchmove", k) : (e.event.bind(e.ownerDocument, "mousemove", k), e.event.once(e.ownerDocument, "mouseup", w), v.preventDefault()), e[d].classList.add(R.state.clicking), v.stopPropagation();
  }
  e.event.bind(e[i], "mousedown", function(v) {
    h(v);
  }), e.event.bind(e[i], "touchstart", function(v) {
    h(v, !0);
  });
}
function jo(e) {
  var t = e.element, n = function() {
    return pe(t, ":hover");
  }, a = function() {
    return pe(e.scrollbarX, ":focus") || pe(e.scrollbarY, ":focus");
  };
  function r(s, i) {
    var o = Math.floor(t.scrollTop);
    if (s === 0) {
      if (!e.scrollbarYActive)
        return !1;
      if (o === 0 && i > 0 || o >= e.contentHeight - e.containerHeight && i < 0)
        return !e.settings.wheelPropagation;
    }
    var l = t.scrollLeft;
    if (i === 0) {
      if (!e.scrollbarXActive)
        return !1;
      if (l === 0 && s < 0 || l >= e.contentWidth - e.containerWidth && s > 0)
        return !e.settings.wheelPropagation;
    }
    return !0;
  }
  e.event.bind(e.ownerDocument, "keydown", function(s) {
    if (!(s.isDefaultPrevented && s.isDefaultPrevented() || s.defaultPrevented) && !(!n() && !a())) {
      var i = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
      if (i) {
        if (i.tagName === "IFRAME")
          i = i.contentDocument.activeElement;
        else
          for (; i.shadowRoot; )
            i = i.shadowRoot.activeElement;
        if (No(i))
          return;
      }
      var o = 0, l = 0;
      switch (s.which) {
        case 37:
          s.metaKey ? o = -e.contentWidth : s.altKey ? o = -e.containerWidth : o = -30;
          break;
        case 38:
          s.metaKey ? l = e.contentHeight : s.altKey ? l = e.containerHeight : l = 30;
          break;
        case 39:
          s.metaKey ? o = e.contentWidth : s.altKey ? o = e.containerWidth : o = 30;
          break;
        case 40:
          s.metaKey ? l = -e.contentHeight : s.altKey ? l = -e.containerHeight : l = -30;
          break;
        case 32:
          s.shiftKey ? l = e.containerHeight : l = -e.containerHeight;
          break;
        case 33:
          l = e.containerHeight;
          break;
        case 34:
          l = -e.containerHeight;
          break;
        case 36:
          l = e.contentHeight;
          break;
        case 35:
          l = -e.contentHeight;
          break;
        default:
          return;
      }
      e.settings.suppressScrollX && o !== 0 || e.settings.suppressScrollY && l !== 0 || (t.scrollTop -= l, t.scrollLeft += o, me(e), r(o, l) && s.preventDefault());
    }
  });
}
function Bo(e) {
  var t = e.element;
  function n(i, o) {
    var l = Math.floor(t.scrollTop), c = t.scrollTop === 0, d = l + t.offsetHeight === t.scrollHeight, u = t.scrollLeft === 0, g = t.scrollLeft + t.offsetWidth === t.scrollWidth, D;
    return Math.abs(o) > Math.abs(i) ? D = c || d : D = u || g, D ? !e.settings.wheelPropagation : !0;
  }
  function a(i) {
    var o = i.deltaX, l = -1 * i.deltaY;
    return (typeof o > "u" || typeof l > "u") && (o = -1 * i.wheelDeltaX / 6, l = i.wheelDeltaY / 6), i.deltaMode && i.deltaMode === 1 && (o *= 10, l *= 10), o !== o && l !== l && (o = 0, l = i.wheelDelta), i.shiftKey ? [-l, -o] : [o, l];
  }
  function r(i, o, l) {
    if (!Ce.isWebKit && t.querySelector("select:focus"))
      return !0;
    if (!t.contains(i))
      return !1;
    for (var c = i; c && c !== t; ) {
      if (c.classList.contains(R.element.consuming))
        return !0;
      var d = ie(c);
      if (l && d.overflowY.match(/(scroll|auto)/)) {
        var u = c.scrollHeight - c.clientHeight;
        if (u > 0 && (c.scrollTop > 0 && l < 0 || c.scrollTop < u && l > 0))
          return !0;
      }
      if (o && d.overflowX.match(/(scroll|auto)/)) {
        var g = c.scrollWidth - c.clientWidth;
        if (g > 0 && (c.scrollLeft > 0 && o < 0 || c.scrollLeft < g && o > 0))
          return !0;
      }
      c = c.parentNode;
    }
    return !1;
  }
  function s(i) {
    var o = a(i), l = o[0], c = o[1];
    if (!r(i.target, l, c)) {
      var d = !1;
      e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (c ? t.scrollTop -= c * e.settings.wheelSpeed : t.scrollTop += l * e.settings.wheelSpeed, d = !0) : e.scrollbarXActive && !e.scrollbarYActive && (l ? t.scrollLeft += l * e.settings.wheelSpeed : t.scrollLeft -= c * e.settings.wheelSpeed, d = !0) : (t.scrollTop -= c * e.settings.wheelSpeed, t.scrollLeft += l * e.settings.wheelSpeed), me(e), d = d || n(l, c), d && !i.ctrlKey && (i.stopPropagation(), i.preventDefault());
    }
  }
  typeof window.onwheel < "u" ? e.event.bind(t, "wheel", s) : typeof window.onmousewheel < "u" && e.event.bind(t, "mousewheel", s);
}
function Uo(e) {
  if (!Ce.supportsTouch && !Ce.supportsIePointer)
    return;
  var t = e.element;
  function n(y, k) {
    var w = Math.floor(t.scrollTop), h = t.scrollLeft, v = Math.abs(y), E = Math.abs(k);
    if (E > v) {
      if (k < 0 && w === e.contentHeight - e.containerHeight || k > 0 && w === 0)
        return window.scrollY === 0 && k > 0 && Ce.isChrome;
    } else if (v > E && (y < 0 && h === e.contentWidth - e.containerWidth || y > 0 && h === 0))
      return !0;
    return !0;
  }
  function a(y, k) {
    t.scrollTop -= k, t.scrollLeft -= y, me(e);
  }
  var r = {}, s = 0, i = {}, o = null;
  function l(y) {
    return y.targetTouches ? y.targetTouches[0] : y;
  }
  function c(y) {
    return y.pointerType && y.pointerType === "pen" && y.buttons === 0 ? !1 : !!(y.targetTouches && y.targetTouches.length === 1 || y.pointerType && y.pointerType !== "mouse" && y.pointerType !== y.MSPOINTER_TYPE_MOUSE);
  }
  function d(y) {
    if (c(y)) {
      var k = l(y);
      r.pageX = k.pageX, r.pageY = k.pageY, s = (/* @__PURE__ */ new Date()).getTime(), o !== null && clearInterval(o);
    }
  }
  function u(y, k, w) {
    if (!t.contains(y))
      return !1;
    for (var h = y; h && h !== t; ) {
      if (h.classList.contains(R.element.consuming))
        return !0;
      var v = ie(h);
      if (w && v.overflowY.match(/(scroll|auto)/)) {
        var E = h.scrollHeight - h.clientHeight;
        if (E > 0 && (h.scrollTop > 0 && w < 0 || h.scrollTop < E && w > 0))
          return !0;
      }
      if (k && v.overflowX.match(/(scroll|auto)/)) {
        var A = h.scrollWidth - h.clientWidth;
        if (A > 0 && (h.scrollLeft > 0 && k < 0 || h.scrollLeft < A && k > 0))
          return !0;
      }
      h = h.parentNode;
    }
    return !1;
  }
  function g(y) {
    if (c(y)) {
      var k = l(y), w = { pageX: k.pageX, pageY: k.pageY }, h = w.pageX - r.pageX, v = w.pageY - r.pageY;
      if (u(y.target, h, v))
        return;
      a(h, v), r = w;
      var E = (/* @__PURE__ */ new Date()).getTime(), A = E - s;
      A > 0 && (i.x = h / A, i.y = v / A, s = E), n(h, v) && y.preventDefault();
    }
  }
  function D() {
    e.settings.swipeEasing && (clearInterval(o), o = setInterval(function() {
      if (e.isInitialized) {
        clearInterval(o);
        return;
      }
      if (!i.x && !i.y) {
        clearInterval(o);
        return;
      }
      if (Math.abs(i.x) < 0.01 && Math.abs(i.y) < 0.01) {
        clearInterval(o);
        return;
      }
      if (!e.element) {
        clearInterval(o);
        return;
      }
      a(i.x * 30, i.y * 30), i.x *= 0.8, i.y *= 0.8;
    }, 10));
  }
  Ce.supportsTouch ? (e.event.bind(t, "touchstart", d), e.event.bind(t, "touchmove", g), e.event.bind(t, "touchend", D)) : Ce.supportsIePointer && (window.PointerEvent ? (e.event.bind(t, "pointerdown", d), e.event.bind(t, "pointermove", g), e.event.bind(t, "pointerup", D)) : window.MSPointerEvent && (e.event.bind(t, "MSPointerDown", d), e.event.bind(t, "MSPointerMove", g), e.event.bind(t, "MSPointerUp", D)));
}
var Xo = function() {
  return {
    handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
    maxScrollbarLength: null,
    minScrollbarLength: null,
    scrollingThreshold: 1e3,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: !1,
    suppressScrollY: !1,
    swipeEasing: !0,
    useBothWheelAxes: !1,
    wheelPropagation: !0,
    wheelSpeed: 1
  };
}, Vo = {
  "click-rail": Yo,
  "drag-thumb": zo,
  keyboard: jo,
  wheel: Bo,
  touch: Uo
}, Re = function(t, n) {
  var a = this;
  if (n === void 0 && (n = {}), typeof t == "string" && (t = document.querySelector(t)), !t || !t.nodeName)
    throw new Error("no element is specified to initialize PerfectScrollbar");
  this.element = t, t.classList.add(R.main), this.settings = Xo();
  for (var r in n)
    this.settings[r] = n[r];
  this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
  var s = function() {
    return t.classList.add(R.state.focus);
  }, i = function() {
    return t.classList.remove(R.state.focus);
  };
  this.isRtl = ie(t).direction === "rtl", this.isRtl === !0 && t.classList.add(R.rtl), this.isNegativeScroll = function() {
    var c = t.scrollLeft, d = null;
    return t.scrollLeft = -1, d = t.scrollLeft < 0, t.scrollLeft = c, d;
  }(), this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, this.event = new Fe(), this.ownerDocument = t.ownerDocument || document, this.scrollbarXRail = lt(R.element.rail("x")), t.appendChild(this.scrollbarXRail), this.scrollbarX = lt(R.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", s), this.event.bind(this.scrollbarX, "blur", i), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
  var o = ie(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(o.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = P(o.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = P(o.borderLeftWidth) + P(o.borderRightWidth), X(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = P(o.marginLeft) + P(o.marginRight), X(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = lt(R.element.rail("y")), t.appendChild(this.scrollbarYRail), this.scrollbarY = lt(R.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", s), this.event.bind(this.scrollbarY, "blur", i), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
  var l = ie(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(l.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = P(l.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? Wo(this.scrollbarY) : null, this.railBorderYWidth = P(l.borderTopWidth) + P(l.borderBottomWidth), X(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = P(l.marginTop) + P(l.marginBottom), X(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = {
    x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
    y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
  }, this.isAlive = !0, this.settings.handlers.forEach(function(c) {
    return Vo[c](a);
  }), this.lastScrollTop = Math.floor(t.scrollTop), this.lastScrollLeft = t.scrollLeft, this.event.bind(this.element, "scroll", function(c) {
    return a.onScroll(c);
  }), me(this);
};
Re.prototype.update = function() {
  this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, X(this.scrollbarXRail, { display: "block" }), X(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = P(ie(this.scrollbarXRail).marginLeft) + P(ie(this.scrollbarXRail).marginRight), this.railYMarginHeight = P(ie(this.scrollbarYRail).marginTop) + P(ie(this.scrollbarYRail).marginBottom), X(this.scrollbarXRail, { display: "none" }), X(this.scrollbarYRail, { display: "none" }), me(this), yt(this, "top", 0, !1, !0), yt(this, "left", 0, !1, !0), X(this.scrollbarXRail, { display: "" }), X(this.scrollbarYRail, { display: "" }));
};
Re.prototype.onScroll = function(t) {
  this.isAlive && (me(this), yt(this, "top", this.element.scrollTop - this.lastScrollTop), yt(
    this,
    "left",
    this.element.scrollLeft - this.lastScrollLeft
  ), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft);
};
Re.prototype.destroy = function() {
  this.isAlive && (this.event.unbindAll(), Me(this.scrollbarX), Me(this.scrollbarY), Me(this.scrollbarXRail), Me(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1);
};
Re.prototype.removePsClasses = function() {
  this.element.className = this.element.className.split(" ").filter(function(t) {
    return !t.match(/^ps([-_].+|)$/);
  }).join(" ");
};
class Qn {
  constructor(t) {
    this.events = t;
  }
  getEventsForDay(t, n) {
    return this.events.filter((a) => this.isEventInDayBoundaries(a, t, n));
  }
  isEventInDayBoundaries(t, n, a) {
    const r = n.dateStringFrom(t.time.start) === n.dateStringFrom(a);
    return n.dayMode === q.REGULAR ? r : r && n.dayMode === q.SHORTENED ? this.handlePartialDayWithinOneDayBoundary(n, t) : n.dayMode === q.FLEXIBLE ? this.handleDayStretchingTwoDates(n, t, a, r) : !1;
  }
  handleDayStretchingTwoDates(t, n, a, r) {
    const { hour: s } = t.getHourAndMinutesFromTimePoints(t.DAY_START), { hour: i } = t.getHourAndMinutesFromTimePoints(t.DAY_END), { hour: o } = t.getAllVariablesFromDateTimeString(n.time.start), l = t.addDaysToDateTimeString(1, a), c = n.time.start.substring(0, 11) === l.substring(0, 11);
    return r && o >= s || c && o < i;
  }
  handlePartialDayWithinOneDayBoundary(t, n) {
    const { hour: a } = t.getHourAndMinutesFromTimePoints(t.DAY_START), { hour: r } = t.getHourAndMinutesFromTimePoints(t.DAY_END), { hour: s } = t.getAllVariablesFromDateTimeString(n.time.start);
    return s >= a && s < r;
  }
}
class Jn {
  static getNHoursIntoDayFromHour(t, n) {
    const a = se.getHourFromTimePoints(n.DAY_START);
    return n.dayMode === q.REGULAR ? t : n.dayMode === q.SHORTENED || n.dayMode === q.FLEXIBLE && t >= a ? t - a : 24 - a + t;
  }
  static eventSeparator(t, n) {
    const a = [], r = [];
    for (const s of t) {
      const i = Ee.getEventType(s, n);
      [Q.SINGLE_DAY_TIMED, Q.SINGLE_HYBRID_DAY_TIMED].includes(i) ? a.push(s) : r.push(s);
    }
    return { fullDayAndMultipleDayEvents: r, singleDayTimedEvents: a };
  }
}
const xo = new qa(), cn = H({
  name: "Week",
  components: {
    Day: ho,
    WeekTimeline: qs,
    DayTimeline: Fs,
    EventFlyout: xa
  },
  props: {
    config: {
      type: Object,
      required: !0
    },
    eventsProp: {
      type: Array,
      default: () => []
    },
    period: {
      type: Object,
      required: !0
    },
    modeProp: {
      type: String,
      default: "week"
    },
    time: {
      type: Object,
      required: !0
    }
  },
  emits: [
    "event-was-clicked",
    "event-was-resized",
    "event-was-dragged",
    "edit-event",
    "delete-event",
    "interval-was-clicked",
    "day-was-clicked",
    "datetime-was-clicked"
  ],
  data() {
    var e;
    return {
      days: [],
      mode: this.modeProp,
      selectedEvent: null,
      selectedEventElement: null,
      events: this.eventsProp,
      fullDayEvents: [],
      weekVersion: 0,
      // is simply a dummy value, for re-rendering child components on event-was-dragged
      dayIntervals: {
        length: 60,
        height: 66
      },
      weekHeight: "1584px",
      // Correlates to the initial values of dayIntervals.length and dayIntervals.height
      scrollbar: null,
      currentTimePercentage: 0,
      // When dayBoundaries are set, and the current time is outside the dayBoundaries, this property is set to false,
      // in order to hide the current time line
      showCurrentTime: !!((e = this.config) != null && e.showCurrentTime)
    };
  },
  computed: {
    hasCustomCurrentTimeSlot() {
      return Ee.hasSlotContent(this.$slots.customCurrentTime);
    },
    nDays() {
      var e, t;
      return ((t = (e = this.config) == null ? void 0 : e.week) == null ? void 0 : t.nDays) || 7;
    }
  },
  watch: {
    period: {
      deep: !0,
      handler() {
        this.setInitialEvents(this.mode);
      }
    },
    modeProp: {
      deep: !0,
      handler(e) {
        this.mode = e, this.setInitialEvents(e);
      }
    }
  },
  mounted() {
    var e;
    this.setDayIntervals(), this.separateFullDayEventsFromOtherEvents(), this.setInitialEvents(this.modeProp), this.scrollOnMount(), this.initScrollbar(), ((e = this.config) != null && e.showCurrentTime || this.hasCustomCurrentTimeSlot) && this.setCurrentTime();
  },
  methods: {
    initScrollbar(e = 0) {
      const t = document.querySelector(".calendar-week__wrapper");
      e > 3e3 || (t ? (this.scrollbar = new Re(t), this.scrollbar.update()) : this.initScrollbar(e + 50));
    },
    destroyScrollbarAndHideOverflow() {
      const e = document.querySelector(".calendar-week__wrapper");
      e instanceof HTMLElement && (e.style.overflowY = "hidden", this.scrollbar.destroy());
    },
    separateFullDayEventsFromOtherEvents() {
      const {
        singleDayTimedEvents: e,
        fullDayAndMultipleDayEvents: t
      } = Jn.eventSeparator(this.events, this.time);
      this.events = e, this.positionFullDayEvents(t);
    },
    positionFullDayEvents(e) {
      const t = this.nDays === 5 ? new Date(
        this.period.end.getFullYear(),
        this.period.end.getMonth(),
        this.period.end.getDate() - 2
      ) : this.period.end;
      this.fullDayEvents = e.length ? xo.positionFullDayEventsInWeek(
        this.period.start,
        t,
        e
      ) : [];
    },
    setDays() {
      const e = this.time.getCalendarWeekDateObjects(this.period.start).map((t) => {
        const n = this.time.getLocalizedNameOfWeekday(t, "long"), a = this.time.getDateTimeStringFromDate(
          t,
          "start"
        ), r = new Qn(this.events).getEventsForDay(this.time, a);
        return { dayName: n, dateTimeString: a, events: r };
      });
      this.nDays === 5 && this.time.FIRST_DAY_OF_WEEK === Mt.MONDAY ? (e.splice(5, 2), this.fullDayEvents.splice(5, 2)) : this.nDays === 5 && this.time.FIRST_DAY_OF_WEEK === Mt.SUNDAY && (e.splice(6, 1), this.fullDayEvents.splice(6, 1), e.splice(0, 1), this.fullDayEvents.splice(0, 1)), this.days = e;
    },
    mergeFullDayEventsIntoDays() {
      for (const [e] of this.days.entries())
        this.days[e].fullDayEvents = this.fullDayEvents[e];
    },
    setDay() {
      const e = this.time.getDateTimeStringFromDate(
        this.period.selectedDate
      );
      if (this.days = [
        {
          dayName: new Date(this.period.selectedDate).toLocaleDateString(
            this.time.CALENDAR_LOCALE,
            { weekday: "long" }
          ),
          dateTimeString: this.time.getDateTimeStringFromDate(
            this.period.selectedDate,
            "start"
          ),
          events: new Qn(this.events).getEventsForDay(this.time, e)
        }
      ], !!this.fullDayEvents.length) {
        for (const t of this.fullDayEvents)
          if (this.time.getDateTimeStringFromDate(t.date).substring(0, 11) === e.substring(0, 11)) {
            this.fullDayEvents = [t];
            return;
          }
      }
    },
    setInitialEvents(e) {
      e === "day" && this.setDay(), e === "week" && this.setDays(), this.mergeFullDayEventsIntoDays();
    },
    handleClickOnEvent(e) {
      this.$emit("event-was-clicked", e), this.selectedEventElement = e.eventElement, this.selectedEvent = e.clickedEvent;
    },
    handleEventWasDragged(e) {
      this.initScrollbar();
      const t = e;
      delete t.totalConcurrentEvents, delete t.nOfPreviousConcurrentEvents;
      const n = this.events.filter((a) => a.id !== e.id);
      this.events = [
        t,
        ...n.map((a) => (delete a.nOfPreviousConcurrentEvents, delete a.totalConcurrentEvents, a))
      ], this.setInitialEvents(this.mode), this.weekVersion = this.weekVersion + 1, this.$emit("event-was-dragged", e);
    },
    scrollOnMount() {
      var t;
      if (typeof ((t = this.config.week) == null ? void 0 : t.scrollToHour) != "number")
        return;
      const e = document.querySelector(".calendar-week__wrapper");
      e && this.$nextTick(() => {
        const a = +this.weekHeight.split("p")[0] / this.time.HOURS_PER_DAY, r = Jn.getNHoursIntoDayFromHour(this.config.week.scrollToHour, this.time), s = a * r;
        e.scroll(0, s - 10);
      });
    },
    setDayIntervals() {
      if (this.config.dayIntervals)
        for (const [e, t] of Object.entries(this.config.dayIntervals))
          this.dayIntervals[e] = t;
      this.setWeekHeightBasedOnIntervals();
    },
    setWeekHeightBasedOnIntervals() {
      [15, 30, 60].includes(this.dayIntervals.length) || (this.dayIntervals.length = 60, this.dayIntervals.height = 66, console.warn(
        "The dayIntervals configuration is faulty. It has been reset to default values."
      ));
      let e = 1;
      this.dayIntervals.length === 15 && (e = 4), this.dayIntervals.length === 30 && (e = 2), this.weekHeight = this.dayIntervals.height * e * this.time.HOURS_PER_DAY + "px";
    },
    setCurrentTime() {
      const e = () => {
        const t = this.time.getDateTimeStringFromDate(/* @__PURE__ */ new Date()), n = this.time.getPercentageOfDayFromDateTimeString(t, this.time.DAY_START, this.time.DAY_END);
        if (n < 0 || n > 100)
          return this.showCurrentTime = !1;
        this.showCurrentTime = !0, this.currentTimePercentage = n;
      };
      e(), setInterval(() => e(), 6e4);
    }
  }
}), Zn = () => {
  Oe((e) => ({
    "5cb5d057": e.weekHeight
  }));
}, ea = cn.setup;
cn.setup = ea ? (e, t) => (Zn(), ea(e, t)) : Zn;
const qo = (e) => (la("data-v-8bb6ad05"), e = e(), ca(), e), Go = { class: "calendar-week__wrapper" }, Ko = { class: "calendar-week" }, Qo = /* @__PURE__ */ qo(() => /* @__PURE__ */ T("div", { class: "current-time-line__circle" }, null, -1)), Jo = [
  Qo
], Zo = { class: "calendar-week__events" };
function el(e, t, n, a, r, s) {
  const i = $("WeekTimeline"), o = $("EventFlyout"), l = $("DayTimeline"), c = $("Day");
  return f(), m(I, null, [
    L(i, {
      days: e.days,
      time: e.time,
      "full-day-events": e.fullDayEvents,
      config: e.config,
      mode: e.mode,
      onEventWasClicked: e.handleClickOnEvent,
      onDayWasClicked: t[0] || (t[0] = (d) => e.$emit("day-was-clicked", d))
    }, null, 8, ["days", "time", "full-day-events", "config", "mode", "onEventWasClicked"]),
    T("div", Go, [
      !e.config.eventDialog || !e.config.eventDialog.isDisabled ? (f(), V(o, {
        key: 0,
        "calendar-event-prop": e.selectedEvent,
        "event-element": e.selectedEventElement,
        time: e.time,
        config: e.config,
        onHide: t[1] || (t[1] = (d) => e.selectedEvent = null),
        onEditEvent: t[2] || (t[2] = (d) => e.$emit("edit-event", d)),
        onDeleteEvent: t[3] || (t[3] = (d) => e.$emit("delete-event", d))
      }, {
        default: U((d) => [
          Y(e.$slots, "eventDialog", {
            eventDialogData: d.eventDialogData,
            closeEventDialog: d.closeEventDialog
          }, void 0, !0)
        ]),
        _: 3
      }, 8, ["calendar-event-prop", "event-element", "time", "config"])) : S("", !0),
      T("section", Ko, [
        e.hasCustomCurrentTimeSlot && e.showCurrentTime ? (f(), m("div", {
          key: 0,
          class: "custom-current-time",
          style: ce({ top: `${e.currentTimePercentage}%` })
        }, [
          Y(e.$slots, "customCurrentTime", {}, void 0, !0)
        ], 4)) : e.config && e.config.showCurrentTime && e.showCurrentTime ? (f(), m("div", {
          key: 1,
          class: "current-time-line",
          style: ce({ top: `${e.currentTimePercentage}%` })
        }, Jo, 4)) : S("", !0),
        (f(), V(l, {
          key: e.period.start.getTime() + e.period.end.getTime() + e.mode,
          time: e.time,
          "day-intervals": e.dayIntervals,
          "week-height": e.weekHeight
        }, null, 8, ["time", "day-intervals", "week-height"])),
        T("div", Zo, [
          (f(!0), m(I, null, z(e.days, (d, u) => (f(), V(c, {
            key: d.dateTimeString + e.mode + e.weekVersion,
            day: d,
            time: e.time,
            config: e.config,
            "day-info": { daysTotalN: e.days.length, thisDayIndex: u, dateTimeString: d.dateTimeString },
            mode: e.mode,
            "day-intervals": e.dayIntervals,
            "week-height": +e.weekHeight.replace("px", ""),
            onEventWasClicked: e.handleClickOnEvent,
            onEventWasResized: t[4] || (t[4] = (g) => e.$emit("event-was-resized", g)),
            onEventWasDragged: e.handleEventWasDragged,
            onIntervalWasClicked: t[5] || (t[5] = (g) => e.$emit("interval-was-clicked", g)),
            onDayWasClicked: t[6] || (t[6] = (g) => e.$emit("day-was-clicked", g)),
            onDragStart: e.destroyScrollbarAndHideOverflow,
            onDragEnd: e.initScrollbar,
            onDatetimeWasClicked: t[7] || (t[7] = (g) => e.$emit("datetime-was-clicked", g))
          }, {
            weekDayEvent: U((g) => [
              Y(e.$slots, "weekDayEvent", {
                eventData: g.eventData
              }, void 0, !0)
            ]),
            _: 2
          }, 1032, ["day", "time", "config", "day-info", "mode", "day-intervals", "week-height", "onEventWasClicked", "onEventWasDragged", "onDragStart", "onDragEnd"]))), 128))
        ])
      ])
    ])
  ], 64);
}
const tl = /* @__PURE__ */ j(cn, [["render", el], ["__scopeId", "data-v-8bb6ad05"]]), dn = H({
  name: "Event",
  props: {
    time: {
      type: Object,
      required: !0
    },
    calendarEvent: {
      type: Object,
      required: !0
    },
    config: {
      type: Object,
      required: !0
    },
    day: {
      type: Object,
      required: !0
    }
  },
  emits: ["event-was-clicked"],
  data() {
    return {
      colors: xe,
      eventBackgroundColor: "",
      eventIdPrefix: "calendar-month__event-"
    };
  },
  computed: {
    isCustomEvent() {
      return Array.isArray(this.calendarEvent.isCustom) ? this.calendarEvent.isCustom.includes("month") : this.calendarEvent.isCustom || !1;
    },
    eventTimeStart() {
      return Le.test(this.calendarEvent.time.start) ? this.time.getLocalizedTime(this.calendarEvent.time.start) : null;
    },
    elementId() {
      return this.eventIdPrefix + this.calendarEvent.id + this.time.dateStringFrom(this.day.dateTimeString);
    },
    elementDraggableAttribute() {
      const {
        year: e,
        month: t,
        date: n
      } = this.time.getAllVariablesFromDateTimeString(
        this.calendarEvent.time.start
      ), {
        year: a,
        month: r,
        date: s
      } = this.time.getAllVariablesFromDateTimeString(
        this.calendarEvent.time.end
      ), i = e === a && t === r && n === s, o = this.calendarEvent.disableDnD && this.calendarEvent.disableDnD.includes("month");
      return this.calendarEvent.isEditable && i && !o ? !0 : void 0;
    }
  },
  mounted() {
    this.setColors();
  },
  methods: {
    setColors() {
      var e, t, n;
      return (e = this.calendarEvent) != null && e.colorScheme && ((t = this.config.style) != null && t.colorSchemes) && this.config.style.colorSchemes[this.calendarEvent.colorScheme] ? this.eventBackgroundColor = this.config.style.colorSchemes[this.calendarEvent.colorScheme].backgroundColor : (n = this.calendarEvent) != null && n.color ? this.eventBackgroundColor = this.colors[this.calendarEvent.color] : this.eventBackgroundColor = this.colors.blue;
    },
    handleClickOnEvent() {
      const e = document.getElementById(this.elementId);
      this.$emit("event-was-clicked", {
        clickedEvent: this.calendarEvent,
        eventElement: e
      });
    },
    handleDragStart(e) {
      !e || !e.dataTransfer || (e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData(
        "json",
        JSON.stringify(this.calendarEvent)
      ));
    }
  }
}), ta = () => {
  Oe((e) => ({
    "63a9bc8a": e.eventBackgroundColor
  }));
}, na = dn.setup;
dn.setup = na ? (e, t) => (ta(), na(e, t)) : ta;
const nl = (e) => (la("data-v-4766dfc7"), e = e(), ca(), e), al = {
  key: 0,
  class: "calendar-month__event"
}, rl = ["id", "draggable"], il = ["id", "draggable"], sl = /* @__PURE__ */ nl(() => /* @__PURE__ */ T("span", { class: "calendar-month__event-color" }, null, -1)), ol = {
  key: 0,
  class: "calendar-month__event-time"
}, ll = { class: "calendar-month__event-title" };
function cl(e, t, n, a, r, s) {
  return e.config.isSmall ? (f(), m("div", al)) : (f(), m(I, { key: 1 }, [
    e.isCustomEvent ? (f(), m("div", {
      key: 0,
      id: e.elementId,
      class: x(["is-event", { "is-draggable": e.elementDraggableAttribute }]),
      "data-ref": "custom-event",
      draggable: e.elementDraggableAttribute,
      onDragstart: t[0] || (t[0] = (...i) => e.handleDragStart && e.handleDragStart(...i)),
      onClick: t[1] || (t[1] = (...i) => e.handleClickOnEvent && e.handleClickOnEvent(...i))
    }, [
      Y(e.$slots, "monthEvent", { eventData: e.calendarEvent }, void 0, !0)
    ], 42, rl)) : (f(), m("div", {
      key: 1,
      id: e.elementId,
      "data-ref": "default-event",
      class: x(["calendar-month__event is-event", { "is-draggable": e.elementDraggableAttribute }]),
      draggable: e.elementDraggableAttribute,
      onDragstart: t[2] || (t[2] = (...i) => e.handleDragStart && e.handleDragStart(...i)),
      onClick: t[3] || (t[3] = (...i) => e.handleClickOnEvent && e.handleClickOnEvent(...i))
    }, [
      sl,
      e.eventTimeStart && !e.calendarEvent.originalEvent ? (f(), m("span", ol, C(e.eventTimeStart), 1)) : S("", !0),
      T("span", ll, C(e.calendarEvent.title), 1)
    ], 42, il))
  ], 64));
}
const dl = /* @__PURE__ */ j(dn, [["render", cl], ["__scopeId", "data-v-4766dfc7"]]), ul = H({
  name: "Day",
  components: { Event: dl },
  mixins: [sn],
  props: {
    config: {
      type: Object,
      required: !0
    },
    time: {
      type: Object,
      required: !0
    },
    day: {
      type: Object,
      required: !0
    },
    isSelected: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "event-was-clicked",
    "event-was-dragged",
    "updated-period",
    "date-was-clicked",
    "day-was-selected"
  ],
  data() {
    return {
      isActiveDroppable: !1
    };
  },
  computed: {
    canBeDropped() {
      return this.isActiveDroppable;
    },
    hideLeadingAndTrailingDate() {
      var e;
      return this.day.isTrailingOrLeadingDate === !0 && ((e = this.config.month) == null ? void 0 : e.showTrailingAndLeadingDates) === !1;
    },
    isToday() {
      const {
        year: e,
        month: t,
        date: n
      } = this.time.getAllVariablesFromDateTimeString(this.day.dateTimeString);
      return this.time.dateIsToday(new Date(e, t, n));
    }
  },
  methods: {
    getMoreEvents() {
      const { date: e, month: t, year: n } = this.time.getAllVariablesFromDateTimeString(
        this.day.dateTimeString
      ), a = new Date(n, t, e), r = this.time.getCalendarWeekDateObjects(a), s = r[0], i = r[6];
      this.$emit("updated-period", { start: s, end: i, selectedDate: a });
    },
    handleDragLeave() {
      this.isActiveDroppable = !1;
    },
    handleDragEnd(e) {
      this.isActiveDroppable = !1, e.stopPropagation();
    },
    handleDrop(e) {
      if (this.isActiveDroppable = !1, e.stopPropagation(), !e || !e.dataTransfer)
        return;
      const t = JSON.parse(
        e.dataTransfer.getData("json")
      );
      this.time.dateStringsHaveEqualDates(
        t.time.start,
        this.time.dateStringFrom(this.day.dateTimeString)
      ) || (t.time.start = t.time.start.replace(
        /^\d{4}-\d{2}-\d{2}/,
        this.time.dateStringFrom(this.day.dateTimeString)
      ), t.time.end = t.time.end.replace(
        /^\d{4}-\d{2}-\d{2}/,
        this.time.dateStringFrom(this.day.dateTimeString)
      ), this.$emit("event-was-dragged", t));
    },
    handleDragOver(e) {
      return this.isActiveDroppable = !0, e.preventDefault(), !1;
    },
    emitDayWasClicked() {
      this.$emit("date-was-clicked", this.time.dateStringFrom(this.day.dateTimeString)), this.config.isSmall && this.$emit("day-was-selected", this.day);
    }
  }
});
const fl = ["id"], ml = { class: "calendar-month_events" }, hl = {
  key: 1,
  class: "space-reserver"
};
function vl(e, t, n, a, r, s) {
  const i = $("Event");
  return e.hideLeadingAndTrailingDate ? (f(), m("div", hl)) : (f(), m("div", {
    key: 0,
    id: "day-" + e.time.dateStringFrom(e.day.dateTimeString),
    class: x(["calendar-month__weekday", {
      "is-droppable": e.canBeDropped,
      "trailing-or-leading": e.day.isTrailingOrLeadingDate,
      "is-selected": e.isSelected,
      "is-today": e.isToday
    }]),
    onClick: t[3] || (t[3] = Bt((...o) => e.emitDayWasClicked && e.emitDayWasClicked(...o), ["self"])),
    onDragleave: t[4] || (t[4] = (...o) => e.handleDragLeave && e.handleDragLeave(...o)),
    onDragover: t[5] || (t[5] = (...o) => e.handleDragOver && e.handleDragOver(...o)),
    onDrop: t[6] || (t[6] = (...o) => e.handleDrop && e.handleDrop(...o)),
    onDragend: t[7] || (t[7] = (...o) => e.handleDragEnd && e.handleDragEnd(...o))
  }, [
    Y(e.$slots, "dayCell", { dayData: e.day }, () => [
      T("span", {
        class: "calendar-month__day-date",
        onClick: t[0] || (t[0] = (...o) => e.emitDayWasClicked && e.emitDayWasClicked(...o))
      }, C(e.day.dateTimeString.substring(8, 10).startsWith("0") ? e.day.dateTimeString.substring(9, 10) : e.day.dateTimeString.substring(8, 10)), 1),
      T("div", ml, [
        (f(!0), m(I, null, z(e.day.events, (o, l) => (f(), m(I, { key: l }, [
          l < 25 ? (f(), V(i, {
            key: o.id,
            "calendar-event": o,
            config: e.config,
            time: e.time,
            day: e.day,
            onEventWasClicked: t[1] || (t[1] = (c) => e.$emit("event-was-clicked", c))
          }, {
            monthEvent: U((c) => [
              Y(e.$slots, "monthEvent", {
                eventData: c.eventData
              }, void 0, !0)
            ]),
            _: 2
          }, 1032, ["calendar-event", "config", "time", "day"])) : S("", !0)
        ], 64))), 128)),
        e.day.events.length >= 1 ? (f(), m("div", {
          key: 0,
          class: "calendar-month__weekday-more",
          onClick: t[2] || (t[2] = (...o) => e.getMoreEvents && e.getMoreEvents(...o))
        }, C(e.getLanguage(e.languageKeys.moreEvents, e.time.CALENDAR_LOCALE)), 1)) : S("", !0)
      ])
    ], !0)
  ], 42, fl));
}
const gl = /* @__PURE__ */ j(ul, [["render", vl], ["__scopeId", "data-v-e7ff2963"]]), pl = H({
  name: "WeekDay",
  props: {
    day: {
      type: Object,
      required: !0
    }
  }
});
const yl = { class: "calendar-month__day-name" };
function bl(e, t, n, a, r, s) {
  return f(), m("span", yl, C(e.day.dayName), 1);
}
const Dl = /* @__PURE__ */ j(pl, [["render", bl], ["__scopeId", "data-v-09c7c5db"]]), un = H({
  name: "Event",
  components: { FontAwesomeIcon: Qe },
  props: {
    time: {
      type: Object,
      required: !0
    },
    calendarEvent: {
      type: Object,
      required: !0
    },
    config: {
      type: Object,
      required: !0
    }
  },
  emits: ["event-was-clicked"],
  data() {
    return {
      icons: {
        clock: Va,
        user: Ba,
        description: Xa,
        trash: za,
        edit: ja,
        times: Ya,
        topic: Ua,
        location: rn
      },
      colors: xe,
      eventBackgroundColor: "",
      eventColor: "#fff",
      eventIdPrefix: "agenda__event-"
    };
  },
  computed: {
    eventTime() {
      return Le.test(this.calendarEvent.time.start) ? this.time.getLocalizedTimeRange(
        this.calendarEvent.time.start,
        this.calendarEvent.time.end
      ) : null;
    },
    elementId() {
      return this.eventIdPrefix + this.calendarEvent.id;
    }
  },
  mounted() {
    this.setColors();
  },
  methods: {
    setColors() {
      var e, t, n;
      return (e = this.calendarEvent) != null && e.colorScheme && ((t = this.config.style) != null && t.colorSchemes) && this.config.style.colorSchemes[this.calendarEvent.colorScheme] ? (this.eventColor = this.config.style.colorSchemes[this.calendarEvent.colorScheme].color, this.eventBackgroundColor = this.config.style.colorSchemes[this.calendarEvent.colorScheme].backgroundColor) : (n = this.calendarEvent) != null && n.color ? this.eventBackgroundColor = this.colors[this.calendarEvent.color] : this.eventBackgroundColor = this.colors.blue;
    },
    handleClickOnEvent() {
      const e = document.getElementById(this.elementId);
      this.$emit("event-was-clicked", {
        clickedEvent: this.calendarEvent,
        eventElement: e
      });
    }
  }
}), aa = () => {
  Oe((e) => ({
    "691f2791": e.eventBackgroundColor,
    fa1649c2: e.eventColor
  }));
}, ra = un.setup;
un.setup = ra ? (e, t) => (aa(), ra(e, t)) : aa;
const kl = ["id"], wl = {
  key: 0,
  class: "agenda__event-time"
}, El = { class: "agenda__event-title" }, Sl = {
  key: 1,
  class: "agenda__event-with"
}, Tl = {
  key: 2,
  class: "agenda__event-location"
};
function Cl(e, t, n, a, r, s) {
  const i = $("FontAwesomeIcon");
  return f(), m("div", {
    id: e.elementId,
    class: "agenda__event is-event",
    onClick: t[0] || (t[0] = Bt((...o) => e.handleClickOnEvent && e.handleClickOnEvent(...o), ["prevent"]))
  }, [
    e.eventTime && !e.calendarEvent.originalEvent ? (f(), m("span", wl, [
      L(i, {
        icon: e.icons.clock
      }, null, 8, ["icon"]),
      le(" " + C(e.eventTime), 1)
    ])) : S("", !0),
    T("span", El, C(e.calendarEvent.title), 1),
    e.calendarEvent.with ? (f(), m("span", Sl, [
      L(i, {
        icon: e.icons.user
      }, null, 8, ["icon"]),
      le(" " + C(e.calendarEvent.with), 1)
    ])) : S("", !0),
    e.calendarEvent.location ? (f(), m("span", Tl, [
      L(i, {
        icon: e.icons.location
      }, null, 8, ["icon"]),
      le(" " + C(e.calendarEvent.location), 1)
    ])) : S("", !0)
  ], 8, kl);
}
const Al = /* @__PURE__ */ j(un, [["render", Cl], ["__scopeId", "data-v-698b431e"]]), _l = H({
  name: "AgendaEvents",
  components: { AgendaEventTile: Al },
  mixins: [sn],
  props: {
    config: {
      type: Object,
      required: !0
    },
    time: {
      type: Object,
      required: !0
    },
    day: {
      type: Object,
      required: !0
    }
  },
  emits: [
    "event-was-clicked"
  ]
});
const Ml = { class: "agenda__wrapper" }, Pl = { class: "agenda__header" }, Ll = { class: "agenda__header-day-name" }, Il = { class: "agenda__header-date" }, Ol = { class: "agenda__content" }, $l = {
  key: 0,
  class: "is-empty"
}, Fl = {
  key: 1,
  class: "agenda__content-events-list"
};
function Rl(e, t, n, a, r, s) {
  const i = $("AgendaEventTile");
  return f(), m("div", Ml, [
    T("header", Pl, [
      T("div", Ll, C(e.day.dayName), 1),
      T("div", Il, C(e.day.dateTimeString.substring(8, 10)), 1)
    ]),
    T("div", Ol, [
      e.day.events.length === 0 ? (f(), m("div", $l, C(e.getLanguage(e.languageKeys.noEvent, e.time.CALENDAR_LOCALE)), 1)) : (f(), m("div", Fl, [
        (f(!0), m(I, null, z(e.day.events, (o) => (f(), V(i, {
          key: "agenda_event_" + o.id,
          day: e.day,
          config: e.config,
          "calendar-event": o,
          time: e.time,
          onEventWasClicked: t[0] || (t[0] = (l) => e.$emit("event-was-clicked", l))
        }, null, 8, ["day", "config", "calendar-event", "time"]))), 128))
      ]))
    ])
  ]);
}
const Nl = /* @__PURE__ */ j(_l, [["render", Rl], ["__scopeId", "data-v-b60cbce5"]]), Wl = new qa(), Hl = H({
  name: "Month",
  components: {
    AgendaEvents: Nl,
    Day: gl,
    EventFlyout: xa,
    WeekDay: Dl
  },
  props: {
    config: {
      type: Object,
      required: !0
    },
    time: {
      type: Object,
      required: !0
    },
    period: {
      type: Object,
      required: !0
    },
    eventsProp: {
      type: Array,
      default: () => []
    }
  },
  emits: [
    "edit-event",
    "delete-event",
    "updated-period",
    "event-was-clicked",
    "event-was-dragged",
    "date-was-clicked"
  ],
  data() {
    return {
      month: [],
      selectedEvent: null,
      selectedEventElement: null,
      events: this.eventsProp,
      fullDayEvents: [],
      scrollbar: null,
      selectedDay: null
    };
  },
  mounted() {
    this.initMonth(), this.initScrollbar();
  },
  methods: {
    initScrollbar(e = 0) {
      const t = document.querySelector(".calendar-month");
      e > 3e3 || (t ? (this.scrollbar = new Re(t), this.scrollbar.update()) : this.initScrollbar(e + 50));
    },
    initMonth() {
      this.month = [], this.sortOutFullDayEvents(), this.setMonth(), this.config.isSmall && this.setInitialSelectedDay();
    },
    setMonth() {
      const { month: e, fullYear: t } = new Ne(this.period.selectedDate), a = this.time.getCalendarMonthSplitInWeeks(
        t,
        e
      ).map((r) => r.map((s) => {
        const i = this.time.getDateTimeStringFromDate(s), o = this.events.filter((l) => this.time.dateStringsHaveEqualDates(l.time.start, i));
        return {
          isTrailingOrLeadingDate: this.time.isTrailingOrLeadingDate(s, e),
          dayName: this.time.getLocalizedNameOfWeekday(s),
          dateTimeString: this.time.getDateTimeStringFromDate(s),
          events: o
        };
      }));
      this.month = Wl.positionFullDayEventsInMonth(
        a,
        this.fullDayEvents
      );
    },
    sortOutFullDayEvents() {
      const e = [], t = [];
      for (const n of this.events)
        Ee.getEventType(n, this.time) === Q.SINGLE_DAY_TIMED ? e.push(n) : t.push(n);
      this.events = e, this.fullDayEvents = t;
    },
    handleClickOnEvent(e) {
      this.$emit("event-was-clicked", e), this.selectedEventElement = e.eventElement, this.selectedEvent = e.clickedEvent;
    },
    handleEventWasDragged(e) {
      this.$emit("event-was-dragged", e);
      const t = [...this.events, ...this.fullDayEvents].filter(
        (n) => n.id !== e.id
      );
      t.push(e), this.events = [], this.fullDayEvents = [], this.events = t, this.initMonth();
    },
    setInitialSelectedDay() {
      const e = this.time.getDateStringFromDate(this.period.selectedDate);
      this.selectedDay = this.month.flat().find((t) => this.time.dateStringFrom(t.dateTimeString) === e) || null;
    }
  }
});
const Yl = { class: "calendar-month" }, zl = { class: "calendar-month__week-day-names" }, jl = { class: "calendar-month__weeks" }, Bl = {
  key: 0,
  class: "calendar-month__day_events"
};
function Ul(e, t, n, a, r, s) {
  var d;
  const i = $("WeekDay"), o = $("Day"), l = $("AgendaEvents"), c = $("EventFlyout");
  return f(), m("div", Yl, [
    T("div", zl, [
      (f(!0), m(I, null, z(e.month[0], (u, g) => (f(), V(i, {
        key: g,
        class: "calendar-month__week-day-name",
        config: e.config,
        day: u,
        time: e.time
      }, null, 8, ["config", "day", "time"]))), 128))
    ]),
    T("div", jl, [
      (f(!0), m(I, null, z(e.month, (u, g) => (f(), m("div", {
        key: g,
        class: "calendar-month__week"
      }, [
        (f(!0), m(I, null, z(u, (D, y) => {
          var k;
          return f(), V(o, {
            key: y,
            config: e.config,
            day: D,
            time: e.time,
            "is-selected": ((k = e.selectedDay) == null ? void 0 : k.dateTimeString) === D.dateTimeString,
            onEventWasClicked: e.handleClickOnEvent,
            onEventWasDragged: e.handleEventWasDragged,
            onDateWasClicked: t[0] || (t[0] = (w) => e.$emit("date-was-clicked", w)),
            onDayWasSelected: t[1] || (t[1] = (w) => e.selectedDay = w),
            onUpdatedPeriod: t[2] || (t[2] = (w) => e.$emit("updated-period", w))
          }, {
            monthEvent: U(({ eventData: w }) => [
              Y(e.$slots, "monthEvent", { eventData: w }, void 0, !0)
            ]),
            dayCell: U(({ dayData: w }) => [
              Y(e.$slots, "dayCell", { dayData: w }, void 0, !0)
            ]),
            _: 2
          }, 1032, ["config", "day", "time", "is-selected", "onEventWasClicked", "onEventWasDragged"]);
        }), 128))
      ]))), 128))
    ]),
    ((d = e.config.month) == null ? void 0 : d.showEventsOnMobileView) !== !1 ? (f(), m("div", Bl, [
      e.selectedDay ? (f(), V(l, {
        key: 0,
        config: e.config,
        time: e.time,
        day: e.selectedDay,
        onEventWasClicked: e.handleClickOnEvent
      }, null, 8, ["config", "time", "day", "onEventWasClicked"])) : S("", !0)
    ])) : S("", !0),
    !e.config.eventDialog || !e.config.eventDialog.isDisabled ? (f(), V(c, {
      key: 1,
      "calendar-event-prop": e.selectedEvent,
      "event-element": e.selectedEventElement,
      time: e.time,
      config: e.config,
      onHide: t[3] || (t[3] = (u) => e.selectedEvent = null),
      onEditEvent: t[4] || (t[4] = (u) => e.$emit("edit-event", u)),
      onDeleteEvent: t[5] || (t[5] = (u) => e.$emit("delete-event", u))
    }, {
      default: U((u) => [
        Y(e.$slots, "eventDialog", {
          eventDialogData: u.eventDialogData,
          closeEventDialog: u.closeEventDialog
        }, void 0, !0)
      ]),
      _: 3
    }, 8, ["calendar-event-prop", "event-element", "time", "config"])) : S("", !0)
  ]);
}
const Xl = /* @__PURE__ */ j(Hl, [["render", Ul], ["__scopeId", "data-v-206c177e"]]), K = class {
  static checkEventProperties(t) {
    var n, a, r, s, i, o;
    t.id || console.warn(this.MISSING_ID_WARNING), t.title || console.warn(this.MISSING_TITLE_WARNING), t.time || console.warn(this.MISSING_TIME_WARNING), (n = t == null ? void 0 : t.time) != null && n.start || console.warn(this.MISSING_TIME_START_WARNING), (a = t == null ? void 0 : t.time) != null && a.end || console.warn(this.MISSING_TIME_END_WARNING), (r = t.time) != null && r.start && ((s = t.time) != null && s.end) && !Le.test(t.time.start) && !ft.test(t.time.start) && console.warn(
      `${this.PREFIX} event property 'time.start' expects a string formatted like 'YYYY-MM-DD hh:mm', or 'YYYY-MM-DD', received ${t.time.start} 
${this.SUFFIX}`
    ), (i = t.time) != null && i.start && ((o = t.time) != null && o.end) && !Le.test(t.time.end) && !ft.test(t.time.end) && console.warn(
      `${this.PREFIX} event property 'time.end' expects a string formatted like 'YYYY-MM-DD hh:mm',  or 'YYYY-MM-DD', received ${t.time.end} 
${this.SUFFIX}`
    );
  }
  static checkConfig(t) {
    t.locale && !/^[a-z]{2}-[A-Z]{2}$/.test(t.locale) && console.warn(
      `${this.PREFIX} config.locale expects a string of format xx-XX, received: ${t.locale}`
    ), t.defaultMode && !["month", "week", "day"].some((n) => n === t.defaultMode) && console.warn(
      `${this.PREFIX} config.defaultMode expects either one of the values "day", "week" or "month"`
    );
  }
};
let ae = K;
F(ae, "PREFIX", "[Qalendar warning]"), // public static SUFFIX = 'This is a development warning, which will never be displayed in production environments'
F(ae, "SUFFIX", ""), F(ae, "MISSING_ID_WARNING", `${K.PREFIX} required event property 'id' is missing 
${K.SUFFIX}`), F(ae, "MISSING_TITLE_WARNING", `${K.PREFIX} required event property 'title' is missing 
${K.SUFFIX}`), F(ae, "MISSING_TIME_WARNING", `${K.PREFIX} required event property 'time' is missing 
${K.SUFFIX}`), F(ae, "MISSING_TIME_START_WARNING", `${K.PREFIX} required event property 'time.start' is missing 
${K.SUFFIX}`), F(ae, "MISSING_TIME_END_WARNING", `${K.PREFIX} required event property 'time.end' is missing 
${K.SUFFIX}`);
const fn = H({
  name: "Qalendar",
  components: {
    Month: Xl,
    AppHeader: Ls,
    Week: tl
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Array,
      default: () => []
    },
    selectedDate: {
      type: Date,
      default: /* @__PURE__ */ new Date()
    },
    isLoading: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "event-was-clicked",
    "event-was-resized",
    "event-was-dragged",
    "updated-period",
    "updated-mode",
    "edit-event",
    "delete-event",
    "interval-was-clicked",
    "day-was-clicked",
    // TODO: remove with v4. day-was-clicked is deprecated
    "date-was-clicked",
    "datetime-was-clicked"
  ],
  data() {
    var e, t, n, a, r, s, i, o, l, c;
    return {
      wasInitialized: 0,
      period: {
        start: /* @__PURE__ */ new Date(),
        end: /* @__PURE__ */ new Date(),
        selectedDate: this.selectedDate
      },
      mode: ((e = this.config) == null ? void 0 : e.defaultMode) || "week",
      time: new se((n = (t = this.config) == null ? void 0 : t.week) == null ? void 0 : n.startsOn, ((a = this.config) == null ? void 0 : a.locale) || null, {
        start: this.setTimePointsFromDayBoundary(
          ((s = (r = this.config) == null ? void 0 : r.dayBoundaries) == null ? void 0 : s.start) || 0
        ),
        end: this.setTimePointsFromDayBoundary(
          ((o = (i = this.config) == null ? void 0 : i.dayBoundaries) == null ? void 0 : o.end) || 24
        )
      }),
      fontFamily: ((c = (l = this.config) == null ? void 0 : l.style) == null ? void 0 : c.fontFamily) || "'Verdana', 'Open Sans', serif",
      eventRenderingKey: 0,
      // Works only as a dummy value, for re-rendering Month- and Week components, when events-watcher triggers
      eventsDataProperty: this.events,
      isSmall: !1,
      ErrorsHelper: ae
    };
  },
  computed: {
    enhancedConfig() {
      return { ...this.config, isSmall: this.isSmall };
    }
  },
  watch: {
    events: {
      deep: !0,
      handler(e, t) {
        JSON.stringify(e) !== JSON.stringify(t) && (this.eventsDataProperty = e, this.eventRenderingKey = this.eventRenderingKey + 1), !this.config.isSilent && this.events.forEach((n) => this.ErrorsHelper.checkEventProperties(n));
      },
      immediate: !0
    },
    config: {
      deep: !0,
      handler(e) {
        this.ErrorsHelper.checkConfig(e);
      },
      immediate: !0
    }
  },
  mounted() {
    this.setConfigOnMount(), this.onCalendarResize(), this.setPeriodOnMount(), window.addEventListener("resize", this.onCalendarResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onCalendarResize);
  },
  methods: {
    setConfigOnMount() {
      this.wasInitialized = 1;
    },
    /**
     * setModeWeek is used as flag, when the user clicks "+ see more" for a day, in the month view
     * */
    handleUpdatedPeriod(e, t = !1) {
      this.$emit("updated-period", { start: e.start, end: e.end }), this.period = e, t && (this.mode = "day");
    },
    /**
     * Update this.period according to the new mode, and then set this.mode to the provided payload
     * */
    handleChangeMode(e) {
      if (e === "day" && (this.period.start = this.period.selectedDate, this.period.end = this.time.setDateToEndOfDay(this.period.selectedDate)), e === "week") {
        const t = this.time.getCalendarWeekDateObjects(
          this.period.selectedDate
        );
        this.period.start = t[0], this.period.end = this.time.setDateToEndOfDay(t[6]);
      }
      if (e === "month") {
        const t = this.time.getCalendarMonthSplitInWeeks(
          this.period.selectedDate.getFullYear(),
          this.period.selectedDate.getMonth()
        );
        this.period.start = t[0][0];
        const n = t[t.length - 1];
        this.period.end = this.time.setDateToEndOfDay(
          n[n.length - 1]
        );
      }
      this.mode = e, this.$emit("updated-mode", { mode: e, period: this.period });
    },
    onCalendarResize() {
      const e = document.documentElement, t = document.querySelector(".calendar-root"), n = +window.getComputedStyle(e).fontSize.split("p")[0], a = 700, r = 16 / n, s = a / r;
      t && (this.isSmall = t.clientWidth < s, this.isSmall && !["day", "month"].includes(this.mode) && (this.mode = "day"));
    },
    setPeriodOnMount() {
      if (this.mode === "week") {
        const e = this.time.getCalendarWeekDateObjects(
          this.period.selectedDate
        );
        this.period.start = e[0], this.period.end = e[6];
      } else if (this.mode === "month") {
        const e = this.time.getCalendarMonthSplitInWeeks(
          this.period.selectedDate.getFullYear(),
          this.period.selectedDate.getMonth()
        );
        this.period.start = e[0][0];
        const t = e[e.length - 1];
        this.period.end = t[t.length - 1];
      }
    },
    handleEventWasUpdated(e, t) {
      const n = this.eventsDataProperty.filter(
        (a) => a.id !== e.id
      );
      this.eventsDataProperty = [e, ...n], this.$emit(`event-was-${t}`, e);
    },
    setTimePointsFromDayBoundary(e) {
      return se.getTimePointsFromHour(e);
    },
    handleDateWasClicked(e) {
      this.$emit("day-was-clicked", e), this.$emit("date-was-clicked", e);
    },
    goToPeriod(e) {
      this.$refs.appHeader.goToPeriod(e);
    }
  }
}), ia = () => {
  Oe((e) => ({
    "51d82805": e.fontFamily
  }));
}, sa = fn.setup;
fn.setup = sa ? (e, t) => (ia(), sa(e, t)) : ia;
const Vl = { class: "calendar-root-wrapper" }, xl = ["data-lang"], ql = {
  key: 0,
  class: "top-bar-loader"
};
function Gl(e, t, n, a, r, s) {
  var c, d;
  const i = $("AppHeader"), o = $("Week"), l = $("Month");
  return f(), m("div", Vl, [
    T("div", {
      class: x(["calendar-root", {
        "mode-is-day": e.mode === "day",
        "mode-is-week": e.mode === "week",
        "mode-is-month": e.mode === "month",
        "qalendar-is-small": e.isSmall
      }]),
      "data-lang": ((d = (c = e.config) == null ? void 0 : c.locale) == null ? void 0 : d.substring(0, 2)) || "en"
    }, [
      L(ir, { name: "loading" }, {
        default: U(() => [
          e.isLoading ? (f(), m("div", ql)) : S("", !0)
        ]),
        _: 1
      }),
      (f(), V(i, {
        ref: "appHeader",
        key: e.wasInitialized + e.mode,
        config: e.config,
        mode: e.mode,
        time: e.time,
        period: e.period,
        "is-small": e.isSmall,
        onChangeMode: e.handleChangeMode,
        onUpdatedPeriod: e.handleUpdatedPeriod
      }, null, 8, ["config", "mode", "time", "period", "is-small", "onChangeMode", "onUpdatedPeriod"])),
      ["week", "day"].includes(e.mode) ? (f(), V(o, {
        key: e.period.start.getTime() + e.period.end.getTime() + e.eventRenderingKey,
        "events-prop": e.eventsDataProperty,
        period: e.period,
        config: e.config,
        "mode-prop": e.mode,
        time: e.time,
        onEventWasClicked: t[0] || (t[0] = (u) => e.$emit("event-was-clicked", u)),
        onEventWasResized: t[1] || (t[1] = (u) => e.handleEventWasUpdated(u, "resized")),
        onEventWasDragged: t[2] || (t[2] = (u) => e.handleEventWasUpdated(u, "dragged")),
        onEditEvent: t[3] || (t[3] = (u) => e.$emit("edit-event", u)),
        onDeleteEvent: t[4] || (t[4] = (u) => e.$emit("delete-event", u)),
        onIntervalWasClicked: t[5] || (t[5] = (u) => e.$emit("interval-was-clicked", u)),
        onDayWasClicked: t[6] || (t[6] = (u) => e.$emit("day-was-clicked", u)),
        onDatetimeWasClicked: t[7] || (t[7] = (u) => e.$emit("datetime-was-clicked", u))
      }, {
        weekDayEvent: U((u) => [
          Y(e.$slots, "weekDayEvent", {
            eventData: u.eventData
          })
        ]),
        eventDialog: U((u) => [
          Y(e.$slots, "eventDialog", {
            eventDialogData: u.eventDialogData,
            closeEventDialog: u.closeEventDialog
          })
        ]),
        customCurrentTime: U(() => [
          Y(e.$slots, "customCurrentTime")
        ]),
        _: 3
      }, 8, ["events-prop", "period", "config", "mode-prop", "time"])) : S("", !0),
      e.mode === "month" ? (f(), V(l, {
        key: e.period.start.getTime() + e.period.end.getTime() + e.eventRenderingKey,
        "events-prop": e.eventsDataProperty,
        time: e.time,
        config: e.enhancedConfig,
        period: e.period,
        onEventWasClicked: t[8] || (t[8] = (u) => e.$emit("event-was-clicked", u)),
        onDateWasClicked: e.handleDateWasClicked,
        onEventWasDragged: t[9] || (t[9] = (u) => e.handleEventWasUpdated(u, "dragged")),
        onUpdatedPeriod: t[10] || (t[10] = (u) => e.handleUpdatedPeriod(u, !0)),
        onEditEvent: t[11] || (t[11] = (u) => e.$emit("edit-event", u)),
        onDeleteEvent: t[12] || (t[12] = (u) => e.$emit("delete-event", u))
      }, {
        eventDialog: U((u) => [
          Y(e.$slots, "eventDialog", {
            eventDialogData: u.eventDialogData,
            closeEventDialog: u.closeEventDialog
          })
        ]),
        monthEvent: U((u) => [
          Y(e.$slots, "monthEvent", {
            eventData: u.eventData
          })
        ]),
        dayCell: U(({ dayData: u }) => [
          Y(e.$slots, "dayCell", { dayData: u })
        ]),
        _: 3
      }, 8, ["events-prop", "time", "config", "period", "onDateWasClicked"])) : S("", !0)
    ], 10, xl)
  ]);
}
const Jl = /* @__PURE__ */ j(fn, [["render", Gl]]);
export {
  ks as DatePicker,
  Jl as Qalendar
};
