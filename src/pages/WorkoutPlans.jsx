import { useState } from "react";
import { WORKOUT_CATEGORIES_DATA } from "../data/workoutData";

export default function WorkoutPlans({
  selectedWorkout,
  onSelectWorkout,
  onOpenGuide,
  completedExercises = [],
}) {
  const [filterTab, setFilterTab] = useState("all");

  const plansList = Object.values(WORKOUT_CATEGORIES_DATA);

  const filteredPlans = plansList.filter((plan) => {
    if (filterTab === "all") return true;
    if (filterTab === "levels") return plan.type === "level";
    if (filterTab === "bodyParts") return plan.type === "bodyPart";
    return true;
  });

  const getDifficultyColor = (intensity) => {
    switch (intensity?.toLowerCase()) {
      case "easy":
        return "badge-easy";
      case "medium":
      case "moderate":
        return "badge-medium";
      case "high":
        return "badge-hard";
      case "targeted":
        return "badge-targeted";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="plans-page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <span className="page-overline">STRUCTURED TRAINING CATALOG</span>
          <h1 className="page-title">Workout Plans &amp; Muscle Programs</h1>
          <p className="page-subtitle">
            Select a tailored workout program based on your fitness goals, experience level, or target muscle group.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filter-pill-bar">
          <button
            type="button"
            className={`filter-pill ${filterTab === "all" ? "active" : ""}`}
            onClick={() => setFilterTab("all")}
          >
            All Programs ({plansList.length})
          </button>
          <button
            type="button"
            className={`filter-pill ${filterTab === "levels" ? "active" : ""}`}
            onClick={() => setFilterTab("levels")}
          >
            ⚡ By Difficulty (3)
          </button>
          <button
            type="button"
            className={`filter-pill ${filterTab === "bodyParts" ? "active" : ""}`}
            onClick={() => setFilterTab("bodyParts")}
          >
            💪 Muscle Groups (6)
          </button>
        </div>
      </div>

      {/* Grid of Workout Plan Cards */}
      <div className="plans-grid">
        {filteredPlans.map((plan) => {
          const isSelected = selectedWorkout === plan.name;
          const planExercises = plan.exercises || [];
          const completedInThisPlan = planExercises.filter((ex) =>
            completedExercises.includes(ex.id)
          );
          const planProgress =
            planExercises.length > 0
              ? Math.round((completedInThisPlan.length / planExercises.length) * 100)
              : 0;

          return (
            <div
              key={plan.id || plan.name}
              className={`plan-card ${isSelected ? "selected-active-plan" : ""}`}
            >
              {isSelected && (
                <div className="active-plan-banner">
                  <span>★ Active Today&apos;s Workout</span>
                </div>
              )}

              <div className="plan-card-header">
                <div className="plan-header-top">
                  <span className={`status-pill ${getDifficultyColor(plan.intensity)}`}>
                    {plan.intensity} Intensity
                  </span>
                  <span className="plan-duration-badge">⏱️ {plan.duration}</span>
                </div>
                <h2 className="plan-name">{plan.name} Workout</h2>
                <p className="plan-desc">{plan.description}</p>
              </div>

              {/* Progress Bar inside Plan Card */}
              <div className="plan-progress-box">
                <div className="plan-progress-meta">
                  <span>Progress ({completedInThisPlan.length}/{planExercises.length})</span>
                  <strong>{planProgress}%</strong>
                </div>
                <div className="plan-progress-bar">
                  <div
                    className="plan-progress-fill"
                    style={{ width: `${planProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Exercise Pills Preview */}
              <div className="plan-exercises-preview">
                <span className="preview-label">Exercises Included ({planExercises.length}):</span>
                <div className="exercise-chips-wrap">
                  {planExercises.map((ex) => (
                    <span
                      key={ex.id}
                      className={`exercise-chip ${completedExercises.includes(ex.id) ? "done" : ""}`}
                      title={`${ex.name} — ${ex.target}`}
                    >
                      {completedExercises.includes(ex.id) ? "✓ " : ""}
                      {ex.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="plan-card-actions">
                <button
                  type="button"
                  className={`btn ${isSelected ? "btn-secondary" : "btn-primary"} plan-cta`}
                  onClick={() => onSelectWorkout(plan.name)}
                >
                  {isSelected ? "🎯 Continue in Tracker" : "⚡ Set as Active Plan"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline plan-guide-btn"
                  onClick={() => onOpenGuide(plan.name)}
                  title="Open Form Guidance and Video Demonstrations"
                >
                  🎥 View Guide &amp; 3D
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
