import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HeroVideoPlayer } from "./HeroVideoPlayer";

describe("HeroVideoPlayer", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
        Reflect.deleteProperty(navigator, "connection");
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
        expect(video.controls).toBe(true);
        expect(playSpy).toHaveBeenCalled();
        expect(screen.getByRole("button", { name: /Click for Sound/i })).toBeVisible();
    });

    it("unmutes with the sound shortcut and keeps native controls available", () => {
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
        expect(video.controls).toBe(true);

        fireEvent.click(screen.getByRole("button", { name: /Click for Sound/i }));

        expect(video.muted).toBe(false);
        expect(video.controls).toBe(true);
        expect(playSpy).toHaveBeenCalled();

        video.muted = true;
        fireEvent.volumeChange(video);
        expect(screen.getByRole("button", { name: /Click for Sound/i })).toBeVisible();
    });

    it("reports initial playback even when the native play event was missed", async () => {
        vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
        const onPlay = vi.fn();
        render(<HeroVideoPlayer src="/hero.mp4" ariaLabel="Overview" unavailableMessage="Unavailable" onPlay={onPlay} />);
        await waitFor(() => expect(onPlay).toHaveBeenCalledTimes(1));
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
        expect(screen.getByRole("button", { name: "Retry video" })).toBeVisible();
    });

    it("does not autoplay when reduced motion or reduced data is requested", () => {
        const playSpy = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
        vi.stubGlobal("matchMedia", () => ({ matches: true }));
        const { container, unmount } = render(
            <HeroVideoPlayer src="/hero.mp4" ariaLabel="Overview" unavailableMessage="Unavailable" />,
        );
        expect(playSpy).not.toHaveBeenCalled();
        expect(container.querySelector("video")).toHaveAttribute("preload", "none");
        unmount();

        vi.stubGlobal("matchMedia", () => ({ matches: false }));
        Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData: true } });
        render(<HeroVideoPlayer src="/hero.mp4" ariaLabel="Overview" unavailableMessage="Unavailable" />);
        expect(playSpy).not.toHaveBeenCalled();
        Reflect.deleteProperty(navigator, "connection");
    });

    it("lets a visitor retry a failed video", () => {
        const playSpy = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
        const { container } = render(
            <HeroVideoPlayer src="/hero.mp4" ariaLabel="Overview" unavailableMessage="Unavailable" />,
        );
        fireEvent.error(container.querySelector("video") as HTMLVideoElement);
        fireEvent.click(screen.getByRole("button", { name: "Retry video" }));
        expect(container.querySelector("video")).toBeInTheDocument();
        expect(playSpy).toHaveBeenCalledTimes(2);
    });

    it("keeps native controls usable after autoplay is denied and recovers a later media failure", async () => {
        const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockRejectedValue(new Error('Synthetic autoplay denied'));
        const view = render(<HeroVideoPlayer src="/hero.mp4" ariaLabel="Overview" unavailableMessage="Unavailable" />);
        await act(async () => {});
        const video = view.container.querySelector('video')!;
        expect(video.controls).toBe(true);
        expect(screen.queryByRole('status')).toBeNull();
        Object.defineProperty(video, 'error', { configurable: true, value: { code: 2 } });
        fireEvent.click(screen.getByRole('button', { name: 'Click for Sound' }));
        await act(async () => {});
        expect(screen.getByRole('status')).toHaveTextContent('Unavailable');
        play.mockResolvedValue(undefined);
        fireEvent.click(screen.getByRole('button', { name: 'Retry video' }));
        await act(async () => {});
        expect(view.container.querySelector('video')).toBeInTheDocument();
        expect(screen.queryByRole('status')).toBeNull();
    });

    it("does not restart already playing media when enabling sound and carries native captions", () => {
        const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
        const view = render(<HeroVideoPlayer src="/hero.mp4" captionsSrc="/overview-es.vtt" captionsLang="es" captionsLabel="Español" ariaLabel="Overview" unavailableMessage="Unavailable" />);
        const video = view.container.querySelector('video')!;
        Object.defineProperty(video, 'paused', { configurable: true, value: false });
        fireEvent.click(screen.getByRole('button', { name: 'Click for Sound' }));
        expect(video.muted).toBe(false);
        expect(play).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole('button', { name: 'Click for Sound' })).toBeNull();
        expect(view.container.querySelector('track')).toHaveAttribute('src', '/overview-es.vtt');
        expect(view.container.querySelector('track')).toHaveAttribute('srclang', 'es');
        expect(view.container.querySelector('track')).toHaveAttribute('label', 'Español');
    });

    it.each(['reduced-motion', 'save-data'] as const)('permits a deliberate retry despite the %s autoplay preference', async preference => {
        const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
        vi.stubGlobal('matchMedia', () => ({ matches: preference === 'reduced-motion' }));
        if (preference === 'save-data') Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: true } });
        const view = render(<HeroVideoPlayer src="/hero.mp4" ariaLabel="Overview" unavailableMessage="Unavailable" />);
        expect(play).not.toHaveBeenCalled();
        fireEvent.error(view.container.querySelector('video')!);
        fireEvent.click(screen.getByRole('button', { name: 'Retry video' }));
        await act(async () => {});
        expect(play).toHaveBeenCalledTimes(1);
        expect(view.container.querySelector('video')).toHaveAttribute('controls');
        Reflect.deleteProperty(navigator, 'connection');
    });
});
