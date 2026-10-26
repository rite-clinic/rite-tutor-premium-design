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
import { trackMarketingEvent } from "@/lib/analytics";

export type DownloadRequest = { href: string; download?: boolean; target?: string };

type Ctx = {
  open: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
  requestDownload: (file: DownloadRequest) => void;
};

const ContactModalContext = createContext<Ctx | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<DownloadRequest | null>(null);
  const [ready, setReady] = useState(false);

  const openContactModal = useCallback(() => {
    trackMarketingEvent("consultation_click");
    setFile(null);
    setReady(false);
    setOpen(true);
  }, []);
  const closeContactModal = useCallback(() => setOpen(false), []);
  const requestDownload = useCallback((requested: DownloadRequest) => {
    setFile(requested);
    setReady(false);
    setOpen(true);
  }, []);

  const handleSuccess = () => {
    if (!file) {
      closeContactModal();
      return;
    }
    setReady(true);
    const link = document.createElement("a");
    link.href = file.href;
    if (file.download) link.download = "";
    if (file.target) link.target = file.target;
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
    trackMarketingEvent("resource_download", { resource: file.href.split("/").pop() });
  };

  return (
    <ContactModalContext.Provider value={{ open, openContactModal, closeContactModal, requestDownload }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-[95vw] max-h-[92vh] overflow-y-auto p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">{ready ? "Thank you! Your file is ready" : "Request Your Free Consultation"}</DialogTitle>
            <DialogDescription>
              {ready
                ? "Your request has been submitted. Our team will contact you to arrange your free strategy call."
                : file
                  ? "Fill out the form below to request a free consultation. Your file will download or open after successful submission."
                  : "Send an enquiry and our team will contact you to arrange a conversation. This does not confirm an appointment."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {ready && file ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">If your file did not open automatically, use the button below.</p>
                <Button asChild variant="hero" className="w-full">
                  <a href={file.href} download={file.download || undefined} target={file.target} rel="noopener noreferrer">
                    {file.download ? "Download file" : "Open file"}
                  </a>
                </Button>
              </div>
            ) : <ContactForm compact onSuccess={handleSuccess} redirectOnSuccess={!file} />}
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
