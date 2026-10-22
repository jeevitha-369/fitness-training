// FITTRACK WORKOUT & EXERCISE DATA
// Stable Identifiers, Categorized Workouts, Real-Human Video Metadata, and Detailed Movement Instructions

export const WORKOUT_CATEGORIES = {
  LEVELS: ["Beginner", "Intermediate", "Advanced"],
  BODY_PARTS: ["Legs", "Arms", "Chest", "Back", "Shoulders", "Core"],
};

export const WORKOUT_CATEGORIES_DATA = {
  Beginner: {
    id: "beginner",
    name: "Beginner",
    type: "level",
    duration: "20 min",
    intensity: "Easy",
    description: "Simple exercises designed to help you build strength, confidence, and consistency.",
    exercises: [
      {
        id: "beginner-jumping-jacks",
        name: "Jumping Jacks",
        target: "15 reps",
        targetCount: 15,
        isTimed: false,
        calories: 10,
        videoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/Jumping_jack_slow_motion.webm",
        hasRealHumanVideo: true,
        source: "Wikimedia Commons (Open Educational Fitness Video)",
      },
      {
        id: "beginner-bodyweight-squats",
        name: "Bodyweight Squats",
        target: "10 reps",
        targetCount: 10,
        isTimed: false,
        calories: 8,
        videoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Squat_-_exercise_demonstration_video.webm",
        hasRealHumanVideo: true,
        source: "Wikimedia Commons (Exercise Demonstration Video)",
      },
      {
        id: "beginner-wall-pushups",
        name: "Wall Push-Ups",
        target: "8 reps",
        targetCount: 8,
        isTimed: false,
        calories: 5,
        videoUrl: null,
        hasRealHumanVideo: false,
        source: "Real-human video footage required (Wall Push-Up specific)",
      },
      {
        id: "beginner-lunges",
        name: "Lunges",
        target: "10 reps",
        targetCount: 10,
        isTimed: false,
        calories: 8,
        videoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Strength_Training_Circuit-_Forward_Lunge.webm",
        hasRealHumanVideo: true,
        source: "Wikimedia Commons (Strength Training Circuit)",
      },
      {
        id: "beginner-plank",
        name: "Plank",
        target: "20 seconds",
        targetCount: 20,
        isTimed: true,
        calories: 5,
        videoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Naval_Station_Rota_Navy_250_Plank_Challenge_%28986473%29.webm",
        hasRealHumanVideo: true,
        source: "U.S. Navy Fitness / Commons (Plank Static Hold Demonstration)",
      },
    ],
  },
  Intermediate: {
    id: "intermediate",
    name: "Intermediate",
    type: "level",
    duration: "30 min",
    intensity: "Medium",
    description: "A balanced workout for users who already have regular training experience.",
    exercises: [
      {
        id: "intermediate-high-knees",
        name: "High Knees",
        target: "25 reps",
        targetCount: 25,
        isTimed: false,
        calories: 10,
        videoUrl: null,
        hasRealHumanVideo: false,
        source: "Real-human video footage required",
      },
      {
        id: "intermediate-pushups",
        name: "Push-Ups",
        target: "15 reps",
        targetCount: 15,
        isTimed: false,
        calories: 7,
        videoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Army_Combat_Fitness_Test-_Hand-Release_Push-Up_%28HRP%29_%28Event_3%29.webm",
        hasRealHumanVideo: true,
        source: "US Army Fitness Training (Public Domain / Commons)",
      },
      {
        id: "intermediate-squats",
        name: "Squats",
        target: "20 reps",
        targetCount: 20,
        isTimed: false,
        calories: 8,
        videoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Squat_-_exercise_demonstration_video.webm",
        hasRealHumanVideo: true,
        source: "Wikimedia Commons (Exercise Demonstration Video)",
      },
      {
        id: "intermediate-reverse-lunges",
        name: "Reverse Lunges",
        target: "15 reps",
        targetCount: 15,
        isTimed: false,
        calories: 8,
        videoUrl: null,
        hasRealHumanVideo: false,
        source: "Real-human video footage required",
      },
      {
        id: "intermediate-mountain-climbers",
        name: "Mountain Climbers",
        target: "20 reps",
        targetCount: 20,
        isTimed: false,
        calories: 10,
        videoUrl: null,
        hasRealHumanVideo: false,
        source: "Real-human video footage required",
      },
      {
        id: "intermediate-plank",
        name: "Plank",
        target: "30 seconds",
        targetCount: 30,
        isTimed: true,
        calories: 5,
        videoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Naval_Station_Rota_Navy_250_Plank_Challenge_%28986473%29.webm",
        hasRealHumanVideo: true,
        source: "U.S. Navy Fitness / Commons (Plank Static Hold Demonstration)",
      },
    ],
  },
  Advanced: {
    id: "advanced",
    name: "Advanced",
    type: "level",
    duration: "45 min",
    intensity: "High",
    description: "A demanding full-body workout for users looking for higher training intensity.",
    exercises: [
      {
        id: "advanced-burpees",
        name: "Burpees",
        target: "15 reps",
        targetCount: 15,
        isTimed: false,
        calories: 12,
        videoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Burpee_How_To.webm",
        hasRealHumanVideo: true,
        source: "Wikimedia Commons (Burpee How-To Exercise Demonstration)",
      },
      {
        id: "advanced-jump-squats",
        name: "Jump Squats",
        target: "20 reps",
        targetCount: 20,
        isTimed: false,
        calories: 12,
        videoUrl: null,
        hasRealHumanVideo: false,
        source: "Real-human video footage required",
      },
      {
        id: "advanced-pushups",
        name: "Push-Ups",
        target: "25 reps",
        targetCount: 25,
        isTimed: false,
        calories: 7,
        videoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Army_Combat_Fitness_Test-_Hand-Release_Push-Up_%28HRP%29_%28Event_3%29.webm",
        hasRealHumanVideo: true,
        source: "US Army Fitness Training (Public Domain / Commons)",
      },
      {
        id: "advanced-mountain-climbers",
        name: "Mountain Climbers",
        target: "30 reps",
        targetCount: 30,
        isTimed: false,
        calories: 10,
        videoUrl: null,
        hasRealHumanVideo: false,
        source: "Real-human video footage required",
      },
      {
        id: "advanced-jumping-lunges",
        name: "Jumping Lunges",
        target: "20 reps",
        targetCount: 20,
        isTimed: false,
        calories: 10,
        videoUrl: null,
        hasRealHumanVideo: false,
        source: "Real-human video footage required",
      },
      {
        id: "advanced-plank",
        name: "Plank",
        target: "45 seconds",
        targetCount: 45,
        isTimed: true,
        calories: 5,
        videoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Naval_Station_Rota_Navy_250_Plank_Challenge_%28986473%29.webm",
        hasRealHumanVideo: true,
        source: "U.S. Navy Fitness / Commons (Plank Static Hold Demonstration)",
      },
    ],
  },
  Legs: {
    id: "legs",
    name: "Legs",
    type: "bodyPart",
    duration: "25 min",
    intensity: "Targeted",
    description: "Strengthen quadriceps, hamstrings, glutes, and calves.",
    exercises: [
      { id: "legs-bodyweight-squats", name: "Bodyweight Squats", target: "10 reps", targetCount: 10, isTimed: false, calories: 8, videoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Squat_-_exercise_demonstration_video.webm", hasRealHumanVideo: true, source: "Wikimedia Commons" },
      { id: "legs-lunges", name: "Lunges", target: "10 reps", targetCount: 10, isTimed: false, calories: 8, videoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Strength_Training_Circuit-_Forward_Lunge.webm", hasRealHumanVideo: true, source: "Wikimedia Commons" },
      { id: "legs-glute-bridges", name: "Glute Bridges", target: "12 reps", targetCount: 12, isTimed: false, calories: 7, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
      { id: "legs-calf-raises", name: "Calf Raises", target: "15 reps", targetCount: 15, isTimed: false, calories: 6, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
    ],
  },
  Arms: {
    id: "arms",
    name: "Arms",
    type: "bodyPart",
    duration: "25 min",
    intensity: "Targeted",
    description: "Build upper arm strength across biceps, triceps, and forearms.",
    exercises: [
      { id: "arms-wall-pushups", name: "Wall Push-Ups", target: "8 reps", targetCount: 8, isTimed: false, calories: 5, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
      { id: "arms-arm-circles", name: "Arm Circles", target: "20 reps", targetCount: 20, isTimed: false, calories: 4, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
      { id: "arms-triceps-dips", name: "Triceps Dips", target: "8 reps", targetCount: 8, isTimed: false, calories: 6, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
      { id: "arms-biceps-curls", name: "Biceps Curls", target: "10 reps", targetCount: 10, isTimed: false, calories: 6, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required (Show dumbbells / bodyweight curls)" },
    ],
  },
  Chest: {
    id: "chest",
    name: "Chest",
    type: "bodyPart",
    duration: "20 min",
    intensity: "Targeted",
    description: "Target pectorals and pressing strength with varying incline angles.",
    exercises: [
      { id: "chest-wall-pushups", name: "Wall Push-Ups", target: "10 reps", targetCount: 10, isTimed: false, calories: 5, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
      { id: "chest-pushups", name: "Push-Ups", target: "8 reps", targetCount: 8, isTimed: false, calories: 7, videoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Army_Combat_Fitness_Test-_Hand-Release_Push-Up_%28HRP%29_%28Event_3%29.webm", hasRealHumanVideo: true, source: "US Army Fitness Training" },
      { id: "chest-incline-pushups", name: "Incline Push-Ups", target: "10 reps", targetCount: 10, isTimed: false, calories: 6, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
    ],
  },
  Back: {
    id: "back",
    name: "Back",
    type: "bodyPart",
    duration: "20 min",
    intensity: "Targeted",
    description: "Strengthen posterior chain, lower back, erector spinae, and rhomboids.",
    exercises: [
      { id: "back-bird-dog", name: "Bird Dog", target: "10 reps", targetCount: 10, isTimed: false, calories: 5, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
      { id: "back-superman", name: "Superman", target: "10 reps", targetCount: 10, isTimed: false, calories: 6, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
      { id: "back-reverse-snow-angels", name: "Reverse Snow Angels", target: "10 reps", targetCount: 10, isTimed: false, calories: 5, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required (Prone Scapular Angels)" },
    ],
  },
  Shoulders: {
    id: "shoulders",
    name: "Shoulders",
    type: "bodyPart",
    duration: "20 min",
    intensity: "Targeted",
    description: "Develop anterior, lateral, and posterior deltoids and shoulder stability.",
    exercises: [
      { id: "shoulders-arm-circles", name: "Arm Circles", target: "20 reps", targetCount: 20, isTimed: false, calories: 4, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
      { id: "shoulders-wall-pushups", name: "Wall Push-Ups", target: "8 reps", targetCount: 8, isTimed: false, calories: 5, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
      { id: "shoulders-shoulder-taps", name: "Shoulder Taps", target: "10 reps", targetCount: 10, isTimed: false, calories: 5, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
    ],
  },
  Core: {
    id: "core",
    name: "Core",
    type: "bodyPart",
    duration: "20 min",
    intensity: "Targeted",
    description: "Engage rectus abdominis, obliques, and transverse abdominis for deep stability.",
    exercises: [
      { id: "core-plank",
        name: "Plank",
        target: "30 seconds",
        targetCount: 30,
        isTimed: true,
        calories: 6,
        videoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Naval_Station_Rota_Navy_250_Plank_Challenge_%28986473%29.webm",
        hasRealHumanVideo: true,
        source: "U.S. Navy Fitness / Commons (Plank Static Hold Demonstration)" },
      { id: "core-bird-dog", name: "Bird Dog", target: "10 reps", targetCount: 10, isTimed: false, calories: 5, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
      { id: "core-dead-bug", name: "Dead Bug", target: "10 reps", targetCount: 10, isTimed: false, calories: 5, videoUrl: null, hasRealHumanVideo: false, source: "Real-human video footage required" },
    ],
  },
};

// Flattened workout plans backward-compatible lookup
export const WORKOUT_PLANS = {
  Beginner: WORKOUT_CATEGORIES_DATA.Beginner.exercises,
  Intermediate: WORKOUT_CATEGORIES_DATA.Intermediate.exercises,
  Advanced: WORKOUT_CATEGORIES_DATA.Advanced.exercises,
};

export const BODY_PART_WORKOUTS = {
  Legs: WORKOUT_CATEGORIES_DATA.Legs.exercises,
  Arms: WORKOUT_CATEGORIES_DATA.Arms.exercises,
  Chest: WORKOUT_CATEGORIES_DATA.Chest.exercises,
  Back: WORKOUT_CATEGORIES_DATA.Back.exercises,
  Shoulders: WORKOUT_CATEGORIES_DATA.Shoulders.exercises,
  Core: WORKOUT_CATEGORIES_DATA.Core.exercises,
};

// Detailed exercise guides with instructions, starting posture, form cues, and equipment
export const EXERCISE_DETAILS = {
  "Jumping Jacks": {
    name: "Jumping Jacks",
    category: "Cardio & Full Body",
    muscles: ["Calves", "Quadriceps", "Deltoids", "Core"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand tall with feet together, knees slightly unlocked, shoulders down and back, arms resting naturally by your sides.",
    steps: [
      "Bend knees slightly and push off the balls of your feet to jump into the air.",
      "Spread feet outward to slightly wider than shoulder-width apart.",
      "Simultaneously sweep both arms overhead in a wide, controlled arc until hands nearly meet.",
      "Jump back lightly to starting position, returning arms to your sides and landing softly on midfoot."
    ],
    tip: "Maintain a light, springy bounce and land with soft knees to absorb shock.",
    mistake: "Landing with stiff, locked knees or letting heels crash heavily into the floor."
  },

  "Bodyweight Squats": {
    name: "Bodyweight Squats",
    category: "Lower Body",
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand tall with feet about shoulder-width apart, toes angled outward roughly 10-15 degrees, core braced.",
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
    category: "Lower Body",
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
    startingPosition: "Stand facing a flat wall approximately arm\x27s length away. Place palms flat against the wall at shoulder height, shoulder-width apart, fingers pointed up.",
    steps: [
      "Step feet back so your body leans into the wall at a comfortable ~25-35 degree angle, maintaining a rigid straight plank.",
      "Inhale, bend elbows backward at a 45-degree angle to lower your face and chest toward the wall.",
      "Lower smoothly until your nose or chest is within 2 inches of the wall surface.",
      "Exhale and press firmly into the wall through palms to push back to full arm extension."
    ],
    tip: "Do not substitute with floor push-ups. Face the wall directly and keep elbows tucked at 45 degrees rather than flaring out.",
    mistake: "Sagging at the waist or bending at the hips instead of moving the entire body as one unit."
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
    category: "Lower Body",
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
    mistake: "Allowing the front heel to lift or slamming the back knee onto the hard floor."
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
    tip: "Actively pull your elbows towards your toes to fire your deep abdominal wall. Use the duration timer.",
    mistake: "Letting lower back arch/sag toward the floor or piking hips high into a tent shape."
  },

  "High Knees": {
    name: "High Knees",
    category: "Cardio & Leg Drive",
    muscles: ["Hip Flexors", "Quadriceps", "Calves", "Core"],
    equipment: "None",
    startingPosition: "Stand tall with feet hip-width apart and arms bent at 90 degrees in athletic running stance.",
    steps: [
      "Drive your right knee explosively up toward your chest until thigh is parallel to the floor.",
      "Simultaneously pump the opposite (left) arm forward.",
      "Quickly switch legs as right foot touches down, driving left knee high while pumping right arm.",
      "Continue rapid, rhythmic alternating knee drives on the balls of your feet."
    ],
    tip: "Keep your chest high and posture upright. Do not lean backward as your knees rise.",
    mistake: "Leaning back to compensate for knee height or letting feet slap down flat."
  },

  "Push-Ups": {
    name: "Push-Ups",
    category: "Upper Body & Chest",
    muscles: ["Pectoralis Major", "Triceps Brachii", "Anterior Deltoids", "Core"],
    equipment: "Exercise Mat",
    startingPosition: "Assume a high plank on your mat with hands placed slightly wider than shoulder-width, fingers spread.",
    steps: [
      "Lock your body into a straight, rigid plank from ears down to heels.",
      "Inhale, bend elbows backward at a 45-degree angle, lowering chest until hovering 2 inches above mat.",
      "Pause for a brief fraction of a second at full depth without resting your chest on the floor.",
      "Exhale, press powerfully into the mat through your palms to return to full arm extension."
    ],
    tip: "Maintain full body tension as if you are moving a single solid board.",
    mistake: "Flaring elbows out sideways at 90 degrees or letting hips sag."
  },

  "Mountain Climbers": {
    name: "Mountain Climbers",
    category: "Core & High-Cadence Cardio",
    muscles: ["Core / Abdominals", "Shoulders", "Hip Flexors", "Calves"],
    equipment: "Exercise Mat",
    startingPosition: "Start in a solid high push-up plank on your mat with hands stacked under shoulders, body straight.",
    steps: [
      "Drive your right knee forward toward your chest in a straight line, keeping hips level.",
      "Tap the ball of your right foot lightly as you prepare to switch.",
      "Quickly swap legs, driving left knee forward as right leg shoots straight back.",
      "Maintain a smooth, rapid running cadence in the plank position."
    ],
    tip: "Keep your shoulders directly over your wrists and resist bouncing hips up and down.",
    mistake: "Letting hips pike high into an A-frame or drifting shoulders behind wrists."
  },

  "Burpees": {
    name: "Burpees",
    category: "Full Body Conditioning",
    muscles: ["Full Body", "Chest", "Quadriceps", "Glutes", "Core"],
    equipment: "Exercise Mat",
    startingPosition: "Stand tall with feet shoulder-width apart, arms resting at your sides.",
    steps: [
      "Drop into a deep squat and plant both palms firmly on the mat shoulder-width apart.",
      "Jump both feet backwards together, landing in a firm high plank position.",
      "Perform a full controlled push-up, lowering chest to graze the mat, then press back up.",
      "Jump both feet forward back under your hips into the deep crouch position.",
      "Explode vertically upward into a maximum height jump, sweeping arms overhead!"
    ],
    tip: "Execute all 5 phases in one continuous, fluid rhythm: squat, kick, push-up, snap, jump!",
    mistake: "Skipping the push-up phase or letting lower back collapse when kicking feet back."
  },

  "Jump Squats": {
    name: "Jump Squats",
    category: "Lower Body Plyometrics",
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Calves"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand with feet shoulder-width apart, chest upright, arms by your sides.",
    steps: [
      "Lower into a standard deep squat, sending hips back and sweeping arms backward.",
      "Upon reaching parallel depth, drive through the floor with explosive power.",
      "Leap vertically as high as possible, reaching arms overhead at apex of jump.",
      "Land softly on the balls of your feet, rolling to heels, absorbing force directly into the next squat."
    ],
    tip: "Quiet landing is key: land softly like a feather to protect knees and hips.",
    mistake: "Landing with straight, locked knees or letting knees collapse inward upon impact."
  },

  "Jumping Lunges": {
    name: "Jumping Lunges",
    category: "Plyometric Lower Body",
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Calves", "Core"],
    equipment: "None (Bodyweight)",
    startingPosition: "Begin in a forward lunge stance with right leg forward bent at 90 degrees.",
    steps: [
      "Lower hips into the lunge until back knee hovers over the floor.",
      "Explode forcefully straight up into the air, extending both legs.",
      "Scissor-switch leg positions in mid-air: swing left leg forward and right leg back.",
      "Land smoothly directly into a deep lunge on the opposite side and immediately repeat."
    ],
    tip: "Use your arms to counterbalance and generate vertical lift. Land softly with knees bent.",
    mistake: "Landing with straight knees or landing too narrow, which ruins lateral balance."
  },

  "Glute Bridges": {
    name: "Glute Bridges",
    category: "Posterior Chain",
    muscles: ["Gluteus Maximus", "Hamstrings", "Lower Back", "Core"],
    equipment: "Exercise Mat",
    startingPosition: "Lie flat on your back on the mat. Bend knees, place feet flat on the floor hip-width apart, arms resting at sides.",
    steps: [
      "Plant heels firmly and engage your core to flatten lower back against mat.",
      "Press through heels and thrust hips straight up toward the ceiling.",
      "Form a diagonal straight line from knees through hips to shoulders.",
      "Squeeze glutes hard at the top for 1-2 seconds, then slowly lower hips back down."
    ],
    tip: "Avoid hyperextending your lower back at the top; the lift should come purely from glute contraction.",
    mistake: "Pushing from toes instead of driving through heels."
  },

  "Calf Raises": {
    name: "Calf Raises",
    category: "Lower Body",
    muscles: ["Gastrocnemius", "Soleus (Calves)", "Ankles"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand upright with feet hip-width apart, core braced, hands on hips for balance.",
    steps: [
      "Keep legs straight but knees unlocked.",
      "Push down through the balls of both feet to raise heels as high off the floor as possible.",
      "Hold the peak contraction at the very top for a full 1-second pause, flexing calves.",
      "Lower heels slowly and under control back to the floor."
    ],
    tip: "Focus on controlled tempo: 2 seconds up, 1 second peak hold, 2 seconds down.",
    mistake: "Rolling onto the outside edges of your feet instead of driving through the big toe knuckle."
  },

  "Arm Circles": {
    name: "Arm Circles",
    category: "Shoulders & Mobility",
    muscles: ["Deltoids (Shoulders)", "Rotator Cuff", "Upper Trapezius"],
    equipment: "None (Bodyweight)",
    startingPosition: "Stand tall with feet shoulder-width apart, shoulders relaxed down away from ears.",
    steps: [
      "Extend both arms straight out horizontally to your sides at shoulder height, palms down.",
      "Begin rotating arms forward in smooth, continuous, controlled circular paths.",
      "Keep arms fully extended, engaging deltoids and shoulder stabilizers.",
      "Maintain rhythmic breathing and continuous rotation for the designated repetitions."
    ],
    tip: "Keep shoulder blades depressed and retracted; do not let shoulders hunch up toward ears.",
    mistake: "Dropping arms below shoulder height or bending elbows."
  },

  "Triceps Dips": {
    name: "Triceps Dips",
    category: "Arms & Upper Body",
    muscles: ["Triceps Brachii", "Anterior Deltoids", "Pectorals"],
    equipment: "Bench or Sturdy Raised Surface",
    startingPosition: "Sit on the edge of a bench. Place palms on edge of bench beside hips, fingers pointing forward, legs extended out front.",
    steps: [
      "Slide hips slightly forward off the bench with arms fully supporting your body weight.",
      "Inhale, bend elbows straight back behind you, lowering hips toward floor until elbows reach 90 degrees.",
      "Keep back close to the bench edge throughout descent.",
      "Exhale and press powerfully through palms to lock arms back out, squeezing triceps."
    ],
    tip: "Keep your spine close to the bench; moving too far forward places unnecessary stress on front shoulder joints.",
    mistake: "Flaring elbows outwards or sinking into shoulders."
  },

  "Biceps Curls": {
    name: "Biceps Curls",
    category: "Arms",
    muscles: ["Biceps Brachii", "Brachialis", "Forearms"],
    equipment: "Dumbbells (or Bodyweight Resistance Alternative)",
    startingPosition: "Stand tall with feet hip-width apart, holding a pair of dumbbells at sides with palms facing forward.",
    steps: [
      "Pin elbows close to your ribcage and stabilize your core.",
      "Exhale and curl the dumbbells upwards toward shoulder level, contracting biceps.",
      "Squeeze biceps hard at the peak for a brief second without moving elbows forward.",
      "Inhale and lower weights down slowly with control back to starting position."
    ],
    tip: "Keep upper arms completely stationary; only the forearms should move. If using bodyweight, perform towel or doorway curls.",
    mistake: "Swinging torso or using momentum to heave weights up."
  },

  "Incline Push-Ups": {
    name: "Incline Push-Ups",
    category: "Chest & Upper Body",
    muscles: ["Lower Pectorals", "Triceps", "Shoulders", "Core"],
    equipment: "Bench or Raised Surface",
    startingPosition: "Stand facing a sturdy gym bench or raised platform. Place hands shoulder-width apart on bench edge, step feet back into an angled plank.",
    steps: [
      "Keep body in a perfectly straight angled line from neck to heels.",
      "Bend elbows backwards at a 45-degree angle, lowering chest until it lightly touches bench edge.",
      "Pause for a split second at the bottom of the movement.",
      "Exhale and push firmly through palms to return to starting locked plank."
    ],
    tip: "Incline push-ups are an excellent regression between wall push-ups and floor push-ups.",
    mistake: "Sagging hips down or leaving buttocks high in the air."
  },

  "Bird Dog": {
    name: "Bird Dog",
    category: "Back & Core Stability",
    muscles: ["Erector Spinae (Lower Back)", "Glutes", "Core", "Hamstrings"],
    equipment: "Exercise Mat",
    startingPosition: "Start on hands and knees on the mat (quadruped position). Hands under shoulders, knees under hips.",
    steps: [
      "Engage core and stabilize hips so spine is completely flat like a tabletop.",
      "Simultaneously reach right arm straight forward and extend left leg straight back.",
      "Raise arm and opposite leg until parallel to the floor, forming a straight line from fingertip to toe.",
      "Hold for 1-2 seconds, return smoothly to all fours, and repeat with left arm and right leg."
    ],
    tip: "Imagine balancing a cup of water on your lower back; don\x27t tilt your hips side to side.",
    mistake: "Arching lower back or kicking the leg too high above hip level."
  },

  "Superman": {
    name: "Superman",
    category: "Posterior Chain & Lower Back",
    muscles: ["Lower Back (Erector Spinae)", "Glutes", "Hamstrings", "Upper Back"],
    equipment: "Exercise Mat",
    startingPosition: "Lie face down (prone) on your mat with arms stretched straight overhead and legs straight behind.",
    steps: [
      "Look down at the mat to keep your cervical spine in a neutral line.",
      "Simultaneously lift your chest, arms, and thighs 4 to 6 inches off the mat.",
      "Squeeze your glutes, lower back muscles, and upper back firmly at the peak of the hold.",
      "Hold the contraction for 2-3 seconds, then lower smoothly back down with control."
    ],
    tip: "Focus on length rather than height: reach forward through fingertips and backward through toes.",
    mistake: "Craning neck backward to look up, which strains cervical vertebrae."
  },

  "Reverse Snow Angels": {
    name: "Reverse Snow Angels",
    category: "Upper Back & Scapular Control",
    muscles: ["Rhomboids", "Middle & Lower Trapezius", "Rear Deltoids", "Lower Back"],
    equipment: "Exercise Mat",
    startingPosition: "Lie face down on the mat with forehead resting lightly on floor and arms resting straight alongside thighs, palms down.",
    steps: [
      "Lift shoulders and chest slightly off the mat, pinching shoulder blades together.",
      "Hover arms 2-3 inches off the floor.",
      "Sweep arms slowly and smoothly in wide horizontal arcs outwards past shoulders and all the way overhead.",
      "Sweep arms backwards along the same wide path to touch sides of thighs, maintaining muscle tension."
    ],
    tip: "Keep palms facing downward toward the floor throughout the entire sweeping motion. Keep chest lifted.",
    mistake: "Letting arms drag on the mat or shrugging shoulders up into the neck."
  },

  "Shoulder Taps": {
    name: "Shoulder Taps",
    category: "Shoulders & Anti-Rotational Core",
    muscles: ["Deltoids", "Core / Obliques", "Serratus Anterior", "Glutes"],
    equipment: "Exercise Mat",
    startingPosition: "Assume a high plank on your mat with hands under shoulders, feet slightly wider than hip-width for balance.",
    steps: [
      "Brace core and lock hips square to the ground.",
      "Lift right hand and reach across chest to tap your left shoulder.",
      "Place right hand back down softly with zero hip shifting.",
      "Lift left hand and tap your right shoulder, maintaining rock-solid core stability."
    ],
    tip: "Widen your feet to give yourself a wider, more stable base of support and prevent hip sway.",
    mistake: "Rocking or rotating hips from side to side during the hand transition."
  },

  "Dead Bug": {
    name: "Dead Bug",
    category: "Deep Core & Pelvic Stability",
    muscles: ["Transverse Abdominis", "Rectus Abdominis", "Hip Flexors"],
    equipment: "Exercise Mat",
    startingPosition: "Lie on your back on the mat. Extend arms straight toward ceiling. Lift legs with knees bent at 90 degrees (tabletop).",
    steps: [
      "Press lower back firmly into the floor so there is zero gap under your lumbar spine.",
      "Inhale, slowly lower right arm overhead and simultaneously extend left leg straight toward floor.",
      "Hover arm and heel 2 inches off the mat while keeping lower back glued to floor.",
      "Exhale and return both limbs to tabletop position, then repeat with left arm and right leg."
    ],
    tip: "If your lower back begins to arch off the mat, don\x27t lower the limbs quite as far.",
    mistake: "Allowing lower back to peel off the floor or moving quickly without control."
  }
};

// Helper function to normalize and find exercise details
export function getExerciseDetails(name) {
  if (!name) return EXERCISE_DETAILS["Jumping Jacks"];

  const clean = name.trim();
  if (EXERCISE_DETAILS[clean]) return EXERCISE_DETAILS[clean];

  // Try matching with normalized string
  const normalized = clean.toLowerCase().replace(/[^a-z]/g, "");
  for (const key of Object.keys(EXERCISE_DETAILS)) {
    const keyNorm = key.toLowerCase().replace(/[^a-z]/g, "");
    if (normalized === keyNorm || normalized.includes(keyNorm) || keyNorm.includes(normalized)) {
      return EXERCISE_DETAILS[key];
    }
  }

  // Fallback
  return {
    name: clean,
    category: "Fitness Exercise",
    muscles: ["Full Body", "Core"],
    equipment: "None",
    startingPosition: "Stand tall with proper posture, core braced, and shoulders relaxed.",
    steps: [
      "Assume a stable, balanced starting position.",
      "Perform the movement with control and smooth breathing.",
      "Focus on muscle contraction at the peak of each repetition.",
      "Return smoothly to starting posture."
    ],
    tip: "Focus on form and controlled tempo over speed.",
    mistake: "Rushing repetitions or compromising posture."
  };
}

// Find exercise by stable ID (e.g. "intermediate-plank", "advanced-jumping-lunges")
export function findExerciseByStableId(stableId) {
  if (!stableId) return null;

  for (const catKey of Object.keys(WORKOUT_CATEGORIES_DATA)) {
    const cat = WORKOUT_CATEGORIES_DATA[catKey];
    const match = cat.exercises.find((ex) => ex.id === stableId);
    if (match) {
      return { exercise: match, category: cat };
    }
  }
  return null;
}
