import { useState, useEffect } from "react";

export default function WaterTracker({ onIntakeChange }) {
  // ISO date string for today (YYYY-MM-DD)
  const getTodayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const todayKey = getTodayKey();
  const storageKey = `fittrack_water_${todayKey}`;

  // Water target (default 8 cups = ~2000 ml)
  const [targetCups, setTargetCups] = useState(() => {
    try {
      const saved = localStorage.getItem("fittrack_water_target");
      return saved ? Number(saved) : 8;
    } catch {
      return 8;
    }
  });

  // Current cups drunk today
  const [cups, setCups] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(cups));
      if (onIntakeChange) {
        onIntakeChange(cups, targetCups);
      }
    } catch (e) {
      console.error("Could not persist water intake", e);
    }
  }, [cups, storageKey, targetCups, onIntakeChange]);

  const handleTargetChange = (newTarget) => {
    const safeTarget = Math.max(6, Math.min(12, Number(newTarget)));
    setTargetCups(safeTarget);
    try {
      localStorage.setItem("fittrack_water_target", String(safeTarget));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdd = () => {
    if (cups < 16) {
      setCups((prev) => prev + 1);
    }
  };

  const handleSubtract = () => {
    if (cups > 0) {
      setCups((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset today's water count back to 0?")) {
      setCups(0);
    }
  };

  const percentage = Math.min(100, Math.round((cups / targetCups) * 100));
  const milliliters = cups * 250;
  const targetMilliliters = targetCups * 250;

  return (
    <div className="water-tracker-card">
      <div className="water-tracker-header">
        <div className="water-title-wrap">
          <span className="water-badge-icon">💧</span>
          <div>
            <h3 className="water-title">Hydration Tracker</h3>
            <span className="water-date-sub">
              Today: {new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
            </span>
          </div>
        </div>

        <div className="water-target-select-wrap">
          <label htmlFor="water-target-select" className="target-label">
            Target:
          </label>
          <select
            id="water-target-select"
            className="water-target-select"
            value={targetCups}
            onChange={(e) => handleTargetChange(e.target.value)}
          >
            <option value={6}>6 Cups (1.5 L)</option>
            <option value={8}>8 Cups (2.0 L - Recommended)</option>
            <option value={10}>10 Cups (2.5 L)</option>
            <option value={12}>12 Cups (3.0 L)</option>
          </select>
        </div>
      </div>

      {/* Progress Metric Bar */}
      <div className="water-progress-section">
        <div className="water-metric-row">
          <div className="water-main-stat">
            <span className="cups-current">{cups}</span>
            <span className="cups-divider">/</span>
            <span className="cups-target">{targetCups}</span>
            <span className="cups-unit">cups ({milliliters} / {targetMilliliters} ml)</span>
          </div>
          <span className="water-pct-pill">{percentage}% Reached</span>
        </div>

        <div className="water-bar-track">
          <div
            className="water-bar-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Interactive Cups Visualization */}
      <div className="water-cups-row">
        {Array.from({ length: targetCups }).map((_, idx) => {
          const isFilled = idx < cups;
          return (
            <button
              key={idx}
              type="button"
              className={`water-cup-btn ${isFilled ? "filled" : "empty"}`}
              onClick={() => setCups(idx + 1 === cups ? idx : idx + 1)}
              title={`Click to set intake to ${idx + 1} cups (${(idx + 1) * 250} ml)`}
              aria-label={`Cup ${idx + 1} ${isFilled ? "filled" : "empty"}`}
            >
              <span className="cup-icon">{isFilled ? "🥛" : "🥤"}</span>
              <span className="cup-label">{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Controls & Quick Actions */}
      <div className="water-controls-row">
        <div className="water-btn-group">
          <button
            type="button"
            className="btn btn-sm btn-secondary water-step-btn"
            onClick={handleSubtract}
            disabled={cups <= 0}
            title="Remove 1 cup"
          >
            − 1 Cup
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary water-step-btn"
            onClick={handleAdd}
            disabled={cups >= 16}
            title="Add 1 cup (250 ml)"
          >
            + 1 Cup (250 ml)
          </button>
        </div>

        {cups > 0 && (
          <button
            type="button"
            className="water-reset-link"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <p className="water-note-footer">
        Target reflects 250 ml cups. Self-logged tracker.
      </p>
    </div>
  );
}
