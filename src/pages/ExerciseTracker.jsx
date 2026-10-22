import { useState, useEffect } from "react";
import { WORKOUT_CATEGORIES_DATA } from "../data/workoutData";

export default function ExerciseTracker({
  selectedWorkout,
  exercises,
  completedExercises,
  onToggleExercise,
  onOpenExerciseGuide,
  onFinishWorkout,
  onResetWorkout,
  onNavigate,
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [lastSavedSummary, setLastSavedSummary] = useState(null);

  // Active session timer
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const completedInCurrent = exercises.filter((ex) =>
    completedExercises.includes(ex.id)
  );

  const progress =
    exercises.length > 0
      ? Math.round((completedInCurrent.length / exercises.length) * 100)
      : 0;

  const currentCalories = completedInCurrent.reduce(
    (acc, ex) => acc + (ex.calories || 6),
    0
  );

  const handleFinishClick = () => {
    if (completedInCurrent.length === 0) {
      alert("Please complete at least one exercise before saving your session.");
      return;
    }

    const durationMin = Math.max(1, Math.round(elapsedSeconds / 60));
    const summary = {
      level: selectedWorkout,
      count: completedInCurrent.length,
      totalExercises: exercises.length,
      exerciseIds: completedInCurrent.map((e) => e.id),
      exerciseNames: completedInCurrent.map((e) => e.name),
      calories: currentCalories || (completedInCurrent.length * 8),
      durationMinutes: durationMin,
    };

    onFinishWorkout(summary);
    setLastSavedSummary(summary);
    setShowCelebrationModal(true);
    setIsTimerActive(false);
  };

  const handleResetClick = () => {
    const confirmReset = window.confirm(
      `Are you sure you want to reset your progress for ${selectedWorkout}? Completed exercises for other workout levels will NOT be affected.`
    );
    if (confirmReset) {
      onResetWorkout(selectedWorkout);
      setElapsedSeconds(0);
    }
  };

  const planMeta = WORKOUT_CATEGORIES_DATA[selectedWorkout] || {
    intensity: "Custom",
    duration: "20 min",
    description: "Daily exercise routine.",
  };

  return (
    <div className="tracker-page-container">
      {/* Top Banner */}
      <section className="tracker-header-card">
        <div className="tracker-header-info">
          <div className="tracker-tag-row">
            <span className="tracker-badge-pill">ACTIVE WORKOUT SESSION</span>
            <span className="tracker-intensity-tag">{planMeta.intensity || "Targeted"}</span>
            <span className="tracker-duration-tag">⏱️ Est. {planMeta.duration || "25 min"}</span>
          </div>
          <h1 className="tracker-title">{selectedWorkout} Workout Routine</h1>
          <p className="tracker-subtitle">
            Perform each movement with controlled tempo. Click on any exercise name to view 3D motion simulations and verified human form demonstrations.
          </p>
        </div>
        <div className="tracker-header-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onNavigate("workouts")}
          >
            🔄 Switch Training Plan
          </button>
        </div>
      </section>

      {/* Main Grid: Left Exercises, Right Progress / Controls */}
      <div className="tracker-layout-grid">
        {/* Left Column: Exercises List */}
        <section className="tracker-exercises-card">
          <div className="exercise-card-header">
            <div>
              <h2 className="card-section-title">Workout Exercise Checklist</h2>
              <span className="text-muted-sm">
                Mark items as completed as you finish each set or timed interval.
              </span>
            </div>
            <span className="badge-count-pill">
              {completedInCurrent.length} of {exercises.length} Completed
            </span>
          </div>

          <div className="tracker-exercise-list">
            {exercises.map((exercise, index) => {
              const isCompleted = completedExercises.includes(exercise.id);

              return (
                <div
                  key={exercise.id}
                  className={`tracker-exercise-row ${isCompleted ? "row-completed" : ""}`}
                >
                  <div className="row-left">
                    <span className={`row-index-badge ${isCompleted ? "done" : ""}`}>
                      {isCompleted ? "✓" : index + 1}
                    </span>

                    <div className="row-details">
                      <button
                        type="button"
                        className="exercise-link-title"
                        onClick={() => onOpenExerciseGuide(exercise)}
                        title="Click to open full form guidance and 3D simulation"
                      >
                        {exercise.name}
                      </button>
                      <div className="row-meta-tags">
                        <span className="meta-target-chip">
                          {exercise.isTimed ? "⏱️ " : "🎯 "}
                          {exercise.target}
                        </span>
                        <span className="meta-cal-chip">
                          🔥 ~{exercise.calories || 6} kcal
                        </span>
                        {exercise.hasRealHumanVideo && (
                          <span className="meta-video-chip">
                            🎥 Human Video
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row-right">
                    <button
                      type="button"
                      className="btn-guidance-peek"
                      onClick={() => onOpenExerciseGuide(exercise)}
                      title="Open 3D guide & video"
                    >
                      🎥 Form Guide
                    </button>

                    <button
                      type="button"
                      className={`btn-completion-toggle ${isCompleted ? "completed" : ""}`}
                      onClick={() => onToggleExercise(exercise.id)}
                    >
                      {isCompleted ? (
                        <>
                          <span className="check-icon">✓</span> Completed
                        </>
                      ) : (
                        "Mark Complete"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: Workout Summary & Finish Actions */}
        <div className="tracker-sidebar-column">
          <div className="tracker-summary-card">
            <h3 className="sidebar-card-title">Session Performance</h3>

            {/* Progress Gauge */}
            <div className="tracker-gauge-wrapper">
              <div className="gauge-percentage">{progress}%</div>
              <span className="gauge-label">
                {completedInCurrent.length}/{exercises.length} Exercises Done
              </span>
              <div className="tracker-progress-track">
                <div
                  className="tracker-progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="session-metrics-list">
              <div className="session-metric-item">
                <span className="metric-name">Active Session Time</span>
                <strong className="metric-val">{formatTimer(elapsedSeconds)}</strong>
              </div>
              <div className="session-metric-item">
                <span className="metric-name">Estimated Energy Burned</span>
                <strong className="metric-val text-rose">{currentCalories} kcal</strong>
              </div>
              <div className="session-metric-item">
                <span className="metric-name">Target Level</span>
                <strong className="metric-val">{selectedWorkout}</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="tracker-action-buttons">
              <button
                type="button"
                className="btn btn-primary btn-block btn-finish"
                onClick={handleFinishClick}
                disabled={completedInCurrent.length === 0}
              >
                🏆 Finish &amp; Log Workout
              </button>

              <button
                type="button"
                className="btn btn-outline btn-block btn-reset"
                onClick={handleResetClick}
              >
                ↺ Reset Progress for {selectedWorkout}
              </button>
            </div>
          </div>

          {/* Quick Tip Card */}
          <div className="guidance-tip-box">
            <span className="tip-icon">💡</span>
            <div className="tip-body">
              <strong>Form First, Speed Second</strong>
              <p>
                Rushing through reps reduces muscle activation and increases injury risk. Click &quot;Form Guide&quot; on any movement to inspect the correct angles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebrationModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="celebration-icon">🎉</div>
            <h2 className="modal-title">Workout Completed &amp; Saved!</h2>
            <p className="modal-desc">
              Outstanding effort! Your workout session has been recorded into your official Workout History and your Dashboard has been updated.
            </p>

            <div className="modal-summary-box">
              <div className="modal-stat">
                <span className="stat-label">WORKOUT</span>
                <strong>{lastSavedSummary?.level}</strong>
              </div>
              <div className="modal-stat">
                <span className="stat-label">EXERCISES</span>
                <strong>{lastSavedSummary?.count} completed</strong>
              </div>
              <div className="modal-stat">
                <span className="stat-label">DURATION</span>
                <strong>{lastSavedSummary?.durationMinutes} min</strong>
              </div>
              <div className="modal-stat">
                <span className="stat-label">CALORIES</span>
                <strong className="text-rose">{lastSavedSummary?.calories} kcal</strong>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setShowCelebrationModal(false);
                  onNavigate("history");
                }}
              >
                ⏱️ View in Workout History
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowCelebrationModal(false);
                  onNavigate("dashboard");
                }}
              >
                📊 Go to Dashboard
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowCelebrationModal(false)}
              >
                Stay in Tracker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
