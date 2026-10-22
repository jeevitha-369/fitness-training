import { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import WorkoutPlans from "./pages/WorkoutPlans";
import ExerciseTracker from "./pages/ExerciseTracker";
import Progress from "./pages/Progress";
import WorkoutHistory from "./pages/WorkoutHistory";
import Profile from "./pages/Profile";
import ExerciseGuide from "./components/ExerciseGuide";
import { WORKOUT_CATEGORIES_DATA, findExerciseByStableId } from "./data/workoutData";
import "./App.css";

export default function App() {
  // =========================
  // ROUTING & NAVIGATION WITH HASH SUPPORT
  // =========================
  const getInitialPage = () => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("exercise") || searchParams.get("id")) {
        return "exerciseGuide";
      }
      const rawHash = window.location.hash.replace("#", "");
      const cleanHash = rawHash.split("?")[0];
      const validPages = [
        "dashboard",
        "workouts",
        "tracker",
        "exerciseGuide",
        "progress",
        "history",
        "profile",
      ];
      if (validPages.includes(cleanHash)) return cleanHash;
    }
    return localStorage.getItem("fittrack_active_page") || "dashboard";
  };

  const [page, setPage] = useState(getInitialPage);
  const [previousPage, setPreviousPage] = useState("tracker");

  // Keep hash and localStorage in sync
  useEffect(() => {
    localStorage.setItem("fittrack_active_page", page);
    if (window.location.hash !== `#${page}`) {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  

  // =========================
  // WORKOUT SELECTION
  // =========================
  const [selectedWorkout, setSelectedWorkout] = useState(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const exParam = searchParams.get("exercise") || searchParams.get("id");
      if (exParam) {
        const found = findExerciseByStableId(exParam);
        if (found) return found.category.name;
      }
      const hash = window.location.hash;
      const match = hash.match(/[?&]id=([a-zA-Z0-9-_]+)/);
      if (match) {
        const found = findExerciseByStableId(match[1]);
        if (found) return found.category.name;
      }
    }
    return localStorage.getItem("selectedWorkout") || "Beginner";
  });

  useEffect(() => {
    localStorage.setItem("selectedWorkout", selectedWorkout);
  }, [selectedWorkout]);

  // Current Plan Exercises
  const exercises = useMemo(() => {
    const cat = WORKOUT_CATEGORIES_DATA[selectedWorkout];
    if (cat && cat.exercises) return cat.exercises;
    return WORKOUT_CATEGORIES_DATA.Beginner.exercises;
  }, [selectedWorkout]);

  // Selected Exercise for Guidance
  const [selectedExercise, setSelectedExercise] = useState(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const exParam = searchParams.get("exercise") || searchParams.get("id");
      if (exParam) {
        const found = findExerciseByStableId(exParam);
        if (found) return found.exercise;
      }
      const hash = window.location.hash;
      const match = hash.match(/[?&]id=([a-zA-Z0-9-_]+)/);
      if (match) {
        const found = findExerciseByStableId(match[1]);
        if (found) return found.exercise;
      }
    }
    try {
      const saved = localStorage.getItem("selectedExercise");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (selectedExercise) {
      localStorage.setItem("selectedExercise", JSON.stringify(selectedExercise));
    }
  }, [selectedExercise]);

  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace("#", "");
      const cleanHash = rawHash.split("?")[0];
      const match = rawHash.match(/[?&]id=([a-zA-Z0-9-_]+)/);
      if (match) {
        const found = findExerciseByStableId(match[1]);
        if (found) {
          setSelectedWorkout(found.category.name);
          setSelectedExercise(found.exercise);
          setPage("exerciseGuide");
          return;
        }
      }
      const valid = [
        "dashboard",
        "workouts",
        "tracker",
        "exerciseGuide",
        "progress",
        "history",
        "profile",
      ];
      if (valid.includes(cleanHash)) {
        setPage(cleanHash);
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // =========================
  // COMPLETED EXERCISES (PERSISTENT STABLE IDS)
  // =========================
  const [completedExercises, setCompletedExercises] = useState(() => {
    try {
      const saved = localStorage.getItem("completedExercises");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "completedExercises",
      JSON.stringify(completedExercises)
    );
  }, [completedExercises]);

  // =========================
  // WORKOUT HISTORY
  // =========================
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("workoutHistory");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("workoutHistory", JSON.stringify(history));
  }, [history]);

  // =========================
  // USER PROFILE SETTINGS
  // =========================
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem("profileName") || "Jeevi D";
  });

  const [fitnessLevel, setFitnessLevel] = useState(() => {
    return localStorage.getItem("fitnessLevel") || "Beginner";
  });

  const [fitnessGoal, setFitnessGoal] = useState(() => {
    return localStorage.getItem("fitnessGoal") || "Stay Active & Build Strength";
  });

  const [dailyTargetMinutes, setDailyTargetMinutes] = useState(() => {
    return Number(localStorage.getItem("dailyTargetMinutes")) || 25;
  });

  useEffect(() => {
    localStorage.setItem("profileName", profileName);
    localStorage.setItem("fitnessLevel", fitnessLevel);
    localStorage.setItem("fitnessGoal", fitnessGoal);
    localStorage.setItem("dailyTargetMinutes", String(dailyTargetMinutes));
  }, [profileName, fitnessLevel, fitnessGoal, dailyTargetMinutes]);

  // =========================
  // HANDLERS
  // =========================

  // Toggle single exercise by unique ID
  const handleToggleExercise = (exerciseId) => {
    setCompletedExercises((prev) => {
      if (prev.includes(exerciseId)) {
        return prev.filter((id) => id !== exerciseId);
      } else {
        return [...prev, exerciseId];
      }
    });
  };

  // Set active plan and navigate to tracker
  const handleSelectWorkout = (planName) => {
    setSelectedWorkout(planName);
    setPage("tracker");
  };

  // Open guidance for specific exercise
  const handleOpenExerciseGuide = (exercise) => {
    setSelectedExercise(exercise);
    setPreviousPage(page === "exerciseGuide" ? "tracker" : page);
    setPage("exerciseGuide");
  };

  // Open guidance for a full plan (defaults to first exercise)
  const handleOpenGuideForPlan = (planName) => {
    setSelectedWorkout(planName);
    const cat = WORKOUT_CATEGORIES_DATA[planName];
    if (cat && cat.exercises && cat.exercises.length > 0) {
      setSelectedExercise(cat.exercises[0]);
    }
    setPreviousPage("workouts");
    setPage("exerciseGuide");
  };

  // Finish Workout & Log Session (with duplicate debounce)
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState(0);

  const handleFinishWorkout = (summary) => {
    const now = Date.now();
    // Debounce protection: ignore duplicate requests within 4 seconds
    if (now - lastSavedTimestamp < 4000) {
      return;
    }
    setLastSavedTimestamp(now);

    const levelName = summary.level || selectedWorkout;
    const count = summary.count || 1;
    const total = summary.totalExercises || exercises.length;
    const cal = summary.calories || 35;
    const duration = summary.durationMinutes || 20;
    const exIds = summary.exerciseIds || [];
    const exNames = summary.exerciseNames || [];

    const newRecord = {
      id: "workout-" + now + "-" + Math.random().toString(36).substr(2, 5),
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      level: levelName,
      count: count,
      totalExercises: total,
      exerciseIds: exIds,
      exerciseNames: exNames,
      calories: cal,
      durationMinutes: duration,
      status: "Completed",
      timestamp: now,
    };

    setHistory((prev) => [...prev, newRecord]);
  };

  // Reset active workout only (preserves all other levels)
  const handleResetWorkout = useCallback(
    (workoutName) => {
      const cat = WORKOUT_CATEGORIES_DATA[workoutName];
      if (!cat || !cat.exercises) return;

      const idsToRemove = new Set(cat.exercises.map((e) => e.id));
      setCompletedExercises((prev) =>
        prev.filter((id) => !idsToRemove.has(id))
      );
    },
    []
  );

  // Delete single history item
  const handleDeleteHistoryItem = (idOrIndex) => {
    setHistory((prev) => {
      if (typeof idOrIndex === "string") {
        return prev.filter((item) => item.id !== idOrIndex);
      }
      return prev.filter((_, idx) => idx !== idOrIndex);
    });
  };

  // Clear all history
  const handleClearAllHistory = () => {
    setHistory([]);
  };

  // Save profile settings
  const handleSaveProfile = (newProfile) => {
    if (newProfile.name) setProfileName(newProfile.name);
    if (newProfile.fitnessLevel) setFitnessLevel(newProfile.fitnessLevel);
    if (newProfile.fitnessGoal) setFitnessGoal(newProfile.fitnessGoal);
    if (newProfile.dailyTargetMinutes)
      setDailyTargetMinutes(newProfile.dailyTargetMinutes);
  };

  // Clear all local storage data
  const handleClearAllData = () => {
    setCompletedExercises([]);
    setHistory([]);
    setSelectedWorkout("Beginner");
    setFitnessLevel("Beginner");
    localStorage.removeItem("completedExercises");
    localStorage.removeItem("workoutHistory");
    localStorage.removeItem("selectedWorkout");
  };

  return (
    <div className="fittrack-app-root">
      {/* Navbar */}
      <Navbar
        activePage={page}
        onNavigate={setPage}
        isLoggedIn={true}
        onLogout={() => setPage("dashboard")}
        profileName={profileName}
        fitnessLevel={fitnessLevel}
        historyCount={history.length}
      />

      {/* Main Page Routing */}
      <main className="main-content-area">
        {page === "dashboard" && (
          <Dashboard
            profileName={profileName}
            fitnessLevel={fitnessLevel}
            fitnessGoal={fitnessGoal}
            selectedWorkout={selectedWorkout}
            exercises={exercises}
            completedExercises={completedExercises}
            workoutHistory={history}
            onNavigate={setPage}
            onSelectWorkout={handleSelectWorkout}
            onOpenExercise={handleOpenExerciseGuide}
          />
        )}

        {page === "workouts" && (
          <WorkoutPlans
            selectedWorkout={selectedWorkout}
            onSelectWorkout={handleSelectWorkout}
            onOpenGuide={handleOpenGuideForPlan}
            completedExercises={completedExercises}
          />
        )}

        {page === "tracker" && (
          <ExerciseTracker
            selectedWorkout={selectedWorkout}
            exercises={exercises}
            completedExercises={completedExercises}
            onToggleExercise={handleToggleExercise}
            onOpenExerciseGuide={handleOpenExerciseGuide}
            onFinishWorkout={handleFinishWorkout}
            onResetWorkout={handleResetWorkout}
            onNavigate={setPage}
          />
        )}

        {page === "exerciseGuide" && (
          <ExerciseGuide
            exercise={selectedExercise || exercises[0]}
            level={selectedWorkout}
            category={selectedWorkout}
            onBack={() => setPage(previousPage || "tracker")}
            onComplete={(exerciseId) => {
              if (exerciseId) {
                setCompletedExercises((prev) =>
                  prev.includes(exerciseId) ? prev : [...prev, exerciseId]
                );
              }
            }}
            onSaveWorkout={(summaryData) => {
              handleFinishWorkout(summaryData);
            }}
            completedExercises={completedExercises}
          />
        )}

        {page === "progress" && (
          <Progress
            completedExercises={completedExercises}
            workoutHistory={history}
            selectedWorkout={selectedWorkout}
            onNavigate={setPage}
          />
        )}

        {page === "history" && (
          <WorkoutHistory
            workoutHistory={history}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onClearAllHistory={handleClearAllHistory}
            onNavigate={setPage}
          />
        )}

        {page === "profile" && (
          <Profile
            profileName={profileName}
            fitnessLevel={fitnessLevel}
            fitnessGoal={fitnessGoal}
            dailyTargetMinutes={dailyTargetMinutes}
            workoutHistory={history}
            completedExercises={completedExercises}
            onSaveProfile={handleSaveProfile}
            onClearAllData={handleClearAllData}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="fittrack-footer">
        <div className="footer-content">
          <div className="footer-left">
            <strong>FitTrack Pro</strong> • Advanced Personal Fitness &amp; Kinetic Form System
          </div>
          <div className="footer-right">
            <span>Client-Side Local Storage • Verified Demonstrations &amp; Kinematic Guidance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
