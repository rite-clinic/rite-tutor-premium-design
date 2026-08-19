import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Globe,
  Loader2,
  RefreshCw,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COUNTRIES, DEFAULT_COUNTRY, type Country } from "@/data/countryCodes";
import {
  bookDemo,
  getCourseSchedules,
  ApiError,
  type Course,
  type ScheduleSlot,
} from "@/services/courseService";
import {
  formatSlotRange,
  groupSlotsByDate,
  shouldShowUserTime,
  slotTimezone,
  teacherName,
  userTimezone,
  type SlotGroup,
} from "@/lib/courseUtils";
import { cn } from "@/lib/utils";

interface Props {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "slots" | "details" | "success";

type Fields = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_code: string;
  website: string; // honeypot
};

const INITIAL: Fields = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  country_code: DEFAULT_COUNTRY.code,
  website: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const digitsOnly = (value: string) => String(value || "").replace(/\D/g, "");
const findCountry = (iso: string): Country =>
  COUNTRIES.find((c) => c.code === iso) || DEFAULT_COUNTRY;

export function DemoBookingModal({ course, open, onOpenChange }: Props) {
  const [step, setStep] = useState<Step>("slots");
  const [slots, setSlots] = useState<ScheduleSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);
  const [fields, setFields] = useState<Fields>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const localTimezone = userTimezone();

  // Reset the flow whenever the modal is opened.
  useEffect(() => {
    if (!open) return;
    setStep("slots");
    setSelectedSlot(null);
    setSelectedDate(null);
    setFields(INITIAL);
    setTouched({});
    setSubmitError(null);
    setReloadKey((key) => key + 1);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let active = true;
    setLoadingSlots(true);
    setSlotsError(null);
    getCourseSchedules(course.id)
      .then((data) => {
        if (active) setSlots(data);
      })
      .catch((err: Error) => {
        if (active) setSlotsError(err.message || "Unable to load demo slots.");
      })
      .finally(() => {
        if (active) setLoadingSlots(false);
      });
    return () => {
      active = false;
    };
  }, [open, course.id, reloadKey]);

  const groups: SlotGroup[] = useMemo(() => groupSlotsByDate(slots), [slots]);

  useEffect(() => {
    if (!groups.length) {
      setSelectedDate(null);
      return;
    }
    setSelectedDate((current) =>
      current && groups.some((group) => group.date === current) ? current : groups[0].date,
    );
  }, [groups]);

  const activeGroup = groups.find((group) => group.date === selectedDate) || groups[0];

  const errors = useMemo(() => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.first_name.trim()) next.first_name = "Student first name is required.";
    else if (fields.first_name.trim().length > 60) next.first_name = "Name is too long.";
    if (fields.last_name.trim().length > 60) next.last_name = "Name is too long.";
    const email = fields.email.trim();
    if (!email) next.email = "Email is required.";
    else if (!EMAIL_REGEX.test(email) || email.length > 255)
      next.email = "Please enter a valid email address.";
    const country = findCountry(fields.country_code);
    const phone = digitsOnly(fields.phone);
    if (!phone) next.phone = "Contact number is required.";
    else if (phone.length < country.min || phone.length > country.max)
      next.phone =
        country.min === country.max
          ? `Phone must be exactly ${country.min} digits for ${country.name}.`
          : `Phone must be ${country.min}-${country.max} digits for ${country.name}.`;
    return next;
  }, [fields]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting && !!selectedSlot;
  const country = findCountry(fields.country_code);
  const fieldError = (name: keyof Fields) => (touched[name] ? errors[name] : undefined);

  const handleSelectSlot = (slot: ScheduleSlot) => {
    setSelectedSlot(slot);
    setSubmitError(null);
    setStep("details");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched({ first_name: true, last_name: true, email: true, phone: true });
    if (!selectedSlot || Object.keys(errors).length > 0 || submitting) return;
    if (fields.website.trim()) return; // honeypot tripped

    setSubmitting(true);
    setSubmitError(null);
    try {
      await bookDemo({
        kid_fname: fields.first_name.trim(),
        kid_lname: fields.last_name.trim() || fields.first_name.trim(),
        kid_email: fields.email.trim(),
        kid_contact: `+${country.dial}${digitsOnly(fields.phone)}`,
        course_id: Number(course.id),
        schedule_id: Number(selectedSlot.id),
      });
      setStep("success");
    } catch (err) {
      const apiError = err as ApiError;
      const alreadyTaken = apiError.status === 409 || apiError.status === 400;
      setSubmitError(
        alreadyTaken
          ? apiError.message ||
              "That slot was just booked by another family. Please pick a different time."
          : apiError.message || "We couldn't confirm your booking. Please try again.",
      );
      if (alreadyTaken) {
        setStep("slots");
        setSelectedSlot(null);
        setReloadKey((key) => key + 1);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto sm:w-full">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {step === "success" ? "Your Free Demo Is Confirmed" : "Book a Free Demo Class"}
          </DialogTitle>
          <DialogDescription>
            {step === "slots" && `Pick a time that works for ${course.title || "this course"}.`}
            {step === "details" && "Tell us who's joining the demo class."}
            {step === "success" && "Here are your class details — check your inbox too."}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1 — slot selection */}
        {step === "slots" && (
          <div className="space-y-5">
            {submitError && (
              <p className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {submitError}
              </p>
            )}

            {loadingSlots && (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-12 animate-pulse rounded-lg bg-muted" />
                ))}
              </div>
            )}

            {!loadingSlots && slotsError && (
              <div className="rounded-xl border border-border p-6 text-center">
                <AlertCircle className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">{slotsError}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setReloadKey((key) => key + 1)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Retry
                </Button>
              </div>
            )}

            {!loadingSlots && !slotsError && groups.length === 0 && (
              <div className="rounded-xl border border-border p-6 text-center">
                <CalendarDays className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-3 font-semibold">No demo slots open right now</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  New slots are released weekly. Call us at +1 (929) 421-8055 and we'll arrange a
                  session for your child.
                </p>
              </div>
            )}

            {!loadingSlots && !slotsError && groups.length > 0 && activeGroup && (
              <>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {groups.map((group) => (
                    <button
                      key={group.date}
                      type="button"
                      onClick={() => setSelectedDate(group.date)}
                      className={cn(
                        "shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                        group.date === activeGroup.date
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground/80 hover:bg-muted",
                      )}
                    >
                      {group.label}
                    </button>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {activeGroup.slots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => handleSelectSlot(slot)}
                      className="rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-premium"
                    >
                      <p className="flex items-center gap-2 font-semibold">
                        <Clock className="h-4 w-4 text-primary" />
                        {formatSlotRange(slot)}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Globe className="h-3.5 w-3.5" /> {slotTimezone(slot)}
                        {shouldShowUserTime(slot) && (
                          <span>
                            · {formatSlotRange(slot, localTimezone)} your time
                          </span>
                        )}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm">
                        <User className="h-3.5 w-3.5 text-primary" /> {teacherName(slot)}
                      </p>
                    </button>
                  ))}
                </div>

                {localTimezone && (
                  <p className="text-xs text-muted-foreground">
                    Detected timezone: <span className="font-medium">{localTimezone}</span>
                  </p>
                )}
              </>
            )}
          </div>
        )}

        {/* Step 2 — student details */}
        {step === "details" && selectedSlot && (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="rounded-xl border border-border bg-muted/40 p-4 text-sm">
              <p className="font-semibold">{formatSlotRange(selectedSlot)}</p>
              <p className="text-muted-foreground">
                {groups.find((g) => g.date === selectedSlot.date)?.label || selectedSlot.date} ·{" "}
                {teacherName(selectedSlot)}
              </p>
              {shouldShowUserTime(selectedSlot) && (
                <p className="text-muted-foreground">
                  {formatSlotRange(selectedSlot, localTimezone)} in your timezone (
                  {localTimezone})
                </p>
              )}
            </div>

            {submitError && (
              <p className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {submitError}
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="demo-first-name">
                  Student First Name *
                </label>
                <Input
                  id="demo-first-name"
                  value={fields.first_name}
                  maxLength={60}
                  onChange={(e) => setFields((p) => ({ ...p, first_name: e.target.value }))}
                  onBlur={() => setTouched((p) => ({ ...p, first_name: true }))}
                  aria-invalid={!!fieldError("first_name")}
                />
                {fieldError("first_name") && (
                  <p className="mt-1 text-xs text-destructive">{fieldError("first_name")}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="demo-last-name">
                  Student Last Name
                </label>
                <Input
                  id="demo-last-name"
                  value={fields.last_name}
                  maxLength={60}
                  onChange={(e) => setFields((p) => ({ ...p, last_name: e.target.value }))}
                  onBlur={() => setTouched((p) => ({ ...p, last_name: true }))}
                />
                {fieldError("last_name") && (
                  <p className="mt-1 text-xs text-destructive">{fieldError("last_name")}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="demo-email">
                Email *
              </label>
              <Input
                id="demo-email"
                type="email"
                value={fields.email}
                maxLength={255}
                onChange={(e) => setFields((p) => ({ ...p, email: e.target.value }))}
                onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                aria-invalid={!!fieldError("email")}
              />
              {fieldError("email") && (
                <p className="mt-1 text-xs text-destructive">{fieldError("email")}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="demo-phone">
                Contact Number *
              </label>
              <div className="flex gap-2">
                <select
                  aria-label="Country code"
                  value={fields.country_code}
                  onChange={(e) =>
                    setFields((p) => ({
                      ...p,
                      country_code: e.target.value,
                      phone: digitsOnly(p.phone).slice(0, findCountry(e.target.value).max),
                    }))
                  }
                  className="h-10 rounded-md border border-input bg-background px-2 text-sm"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} +{c.dial}
                    </option>
                  ))}
                </select>
                <Input
                  id="demo-phone"
                  type="tel"
                  inputMode="numeric"
                  value={fields.phone}
                  placeholder={`${country.max} digits`}
                  onChange={(e) =>
                    setFields((p) => ({ ...p, phone: digitsOnly(e.target.value).slice(0, country.max) }))
                  }
                  onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                  aria-invalid={!!fieldError("phone")}
                />
              </div>
              {fieldError("phone") && (
                <p className="mt-1 text-xs text-destructive">{fieldError("phone")}</p>
              )}
            </div>

            {/* honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={fields.website}
              onChange={(e) => setFields((p) => ({ ...p, website: e.target.value }))}
              className="hidden"
              aria-hidden="true"
            />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStep("slots");
                  setSubmitError(null);
                }}
                disabled={submitting}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Change Time
              </Button>
              <Button type="submit" variant="hero" disabled={!canSubmit}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirming…
                  </>
                ) : (
                  "Confirm Free Demo"
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Step 3 — success */}
        {step === "success" && selectedSlot && (
          <div className="space-y-5 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
            <div className="rounded-xl border border-border bg-muted/40 p-5 text-left text-sm">
              <p className="font-display text-lg font-bold">{course.title}</p>
              <p className="mt-2">
                <span className="text-muted-foreground">When: </span>
                {groups.find((g) => g.date === selectedSlot.date)?.label || selectedSlot.date},{" "}
                {formatSlotRange(selectedSlot)} ({slotTimezone(selectedSlot)})
              </p>
              {shouldShowUserTime(selectedSlot) && (
                <p>
                  <span className="text-muted-foreground">Your time: </span>
                  {formatSlotRange(selectedSlot, localTimezone)} ({localTimezone})
                </p>
              )}
              <p>
                <span className="text-muted-foreground">Mentor: </span>
                {teacherName(selectedSlot)}
              </p>
              <p>
                <span className="text-muted-foreground">Student: </span>
                {fields.first_name} {fields.last_name}
              </p>
              <p>
                <span className="text-muted-foreground">Email: </span>
                {fields.email}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Our team will contact you shortly with the joining link. Questions? Call +1 (929)
              421-8055.
            </p>
            <Button variant="premium" className="w-full" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
