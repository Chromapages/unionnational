import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StrictMode } from "react";
import { useVideoPlayer } from "./useVideoPlayer";

const hlsInstances = vi.hoisted(() => [] as { destroy: ReturnType<typeof vi.fn>; loadSource: ReturnType<typeof vi.fn>; attachMedia: ReturnType<typeof vi.fn> }[]);
const support = vi.hoisted(() => ({ hls: true }));
vi.mock("hls.js", () => ({ default: class {
    static isSupported = () => support.hls;
    destroy = vi.fn();
    loadSource = vi.fn();
    attachMedia = vi.fn();
    constructor() { hlsInstances.push(this); }
} }));

function Player({ src, autoPlay = false, muted = false, loop = false, attach = true, command }: { src?: string; autoPlay?: boolean; muted?: boolean; loop?: boolean; attach?: boolean; command?: (controls: ReturnType<typeof useVideoPlayer>["controls"]) => void | Promise<void> }) {
    const { videoRef, containerRef, state, controls } = useVideoPlayer({ src, autoPlay, muted, loop });
    return <><div data-testid="video-container" ref={attach ? containerRef : undefined}>{attach && <video ref={videoRef} />}</div><output aria-label="Playback state">{JSON.stringify(state)}</output><button onClick={() => command?.(controls)}>Invoke control</button></>;
}
const playbackState = () => JSON.parse(screen.getByLabelText("Playback state").textContent!);
const nativeVideo = (container: HTMLElement) => container.querySelector("video") as HTMLVideoElement;

