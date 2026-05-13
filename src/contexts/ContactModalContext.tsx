import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";

type Ctx = {
  open: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
};

const ContactModalContext = createContext<Ctx | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openContactModal = useCallback(() => setOpen(true), []);
  const closeContactModal = useCallback(() => setOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ open, openContactModal, closeContactModal }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-[95vw] max-h-[92vh] overflow-y-auto p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">Book Your Free Strategy Call</DialogTitle>
            <DialogDescription>
              A 30-minute, no-pressure conversation to map your child's personalized learning pathway.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <ContactForm compact onSuccess={closeContactModal} />
          </div>
        </DialogContent>
      </Dialog>
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used inside ContactModalProvider");
  return ctx;
}

interface CTAProps extends React.ComponentProps<typeof Button> {
  children: ReactNode;
}

/**
 * Drop-in CTA button — opens the global Contact modal on click.
 * Use anywhere we previously had <Button asChild><Link to="/contact">…</Link></Button>.
 */
export function ContactCTA({ children, onClick, ...props }: CTAProps) {
  const { openContactModal } = useContactModal();
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) openContactModal();
      }}
    >
      {children}
    </Button>
  );
}
