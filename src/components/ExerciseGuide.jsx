import WorkoutGuidance from "./WorkoutGuidance";

export default function ExerciseGuide({
  exercise,
  level = "Beginner",
  category,
  onBack,
  onComplete,
  onSaveWorkout,
  completedExercises = [],
}) {
  return (
    <WorkoutGuidance
      initialExercise={exercise}
      initialLevel={level}
      initialCategory={category}
      onBack={onBack}
      onCompleteExercise={(name) => {
        if (onComplete) onComplete(name);
      }}
      onSaveWorkoutToHistory={onSaveWorkout}
      completedList={completedExercises}
    />
  );
}
