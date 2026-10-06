import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useRef } from "react";
import { renderToString } from 'react-dom/server';
import { VideoPlayer } from "./VideoPlayer";

const playback = vi.hoisted(() => ({
    state: { isPlaying: false, isMuted: false, volume: 1, progress: 10, duration: 100, currentTime: 10, isBuffering: false, isFullscreen: false, playbackRate: 1, isPip: false },
    controls: { togglePlay: vi.fn(), seek: vi.fn(), seekRelative: vi.fn(), setVolume: vi.fn(), toggleMute: vi.fn(), toggleFullscreen: vi.fn(), setPlaybackRate: vi.fn(), togglePip: vi.fn() },
}));
vi.mock("@/hooks/useVideoPlayer", () => ({ useVideoPlayer: () => ({ videoRef: useRef(null), containerRef: useRef(null), ...playback }) }));

describe("VideoPlayer accessible controls", () => {
    beforeEach(() => {
        Object.assign(playback.state, { isPlaying: false, isMuted: false, volume: 1, progress: 10, duration: 100, currentTime: 10, isBuffering: false, isFullscreen: false, playbackRate: 1, isPip: false });
        vi.clearAllMocks();
    });
    afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); Reflect.deleteProperty(document, 'pictureInPictureEnabled'); });
    it("opens speed choices by keyboard and returns focus on Escape", () => {
        render(<VideoPlayer src="/video.mp4" />);
        const trigger = screen.getByRole("button", { name: "Playback Speed" });
        fireEvent.keyDown(trigger, { key: "ArrowDown" });
        expect(screen.getByRole("button", { name: "1x" })).toHaveFocus();
        fireEvent.click(screen.getByRole("button", { name: "1.5x" }));
        expect(playback.controls.setPlaybackRate).toHaveBeenCalledWith(1.5);
        expect(trigger).toHaveFocus();
        fireEvent.click(trigger);
        fireEvent.keyDown(screen.getByRole("button", { name: "1x" }), { key: "Escape" });
        expect(trigger).toHaveAttribute("aria-expanded", "false");
        expect(trigger).toHaveFocus();
    });
    it("provides native seek and volume sliders without intercepting their arrow keys", () => {
        render(<VideoPlayer src="/video.mp4" />);
        const seek = screen.getByRole("slider", { name: "Seek video" });
        fireEvent.change(seek, { target: { value: "30" } });
        expect(playback.controls.seek).toHaveBeenCalledWith(30);
        const volume = screen.getByRole("slider", { name: "Volume" });
        volume.focus();
        fireEvent.keyDown(volume, { key: "ArrowRight", code: "ArrowRight" });
        expect(playback.controls.seekRelative).not.toHaveBeenCalled();
        fireEvent.change(volume, { target: { value: "0.5" } });
        expect(playback.controls.setVolume).toHaveBeenCalledWith(0.5);
    });
    it("makes faded controls inert and reveals them when the player gets focus", () => {
        playback.state.isPlaying = true;
        const { container } = render(<VideoPlayer src="/video.mp4" />);
        const player = screen.getByRole("region", { name: "Video Player" });
        fireEvent.mouseLeave(player);
        expect(container.querySelector("[data-video-controls]")).toHaveAttribute("inert");
        fireEvent.focus(player);
        expect(container.querySelector("[data-video-controls]")).not.toHaveAttribute("inert");
        expect(screen.getAllByRole("button", { name: "Pause" })).toHaveLength(1);
    });

    it("routes native video, center play, audio and transport buttons to the appropriate controls", () => {
        const { container, rerender } = render(<VideoPlayer src="/video.mp4" />);
        fireEvent.click(container.querySelector('video')!);
        expect(playback.controls.togglePlay).toHaveBeenCalledTimes(1);
        fireEvent.click(screen.getAllByRole('button', { name: 'Play' })[0]);
        expect(screen.getByRole('region', { name: 'Video Player' })).toHaveFocus();
        expect(playback.controls.togglePlay).toHaveBeenCalledTimes(2);
        fireEvent.click(screen.getByRole('button', { name: 'Mute' }));
        expect(playback.controls.toggleMute).toHaveBeenCalledTimes(1);
        fireEvent.click(screen.getByRole('button', { name: 'Rewind 10 seconds' }));
        fireEvent.click(screen.getByRole('button', { name: 'Forward 10 seconds' }));
        expect(playback.controls.seekRelative.mock.calls).toEqual([[-10], [10]]);
        fireEvent.click(screen.getByRole('button', { name: 'Enter Fullscreen' }));
        expect(playback.controls.toggleFullscreen).toHaveBeenCalledTimes(1);
        playback.state.isPlaying = true; playback.state.isMuted = true; playback.state.isFullscreen = true;
        rerender(<VideoPlayer src="/video.mp4" />);
        fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
        fireEvent.click(screen.getByRole('button', { name: 'Unmute' }));
        fireEvent.click(screen.getByRole('button', { name: 'Exit Fullscreen' }));
        expect(playback.controls.togglePlay).toHaveBeenCalledTimes(3);
        expect(playback.controls.toggleMute).toHaveBeenCalledTimes(2);
        expect(playback.controls.toggleFullscreen).toHaveBeenCalledTimes(2);
        expect(screen.getByRole('slider', { name: 'Volume' })).toHaveValue('0');
    });

    it("exposes picture-in-picture only on supporting browsers and reflects its exit action", () => {
        const view = render(<VideoPlayer src="/video.mp4" />);
        expect(screen.queryByRole('button', { name: 'Enter Picture-in-Picture' })).toBeNull();
        Object.defineProperty(document, 'pictureInPictureEnabled', { configurable: true, value: true });
        view.rerender(<VideoPlayer src="/video.mp4" />);
        fireEvent.click(screen.getByRole('button', { name: 'Enter Picture-in-Picture' }));
        playback.state.isPip = true;
        view.rerender(<VideoPlayer src="/video.mp4" />);
        fireEvent.click(screen.getByRole('button', { name: 'Exit Picture-in-Picture' }));
        expect(playback.controls.togglePip).toHaveBeenCalledTimes(2);
    });

    it.each([
        ['Space', 'togglePlay', undefined], ['ArrowLeft', 'seekRelative', -10], ['ArrowRight', 'seekRelative', 10],
        ['ArrowUp', 'setVolume', 1.1], ['ArrowDown', 'setVolume', 0.9], ['KeyM', 'toggleMute', undefined], ['KeyF', 'toggleFullscreen', undefined],
    ] as const)("handles %s on the focused player without global shortcut leakage", (code, control, argument) => {
        render(<VideoPlayer src="/video.mp4" />);
        const player = screen.getByRole('region', { name: 'Video Player' });
        fireEvent.keyDown(window, { code });
        expect(playback.controls[control]).not.toHaveBeenCalled();
        act(() => player.focus());
        fireEvent.keyDown(player, { code });
        if (argument === undefined) expect(playback.controls[control]).toHaveBeenCalledTimes(1);
        else expect(playback.controls[control]).toHaveBeenCalledWith(argument);
    });

    it("keeps native interactive elements in charge of keyboard events and permits unknown keys", () => {
        render(<VideoPlayer src="/video.mp4" />);
        const play = screen.getAllByRole('button', { name: 'Play' }).at(-1)!;
        act(() => play.focus());
        fireEvent.keyDown(play, { code: 'Space' });
        expect(playback.controls.togglePlay).not.toHaveBeenCalled();
        const player = screen.getByRole('region', { name: 'Video Player' });
        act(() => player.focus());
        const unknown = new KeyboardEvent('keydown', { code: 'KeyZ', bubbles: true, cancelable: true });
        act(() => player.dispatchEvent(unknown));
        expect(unknown.defaultPrevented).toBe(false);
        expect(Object.values(playback.controls).every(control => control.mock.calls.length === 0)).toBe(true);
    });

    it("allows fullscreen shortcuts while focus is elsewhere and removes handlers on unmount", () => {
        playback.state.isFullscreen = true;
        const remove = vi.spyOn(window, 'removeEventListener');
        const view = render(<VideoPlayer src="/video.mp4" />);
        fireEvent.keyDown(window, { code: 'Space' });
        expect(playback.controls.togglePlay).toHaveBeenCalledTimes(1);
        view.unmount();
        fireEvent.keyDown(window, { code: 'Space' });
        expect(playback.controls.togglePlay).toHaveBeenCalledTimes(1);
        expect(remove).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it("navigates all speed choices by keyboard and dismisses on outside pointer and focus changes", () => {
        render(<VideoPlayer src="/video.mp4" />);
        const trigger = screen.getByRole('button', { name: 'Playback Speed' });
        fireEvent.click(trigger);
        fireEvent.keyDown(screen.getByRole('button', { name: '1x' }), { key: 'End' });
        expect(screen.getByRole('button', { name: '2x' })).toHaveFocus();
        fireEvent.keyDown(screen.getByRole('button', { name: '2x' }), { key: 'ArrowDown' });
        expect(screen.getByRole('button', { name: '0.5x' })).toHaveFocus();
        fireEvent.keyDown(screen.getByRole('button', { name: '0.5x' }), { key: 'ArrowUp' });
        expect(screen.getByRole('button', { name: '2x' })).toHaveFocus();
        fireEvent.keyDown(screen.getByRole('button', { name: '2x' }), { key: 'Home' });
        expect(screen.getByRole('button', { name: '0.5x' })).toHaveFocus();
        fireEvent.keyDown(screen.getByRole('button', { name: '0.5x' }), { key: 'ArrowDown' });
        expect(screen.getByRole('button', { name: '1x' })).toHaveFocus();
        fireEvent.keyDown(screen.getByRole('button', { name: '1x' }), { key: 'ArrowUp' });
        expect(screen.getByRole('button', { name: '0.5x' })).toHaveFocus();
        fireEvent.keyDown(screen.getByRole('button', { name: '0.5x' }), { key: 'ArrowLeft' });
        expect(screen.getByRole('button', { name: '0.5x' })).toHaveFocus();
        fireEvent.pointerDown(screen.getByRole('button', { name: '1x' }));
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        fireEvent.pointerDown(document.body);
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(trigger);
        fireEvent.blur(trigger, { relatedTarget: screen.getByRole('button', { name: '1.25x' }) });
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        fireEvent.blur(screen.getByRole('button', { name: '1.25x' }), { relatedTarget: document.body });
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it("retains focused controls, hides them only after idle playback, and clears its idle timer", () => {
        vi.useFakeTimers(); playback.state.isPlaying = true;
        const view = render(<VideoPlayer src="/video.mp4" />);
        const player = screen.getByRole('region', { name: 'Video Player' });
        const controls = view.container.querySelector('[data-video-controls]')!;
        fireEvent.mouseMove(player);
        act(() => vi.advanceTimersByTime(2900));
        expect(controls).not.toHaveAttribute('inert');
        act(() => player.focus());
        fireEvent.mouseMove(player);
        act(() => vi.advanceTimersByTime(4000));
        expect(controls).not.toHaveAttribute('inert');
        act(() => player.blur());
        fireEvent.mouseMove(player);
        act(() => vi.advanceTimersByTime(3000));
        expect(controls).toHaveAttribute('inert');
        fireEvent.pointerDown(player);
        expect(controls).not.toHaveAttribute('inert');
        fireEvent.mouseMove(player); fireEvent.mouseMove(player);
        expect(vi.getTimerCount()).toBe(1);
        view.unmount(); expect(vi.getTimerCount()).toBe(0);
    });

    it("shows buffering without a false play overlay and disables seeking while duration is unavailable", () => {
        playback.state.isBuffering = true; playback.state.duration = Number.POSITIVE_INFINITY; playback.state.currentTime = Number.NaN;
        const view = render(<VideoPlayer src="/video.mp4" />);
        expect(view.container.querySelector('.animate-spin')).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: 'Play' })).toHaveLength(1);
        expect(screen.getByRole('slider', { name: 'Seek video' })).toBeDisabled();
        expect(screen.getByRole('slider', { name: 'Seek video' })).toHaveValue('0');
        expect(screen.getByRole('slider', { name: 'Seek video' })).toHaveAttribute('aria-valuetext', '0:00 of 0:00');
        playback.state.duration = 100; playback.state.currentTime = 150; playback.state.volume = 0;
        view.rerender(<VideoPlayer src="/video.mp4" />);
        expect(screen.getByRole('slider', { name: 'Seek video' })).toHaveValue('100');
        expect(view.container.querySelector('.lucide-volume-x')).toBeInTheDocument();
    });

    it.each([
        [null, 'Unknown media error'], [{ code: 1 }, 'Media playback was aborted.'], [{ code: 2 }, 'A network error interrupted media playback.'],
        [{ code: 3 }, 'The video could not be decoded by the browser.'], [{ code: 4 }, 'The video source format is not supported by the browser.'],
        [{ code: 99, message: 'Synthetic browser diagnostic' }, 'Synthetic browser diagnostic'], [{ code: 99 }, 'Unknown media error'],
    ])("records the native error diagnostic without replacing the player (%j)", (error, message) => {
        vi.stubGlobal('MediaError', { MEDIA_ERR_ABORTED: 1, MEDIA_ERR_NETWORK: 2, MEDIA_ERR_DECODE: 3, MEDIA_ERR_SRC_NOT_SUPPORTED: 4 });
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const view = render(<VideoPlayer src="/video.mp4" />);
        const video = view.container.querySelector('video')!;
        Object.defineProperty(video, 'error', { configurable: true, value: error });
        fireEvent.error(video);
        expect(warn).toHaveBeenCalledWith('Video element error:', expect.objectContaining({ message }));
        expect(video).toBeInTheDocument();
    });

    it("does not render a player without a source", () => {
        render(<VideoPlayer src="" />);
        expect(screen.queryByRole('region', { name: 'Video Player' })).toBeNull();
    });
    it("keeps browser-only picture-in-picture out of server markup while preserving playback controls", () => {
        Object.defineProperty(document, 'pictureInPictureEnabled', { configurable: true, value: true });
        const html = renderToString(<VideoPlayer src="/video.mp4" />);
        expect(html).toContain('aria-label="Seek video"');
        expect(html).toContain('aria-label="Play"');
        expect(html).not.toContain('Picture-in-Picture');
    });
});
