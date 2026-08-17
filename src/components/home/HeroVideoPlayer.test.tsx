import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HeroVideoPlayer } from "./HeroVideoPlayer";

describe("HeroVideoPlayer", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("renders the poster-first video without attempting playback on mount or canplay", () => {
        const playSpy = vi
            .spyOn(HTMLMediaElement.prototype, "play")
            .mockImplementation(() => Promise.resolve());

        const { container } = render(
            <HeroVideoPlayer
                src="/hero.mp4"
                poster="/hero.jpg"
                ariaLabel="Watch how Union National works"
                unavailableMessage="Video unavailable"
            />,
        );

        const video = container.querySelector("video") as HTMLVideoElement;
        expect(video).toHaveAttribute("poster", "/hero.jpg");
        expect(video).toHaveAttribute("preload", "metadata");
        expect(playSpy).not.toHaveBeenCalled();

        fireEvent.canPlay(video);

        expect(playSpy).not.toHaveBeenCalled();
        expect(screen.getByRole("button", { name: "Watch how Union National works" })).toBeVisible();
    });

    it("preserves the accessible video configuration", () => {
        const { container } = render(
            <HeroVideoPlayer
                src="/hero.mp4"
                poster="/hero.jpg"
                ariaLabel="Watch how Union National works"
                unavailableMessage="Video unavailable"
            />,
        );

        const video = container.querySelector("video") as HTMLVideoElement;
        expect(video.controls).toBe(false);
        expect(video.muted).toBe(true);
        expect(video.playsInline).toBe(true);
        expect(video).toHaveAttribute("preload", "metadata");

        fireEvent.play(video);
        expect(video.controls).toBe(true);
    });

    it("reports play only once per mounted player session", () => {
        const onPlay = vi.fn();

        const { container, rerender } = render(
            <HeroVideoPlayer
                src="/hero.mp4"
                poster="/hero.jpg"
                ariaLabel="Watch how Union National works"
                unavailableMessage="Video unavailable"
                onPlay={onPlay}
            />,
        );

        const video = container.querySelector("video") as HTMLVideoElement;

        fireEvent.play(video);

        rerender(
            <HeroVideoPlayer
                src="/hero-updated.mp4"
                poster="/hero.jpg"
                ariaLabel="Watch how Union National works"
                unavailableMessage="Video unavailable"
                onPlay={onPlay}
            />,
        );

        fireEvent.play(container.querySelector("video") as HTMLVideoElement);

        expect(onPlay).toHaveBeenCalledTimes(1);
    });

    it("starts playback from the keyboard-operable poster control", () => {
        const playSpy = vi
            .spyOn(HTMLMediaElement.prototype, "play")
            .mockImplementation(() => Promise.resolve());

        render(
            <HeroVideoPlayer
                src="/hero.mp4"
                poster="/hero.jpg"
                ariaLabel="Watch how Union National works"
                unavailableMessage="Video unavailable"
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: "Watch how Union National works" }));

        expect(playSpy).toHaveBeenCalledTimes(1);
    });

    it("shows the fallback status when the media errors", () => {
        const { container } = render(
            <HeroVideoPlayer
                src="/hero.mp4"
                poster="/hero.jpg"
                ariaLabel="Watch how Union National works"
                unavailableMessage="Video unavailable"
            />,
        );

        fireEvent.error(container.querySelector("video") as HTMLVideoElement);

        expect(screen.getByRole("status")).toHaveTextContent("Video unavailable");
        expect(container.querySelector("video")).not.toBeInTheDocument();
    });
});
