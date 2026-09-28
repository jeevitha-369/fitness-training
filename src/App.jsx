 import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");

  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [completedExercises, setCompletedExercises] = useState([]);

  // =========================
  // CUSTOM EXERCISES
  // =========================

  const [customExercises, setCustomExercises] = useState(() => {
    const saved = localStorage.getItem("customExercises");

    if (!saved) {
      return [];
    }

    try {
      const parsed = JSON.parse(saved);

      return parsed.map((exercise) => {
        if (typeof exercise === "string") {
          return {
            name: exercise,
            targetValue: 10,
            targetType: "reps",
            calories: 6,
          };
        }

        return exercise;
      });
    } catch {
      return [];
    }
  });

  // =========================
  // ADD EXERCISE
  // =========================

  const [showAddForm, setShowAddForm] = useState(false);
  const [newExercise, setNewExercise] = useState("");
  const [newTargetValue, setNewTargetValue] = useState("");
  const [newTargetType, setNewTargetType] = useState("reps");

  // =========================
  // WORKOUT HISTORY
  // =========================

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("workoutHistory");

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  // =========================
  // EDIT EXERCISE
  // =========================

  const [editingExercise, setEditingExercise] = useState("");
  const [editedExercise, setEditedExercise] = useState("");

  // =========================
  // PROFILE
  // =========================

  const [name, setName] = useState(() => {
    return localStorage.getItem("profileName") || "";
  });

  const [fitnessLevel, setFitnessLevel] = useState(() => {
    return localStorage.getItem("fitnessLevel") || "Beginner";
  });

  const [fitnessGoal, setFitnessGoal] = useState(() => {
    return localStorage.getItem("fitnessGoal") || "Stay Active";
  });

  const [workoutLevel, setWorkoutLevel] = useState(() => {
    return localStorage.getItem("workoutLevel") || "Beginner";
  });

  // =========================
  // WORKOUT PLANS
  // =========================

  const workoutPlans = {
    Beginner: [
      {
        name: "Jumping Jacks",
        target: "15 reps",
        calories: 10,
      },
      {
        name: "Bodyweight Squats",
        target: "10 reps",
        calories: 8,
      },
      {
        name: "Wall Push Ups",
        target: "8 reps",
        calories: 5,
      },
      {
        name: "Lunges",
        target: "10 reps",
        calories: 8,
      },
      {
        name: "Plank",
        target: "20 seconds",
        calories: 5,
      },
    ],

    Intermediate: [
      {
        name: "High Knees",
        target: "25 reps",
        calories: 10,
      },
      {
        name: "Push Ups",
        target: "15 reps",
        calories: 7,
      },
      {
        name: "Squats",
        target: "20 reps",
        calories: 8,
      },
      {
        name: "Reverse Lunges",
        target: "15 reps",
        calories: 8,
      },
      {
        name: "Mountain Climbers",
        target: "20 reps",
        calories: 10,
      },
      {
        name: "Plank",
        target: "30 seconds",
        calories: 5,
      },
    ],

    Advanced: [
      {
        name: "Burpees",
        target: "15 reps",
        calories: 12,
      },
      {
        name: "Jump Squats",
        target: "20 reps",
        calories: 12,
      },
      {
        name: "Push Ups",
        target: "25 reps",
        calories: 7,
      },
      {
        name: "Mountain Climbers",
        target: "30 reps",
        calories: 10,
      },
      {
        name: "Jumping Lunges",
        target: "20 reps",
        calories: 10,
      },
      {
        name: "Plank",
        target: "45 seconds",
        calories: 5,
      },
    ],
  };

  // =========================
  // CURRENT WORKOUT
  // =========================

    const currentPlan =
  workoutPlans[selectedWorkout || fitnessLevel] ||
  workoutPlans.Beginner;

  const customExerciseObjects = customExercises.map((exercise) => ({
    name: exercise.name,
    target: exercise.targetValue + " " + exercise.targetType,
    calories: exercise.calories || 6,
  }));

  const exercises = [
    ...currentPlan,
    ...customExerciseObjects,
  ];

  // =========================
  // LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "customExercises",
      JSON.stringify(customExercises)
    );
  }, [customExercises]);

  useEffect(() => {
    localStorage.setItem(
      "workoutHistory",
      JSON.stringify(history)
    );
  }, [history]);

  useEffect(() => {
    localStorage.setItem("profileName", name);
    localStorage.setItem("fitnessLevel", fitnessLevel);
    localStorage.setItem("fitnessGoal", fitnessGoal);
  }, [name, fitnessLevel, fitnessGoal]);

  useEffect(() => {
    localStorage.setItem("workoutLevel", workoutLevel);
  }, [workoutLevel]);

  // =========================
  // COMPLETE EXERCISE
  // =========================

  const toggleExercise = (exerciseName) => {
    if (completedExercises.includes(exerciseName)) {
      setCompletedExercises(
        completedExercises.filter(
          (item) => item !== exerciseName
        )
      );
    } else {
      setCompletedExercises([
        ...completedExercises,
        exerciseName,
      ]);
    }
  };

  // =========================
  // OPEN ADD FORM
  // =========================

  const openAddForm = () => {
    setShowAddForm(true);
    setNewExercise("");
    setNewTargetValue("");
    setNewTargetType("reps");
  };

  // =========================
  // SAVE NEW EXERCISE
  // =========================

  const saveNewExercise = () => {
    const exerciseName = newExercise.trim();
    const targetValue = Number(newTargetValue);

    if (exerciseName === "") {
      alert("Please enter an exercise name.");
      return;
    }

    if (!Number.isFinite(targetValue) || targetValue <= 0) {
      alert("Please enter a valid target value.");
      return;
    }

    const alreadyExists = exercises.some(
      (exercise) =>
        exercise.name.toLowerCase() ===
        exerciseName.toLowerCase()
    );

    if (alreadyExists) {
      alert("Exercise already exists.");
      return;
    }

    const newCustomExercise = {
      name: exerciseName,
      targetValue: targetValue,
      targetType: newTargetType,
      calories: 6,
    };

    setCustomExercises([
      ...customExercises,
      newCustomExercise,
    ]);

    setNewExercise("");
    setNewTargetValue("");
    setNewTargetType("reps");
    setShowAddForm(false);
  };

  // =========================
  // DELETE CUSTOM EXERCISE
  // =========================

  const deleteExercise = (exerciseName) => {
    setCustomExercises(
      customExercises.filter(
        (exercise) => exercise.name !== exerciseName
      )
    );

    setCompletedExercises(
      completedExercises.filter(
        (exercise) => exercise !== exerciseName
      )
    );
  };

  // =========================
  // EDIT EXERCISE NAME
  // =========================

  const startEdit = (exerciseName) => {
    setEditingExercise(exerciseName);
    setEditedExercise(exerciseName);
  };

  const saveEdit = () => {
    const value = editedExercise.trim();

    if (value === "") {
      alert("Please enter an exercise name.");
      return;
    }

    const exists = exercises.some(
      (exercise) =>
        exercise.name.toLowerCase() ===
          value.toLowerCase() &&
        exercise.name !== editingExercise
    );

    if (exists) {
      alert("Exercise already exists.");
      return;
    }

    setCustomExercises(
      customExercises.map((exercise) => {
        if (exercise.name === editingExercise) {
          return {
            ...exercise,
            name: value,
          };
        }

        return exercise;
      })
    );

    setCompletedExercises(
      completedExercises.map((exercise) => {
        if (exercise === editingExercise) {
          return value;
        }

        return exercise;
      })
    );

    setEditingExercise("");
    setEditedExercise("");
  };
  // =========================
