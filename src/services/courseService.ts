export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  "https://ritetutor.com/backend/api";

/* ---------------------------------- Types --------------------------------- */

export interface CourseAuthor {
  id?: number;
  first_name?: string | null;
  last_name?: string | null;
}

export interface Subcourse {
  id: number;
  title?: string | null;
  description?: string | null;
  file?: string | null;
  active?: boolean;
  visible_to_free_users?: boolean;
}

export interface ChargePlan {
  sessions_per_week?: string | number | null;
  price_per_class?: string | number | null;
  total_weeks?: string | number | null;
  total_charge?: string | number | null;
}

export interface DescriptionEntry {
  content?: string | null;
  objectives?: string | null;
}

export interface Course {
  id: number;
  title?: string | null;
  subtitle?: string | null;
  intro?: string | null;
  course_type?: string | null;
  num_classes?: number | null;
  duration?: string | null;
  image?: string | null;
  brochure?: string | null;
  charges?: ChargePlan[] | string | null;
  description?: DescriptionEntry[] | string | null;
  subcourses?: Subcourse[] | null;
  author?: CourseAuthor | null;
  is_course_verified?: boolean;
  show_on_website?: boolean;
}

export interface ScheduleSlot {
  id: number;
  teacher_fname?: string | null;
  teacher_lname?: string | null;
  teacher_id?: string | number | null;
  is_available?: boolean;
  availability_status?: string | null;
  booked_status?: boolean;
  date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  timezone?: string | null;
}

export interface DemoBookingPayload {
  kid_fname: string;
  kid_lname: string;
  kid_email: string;
  kid_contact: string;
  course_id: number;
  schedule_id: number;
}

/* --------------------------------- Fetcher -------------------------------- */

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
  } catch {
    throw new ApiError("Network error. Please check your connection.", 0);
  }

  let body: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!res.ok) {
    throw new ApiError(extractErrorMessage(body), res.status);
  }
  return body as T;
}

/** Pull a short, safe, human message out of an unknown error body. */
export function extractErrorMessage(body: unknown): string {
  const fallback = "Something went wrong. Please try again.";
  if (!body) return fallback;
  if (typeof body === "string") {
    const trimmed = body.trim();
    if (!trimmed || trimmed.startsWith("<") || trimmed.length > 200) return fallback;
    return trimmed;
  }
  if (typeof body === "object") {
    const rec = body as Record<string, unknown>;
    for (const key of ["message", "detail", "error", "errors", "non_field_errors"]) {
      const value = rec[key];
      if (typeof value === "string" && value.trim() && value.length <= 200) return value.trim();
      if (Array.isArray(value) && typeof value[0] === "string" && value[0].length <= 200) {
        return value[0];
      }
    }
  }
  return fallback;
}

/* ----------------------------- Public visibility -------------------------- */

export function isCoursePublic(course: Course | null | undefined): boolean {
  return !!course && course.is_course_verified === true && course.show_on_website === true;
}

export function isSlotBookable(slot: ScheduleSlot): boolean {
  return (
    slot.is_available === true &&
    slot.booked_status !== true &&
    slot.availability_status === "AVAILABLE"
  );
}

/* --------------------------------- Service -------------------------------- */

export async function getCourses(): Promise<Course[]> {
  const data = await request<unknown>("/courses-list/");
  const list = Array.isArray(data)
    ? data
    : Array.isArray((data as { data?: Course[] })?.data)
      ? (data as { data: Course[] }).data
      : [];
  return (list as Course[]).filter(isCoursePublic);
}

export async function getCourse(courseId: string | number): Promise<Course> {
  const data = await request<Course | { data: Course }>(
    `/courses/${encodeURIComponent(String(courseId))}/`,
  );
  const course = (data as { data?: Course })?.data ?? (data as Course);
  if (!course || typeof course !== "object" || !("id" in course)) {
    throw new ApiError("Course not found.", 404);
  }
  return course;
}

export async function getCourseSchedules(courseId: string | number): Promise<ScheduleSlot[]> {
  const data = await request<{ data?: ScheduleSlot[] } | ScheduleSlot[]>(
    `/course/schedule/available/?course=${encodeURIComponent(String(courseId))}`,
  );
  const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
  return list.filter(isSlotBookable);
}

export async function bookDemo(payload: DemoBookingPayload): Promise<unknown> {
  return request("/teacher/schedule/book/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
