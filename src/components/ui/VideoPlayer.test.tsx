import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRef } from "react";
import { VideoPlayer } from "./VideoPlayer";

const playback = vi.hoisted(() => ({
    state: { isPlaying: false, isMuted: false, volume: 1, progress: 10, duration: 100, currentTime: 10, isBuffering: false, isFullscreen: false, playbackRate: 1, isPip: false },
    controls: { togglePlay: vi.fn(), seek: vi.fn(), seekRelative: vi.fn(), setVolume: vi.fn(), toggleMute: vi.fn(), toggleFullscreen: vi.fn(), setPlaybackRate: vi.fn(), togglePip: vi.fn() },
}));
vi.mock("@/hooks/useVideoPlayer", () => ({ useVideoPlayer: () => ({ videoRef: useRef(null), containerRef: useRef(null), ...playback }) }));

describe("VideoPlayer accessible controls", () => {
    beforeEach(() => { playback.state.isPlaying = false; vi.clearAllMocks(); });
    it("opens speed choices by keyboard and returns focus on Escape", () => {
        render(<VideoPlayer src="/video.mp4" />);
        const trigger = screen.getByRole("button", { name: "Playback Speed" });
        fireEvent.keyDown(trigger, { key: "ArrowDown" });
        expect(screen.getByRole("button", { name: "1x", exact: true })).toHaveFocus();
        fireEvent.click(screen.getByRole("button", { name: "1.5x", exact: true }));
        expect(playback.controls.setPlaybackRate).toHaveBeenCalledWith(1.5);
        expect(trigger).toHaveFocus();
        fireEvent.click(trigger);
        fireEvent.keyDown(screen.getByRole("button", { name: "1x", exact: true }), { key: "Escape" });
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
        expect(screen.getAllByRole("button", { name: "Pause", exact: true })).toHaveLength(1);
    });
});
