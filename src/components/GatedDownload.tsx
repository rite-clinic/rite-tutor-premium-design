import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useContactModal, type DownloadRequest } from "@/contexts/ContactModalContext";

type Props = ComponentPropsWithoutRef<"button"> & DownloadRequest;

/** All file CTAs request a fresh successful strategy-call submission. */
export const GatedDownload = forwardRef<HTMLButtonElement, Props>(
  ({ href, download, target, onClick, ...props }, ref) => {
    const { requestDownload } = useContactModal();
    return <button {...props} ref={ref} type="button" onClick={(event) => {
      onClick?.(event);
      if (!event.defaultPrevented) requestDownload({ href, download, target });
    }} />;
  },
);
GatedDownload.displayName = "GatedDownload";
