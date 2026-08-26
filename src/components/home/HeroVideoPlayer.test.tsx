import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HeroVideoPlayer } from "./HeroVideoPlayer";

describe("HeroVideoPlayer", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("renders the video configured for muted autoplay", () => {
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
        expect(video.muted).toBe(true);
        expect(video.loop).toBe(true);
        expect(video.playsInline).toBe(true);
        expect(playSpy).toHaveBeenCalled();
        expect(screen.getByRole("button", { name: /Click for Sound/i })).toBeVisible();
    });

    it("unmutes and displays controls when clicking the sound toggle button", () => {
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
        expect(video.muted).toBe(true);
        expect(video.controls).toBe(false);

        fireEvent.click(screen.getByRole("button", { name: /Click for Sound/i }));

        expect(video.muted).toBe(false);
        expect(video.controls).toBe(true);
        expect(playSpy).toHaveBeenCalled();
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
