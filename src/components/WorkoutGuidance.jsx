import { useState, useEffect, useMemo } from "react";
import WorkoutVideoPlayer from "./WorkoutVideoPlayer";
import {
  WORKOUT_CATEGORIES_DATA,
  getExerciseDetails,
  findExerciseByStableId,
} from "../data/workoutData";
import "./WorkoutGuidance.css";

// Formats seconds to mm:ss
function formatTime(secs) {
  if (isNaN(secs) || secs < 0) return "00:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Active Exercise Session Runner (Keyed by currentExercise.id for pristine state on each exercise)
function ActiveExercisePanel({
  currentExercise,
  selectedLevel,
  currentCategoryData,
  isCurrentCompleted,
  canGoPrev,
  isLastExercise,
  onPrev,
  onNext,
  onComplete,
}) {
  const details = getExerciseDetails(currentExercise?.name);

  // Exercise duration & pacing metrics
  const isTimed = Boolean(currentExercise?.isTimed);
  const targetCount = currentExercise?.targetCount || (isTimed ? 20 : 10);
  // Timed exercises use targetCount seconds; rep-based exercises use brisk 2s/rep cadence
  const assignedDuration = isTimed ? targetCount : targetCount * 2;

  // Synchronization states for exercise demo & timer
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(assignedDuration);
  const [isFinished, setIsFinished] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Exercise demonstration timer interval
  useEffect(() => {
    if (!hasStarted || !isPlaying || timerSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPlaying(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted, isPlaying, timerSeconds]);

  // Start exercise handler
  const handleStartExercise = () => {
    setHasStarted(true);
    setIsPlaying(true);
    setIsFinished(false);
    if (timerSeconds === 0) {
      setTimerSeconds(assignedDuration);
    }
  };

  // Toggle play/pause
  const handleTogglePlay = () => {
    if (!hasStarted) {
      handleStartExercise();
    } else {
      setIsPlaying((p) => !p);
    }
  };

  // Replay handler
  const handleReplayExercise = () => {
    setHasStarted(true);
    setIsPlaying(true);
    setIsFinished(false);
    setTimerSeconds(assignedDuration);
  };

  // Automated cadence calculation (no manual repetition clicking required)
  const currentCadenceRep = isTimed
    ? null
    : Math.min(
        targetCount,
        Math.floor(((assignedDuration - timerSeconds) / assignedDuration) * targetCount) + 1
      );

  // Completion Eligibility:
  // Complete button is strictly DISABLED before start and while timer is running.
  // Unlocks only after assigned timer reaches 0 (or if already completed previously).
  const canMarkComplete = isCurrentCompleted || isFinished || (hasStarted && timerSeconds === 0);

  return (
    <div className="guidance-content-grid">
      {/* Left Column: AI Human Demonstration Video Player Card */}
      <section className="video-card-section">
        {/* Exercise Info Header */}
        <div className="exercise-badge-header">
          <div>
            <span className={`intensity-badge ${currentCategoryData.badgeColor || "badge-easy"}`}>
              {selectedLevel} • {currentCategoryData.intensity} Intensity
            </span>
            <h2 className="current-exercise-title">{currentExercise.name}</h2>
          </div>

          <div className="target-pill-wrap">
            <span className="exercise-target-badge">🎯 {currentExercise.target}</span>
            {isCurrentCompleted && (
              <span className="completed-success-tag">✓ Completed</span>
            )}
          </div>
        </div>

        {/* AI Human Demonstration Video Player */}
        <WorkoutVideoPlayer
          videoUrl={currentExercise.videoUrl}
          referenceImage={currentExercise.referenceImage}
          exerciseName={currentExercise.name}
          trainer={currentExercise.trainer || "FitTrack AI Human Fitness Trainer"}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onReplay={handleReplayExercise}
          hasStarted={hasStarted}
          onStart={handleStartExercise}
          playbackSpeed={playbackSpeed}
          onChangePlaybackSpeed={setPlaybackSpeed}
          isFinished={isFinished}
        />

        {/* Understandable Exercise Timer & Cadence Tracker (No manual clicks needed) */}
        <div className="exercise-interactive-tracker-wrap">
          <div className="exercise-metric-box">
            <div className="metric-header">
              <span className="metric-label">EXERCISE TIMER &amp; PACING</span>
              <span className="metric-badge">
                {hasStarted
                  ? isFinished
                    ? "🎉 COMPLETED"
                    : isPlaying
                    ? "⚡ IN PROGRESS"
                    : "⏸ PAUSED"
                  : "READY TO START"}
              </span>
            </div>

            <div className="timed-tracker">
              <div className="timer-ring">
                <div className="countdown-number">{timerSeconds}s</div>
                <span className="countdown-sub">
                  {isTimed
                    ? "ISOMETRIC HOLD REMAINING"
                    : `CADENCE PACING • REP ${hasStarted && timerSeconds > 0 ? currentCadenceRep : isFinished ? targetCount : 0} / ${targetCount}`}
                </span>
              </div>

              {/* Progress bar across assigned duration */}
              <div className="exercise-duration-bar-wrap">
                <div
                  className="exercise-duration-bar-fill"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, ((assignedDuration - timerSeconds) / (assignedDuration || 1)) * 100)
                    )}%`,
                  }}
                ></div>
              </div>

              <div className="timer-actions">
                <button
                  type="button"
                  className={`timer-toggle-btn ${isPlaying ? "pause" : "start"}`}
                  onClick={handleTogglePlay}
                >
                  {!hasStarted
                    ? "▶ Start Exercise & Timer"
                    : isPlaying
                    ? "⏸ Pause Workout"
                    : timerSeconds === 0
                    ? "↺ Restart Workout"
                    : "▶ Resume Workout"}
                </button>

                <button
                  type="button"
                  className="timer-add-btn"
                  onClick={() => setTimerSeconds((s) => s + 10)}
                  title="Add 10 seconds"
                >
                  +10s
                </button>

                <button
                  type="button"
                  className="timer-reset-btn"
                  onClick={handleReplayExercise}
                  title="Reset to beginning"
                >
                  ↺ Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Next / Previous Controls & Disabled/Enabled Complete Button */}
        <div className="exercise-nav-actions">
          <button
            type="button"
            className="btn-nav prev"
            onClick={onPrev}
            disabled={!canGoPrev}
          >
            ← Previous Exercise
          </button>

          {/* Complete button strictly disabled before start and while timer runs */}
          <button
            type="button"
            className={`btn-mark-done ${
              isCurrentCompleted
                ? "already-done"
                : canMarkComplete
                ? "ready-to-complete"
                : isPlaying
                ? "running"
                : "disabled"
            }`}
            onClick={() => {
              if (canMarkComplete) {
                onComplete(currentExercise.id);
              }
            }}
            disabled={!canMarkComplete}
            title={
              isCurrentCompleted
                ? "Exercise completed"
                : canMarkComplete
                ? "Mark exercise complete"
                : isPlaying
                ? `Complete unlocks when exercise timer finishes (${timerSeconds}s remaining)`
                : "Press Start to begin demonstration and countdown timer"
            }
          >
            {isCurrentCompleted
              ? "✓ Exercise Marked Complete"
              : canMarkComplete
              ? "✓ Mark Exercise Complete"
              : isPlaying
              ? `⏳ Complete in ${timerSeconds}s`
              : "🔒 Complete (Press Start to Begin)"}
          </button>

          <button
            type="button"
            className="btn-nav next"
            onClick={onNext}
          >
            {isLastExercise ? "Finish Routine →" : "Next Exercise →"}
          </button>
        </div>
      </section>

      {/* Right Column: Instructions, Form Cues, Pro Tips */}
      <section className="exercise-instructions-card">
        <div className="instructions-header">
          <h3 className="section-title">Form Guide &amp; Instructions</h3>
          <span className="category-meta">{details.category}</span>
        </div>

        {/* Target Muscles Badges */}
        <div className="muscles-targeted-group">
          <span className="tag-label">Target Muscle Focus:</span>
          <div className="muscle-tags-wrap">
            {(details.muscles || []).map((m, i) => (
              <span key={i} className="muscle-pill">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Starting Position */}
        <div className="form-step-block">
          <h4 className="step-title">
            <span className="step-icon">🧘‍♀️</span> Starting Posture &amp; Alignment
          </h4>
          <p className="step-text">{details.startingPosition}</p>
        </div>

        {/* Execution Steps */}
        <div className="form-step-block">
          <h4 className="step-title">
            <span className="step-icon">📋</span> Step-by-Step Movement
          </h4>
          <ol className="execution-steps-list">
            {(details.steps || []).map((step, idx) => (
              <li key={idx} className="step-item">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Trainer Pro Tip */}
        {details.tip && (
          <div className="trainer-pro-tip-box">
            <span className="tip-badge">💡 COACH FORM TIP</span>
            <p className="pro-tip-text">{details.tip}</p>
          </div>
        )}

        {/* Common Mistake to Avoid */}
        {details.mistake && (
          <div className="mistake-warning-box">
            <span className="warning-badge">⚠️ COMMON MISTAKE TO AVOID</span>
            <p className="mistake-text">{details.mistake}</p>
          </div>
        )}

        {/* Equipment */}
        <div className="equipment-info-row">
          <span className="eq-label">Equipment Required:</span>
          <strong className="eq-val">{details.equipment || "None (Bodyweight)"}</strong>
        </div>
      </section>
    </div>
  );
}

export default function WorkoutGuidance({
  initialExercise,
  initialLevel = "Beginner",
  onBack,
  onCompleteExercise,
  onSaveWorkoutToHistory,
  completedList = [],
  onLevelChange,
}) {
  // Determine initial level & exercise index directly
  const [selectedLevel, setSelectedLevel] = useState(() => {
    return initialLevel || "Beginner";
  });

  const [exerciseIndex, setExerciseIndex] = useState(() => {
    if (initialExercise?.id) {
      const match = findExerciseByStableId(initialExercise.id);
      if (match && match.category?.name === (initialLevel || "Beginner")) {
        const idx = match.category.exercises.findIndex((e) => e.id === match.exercise.id);
        return Math.max(0, idx);
      }
    }
    return 0;
  });

  // Compute active category and playlist
  const currentCategoryData = useMemo(() => {
    return (
      WORKOUT_CATEGORIES_DATA[selectedLevel] || WORKOUT_CATEGORIES_DATA.Beginner
    );
  }, [selectedLevel]);

  const currentPlaylist = currentCategoryData.exercises || [];
  const safeIndex = Math.min(Math.max(0, exerciseIndex), Math.max(0, currentPlaylist.length - 1));
  const currentExercise = currentPlaylist[safeIndex] || currentPlaylist[0];
  const nextExercise = safeIndex < currentPlaylist.length - 1 ? currentPlaylist[safeIndex + 1] : null;

  // Overall session stopwatch
  const [sessionElapsedTime, setSessionElapsedTime] = useState(0);

  // Rest Timer state between exercises
  const [isRestActive, setIsRestActive] = useState(false);
  const [restSeconds, setRestSeconds] = useState(30);

  // Completed tracking
  const [locallyCompletedIds, setLocallyCompletedIds] = useState(() => new Set());
  const [showSummary, setShowSummary] = useState(false);
  const [hasSavedHistory, setHasSavedHistory] = useState(false);

  const sessionCompletedIds = useMemo(() => {
    const combined = new Set(completedList);
    for (const id of locallyCompletedIds) {
      combined.add(id);
    }
    return combined;
  }, [completedList, locallyCompletedIds]);

  const isCurrentCompleted =
    sessionCompletedIds.has(currentExercise?.id) ||
    sessionCompletedIds.has(currentExercise?.name);

  // Overall session stopwatch
  useEffect(() => {
    const id = setInterval(() => {
      setSessionElapsedTime((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Rest Timer interval
  useEffect(() => {
    if (!isRestActive) return;

    const interval = setInterval(() => {
      setRestSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRestActive(false);
          if (nextExercise) {
            setExerciseIndex((idx) => idx + 1);
          }
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRestActive, nextExercise]);

  // Level switch
  const handleLevelChange = (lvl) => {
    setSelectedLevel(lvl);
    setExerciseIndex(0);
    setIsRestActive(false);
    if (onLevelChange) onLevelChange(lvl);
  };

  // Navigation handlers
  const handlePrevExercise = () => {
    if (safeIndex > 0) {
      setExerciseIndex(safeIndex - 1);
      setIsRestActive(false);
    }
  };

  const handleNextExercise = () => {
    if (safeIndex < currentPlaylist.length - 1) {
      setExerciseIndex(safeIndex + 1);
      setIsRestActive(false);
    } else {
      handleFinishAndSave();
      setShowSummary(true);
    }
  };

  // Exercise completion handler
  const handleExerciseComplete = (exId) => {
    const idToMark = exId || currentExercise.id;
    setLocallyCompletedIds((prev) => {
      const next = new Set(prev);
      next.add(idToMark);
      return next;
    });

    if (onCompleteExercise) {
      onCompleteExercise(idToMark);
    }

    if (nextExercise) {
      setIsRestActive(true);
      setRestSeconds(30);
    }
  };

  // Finish workout session and save
  const handleFinishAndSave = () => {
    if (hasSavedHistory) return;

    const completedInLevel = currentPlaylist.filter(
      (ex) => sessionCompletedIds.has(ex.id) || sessionCompletedIds.has(ex.name)
    );
    const estCalories = completedInLevel.reduce(
      (acc, ex) => acc + (ex.calories || 10),
      0
    );

    const todayDate = new Date().toISOString().split("T")[0];
    const summaryData = {
      id: `workout-${todayDate}-${selectedLevel.toLowerCase()}`,
      date: todayDate,
      level: selectedLevel,
      workoutType: `${selectedLevel} Routine`,
      exercisesCompleted: completedInLevel.length,
      totalExercises: currentPlaylist.length,
      durationMinutes: Math.max(1, Math.round(sessionElapsedTime / 60)),
      caloriesBurned: estCalories,
      completedExerciseIds: Array.from(sessionCompletedIds),
    };

    if (onSaveWorkoutToHistory) {
      onSaveWorkoutToHistory(summaryData);
    }
    setHasSavedHistory(true);
  };

  // Progress metrics
  const completedInLevel = currentPlaylist.filter(
    (ex) => sessionCompletedIds.has(ex.id) || sessionCompletedIds.has(ex.name)
  );
  const levelProgressPct = Math.round(
    (completedInLevel.length / (currentPlaylist.length || 1)) * 100
  );

  return (
    <div className="workout-guidance-page women-theme-root">
      {/* Top Navigation & Session Bar */}
      <header className="guidance-top-header">
        <div className="header-nav-left">
          {onBack && (
            <button
              type="button"
              className="back-btn"
              onClick={onBack}
              title="Return to previous screen"
            >
              ← Back
            </button>
          )}
          <div className="guidance-title-wrap">
            <span className="guidance-overline">FITTRACK AI HUMAN FITNESS TRAINER</span>
            <h1 className="guidance-heading">
              {currentExercise.name} • {selectedLevel} Level
            </h1>
          </div>
        </div>

        <div className="header-nav-right">
          <div className="session-stopwatch-badge" title="Total active session time">
            <span className="stopwatch-icon">⏱️</span>
            <span className="stopwatch-val">{formatTime(sessionElapsedTime)}</span>
          </div>

          <button
            type="button"
            className="finish-session-btn"
            onClick={() => {
              handleFinishAndSave();
              setShowSummary(true);
            }}
          >
            🏆 Finish Workout Session
          </button>
        </div>
      </header>

      {/* 3 Categories Primary Level Selector */}
      <nav className="level-selection-bar" aria-label="Workout Level Selection">
        <div className="level-pills-group">
          {["Beginner", "Intermediate", "Advanced"].map((lvl) => {
            const isSelected = selectedLevel === lvl;
            const lvlData = WORKOUT_CATEGORIES_DATA[lvl];
            return (
              <button
                key={lvl}
                type="button"
                className={`level-pill-btn ${isSelected ? "active" : ""}`}
                onClick={() => handleLevelChange(lvl)}
              >
                <span className="pill-icon">{lvlData?.icon || "⚡"}</span>
                <span className="pill-name">{lvl}</span>
                <span className="pill-duration">{lvlData?.duration}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Horizontal Exercise Stepper Playlist */}
      <div className="exercise-playlist-strip">
        <div className="strip-info">
          <span className="strip-title">{selectedLevel} Training Routine</span>
          <span className="strip-progress">
            {completedInLevel.length}/{currentPlaylist.length} Completed ({levelProgressPct}%)
          </span>
        </div>

        <div className="playlist-chips-scroll">
          {currentPlaylist.map((ex, idx) => {
            const isDone =
              sessionCompletedIds.has(ex.id) || sessionCompletedIds.has(ex.name);
            const isCurrent = idx === safeIndex;
            return (
              <button
                key={ex.id}
                type="button"
                className={`playlist-chip ${isCurrent ? "current" : ""} ${isDone ? "done" : ""}`}
                onClick={() => {
                  setExerciseIndex(idx);
                  setIsRestActive(false);
                }}
                title={`${ex.name} (${ex.target})`}
              >
                <span className="chip-num">{isDone ? "✓" : idx + 1}</span>
                <span className="chip-name">{ex.name}</span>
                <span className="chip-target">{ex.target}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rest Timer Banner (Between Exercises) */}
      {isRestActive && (
        <section className="rest-timer-banner" aria-live="polite">
          <div className="rest-left">
            <span className="rest-icon">🧘‍♀️</span>
            <div className="rest-text-block">
              <strong className="rest-title">Rest &amp; Recovery Interval</strong>
              <p className="rest-sub">
                Breathe deeply and hydrate. Next exercise:{" "}
                <strong>{nextExercise ? nextExercise.name : "Routine Complete"}</strong>
              </p>
            </div>
          </div>

          <div className="rest-center">
            <div className="rest-seconds-display">{restSeconds}s</div>
            <div className="rest-adjust-buttons">
              <button
                type="button"
                className="btn-rest-adj"
                onClick={() => setRestSeconds((s) => Math.max(5, s - 10))}
                title="Subtract 10 seconds"
              >
                -10s
              </button>
              <button
                type="button"
                className="btn-rest-adj"
                onClick={() => setRestSeconds((s) => s + 10)}
                title="Add 10 seconds"
              >
                +10s
              </button>
            </div>
          </div>

          <div className="rest-right">
            <button
              type="button"
              className="btn btn-primary btn-skip-rest"
              onClick={() => {
                setIsRestActive(false);
                setRestSeconds(30);
                if (nextExercise) {
                  setExerciseIndex(safeIndex + 1);
                }
              }}
            >
              Skip Rest &amp; Continue →
            </button>
          </div>
        </section>
      )}

      {/* Main Active Exercise Panel (Cleanly keyed by currentExercise.id) */}
      <ActiveExercisePanel
        key={currentExercise.id}
        currentExercise={currentExercise}
        selectedLevel={selectedLevel}
        currentCategoryData={currentCategoryData}
        isCurrentCompleted={isCurrentCompleted}
        canGoPrev={safeIndex > 0}
        isLastExercise={safeIndex === currentPlaylist.length - 1}
        onPrev={handlePrevExercise}
        onNext={handleNextExercise}
        onComplete={handleExerciseComplete}
      />

      {/* Workout Completion Summary Modal */}
      {showSummary && (
        <div className="summary-modal-backdrop">
          <div className="summary-modal-card">
            <div className="modal-icon-header">🎉</div>
            <h2 className="modal-header-title">{selectedLevel} Routine Completed!</h2>
            <p className="modal-subtitle">
              Outstanding commitment! You completed your exercises with controlled cadence and verified AI human fitness trainer demonstrations.
            </p>

            <div className="summary-stats-grid">
              <div className="summary-stat-box">
                <span className="stat-label">LEVEL</span>
                <strong className="stat-val">{selectedLevel}</strong>
              </div>
              <div className="summary-stat-box">
                <span className="stat-label">COMPLETED</span>
                <strong className="stat-val">
                  {completedInLevel.length}/{currentPlaylist.length}
                </strong>
              </div>
              <div className="summary-stat-box">
                <span className="stat-label">ACTIVE TIME</span>
                <strong className="stat-val">{formatTime(sessionElapsedTime)}</strong>
              </div>
              <div className="summary-stat-box">
                <span className="stat-label">ENERGY BURNED</span>
                <strong className="stat-val text-rose">
                  ~{completedInLevel.reduce((acc, ex) => acc + (ex.calories || 8), 0)} kcal
                </strong>
              </div>
            </div>

            <div className="modal-actions-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleFinishAndSave();
                  if (onBack) onBack();
                }}
              >
                💾 Save &amp; Return to Tracker
              </button>
              <button
                type="button"
                className="btn btn-outline"
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