// DELETE HISTORY ITEM
// =========================

 const deleteHistoryItem = (indexToDelete) => {
  setHistory((previousHistory) =>
    previousHistory.filter(
      (_, index) => index !== indexToDelete
    )
  );
};

  // =========================
  // PROGRESS
  // =========================

  const progress =
    exercises.length === 0
      ? 0
      : Math.round(
          (completedExercises.length /
            exercises.length) *
            100
        );

  // =========================
  // CALORIES
  // =========================

  const caloriesBurned =
    completedExercises.reduce(
      (total, exerciseName) => {
        const exercise = exercises.find(
          (item) => item.name === exerciseName
        );

        return (
          total +
          (exercise ? exercise.calories : 6)
        );
      },
      0
    );

  // =========================
  // SAVED STATISTICS
  // =========================

  const totalWorkouts = history.length;
  const achievements = {
  firstWorkout: totalWorkouts >= 1,
  fiveWorkouts: totalWorkouts >= 5,
  tenWorkouts: totalWorkouts >= 10,
};

  const totalExercisesCompleted =
    history.reduce(
      (total, workout) =>
        total + workout.count,
      0
    );

  const totalCaloriesBurned =
    history.reduce(
      (total, workout) =>
        total + (workout.calories || 0),
      0
    );

  // =========================
  // SAVE WORKOUT
  // =========================

  const saveWorkout = () => {
     
    if (completedExercises.length === 0) {
      return;
    }

    const workout = {
      date: new Date().toLocaleDateString(),
      level: workoutLevel,
      count: completedExercises.length,
      calories: caloriesBurned,
    };

    setHistory([
      ...history,
      workout,
    ]);

    setCompletedExercises([]);

    alert("Workout saved successfully!");
  };

  // =========================
  // RETURN
  // =========================

  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="navbar">

        <h1>💪 FitTrack</h1>

        <div className="nav-buttons">

          <button
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => setPage("workouts")}
          >
            Workouts
          </button>

          <button
            onClick={() => setPage("tracker")}
          >
            Tracker
          </button>

          <button
            onClick={() => setPage("progress")}
          >
            Progress
          </button>

          <button
            onClick={() => setPage("profile")}
          >
            Profile
          </button>

        </div>

      </header>

      {/* =========================
          DASHBOARD
      ========================= */}

      {page === "dashboard" && (
        <main className="dashboard">

          <div className="welcome-section">

            <h2>
              Welcome
              {name ? ", " + name : ""}! 👋
            </h2>

            <p>
              Your personal fitness companion.
            </p>

          </div>

          <div className="dashboard-grid">

            <div className="dashboard-card">

              <h3>🏋️ Today's Workout</h3>

              <h2>{workoutLevel}</h2>

              <p>
                Complete your daily exercises and
                stay active.
              </p>

              <p>
                🎯 {exercises.length} exercises
              </p>

              <button
                onClick={() => setPage("tracker")}
              >
                Start Workout
              </button>

            </div>

            <div className="dashboard-card">

              <h3>📊 Current Progress</h3>

              <div className="dashboard-progress">
                {progress}%
              </div>

              <p>
                {completedExercises.length} /{" "}
                {exercises.length} completed
              </p>

              <div className="dashboard-progress-bar">

                <div
                  className="dashboard-progress-fill"
                  style={{
                    width: progress + "%",
                  }}
                ></div>

              </div>

              <p>
                {progress === 0
                  ? "Start your workout!"
                  : progress === 100
                  ? "Workout completed! 🎉"
                  : "Keep going! 💪"}
              </p>

            </div>

            <div className="dashboard-card">

              <h3>🔥 Total Calories</h3>

              <div className="dashboard-number">
                {totalCaloriesBurned}
              </div>

              <p>
                kcal from saved workouts
              </p>

            </div>

            <div className="dashboard-card">

              <h3>🏆 Saved Workouts</h3>

              <div className="dashboard-number">
                {totalWorkouts}
              </div>

              <p>
                workouts completed and saved
              </p>

            </div>

          </div>

           <div className="dashboard-info">

  <div className="info-card">
    <h3>🎯 Fitness Level</h3>
    <p>{fitnessLevel}</p>
  </div>

  <div className="info-card">
    <h3>💪 Current Workout</h3>
    <p>{selectedWorkout || workoutLevel}</p>
  </div>

  <div className="info-card">
    <h3>🏆 Fitness Goal</h3>
    <p>{fitnessGoal}</p>
  </div>

  <div className="info-card">
    <h3>📅 Exercises Available</h3>
    <p>{exercises.length}</p>
  </div>

</div>

        </main>
      )}

      {/* =========================
          WORKOUTS
      ========================= */}

      {page === "workouts" && (
        <main className="dashboard">

          <h2>Workout Plans</h2>

          <p>
            Choose a workout based on your fitness level.
          </p>

          <div className="cards">

            <div className="card">

              <h3>🌱 Beginner</h3>

              <p>⏱ 20 minutes</p>

              <p>
                Simple exercises for beginners.
              </p>

              <p>🎯 5 exercises</p>

              <button
              onClick={() => {
  setSelectedWorkout("Beginner");
  setCompletedExercises([]);
  setPage("tracker");
}}
              >
                Start Beginner
              </button>

            </div>

            <div className="card">

              <h3>🔥 Intermediate</h3>

              <p>⏱ 30 minutes</p>

              <p>
                Moderate exercises for regular training.
              </p>

              <p>🎯 6 exercises</p>

              <button
                onClick={() => {
  setSelectedWorkout("Intermediate");
  setCompletedExercises([]);
  setPage("tracker");
}}
              >
                Start Intermediate
              </button>

            </div>

            <div className="card">

              <h3>💪 Advanced</h3>

              <p>⏱ 45 minutes</p>

              <p>
                Challenging exercises for advanced training.
              </p>

              <p>🎯 6 exercises</p>

              <button
               onClick={() => {
  setSelectedWorkout("Advanced");
  setCompletedExercises([]);
  setPage("tracker");
}}
              >
                Start Advanced
              </button>

            </div>

          </div>

        </main>
      )}

      {/* =========================
          TRACKER
      ========================= */}

      {page === "tracker" && (
        <main className="dashboard">

          <h2>Exercise Tracker</h2>

          <p>
            Complete each exercise to track your workout.
          </p>

          <div className="cards">

            <div className="card">

              <h3>Today's Exercises</h3>

              <p>
               Workout Level:{" "}
<strong>{selectedWorkout || fitnessLevel}</strong>
              </p>

              {!showAddForm && (
                <button
                  onClick={openAddForm}
                >
                  ➕ Add Exercise
                </button>
              )}

              {showAddForm && (
                <div className="add-exercise">

                  <h3>
                    ➕ Add New Exercise
                  </h3>

                  <div className="add-exercise-fields">

                    <div className="form-group">

                      <label>
                        Exercise Name
                      </label>

                      <input
                        type="text"
                        placeholder="e.g. Running"
                        value={newExercise}
                        onChange={(event) =>
                          setNewExercise(
                            event.target.value
                          )
                        }
                      />

                    </div>

                    <div className="form-group">

                      <label>
                        Target Value
                      </label>

                      <input
                        type="number"
                        min="1"
                        placeholder="e.g. 30"
                        value={newTargetValue}
                        onChange={(event) =>
                          setNewTargetValue(
                            event.target.value
                          )
                        }
                      />

                    </div>

                    <div className="form-group">

                      <label>
                        Target Type
                      </label>

                      <select
                        value={newTargetType}
                        onChange={(event) =>
                          setNewTargetType(
                            event.target.value
                          )
                        }
                      >

                        <option value="reps">
                          Reps
                        </option>

                        <option value="minutes">
                          Minutes
                        </option>

                        <option value="seconds">
                          Seconds
                        </option>

                        <option value="steps">
                          Steps
                        </option>

                        <option value="kilometers">
                          Kilometers
                        </option>

                      </select>

                    </div>

                  </div>

                  <div className="add-exercise-buttons">

                    <button
                      className="save-exercise-btn"
                      onClick={saveNewExercise}
                    >
                      Save
                    </button>

                    <button
                      className="cancel-exercise-btn"
                      onClick={() => {
                        setShowAddForm(false);
                        setNewExercise("");
                        setNewTargetValue("");
                        setNewTargetType("reps");
                      }}
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              )}

              {exercises.map((exercise) => (

                <div
                  className="exercise-row"
                  key={exercise.name}
                >

                  <button
                    onClick={() =>
                      toggleExercise(
                        exercise.name
                      )
                    }
                  >
                    {completedExercises.includes(
                      exercise.name
                    )
                      ? "✅ Completed"
                      : "⬜ Complete"}
                  </button>

                  <span>

                    <strong>
                      {exercise.name}
                    </strong>

                    <br />

                    🎯 Target:{" "}
                    {exercise.target}

                  </span>

                  {customExercises.some(
                    (item) =>
                      item.name ===
                      exercise.name
                  ) && (

                    <div>

                      <button
                        onClick={() =>
                          startEdit(
                            exercise.name
                          )
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteExercise(
                            exercise.name
                          )
                        }
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  )}

                </div>

              ))}

              {editingExercise !== "" && (

                <div className="edit-exercise">

                  <h4>
                    Edit Exercise Name
                  </h4>

                  <input
                    type="text"
                    value={editedExercise}
                    onChange={(event) =>
                      setEditedExercise(
                        event.target.value
                      )
                    }
                  />

                  <button
                    onClick={saveEdit}
                  >
                    💾 Save
                  </button>

                  <button
                    onClick={() => {
                      setEditingExercise("");
                      setEditedExercise("");
                    }}
                  >
                    Cancel
                  </button>

                </div>

              )}

            </div>

            <div className="card">

              <h3>
                Workout Progress
              </h3>

              <h1>
                {progress}%
              </h1>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: progress + "%",
                  }}
                ></div>

              </div>

              <p>
                {completedExercises.length} of{" "}
                {exercises.length} completed
              </p>

              <h3>
                🔥 Calories Burned:{" "}
                {caloriesBurned} kcal
              </h3>

           
          {progress === 100 && (
  <div>
    <p>🎉 Workout Completed!</p>

    <button onClick={saveWorkout}>
      💾 Save Workout
    </button>
  </div>
)}

