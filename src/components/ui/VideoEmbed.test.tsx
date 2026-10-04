import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import type { ComponentPropsWithoutRef } from "react";
import VideoEmbed from "./VideoEmbed";

vi.mock("next/image", () => ({ default: ({ fill, ...props }: ComponentPropsWithoutRef<"img"> & { fill?: boolean }) => <img {...props} /> }));
vi.mock("./VideoPlayer", () => ({ VideoPlayer: ({ autoPlay }: { autoPlay: boolean }) => <div role="region" aria-label="Video Player" tabIndex={0} data-playing={autoPlay} /> }));

it("activates a native poster using Space and transfers focus into the player", async () => {
    render(<VideoEmbed videoUrl="/video.mp4" posterImage="/poster.jpg" />);
    const user = userEvent.setup();
    screen.getByRole("button", { name: "Play video" }).focus();
    await user.keyboard(" ");
    expect(screen.queryByRole("button", { name: "Play video" })).toBeNull();
    expect(screen.getByRole("region", { name: "Video Player" })).toHaveAttribute("data-playing", "true");
    expect(screen.getByRole("region", { name: "Video Player" })).toHaveFocus();
});

it("names the external player iframe", () => {
    render(<VideoEmbed videoUrl="https://www.youtube.com/watch?v=sample" />);
    expect(screen.getByTitle("Video player")).toHaveAttribute("src", "https://www.youtube.com/embed/sample?autoplay=1&rel=0");
});
