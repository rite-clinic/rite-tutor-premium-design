import type {
  ChargePlan,
  Course,
  DescriptionEntry,
  ScheduleSlot,
} from "@/services/courseService";

export const DEFAULT_TEACHER_TIMEZONE = "Asia/Kolkata";

/* --------------------------------- People --------------------------------- */

export function instructorName(course: Course | null | undefined): string {
  const first = course?.author?.first_name || "";
  const last = course?.author?.last_name || "";
  const name = `${first} ${last}`.trim();
  return name || "Rite Tutor Mentor";
}

export function teacherName(slot: ScheduleSlot | null | undefined): string {
  const name = `${slot?.teacher_fname || ""} ${slot?.teacher_lname || ""}`.trim();
  return name || "Rite Tutor Mentor";
}

/* --------------------------------- Pricing -------------------------------- */

export function isFreeCourse(course: Course | null | undefined): boolean {
  return (course?.course_type || "").toLowerCase() === "free";
}

/** Normalise the inconsistent `charges` field into a list of plan objects. */
export function normalizeCharges(charges: Course["charges"]): ChargePlan[] {
  if (!charges) return [];
  if (Array.isArray(charges)) {
    return charges.filter((plan): plan is ChargePlan => !!plan && typeof plan === "object");
  }
  return [];
}

/** Raw string charges like "200$" — used when `charges` isn't structured. */
export function chargesText(charges: Course["charges"]): string | null {
  if (typeof charges === "string" && charges.trim()) return charges.trim();
  return null;
}

function toNumber(value: unknown): number | null {
  const num = Number(value);
  return Number.isFinite(num) && num > 0 ? num : null;
}

export function formatMoney(value: unknown): string | null {
  const num = toNumber(value);
  return num === null ? null : `$${num % 1 === 0 ? num : num.toFixed(2)}`;
}

/** Short, card-friendly pricing summary. */
export function pricingSummary(course: Course | null | undefined): string {
  if (!course) return "";
  if (isFreeCourse(course)) return "Free demo available";

  const plans = normalizeCharges(course.charges);
  if (plans.length === 1) {
    const plan = plans[0];
    const total = formatMoney(plan.total_charge);
    const perClass = formatMoney(plan.price_per_class);
    if (total) return `${total} total`;
    if (perClass) return `${perClass}/class`;
  }
  if (plans.length > 1) {
    const rates = plans.map((p) => toNumber(p.price_per_class)).filter((n): n is number => n !== null);
    if (rates.length) return `Plans from $${Math.min(...rates)}/class`;
    return "Multiple plans available";
  }

  const text = chargesText(course.charges);
  if (text) return text;
  return "Pricing on request";
}

export function planLabel(plan: ChargePlan, index: number): string {
  const sessions = toNumber(plan.sessions_per_week);
  const weeks = toNumber(plan.total_weeks);
  if (sessions && weeks) {
    return `${sessions} ${sessions === 1 ? "class" : "classes"}/week · ${weeks} weeks`;
  }
  if (sessions) return `${sessions} ${sessions === 1 ? "class" : "classes"}/week`;
  if (weeks) return `${weeks} weeks`;
  return `Plan ${index + 1}`;
}

/* ------------------------------- Description ------------------------------ */

/** `description` may be an array, a string, empty or null. */
export function normalizeDescription(description: Course["description"]): DescriptionEntry[] {
  if (!description) return [];
  if (typeof description === "string") {
    const trimmed = description.trim();
    return trimmed ? [{ content: trimmed }] : [];
  }
  if (Array.isArray(description)) {
    return description
      .filter((entry): entry is DescriptionEntry => !!entry && typeof entry === "object")
      .filter((entry) => (entry.content || "").trim() || (entry.objectives || "").trim());
  }
  return [];
}

/* ------------------------------ Date and time ----------------------------- */

/** Build a Date from a schedule's date + time interpreted in a given timezone. */
function zonedToUtc(dateStr: string, timeStr: string, timeZone: string): Date | null {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm, ss] = timeStr.split(":").map(Number);
  if (!y || !m || !d || Number.isNaN(hh)) return null;
  const guess = Date.UTC(y, m - 1, d, hh || 0, mm || 0, ss || 0);
  try {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const parts = Object.fromEntries(
      fmt.formatToParts(new Date(guess)).map((p) => [p.type, p.value]),
    );
    const asUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour) % 24,
      Number(parts.minute),
      Number(parts.second),
    );
    return new Date(guess - (asUtc - guess));
  } catch {
    return null;
  }
}

export function slotTimezone(slot: ScheduleSlot): string {
  return slot.timezone || DEFAULT_TEACHER_TIMEZONE;
}

export function slotStartDate(slot: ScheduleSlot): Date | null {
  if (!slot.date || !slot.start_time) return null;
  return zonedToUtc(slot.date, slot.start_time, slotTimezone(slot));
}

export function isUpcomingSlot(slot: ScheduleSlot, now: Date = new Date()): boolean {
  const start = slotStartDate(slot);
  if (!start) return false;
  return start.getTime() > now.getTime();
}

export function userTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    return "";
  }
}

function timeFormatter(timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/** "7:00 AM" in the given timezone, from a raw HH:MM:SS schedule time. */
export function formatSlotTime(slot: ScheduleSlot, timeZone?: string): string {
  const tz = timeZone || slotTimezone(slot);
  const start = slotStartDate(slot);
  if (start) {
    try {
      return timeFormatter(tz).format(start);
    } catch {
      /* fall through */
    }
  }
  return (slot.start_time || "").slice(0, 5);
}

export function formatSlotRange(slot: ScheduleSlot, timeZone?: string): string {
  const tz = timeZone || slotTimezone(slot);
  const start = slotStartDate(slot);
  const endRaw = slot.end_time;
  if (start && endRaw && slot.date) {
    const end = zonedToUtc(slot.date, endRaw, slotTimezone(slot));
    if (end) {
      try {
        const f = timeFormatter(tz);
        return `${f.format(start)} – ${f.format(end)}`;
      } catch {
        /* fall through */
      }
    }
  }
  const a = (slot.start_time || "").slice(0, 5);
  const b = (endRaw || "").slice(0, 5);
  return b ? `${a} – ${b}` : a;
}

/** True when we can reliably show the user's local time too. */
export function shouldShowUserTime(slot: ScheduleSlot): boolean {
  const tz = userTimezone();
  return !!tz && tz !== slotTimezone(slot) && !!slotStartDate(slot);
}

export function formatDateHeading(dateStr: string, timeZone: string): string {
  const start = zonedToUtc(dateStr, "12:00:00", timeZone);
  const date = start ?? new Date(`${dateStr}T12:00:00`);
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return dateStr;
  }
}

export interface SlotGroup {
  date: string;
  label: string;
  slots: ScheduleSlot[];
}

/** Group bookable, upcoming slots by their schedule date. */
export function groupSlotsByDate(slots: ScheduleSlot[]): SlotGroup[] {
  const now = new Date();
  const map = new Map<string, ScheduleSlot[]>();
  slots
    .filter((slot) => slot.date && isUpcomingSlot(slot, now))
    .forEach((slot) => {
      const key = slot.date as string;
      map.set(key, [...(map.get(key) || []), slot]);
    });

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, groupSlots]) => ({
      date,
      label: formatDateHeading(date, slotTimezone(groupSlots[0])),
      slots: groupSlots.sort((a, b) => (a.start_time || "").localeCompare(b.start_time || "")),
    }));
}