{completedExercises.length > 0 && progress < 100 && (
  <button
    onClick={() => {
      setCompletedExercises([]);
    }}
  >
    🔄 Reset Workout
  </button>
)}

            </div>

          </div>

        </main>
      )}

      {/* =========================
          PROGRESS
      ========================= */}

      {page === "progress" && (

        <main className="dashboard">

          <h2>My Progress</h2>

          <div className="cards">

            <div className="card">

              <h3>
                🏋️ Total Workouts
              </h3>

              <h1>
                {totalWorkouts}
              </h1>

              <p>
                Workouts completed and saved.
              </p>

            </div>

            <div className="card">

              <h3>
                📊 Exercises Completed
              </h3>

              <h1>
                {totalExercisesCompleted}
              </h1>

              <p>
                Total exercises from saved workouts.
              </p>

            </div>

            <div className="card">

              <h3>
                🔥 Total Calories
              </h3>

              <h1>
                {totalCaloriesBurned} kcal
              </h1>

              <p>
                Calories from saved workouts.
              </p>

            </div>

            <div className="card">

              <h3>
                🏆 Achievement
              </h3>

              {totalWorkouts > 0 ? (

                <p>
                  🎉 Great job! You have completed{" "}
                  {totalWorkouts} workout
                  {totalWorkouts > 1 ? "s" : ""}!
                </p>

              ) : (

                <p>
                  Keep going and complete your first workout!
                </p>

              )}

            </div>
            <div className="card">

  <h3>🌟 Achievements</h3>

  <p>
    {achievements.firstWorkout
      ? "🥇 First Workout — Unlocked"
      : "🔒 First Workout — Locked"}
  </p>

  <p>
    {achievements.fiveWorkouts
      ? "🏆 Consistent Trainer — Unlocked"
      : "🔒 Consistent Trainer — Locked"}
  </p>

  <p>
    {achievements.tenWorkouts
      ? "🔥 Fitness Champion — Unlocked"
      : "🔒 Fitness Champion — Locked"}
  </p>

</div>

            <div className="card">

              <h3>
                🎯 Fitness Goal
              </h3>

              <p>
                {fitnessGoal}
              </p>

            </div>

            <div className="card">

              <h3>
                📅 Workout History
              </h3>
              {history.length > 0 && (
  <button
    onClick={() => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete all workout history?"
      );

      if (confirmDelete) {
        setHistory([]);
      }
    }}
  >
    🗑️ Delete History
  </button>
)}
               

              {history.length === 0 ? (

                <p>
                  No workouts saved yet.
                </p>

              ) : (

                history.map(
                  (workout, index) => (

                    <div
                      className="history-item"
                      key={index}
                    >

                      <strong>
                        🏋️ {workout.date}
                      </strong>

                      <p>
                        Level: {workout.level}
                      </p>

                      <p>
                        Exercises: {workout.count}
                      </p>

                      <p>
                        🔥 Calories:{" "}
                        {workout.calories || 0} kcal
                      </p>
                      <button
  onClick={() => {
    const confirmDelete = window.confirm(
      "Delete this workout from history?"
    );

    if (confirmDelete) {
      deleteHistoryItem(index);
    }
  }}
>
  🗑️ Delete
</button>

                    </div>

                  )
                )

              )}

            </div>

          </div>

        </main>

      )}

      {/* =========================
          PROFILE
      ========================= */}

      {page === "profile" && (

        <main className="dashboard">

          <h2>My Profile 👤</h2>

          <div className="cards">

            {/* PERSONAL INFORMATION */}

            <div className="card">

              <h3>
                Personal Information
              </h3>

              <p>
                Your Name
              </p>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

              {/* FITNESS LEVEL */}

              <p>
                Fitness Level
              </p>

              <select
                value={fitnessLevel}
                onChange={(event) => {
  const level = event.target.value;

  setFitnessLevel(level);
  setWorkoutLevel(level);
  setCompletedExercises([]);
}}
              >

                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>

              </select>

              {/* FITNESS GOAL */}

              <p>
                Fitness Goal
              </p>

              <select
                value={fitnessGoal}
                onChange={(event) =>
                  setFitnessGoal(
                    event.target.value
                  )
                }
              >

                <option value="Stay Active">
                  Stay Active
                </option>

                <option value="Build Strength">
                  Build Strength
                </option>

                <option value="Improve Fitness">
                  Improve Fitness
                </option>

              </select>

              <button
  onClick={() => {
    localStorage.setItem("profileName", name);
    localStorage.setItem("fitnessLevel", fitnessLevel);
    localStorage.setItem("fitnessGoal", fitnessGoal);
    alert("Profile saved successfully!");
  }}
>
  💾 Save Profile
</button>

<p>
  Your information is saved automatically.
</p>

            </div>

            {/* STATISTICS */}

            <div className="card">

              <h3>
                📊 Your Statistics
              </h3>

              <p>
                Fitness Level: {fitnessLevel}
              </p>

              <p>
                Fitness Goal: {fitnessGoal}
              </p>

              <p>
                Current Workout: {workoutLevel}
              </p>

              <p>
                Total Exercises Available:{" "}
                {exercises.length}
              </p>

              <p>
                Total Exercises Completed:{" "}
                {totalExercisesCompleted}
              </p>

              <p>
                Saved Workouts: {totalWorkouts}
              </p>

              <p>
                🔥 Total Calories:{" "}
                {totalCaloriesBurned} kcal
              </p>

            </div>

          </div>

        </main>

      )}

    </div>
  );
}

export default App;