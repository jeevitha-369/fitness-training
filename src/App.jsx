 import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // =========================
  // PAGE
  // =========================

  const [page, setPage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // =========================
  // WORKOUT STATE
  // =========================

  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [completedExercises, setCompletedExercises] = useState([]);

  const [workoutLevel, setWorkoutLevel] = useState(() => {
    return localStorage.getItem("workoutLevel") || "Beginner";
  });

  // =========================
  // CUSTOM WORKOUT
  // =========================

  const [customWorkoutName, setCustomWorkoutName] = useState(() => {
    return (
      localStorage.getItem("customWorkoutName") ||
      "My Custom Workout"
    );
  });

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

  const [showAddForm, setShowAddForm] = useState(false);

  const [newExercise, setNewExercise] = useState("");

  const [newTargetValue, setNewTargetValue] = useState("");

  const [newTargetType, setNewTargetType] = useState("reps");

  // =========================
  // EDIT CUSTOM EXERCISE
  // =========================

  const [editingExercise, setEditingExercise] = useState("");

  const [editedExercise, setEditedExercise] = useState("");

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
  // BODY PART WORKOUTS
  // =========================

  const bodyPartWorkouts = {
    Legs: [
      {
        name: "Bodyweight Squats",
        target: "10 reps",
        calories: 8,
      },
      {
        name: "Lunges",
        target: "10 reps",
        calories: 8,
      },
      {
        name: "Glute Bridges",
        target: "12 reps",
        calories: 7,
      },
      {
        name: "Calf Raises",
        target: "15 reps",
        calories: 6,
      },
    ],

    Arms: [
      {
        name: "Wall Push Ups",
        target: "8 reps",
        calories: 5,
      },
      {
        name: "Arm Circles",
        target: "20 reps",
        calories: 4,
      },
      {
        name: "Tricep Dips",
        target: "8 reps",
        calories: 6,
      },
      {
        name: "Bicep Curls",
        target: "10 reps",
        calories: 6,
      },
    ],

    Chest: [
      {
        name: "Wall Push Ups",
        target: "10 reps",
        calories: 5,
      },
      {
        name: "Push Ups",
        target: "8 reps",
        calories: 7,
      },
      {
        name: "Incline Push Ups",
        target: "10 reps",
        calories: 6,
      },
    ],

    Back: [
      {
        name: "Bird Dog",
        target: "10 reps",
        calories: 5,
      },
      {
        name: "Superman",
        target: "10 reps",
        calories: 6,
      },
      {
        name: "Reverse Snow Angels",
        target: "10 reps",
        calories: 5,
      },
    ],

    Shoulders: [
      {
        name: "Arm Circles",
        target: "20 reps",
        calories: 4,
      },
      {
        name: "Wall Push Ups",
        target: "8 reps",
        calories: 5,
      },
      {
        name: "Shoulder Taps",
        target: "10 reps",
        calories: 5,
      },
    ],

    Core: [
      {
        name: "Plank",
        target: "20 seconds",
        calories: 5,
      },
      {
        name: "Bird Dog",
        target: "10 reps",
        calories: 5,
      },
      {
        name: "Dead Bug",
        target: "10 reps",
        calories: 5,
      },
    ],
  };

  // =========================
  // CUSTOM EXERCISE OBJECTS
  // =========================

  const customExerciseObjects = customExercises.map(
    (exercise) => ({
      name: exercise.name,
      target:
        exercise.targetValue +
        " " +
        exercise.targetType,
      calories: exercise.calories || 6,
    })
  );

  // =========================
  // CURRENT PLAN
  // =========================

  const currentPlan =
    selectedWorkout === "Custom"
      ? customExerciseObjects
      : selectedWorkout === "Rest Day"
      ? []
      : bodyPartWorkouts[selectedWorkout] ||
        workoutPlans[selectedWorkout || fitnessLevel] ||
        workoutPlans.Beginner;

  const exercises = currentPlan;

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
    localStorage.setItem(
      "fitnessLevel",
      fitnessLevel
    );
    localStorage.setItem(
      "fitnessGoal",
      fitnessGoal
    );
  }, [name, fitnessLevel, fitnessGoal]);

  useEffect(() => {
    localStorage.setItem(
      "workoutLevel",
      workoutLevel
    );
  }, [workoutLevel]);

  useEffect(() => {
    localStorage.setItem(
      "customWorkoutName",
      customWorkoutName
    );
  }, [customWorkoutName]);

  // =========================
  // COMPLETE EXERCISE
  // =========================

  const toggleExercise = (exerciseName) => {
    if (
      completedExercises.includes(exerciseName)
    ) {
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
  // OPEN CUSTOM ADD FORM
  // =========================

  const openAddForm = () => {
    setShowAddForm(true);
    setNewExercise("");
    setNewTargetValue("");
    setNewTargetType("reps");
  };

  // =========================
  // SAVE CUSTOM EXERCISE
  // =========================

  const saveNewExercise = () => {
    const exerciseName = newExercise.trim();
    const targetValue = Number(newTargetValue);

    if (exerciseName === "") {
      alert("Please enter an exercise name.");
      return;
    }

    if (
      !Number.isFinite(targetValue) ||
      targetValue <= 0
    ) {
      alert("Please enter a valid target value.");
      return;
    }

    const alreadyExists = customExercises.some(
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
        (exercise) =>
          exercise.name !== exerciseName
      )
    );

    setCompletedExercises(
      completedExercises.filter(
        (exercise) =>
          exercise !== exerciseName
      )
    );
  };

  // =========================
  // EDIT CUSTOM EXERCISE
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

    const exists = customExercises.some(
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
        if (
          exercise.name === editingExercise
        ) {
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
        if (
          exercise === editingExercise
        ) {
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
        (_, index) =>
          index !== indexToDelete
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
          (item) =>
            item.name === exerciseName
        );

        return (
          total +
          (exercise
            ? exercise.calories
            : 6)
        );
      },
      0
    );

  // =========================
  // SAVED STATISTICS
  // =========================

  const totalWorkouts = history.length;

  const totalExercisesCompleted =
    history.reduce(
      (total, workout) =>
        total + (workout.count || 0),
      0
    );

  const totalCaloriesBurned =
    history.reduce(
      (total, workout) =>
        total +
        (workout.calories || 0),
      0
    );

  const achievements = {
    firstWorkout:
      totalWorkouts >= 1,

    fiveWorkouts:
      totalWorkouts >= 5,

    tenWorkouts:
      totalWorkouts >= 10,
  };

  // =========================
  // SAVE WORKOUT
  // =========================

  const saveWorkout = () => {
    if (completedExercises.length === 0) {
      return;
    }

    const workout = {
      date:
        new Date().toLocaleDateString(),

      level:
        selectedWorkout === "Custom"
          ? customWorkoutName
          : selectedWorkout ||
            workoutLevel,

      count:
        completedExercises.length,

      calories:
        caloriesBurned,
    };

    setHistory([
      ...history,
      workout,
    ]);

    setCompletedExercises([]);

    alert(
      "Workout saved successfully!"
    );
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

        <div className="navbar-brand">
          <h1>FitTrack</h1>
          <span>Fitness Tracker</span>
        </div>

        <nav className="nav-buttons">

          <button
            className={
              page === "dashboard"
                ? "active-nav"
                : ""
            }
            onClick={() =>
              setPage("dashboard")
            }
          >
            Dashboard
          </button>

          <button
            className={
              page === "workouts"
                ? "active-nav"
                : ""
            }
            onClick={() =>
              setPage("workouts")
            }
          >
            Workouts
          </button>

          <button
            className={
              page === "customWorkout"
                ? "active-nav"
                : ""
            }
            onClick={() =>
              setPage("customWorkout")
            }
          >
            Custom
          </button>

          <button
            className={
              page === "tracker"
                ? "active-nav"
                : ""
            }
            onClick={() =>
              setPage("tracker")
            }
          >
            Tracker
          </button>

          <button
            className={
              page === "progress"
                ? "active-nav"
                : ""
            }
            onClick={() =>
              setPage("progress")
            }
          >
            Progress
          </button>

          <button
            className={
              page === "profile"
                ? "active-nav"
                : ""
            }
            onClick={() =>
              setPage(isLoggedIn ? "profile" : "login")
            }
          >
            Profile
          </button>

          {isLoggedIn && (
            <button
              className="logout-btn"
              onClick={() => {
                const confirmLogout = window.confirm(
                  "Are you sure you want to logout?"
                );

                if (confirmLogout) {
                  setIsLoggedIn(false);
                  setPage("dashboard");
                  setCompletedExercises([]);
                }
              }}
            >
              Logout
            </button>
          )}

        </nav>

        {!isLoggedIn && (
          <div className="auth-buttons">

            <button
              className="login-btn"
              onClick={() => setPage("login")}
            >
              Login
            </button>

            <button
              className="signup-btn"
              onClick={() => setPage("signup")}
            >
              Sign Up
            </button>

          </div>
        )}

      </header>

      {/* =========================
          DASHBOARD
      ========================= */}

      {page === "dashboard" && (
        <main className="dashboard">

          <div className="welcome-section">

            <p className="dashboard-label">
              FITNESS DASHBOARD
            </p>

             <h2>
  {isLoggedIn
    ? `Welcome, ${name || "Jeevi D"}!`
    : "Welcome to FitTrack!"}
</h2>
            <p>
              Stay consistent, track your
              progress, and reach your
              fitness goals.
            </p>

          </div>

          <div className="dashboard-grid">

            <div className="dashboard-card workout-card">

              <div className="card-heading">
                <span>
                  Today's Workout
                </span>
              </div>

              <h2>
                {selectedWorkout ===
                "Custom"
                  ? customWorkoutName
                  : selectedWorkout ||
                    workoutLevel}
              </h2>

              <p>
                Complete your daily
                exercises and stay active.
              </p>

              <div className="card-detail">
                {selectedWorkout ===
                "Rest Day"
                  ? "Recovery day"
                  : `${exercises.length} exercises available`}
              </div>

              <button
                onClick={() =>
                  setPage("tracker")
                }
              >
                Start Workout
              </button>

            </div>

            <div className="dashboard-card">

              <div className="card-heading">
                <span>
                  Current Progress
                </span>
              </div>

              <div className="dashboard-progress">
                {selectedWorkout ===
                "Rest Day"
                  ? "—"
                  : `${progress}%`}
              </div>

              <p>
                {selectedWorkout ===
                "Rest Day"
                  ? "No exercises scheduled today"
                  : `${completedExercises.length} of ${exercises.length} exercises completed`}
              </p>

              <div className="dashboard-progress-bar">

                <div
                  className="dashboard-progress-fill"
                  style={{
                    width:
                      progress + "%",
                  }}
                ></div>

              </div>

              <p className="progress-message">
                {selectedWorkout ===
                "Rest Day"
                  ? "Take time to recover."
                  : progress === 0
                  ? "Start your workout to begin."
                  : progress === 100
                  ? "Workout completed!"
                  : "Keep going and finish your workout."}
              </p>

            </div>

            <div className="dashboard-card stat-card">

              <div className="card-heading">
                <span>
                  Total Calories
                </span>
              </div>

              <div className="dashboard-number">
                {totalCaloriesBurned}
              </div>

              <p>
                kcal from saved workouts
              </p>

            </div>

            <div className="dashboard-card stat-card">

              <div className="card-heading">
                <span>
                  Saved Workouts
                </span>
              </div>

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
              <span>Fitness Level</span>
              <strong>
                {fitnessLevel}
              </strong>
            </div>

            <div className="info-card">
              <span>Current Workout</span>
              <strong>
                {selectedWorkout ===
                "Custom"
                  ? customWorkoutName
                  : selectedWorkout ||
                    workoutLevel}
              </strong>
            </div>

            <div className="info-card">
              <span>Fitness Goal</span>
              <strong>
                {fitnessGoal}
              </strong>
            </div>

            <div className="info-card">
              <span>
                Exercises Available
              </span>
              <strong>
                {selectedWorkout ===
                "Rest Day"
                  ? 0
                  : exercises.length}
              </strong>
            </div>

          </div>

        </main>
      )}

      {/* =========================
          WORKOUTS
      ========================= */}

      {page === "workouts" && (
        <main className="workouts-page">

          <div className="workouts-header">

            <p className="page-label">
              WORKOUT PLANS
            </p>

            <h2>
              Choose Your Workout
            </h2>

            <p>
              Select a workout based on
              your current fitness level.
            </p>

          </div>

          <div className="workout-cards">

            {/* Beginner */}

            <div className="workout-card">

              <div className="workout-card-top">

                <span className="workout-level beginner-level">
                  Beginner
                </span>

                <span className="workout-duration">
                  20 min
                </span>

              </div>

              <h3>
                Start with the basics
              </h3>

              <p>
                Simple exercises designed
                to help you build strength,
                confidence, and consistency.
              </p>

              <div className="workout-details">

                <span>
                  {workoutPlans.Beginner.length} exercises
                </span>

                <span>
                  Easy intensity
                </span>

              </div>

              <button
                onClick={() => {
                  setSelectedWorkout(
                    "Beginner"
                  );

                  setWorkoutLevel(
                    "Beginner"
                  );

                  setCompletedExercises(
                    []
                  );

                  setPage("tracker");
                }}
              >
                Start Beginner
              </button>

            </div>

            {/* Intermediate */}

            <div className="workout-card">

              <div className="workout-card-top">

                <span className="workout-level intermediate-level">
                  Intermediate
                </span>

                <span className="workout-duration">
                  30 min
                </span>

              </div>

              <h3>
                Build your strength
              </h3>

              <p>
                A balanced workout for
                users who already have
                regular training experience.
              </p>

              <div className="workout-details">

                <span>
                  {workoutPlans.Intermediate.length} exercises
                </span>

                <span>
                  Medium intensity
                </span>

              </div>

              <button
                onClick={() => {
                  setSelectedWorkout(
                    "Intermediate"
                  );

                  setWorkoutLevel(
                    "Intermediate"
                  );

                  setCompletedExercises(
                    []
                  );

                  setPage("tracker");
                }}
              >
                Start Intermediate
              </button>

            </div>

            {/* Advanced */}

            <div className="workout-card">

              <div className="workout-card-top">

                <span className="workout-level advanced-level">
                  Advanced
                </span>

                <span className="workout-duration">
                  45 min
                </span>

              </div>

              <h3>
                Challenge yourself
              </h3>

              <p>
                A demanding full-body
                workout for users looking
                for a higher training
                intensity.
              </p>

              <div className="workout-details">

                <span>
                  {workoutPlans.Advanced.length} exercises
                </span>

                <span>
                  High intensity
                </span>

              </div>

              <button
                onClick={() => {
                  setSelectedWorkout(
                    "Advanced"
                  );

                  setWorkoutLevel(
                    "Advanced"
                  );

                  setCompletedExercises(
                    []
                  );

                  setPage("tracker");
                }}
              >
                Start Advanced
              </button>

            </div>

          </div>

          {/* BODY PART WORKOUTS */}

          <div className="body-part-section">

            <div className="body-part-heading">

              <p className="page-label">
                BODY-PART WORKOUTS
              </p>

              <h2>
                Choose a Body Part
              </h2>

              <p>
                Select a workout based on
                the body part you want to
                train.
              </p>

            </div>

            <div className="body-part-cards">

              {Object.keys(
                bodyPartWorkouts
              ).map((bodyPart) => (

                <div
                  className="body-part-card"
                  key={bodyPart}
                >

                  <h3>
                    {bodyPart}
                  </h3>

                  <p>
                    {
                      bodyPartWorkouts[
                        bodyPart
                      ].length
                    }{" "}
                    exercises
                  </p>

                  <button
                    onClick={() => {
                      setSelectedWorkout(
                        bodyPart
                      );

                      setCompletedExercises(
                        []
                      );

                      setPage("tracker");
                    }}
                  >
                    Start {bodyPart}
                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* REST DAY */}

          <div className="rest-day-section">

            <div className="rest-day-card">

              <div>

                <p className="page-label">
                  REST DAY
                </p>

                <h2>
                  Take a Rest
                </h2>

                <p>
                  Give your body time to
                  recover and prepare for
                  your next workout.
                </p>

              </div>

              <button
                onClick={() => {
                  setSelectedWorkout(
                    "Rest Day"
                  );

                  setCompletedExercises(
                    []
                  );

                  setPage("tracker");
                }}
              >
                Select Rest Day
              </button>

            </div>

          </div>

        </main>
      )}

      {/* =========================
          CUSTOM WORKOUT
      ========================= */}

      {page === "customWorkout" && (
        <main className="custom-workout-page">

          <div className="custom-workout-heading">

            <p className="page-label">
              CUSTOM WORKOUT
            </p>

            <h2>
              Create Your Own Workout
            </h2>

            <p>
              Add exercises and create a
              workout that suits your needs.
            </p>

          </div>

          <div className="custom-workout-card">

            <h3>
              Workout Name
            </h3>

            <input
              className="custom-workout-name-input"
              type="text"
              value={customWorkoutName}
              onChange={(event) =>
                setCustomWorkoutName(
                  event.target.value
                )
              }
              placeholder="Enter workout name"
            />

            <p>
              Add your own exercises and
              set a target for each exercise.
            </p>

            {!showAddForm && (
              <button
                className="primary-btn"
                onClick={openAddForm}
              >
                Add Exercise
              </button>
            )}

            {/* ADD CUSTOM EXERCISE FORM */}

            {showAddForm && (
              <div className="custom-add-form">

                <h4>
                  Add Exercise
                </h4>

                <input
                  type="text"
                  placeholder="Exercise name"
                  value={newExercise}
                  onChange={(event) =>
                    setNewExercise(
                      event.target.value
                    )
                  }
                />

                <input
                  type="number"
                  min="1"
                  placeholder="Target value"
                  value={newTargetValue}
                  onChange={(event) =>
                    setNewTargetValue(
                      event.target.value
                    )
                  }
                />

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

                <div className="custom-form-buttons">

                  <button
                    className="primary-btn"
                    onClick={
                      saveNewExercise
                    }
                    disabled={
                      !newExercise.trim() ||
                      !newTargetValue
                    }
                  >
                    Save Exercise
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewExercise("");
                      setNewTargetValue("");
                      setNewTargetType(
                        "reps"
                      );
                    }}
                  >
                    Cancel
                  </button>

                </div>

              </div>
            )}

            {/* EMPTY CUSTOM WORKOUT */}

            {customExercises.length ===
            0 ? (

              <div className="empty-custom-workout">

                <p>
                  No custom exercises
                  added yet.
                </p>

                <span>
                  Add your first exercise
                  to create your workout.
                </span>

              </div>

            ) : (

              <div className="custom-exercise-list">

                {customExercises.map(
                  (exercise) => (

                    <div
                      className="custom-exercise-item"
                      key={exercise.name}
                    >

                      <div>

                        <h4>
                          {exercise.name}
                        </h4>

                        <p>
                          Target:{" "}
                          {
                            exercise.targetValue
                          }{" "}
                          {
                            exercise.targetType
                          }
                        </p>

                      </div>

                      <div className="custom-exercise-actions">

                        <button
                          onClick={() =>
                            startEdit(
                              exercise.name
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteExercise(
                              exercise.name
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

            {/* EDIT CUSTOM EXERCISE */}

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

                <div className="edit-buttons">

                  <button
                    onClick={saveEdit}
                  >
                    Save
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

              </div>
            )}

            {/* START CUSTOM WORKOUT */}

            {customExercises.length >
              0 && (

              <button
                className="primary-btn start-custom-btn"
                onClick={() => {

                  const workoutName =
                    customWorkoutName.trim() ||
                    "My Custom Workout";

                  setCustomWorkoutName(
                    workoutName
                  );

                  setSelectedWorkout(
                    "Custom"
                  );

                  setWorkoutLevel(
                    workoutName
                  );

                  setCompletedExercises(
                    []
                  );

                  setPage("tracker");

                }}
              >
                Start Custom Workout
              </button>

            )}

          </div>

        </main>
      )}

      {/* =========================
          TRACKER
      ========================= */}

      {page === "tracker" && (
        <main className="tracker-page">

          <div className="tracker-heading">

            <p className="page-label">
              WORKOUT TRACKER
            </p>

            <h2>
              Exercise Tracker
            </h2>

            <p>
              Complete each exercise and
              track your workout progress.
            </p>

          </div>

          <div className="tracker-layout">

            <div className="tracker-card">

              <div className="tracker-card-header">

                <div>

                  <h3>
                    Today's Exercises
                  </h3>

                  <p>
                    Workout Level:{" "}
                    <strong>
                      {selectedWorkout ===
                      "Custom"
                        ? customWorkoutName
                        : selectedWorkout ||
                          fitnessLevel}
                    </strong>
                  </p>

                </div>

                {/* NO ADD EXERCISE BUTTON HERE */}

              </div>

              <div className="exercise-list">

                {selectedWorkout ===
                "Rest Day" ? (

                  <div className="rest-day-message">

                    <h3>
                      Rest Day
                    </h3>

                    <p>
                      Today is for recovery.
                      Take some time to relax
                      and get ready for your
                      next workout.
                    </p>

                  </div>

                ) : (

                  exercises.map(
                    (exercise) => {

                      const isCompleted =
                        completedExercises.includes(
                          exercise.name
                        );

                      return (
                        <div
                          className={`exercise-row ${
                            isCompleted
                              ? "exercise-row-completed"
                              : ""
                          }`}
                          key={exercise.name}
                        >

                          <button
                            className={
                              isCompleted
                                ? "complete-btn completed"
                                : "complete-btn"
                            }
                            onClick={() =>
                              toggleExercise(
                                exercise.name
                              )
                            }
                          >
                            {isCompleted
                              ? "Completed"
                              : "Complete"}
                          </button>

                          <div className="exercise-info">

                            <strong>
                              {
                                exercise.name
                              }
                            </strong>

                            <span>
                              Target:{" "}
                              {
                                exercise.target
                              }
                            </span>

                          </div>

                        </div>
                      );
                    }
                  )

                )}

              </div>

            </div>

            {/* TRACKER PROGRESS */}

            <div className="tracker-progress-card">

              <p className="progress-card-label">
                WORKOUT PROGRESS
              </p>

              <h3>
                Today's Progress
              </h3>

              <div className="tracker-percentage">

                {selectedWorkout ===
                "Rest Day"
                  ? "—"
                  : `${progress}%`}

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      progress + "%",
                  }}
                ></div>

              </div>

              <p className="progress-count">

                {selectedWorkout ===
                "Rest Day"
                  ? "No exercises scheduled today"
                  : `${completedExercises.length} of ${exercises.length} exercises completed`}

              </p>

              <div className="calories-section">

                <span>
                  Calories Burned
                </span>

                <strong>
                  {selectedWorkout ===
                  "Rest Day"
                    ? 0
                    : caloriesBurned}{" "}
                  kcal
                </strong>

              </div>

              {selectedWorkout !==
                "Rest Day" &&
                progress === 100 && (

                  <div className="completion-section">

                    <h4>
                      Workout Completed
                    </h4>

                    <p>
                      Great work! You
                      completed all
                      exercises.
                    </p>

                    <button
                      onClick={
                        saveWorkout
                      }
                      className="save-workout-btn"
                    >
                      Save Workout
                    </button>

                  </div>

                )}

              {selectedWorkout !==
                "Rest Day" &&
                completedExercises.length >
                  0 &&
                progress < 100 && (

                  <button
                    className="reset-workout-btn"
                    onClick={() =>
                      setCompletedExercises(
                        []
                      )
                    }
                  >
                    Reset Workout
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
        <main className="progress-page">

          <div className="progress-heading">

            <p className="page-label">
              FITNESS OVERVIEW
            </p>

            <h2>
              My Progress
            </h2>

            <p>
              Track your completed
              workouts, exercises,
              calories, and achievements.
            </p>

          </div>

          <div className="progress-stats">

            <div className="progress-stat-card">

              <p className="stat-label">
                TOTAL WORKOUTS
              </p>

              <h1>
                {totalWorkouts}
              </h1>

              <p>
                Workouts completed and
                saved.
              </p>

            </div>

            <div className="progress-stat-card">

              <p className="stat-label">
                EXERCISES COMPLETED
              </p>

              <h1>
                {totalExercisesCompleted}
              </h1>

              <p>
                Total exercises from saved
                workouts.
              </p>

            </div>

            <div className="progress-stat-card">

              <p className="stat-label">
                TOTAL CALORIES
              </p>

              <h1>
                {totalCaloriesBurned}{" "}
                <span>kcal</span>
              </h1>

              <p>
                Calories from saved
                workouts.
              </p>

            </div>

            <div className="progress-stat-card">

              <p className="stat-label">
                FITNESS GOAL
              </p>

              <h1 className="goal-value">
                {fitnessGoal}
              </h1>

              <p>
                Your current fitness goal.
              </p>

            </div>

          </div>

          <div className="progress-content">

            <div className="progress-panel">

              <div className="panel-header">

                <div>

                  <p className="panel-label">
                    ACHIEVEMENT
                  </p>

                  <h3>
                    Workout Milestone
                  </h3>

                </div>

              </div>

              {totalWorkouts > 0 ? (

                <div className="achievement-message">

                  <h4>
                    Great progress!
                  </h4>

                  <p>
                    You have completed{" "}
                    {totalWorkouts} workout
                    {totalWorkouts > 1
                      ? "s"
                      : ""}
                    .
                  </p>

                </div>

              ) : (

                <div className="achievement-message">

                  <h4>
                    Start your journey
                  </h4>

                  <p>
                    Complete your first
                    workout to begin
                    tracking your progress.
                  </p>

                </div>

              )}

            </div>

            <div className="progress-panel">

              <div className="panel-header">

                <div>

                  <p className="panel-label">
                    ACHIEVEMENTS
                  </p>

                  <h3>
                    Your Milestones
                  </h3>

                </div>

              </div>

              <div className="achievement-list">

                <div
                  className={
                    achievements.firstWorkout
                      ? "achievement-item unlocked"
                      : "achievement-item"
                  }
                >

                  <div>

                    <strong>
                      First Workout
                    </strong>

                    <p>
                      Complete your first
                      workout.
                    </p>

                  </div>

                  <span>
                    {achievements.firstWorkout
                      ? "Unlocked"
                      : "Locked"}
                  </span>

                </div>

                <div
                  className={
                    achievements.fiveWorkouts
                      ? "achievement-item unlocked"
                      : "achievement-item"
                  }
                >

                  <div>

                    <strong>
                      Consistent Trainer
                    </strong>

                    <p>
                      Complete five
                      workouts.
                    </p>

                  </div>

                  <span>
                    {achievements.fiveWorkouts
                      ? "Unlocked"
                      : "Locked"}
                  </span>

                </div>

                <div
                  className={
                    achievements.tenWorkouts
                      ? "achievement-item unlocked"
                      : "achievement-item"
                  }
                >

                  <div>

                    <strong>
                      Fitness Champion
                    </strong>

                    <p>
                      Complete ten
                      workouts.
                    </p>

                  </div>

                  <span>
                    {achievements.tenWorkouts
                      ? "Unlocked"
                      : "Locked"}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* HISTORY */}

          <div className="history-panel">

            <div className="history-header">

              <div>

                <p className="panel-label">
                  WORKOUT HISTORY
                </p>

                <h3>
                  Saved Workouts
                </h3>

              </div>

              {history.length > 0 && (

                <button
                  className="delete-history-btn"
                  onClick={() => {

                    const confirmDelete =
                      window.confirm(
                        "Are you sure you want to delete all workout history?"
                      );

                    if (
                      confirmDelete
                    ) {
                      setHistory([]);
                    }

                  }}
                >
                  Delete History
                </button>

              )}

            </div>

            {history.length === 0 ? (

              <div className="empty-history">

                <p>
                  No workouts saved yet.
                </p>

              </div>

            ) : (

              <div className="history-list">

                {history.map(
                  (workout, index) => (

                    <div
                      className="history-item"
                      key={index}
                    >

                      <div className="history-main">

                        <strong>
                          {workout.date}
                        </strong>

                        <span>
                          Level:{" "}
                          {workout.level}
                        </span>

                      </div>

                      <div className="history-details">

                        <span>
                          {workout.count}{" "}
                          exercises
                        </span>

                        <span>
                          {workout.calories ||
                            0}{" "}
                          kcal
                        </span>

                      </div>

                      <button
                        className="delete-item-btn"
                        onClick={() => {

                          const confirmDelete =
                            window.confirm(
                              "Delete this workout from history?"
                            );

                          if (
                            confirmDelete
                          ) {
                            deleteHistoryItem(
                              index
                            );
                          }

                        }}
                      >
                        Delete
                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </main>
      )}

      {/* =========================
          PROFILE
      ========================= */}
{page === "login" && (
  <main className="login-page">
    <div className="login-card">
      <p className="page-label">ACCOUNT LOGIN</p>

      <h2>Welcome Back</h2>

      <p className="login-description">
        Sign in to continue using your fitness tracker.
      </p>

      <div className="login-form">
        <div className="login-form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="login-form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <button
          className="login-submit-btn"
          onClick={() => {
  setIsLoggedIn(true);
  setPage("dashboard");
}}
        >
          Login
        </button>

        <button
          className="login-back-btn"
          onClick={() => setPage("dashboard")}
        >
          Back to Dashboard
          </button>
           
        <p className="login-signup-link">
  Don't have an account?
  <button onClick={() => setPage("signup")}>
    Sign Up
  </button>
</p>
      </div>
    </div>
  </main>
)}

{page === "signup" && (
  <main className="signup-page">
    <div className="signup-card">
      <p className="page-label">CREATE ACCOUNT</p>

      <h2>Create Your Account</h2>

      <p className="signup-description">
        Create an account to continue using your fitness tracker.
      </p>

      <div className="signup-form">

        <div className="signup-form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <div className="signup-form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="signup-form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
          />
        </div>

        <button
          className="signup-submit-btn"
           onClick={() => {
  alert("Account created successfully!");
  setPage("login");
}}
        >
          Create Account
        </button>

        <button
          className="signup-back-btn"
          onClick={() => setPage("dashboard")}
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  </main>
)}
      {page === "profile" && (
        <main className="profile-page">

          <div className="profile-heading">

            <p className="page-label">
              PERSONAL SETTINGS
            </p>

            <h2>
              My Profile
            </h2>

            <p>
              Manage your personal
              information, fitness level,
              and goals.
            </p>

          </div>

          <div className="profile-layout">

            {/* PERSONAL INFORMATION */}

            <div className="profile-card">

              <div className="profile-card-header">

                <p className="panel-label">
                  PROFILE INFORMATION
                </p>

                <h3>
                  Personal Information
                </h3>

                <p>
                  Update your details and
                  fitness preferences.
                </p>

              </div>

              <div className="profile-form">

                <div className="profile-form-group">

                  <label>
                    Your Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                  />

                </div>

                <div className="profile-form-group">

                  <label>
                    Fitness Level
                  </label>

                  <select
                    value={fitnessLevel}
                    onChange={(event) => {

                      const level =
                        event.target.value;

                      setFitnessLevel(
                        level
                      );

                      setWorkoutLevel(
                        level
                      );

                      setSelectedWorkout(
                        level
                      );

                      setCompletedExercises(
                        []
                      );

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

                </div>

                <div className="profile-form-group">

                  <label>
                    Fitness Goal
                  </label>

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

                </div>

                <button
                  className="save-profile-btn"
                  onClick={() => {

                    localStorage.setItem(
                      "profileName",
                      name
                    );

                    localStorage.setItem(
                      "fitnessLevel",
                      fitnessLevel
                    );

                    localStorage.setItem(
                      "fitnessGoal",
                      fitnessGoal
                    );

                    setSelectedWorkout(
                      fitnessLevel
                    );

                    setWorkoutLevel(
                      fitnessLevel
                    );

                    alert(
                      "Profile saved successfully!"
                    );

                  }}
                >
                  Save Profile
                </button>

                <p className="profile-save-note">
                  Your information is
                  saved automatically.
                </p>

              </div>

            </div>

            {/* STATISTICS */}

            <div className="profile-card">

              <div className="profile-card-header">

                <p className="panel-label">
                  FITNESS SUMMARY
                </p>

                <h3>
                  Your Statistics
                </h3>

                <p>
                  A quick overview of your
                  current fitness activity.
                </p>

              </div>

              <div className="profile-stat-list">

                <div className="profile-stat-row">

                  <span>
                    Fitness Level
                  </span>

                  <strong>
                    {fitnessLevel}
                  </strong>

                </div>

                <div className="profile-stat-row">

                  <span>
                    Fitness Goal
                  </span>

                  <strong>
                    {fitnessGoal}
                  </strong>

                </div>

                <div className="profile-stat-row">

                  <span>
                    Current Workout
                  </span>

                  <strong>
                    {selectedWorkout ===
                    "Custom"
                      ? customWorkoutName
                      : selectedWorkout ||
                        workoutLevel}
                  </strong>

                </div>

                <div className="profile-stat-row">

                  <span>
                    Exercises Available
                  </span>

                  <strong>
                    {selectedWorkout ===
                    "Rest Day"
                      ? 0
                      : exercises.length}
                  </strong>

                </div>

                <div className="profile-stat-row">

                  <span>
                    Exercises Completed
                  </span>

                  <strong>
                    {totalExercisesCompleted}
                  </strong>

                </div>

                <div className="profile-stat-row">

                  <span>
                    Saved Workouts
                  </span>

                  <strong>
                    {totalWorkouts}
                  </strong>

                </div>

                <div className="profile-stat-row">

                  <span>
                    Total Calories
                  </span>

                  <strong>
                    {totalCaloriesBurned} kcal
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </main>
      )}

    </div>
  );
}

export default App;