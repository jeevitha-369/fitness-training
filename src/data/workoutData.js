// FITTRACK WORKOUT & EXERCISE DATA
// Strictly 3 Categories: Beginner, Intermediate, Advanced
// Local In-App Female Trainer Videos & Kinetic Form Guidance

export const WORKOUT_CATEGORIES = {
  LEVELS: ["Beginner", "Intermediate", "Advanced"],
};

export const WORKOUT_CATEGORIES_DATA = {
  Beginner: {
    id: "beginner",
    name: "Beginner",
    type: "level",
    duration: "20 min",
    intensity: "Easy",
    description: "Gentle yet effective foundational routines designed to build core strength, mobility, and confidence.",
    badgeColor: "badge-easy",
    icon: "🌱",
    exercises: [
      {
        id: "beginner-jumping-jacks",
        hasLocalVideo: true,
        name: "Jumping Jacks",
        target: "15 reps",
        targetCount: 15,
        isTimed: false,
        calories: 10,
        videoUrl: "/videos/exercises/jumping-jacks.mp4",
        referenceImage: "/images/exercises/jumping-jacks.jpg",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "beginner-bodyweight-squats",
        hasLocalVideo: true,
        name: "Bodyweight Squats",
        target: "10 reps",
        targetCount: 10,
        isTimed: false,
        calories: 8,
        videoUrl: "/videos/exercises/bodyweight-squats.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "beginner-wall-pushups",
        hasLocalVideo: true,
        name: "Wall Push-Ups",
        target: "8 reps",
        targetCount: 8,
        isTimed: false,
        calories: 5,
        videoUrl: "/videos/exercises/wall-pushups.mp4",
        referenceImage: "/images/exercises/wall-pushups.jpg",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "beginner-lunges",
        hasLocalVideo: true,
        name: "Lunges",
        target: "10 reps",
        targetCount: 10,
        isTimed: false,
        calories: 8,
        videoUrl: "/videos/exercises/lunges.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "beginner-plank",
        hasLocalVideo: true,
        name: "Plank",
        target: "20 seconds",
        targetCount: 20,
        isTimed: true,
        calories: 5,
        videoUrl: "/videos/exercises/plank.mp4",
        referenceImage: "/images/exercises/plank.jpg",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
    ],
  },

  Intermediate: {
    id: "intermediate",
    name: "Intermediate",
    type: "level",
    duration: "30 min",
    intensity: "Medium",
    description: "Progressively challenging calisthenics to elevate muscular endurance, posture, and core power.",
    badgeColor: "badge-medium",
    icon: "⚡",
    exercises: [
      {
        id: "intermediate-high-knees",
        hasLocalVideo: true,
        name: "High Knees",
        target: "25 reps",
        targetCount: 25,
        isTimed: false,
        calories: 12,
        videoUrl: "/videos/exercises/high-knees.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "intermediate-pushups",
        hasLocalVideo: true,
        name: "Push-Ups",
        target: "15 reps",
        targetCount: 15,
        isTimed: false,
        calories: 10,
        videoUrl: "/videos/exercises/push-ups.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "intermediate-squats",
        hasLocalVideo: true,
        name: "Squats",
        target: "20 reps",
        targetCount: 20,
        isTimed: false,
        calories: 12,
        videoUrl: "/videos/exercises/squats.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "intermediate-reverse-lunges",
        hasLocalVideo: true,
        name: "Reverse Lunges",
        target: "15 reps",
        targetCount: 15,
        isTimed: false,
        calories: 10,
        videoUrl: "/videos/exercises/reverse-lunges.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "intermediate-mountain-climbers",
        hasLocalVideo: true,
        name: "Mountain Climbers",
        target: "20 reps",
        targetCount: 20,
        isTimed: false,
        calories: 12,
        videoUrl: "/videos/exercises/mountain-climbers.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "intermediate-plank",
        hasLocalVideo: true,
        name: "Plank",
        target: "30 seconds",
        targetCount: 30,
        isTimed: true,
        calories: 8,
        videoUrl: "/videos/exercises/plank.mp4",
        referenceImage: "/images/exercises/plank.jpg",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
    ],
  },

  Advanced: {
    id: "advanced",
    name: "Advanced",
    type: "level",
    duration: "45 min",
    intensity: "High",
    description: "High-intensity athletic training with explosive plyometrics and strict bodyweight movements.",
    badgeColor: "badge-hard",
    icon: "🔥",
    exercises: [
      {
        id: "advanced-burpees",
        hasLocalVideo: true,
        name: "Burpees",
        target: "15 reps",
        targetCount: 15,
        isTimed: false,
        calories: 18,
        videoUrl: "/videos/exercises/burpees.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "advanced-jump-squats",
        hasLocalVideo: true,
        name: "Jump Squats",
        target: "20 reps",
        targetCount: 20,
        isTimed: false,
        calories: 16,
        videoUrl: "/videos/exercises/jump-squats.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "advanced-pushups",
        hasLocalVideo: true,
        name: "Push-Ups",
        target: "25 reps",
        targetCount: 25,
        isTimed: false,
        calories: 16,
        videoUrl: "/videos/exercises/push-ups.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "advanced-mountain-climbers",
        hasLocalVideo: true,
        name: "Mountain Climbers",
        target: "30 reps",
        targetCount: 30,
        isTimed: false,
        calories: 18,
        videoUrl: "/videos/exercises/mountain-climbers.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "advanced-jumping-lunges",
        hasLocalVideo: true,
        name: "Jumping Lunges",
        target: "20 reps",
        targetCount: 20,
        isTimed: false,
        calories: 18,
        videoUrl: "/videos/exercises/jumping-lunges.mp4",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
      {
        id: "advanced-plank",
        hasLocalVideo: true,
        name: "Plank",
        target: "45 seconds",
        targetCount: 45,
        isTimed: true,
        calories: 12,
        videoUrl: "/videos/exercises/plank.mp4",
        referenceImage: "/images/exercises/plank.jpg",
        trainer: "FitTrack 3D Fitness Trainer",
        source: "FitTrack 3D Motion Demonstration",
      },
    ],
  },
};

// Flattened workout plans lookup
export const WORKOUT_PLANS = {
  Beginner: WORKOUT_CATEGORIES_DATA.Beginner.exercises,
  Intermediate: WORKOUT_CATEGORIES_DATA.Intermediate.exercises,
  Advanced: WORKOUT_CATEGORIES_DATA.Advanced.exercises,
};

// Backward-compatibility fallback
export const BODY_PART_WORKOUTS = {};

// Detailed exercise guides with instructions, starting posture, form cues, and equipment
export const EXERCISE_DETAILS = {
  "Jumping Jacks": {
    name: "Jumping Jacks",
    category: "Cardio & Full Body",
    muscles: ["Calves", "Quadriceps", "Deltoids", "Core"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand tall with feet together, knees soft, shoulders down and back, arms resting naturally by your sides.",
    steps: [
      "Bend your knees slightly and push off the balls of your feet to jump into the air.",
      "Spread your feet outward to slightly wider than shoulder-width apart.",
      "Simultaneously sweep both arms overhead in a wide, controlled arc until hands nearly meet.",
      "Jump back lightly to the starting position, returning arms to your sides and landing softly on midfoot."
    ],
    tip: "Maintain a light, springy bounce and land with soft knees to absorb impact and protect your joints.",
    mistake: "Landing with stiff, locked knees or letting heels crash heavily into the floor."
  },

  "Bodyweight Squats": {
    name: "Bodyweight Squats",
    category: "Lower Body",
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand tall with feet shoulder-width apart, toes angled outward roughly 10-15 degrees, core braced.",
    steps: [
      "Inhale, initiate movement by pushing hips backward as if reaching for an invisible chair.",
      "Bend knees and lower hips until thighs are parallel to the floor or slightly below.",
      "Keep chest lifted and spine neutral; extend arms forward for counterbalance.",
      "Exhale, drive through your heels and midfoot to push the floor away and return to standing."
    ],
    tip: "Keep knees tracking directly in line with your toes throughout both descent and ascent.",
    mistake: "Allowing knees to cave inward or letting heels rise off the floor."
  },

  "Squats": {
    name: "Squats",
    category: "Lower Body & Quads",
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Calves"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand upright, feet shoulder-width apart, chest proud, eyes gazing straight ahead.",
    steps: [
      "Hinge hips back and bend knees in a controlled 2-second descent.",
      "Descend to parallel thigh depth while maintaining an upright torso.",
      "Pause for a brief fraction of a second at the bottom of the rep.",
      "Drive upwards dynamically through heels, squeezing glutes firmly at the top."
    ],
    tip: "Keep weight centered over your whole foot and avoid leaning excessively forward.",
    mistake: "Rounding the lumbar spine under fatigue."
  },

  "Wall Push-Ups": {
    name: "Wall Push-Ups",
    category: "Upper Body & Chest",
    muscles: ["Pectoralis Major", "Anterior Deltoids", "Triceps", "Core"],
    equipment: "Sturdy Wall",
    startingPosition: "Stand facing a flat wall approximately arms length away. Place palms flat against the wall at shoulder height, shoulder-width apart, fingers pointed up.",
    steps: [
      "Step feet back so your body leans into the wall at a comfortable 25-35 degree angle, maintaining a rigid straight plank.",
      "Inhale, bend elbows backward at a 45-degree angle to lower your face and chest toward the wall.",
      "Lower smoothly until your nose or chest is within 2 inches of the wall surface.",
      "Exhale and press firmly into the wall through palms to push back to full arm extension."
    ],
    tip: "Keep your entire body in a rigid line from crown to heels; do not bend at the hips.",
    mistake: "Sagging at the waist or flaring elbows straight out sideways at 90 degrees."
  },

  "Lunges": {
    name: "Lunges",
    category: "Lower Body & Balance",
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand tall with feet hip-width apart, hands on hips or clasped at chest level for balance.",
    steps: [
      "Take a controlled, generous step forward with your right leg.",
      "Lower hips straight down until both knees bend to approximately 90 degrees.",
      "Ensure front knee remains directly above front ankle; rear knee hovers just an inch above the floor.",
      "Push forcefully off the front heel to return to starting position, then repeat on opposite leg."
    ],
    tip: "Keep your torso tall and completely vertical; resist the urge to lean forward over the front knee.",
    mistake: "Stepping too short, which causes the front knee to shoot excessively forward past toes."
  },

  "Reverse Lunges": {
    name: "Reverse Lunges",
    category: "Lower Body & Glutes",
    muscles: ["Glutes", "Hamstrings", "Quadriceps", "Core"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand upright with feet together, core engaged, and hands at your hips.",
    steps: [
      "Step one leg straight backward onto the ball of that foot.",
      "Lower hips smoothly until both knees bend to 90 degrees.",
      "Keep the front shin vertical and front heel firmly planted.",
      "Drive through the front heel to push yourself back up to starting standing position, then switch legs."
    ],
    tip: "Stepping backward creates less shear stress on the front knee and increases glute engagement.",
    mistake: "Allowing the front heel to lift or slamming the back knee onto the floor."
  },

  "Plank": {
    name: "Plank",
    category: "Core & Stability",
    muscles: ["Rectus Abdominis", "Transverse Abdominis", "Shoulders", "Glutes"],
    equipment: "Exercise Mat",
    startingPosition: "Lie prone on the mat. Place forearms flat on the floor with elbows directly beneath shoulders, fists or palms flat.",
    steps: [
      "Tuck toes, engage core, and lift knees and hips off the mat.",
      "Form an unbroken, straight line from head to heels.",
      "Squeeze glutes, pull belly button towards spine, and keep gaze down at the floor between forearms.",
      "Hold this static isometric contraction steadily for the full duration timer while breathing normally."
    ],
    tip: "Actively pull your elbows towards your toes to fire your deep abdominal wall. Focus on smooth, rhythmic breathing.",
    mistake: "Letting lower back arch/sag toward the floor or piking hips high into a tent shape."
  },

  "High Knees": {
    name: "High Knees",
    category: "Cardio & Hip Flexors",
    muscles: ["Hip Flexors", "Quadriceps", "Calves", "Core"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand upright with feet hip-width apart, arms bent at 90 degrees as in running form.",
    steps: [
      "Drive your right knee up toward your chest until thigh is roughly parallel to floor.",
      "Quickly bring right foot down on the ball of foot while driving left knee up.",
      "Maintain a rapid, springy pace, pumping arms in rhythm with knees.",
      "Stay light on your feet and keep chest tall without leaning back."
    ],
    tip: "Land softly on the balls of your feet and maintain an upright torso with engaged abdominals.",
    mistake: "Leaning backwards as fatigue sets in or stomping feet flat."
  },

  "Push-Ups": {
    name: "Push-Ups",
    category: "Upper Body & Core",
    muscles: ["Pectoralis Major", "Triceps", "Anterior Deltoids", "Core"],
    equipment: "Exercise Mat",
    startingPosition: "Start in high plank with hands slightly wider than shoulder-width, fingers spread, body forming a straight line from crown to heels.",
    steps: [
      "Inhale, bend elbows to lower your chest toward floor until elbows reach 90 degrees or chest hovers 1 inch above mat.",
      "Keep elbows tucked at a 45-degree angle to your ribs (arrowhead shape, not T-shape).",
      "Keep core braced and glutes squeezed so hips never sag.",
      "Exhale and press forcefully through palms to extend arms back to top plank."
    ],
    tip: "Screw your hands into the floor to activate lats and protect shoulders.",
    mistake: "Sagging hips, craning the neck forward, or letting elbows flare wide."
  },

  "Mountain Climbers": {
    name: "Mountain Climbers",
    category: "Cardio & Core",
    muscles: ["Core", "Hip Flexors", "Shoulders", "Quadriceps"],
    equipment: "Exercise Mat",
    startingPosition: "Assume a high plank position with hands planted firmly under shoulders, legs straight behind you, core tight.",
    steps: [
      "Drive your right knee forward toward your chest without letting hips rise.",
      "Quickly return right leg while simultaneously driving left knee forward.",
      "Alternate legs in a fluid, continuous running motion while maintaining a stable upper body.",
      "Keep hands glued under shoulders throughout the set."
    ],
    tip: "Keep hips level with shoulders; do not bounce hips up into the air.",
    mistake: "Piking hips toward ceiling or bouncing off the floor uncontrollably."
  },

  "Burpees": {
    name: "Burpees",
    category: "Full Body & Conditioning",
    muscles: ["Full Body", "Chest", "Quadriceps", "Core", "Calves"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand upright with feet shoulder-width apart, arms by sides.",
    steps: [
      "Drop into a deep squat and place hands flat on the floor in front of you.",
      "Jump both feet back together to land in a firm high plank position.",
      "Lower chest to floor for a full push-up (or hold plank), then press back up.",
      "Jump feet back toward hands into a squat stance.",
      "Explosively leap into the air, reaching hands overhead, and land softly on bent knees."
    ],
    tip: "Break the movement down into distinct segments: Squat, Kick back, Push-up, Jump in, Leap up.",
    mistake: "Sagging the lower back when kicking feet out into the plank."
  },

  "Jump Squats": {
    name: "Jump Squats",
    category: "Plyometrics & Legs",
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Calves"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand with feet shoulder-width apart, toes slightly angled out, chest lifted.",
    steps: [
      "Hinge hips and bend knees to descend into a parallel squat.",
      "From the bottom, explode upward dynamically, pushing through entire foot to launch off the floor.",
      "Extend hips, knees, and ankles fully in mid-air.",
      "Land softly on balls of feet, rolling to heels, and immediately absorb impact by sinking into the next squat."
    ],
    tip: "Focus on landing as quietly as a cat to ensure joints absorb shock properly.",
    mistake: "Stiff-legged landings or letting knees cave inward upon touchdown."
  },

  "Jumping Lunges": {
    name: "Jumping Lunges",
    category: "Plyometrics & Legs",
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Calves", "Core"],
    equipment: "None (Bodyweight)",
    startingPosition: "Begin in a standard lunge stance with front knee at 90 degrees and rear knee hovering just above floor.",
    steps: [
      "Engage core, drive through front heel and back ball of foot to explode vertically into the air.",
      "In mid-air, scissor-switch leg positions smoothly.",
      "Land softly with feet switched, immediately sinking into the opposite lunge.",
      "Keep torso upright and steady throughout the switches."
    ],
    tip: "Maintain a tall spine and look forward; use arms for balance and momentum.",
    mistake: "Allowing the front knee to slam past toes or letting back knee crash into floor."
  },
};

// Helper: Get details for any exercise name with graceful fallback
export function getExerciseDetails(exerciseName) {
  if (!exerciseName) return EXERCISE_DETAILS["Bodyweight Squats"];
  const exact = EXERCISE_DETAILS[exerciseName];
  if (exact) return exact;

  const norm = exerciseName.toLowerCase();
  for (const [key, details] of Object.entries(EXERCISE_DETAILS)) {
    if (norm.includes(key.toLowerCase()) || key.toLowerCase().includes(norm)) {
      return details;
    }
  }

  return {
    name: exerciseName,
    category: "Full Body Fitness",
    muscles: ["Core", "Full Body"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand tall with feet hip-width apart and core engaged.",
    steps: [
      "Perform the movement with smooth, controlled cadence.",
      "Breathe rhythmically throughout each repetition.",
      "Focus on clean form and full range of motion."
    ],
    tip: "Maintain quality over speed.",
    mistake: "Rushing repetitions with degraded posture."
  };
}

// Helper: Lookup an exercise by stable ID across all levels
export function findExerciseByStableId(stableId) {
  if (!stableId) return null;

  for (const catKey of ["Beginner", "Intermediate", "Advanced"]) {
    const cat = WORKOUT_CATEGORIES_DATA[catKey];
    if (cat && cat.exercises) {
      const match = cat.exercises.find((ex) => ex.id === stableId);
      if (match) {
        return { exercise: match, category: cat };
      }
    }
  }
  return null;
}
