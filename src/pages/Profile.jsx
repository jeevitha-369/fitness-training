import { useState } from "react";

export default function Profile({
  profileName,
  fitnessLevel,
  fitnessGoal,
  dailyTargetMinutes = 25,
  workoutHistory = [],
  completedExercises = [],
  onSaveProfile,
  onClearAllData,
}) {
  const [name, setName] = useState(profileName || "");
  const [level, setLevel] = useState(fitnessLevel || "Beginner");
  const [goal, setGoal] = useState(fitnessGoal || "Stay Active & Build Strength");
  const [targetMin, setTargetMin] = useState(dailyTargetMinutes);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile({
      name: name.trim() || "Jeevi D",
      fitnessLevel: level,
      fitnessGoal: goal,
      dailyTargetMinutes: Number(targetMin) || 25,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleResetEverything = () => {
    const confirm1 = window.confirm(
      "WARNING: This will reset all your saved completed exercises and workout history from localStorage. Are you sure?"
    );
    if (confirm1) {
      if (onClearAllData) onClearAllData();
      alert("All fitness tracker data has been reset.");
    }
  };

  return (
    <div className="profile-page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <span className="page-overline">USER ACCOUNT &amp; PREFERENCES</span>
          <h1 className="page-title">Personal Athlete Profile</h1>
          <p className="page-subtitle">
            Configure your training preferences, primary skill level, and fitness targets. All settings are persistently preserved in localStorage.
          </p>
        </div>
      </div>

      <div className="profile-grid">
        {/* Profile Form Card */}
        <div className="profile-card">
          <div className="card-header-row">
            <h2 className="card-title">Profile Settings</h2>
            <span className="badge-pill-cyan">Local Persistence Active</span>
          </div>

          {saveSuccess && (
            <div className="alert-success-banner">
              <span className="alert-icon">✓</span>
              <span>Profile settings saved successfully and persisted in localStorage!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name-input">Athlete Full Name</label>
              <input
                id="name-input"
                type="text"
                className="form-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="input-hint">Displayed across your dashboard and workout certificates.</span>
            </div>

            <div className="form-group">
              <label htmlFor="level-select">Primary Fitness Level</label>
              <select
                id="level-select"
                className="form-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="Beginner">Beginner (Foundations &amp; Flexibility)</option>
                <option value="Intermediate">Intermediate (Core Strength &amp; Calisthenics)</option>
                <option value="Advanced">Advanced (High-Intensity &amp; Plyometrics)</option>
              </select>
              <span className="input-hint">Sets your default suggested program. Does not erase your progress in other levels.</span>
            </div>

            <div className="form-group">
              <label htmlFor="goal-select">Primary Fitness Goal</label>
              <select
                id="goal-select"
                className="form-select"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option value="Stay Active & Build Strength">Stay Active &amp; Build Strength</option>
                <option value="Cardiovascular Endurance">Cardiovascular Endurance &amp; Stamina</option>
                <option value="Fat Loss & Body Toning">Fat Loss &amp; Body Toning</option>
                <option value="Mobility & Posture">Mobility, Core &amp; Posture</option>
                <option value="Athletic Performance">Athletic Performance &amp; Explosiveness</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="target-select">Daily Training Target</label>
              <select
                id="target-select"
                className="form-select"
                value={targetMin}
                onChange={(e) => setTargetMin(e.target.value)}
              >
                <option value={15}>15 Minutes / Day</option>
                <option value={20}>20 Minutes / Day</option>
                <option value={30}>30 Minutes / Day</option>
                <option value={45}>45 Minutes / Day</option>
                <option value={60}>60 Minutes / Day</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-save">
                💾 Save Profile Changes
              </button>
            </div>
          </form>
        </div>

        {/* Athlete Overview Card */}
        <div className="profile-sidebar">
          <div className="profile-card athlete-card">
            <div className="avatar-large">
              {(name || "JD").slice(0, 2).toUpperCase()}
            </div>
            <h3 className="athlete-name">{name || "Jeevi D"}</h3>
            <span className="athlete-level-badge">{level} Athlete</span>

            <div className="athlete-stats-list">
              <div className="athlete-stat-row">
                <span className="stat-label">Logged Sessions:</span>
                <strong>{workoutHistory.length}</strong>
              </div>
              <div className="athlete-stat-row">
                <span className="stat-label">Mastered Movements:</span>
                <strong>{completedExercises.length}</strong>
              </div>
              <div className="athlete-stat-row">
                <span className="stat-label">Daily Target:</span>
                <strong>{targetMin} mins</strong>
              </div>
              <div className="athlete-stat-row">
                <span className="stat-label">Current Goal:</span>
                <strong className="text-right-small">{goal}</strong>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="profile-card danger-zone-card">
            <h4 className="danger-zone-title">⚠️ Data Management</h4>
            <p className="danger-zone-desc">
              Clear all locally stored completed exercises and workout logs. This returns the app to its fresh installation state.
            </p>
            <button
              type="button"
              className="btn btn-outline-danger btn-block"
              onClick={handleResetEverything}
            >
              Reset All Local Storage Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