describe("video source and playback lifecycle", () => {
    beforeEach(() => {
        hlsInstances.length = 0;
        support.hls = true;
        vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
        vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    });
    afterEach(() => {
        cleanup(); vi.restoreAllMocks();
        Reflect.deleteProperty(document, 'fullscreenElement');
        Reflect.deleteProperty(document, 'exitFullscreen');
        Reflect.deleteProperty(document, 'pictureInPictureElement');
        Reflect.deleteProperty(document, 'exitPictureInPicture');
    });

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

    it("uses native HLS where available and a normal media load otherwise", () => {
        support.hls = false;
        const canPlay = vi.spyOn(HTMLMediaElement.prototype, 'canPlayType').mockReturnValue('probably');
        const native = render(<Player src="/native.m3u8" />);
        expect(nativeVideo(native.container).getAttribute('src')).toBe('/native.m3u8');
        expect(HTMLMediaElement.prototype.load).not.toHaveBeenCalled();
        native.unmount();
        canPlay.mockReturnValue('');
        render(<Player src="/unsupported.m3u8" />);
        expect(HTMLMediaElement.prototype.load).toHaveBeenCalledTimes(1);
        expect(hlsInstances).toHaveLength(0);
    });

    it("synchronizes native events, progress, audio, buffering and playback speed", () => {
        const view = render(<Player src="/video.mp4" muted loop />);
        const video = nativeVideo(view.container);
        expect(video.muted).toBe(true); expect(video.loop).toBe(true);
        fireEvent.play(video); expect(playbackState().isPlaying).toBe(true);
        fireEvent.waiting(video); expect(playbackState().isBuffering).toBe(true);
        fireEvent.playing(video); expect(playbackState().isBuffering).toBe(false);
        Object.defineProperty(video, 'duration', { configurable: true, value: 100 });
        video.currentTime = 25;
        fireEvent.durationChange(video); fireEvent.timeUpdate(video);
        expect(playbackState()).toMatchObject({ currentTime: 25, duration: 100, progress: 25 });
        Object.defineProperty(video, 'duration', { configurable: true, value: 0 }); video.currentTime = 0;
        fireEvent.timeUpdate(video); expect(playbackState().progress).toBe(0);
        video.volume = 0.25; video.muted = false; fireEvent.volumeChange(video);
        expect(playbackState()).toMatchObject({ volume: 0.25, isMuted: false });
        video.playbackRate = 1.5; fireEvent.rateChange(video);
        expect(playbackState().playbackRate).toBe(1.5);
        fireEvent.pause(video); expect(playbackState().isPlaying).toBe(false);
        fireEvent(video, new Event('enterpictureinpicture')); expect(playbackState().isPip).toBe(true);
        fireEvent(video, new Event('leavepictureinpicture')); expect(playbackState().isPip).toBe(false);
        Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: view.container });
        fireEvent(document, new Event('fullscreenchange')); expect(playbackState().isFullscreen).toBe(true);
        Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: null });
        fireEvent(document, new Event('fullscreenchange')); expect(playbackState().isFullscreen).toBe(false);
    });

    it("plays and pauses native media, handling a denied user playback request", async () => {
        let paused = true;
        const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
        const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const view = render(<Player src="/video.mp4" command={controls => controls.togglePlay()} />);
        Object.defineProperty(nativeVideo(view.container), 'paused', { configurable: true, get: () => paused });
        fireEvent.click(screen.getByRole('button', { name: 'Invoke control' }));
        expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
        paused = false;
        fireEvent.click(screen.getByRole('button', { name: 'Invoke control' }));
        expect(pause).toHaveBeenCalledTimes(1);
        paused = true;
        vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new Error('synthetic denied playback'));
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Invoke control' })); });
        expect(warning).toHaveBeenCalledWith('Play prevented in togglePlay:', expect.any(Error));
        expect(nativeVideo(view.container)).toBeInTheDocument();
    });

    it("bounds absolute/relative seeking and rejects unavailable duration and invalid absolute targets", () => {
        let command = (controls: ReturnType<typeof useVideoPlayer>['controls']) => controls.seek(500);
        const view = render(<Player src="/video.mp4" command={controls => command(controls)} />);
        const video = nativeVideo(view.container);
        Object.defineProperty(video, 'duration', { configurable: true, value: 100 });
        const invoke = () => fireEvent.click(screen.getByRole('button', { name: 'Invoke control' }));
        invoke(); expect(video.currentTime).toBe(100);
        command = controls => controls.seek(-20); invoke(); expect(video.currentTime).toBe(0);
        command = controls => controls.seek(Number.NaN); invoke(); expect(video.currentTime).toBe(0);
        command = controls => controls.seekRelative(150); invoke(); expect(video.currentTime).toBe(100);
        command = controls => controls.seekRelative(-150); invoke(); expect(video.currentTime).toBe(0);
        Object.defineProperty(video, 'duration', { configurable: true, value: Number.NaN });
        command = controls => { controls.seek(50); controls.seekRelative(10); }; invoke();
        expect(video.currentTime).toBe(0);
    });

    it("bounds audio changes and supports mute and speed controls", () => {
        let command = (controls: ReturnType<typeof useVideoPlayer>['controls']) => controls.setVolume(2);
        const view = render(<Player src="/video.mp4" command={controls => command(controls)} />);
        const video = nativeVideo(view.container);
        const invoke = () => fireEvent.click(screen.getByRole('button', { name: 'Invoke control' }));
        invoke(); expect(video.volume).toBe(1); expect(video.muted).toBe(false);
        command = controls => controls.setVolume(-1); invoke(); expect(video.volume).toBe(0);
        command = controls => controls.setVolume(0); invoke(); expect(video.muted).toBe(true);
        command = controls => controls.toggleMute(); invoke(); expect(video.muted).toBe(false);
        command = controls => controls.setPlaybackRate(1.25); invoke(); expect(video.playbackRate).toBe(1.25);
    });

    it("requests and exits fullscreen, and contains a browser fullscreen denial", async () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        const view = render(<Player src="/video.mp4" command={controls => controls.toggleFullscreen()} />);
        const region = screen.getByTestId('video-container');
        const request = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(region, 'requestFullscreen', { configurable: true, value: request });
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Invoke control' })); });
        expect(request).toHaveBeenCalledTimes(1);
        Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: region });
        const exit = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(document, 'exitFullscreen', { configurable: true, value: exit });
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Invoke control' })); });
        expect(exit).toHaveBeenCalledTimes(1);
        Reflect.deleteProperty(document, 'exitFullscreen');
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Invoke control' })); });
        expect(error).not.toHaveBeenCalled();
        Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: null });
        request.mockRejectedValueOnce(new Error('synthetic fullscreen denial'));
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Invoke control' })); });
        expect(error).toHaveBeenCalledWith('Error attempting to enable fullscreen:', expect.any(Error));
        expect(nativeVideo(view.container)).toBeInTheDocument();
    });

    it("requests and exits picture-in-picture and contains unsupported/denied requests", async () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        const view = render(<Player src="/video.mp4" command={controls => controls.togglePip()} />);
        const video = nativeVideo(view.container);
        const request = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(video, 'requestPictureInPicture', { configurable: true, value: request });
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Invoke control' })); });
        expect(request).toHaveBeenCalledTimes(1);
        Object.defineProperty(document, 'pictureInPictureElement', { configurable: true, value: video });
        const exit = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(document, 'exitPictureInPicture', { configurable: true, value: exit });
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Invoke control' })); });
        expect(exit).toHaveBeenCalledTimes(1);
        Object.defineProperty(document, 'pictureInPictureElement', { configurable: true, value: null });
        request.mockRejectedValueOnce(new Error('synthetic picture-in-picture denial'));
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Invoke control' })); });
        expect(error).toHaveBeenCalledWith('Error toggling PiP:', expect.any(Error));
    });

    it("ignores controls when no media/container is attached", async () => {
        render(<Player src="/video.mp4" autoPlay attach={false} command={async controls => {
            controls.togglePlay(); controls.seek(20); controls.seekRelative(10); controls.setVolume(0.5); controls.toggleMute(); controls.setPlaybackRate(2);
            await controls.toggleFullscreen(); await controls.togglePip();
        }} />);
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Invoke control' })); });
        expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
        expect(HTMLMediaElement.prototype.load).not.toHaveBeenCalled();
    });

    it("keeps autoplay failure recoverable and detaches metadata and playback listeners", async () => {
        const removals = vi.spyOn(HTMLMediaElement.prototype, 'removeEventListener');
        const documentRemovals = vi.spyOn(document, 'removeEventListener');
        vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValue(new Error('synthetic autoplay policy'));
        const view = render(<Player src="/video.mp4" autoPlay />);
        const video = nativeVideo(view.container);
        await act(async () => {});
        expect(playbackState().isPlaying).toBe(false);
        fireEvent.loadedMetadata(video);
        await act(async () => {});
        expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
        view.unmount();
        fireEvent.loadedMetadata(video); fireEvent.play(video);
        expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
        expect(removals).toHaveBeenCalledWith('loadedmetadata', expect.any(Function));
        expect(removals).toHaveBeenCalledWith('timeupdate', expect.any(Function));
        expect(documentRemovals).toHaveBeenCalledWith('fullscreenchange', expect.any(Function));
    });

    it("does not start playback without a source and ignores a late rejection after unmount", async () => {
        const empty = render(<Player autoPlay />);
        expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
        empty.unmount();
        let rejectPlayback!: (error: Error) => void;
        vi.mocked(HTMLMediaElement.prototype.play).mockReturnValue(new Promise<void>((_resolve, reject) => { rejectPlayback = reject; }));
        const active = render(<Player src="/video.mp4" autoPlay />);
        const detachedVideo = nativeVideo(active.container);
        active.unmount();
        fireEvent.loadedMetadata(detachedVideo);
        await act(async () => { rejectPlayback(new Error('synthetic late rejection')); });
        expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    });
});
