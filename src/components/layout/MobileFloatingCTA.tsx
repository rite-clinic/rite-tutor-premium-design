import { Phone } from "lucide-react";
import { ContactCTA } from "@/contexts/ContactModalContext";

export function MobileFloatingCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-card/95 backdrop-blur-md border-t border-border p-4 shadow-premium">
      <ContactCTA variant="hero" size="lg" className="w-full">
        <Phone className="w-5 h-5" />
        Book Free Strategy Call
      </ContactCTA>
    </div>
  );
}
