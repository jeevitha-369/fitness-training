 function WorkoutHistory({ workoutHistory, deleteWorkout }) {
  return (
    <div className="history-page">

      <h1>Workout History</h1>

      <p>Track your completed workouts and progress.</p>

      {workoutHistory.length === 0 ? (
        <div className="history-empty">
          <h2>🏋️ No Workouts Yet</h2>

          <p>
            Complete a workout and save it to see
            your workout history here.
          </p>
        </div>
      ) : (
        <div className="history-list">

          {workoutHistory.map((workout, index) => (
            <div className="history-card" key={index}>

              <div className="history-header">
                <div>
                  <h2>
                    {workout.workout} Workout
                  </h2>

                  <p className="history-date">
                    📅 {workout.date}
                  </p>
                </div>

                <span className="history-badge">
                  ✓ Completed
                </span>
              </div>

              <div className="history-details">

                <div className="history-detail">
                  <span>💪</span>
                  <div>
                    <strong>
                      {workout.exercises}
                    </strong>
                    <p>Exercises Completed</p>
                  </div>
                </div>

                <div className="history-detail">
                  <span>🏆</span>
                  <div>
                    <strong>
                      {workout.workout}
                    </strong>
                    <p>Fitness Level</p>
                  </div>
                </div>

              </div>

              <button
                className="delete-history-button"
                onClick={() => deleteWorkout(index)}
              >
                Delete Workout
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default WorkoutHistory;