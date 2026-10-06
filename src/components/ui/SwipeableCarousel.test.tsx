import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CardCarousel, SwipeableCarousel } from "./SwipeableCarousel";

type CarouselApi = {
  scrollPrev: ReturnType<typeof vi.fn>; scrollNext: ReturnType<typeof vi.fn>; scrollTo: ReturnType<typeof vi.fn>;
  selectedScrollSnap: () => number; scrollSnapList: () => number[]; canScrollPrev: () => boolean; canScrollNext: () => boolean;
  on: (event: string, handler: () => void) => void; off: ReturnType<typeof vi.fn>;
};
const fixture = vi.hoisted(() => ({ api: null as CarouselApi | null, index: 0, count: 3, listeners: new Map<string, Set<() => void>>(), ref: vi.fn() }));
vi.mock("embla-carousel-react", () => ({ default: () => [fixture.ref, fixture.api] }));
vi.mock("framer-motion", () => ({ motion: { button: ({ children, whileTap, ...props }: React.ComponentPropsWithoutRef<"button"> & { whileTap?: unknown }) => { void whileTap; return <button {...props}>{children}</button>; } } }));

function emit(event: "select" | "reInit") { fixture.listeners.get(event)?.forEach(handler => handler()); }
const slides = (count = 3) => Array.from({ length: count }, (_, index) => <p key={index}>Service {index + 1}</p>);

