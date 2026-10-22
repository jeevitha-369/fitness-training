import { useState } from "react";

export default function WorkoutHistory({
  workoutHistory = [],
  onDeleteHistoryItem,
  onClearAllHistory,
  onNavigate,
}) {
  const [filterLevel, setFilterLevel] = useState("all");

  const filteredHistory = workoutHistory.filter((entry) => {
    if (filterLevel === "all") return true;
    return entry.level?.toLowerCase().includes(filterLevel.toLowerCase());
  });

  const totalSessions = workoutHistory.length;
  const totalMinutes = workoutHistory.reduce(
    (acc, curr) => acc + (curr.durationMinutes || 20),
    0
  );
  const totalCalories = workoutHistory.reduce(
    (acc, curr) => acc + (curr.calories || 40),
    0
  );

  const handleDeleteItem = (id, index) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this workout record from your history?");
    if (confirmDelete) {
      onDeleteHistoryItem(id || index);
    }
  };

  const handleClearAll = () => {
    const confirmClear = window.confirm("Are you sure you want to delete ALL workout history records? This action cannot be undone.");
    if (confirmClear) {
      onClearAllHistory();
    }
  };

  return (
    <div className="history-page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <span className="page-overline">PERMANENT LOG BOOK</span>
          <h1 className="page-title">Workout History &amp; Session Archive</h1>
          <p className="page-subtitle">
            Every completed workout session is permanently recorded with timestamp, exercise IDs, calories, and duration.
          </p>
        </div>

        {totalSessions > 0 && (
          <div className="page-header-actions">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleClearAll}
            >
              🗑️ Clear All History
            </button>
          </div>
        )}
      </div>

      {/* Stats Summary Strip */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper icon-indigo">📜</div>
          <div className="stat-info">
            <span className="stat-label">RECORDED SESSIONS</span>
            <h3 className="stat-value">{totalSessions}</h3>
            <span className="stat-sub">Verified Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-emerald">⏱️</div>
          <div className="stat-info">
            <span className="stat-label">TOTAL TIME SPENT ACTIVE</span>
            <h3 className="stat-value">{totalMinutes} <span className="stat-unit">mins</span></h3>
            <span className="stat-sub">Across all routines</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-rose">🔥</div>
          <div className="stat-info">
            <span className="stat-label">TOTAL ENERGY EXPENDITURE</span>
            <h3 className="stat-value">{totalCalories} <span className="stat-unit">kcal</span></h3>
            <span className="stat-sub">Burned in workouts</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      {totalSessions > 0 && (
        <div className="history-filter-bar">
          <span className="filter-label">Filter by Level:</span>
          <div className="filter-pill-group">
            <button
              type="button"
              className={`filter-pill ${filterLevel === "all" ? "active" : ""}`}
              onClick={() => setFilterLevel("all")}
            >
              All Sessions ({totalSessions})
            </button>
            <button
              type="button"
              className={`filter-pill ${filterLevel === "beginner" ? "active" : ""}`}
              onClick={() => setFilterLevel("beginner")}
            >
              Beginner
            </button>
            <button
              type="button"
              className={`filter-pill ${filterLevel === "intermediate" ? "active" : ""}`}
              onClick={() => setFilterLevel("intermediate")}
            >
              Intermediate
            </button>
            <button
              type="button"
              className={`filter-pill ${filterLevel === "advanced" ? "active" : ""}`}
              onClick={() => setFilterLevel("advanced")}
            >
              Advanced
            </button>
          </div>
        </div>
      )}

      {/* History List or Empty State */}
      {filteredHistory.length === 0 ? (
        <div className="empty-history-card">
          <div className="empty-icon-large">🏋️</div>
          <h2 className="empty-title">
            {totalSessions === 0
              ? "No Workout Sessions Logged Yet"
              : "No sessions matching the selected filter"}
          </h2>
          <p className="empty-desc">
            Complete your daily exercises in the Exercise Tracker and click &quot;Finish &amp; Log Workout&quot; to archive your training records.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate("tracker")}
          >
            🎯 Start a Workout Now
          </button>
        </div>
      ) : (
        <div className="history-cards-list">
          {filteredHistory.slice().reverse().map((entry, index) => {
            const actualIndex = workoutHistory.length - 1 - index;
            const entryId = entry.id || actualIndex;

            return (
              <div key={entryId} className="history-record-card">
                <div className="history-card-main">
                  <div className="history-left-info">
                    <div className="history-badge-row">
                      <span className="history-level-badge">{entry.level} Workout</span>
                      <span className="status-done-pill">✓ Completed</span>
                    </div>

                    <div className="history-meta-row">
                      <span className="history-date">📅 {entry.date || "Today"}</span>
                      {entry.time && <span className="history-time">⏰ {entry.time}</span>}
                      <span className="history-duration">⏱️ {entry.durationMinutes || 20} min</span>
                      <span className="history-cal">🔥 {entry.calories || 40} kcal</span>
                    </div>

                    {/* Exercise names/tags */}
                    {entry.exerciseNames && entry.exerciseNames.length > 0 && (
                      <div className="history-exercises-tags">
                        <span className="tags-label">Exercises Done ({entry.count || entry.exerciseNames.length}):</span>
                        <div className="tags-wrap">
                          {entry.exerciseNames.map((name, i) => (
                            <span key={i} className="history-tag">✓ {name}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="history-actions-area">
                    <button
                      type="button"
                      className="btn-delete-entry"
                      onClick={() => handleDeleteItem(entry.id, actualIndex)}
                      title="Delete this record"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
