import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import { GatedDownload } from "./GatedDownload";
import { ContactCTA, ContactModalProvider } from "@/contexts/ContactModalContext";

vi.mock("axios", () => ({ default: { post: vi.fn() } }));

function Location() {
  return <output data-testid="location">{useLocation().pathname}</output>;
}

function setup() {
  render(<MemoryRouter><ContactModalProvider>
    <GatedDownload href="/downloads/test.pdf" download>Get worksheet</GatedDownload>
    <GatedDownload href="https://example.com/brochure.pdf" target="_blank">Get brochure</GatedDownload>
    <ContactCTA>Strategy call</ContactCTA>
    <Location />
  </ContactModalProvider></MemoryRouter>);
}

function fillForm() {
  fireEvent.change(screen.getByPlaceholderText("Parent/Guardian Name *"), { target: { value: "Test Parent" } });
  fireEvent.change(screen.getByPlaceholderText("Email Address *"), { target: { value: "parent@example.com" } });
  fireEvent.change(screen.getByPlaceholderText("Child's Age *"), { target: { value: "10" } });
}

describe("gated downloads", () => {
  let opened: { href: string; download: boolean; target: string }[];
  beforeEach(() => {
    sessionStorage.clear();
    opened = [];
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      opened.push({ href: this.getAttribute("href")!, download: this.hasAttribute("download"), target: this.target });
    });
  });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.mocked(axios.post).mockReset(); });

  it("waits for server success before downloading and requires a fresh form next time", async () => {
    let resolve!: (value: unknown) => void;
    vi.mocked(axios.post).mockReturnValue(new Promise((done) => { resolve = done; }));
    setup();
    fireEvent.click(screen.getByText("Get worksheet"));
    expect(screen.getByRole("button", { name: "Book Your Free Strategy Call" })).toBeDisabled();
    expect(opened).toHaveLength(0);
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Book Your Free Strategy Call" }));
    expect(opened).toHaveLength(0);
    resolve({ data: {} });
    await screen.findByText("Thank you! Your file is ready");
    expect(opened).toEqual([{ href: "/downloads/test.pdf", download: true, target: "" }]);
    expect(screen.getByRole("link", { name: "Download file" })).toHaveAttribute("download");
    expect(screen.getByTestId("location")).toHaveTextContent("/");
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    fireEvent.click(screen.getByText("Get worksheet"));
    expect(screen.getByPlaceholderText("Email Address *")).toHaveValue("");
    expect(screen.queryByRole("link", { name: "Download file" })).toBeNull();
  });

  it("keeps failed submissions gated and opens the brochure after retry succeeds", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(axios.post).mockRejectedValueOnce(new Error("Network failure")).mockResolvedValueOnce({ data: {} });
    setup();
    fireEvent.click(screen.getByText("Get brochure"));
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Book Your Free Strategy Call" }));
    await screen.findByText(/Something went wrong while submitting/);
    expect(opened).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Book Your Free Strategy Call" }));
    await screen.findByText("Thank you! Your file is ready");
    expect(opened).toEqual([{ href: "https://example.com/brochure.pdf", download: false, target: "_blank" }]);
  });

  it("does not release a cancelled file when a regular strategy call is submitted", async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: {} });
    setup();
    fireEvent.click(screen.getByText("Get worksheet"));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    fireEvent.click(screen.getByText("Strategy call"));
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Book Your Free Strategy Call" }));
    await waitFor(() => expect(screen.getByTestId("location").textContent).toMatch(/^\/thank-you\//));
    expect(opened).toHaveLength(0);
  });
});
