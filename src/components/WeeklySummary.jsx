import { useMemo } from "react";

export default function WeeklySummary({ workoutHistory = [], onNavigate }) {
  // Compute past 7 days metrics based on timestamp or date
  const summary = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Build last 7 days array
    const dayBuckets = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dayLabel = d.toLocaleDateString(undefined, { weekday: "short" });
      const dateString = d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      dayBuckets.push({
        dayLabel,
        dateString,
        dateObj: d,
        workouts: [],
        minutes: 0,
        calories: 0,
      });
    }

    // Match workouts to day buckets
    workoutHistory.forEach((item) => {
      let itemDate = null;
      if (item.timestamp) {
        itemDate = new Date(item.timestamp);
      } else if (item.date) {
        itemDate = new Date(item.date);
      }

      if (itemDate && !isNaN(itemDate.getTime())) {
        const matchingBucket = dayBuckets.find((b) => {
          return (
            b.dateObj.getFullYear() === itemDate.getFullYear() &&
            b.dateObj.getMonth() === itemDate.getMonth() &&
            b.dateObj.getDate() === itemDate.getDate()
          );
        });

        if (matchingBucket) {
          matchingBucket.workouts.push(item);
          matchingBucket.minutes += item.durationMinutes || 20;
          matchingBucket.calories += item.calories || 35;
        }
      }
    });

    const totalWorkoutsWeek = dayBuckets.reduce(
      (sum, b) => sum + b.workouts.length,
      0
    );
    const totalMinutesWeek = dayBuckets.reduce(
      (sum, b) => sum + b.minutes,
      0
    );
    const totalCaloriesWeek = dayBuckets.reduce(
      (sum, b) => sum + b.calories,
      0
    );

    // Recommended weekly activity guideline: 3 to 5 sessions
    const weeklyTarget = 4;
    const progressPct = Math.min(100, Math.round((totalWorkoutsWeek / weeklyTarget) * 100));

    return {
      dayBuckets,
      totalWorkoutsWeek,
      totalMinutesWeek,
      totalCaloriesWeek,
      weeklyTarget,
      progressPct,
    };
  }, [workoutHistory]);

  return (
    <div className="weekly-summary-card">
      <div className="weekly-header-row">
        <div>
          <span className="card-overline">ACTIVITY CALENDAR</span>
          <h3 className="card-title-sm">Past 7 Days</h3>
        </div>
        <span className="badge-pill-cyan">
          {summary.totalWorkoutsWeek} / {summary.weeklyTarget} Sessions
        </span>
      </div>

      {/* 3 Metric Pills */}
      <div className="weekly-metrics-strip">
        <div className="weekly-metric-item">
          <span className="metric-num text-gradient">{summary.totalWorkoutsWeek}</span>
          <span className="metric-tag">Sessions Logged</span>
        </div>
        <div className="weekly-metric-item">
          <span className="metric-num">{summary.totalMinutesWeek}</span>
          <span className="metric-tag">Total Minutes</span>
        </div>
        <div className="weekly-metric-item">
          <span className="metric-num">{summary.totalCaloriesWeek}</span>
          <span className="metric-tag">Est. kcal Burned</span>
        </div>
      </div>

      {/* 7-Day Visual Activity Heat Strip */}
      <div className="weekly-days-grid">
        {summary.dayBuckets.map((bucket, idx) => {
          const hasWorkout = bucket.workouts.length > 0;
          const isToday = idx === summary.dayBuckets.length - 1;
          return (
            <div
              key={bucket.dateString + idx}
              className={`weekly-day-cell ${hasWorkout ? "active-day" : "inactive-day"} ${isToday ? "today-cell" : ""}`}
              title={`${bucket.dayLabel} (${bucket.dateString}): ${bucket.workouts.length} workout(s), ${bucket.minutes} mins, ${bucket.calories} kcal`}
            >
              <span className="day-name">{bucket.dayLabel}</span>
              <div className="day-status-indicator">
                {hasWorkout ? (
                  <span className="day-check-icon">✓</span>
                ) : (
                  <span className="day-empty-dot">•</span>
                )}
              </div>
              <span className="day-count-sub">
                {hasWorkout ? `${bucket.workouts.length}x` : "Rest"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Target Progress Bar */}
      <div className="weekly-target-progress-wrap">
        <div className="target-progress-labels">
          <span className="target-progress-text">Weekly Consistency Target:</span>
          <strong>{summary.progressPct}% Achieved</strong>
        </div>
        <div className="stat-progress-bar">
          <div
            className="stat-progress-fill"
            style={{ width: `${summary.progressPct}%` }}
          ></div>
        </div>
      </div>

      {/* Action link */}
      {summary.totalWorkoutsWeek === 0 ? (
        <div className="weekly-empty-prompt">
          <p>No workouts logged this week. Start a routine to begin your activity streak!</p>
          {onNavigate && (
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => onNavigate("tracker")}
            >
              Start Today&apos;s Workout
            </button>
          )}
        </div>
      ) : (
        <div className="weekly-footer-actions">
          {onNavigate && (
            <button
              type="button"
              className="link-btn"
              onClick={() => onNavigate("history")}
            >
              View Full History Archive →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
