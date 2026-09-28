 function Progress({
  completedExercises,
  totalExercises,
  selectedWorkout,
  workoutHistory,
}) {
  const progress =
    totalExercises > 0
      ? Math.round(
          (completedExercises.length / totalExercises) * 100
        )
      : 0;

  return (
    <div className="progress-page">

      <h1>📊 Your Progress</h1>

      <p className="progress-subtitle">
        Track your fitness journey and daily achievements.
      </p>

      {/* Fitness Level */}
      <div className="progress-info-card">
        <span className="progress-icon">🏋️</span>

        <div>
          <h3>Selected Fitness Level</h3>
          <p>{selectedWorkout}</p>
        </div>
      </div>

      {/* Exercises Completed */}
      <div className="progress-info-card">
        <span className="progress-icon">💪</span>

        <div>
          <h3>Exercises Completed</h3>
          <p>{completedExercises.length}</p>
        </div>
      </div>

      {/* Workouts Completed */}
      <div className="progress-info-card">
        <span className="progress-icon">🏆</span>

        <div>
          <h3>Workouts Completed</h3>
          <p>{workoutHistory.length}</p>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="today-progress-card">

        <div className="progress-title">
          <div>
            <h2>🔥 Today's Progress</h2>

            <p>
              {completedExercises.length} of{" "}
              {totalExercises} exercises completed
            </p>
          </div>

          <div className="progress-percentage">
            {progress}%
          </div>
        </div>

        {/* Vertical Progress */}
        <div className="vertical-progress-section">

          <div className="vertical-progress">

            <div
              className="vertical-progress-fill"
              style={{
                height: `${progress}%`,
              }}
            ></div>

          </div>

          <div className="vertical-progress-labels">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

        </div>

        <p className="progress-message">
          {progress === 100
            ? "🎉 Great job! Workout completed!"
            : progress === 0
            ? "Start your workout and keep moving!"
            : "💪 Keep going! You're doing great!"}
        </p>

      </div>

    </div>
  );
}

export default Progress;