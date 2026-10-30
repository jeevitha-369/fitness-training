import WorkoutGuidance from "./WorkoutGuidance";

export default function ExerciseGuide({
  exercise,
  level = "Beginner",
  category,
  onBack,
  onComplete,
  onSaveWorkout,
  completedExercises = [],
  onLevelChange,
}) {
  return (
    <WorkoutGuidance
      initialExercise={exercise}
      initialLevel={level}
      initialCategory={category}
      onBack={onBack}
      onLevelChange={onLevelChange}
      onCompleteExercise={(name) => {
        if (onComplete) onComplete(name);
      }}
      onSaveWorkoutToHistory={onSaveWorkout}
      completedList={completedExercises}
    />
  );
}
