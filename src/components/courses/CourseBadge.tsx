import { isFreeCourse } from "@/lib/courseUtils";
import type { Course } from "@/services/courseService";
import { cn } from "@/lib/utils";

interface Props {
  course: Course;
  className?: string;
}

export function CourseBadge({ course, className }: Props) {
  const free = isFreeCourse(course);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        free
          ? "bg-primary text-primary-foreground"
          : "bg-foreground text-background",
        className,
      )}
    >
      {free ? "Free" : "Paid"}
    </span>
  );
}
