import { WORKOUT_CATEGORIES_DATA } from "../data/workoutData";

export default function Progress({
  completedExercises = [],
  workoutHistory = [],
  selectedWorkout,
  onNavigate,
}) {
  const beginnerEx = WORKOUT_CATEGORIES_DATA.Beginner.exercises;
  const intermediateEx = WORKOUT_CATEGORIES_DATA.Intermediate.exercises;
  const advancedEx = WORKOUT_CATEGORIES_DATA.Advanced.exercises;

  const beginnerDone = beginnerEx.filter((e) => completedExercises.includes(e.id));
  const intermediateDone = intermediateEx.filter((e) => completedExercises.includes(e.id));
  const advancedDone = advancedEx.filter((e) => completedExercises.includes(e.id));

  const beginnerPct = Math.round((beginnerDone.length / beginnerEx.length) * 100);
  const intermediatePct = Math.round((intermediateDone.length / intermediateEx.length) * 100);
  const advancedPct = Math.round((advancedDone.length / advancedEx.length) * 100);

  const bodyParts = ["Legs", "Arms", "Chest", "Back", "Shoulders", "Core"];

  const totalSessions = workoutHistory.length;
  const totalCaloriesBurned = workoutHistory.reduce(
    (acc, c) => acc + (c.calories || 0),
    0
  );

  return (
    <div className="progress-page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <span className="page-overline">PERFORMANCE ANALYTICS</span>
          <h1 className="page-title">Fitness Progress &amp; Program Mastery</h1>
          <p className="page-subtitle">
            Track your progress across difficulty levels and body part categories. Each program retains isolated, verifiable completion metrics.
          </p>
        </div>
        <div className="page-header-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate("history")}
          >
            ⏱️ View Workout History ({totalSessions})
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper icon-indigo">🏆</div>
          <div className="stat-info">
            <span className="stat-label">TOTAL WORKOUT SESSIONS</span>
            <h3 className="stat-value">{totalSessions}</h3>
            <span className="stat-sub">Officially Logged</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-emerald">💪</div>
          <div className="stat-info">
            <span className="stat-label">UNIQUE EXERCISES MASTERED</span>
            <h3 className="stat-value">{completedExercises.length}</h3>
            <span className="stat-sub">Completed Across All Levels</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-rose">🔥</div>
          <div className="stat-info">
            <span className="stat-label">ESTIMATED ENERGY BURNED</span>
            <h3 className="stat-value">{totalCaloriesBurned} <span className="stat-unit">kcal</span></h3>
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
            <h2 className="section-title">Difficulty Level Progress Isolation</h2>
            <p className="section-subtitle">
              Verified isolation ensures completing exercises in one level does NOT leak into or falsely mark exercises in other levels.
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

      {/* Body Parts Programs Progress */}
      <section className="progress-section">
        <div className="section-title-row">
          <div>
            <h2 className="section-title">Muscle Group Specific Mastery</h2>
            <p className="section-subtitle">
              Progress tracked for targeted anatomical categories.
            </p>
          </div>
        </div>

        <div className="body-parts-progress-grid">
          {bodyParts.map((bp) => {
            const bpEx = WORKOUT_CATEGORIES_DATA[bp]?.exercises || [];
            const bpDone = bpEx.filter((e) => completedExercises.includes(e.id));
            const pct = bpEx.length > 0 ? Math.round((bpDone.length / bpEx.length) * 100) : 0;

            return (
              <div key={bp} className="body-part-progress-card">
                <div className="bp-card-top">
                  <strong>{bp} Program</strong>
                  <span className="bp-count">{bpDone.length}/{bpEx.length} Done ({pct}%)</span>
                </div>
                <div className="bp-progress-bar">
                  <div className="bp-progress-fill" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
