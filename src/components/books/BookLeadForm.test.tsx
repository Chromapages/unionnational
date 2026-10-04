import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const submit = vi.hoisted(() => vi.fn());
vi.mock("next-intl", () => ({ useLocale: () => "es" }));
vi.mock("@/lib/ghl/submit-lead", () => ({ submitGhlLead: submit }));

import { BookLeadForm } from "./BookLeadForm";

function fill() {
  fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "Ava" } });
  fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Rivera" } });
  fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "ava@example.test" } });
}

describe("book lead identity", () => {
  beforeEach(() => submit.mockReset().mockResolvedValue({ success: true }));

  it("preserves book, locale and service lane through the canonical payload", async () => {
    render(<BookLeadForm bookSlug="tax-playbook" leadMagnetTag="book-tax" serviceLane="tax-planning" />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Request a Copy" }));
    await waitFor(() => expect(submit).toHaveBeenCalledTimes(1));
    const payload = submit.mock.calls[0][0];
    expect(payload.contact.tags).toEqual(["book-tax"]);
    expect(payload.intent.primary_service_interest).toBe("TAX_PLANNING");
    expect(payload.answers.service_lane).toBe("tax-planning");
    expect(payload.meta).toMatchObject({ locale: "es", source_page: "/books/tax-playbook", book_slug: "tax-playbook" });
    expect(payload.meta.submission_id).toEqual(expect.any(String));
    expect(await screen.findByText("Request Received")).toBeInTheDocument();
  });

  it("keeps the form retryable after failed delivery", async () => {
    submit.mockResolvedValue({ success: false, message: "Please retry" });
    render(<BookLeadForm bookSlug="tax-playbook" />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Request a Copy" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Please retry");
    expect(screen.getByRole("button", { name: "Retry Request" })).toBeEnabled();
  });
});