beforeEach(() => {
  fixture.index = 0; fixture.count = 3; fixture.listeners.clear(); fixture.ref.mockReset();
  fixture.api = {
    scrollPrev: vi.fn(() => { fixture.index = Math.max(0, fixture.index - 1); emit("select"); }),
    scrollNext: vi.fn(() => { fixture.index = Math.min(fixture.count - 1, fixture.index + 1); emit("select"); }),
    scrollTo: vi.fn((index: number) => { fixture.index = Math.max(0, Math.min(fixture.count - 1, index)); emit("select"); }),
    selectedScrollSnap: () => fixture.index, scrollSnapList: () => Array.from({ length: fixture.count }, (_, index) => index),
    canScrollPrev: () => fixture.index > 0, canScrollNext: () => fixture.index < fixture.count - 1,
    on: (event, handler) => { const listeners = fixture.listeners.get(event) || new Set(); listeners.add(handler); fixture.listeners.set(event, listeners); },
    off: vi.fn((event: string, handler: () => void) => { fixture.listeners.get(event)?.delete(handler); }),
  };
});
afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("carousel controls and selected-slide integration", () => {
  it("announces labeled slides and supports keyboard buttons without crossing non-loop boundaries", async () => {
    const user = userEvent.setup();
    render(<SwipeableCarousel ariaLabel="Services" slideLabels={["Tax", "Books", "CFO"]} showProgress>{slides()}</SwipeableCarousel>);
    expect(screen.getByRole("region", { name: "Services" })).toHaveAttribute("aria-roledescription", "carousel");
    expect(screen.getByLabelText("1 of 3: Tax")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: "Next slide" })).toBeEnabled());
    const previous = screen.getByRole("button", { name: "Previous slide" });
    expect(previous).toBeDisabled();
    const next = screen.getByRole("button", { name: "Next slide" });
    next.focus(); await user.keyboard("{Enter}");
    expect(screen.getByText("2 of 3")).toBeInTheDocument();
    expect(previous).toBeEnabled();
    await user.keyboard("{Enter}");
    expect(screen.getByText("3 of 3")).toBeInTheDocument();
    expect(next).toBeDisabled();
    await user.click(next);
    expect(fixture.api!.scrollNext).toHaveBeenCalledTimes(2);
    previous.focus(); await user.keyboard(" ");
    expect(screen.getByText("2 of 3")).toBeInTheDocument();
  });

  it("supports direct dot selection and updates the current indicator when Embla reports a drag selection", async () => {
    const user = userEvent.setup();
    render(<SwipeableCarousel showProgress>{slides()}</SwipeableCarousel>);
    const second = await screen.findByRole("button", { name: "Go to service 2" });
    await user.click(second);
    expect(fixture.api!.scrollTo).toHaveBeenCalledWith(1);
    expect(second).toHaveAttribute("aria-current", "true");
    act(() => { fixture.index = 2; emit("select"); });
    expect(screen.getByRole("button", { name: "Go to service 3" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByText("3 of 3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeDisabled();
  });

  it("refreshes navigation and progress after live content changes the number of snaps", async () => {
    const { rerender } = render(<SwipeableCarousel showProgress>{slides()}</SwipeableCarousel>);
    await screen.findByRole("button", { name: "Go to service 3" });
    fixture.count = 4;
    rerender(<SwipeableCarousel showProgress>{slides(4)}</SwipeableCarousel>);
    act(() => { fixture.index = 3; emit("reInit"); });
    expect(screen.getByRole("button", { name: "Go to service 4" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByText("4 of 4")).toBeInTheDocument();
    fixture.count = 1;
    rerender(<SwipeableCarousel showProgress>{slides(1)}</SwipeableCarousel>);
    act(() => { fixture.index = 0; emit("reInit"); });
    expect(screen.queryByRole("button", { name: /Go to service/ })).toBeNull();
    expect(screen.queryByText("4 of 4")).toBeNull();
  });

  it("handles an empty carousel and hides unrequested controls without losing slide content", () => {
    const { rerender } = render(<SwipeableCarousel>{[]}</SwipeableCarousel>);
    expect(screen.queryByRole("region")).toBeNull();
    rerender(<SwipeableCarousel showArrows={false} showDots={false} showSwipeHint={false}>{slides(1)}</SwipeableCarousel>);
    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByText("Swipe")).toBeNull();
  });

  it("tolerates a user activating loop controls before Embla is ready", async () => {
    fixture.api = null;
    const user = userEvent.setup();
    render(<SwipeableCarousel loop>{slides()}</SwipeableCarousel>);
    await user.click(screen.getByRole("button", { name: "Next slide" }));
    await user.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(screen.getByText("Service 1")).toBeInTheDocument();
  });

  it("stops non-loop autoplay at the end and removes timers/listeners after unmount", async () => {
    vi.useFakeTimers();
    const { unmount } = render(<SwipeableCarousel autoplay autoplayDelay={1000} showProgress>{slides()}</SwipeableCarousel>);
    await act(async () => { await vi.advanceTimersByTimeAsync(3010); });
    expect(screen.getByText("3 of 3")).toBeInTheDocument();
    expect(fixture.api!.scrollNext).toHaveBeenCalledTimes(2);
    unmount();
    await act(async () => { await vi.advanceTimersByTimeAsync(5000); });
    expect(fixture.api!.scrollNext).toHaveBeenCalledTimes(2);
    expect(fixture.listeners.get("select")?.size).toBe(0);
    expect(fixture.listeners.get("reInit")?.size).toBe(0);
  });

  it("returns requested looping autoplay to the first snap when the provider reaches its end", async () => {
    vi.useFakeTimers(); fixture.index = 2;
    render(<SwipeableCarousel loop autoplay autoplayDelay={1000} showProgress>{slides()}</SwipeableCarousel>);
    await act(async () => { await vi.advanceTimersByTimeAsync(1010); });
    expect(fixture.api!.scrollTo).toHaveBeenCalledWith(0);
    expect(screen.getByText("1 of 3")).toBeInTheDocument();
  });

  it("renders fixed-width mobile cards and moves their visible selection indicator on provider selection", () => {
    const { container, unmount } = render(<CardCarousel cardWidth={260} items={[{ id: "tax", content: <a href="#tax">Tax card</a> }, { id: "books", content: <a href="#books">Books card</a> }]} />);
    expect(screen.getByRole("link", { name: "Tax card" }).parentElement).toHaveStyle({ width: "260px" });
    const indicators = container.querySelectorAll(".rounded-full");
    expect(indicators[0]).toHaveClass("bg-gold-500");
    act(() => { fixture.index = 1; emit("select"); });
    expect(indicators[1]).toHaveClass("bg-gold-500");
    expect(indicators[0]).not.toHaveClass("bg-gold-500");
    unmount();
    expect(fixture.listeners.get("select")?.size).toBe(0);
  });
});
