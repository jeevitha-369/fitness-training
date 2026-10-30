import { useMemo } from "react";
import { WORKOUT_CATEGORIES_DATA } from "../data/workoutData";
import { DIET_PLANS } from "../data/dietData";
import WaterTracker from "../components/WaterTracker";
import WeeklySummary from "../components/WeeklySummary";

// Curated Daily Motivational Messages
const MOTIVATIONAL_QUOTES = [
  {
    quote: "Action is the foundational key to all success. Even 15 minutes of steady movement changes your entire day.",
    author: "Daily Consistency Rule",
  },
  {
    quote: "You don't have to be extreme, just consistent. Small daily improvements over time lead to stunning results.",
    author: "FitTrack Philosophy",
  },
  {
    quote: "Proper form and controlled breathing turn simple movements into powerful transformations.",
    author: "Athletic Precision",
  },
  {
    quote: "Nourish your body with real foods, hydrate steadily, and celebrate every completed repetition.",
    author: "Holistic Wellness",
  },
  {
    quote: "The hardest repetition is always getting off the couch. You've showed up today — make it count!",
    author: "Movement Mindset",
  },
];

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

  const totalExercisesDone =
    workoutHistory.reduce((acc, curr) => acc + (curr.count || 0), 0) +
    completedExercises.length;

  const totalCaloriesBurned =
    workoutHistory.reduce((acc, curr) => acc + (curr.calories || 0), 0) +
    completedInCurrent.reduce((acc, ex) => acc + (ex.calories || 8), 0);

  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Today's Meal Checklist Status from localStorage
  const mealStatus = useMemo(() => {
    const d = new Date();
    const todayKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const storageKey = `fittrack_meals_${todayKey}_${selectedWorkout}`;
    let completedCount = 0;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const arr = JSON.parse(raw);
        completedCount = Array.isArray(arr) ? arr.length : 0;
      }
    } catch {
      completedCount = 0;
    }
    const totalMeals = DIET_PLANS[selectedWorkout]?.meals?.length || 5;
    const pct = Math.min(100, Math.round((completedCount / totalMeals) * 100));
    return { completedCount, totalMeals, pct };
  }, [selectedWorkout]);

  // Daily Rotating Quote
  const dailyQuote = useMemo(() => {
    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );
    return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
  }, []);

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
      {/* Welcome Hero Banner */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <div className="hero-date-badge">📅 {currentDate}</div>
          <h1 className="hero-greeting">
            Welcome Back, <span className="text-gradient">{profileName || "Athlete"}</span>!
          </h1>
          <p className="hero-subtext">
            Level: <strong>{fitnessLevel}</strong> • Goal: <strong>{fitnessGoal}</strong>. Follow your daily workouts, nutrition, and progress.
          </p>
        </div>

        <div className="hero-action-buttons">
          <button
            type="button"
            className="btn btn-primary hero-btn"
            onClick={() => onNavigate("tracker")}
          >
            🎯 Start Workout
          </button>
          <button
            type="button"
            className="btn btn-secondary hero-btn"
            onClick={() => onNavigate("dietPlan")}
          >
            🥗 Diet Plan
          </button>
        </div>
      </section>

      {/* Motivational Quote Banner */}
      <section className="motivational-quote-card">
        <div className="quote-badge">🔥 DAILY MOTIVATION</div>
        <p className="quote-text">&ldquo;{dailyQuote.quote}&rdquo;</p>
        <span className="quote-author">— {dailyQuote.author}</span>
      </section>

      {/* Quick Metrics Grid (4 Cards) */}
      <section className="dashboard-metrics-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper icon-indigo">⚡</div>
          <div className="stat-info">
            <span className="stat-label">PROGRAM PROGRESS</span>
            <div className="stat-progress-wrap">
              <span className="stat-value">{progress}%</span>
              <span className="stat-sub">
                {completedInCurrent.length}/{exercises.length} Exercises Done
              </span>
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
          <div className="stat-icon-wrapper icon-emerald">🥗</div>
          <div className="stat-info">
            <span className="stat-label">TODAY&apos;S MEALS</span>
            <div className="stat-progress-wrap">
              <span className="stat-value">{mealStatus.completedCount}/{mealStatus.totalMeals}</span>
              <span className="stat-sub">
                {mealStatus.pct}% Meals Logged
              </span>
            </div>
            <div className="stat-progress-bar">
              <div
                className="stat-progress-fill bg-emerald"
                style={{ width: `${mealStatus.pct}%` }}
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
            <h3 className="stat-value">
              {totalCaloriesBurned} <span className="stat-unit">kcal</span>
            </h3>
            <span className="stat-sub">{totalExercisesDone} Exercises Mastered</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Left Active Workout, Right Sidebar */}
      <div className="dashboard-main-grid">
        {/* Left Column: Active Workout Preview + Weekly Activity Summary */}
        <div className="dashboard-left-column">
          <section className="dashboard-card active-workout-card">
            <div className="card-header-row">
              <div>
                <span className="card-overline">TODAY&apos;S ASSIGNED SESSION</span>
                <h2 className="card-title">
                  {selectedWorkout} Workout Routine
                </h2>
              </div>
              <span className={`badge-lg ${getDifficultyColor(selectedWorkout)}`}>
                ⏱️ {WORKOUT_CATEGORIES_DATA[selectedWorkout]?.duration || "20-30 min"}
              </span>
            </div>

            <p className="card-desc">
              {WORKOUT_CATEGORIES_DATA[selectedWorkout]?.description ||
                "Perform each movement with controlled pacing and proper form."}
            </p>

            <div className="exercise-preview-list">
              {exercises.map((ex, idx) => {
                const isDone = completedExercises.includes(ex.id);
                return (
                  <div
                    key={ex.id || idx}
                    className={`exercise-preview-item ${isDone ? "completed" : ""}`}
                    onClick={() => onOpenExercise && onOpenExercise(ex, selectedWorkout)}
                    role="button"
                    tabIndex={0}
                    title={`Click to watch human demonstration video for ${ex.name}`}
                  >
                    <div className="item-left">
                      <span className="item-num">{idx + 1}</span>
                      <div className="item-names">
                        <strong>{ex.name}</strong>
                        <span className="item-target">
                          {ex.target} • ~{ex.calories || 8} kcal
                        </span>
                      </div>
                    </div>
                    <div className="item-right">
                      <span className="video-badge" title="Verified human demonstration video available">
                        🎥 Video Guide
                      </span>
                      {isDone ? (
                        <span className="status-done-pill">✓ Completed</span>
                      ) : (
                        <span className="status-pending-pill">Watch Video →</span>
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
                🎯 Start Workout
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  if (exercises[0] && onOpenExercise) {
                    onOpenExercise(exercises[0], selectedWorkout);
                  } else {
                    onNavigate("exerciseGuide");
                  }
                }}
              >
                🎥 Video Guide
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onNavigate("dietPlan")}
              >
                🥗 Diet Plan
              </button>
            </div>
          </section>

          {/* Weekly Summary Widget */}
          <WeeklySummary
            workoutHistory={workoutHistory}
            onNavigate={onNavigate}
          />
        </div>

        {/* Right Sidebar Column: Switcher, Water Tracker, Recent History */}
        <div className="dashboard-sidebar-column">
          {/* Water Intake Tracker Widget */}
          <WaterTracker />

          {/* Quick Level Switcher */}
          <div className="dashboard-card quick-switch-card">
            <div className="card-header-row">
              <h3 className="card-title-sm">⚡ Workout Level Switcher</h3>
            </div>
            <p className="text-muted-sm">
              Switch your active workout level anytime.
            </p>
            <div className="level-switch-buttons">
              {["Beginner", "Intermediate", "Advanced"].map((lvl) => {
                const isSelected = selectedWorkout === lvl;
                const lvlData = WORKOUT_CATEGORIES_DATA[lvl];
                return (
                  <button
                    key={lvl}
                    type="button"
                    className={`level-switch-btn ${isSelected ? "active" : ""}`}
                    onClick={() => onSelectWorkout(lvl)}
                  >
                    <div className="switch-btn-content">
                      <span className="switch-btn-title">
                        {lvlData?.icon || "⚡"} {lvl}
                      </span>
                      <span className="switch-btn-sub">
                        {lvlData?.duration || "30 min"} • {lvlData?.exercises?.length || 5} exercises
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
                      <strong className="recent-item-level">{entry.level} Routine</strong>
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
              15–20 minutes of daily consistency delivers far better results than occasional exhausted workouts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
