import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StrictMode } from "react";
import { useVideoPlayer } from "./useVideoPlayer";

const hlsInstances = vi.hoisted(() => [] as { destroy: ReturnType<typeof vi.fn>; loadSource: ReturnType<typeof vi.fn>; attachMedia: ReturnType<typeof vi.fn> }[]);
vi.mock("hls.js", () => ({ default: class {
    static isSupported = () => true;
    destroy = vi.fn();
    loadSource = vi.fn();
    attachMedia = vi.fn();
    constructor() { hlsInstances.push(this); }
} }));

function Player({ src, autoPlay = false, muted = false }: { src: string; autoPlay?: boolean; muted?: boolean }) {
    const { videoRef } = useVideoPlayer({ src, autoPlay, muted });
    return <video ref={videoRef} />;
}

describe("video source and playback lifecycle", () => {
    beforeEach(() => {
        hlsInstances.length = 0;
        vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
        vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    });
    afterEach(() => vi.restoreAllMocks());

    it("starts an already initialized native video when autoplay becomes requested", () => {
        const view = render(<Player src="/video.mp4" />);
        view.rerender(<Player src="/video.mp4" autoPlay muted />);
        expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
        expect(HTMLMediaElement.prototype.load).toHaveBeenCalledTimes(1);
    });

    it("retains HLS when playback options change and tears it down on source changes", () => {
        const view = render(<Player src="/first.m3u8" />);
        const first = hlsInstances[0];
        view.rerender(<Player src="/first.m3u8" autoPlay muted />);
        expect(first.destroy).not.toHaveBeenCalled();
        expect(hlsInstances).toHaveLength(1);
        view.rerender(<Player src="/second.m3u8" />);
        expect(first.destroy).toHaveBeenCalledTimes(1);
        expect(hlsInstances[1].loadSource).toHaveBeenCalledWith("/second.m3u8");
        view.unmount();
        expect(hlsInstances[1].destroy).toHaveBeenCalledTimes(1);
    });

    it("reattaches HLS after Strict Mode effect cleanup", () => {
        render(<StrictMode><Player src="/first.m3u8" /></StrictMode>);
        expect(hlsInstances).toHaveLength(2);
        expect(hlsInstances[0].destroy).toHaveBeenCalledTimes(1);
        expect(hlsInstances[1].attachMedia).toHaveBeenCalled();
        expect(hlsInstances[1].destroy).not.toHaveBeenCalled();
    });
});
