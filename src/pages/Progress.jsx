import { WORKOUT_CATEGORIES_DATA } from "../data/workoutData";

export default function Progress({
  completedExercises = [],
  workoutHistory = [],
  selectedWorkout,
  onNavigate,
}) {
  const totalSessions = workoutHistory.length;

  const totalCaloriesBurned =
    workoutHistory.reduce((acc, curr) => acc + (curr.calories || 0), 0) +
    completedExercises.length * 8;

  // Level breakdowns
  const beginnerEx = WORKOUT_CATEGORIES_DATA.Beginner?.exercises || [];
  const beginnerDone = beginnerEx.filter((e) => completedExercises.includes(e.id));
  const beginnerPct =
    beginnerEx.length > 0
      ? Math.round((beginnerDone.length / beginnerEx.length) * 100)
      : 0;

  const intermediateEx = WORKOUT_CATEGORIES_DATA.Intermediate?.exercises || [];
  const intermediateDone = intermediateEx.filter((e) =>
    completedExercises.includes(e.id)
  );
  const intermediatePct =
    intermediateEx.length > 0
      ? Math.round((intermediateDone.length / intermediateEx.length) * 100)
      : 0;

  const advancedEx = WORKOUT_CATEGORIES_DATA.Advanced?.exercises || [];
  const advancedDone = advancedEx.filter((e) => completedExercises.includes(e.id));
  const advancedPct =
    advancedEx.length > 0
      ? Math.round((advancedDone.length / advancedEx.length) * 100)
      : 0;

  return (
    <div className="progress-page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <span className="page-overline">ANALYTICS &amp; MASTERY</span>
          <h1 className="page-title">Training Progress &amp; Level Metrics</h1>
          <p className="page-subtitle">
            Track your exercise completion and level mastery.
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate("tracker")}
          >
            🎯 Continue Daily Session
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <section className="progress-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper icon-indigo">🏆</div>
          <div className="stat-info">
            <span className="stat-label">TOTAL WORKOUT SESSIONS</span>
            <h3 className="stat-value">{totalSessions}</h3>
            <span className="stat-sub">Completed &amp; Logged</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-emerald">💪</div>
          <div className="stat-info">
            <span className="stat-label">EXERCISES MASTERED</span>
            <h3 className="stat-value">{completedExercises.length}</h3>
            <span className="stat-sub">Across All 3 Levels</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-rose">🔥</div>
          <div className="stat-info">
            <span className="stat-label">ESTIMATED ENERGY BURNED</span>
            <h3 className="stat-value">
              {totalCaloriesBurned} <span className="stat-unit">kcal</span>
            </h3>
            <span className="stat-sub">From Completed Sessions</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-sky">🎯</div>
          <div className="stat-info">
            <span className="stat-label">ACTIVE PROGRAM</span>
            <h3 className="stat-value">{selectedWorkout}</h3>
            <span className="stat-sub">Currently In Training</span>
          </div>
        </div>
      </section>

      {/* Level-by-Level Isolation Breakdown */}
      <section className="progress-section">
        <div className="section-title-row">
          <div>
            <h2 className="section-title">Level Progress Breakdown</h2>
            <p className="section-subtitle">
              Mastered movements update your progress in each training tier.
            </p>
          </div>
        </div>

        <div className="level-cards-grid">
          {/* Beginner Card */}
          <div className="level-progress-card border-beginner">
            <div className="level-card-top">
              <div className="level-badge-title">
                <span className="level-icon-badge bg-emerald">🌱</span>
                <div>
                  <h3 className="level-title">Beginner Routine</h3>
                  <span className="level-meta">5 Foundations • 20 min</span>
                </div>
              </div>
              <div className="level-pct-badge text-emerald">{beginnerPct}%</div>
            </div>

            <div className="level-progress-bar-wrap">
              <div
                className="level-progress-bar-fill bg-emerald"
                style={{ width: `${beginnerPct}%` }}
              ></div>
            </div>
            <span className="level-fraction-text">
              {beginnerDone.length} of {beginnerEx.length} exercises completed
            </span>

            <div className="level-checklist">
              {beginnerEx.map((ex) => {
                const done = completedExercises.includes(ex.id);
                return (
                  <div key={ex.id} className={`checklist-row ${done ? "checked" : ""}`}>
                    <span className="check-bullet">{done ? "✓" : "○"}</span>
                    <span className="check-name">{ex.name}</span>
                    <span className="check-target">{ex.target}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Intermediate Card */}
          <div className="level-progress-card border-intermediate">
            <div className="level-card-top">
              <div className="level-badge-title">
                <span className="level-icon-badge bg-amber">⚡</span>
                <div>
                  <h3 className="level-title">Intermediate Routine</h3>
                  <span className="level-meta">6 Exercises • 30 min</span>
                </div>
              </div>
              <div className="level-pct-badge text-amber">{intermediatePct}%</div>
            </div>

            <div className="level-progress-bar-wrap">
              <div
                className="level-progress-bar-fill bg-amber"
                style={{ width: `${intermediatePct}%` }}
              ></div>
            </div>
            <span className="level-fraction-text">
              {intermediateDone.length} of {intermediateEx.length} exercises completed
            </span>

            <div className="level-checklist">
              {intermediateEx.map((ex) => {
                const done = completedExercises.includes(ex.id);
                return (
                  <div key={ex.id} className={`checklist-row ${done ? "checked" : ""}`}>
                    <span className="check-bullet">{done ? "✓" : "○"}</span>
                    <span className="check-name">{ex.name}</span>
                    <span className="check-target">{ex.target}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advanced Card */}
          <div className="level-progress-card border-advanced">
            <div className="level-card-top">
              <div className="level-badge-title">
                <span className="level-icon-badge bg-rose">🔥</span>
                <div>
                  <h3 className="level-title">Advanced Routine</h3>
                  <span className="level-meta">6 High-Intensity • 45 min</span>
                </div>
              </div>
              <div className="level-pct-badge text-rose">{advancedPct}%</div>
            </div>

            <div className="level-progress-bar-wrap">
              <div
                className="level-progress-bar-fill bg-rose"
                style={{ width: `${advancedPct}%` }}
              ></div>
            </div>
            <span className="level-fraction-text">
              {advancedDone.length} of {advancedEx.length} exercises completed
            </span>

            <div className="level-checklist">
              {advancedEx.map((ex) => {
                const done = completedExercises.includes(ex.id);
                return (
                  <div key={ex.id} className={`checklist-row ${done ? "checked" : ""}`}>
                    <span className="check-bullet">{done ? "✓" : "○"}</span>
                    <span className="check-name">{ex.name}</span>
                    <span className="check-target">{ex.target}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
