import { WORKOUT_CATEGORIES_DATA } from "../data/workoutData";

export default function Dashboard({
  profileName,
  fitnessLevel,
  fitnessGoal,
  selectedWorkout,
  exercises,
  completedExercises,
  workoutHistory,
  onNavigate,
  onSelectWorkout,
  onOpenExercise,
}) {
  const completedInCurrent = exercises.filter((ex) =>
    completedExercises.includes(ex.id)
  );

  const progress =
    exercises.length > 0
      ? Math.round((completedInCurrent.length / exercises.length) * 100)
      : 0;

  const totalWorkouts = workoutHistory.length;

  const totalExercisesDone = workoutHistory.reduce(
    (acc, curr) => acc + (curr.count || 0),
    0
  ) + completedExercises.length;

  const totalCaloriesBurned = workoutHistory.reduce(
    (acc, curr) => acc + (curr.calories || 0),
    0
  ) + completedInCurrent.reduce((acc, ex) => acc + (ex.calories || 6), 0);

  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "badge-easy";
      case "intermediate":
        return "badge-medium";
      case "advanced":
        return "badge-hard";
      default:
        return "badge-neutral";
    }
  };

  const recentHistory = workoutHistory.slice(-3).reverse();

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <span>FITNESS DASHBOARD • {currentDate}</span>
          </div>
          <h1 className="hero-title">
            Welcome back, <span className="highlight-name">{profileName || "Jeevi D"}</span>!
          </h1>
          <p className="hero-subtitle">
            Goal: <strong className="goal-tag">{fitnessGoal || "Stay Active & Build Strength"}</strong> • Primary Level: <strong className="level-tag">{fitnessLevel || "Beginner"}</strong>
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate("tracker")}
          >
            ⚡ Start Today&apos;s Workout
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onNavigate("workouts")}
          >
            📋 Explore All Plans
          </button>
        </div>
      </section>

      {/* 4 Stats Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper icon-indigo">📋</div>
          <div className="stat-info">
            <span className="stat-label">TODAY&apos;S WORKOUT</span>
            <h3 className="stat-value">{selectedWorkout}</h3>
            <span className={`status-pill ${getDifficultyColor(selectedWorkout)}`}>
              {exercises.length} Exercises Scheduled
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-emerald">📈</div>
          <div className="stat-info">
            <span className="stat-label">CURRENT COMPLETION</span>
            <div className="stat-value-row">
              <h3 className="stat-value">{progress}%</h3>
              <span className="stat-sub">{completedInCurrent.length}/{exercises.length} Done</span>
            </div>
            <div className="stat-progress-bar">
              <div
                className="stat-progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-sky">🏆</div>
          <div className="stat-info">
            <span className="stat-label">TOTAL WORKOUTS</span>
            <h3 className="stat-value">{totalWorkouts}</h3>
            <span className="stat-sub">Completed Sessions Logged</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-rose">🔥</div>
          <div className="stat-info">
            <span className="stat-label">TOTAL CALORIES</span>
            <h3 className="stat-value">{totalCaloriesBurned} <span className="stat-unit">kcal</span></h3>
            <span className="stat-sub">{totalExercisesDone} Exercises Mastered</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Left Active Workout, Right Activity & Switcher */}
      <div className="dashboard-main-grid">
        {/* Left: Active Workout Preview */}
        <section className="dashboard-card active-workout-card">
          <div className="card-header-row">
            <div>
              <span className="card-overline">TODAY&apos;S ASSIGNED SESSION</span>
              <h2 className="card-title">{selectedWorkout} Training Plan</h2>
            </div>
            <span className={`badge-lg ${getDifficultyColor(selectedWorkout)}`}>
              {WORKOUT_CATEGORIES_DATA[selectedWorkout]?.duration || "20-30 min"}
            </span>
          </div>

          <p className="card-desc">
            {WORKOUT_CATEGORIES_DATA[selectedWorkout]?.description ||
              "Follow your scheduled movements with proper form, steady cadence, and breathing control."}
          </p>

          <div className="exercise-preview-list">
            {exercises.map((ex, idx) => {
              const isDone = completedExercises.includes(ex.id);
              return (
                <div
                  key={ex.id || idx}
                  className={`exercise-preview-item ${isDone ? "completed" : ""}`}
                  onClick={() => onOpenExercise && onOpenExercise(ex)}
                  role="button"
                  tabIndex={0}
                  title="Click to view 3D form and real demonstration"
                >
                  <div className="item-left">
                    <span className="item-num">{idx + 1}</span>
                    <div className="item-names">
                      <strong>{ex.name}</strong>
                      <span className="item-target">{ex.target} • {ex.calories || 6} kcal</span>
                    </div>
                  </div>
                  <div className="item-right">
                    {ex.hasRealHumanVideo && (
                      <span className="video-badge" title="Verified human video demo available">
                        🎥 Human Video
                      </span>
                    )}
                    {isDone ? (
                      <span className="status-done-pill">✓ Completed</span>
                    ) : (
                      <span className="status-pending-pill">View Guide →</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card-actions-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigate("tracker")}
            >
              🎯 Open Exercise Tracker
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                if (exercises[0] && onOpenExercise) {
                  onOpenExercise(exercises[0]);
                } else {
                  onNavigate("exerciseGuide");
                }
              }}
            >
              🎥 Form &amp; 3D Video Guide
            </button>
          </div>
        </section>

        {/* Right Column: Switcher & Recent History */}
        <div className="dashboard-sidebar-column">
          {/* Quick Level Switcher */}
          <div className="dashboard-card quick-switch-card">
            <div className="card-header-row">
              <h3 className="card-title-sm">⚡ Quick Level Switcher</h3>
            </div>
            <p className="text-muted-sm">
              Change today&apos;s active plan. Progress is isolated and saved separately for each level.
            </p>
            <div className="level-switch-buttons">
              {["Beginner", "Intermediate", "Advanced"].map((lvl) => {
                const isSelected = selectedWorkout === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    className={`level-switch-btn ${isSelected ? "active" : ""}`}
                    onClick={() => onSelectWorkout(lvl)}
                  >
                    <div className="switch-btn-content">
                      <span className="switch-btn-title">{lvl}</span>
                      <span className="switch-btn-sub">
                        {WORKOUT_CATEGORIES_DATA[lvl]?.duration || "30 min"}
                      </span>
                    </div>
                    {isSelected && <span className="active-dot">● Active</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent History Card */}
          <div className="dashboard-card recent-history-card">
            <div className="card-header-row">
              <h3 className="card-title-sm">⏱️ Recent Sessions</h3>
              <button
                type="button"
                className="link-btn"
                onClick={() => onNavigate("history")}
              >
                View All →
              </button>
            </div>

            {recentHistory.length === 0 ? (
              <div className="empty-sub-card">
                <span className="empty-icon">📝</span>
                <p>No workout sessions logged yet.</p>
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={() => onNavigate("tracker")}
                >
                  Log Your First Workout
                </button>
              </div>
            ) : (
              <div className="recent-history-list">
                {recentHistory.map((entry, index) => (
                  <div key={entry.id || index} className="recent-history-item">
                    <div className="recent-item-icon">✓</div>
                    <div className="recent-item-info">
                      <strong className="recent-item-level">{entry.level}</strong>
                      <span className="recent-item-meta">
                        {entry.date} • {entry.count} exercises • {entry.calories} kcal
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pro Training Tip Card */}
          <div className="dashboard-card pro-tip-card">
            <div className="pro-tip-header">
              <span className="tip-badge">PRO TIP</span>
              <span className="tip-title">Consistency Over Intensity</span>
            </div>
            <p className="pro-tip-text">
              Completing 15–20 minutes of correct form and steady movement every day delivers far greater long-term cardiovascular and muscular adaptation than occasional exhausted workouts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
