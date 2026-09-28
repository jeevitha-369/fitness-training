 function WorkoutPlans({
  workoutPlans,
  selectedWorkout,
  setCurrentPage,
}) {
  const workoutDetails = {
    Beginner: {
      icon: "🌱",
      description:
        "Perfect for starting your fitness journey.",
      duration: "20 minutes",
    },

    Intermediate: {
      icon: "🔥",
      description:
        "For users ready for a stronger challenge.",
      duration: "30 minutes",
    },

    Advanced: {
      icon: "💪",
      description:
        "For users looking for a challenging workout.",
      duration: "45 minutes",
    },
  };

  return (
    <div className="workout-plans">

      <h1>🏋️ Workout Plans</h1>

      <p>
        Choose a workout plan based on your
        fitness level.
      </p>

      <div className="workout-cards">

        {Object.keys(workoutPlans).map((level) => {
          const details = workoutDetails[level];

          const isSelected =
            selectedWorkout === level;

          return (
            <div
              className={`workout-card ${
                isSelected
                  ? "active-workout"
                  : ""
              }`}
              key={level}
            >

              {isSelected && (
                <div className="selected-badge">
                  ✓ Selected
                </div>
              )}

              <div className="workout-icon">
                {details.icon}
              </div>

              <h2>{level}</h2>

              <p>{details.description}</p>

              <div className="workout-stats">

                <div>
                  <strong>
                    {workoutPlans[level].length}
                  </strong>
                  <span>Exercises</span>
                </div>

                <div>
                  <strong>
                    {details.duration}
                  </strong>
                  <span>Duration</span>
                </div>

              </div>

              <ul>
                {workoutPlans[level].map(
                  (exercise) => (
                    <li key={exercise}>
                      ✓ {exercise}
                    </li>
                  )
                )}
              </ul>

              <button
                onClick={() =>
                  setCurrentPage("tracker")
                }
              >
                Start Workout
              </button>

            </div>
          );
        })}

      </div>

      {/* Selected Workout */}

      <div className="selected-workout">

        <h2>🎯 Your Selected Workout</h2>

        <p>
          Your current fitness level is:
        </p>

        <h3>{selectedWorkout}</h3>

        <p>
          This workout will be used in your
          Exercise Tracker and Progress page.
        </p>

        <button
          onClick={() =>
            setCurrentPage("tracker")
          }
        >
          Start My Workout
        </button>

      </div>

    </div>
  );
}

export default WorkoutPlans;