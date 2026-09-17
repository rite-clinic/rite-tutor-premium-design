import { Phone } from "lucide-react";
import { ContactCTA } from "@/contexts/ContactModalContext";

export function StickyStrategyCTA() {
  return (
    <ContactCTA
      className="fixed right-0 top-1/2 z-40 hidden h-auto -translate-y-1/2 gap-3 rounded-r-none rounded-l-xl px-3 py-6 font-semibold shadow-lg lg:inline-flex [writing-mode:vertical-rl]"
    >
      <Phone aria-hidden="true" className="h-4 w-4" />
      Book a Free Strategy Call
    </ContactCTA>
  );
}
