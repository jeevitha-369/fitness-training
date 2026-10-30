import { WORKOUT_CATEGORIES_DATA } from "../data/workoutData";

export default function WorkoutPlans({
  selectedWorkout,
  onSelectWorkout,
  onOpenGuide,
  completedExercises = [],
}) {
  const primaryLevels = ["Beginner", "Intermediate", "Advanced"].map(
    (lvl) => WORKOUT_CATEGORIES_DATA[lvl]
  );

  const getDifficultyColor = (intensity) => {
    switch (intensity?.toLowerCase()) {
      case "easy":
        return "badge-easy";
      case "medium":
      case "moderate":
        return "badge-medium";
      case "high":
        return "badge-hard";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="plans-page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <span className="page-overline">TRAINING CURRICULUM</span>
          <h1 className="page-title">Workout Levels &amp; Video Programs</h1>
          <p className="page-subtitle">
            Choose your training level to follow video demonstrations and guided exercises.
          </p>
        </div>
      </div>

      {/* Grid of 3 Workout Level Cards */}
      <div className="plans-grid">
        {primaryLevels.map((plan) => {
          if (!plan) return null;
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
                <h2 className="plan-name">
                  <span className="plan-icon">{plan.icon}</span> {plan.name} Routine
                </h2>
                <p className="plan-desc">{plan.description}</p>
              </div>

              {/* Progress Bar inside Plan Card */}
              <div className="plan-progress-box">
                <div className="plan-progress-meta">
                  <span>Progress ({completedInThisPlan.length}/{planExercises.length} Done)</span>
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
                <span className="preview-label">Exercises &amp; Demonstrations ({planExercises.length}):</span>
                <div className="exercise-chips-wrap">
                  {planExercises.map((ex) => {
                    const isDone = completedExercises.includes(ex.id);
                    return (
                      <button
                        key={ex.id}
                        type="button"
                        className={`exercise-chip ${isDone ? "done" : ""}`}
                        title={`Click to open video demonstration for ${ex.name}`}
                        onClick={() => onOpenGuide(plan.name, ex)}
                      >
                        {isDone ? "✓ " : ex.hasLocalVideo ? "🎥 " : "📝 "}
                        {ex.name}
                        <span className="chip-target-text">({ex.target})</span>
                      </button>
                    );
                  })}
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
                  title="Open video demonstrations and form instructions"
                >
                  🎥 Watch Video Guides
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
