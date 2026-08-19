import {
  chargesText,
  formatMoney,
  isFreeCourse,
  normalizeCharges,
  planLabel,
  pricingSummary,
} from "@/lib/courseUtils";
import type { Course } from "@/services/courseService";

/** Compact one-line pricing for cards and hero areas. */
export function CoursePricingSummary({ course }: { course: Course }) {
  return <span>{pricingSummary(course)}</span>;
}

/** Full pricing plan table for the course details page. */
export function CoursePricingPlans({ course }: { course: Course }) {
  const plans = normalizeCharges(course.charges);
  const text = chargesText(course.charges);

  if (!plans.length) {
    if (isFreeCourse(course)) {
      return (
        <p className="text-muted-foreground">
          This course is free to start — book a free demo class to begin.
        </p>
      );
    }
    return (
      <p className="text-muted-foreground">
        {text ? `Course fee: ${text}` : "Pricing shared during your free demo class."}
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan, index) => {
        const total = formatMoney(plan.total_charge);
        const perClass = formatMoney(plan.price_per_class);
        return (
          <div
            key={`${plan.total_charge ?? "plan"}-${index}`}
            className="rounded-xl border border-border bg-card p-6 shadow-premium"
          >
            <p className="text-sm font-medium text-muted-foreground">{planLabel(plan, index)}</p>
            <p className="mt-2 text-3xl font-display font-bold">{total ?? perClass ?? "—"}</p>
            {total && perClass && (
              <p className="mt-1 text-sm text-muted-foreground">{perClass} per class</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
