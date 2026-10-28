/**
 * Date utilities — Kaayo uses YYYY-MM-DD (date) and YYYY-MM (month) strings
 * everywhere for Firestore-friendly sorting/querying.
 */

import { addDays, differenceInCalendarDays, differenceInYears, eachDayOfInterval, endOfMonth, format, parse } from 'date-fns';

export function todayString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function currentMonthString(): string {
  return format(new Date(), 'yyyy-MM');
}

export function monthString(d: Date): string {
  return format(d, 'yyyy-MM');
}

/** Display label for a YYYY-MM month string, e.g. "May 2026". */
export function monthLabel(month: string): string {
  const d = parse(month, 'yyyy-MM', new Date());
  return format(d, 'MMMM yyyy');
}

/** Step a YYYY-MM month forward (delta=+1) or back (delta=-1). */
export function shiftMonth(month: string, delta: number): string {
  const d = parse(month, 'yyyy-MM', new Date());
  d.setMonth(d.getMonth() + delta);
  return format(d, 'yyyy-MM');
}

/** Display label for a YYYY-MM-DD date string, e.g. "Tue, 14 Jul 2026". */
export function dayLabel(date: string): string {
  const d = parse(date, 'yyyy-MM-dd', new Date());
  return format(d, 'EEE, d MMM yyyy');
}

/** Step a YYYY-MM-DD date forward (delta=+1) or back (delta=-1) by day. */
export function shiftDay(date: string, delta: number): string {
  const d = parse(date, 'yyyy-MM-dd', new Date());
  d.setDate(d.getDate() + delta);
  return format(d, 'yyyy-MM-dd');
}

/** 'HH:mm' or 'HH:mm:ss' 24-hr -> "5:30 PM"; '' for anything else (never throws on bad data). */
export function timeLabel(time: string): string {
  const hhmm = /^(\d{1,2}:\d{2})(?::\d{2})?$/.exec(time ?? '')?.[1];
  const d = hhmm ? parse(hhmm, 'H:mm', new Date()) : null;
  return d && !Number.isNaN(d.getTime()) ? format(d, 'h:mm a') : '';
}

/** Notification-card date slot, e.g. "SAT 12 OCT" (the slot style uppercases it anyway). */
export function cardDateLabel(date: string): string {
  return format(parse(date, 'yyyy-MM-dd', new Date()), 'EEE d MMM').toUpperCase();
}

/** Computed, read-only Age display next to DOB (Phase 4). Returns null for an invalid/empty DOB. */
export function calculateAge(dateOfBirth: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) return null;
  const dob = parse(dateOfBirth, 'yyyy-MM-dd', new Date());
  if (Number.isNaN(dob.getTime())) return null;
  return differenceInYears(new Date(), dob);
}

/** Day of month with its suffix: 1st, 2nd, 3rd, 4th, 11th, 12th, 13th, 21st, 22nd, 23rd... */
export function ordinal(n: number): string {
  const teen = n % 100 >= 11 && n % 100 <= 13;
  const suffix = teen ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[n % 10] ?? 'th';
  return `${n}${suffix}`;
}

/** Display label for a YYYY-MM-DD date, e.g. "09 Jun 2026"; '' when invalid/empty. */
export function shortDateLabel(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return '';
  const d = parse(date, 'yyyy-MM-dd', new Date());
  return Number.isNaN(d.getTime()) ? '' : format(d, 'dd MMM yyyy');
}

const toDate = (date: string) => parse(date, 'yyyy-MM-dd', new Date());
const toDateString = (d: Date) => format(d, 'yyyy-MM-dd');

/** Every YYYY-MM-DD from `from` to `to`, inclusive; [] while either is blank. */
export function datesInRange(from: string, to: string): string[] {
  if (!from || !to) return [];
  return eachDayOfInterval({ start: toDate(from), end: toDate(to) }).map(toDateString);
}

/** First and last date of a YYYY-MM month. */
export function monthRange(month: string): { from: string; to: string } {
  const first = parse(month, 'yyyy-MM', new Date());
  return { from: toDateString(first), to: toDateString(endOfMonth(first)) };
}

/** Attendance week strip: how far back swiping may go (a month-sheet pick can jump further). */
export const WEEKS_BACK_MAX = 12;
/** Days before today on the strip's default page — today sits second from the right. */
const DAYS_BEFORE_TODAY = 5;

/** The 7 dates of week page `offset` (0 = today-5 … today+1, -1 = the 7 days before that). */
export function weekDates(today: string, offset: number): string[] {
  const start = addDays(toDate(today), offset * 7 - DAYS_BEFORE_TODAY);
  return Array.from({ length: 7 }, (_, i) => toDateString(addDays(start, i)));
}

/** The week page that shows `date`. */
export function weekOffsetFor(date: string, today: string): number {
  return Math.floor((differenceInCalendarDays(toDate(date), toDate(today)) + DAYS_BEFORE_TODAY) / 7);
}

/** One swipe (`-1` earlier, `+1` later), capped at WEEKS_BACK_MAX back and the default page. A page
 * jumped to outside that range can still swipe back toward it. */
export function swipeWeek(offset: number, delta: 1 | -1): number {
  const next = offset + delta;
  return (delta < 0 ? next >= -WEEKS_BACK_MAX : next <= 0) ? next : offset;
}

/** A YYYY-MM month as Monday-first weeks of 7, padded with null before the 1st and after the last. */
export function monthGrid(month: string): (string | null)[][] {
  const { from, to } = monthRange(month);
  const lead = (toDate(from).getDay() + 6) % 7;
  const cells: (string | null)[] = [...Array<null>(lead).fill(null), ...datesInRange(from, to)];
  while (cells.length % 7) cells.push(null);
  return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
}
