import { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import WorkoutPlans from "./pages/WorkoutPlans";
import ExerciseTracker from "./pages/ExerciseTracker";
import Progress from "./pages/Progress";
import WorkoutHistory from "./pages/WorkoutHistory";
import Profile from "./pages/Profile";
import ExerciseGuide from "./components/ExerciseGuide";
import DietPlan from "./pages/DietPlan";
import AuthPage from "./pages/AuthPage";
import { getCurrentSession, clearCurrentSession } from "./utils/authUtils";
import { WORKOUT_CATEGORIES_DATA, findExerciseByStableId } from "./data/workoutData";
import "./App.css";

const VALID_PAGES = [
  "dashboard",
  "workouts",
  "tracker",
  "exerciseGuide",
  "dietPlan",
  "progress",
  "history",
  "profile",
  "auth",
];

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
      if (VALID_PAGES.includes(cleanHash)) return cleanHash;
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
    const saved = localStorage.getItem("selectedWorkout");
    if (saved && ["Beginner", "Intermediate", "Advanced"].includes(saved)) {
      return saved;
    }
    return "Beginner";
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
      if (VALID_PAGES.includes(cleanHash)) {
        setPage(cleanHash);
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // =========================
  // PERSISTED FITNESS STATE
  // =========================
  const [completedExercises, setCompletedExercises] = useState(() => {
    try {
      const saved = localStorage.getItem("completedExercises");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("completedExercises", JSON.stringify(completedExercises));
  }, [completedExercises]);

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("workoutHistory");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("workoutHistory", JSON.stringify(history));
  }, [history]);

  // Profile preferences
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem("profileName") || "Jeevi D";
  });
  const [fitnessLevel, setFitnessLevel] = useState(() => {
    const lvl = localStorage.getItem("fitnessLevel");
    return lvl && ["Beginner", "Intermediate", "Advanced"].includes(lvl) ? lvl : "Beginner";
  });
  const [fitnessGoal, setFitnessGoal] = useState(() => {
    return localStorage.getItem("fitnessGoal") || "Stay Active & Build Strength";
  });
  const [dailyTargetMinutes, setDailyTargetMinutes] = useState(() => {
    return Number(localStorage.getItem("dailyTargetMinutes")) || 25;
  });

  // Theme (light / dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("fittrack_theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("fittrack_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Toast feedback
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2600);
  };

  // Dietary Preference (veg / nonveg)
  const [dietaryPreference, setDietaryPreference] = useState(() => {
    return localStorage.getItem("dietaryPreference") || "veg";
  });

  useEffect(() => {
    localStorage.setItem("dietaryPreference", dietaryPreference);
  }, [dietaryPreference]);

  useEffect(() => {
    localStorage.setItem("profileName", profileName);
    localStorage.setItem("fitnessLevel", fitnessLevel);
    localStorage.setItem("fitnessGoal", fitnessGoal);
    localStorage.setItem("dailyTargetMinutes", String(dailyTargetMinutes));
  }, [profileName, fitnessLevel, fitnessGoal, dailyTargetMinutes]);

  // =========================
  // FRONTEND DEMO AUTHENTICATION SESSION
  // =========================
  const [currentUser, setCurrentUser] = useState(() => {
    return getCurrentSession();
  });

  const handleLoginSuccess = (session) => {
    setCurrentUser(session);
    if (session.name) setProfileName(session.name);
    if (session.fitnessLevel) {
      setFitnessLevel(session.fitnessLevel);
      setSelectedWorkout(session.fitnessLevel);
    }
  };

  const handleLogout = () => {
    clearCurrentSession();
    setCurrentUser(null);
    setPage("auth");
  };

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

  // Open guidance for specific exercise (guarantees matching level is selected)
  const handleOpenExerciseGuide = (exercise, planName) => {
    let resolvedPlan = planName;
    if (!resolvedPlan && exercise?.id) {
      const match = findExerciseByStableId(exercise.id);
      if (match?.category?.name) {
        resolvedPlan = match.category.name;
      }
    }
    if (resolvedPlan) {
      setSelectedWorkout(resolvedPlan);
    }
    setSelectedExercise(exercise);
    setPreviousPage(page === "exerciseGuide" ? "tracker" : page);
    setPage("exerciseGuide");
  };

  // Open guidance for a full plan (defaults to first exercise or specific)
  const handleOpenGuideForPlan = (planName, specificExercise) => {
    setSelectedWorkout(planName);
    const cat = WORKOUT_CATEGORIES_DATA[planName];
    if (specificExercise) {
      setSelectedExercise(specificExercise);
    } else if (cat && cat.exercises && cat.exercises.length > 0) {
      setSelectedExercise(cat.exercises[0]);
    }
    setPreviousPage("workouts");
    setPage("exerciseGuide");
  };

  // Finish Workout & Log Session (with duplicate debounce)
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState(0);

  const handleFinishWorkout = (summary) => {
    const now = Date.now();
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
    if (newProfile.dietaryPreference)
      setDietaryPreference(newProfile.dietaryPreference);
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
    localStorage.removeItem("selectedExercise");
  };

  return (
    <div className="fittrack-app-root">
      {/* Navbar */}
      <Navbar
        activePage={page}
        onNavigate={setPage}
        currentUser={currentUser}
        onLogout={handleLogout}
        profileName={profileName}
        fitnessLevel={fitnessLevel}
        historyCount={history.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
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
            key={`${selectedWorkout}-${selectedExercise?.id || "default"}`}
            exercise={selectedExercise || exercises[0]}
            level={selectedWorkout}
            category={selectedWorkout}
            onLevelChange={(lvl) => {
              setSelectedWorkout(lvl);
              const cat = WORKOUT_CATEGORIES_DATA[lvl];
              if (cat?.exercises?.length > 0) {
                setSelectedExercise(cat.exercises[0]);
              }
            }}
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

        {page === "dietPlan" && (
          <DietPlan
            activeLevel={selectedWorkout}
            dietaryPreference={dietaryPreference}
            onSelectLevel={(lvl) => {
              setSelectedWorkout(lvl);
              setFitnessLevel(lvl);
            }}
            onDietPreferenceChange={setDietaryPreference}
            onNavigate={setPage}
            showToast={showToast}
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
            dietaryPreference={dietaryPreference}
            workoutHistory={history}
            completedExercises={completedExercises}
            currentUser={currentUser}
            onSaveProfile={handleSaveProfile}
            onClearAllData={handleClearAllData}
            onLogout={handleLogout}
            onNavigate={setPage}
          />
        )}

        {page === "auth" && (
          <AuthPage
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            onNavigate={setPage}
          />
        )}
      </main>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fittrack-toast-banner" role="status" aria-live="polite">
          <span className="toast-icon">✓</span>
          <span className="toast-msg">{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="fittrack-footer">
        <div className="footer-content">
          <div className="footer-left">
            <strong>FitTrack Pro</strong> • Verified Online Human Exercise Video Guides &amp; Indian Diet Plans
          </div>
          <div className="footer-right">
            <span>Client-Side Local Storage • 3 Core Levels: Beginner, Intermediate, Advanced</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
