import { useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HumanModel3D from "./HumanModel3D";
import {
  WORKOUT_CATEGORIES,
  WORKOUT_CATEGORIES_DATA,
  getExerciseDetails,
  findExerciseByStableId,
} from "../data/workoutData";
import "./WorkoutGuidance.css";

// Sub-component for Exercise Metric Tracker (Reps or Timed Duration)
// Using key={exercise.id} ensures clean state initialization without useEffect setState cascading renders
function ExerciseMetricTracker({
  exercise,
  onComplete,
}) {
  const isTimed = exercise.isTimed;
  const targetCount = exercise.targetCount || (isTimed ? 20 : 10);

  const [repsDone, setRepsDone] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(targetCount);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Plank countdown effect
  useEffect(() => {
    if (!isTimed || !isTimerRunning) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerRunning(false);
          onComplete(exercise.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimed, isTimerRunning, exercise.id, onComplete]);

  return (
    <div className="exercise-metric-box">
      <div className="metric-header">
        <span className="metric-label">EXERCISE GOAL</span>
        <span className="metric-badge">{exercise.target}</span>
      </div>

      {isTimed ? (
        <div className="timed-tracker">
          <div className="timer-ring">
            <div className="countdown-number">{timerSeconds}s</div>
            <span className="countdown-sub">DURATION REMAINING</span>
          </div>

          <div className="timer-actions">
            <button
              type="button"
              className={`timer-toggle-btn ${isTimerRunning ? "pause" : "start"}`}
              onClick={() => setIsTimerRunning((r) => !r)}
            >
              {isTimerRunning
                ? "⏸ Pause Timer"
                : timerSeconds === 0
                ? "↺ Restart Timer"
                : "▶ Start Duration Timer"}
            </button>

            <button
              type="button"
              className="timer-reset-btn"
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(targetCount);
              }}
            >
              ↺ Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="rep-tracker">
          <div className="rep-counter-display">
            <span className="current-reps">{repsDone}</span>
            <span className="rep-slash">/</span>
            <span className="target-reps">{targetCount}</span>
            <span className="rep-unit">Reps</span>
          </div>

          <div className="rep-actions">
            <button
              type="button"
              className="add-rep-btn"
              onClick={() => {
                setRepsDone((r) => {
                  const next = r + 1;
                  if (next >= targetCount) {
                    onComplete(exercise.id);
                  }
                  return next;
                });
              }}
            >
              +1 Rep Completed
            </button>

            <button
              type="button"
              className="rep-reset-btn"
              onClick={() => setRepsDone(0)}
              title="Reset rep count"
            >
              ↺
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorkoutGuidance({
  initialExercise,
  initialLevel = "Beginner",
  initialCategory,
  onBack,
  onCompleteExercise,
  onSaveWorkoutToHistory,
  completedList = [],
}) {
  // Determine initial category and playlist
  const resolveInitialState = () => {
    // 1. If an exercise with stable ID is provided
    if (initialExercise?.id) {
      const match = findExerciseByStableId(initialExercise.id);
      if (match) {
        const isBp = match.category.type === "bodyPart";
        const catKey = match.category.name;
        const exercises = match.category.exercises;
        const idx = exercises.findIndex((e) => e.id === match.exercise.id);
        return {
          tab: isBp ? "bodyPart" : "level",
          level: isBp ? "Beginner" : catKey,
          bodyPart: isBp ? catKey : "Legs",
          index: Math.max(0, idx),
        };
      }
    }

    // 2. If a body part category was selected
    if (initialCategory && WORKOUT_CATEGORIES_DATA[initialCategory]) {
      const isBp = WORKOUT_CATEGORIES_DATA[initialCategory].type === "bodyPart";
      const exercises = WORKOUT_CATEGORIES_DATA[initialCategory].exercises;
      let idx = 0;
      if (initialExercise?.name) {
        const found = exercises.findIndex(
          (e) => e.name.toLowerCase() === initialExercise.name.toLowerCase()
        );
        if (found !== -1) idx = found;
      }
      return {
        tab: isBp ? "bodyPart" : "level",
        level: isBp ? "Beginner" : initialCategory,
        bodyPart: isBp ? initialCategory : "Legs",
        index: idx,
      };
    }

    // 3. If a workout level was selected
    if (initialLevel && WORKOUT_CATEGORIES_DATA[initialLevel]) {
      const exercises = WORKOUT_CATEGORIES_DATA[initialLevel].exercises;
      let idx = 0;
      if (initialExercise?.name) {
        const found = exercises.findIndex(
          (e) => e.name.toLowerCase() === initialExercise.name.toLowerCase()
        );
        if (found !== -1) idx = found;
      }
      return {
        tab: "level",
        level: initialLevel,
        bodyPart: "Legs",
        index: idx,
      };
    }

    // Fallback: Default to Beginner Jumping Jacks
    return {
      tab: "level",
      level: "Beginner",
      bodyPart: "Legs",
      index: 0,
    };
  };

  const initialResolved = resolveInitialState();

  const [activeTab, setActiveTab] = useState(initialResolved.tab);
  const [selectedLevel, setSelectedLevel] = useState(initialResolved.level);
  const [selectedBodyPart, setSelectedBodyPart] = useState(initialResolved.bodyPart);
  const [exerciseIndex, setExerciseIndex] = useState(initialResolved.index);

  // Compute active category data & playlist
  const activeCategoryKey = activeTab === "level" ? selectedLevel : selectedBodyPart;
  const currentCategoryData =
    WORKOUT_CATEGORIES_DATA[activeCategoryKey] || WORKOUT_CATEGORIES_DATA.Beginner;
  const currentPlaylist = currentCategoryData.exercises;

  // Safe exercise reference (clamped to bounds)
  const safeIndex = Math.min(Math.max(0, exerciseIndex), currentPlaylist.length - 1);
  const currentExercise = currentPlaylist[safeIndex] || currentPlaylist[0];
  const details = getExerciseDetails(currentExercise?.name);

  // Video / Display mode state
  const [displayMode, setDisplayMode] = useState("auto"); // "auto", "simulation", "guide"
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const videoRef = useRef(null);

  // Overall session elapsed stopwatch
  const [sessionElapsedTime, setSessionElapsedTime] = useState(0);

  // Completed exercises set
  const [sessionCompletedIds, setSessionCompletedIds] = useState(
    () => new Set(completedList)
  );
  const [showSummary, setShowSummary] = useState(false);
  const [hasSavedHistory, setHasSavedHistory] = useState(false);

  // Handler for marking exercise complete
  const handleExerciseComplete = useCallback((exId) => {
    const targetId = exId || currentExercise.id;
    setSessionCompletedIds((prev) => new Set([...prev, targetId, currentExercise.name]));
    if (onCompleteExercise) {
      onCompleteExercise(targetId, currentExercise.name);
    }
  }, [currentExercise.id, currentExercise.name, onCompleteExercise]);

  // Sync video playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, currentExercise?.id]);

  // Handle Play/Pause on Video
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentExercise?.id]);

  // Overall session elapsed stopwatch
  useEffect(() => {
    const id = setInterval(() => {
      setSessionElapsedTime((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleNextExercise = () => {
    if (safeIndex < currentPlaylist.length - 1) {
      setExerciseIndex(safeIndex + 1);
      setVideoError(false);
      setIsPlaying(true);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrevExercise = () => {
    if (safeIndex > 0) {
      setExerciseIndex(safeIndex - 1);
      setVideoError(false);
      setIsPlaying(true);
    }
  };

  const isCurrentCompleted =
    sessionCompletedIds.has(currentExercise.id) ||
    sessionCompletedIds.has(currentExercise.name);

  const handleFinishWorkout = () => {
    setIsPlaying(false);
    setShowSummary(true);
  };

  // Save completed workout session to FitTrack History
  const handleSaveToHistory = () => {
    if (hasSavedHistory) return;

    if (onSaveWorkoutToHistory) {
      const workoutTitle =
        activeTab === "level"
          ? `${selectedLevel} Workout`
          : `${selectedBodyPart} Workout`;

      const completedCount = currentPlaylist.filter(
        (ex) => sessionCompletedIds.has(ex.id) || sessionCompletedIds.has(ex.name)
      ).length;

      const totalCalories = currentPlaylist.reduce((acc, ex) => {
        return sessionCompletedIds.has(ex.id) || sessionCompletedIds.has(ex.name)
          ? acc + (ex.calories || 8)
          : acc;
      }, 0);

      onSaveWorkoutToHistory({
        level: workoutTitle,
        category: activeCategoryKey,
        count: completedCount || currentPlaylist.length,
        calories: totalCalories || 40,
        durationMinutes: Math.max(1, Math.round(sessionElapsedTime / 60)),
      });

      setHasSavedHistory(true);
    }

    setShowSummary(false);
    onBack();
  };

  return (
    <div className="guidance-container">
      {/* Top Header Bar */}
      <header className="guidance-header">
        <div className="guidance-header-left">
          <button className="back-btn" onClick={onBack} title="Return to Tracker">
            ← Return to FitTrack
          </button>
          <div className="guidance-title-area">
            <h1>Human Workout Guidance System</h1>
            <span className="live-badge">
              ● {activeCategoryKey} Workout • Exercise {safeIndex + 1} of {currentPlaylist.length}
            </span>
          </div>
        </div>

        <div className="guidance-header-right">
          <div className="workout-stopwatch">
            <span className="stopwatch-label">SESSION DURATION</span>
            <span className="stopwatch-time">{formatTime(sessionElapsedTime)}</span>
          </div>

          <button
            type="button"
            className="finish-session-btn"
            onClick={handleFinishWorkout}
          >
            🏁 Finish Workout
          </button>
        </div>
      </header>

      {/* Workout Category & Level Selectors */}
      <div className="category-selector-card">
        <div className="selector-tabs">
          <button
            className={`tab-btn ${activeTab === "level" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("level");
              setExerciseIndex(0);
              setVideoError(false);
            }}
          >
            ⚡ By Difficulty Level
          </button>
          <button
            className={`tab-btn ${activeTab === "bodyPart" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("bodyPart");
              setExerciseIndex(0);
              setVideoError(false);
            }}
          >
            💪 By Target Body Part
          </button>
        </div>

        <div className="selector-options">
          {activeTab === "level" ? (
            <div className="pill-group">
              {WORKOUT_CATEGORIES.LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  className={`pill-btn ${selectedLevel === lvl ? "active" : ""}`}
                  onClick={() => {
                    setSelectedLevel(lvl);
                    setExerciseIndex(0);
                    setVideoError(false);
                  }}
                >
                  {lvl} ({WORKOUT_CATEGORIES_DATA[lvl].exercises.length})
                </button>
              ))}
            </div>
          ) : (
            <div className="pill-group">
              {WORKOUT_CATEGORIES.BODY_PARTS.map((bp) => (
                <button
                  key={bp}
                  className={`pill-btn ${selectedBodyPart === bp ? "active" : ""}`}
                  onClick={() => {
                    setSelectedBodyPart(bp);
                    setExerciseIndex(0);
                    setVideoError(false);
                  }}
                >
                  {bp} ({WORKOUT_CATEGORIES_DATA[bp].exercises.length})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stepper Dots with Stable Identifiers */}
        <div className="playlist-stepper">
          <span className="stepper-label">
            Workout Playlist ({safeIndex + 1}/{currentPlaylist.length}):
          </span>
          <div className="stepper-dots">
            {currentPlaylist.map((ex, idx) => {
              const done =
                sessionCompletedIds.has(ex.id) || sessionCompletedIds.has(ex.name);
              return (
                <button
                  key={ex.id}
                  className={`step-dot ${idx === safeIndex ? "current" : ""} ${
                    done ? "completed" : ""
                  }`}
                  onClick={() => {
                    setExerciseIndex(idx);
                    setVideoError(false);
                    setIsPlaying(true);
                  }}
                  title={`${ex.name} — ${ex.target}`}
                >
                  {done ? "✓" : idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Guidance Grid */}
      <div className="guidance-main-grid">
        {/* Left Column: Human Demonstration Area */}
        <section className="viewer-card">
          <div className="viewer-top-bar">
            <div className="exercise-title-badge">
              <h2>{currentExercise.name}</h2>
              <span className="exercise-category-tag">{activeCategoryKey}</span>
              {isCurrentCompleted && (
                <span className="completed-pill">✓ Marked Complete</span>
              )}
            </div>

            {/* Display Mode Switcher */}
            <div className="demonstration-mode-selector">
              <span className="control-label">Mode:</span>
              <button
                className={`cam-btn ${displayMode === "auto" ? "active" : ""}`}
                onClick={() => setDisplayMode("auto")}
                title="Recommended demonstration view"
              >
                Standard
              </button>
              <button
                className={`cam-btn ${displayMode === "simulation" ? "active" : ""}`}
                onClick={() => setDisplayMode("simulation")}
                title="3D Kinematic Simulation"
              >
                3D Model
              </button>
              <button
                className={`cam-btn ${displayMode === "guide" ? "active" : ""}`}
                onClick={() => setDisplayMode("guide")}
                title="Illustrated Step Guide"
              >
                Guide
              </button>
            </div>
          </div>

          {/* Demonstration Viewing Area */}
          <div className="canvas-wrapper">
            {/* Scenario A: Real-Human Video Available */}
            {currentExercise.hasRealHumanVideo &&
            currentExercise.videoUrl &&
            !videoError &&
            displayMode !== "simulation" &&
            displayMode !== "guide" ? (
              <div className="real-human-video-container">
                <video
                  ref={videoRef}
                  key={currentExercise.videoUrl}
                  src={currentExercise.videoUrl}
                  playsInline
                  loop
                  muted
                  autoPlay
                  onError={() => setVideoError(true)}
                  className="real-human-video-player"
                />

                <div className="video-verification-badge">
                  <span className="badge-icon">✅</span>
                  <div className="badge-details">
                    <strong>Real-Human Exercise Demonstration</strong>
                    <span>Source: {currentExercise.source}</span>
                  </div>
                </div>
              </div>
            ) : displayMode === "simulation" ||
              (!currentExercise.hasRealHumanVideo && displayMode !== "guide") ? (
              /* Scenario B: 3D Biomechanical Simulation (Explicitly Disclaimed) */
              <div className="simulation-wrapper">
                {/* Honest Asset Status Banner */}
                {!currentExercise.hasRealHumanVideo && (
                  <div className="honest-asset-notice">
                    <span className="notice-icon">📹</span>
                    <div className="notice-content">
                      <strong>Real-Human Video Footage Required</strong>
                      <p>
                        Authentic real-human video for <em>{currentExercise.name}</em> is
                        awaiting licensed recording. Displaying the 3D Biomechanical
                        Simulation below as a movement reference.
                      </p>
                    </div>
                  </div>
                )}

                <Canvas
                  shadows
                  camera={{ position: [0, 1.6, 5.8], fov: 38 }}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 30%, #f1edff 0%, #e2daf8 55%, #cfc5f0 100%)",
                  }}
                >
                  <ambientLight intensity={1.3} />
                  <directionalLight
                    castShadow
                    position={[4, 6, 4]}
                    intensity={2.1}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                  />
                  <directionalLight position={[-3, 4, -3]} intensity={0.8} />

                  <mesh
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -0.01, 0]}
                  >
                    <planeGeometry args={[16, 16]} />
                    <meshStandardMaterial color="#ddd7f5" roughness={0.9} />
                  </mesh>

                  <HumanModel3D
                    exerciseName={currentExercise.name}
                    isPlaying={isPlaying}
                    speed={playbackSpeed}
                  />

                  <OrbitControls
                    enablePan={false}
                    minDistance={2.8}
                    maxDistance={8.5}
                    target={[0, 1.2, 0]}
                    maxPolarAngle={Math.PI / 2 + 0.05}
                  />
                </Canvas>

                <div className="simulation-disclaimer-pill">
                  ℹ️ 3D Biomechanical Simulation (Interactive Kinematic Model)
                </div>
              </div>
            ) : (
              /* Scenario C: Illustrated Text Guide */
              <div className="webgl-fallback-card">
                <div className="fallback-icon">🧘‍♂️</div>
                <h3>{currentExercise.name} Form Guide</h3>
                <p>
                  <strong>Target:</strong> {currentExercise.target} • <strong>Equipment:</strong>{" "}
                  {details.equipment}
                </p>
                <div className="fallback-steps">
                  <p>
                    <strong>Starting Posture:</strong> {details.startingPosition}
                  </p>
                  <ol>
                    {details.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Pro Form Cue Overlay */}
            <div className="trainer-cue-overlay">
              <span className="cue-icon">💡</span>
              <span className="cue-text">{details.tip}</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="viewer-controls-bar">
            {/* Play / Pause / Restart */}
            <div className="playback-group">
              <button
                type="button"
                className={`control-btn play-btn ${isPlaying ? "playing" : ""}`}
                onClick={() => setIsPlaying((p) => !p)}
                title={isPlaying ? "Pause Demonstration" : "Play Demonstration"}
              >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>

              <button
                type="button"
                className="control-btn replay-btn"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play().catch(() => {});
                  }
                  setIsPlaying(true);
                }}
                title="Restart movement demonstration"
              >
                ↺ Restart
              </button>
            </div>

            {/* Playback Speed Controls */}
            <div className="speed-group">
              <span className="control-label">Speed:</span>
              {[0.5, 1.0, 1.5].map((spd) => (
                <button
                  key={spd}
                  className={`speed-btn ${playbackSpeed === spd ? "active" : ""}`}
                  onClick={() => setPlaybackSpeed(spd)}
                  title={`${spd}x Speed`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Next exercise quick control */}
            <button
              type="button"
              className="control-btn next-quick-btn"
              onClick={handleNextExercise}
            >
              {safeIndex === currentPlaylist.length - 1 ? "Review 🏁" : "Next ⏭"}
            </button>
          </div>
        </section>

        {/* Right Column: Interactive Tracker & Form Instructions */}
        <section className="tracker-card">
          {/* Keyed Metric Tracker sub-component */}
          <ExerciseMetricTracker
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />

          {/* Stepper Navigation Buttons */}
          <div className="stepper-actions">
            <button
              type="button"
              className="stepper-nav-btn prev"
              onClick={handlePrevExercise}
              disabled={safeIndex === 0}
            >
              ⏮ Previous
            </button>

            <button
              type="button"
              className={`mark-complete-btn ${isCurrentCompleted ? "completed" : ""}`}
              onClick={() => handleExerciseComplete(currentExercise.id)}
            >
              {isCurrentCompleted ? "✓ Exercise Completed" : "Mark Exercise Complete"}
            </button>

            <button
              type="button"
              className="stepper-nav-btn next"
              onClick={handleNextExercise}
            >
              {safeIndex === currentPlaylist.length - 1 ? "Finish 🏁" : "Next ⏭"}
            </button>
          </div>

          {/* Technique & Form Guide */}
          <div className="technique-guide">
            <h3>Movement & Technique Guide</h3>

            <div className="technique-section">
              <span className="technique-label">Starting Position</span>
              <p className="technique-desc">{details.startingPosition}</p>
            </div>

            <div className="technique-section">
              <span className="technique-label">Complete Movement Sequence</span>
              <ol className="step-list">
                {details.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>

            <div className="technique-section callout tip">
              <span className="callout-icon">💡</span>
              <div>
                <strong>Form Cue:</strong>
                <p>{details.tip}</p>
              </div>
            </div>

            {details.mistake && (
              <div className="technique-section callout warning">
                <span className="callout-icon">⚠️</span>
                <div>
                  <strong>Common Mistake:</strong>
                  <p>{details.mistake}</p>
                </div>
              </div>
            )}

            <div className="muscles-section">
              <span className="technique-label">Target Muscles</span>
              <div className="muscle-tags">
                {details.muscles.map((m) => (
                  <span key={m} className="muscle-tag">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Workout Completion Summary Modal */}
      {showSummary && (
        <div className="modal-backdrop">
          <div className="summary-modal">
            <div className="celebrate-icon">🎉</div>
            <h2>Workout Session Completed!</h2>
            <p className="summary-subtitle">
              All exercises in the <strong>{activeCategoryKey}</strong> workout have been
              performed!
            </p>

            <div className="summary-stats-grid">
              <div className="summary-stat-box">
                <span className="stat-label">Category</span>
                <span className="stat-value">{activeCategoryKey}</span>
              </div>
              <div className="summary-stat-box">
                <span className="stat-label">Exercises Done</span>
                <span className="stat-value">
                  {
                    currentPlaylist.filter(
                      (e) =>
                        sessionCompletedIds.has(e.id) ||
                        sessionCompletedIds.has(e.name)
                    ).length
                  }{" "}
                  / {currentPlaylist.length}
                </span>
              </div>
              <div className="summary-stat-box">
                <span className="stat-label">Total Time</span>
                <span className="stat-value">{formatTime(sessionElapsedTime)}</span>
              </div>
              <div className="summary-stat-box">
                <span className="stat-label">Calories Burned</span>
                <span className="stat-value">
                  {currentPlaylist.reduce((acc, ex) => {
                    return sessionCompletedIds.has(ex.id) ||
                      sessionCompletedIds.has(ex.name)
                      ? acc + (ex.calories || 8)
                      : acc;
                  }, 0)}{" "}
                  kcal
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-save-btn"
                onClick={handleSaveToHistory}
                disabled={hasSavedHistory}
              >
                {hasSavedHistory
                  ? "✓ Saved to Workout History"
                  : "💾 Save to FitTrack Workout History"}
              </button>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowSummary(false)}
              >
                Review Exercises
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
