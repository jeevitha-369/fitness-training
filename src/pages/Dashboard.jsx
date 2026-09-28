 import { useState, useEffect } from "react";

function Dashboard({
  completedExercises,
  setCurrentPage,
  selectedWorkout,
  totalExercises,
  workoutPlans,
  workoutHistory,
}) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("Build Strength");

  useEffect(() => {
    const savedName = localStorage.getItem("profileName");
    const savedGoal = localStorage.getItem("fitnessGoal");

    setName(savedName || "");
    setGoal(savedGoal || "Build Strength");
  }, []);

  const todayExercises =
    workoutPlans[selectedWorkout] || [];

  const progress =
    totalExercises > 0
      ? Math.round(
          (completedExercises.length / totalExercises) * 100
        )
      : 0;

  const totalWorkoutsCompleted =
    workoutHistory ? workoutHistory.length : 0;

  const totalExercisesCompleted = workoutHistory
    ? workoutHistory.reduce(
        (total, workout) =>
          total + workout.exercises,
        0
      )
    : 0;

  return (
    <div className="dashboard">

      {/* =========================
          WELCOME SECTION
      ========================= */}

      <div className="welcome-section">

        <h1>
          {name
            ? `Welcome, ${name}! 👋`
            : "Welcome to FitTrack! 👋"}
        </h1>

        <p>
          Stay active, stay healthy, and reach your fitness goals.
        </p>

        <button
          onClick={() => setCurrentPage("tracker")}
        >
          Start Workout
        </button>

      </div>


      {/* =========================
          QUICK INFORMATION
      ========================= */}

      <div className="dashboard-summary">

        <div className="summary-card">
          <h2>💪</h2>
          <h3>{totalExercisesCompleted}</h3>
          <p>Exercises Completed</p>
        </div>

        <div className="summary-card">
          <h2>🏆</h2>
          <h3>{totalWorkoutsCompleted}</h3>
          <p>Workouts Completed</p>
        </div>

        <div className="summary-card">
          <h2>🏋️</h2>
          <h3>{selectedWorkout}</h3>
          <p>Current Level</p>
        </div>

        <div className="summary-card">
          <h2>🔥</h2>
          <h3>{progress}%</h3>
          <p>Today's Progress</p>
        </div>

      </div>


      {/* =========================
          MAIN DASHBOARD
      ========================= */}

      <div className="dashboard-cards">


        {/* TODAY'S WORKOUT */}

        <div className="fitness-card">

          <h2>💪 Today's Workout</h2>

          <h3>
            {selectedWorkout} Workout
          </h3>

          <p>
            {todayExercises.length} exercises planned
          </p>

          <ul>
            {todayExercises.map((exercise) => (
              <li key={exercise}>
                {exercise}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setCurrentPage("tracker")}
          >
            Start Today's Workout
          </button>

        </div>


        {/* WORKOUT PROGRESS */}

        <div className="fitness-card progress-card">

          <h2>🔥 Workout Progress</h2>

          <h3>
            {progress}%
          </h3>

          <p>
            {completedExercises.length} /{" "}
            {totalExercises} exercises completed
          </p>


          {/* Progress Bar */}

          <div
            style={{
              width: "100%",
              height: "14px",
              backgroundColor: "#e5e7eb",
              borderRadius: "10px",
              overflow: "hidden",
              margin: "20px 0",
            }}
          >

            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background:
                  "linear-gradient(90deg, #16a34a, #4ade80)",
                borderRadius: "10px",
                transition: "width 0.5s ease",
              }}
            ></div>

          </div>


          <p
            style={{
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {progress === 0
              ? "Start your workout! 💪"
              : progress === 100
              ? "Workout completed! 🎉"
              : "Keep going! 🔥"}
          </p>

        </div>


        {/* FITNESS GOAL */}

        <div className="fitness-card">

          <h2>🎯 Fitness Goal</h2>

          <h3>
            {goal}
          </h3>

          <p>
            Stay consistent and work towards your
            fitness goal.
          </p>

        </div>


        {/* FITNESS STATUS */}

        <div className="fitness-card">

          <h2>📊 Fitness Status</h2>

          <h3>
            {progress === 100
              ? "Completed ✓"
              : progress > 0
              ? "In Progress"
              : "Ready to Start"}
          </h3>

          <p>
            {progress === 100
              ? "Great job! Keep it up! 🎉"
              : progress > 0
              ? "You're doing great. Keep going! 💪"
              : "Start your workout and stay active!"}
          </p>

        </div>

      </div>


      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <div className="dashboard-quick-actions">

        <h2>Quick Actions</h2>

        <div>

          <button
            onClick={() => setCurrentPage("workouts")}
          >
            View Workout Plans
          </button>

          <button
            onClick={() => setCurrentPage("tracker")}
          >
            Open Exercise Tracker
          </button>

          <button
            onClick={() => setCurrentPage("progress")}
          >
            View My Progress
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;