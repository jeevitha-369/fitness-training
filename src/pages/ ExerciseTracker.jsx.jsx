 function ExerciseTracker({
  exercises,
  completedExercises,
  toggleExercise,
  selectedWorkout,
  completeWorkout,
}) {
  const progress =
    exercises.length > 0
      ? Math.round(
          (completedExercises.length / exercises.length) * 100
        )
      : 0;

  return (
    <div className="exercise-tracker">

      <h1>🏋️ Exercise Tracker</h1>

      <p>Track your workout and fitness progress.</p>

      {/* Workout Summary */}
      <div className="tracker-summary">

        <div className="tracker-header">
          <div>
            <h2>{selectedWorkout} Workout</h2>

            <p>
              {completedExercises.length} of{" "}
              {exercises.length} exercises completed
            </p>
          </div>

          <div className="tracker-percentage">
            {progress}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="tracker-progress-bar">
          <div
            className="tracker-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <div className="workout-complete">

            <h2>🎉 Workout Completed!</h2>

            <p>
              Great job! You completed all
              today's exercises.
            </p>

            <button onClick={completeWorkout}>
              Save Workout
            </button>

          </div>
        )}

      </div>

      {/* Exercise List */}
      <div className="exercise-list">

        {exercises.map((exercise, index) => {

          const isCompleted =
            completedExercises.includes(exercise);

          return (
            <div
              className={`exercise-item ${
                isCompleted
                  ? "exercise-completed"
                  : ""
              }`}
              key={exercise}
            >

              <div className="exercise-name">

                <span className="exercise-number">
                  {index + 1}
                </span>

                <span>{exercise}</span>

              </div>

              <button
                className={
                  isCompleted
                    ? "completed-button"
                    : ""
                }
                onClick={() =>
                  toggleExercise(exercise)
                }
              >
                {isCompleted
                  ? "Completed ✓"
                  : "Complete"}
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default ExerciseTracker;