import { useState, useEffect, useRef } from "react";
import "./WorkoutVideoPlayer.css";

export default function WorkoutVideoPlayer({
  videoUrl,
  referenceImage,
  exerciseName,
  trainer = "FitTrack AI Human Fitness Trainer",
  isPlaying = false,
  onTogglePlay,
  onReplay,
  hasStarted = false,
  onStart,
  playbackSpeed = 1.0,
  onChangePlaybackSpeed,
  isFinished = false,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Sync play/pause from parent
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  // Sync playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
      videoRef.current.playbackRate = playbackSpeed;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const targetSec = parseFloat(e.target.value);
    videoRef.current.currentTime = targetSec;
    setCurrentTime(targetSec);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.85);
      videoRef.current.volume = 0.85;
    }
  };

  const handleVolumeChange = (e) => {
    if (!videoRef.current) return;
    const newVol = parseFloat(e.target.value);
    videoRef.current.volume = newVol;
    setVolume(newVol);
    const muted = newVol === 0;
    videoRef.current.muted = muted;
    setIsMuted(muted);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().catch((err) => {
        console.warn("Fullscreen request error:", err);
      });
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleInternalReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
    if (onReplay) {
      onReplay();
    }
  };

  const handleVideoClick = () => {
    if (!hasStarted) {
      if (onStart) onStart();
    } else {
      if (onTogglePlay) onTogglePlay();
    }
  };

  const altVideoUrl = videoUrl.endsWith(".webm")
    ? videoUrl.replace(/\.webm$/, ".mp4")
    : videoUrl.replace(/\.mp4$/, ".webm");

  return (
    <div
      ref={playerContainerRef}
      className="fittrack-video-guide-wrapper"
      tabIndex={0}
      aria-label={`${exerciseName} AI Human Demonstration Video Player`}
    >
      <div className="video-player-frame">
        {/* Loading Spinner */}
        {isLoading && !hasError && (
          <div className="video-loading-overlay">
            <div className="video-spinner"></div>
            <span className="loading-text">Loading AI human trainer demonstration...</span>
          </div>
        )}

        {/* Fallback Error View */}
        {hasError ? (
          <div className="video-placeholder-card">
            {referenceImage ? (
              <img
                src={referenceImage}
                alt={`${exerciseName} posture guide`}
                className="placeholder-reference-img"
              />
            ) : (
              <div className="placeholder-icon-badge">🤖</div>
            )}
            <div className="placeholder-overlay-content">
              <span className="placeholder-pill">AI DEMO</span>
              <h3 className="placeholder-title">{exerciseName}</h3>
              <p className="placeholder-desc">
                Follow the kinetic form cues and instructions below.
              </p>
            </div>
          </div>
        ) : (
          <div className="html5-video-wrapper">
            <video
              ref={videoRef}
              key={videoUrl}
              playsInline
              loop
              muted={isMuted}
              className="html5-video-element"
              onLoadedData={handleVideoLoaded}
              onWaiting={() => setIsLoading(true)}
              onPlaying={() => setIsLoading(false)}
              onTimeUpdate={() => {
                if (videoRef.current) {
                  setCurrentTime(videoRef.current.currentTime);
                }
              }}
              onError={handleVideoError}
              onClick={handleVideoClick}
            >
              <source src={videoUrl} type={videoUrl.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
              <source src={altVideoUrl} type={altVideoUrl.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
            </video>

            {/* Start Demonstration Overlay (paused before Start is pressed) */}
            {!hasStarted && !isLoading && (
              <div className="video-start-overlay" onClick={onStart}>
                <button type="button" className="btn-start-hero" onClick={onStart} aria-label="Start Exercise">
                  <span className="hero-play-icon">▶</span>
                  <span className="hero-play-text">Start Exercise &amp; Timer</span>
                  <span className="hero-play-sub">Follow 3D Trainer Demonstration</span>
                </button>
              </div>
            )}

            {/* Exercise Finished Badge Overlay */}
            {isFinished && (
              <div className="video-finished-overlay">
                <div className="finished-badge-card">
                  <span className="finished-sparkle">🎉</span>
                  <strong className="finished-title">Set Completed!</strong>
                  <p className="finished-sub">
                    Assigned demonstration duration finished. Click <strong>Mark Exercise Complete</strong> below.
                  </p>
                  <button type="button" className="btn-replay-pill" onClick={handleInternalReplay}>
                    ↺ Replay Demonstration
                  </button>
                </div>
              </div>
            )}

            {/* Custom Video Control Bar */}
            <div className="html5-video-controls-bar">
              {/* Seekbar */}
              <div className="video-progress-container">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.05"
                  value={currentTime}
                  onChange={handleSeek}
                  className="video-seek-slider"
                  aria-label="Seek video progress"
                />
              </div>

              <div className="video-controls-row">
                <div className="controls-left">
                  {/* Play / Pause */}
                  <button
                    type="button"
                    className="video-ctrl-btn"
                    onClick={hasStarted ? onTogglePlay : onStart}
                    title={isPlaying ? "Pause" : "Play"}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>

                  {/* Replay */}
                  <button
                    type="button"
                    className="video-ctrl-btn"
                    onClick={handleInternalReplay}
                    title="Replay from start"
                    aria-label="Replay"
                  >
                    ↺
                  </button>

                  {/* Volume / Mute */}
                  <div className="volume-control-group">
                    <button
                      type="button"
                      className="video-ctrl-btn"
                      onClick={toggleMute}
                      title={isMuted ? "Unmute" : "Mute"}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted || volume === 0 ? "🔇" : volume > 0.5 ? "🔊" : "🔉"}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                      aria-label="Volume slider"
                    />
                  </div>

                  {/* Demonstration Loop Time */}
                  <span className="video-time-display">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="controls-right">
                  {/* Playback Speed */}
                  <div className="speed-selector">
                    {[0.75, 1.0, 1.25].map((spd) => (
                      <button
                        key={spd}
                        type="button"
                        className={`speed-pill ${playbackSpeed === spd ? "active" : ""}`}
                        onClick={() => onChangePlaybackSpeed && onChangePlaybackSpeed(spd)}
                        title={`Speed ${spd}x`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  {/* Fullscreen */}
                  <button
                    type="button"
                    className="video-ctrl-btn"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    aria-label="Fullscreen"
                  >
                    {isFullscreen ? "⤓" : "⛶"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Verification Bar */}
      <div className="video-meta-status-bar">
        <div className="status-meta-left">
          <span className="verification-badge">
            <span className="badge-pulse">●</span> {trainer}
          </span>
          <span className="source-attribution">
            In-App AI Human Character • 100% Local Playback
          </span>
        </div>

        <div className="status-meta-right">
          <span className="offline-badge">
            🔒 Consistent Anatomically-Correct 3D Model Across All Workouts
          </span>
        </div>
      </div>
    </div>
  );
}
