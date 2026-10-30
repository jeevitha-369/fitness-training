import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Reusable 3D Props
function ExerciseMat() {
  return (
    <group position={[0, 0.015, -0.3]}>
      {/* Extended workout mat providing grounding for full body, forearms and toes */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 0.03, 3.2]} />
        <meshStandardMaterial color="#6c5ce7" roughness={0.7} />
      </mesh>
      {/* Decorative center alignment strip */}
      <mesh position={[0, 0.016, 0]}>
        <boxGeometry args={[0.04, 0.002, 3.0]} />
        <meshStandardMaterial color="#a29bfe" roughness={0.5} />
      </mesh>
    </group>
  );
}

function StudioWall() {
  return (
    <group position={[0, 1.6, 0.86]}>
      {/* Architectural Studio Wall Panel */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 3.4, 0.16]} />
        <meshStandardMaterial color="#ebe6fc" roughness={0.85} />
      </mesh>
      {/* Vertical architectural divider seams */}
      <mesh position={[-1.2, 0, 0.082]}>
        <boxGeometry args={[0.02, 3.4, 0.005]} />
        <meshStandardMaterial color="#d4ccf5" roughness={0.6} />
      </mesh>
      <mesh position={[1.2, 0, 0.082]}>
        <boxGeometry args={[0.02, 3.4, 0.005]} />
        <meshStandardMaterial color="#d4ccf5" roughness={0.6} />
      </mesh>
      {/* Studio Baseboard trim */}
      <mesh position={[0, -1.6, 0.08]}>
        <boxGeometry args={[4.2, 0.18, 0.04]} />
        <meshStandardMaterial color="#a29bfe" roughness={0.6} />
      </mesh>
      {/* Target Hand Contact Guide Rings at chest height (y = 1.38) */}
      <group position={[0, -0.22, 0.084]}>
        {/* Left hand guide ring */}
        <mesh position={[-0.34, 0, 0]}>
          <circleGeometry args={[0.09, 32]} />
          <meshStandardMaterial color="#6c5ce7" roughness={0.3} opacity={0.65} transparent />
        </mesh>
        <mesh position={[-0.34, 0, 0.002]}>
          <ringGeometry args={[0.07, 0.085, 32]} />
          <meshStandardMaterial color="#00cec9" emissive="#00cec9" emissiveIntensity={0.6} />
        </mesh>
        {/* Right hand guide ring */}
        <mesh position={[0.34, 0, 0]}>
          <circleGeometry args={[0.09, 32]} />
          <meshStandardMaterial color="#6c5ce7" roughness={0.3} opacity={0.65} transparent />
        </mesh>
        <mesh position={[0.34, 0, 0.002]}>
          <ringGeometry args={[0.07, 0.085, 32]} />
          <meshStandardMaterial color="#00cec9" emissive="#00cec9" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function WorkoutBench() {
  return (
    <group position={[0, 0.42, -0.15]}>
      {/* Bench padded cushion */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 0.12, 0.55]} />
        <meshStandardMaterial color="#2d3436" roughness={0.5} />
      </mesh>
      {/* Purple accent stripe */}
      <mesh position={[0, 0.061, 0]}>
        <boxGeometry args={[1.3, 0.005, 0.06]} />
        <meshStandardMaterial color="#6c5ce7" roughness={0.4} />
      </mesh>
      {/* Steel bench legs */}
      <mesh position={[-0.55, -0.22, -0.18]}>
        <cylinderGeometry args={[0.03, 0.03, 0.42, 16]} />
        <meshStandardMaterial color="#636e72" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.55, -0.22, -0.18]}>
        <cylinderGeometry args={[0.03, 0.03, 0.42, 16]} />
        <meshStandardMaterial color="#636e72" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.55, -0.22, 0.18]}>
        <cylinderGeometry args={[0.03, 0.03, 0.42, 16]} />
        <meshStandardMaterial color="#636e72" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.55, -0.22, 0.18]}>
        <cylinderGeometry args={[0.03, 0.03, 0.42, 16]} />
        <meshStandardMaterial color="#636e72" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function HexDumbbell() {
  return (
    <group>
      {/* Handle */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.22, 16]} />
        <meshStandardMaterial color="#dfe6e9" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Left hex weight */}
      <mesh position={[-0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.07, 6]} />
        <meshStandardMaterial color="#2d3436" roughness={0.6} />
      </mesh>
      {/* Right hex weight */}
      <mesh position={[0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.07, 6]} />
        <meshStandardMaterial color="#2d3436" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function HumanModel3D({
  exerciseName = "Jumping Jacks",
  isPlaying = true,
  speed = 1.0,
}) {
  const root = useRef();
  const hips = useRef();
  const torso = useRef();
  const head = useRef();
  const leftShoulder = useRef();
  const rightShoulder = useRef();
  const leftElbow = useRef();
  const rightElbow = useRef();
  const leftHand = useRef();
  const rightHand = useRef();
  const leftHip = useRef();
  const rightHip = useRef();
  const leftKnee = useRef();
  const rightKnee = useRef();
  const leftFoot = useRef();
  const rightFoot = useRef();

  // Internal animation state tracking
  const stateRef = useRef({
    time: 0,
    prevCycle: 0,
    // Current target transforms for smooth lerping
    rootPos: new THREE.Vector3(0, 0, 0),
    rootRot: new THREE.Euler(0, 0, 0),
    hipsPos: new THREE.Vector3(0, 1.05, 0),
    hipsRot: new THREE.Euler(0, 0, 0),
    torsoRot: new THREE.Euler(0, 0, 0),
    headRot: new THREE.Euler(0, 0, 0),
    leftArmRot: new THREE.Euler(0, 0, 0),
    rightArmRot: new THREE.Euler(0, 0, 0),
    leftElbowRot: new THREE.Euler(0, 0, 0),
    rightElbowRot: new THREE.Euler(0, 0, 0),
    leftHipRot: new THREE.Euler(0, 0, 0),
    rightHipRot: new THREE.Euler(0, 0, 0),
    leftKneeRot: new THREE.Euler(0, 0, 0),
    rightKneeRot: new THREE.Euler(0, 0, 0),
    leftFootRot: new THREE.Euler(0, 0, 0),
    rightFootRot: new THREE.Euler(0, 0, 0),
  });

  const norm = (exerciseName || "").toLowerCase().replace(/[^a-z]/g, "");

  // Props determination
  const hasWall = norm.includes("wallpushup");
  const hasBench = norm.includes("tricepdip") || norm.includes("inclinepushup");
  const hasDumbbells = norm.includes("bicepcurl");
  const isFloorExercise =
    norm.includes("plank") ||
    norm.includes("pushup") ||
    norm.includes("mountainclimber") ||
    norm.includes("burpee") ||
    norm.includes("glutebridge") ||
    norm.includes("birddog") ||
    norm.includes("superman") ||
    norm.includes("reversesnowangel") ||
    norm.includes("shouldertap") ||
    norm.includes("deadbug");

  useFrame((_, delta) => {
    const s = stateRef.current;
    if (isPlaying) {
      s.time += delta * speed;
    }
    const t = s.time;

    // Default neutral standing baseline
    let targetRootX = 0, targetRootY = 0, targetRootZ = 0;
    let targetRootRotX = 0, targetRootRotY = 0, targetRootRotZ = 0;
    let targetHipsY = 1.05;
    let targetTorsoRotX = 0, targetTorsoRotY = 0, targetTorsoRotZ = 0;
    let targetHeadRotX = 0;
    let targetLArmX = 0, targetLArmY = 0, targetLArmZ = -0.15;
    let targetRArmX = 0, targetRArmY = 0, targetRArmZ = 0.15;
    let targetLElbowX = 0, targetLElbowY = 0, targetLElbowZ = 0;
    let targetRElbowX = 0, targetRElbowY = 0, targetRElbowZ = 0;
    let targetLHipX = 0, targetLHipZ = 0;
    let targetRHipX = 0, targetRHipZ = 0;
    let targetLKneeX = 0, targetRKneeX = 0;
    let targetLFootX = 0, targetRFootX = 0;

    // 1. JUMPING JACKS (Fluid, human-scaled, athletic jumping jacks)
    if (norm.includes("jumpingjack")) {
      const pace = t * 2.8; // Beginner-friendly, rhythmic tempo (~2.2s per full rep)
      const cycle = (1 - Math.cos(pace)) / 2; // 0 (start: feet together, arms down) -> 1 (open: feet apart, arms overhead)
      const hop = Math.abs(Math.sin(pace)); // Dynamic flight hop during both opening and closing transitions

      // Upward flight hop during transitions
      targetRootY = hop * 0.20;

      // Starting position (cycle = 0): feet together, tall spine, arms at sides
      // Jumping phase (cycle = 1): feet spread wide (~25 deg), arms raised high overhead
      targetLHipZ = -0.45 * cycle; // Left leg sweeps outward
      targetRHipZ = 0.45 * cycle;  // Right leg sweeps outward

      // Soft knee flexion upon landing to absorb impact naturally
      targetLKneeX = 0.12 * cycle + 0.08 * (1 - cycle);
      targetRKneeX = 0.12 * cycle + 0.08 * (1 - cycle);

      // Arms sweep in a wide, fluid arc overhead
      // At cycle = 0: arms resting naturally at sides (-0.08, 0.08)
      // At cycle = 1: hands meet overhead in wide energetic arc (-2.80, 2.80)
      targetLArmZ = -0.08 - cycle * 2.72;
      targetRArmZ = 0.08 + cycle * 2.72;
      targetLElbowZ = -0.10 * cycle;
      targetRElbowZ = 0.10 * cycle;

      // Slight natural torso engagement
      targetTorsoRotX = 0.02 * cycle;
    }
    // 2. BODYWEIGHT SQUATS & SQUATS
    else if (norm === "squats" || norm.includes("bodyweightsquat")) {
      const cycle = (1 - Math.cos(t * 2.0)) / 2; // 0..1..0
      targetRootY = -0.42 * cycle;
      targetRootZ = -0.22 * cycle;
      targetTorsoRotX = 0.32 * cycle; // Torso leans slightly to counterbalance
      // Arms reach forward for balance
      targetLArmX = -1.4 * cycle;
      targetRArmX = -1.4 * cycle;
      // Hips and knees bend deep to 90 degrees
      targetLHipX = -1.25 * cycle;
      targetRHipX = -1.25 * cycle;
      targetLKneeX = 1.35 * cycle;
      targetRKneeX = 1.35 * cycle;
      targetLFootX = -0.12 * cycle;
      targetRFootX = -0.12 * cycle;
    }
    // 3. JUMP SQUATS
    else if (norm.includes("jumpsquat")) {
      const raw = (t * 2.2) % (Math.PI * 2);
      const isSquat = raw < Math.PI;
      // airborne phase
      if (isSquat) {
        const squatDepth = (1 - Math.cos(raw)) / 2;
        targetRootY = -0.42 * squatDepth;
        targetRootZ = -0.2 * squatDepth;
        targetTorsoRotX = 0.35 * squatDepth;
        targetLArmX = -0.8 * squatDepth;
        targetRArmX = -0.8 * squatDepth;
        targetLHipX = -1.25 * squatDepth;
        targetRHipX = -1.25 * squatDepth;
        targetLKneeX = 1.35 * squatDepth;
        targetRKneeX = 1.35 * squatDepth;
      } else {
        const airProgress = Math.sin(raw - Math.PI);
        targetRootY = airProgress * 0.45; // Airborne leap!
        targetLArmX = -2.6; // Arms reach high overhead!
        targetRArmX = -2.6;
        targetLHipX = 0.1;
        targetRHipX = 0.1;
        targetLKneeX = 0.05;
        targetRKneeX = 0.05;
        targetLFootX = 0.35; // Toes point down in flight
        targetRFootX = 0.35;
      }
    }
    // 4. WALL PUSH-UPS (Anchored feet, rigid body plank, visible wall contact & elbow flexion)
    else if (norm.includes("wallpushup")) {
      const cycle = (1 - Math.cos(t * 1.8)) / 2; // 0 (extended) -> 1 (chest to wall) -> 0

      // Body pivots as a straight rigid plank from the anchored feet
      targetRootRotX = 0.26 + cycle * 0.12; // Leaning forward toward the wall
      targetRootZ = -0.22 + cycle * 0.16;   // Chest and shoulders advance toward the wall
      targetRootY = 0;                      // Feet remain grounded on the floor

      // Arms: Start fully extended with palms pressing against the wall at chest height;
      // In descent: elbows bend back and outward to 90 degrees as chest lowers to the wall
      targetLArmX = -1.48 + 0.12 * cycle;
      targetRArmX = -1.48 + 0.12 * cycle;
      targetLArmZ = -0.12 - 0.35 * cycle;
      targetRArmZ = 0.12 + 0.35 * cycle;
      targetLElbowX = 0.12 + 1.28 * cycle; // Elbow flexion to 90 degrees
      targetRElbowX = 0.12 + 1.28 * cycle;

      // Feet: Stay firmly planted on the floor without sliding
      targetLFootX = -0.25 - cycle * 0.12;
      targetRFootX = -0.25 - cycle * 0.12;

      // Spine & core: Perfect straight-line posture without sagging or arching
      targetTorsoRotX = 0;
    }
    // 5. LUNGES
    else if (norm === "lunges") {
      const phase = (t * 1.8) % (Math.PI * 4);
      const isRightLead = phase < Math.PI * 2;
      const sub = (1 - Math.cos(phase % (Math.PI * 2))) / 2;
      targetRootY = -0.32 * sub;
      targetTorsoRotX = 0.05;
      targetLArmX = -0.4 * sub;
      targetRArmX = -0.4 * sub;
      if (isRightLead) {
        // Right leg steps forward
        targetRHipX = -1.15 * sub;
        targetRKneeX = 1.25 * sub;
        // Left leg stays back, knee drops to mat
        targetLHipX = 0.55 * sub;
        targetLKneeX = 1.25 * sub;
      } else {
        // Left leg steps forward
        targetLHipX = -1.15 * sub;
        targetLKneeX = 1.25 * sub;
        targetRHipX = 0.55 * sub;
        targetRKneeX = 1.25 * sub;
      }
    }
    // 6. REVERSE LUNGES
    else if (norm.includes("reverselunge")) {
      const phase = (t * 1.8) % (Math.PI * 4);
      const isRightLead = phase < Math.PI * 2;
      const sub = (1 - Math.cos(phase % (Math.PI * 2))) / 2;
      targetRootY = -0.32 * sub;
      targetRootZ = -0.12 * sub;
      targetTorsoRotX = 0.08;
      targetLArmX = -0.5 * sub;
      targetRArmX = -0.5 * sub;
      if (isRightLead) {
        // Right leg steps BACKWARD
        targetRHipX = 0.65 * sub;
        targetRKneeX = 1.25 * sub;
        targetLHipX = -0.85 * sub;
        targetLKneeX = 1.15 * sub;
      } else {
        targetLHipX = 0.65 * sub;
        targetLKneeX = 1.25 * sub;
        targetRHipX = -0.85 * sub;
        targetRKneeX = 1.15 * sub;
      }
    }
    // 7. JUMPING LUNGES
    else if (norm.includes("jumpinglunge")) {
      const raw = (t * 2.4) % (Math.PI * 2);
      const isSwitch = raw > Math.PI * 0.7 && raw < Math.PI * 1.3;
      const step = Math.sin(t * 1.2) > 0 ? 1 : -1;
      if (isSwitch) {
        targetRootY = 0.38; // Airborne leap switching legs!
        targetRHipX = 0.1;
        targetLHipX = 0.1;
        targetRKneeX = 0.2;
        targetLKneeX = 0.2;
      } else {
        targetRootY = -0.32;
        targetRHipX = -1.1 * step;
        targetRKneeX = 1.2;
        targetLHipX = 0.6 * step;
        targetLKneeX = 1.2;
      }
      targetLArmX = -0.8 * step;
      targetRArmX = 0.8 * step;
    }
    // 8. HIGH KNEES
    else if (norm.includes("highknee")) {
      const legRun = Math.sin(t * 8.0);
      const bounce = Math.abs(Math.sin(t * 8.0)) * 0.08;
      targetRootY = bounce;
      if (legRun > 0) {
        targetRHipX = -1.65 * legRun; // Knee lifts high to 90 degrees
        targetRKneeX = 1.45 * legRun;
        targetLHipX = 0.2;
        targetLKneeX = 0.1;
        targetLArmX = -1.1 * legRun; // Running arm pump
        targetRArmX = 0.7 * legRun;
      } else {
        const absRun = Math.abs(legRun);
        targetLHipX = -1.65 * absRun;
        targetLKneeX = 1.45 * absRun;
        targetRHipX = 0.2;
        targetRKneeX = 0.1;
        targetRArmX = -1.1 * absRun;
        targetLArmX = 0.7 * absRun;
      }
    }
    // 9. PLANK (Forearms supporting upper body, elbows beneath shoulders, toes planted, straight alignment)
    else if (norm === "plank" || norm.includes("plank")) {
      targetRootRotX = 1.49; // Prone horizontal alignment facing downward toward the mat
      targetRootY = 0.28;    // Calibrated height for forearm & toe grounding on mat
      targetRootZ = -0.70;   // Centered squarely on the mat

      // Calm isometric respiration: subtle natural breathing movement only
      targetTorsoRotX = 0.008 * Math.sin(t * 1.5);

      // Upper arms vertical from shoulders straight down to the mat
      targetLArmX = -1.52;
      targetRArmX = -1.52;
      targetLArmZ = -0.04;
      targetRArmZ = 0.04;

      // Forearms flat on mat supporting upper body, elbows directly beneath shoulders
      targetLElbowX = -1.54;
      targetRElbowX = -1.54;
      targetLElbowZ = 0;
      targetRElbowZ = 0;

      // Stable, unbroken straight alignment from shoulders through hips to heels
      targetLHipX = -0.05;
      targetRHipX = -0.05;
      targetLHipZ = -0.05;
      targetRHipZ = 0.05;
      targetLKneeX = 0;
      targetRKneeX = 0;

      // Toes tucked and planted firmly on the mat supporting the lower body
      targetLFootX = -0.55;
      targetRFootX = -0.55;

      // Neutral cervical spine: head aligned with spine, looking down toward the floor/mat
      targetHeadRotX = 0;
    }
    // 10. PUSH-UPS
    else if (norm === "pushups") {
      const cycle = (1 - Math.cos(t * 2.0)) / 2; // 0..1..0
      targetRootRotX = -Math.PI / 2 + 0.14;
      targetRootY = 0.44 - 0.22 * cycle; // Chest lowers toward mat
      // High plank arms bending into push-up
      targetLArmX = -1.45;
      targetRArmX = -1.45;
      targetLArmZ = -0.2 - 0.55 * cycle;
      targetRArmZ = 0.2 + 0.55 * cycle;
      targetLElbowX = 0.15 + 1.25 * cycle; // Elbows bend back 90 deg
      targetRElbowX = 0.15 + 1.25 * cycle;
      targetLFootX = 0.55;
      targetRFootX = 0.55;
    }
    // 11. INCLINE PUSH-UPS
    else if (norm.includes("inclinepushup")) {
      const cycle = (1 - Math.cos(t * 2.0)) / 2;
      targetRootRotX = -Math.PI / 2 + 0.55; // Angled plank leaning on bench
      targetRootY = 0.62 - 0.18 * cycle;
      targetRootZ = -0.15 + 0.12 * cycle;
      targetLArmX = -1.35;
      targetRArmX = -1.35;
      targetLArmZ = -0.2 - 0.5 * cycle;
      targetRArmZ = 0.2 + 0.5 * cycle;
      targetLElbowX = 0.15 + 1.15 * cycle;
      targetRElbowX = 0.15 + 1.15 * cycle;
      targetLFootX = 0.45;
      targetRFootX = 0.45;
    }
    // 12. MOUNTAIN CLIMBERS
    else if (norm.includes("mountainclimber")) {
      const legRun = Math.sin(t * 7.0);
      targetRootRotX = -Math.PI / 2 + 0.24; // High plank on hands
      targetRootY = 0.48;
      targetLArmX = -1.45;
      targetRArmX = -1.45;
      targetLElbowX = 0.15;
      targetRElbowX = 0.15;
      if (legRun > 0) {
        targetRHipX = -1.45 * legRun; // Right knee drives forward under chest
        targetRKneeX = 1.55 * legRun;
        targetLHipX = 0.15;
        targetLKneeX = 0.1;
      } else {
        const absRun = Math.abs(legRun);
        targetLHipX = -1.45 * absRun; // Left knee drives forward
        targetLKneeX = 1.55 * absRun;
        targetRHipX = 0.15;
        targetRKneeX = 0.1;
      }
      targetLFootX = 0.55;
      targetRFootX = 0.55;
    }
    // 13. BURPEES
    else if (norm.includes("burpee")) {
      const phase = (t * 1.5) % 6.0; // 6 distinct movement stages
      if (phase < 1.0) {
        // Stage 1: Drop into crouch
        const p = phase;
        targetRootY = -0.45 * p;
        targetTorsoRotX = 0.65 * p;
        targetLHipX = -1.4 * p;
        targetRHipX = -1.4 * p;
        targetLKneeX = 1.5 * p;
        targetRKneeX = 1.5 * p;
        targetLArmX = -0.9 * p;
        targetRArmX = -0.9 * p;
      } else if (phase < 2.2) {
        // Stage 2: Kick back to high plank
        targetRootRotX = -Math.PI / 2 + 0.15;
        targetRootY = 0.45;
        targetLArmX = -1.45;
        targetRArmX = -1.45;
        targetLElbowX = 0.15;
        targetRElbowX = 0.15;
        targetLFootX = 0.55;
        targetRFootX = 0.55;
      } else if (phase < 3.2) {
        // Stage 3: Push-up dip
        const sub = (1 - Math.cos((phase - 2.2) * Math.PI)) / 2;
        targetRootRotX = -Math.PI / 2 + 0.15;
        targetRootY = 0.45 - 0.2 * sub;
        targetLArmX = -1.45;
        targetRArmX = -1.45;
        targetLElbowX = 0.15 + 1.2 * sub;
        targetRElbowX = 0.15 + 1.2 * sub;
        targetLFootX = 0.55;
        targetRFootX = 0.55;
      } else if (phase < 4.2) {
        // Stage 4: Jump feet back under hips into crouch
        targetRootY = -0.45;
        targetTorsoRotX = 0.65;
        targetLHipX = -1.4;
        targetRHipX = -1.4;
        targetLKneeX = 1.5;
        targetRKneeX = 1.5;
        targetLArmX = -0.9;
        targetRArmX = -0.9;
      } else if (phase < 5.4) {
        // Stage 5: EXPLOSIVE VERTICAL JUMP!
        const air = Math.sin(((phase - 4.2) / 1.2) * Math.PI);
        targetRootY = air * 0.55; // Jumps high in air!
        targetLArmX = -2.85; // Arms swing straight up overhead
        targetRArmX = -2.85;
        targetLHipX = 0;
        targetRHipX = 0;
        targetLKneeX = 0;
        targetRKneeX = 0;
        targetLFootX = 0.45; // Point toes down
        targetRFootX = 0.45;
      } else {
        // Stage 6: Soft landing absorption
        targetRootY = -0.15;
        targetLKneeX = 0.35;
        targetRKneeX = 0.35;
      }
    }
    // 14. GLUTE BRIDGES
    else if (norm.includes("glutebridge")) {
      const cycle = (1 - Math.cos(t * 2.0)) / 2;
      targetRootRotX = Math.PI / 2; // Supine lying on back
      targetRootY = 0.22;
      targetRootZ = -0.1;
      // Knees bent with feet flat on mat
      targetLHipX = -1.2 + 0.65 * cycle; // Hips thrust up into straight bridge!
      targetRHipX = -1.2 + 0.65 * cycle;
      targetLKneeX = 1.55;
      targetRKneeX = 1.55;
      targetHipsY = 1.05 + 0.25 * cycle; // Pelvis lifts
      targetLArmX = 0.15; // Arms resting on mat
      targetRArmX = 0.15;
    }
    // 15. CALF RAISES
    else if (norm.includes("calfraise")) {
      const cycle = (1 - Math.cos(t * 2.2)) / 2;
      targetRootY = 0.14 * cycle; // Whole body elevates onto balls of feet
      targetLFootX = 0.55 * cycle; // Plantarflexion
      targetRFootX = 0.55 * cycle;
      targetLArmX = -0.15;
      targetRArmX = -0.15;
    }
    // 16. ARM CIRCLES
    else if (norm.includes("armcircle")) {
      targetLArmZ = -1.55; // Arms extended straight horizontal to sides
      targetRArmZ = 1.55;
      // Fluid circular orbit
      targetLArmX = Math.cos(t * 3.5) * 0.25;
      targetLArmY = Math.sin(t * 3.5) * 0.25;
      targetRArmX = Math.cos(t * 3.5) * 0.25;
      targetRArmY = -Math.sin(t * 3.5) * 0.25;
    }
    // 17. TRICEP DIPS
    else if (norm.includes("tricepdip")) {
      const cycle = (1 - Math.cos(t * 2.0)) / 2;
      targetRootY = -0.32 * cycle; // Lowering body off bench edge
      targetRootZ = 0.15;
      // Hands grasping bench behind hips
      targetLArmX = 0.45;
      targetRArmX = 0.45;
      targetLElbowX = 0.25 + 1.25 * cycle; // Elbows bend back 90 deg
      targetRElbowX = 0.25 + 1.25 * cycle;
      targetLHipX = -0.45;
      targetRHipX = -0.45;
      targetLKneeX = 0.55;
      targetRKneeX = 0.55;
    }
    // 18. BICEP CURLS
    else if (norm.includes("bicepcurl")) {
      const cycle = (1 - Math.cos(t * 2.0)) / 2;
      // Upper arms stay firmly pinned to sides
      targetLArmX = 0.05;
      targetRArmX = 0.05;
      targetLArmZ = -0.15;
      targetRArmZ = 0.15;
      // Forearms curl up dumbbells from 0 to 135 degrees
      targetLElbowX = -2.3 * cycle;
      targetRElbowX = -2.3 * cycle;
      targetTorsoRotX = 0.02 * Math.sin(t * 2.0); // Firm core stability
    }
    // 19. BIRD DOG
    else if (norm.includes("birddog")) {
      const phase = (t * 1.6) % (Math.PI * 4);
      const isRightArmLead = phase < Math.PI * 2;
      const sub = (1 - Math.cos(phase % (Math.PI * 2))) / 2;
      targetRootRotX = -Math.PI / 2 + 0.1; // Quadruped on hands and knees
      targetRootY = 0.55;
      targetLKneeX = 1.55;
      targetRKneeX = 1.55;
      targetLArmX = -1.45;
      targetRArmX = -1.45;
      if (isRightArmLead) {
        // Right arm extends forward, left leg extends straight back
        targetRArmX = -1.45 - 1.55 * sub; // Reaching straight out forward
        targetLHipX = 0.55 * sub;
        targetLKneeX = 1.55 - 1.45 * sub; // Left leg straightens back!
      } else {
        // Left arm forward, right leg back
        targetLArmX = -1.45 - 1.55 * sub;
        targetRHipX = 0.55 * sub;
        targetRKneeX = 1.55 - 1.45 * sub;
      }
    }
    // 20. SUPERMAN
    else if (norm.includes("superman")) {
      const cycle = (1 - Math.cos(t * 2.0)) / 2;
      targetRootRotX = -Math.PI / 2; // Lying prone face down
      targetRootY = 0.18;
      targetLArmX = -3.0 - 0.35 * cycle; // Arms overhead lifting in arch
      targetRArmX = -3.0 - 0.35 * cycle;
      targetTorsoRotX = -0.32 * cycle; // Chest lifts off mat
      targetLHipX = -0.35 * cycle; // Thighs lift off mat
      targetRHipX = -0.35 * cycle;
    }
    // 21. REVERSE SNOW ANGELS
    else if (norm.includes("reversesnowangel")) {
      const cycle = (1 - Math.cos(t * 2.0)) / 2;
      targetRootRotX = -Math.PI / 2; // Lying prone
      targetRootY = 0.18;
      targetTorsoRotX = -0.15; // Chest hovered
      // Arms sweep from sides in wide horizontal circle overhead
      targetLArmZ = -cycle * 2.65;
      targetRArmZ = cycle * 2.65;
      targetLArmX = -0.15;
      targetRArmX = -0.15;
    }
    // 22. SHOULDER TAPS
    else if (norm.includes("shouldertap")) {
      const phase = (t * 2.0) % (Math.PI * 4);
      const isRightTap = phase < Math.PI * 2;
      const sub = (1 - Math.cos(phase % (Math.PI * 2))) / 2;
      targetRootRotX = -Math.PI / 2 + 0.16; // High plank on hands
      targetRootY = 0.52;
      targetLArmX = -1.45;
      targetRArmX = -1.45;
      targetLFootX = 0.55;
      targetRFootX = 0.55;
      if (isRightTap) {
        // Right hand reaches across chest to tap left shoulder
        targetRArmX = -1.45 + 0.7 * sub;
        targetRArmZ = -0.75 * sub;
        targetRElbowX = 1.35 * sub;
      } else {
        // Left hand reaches across to tap right shoulder
        targetLArmX = -1.45 + 0.7 * sub;
        targetLArmZ = 0.75 * sub;
        targetLElbowX = 1.35 * sub;
      }
    }
    // 23. DEAD BUG
    else if (norm.includes("deadbug")) {
      const phase = (t * 1.8) % (Math.PI * 4);
      const isRightArmLead = phase < Math.PI * 2;
      const sub = (1 - Math.cos(phase % (Math.PI * 2))) / 2;
      targetRootRotX = Math.PI / 2; // Supine on back
      targetRootY = 0.22;
      // Baseline tabletop arms & legs
      targetLArmX = -1.55;
      targetRArmX = -1.55;
      targetLHipX = -1.55;
      targetRHipX = -1.55;
      targetLKneeX = 1.55;
      targetRKneeX = 1.55;
      if (isRightArmLead) {
        // Right arm overhead, left leg extends straight
        targetRArmX = -1.55 - 1.45 * sub;
        targetLHipX = -1.55 + 1.45 * sub;
        targetLKneeX = 1.55 - 1.35 * sub;
      } else {
        // Left arm overhead, right leg extends straight
        targetLArmX = -1.55 - 1.45 * sub;
        targetRHipX = -1.55 + 1.45 * sub;
        targetRKneeX = 1.55 - 1.35 * sub;
      }
    }

    // Smooth Lerp factor (snappy yet fluid interpolation)
    const lerpRate = 0.14;

    // Apply Root transforms
    if (root.current) {
      s.rootPos.x = THREE.MathUtils.lerp(s.rootPos.x, targetRootX, lerpRate);
      s.rootPos.y = THREE.MathUtils.lerp(s.rootPos.y, targetRootY, lerpRate);
      s.rootPos.z = THREE.MathUtils.lerp(s.rootPos.z, targetRootZ, lerpRate);
      root.current.position.set(s.rootPos.x, s.rootPos.y, s.rootPos.z);

      s.rootRot.x = THREE.MathUtils.lerp(s.rootRot.x, targetRootRotX, lerpRate);
      s.rootRot.y = THREE.MathUtils.lerp(s.rootRot.y, targetRootRotY, lerpRate);
      s.rootRot.z = THREE.MathUtils.lerp(s.rootRot.z, targetRootRotZ, lerpRate);
      root.current.rotation.set(s.rootRot.x, s.rootRot.y, s.rootRot.z);
    }

    // Apply Hips
    if (hips.current) {
      s.hipsPos.y = THREE.MathUtils.lerp(s.hipsPos.y, targetHipsY, lerpRate);
      hips.current.position.y = s.hipsPos.y;
    }

    // Apply Torso
    if (torso.current) {
      s.torsoRot.x = THREE.MathUtils.lerp(s.torsoRot.x, targetTorsoRotX, lerpRate);
      s.torsoRot.y = THREE.MathUtils.lerp(s.torsoRot.y, targetTorsoRotY, lerpRate);
      s.torsoRot.z = THREE.MathUtils.lerp(s.torsoRot.z, targetTorsoRotZ, lerpRate);
      torso.current.rotation.set(s.torsoRot.x, s.torsoRot.y, s.torsoRot.z);
    }

    // Apply Head
    if (head.current) {
      s.headRot.x = THREE.MathUtils.lerp(s.headRot.x, targetHeadRotX, lerpRate);
      head.current.rotation.x = s.headRot.x;
    }

    // Arms and Shoulders
    if (leftShoulder.current) {
      s.leftArmRot.x = THREE.MathUtils.lerp(s.leftArmRot.x, targetLArmX, lerpRate);
      s.leftArmRot.y = THREE.MathUtils.lerp(s.leftArmRot.y, targetLArmY, lerpRate);
      s.leftArmRot.z = THREE.MathUtils.lerp(s.leftArmRot.z, targetLArmZ, lerpRate);
      leftShoulder.current.rotation.set(s.leftArmRot.x, s.leftArmRot.y, s.leftArmRot.z);
    }
    if (rightShoulder.current) {
      s.rightArmRot.x = THREE.MathUtils.lerp(s.rightArmRot.x, targetRArmX, lerpRate);
      s.rightArmRot.y = THREE.MathUtils.lerp(s.rightArmRot.y, targetRArmY, lerpRate);
      s.rightArmRot.z = THREE.MathUtils.lerp(s.rightArmRot.z, targetRArmZ, lerpRate);
      rightShoulder.current.rotation.set(s.rightArmRot.x, s.rightArmRot.y, s.rightArmRot.z);
    }

    // Elbows / Forearms
    if (leftElbow.current) {
      s.leftElbowRot.x = THREE.MathUtils.lerp(s.leftElbowRot.x, targetLElbowX, lerpRate);
      s.leftElbowRot.y = THREE.MathUtils.lerp(s.leftElbowRot.y, targetLElbowY, lerpRate);
      s.leftElbowRot.z = THREE.MathUtils.lerp(s.leftElbowRot.z, targetLElbowZ, lerpRate);
      leftElbow.current.rotation.set(s.leftElbowRot.x, s.leftElbowRot.y, s.leftElbowRot.z);
    }
    if (rightElbow.current) {
      s.rightElbowRot.x = THREE.MathUtils.lerp(s.rightElbowRot.x, targetRElbowX, lerpRate);
      s.rightElbowRot.y = THREE.MathUtils.lerp(s.rightElbowRot.y, targetRElbowY, lerpRate);
      s.rightElbowRot.z = THREE.MathUtils.lerp(s.rightElbowRot.z, targetRElbowZ, lerpRate);
      rightElbow.current.rotation.set(s.rightElbowRot.x, s.rightElbowRot.y, s.rightElbowRot.z);
    }

    // Hips / Thighs
    if (leftHip.current) {
      s.leftHipRot.x = THREE.MathUtils.lerp(s.leftHipRot.x, targetLHipX, lerpRate);
      s.leftHipRot.z = THREE.MathUtils.lerp(s.leftHipRot.z, targetLHipZ, lerpRate);
      leftHip.current.rotation.set(s.leftHipRot.x, 0, s.leftHipRot.z);
    }
    if (rightHip.current) {
      s.rightHipRot.x = THREE.MathUtils.lerp(s.rightHipRot.x, targetRHipX, lerpRate);
      s.rightHipRot.z = THREE.MathUtils.lerp(s.rightHipRot.z, targetRHipZ, lerpRate);
      rightHip.current.rotation.set(s.rightHipRot.x, 0, s.rightHipRot.z);
    }

    // Knees / Calves
    if (leftKnee.current) {
      s.leftKneeRot.x = THREE.MathUtils.lerp(s.leftKneeRot.x, targetLKneeX, lerpRate);
      leftKnee.current.rotation.x = s.leftKneeRot.x;
    }
    if (rightKnee.current) {
      s.rightKneeRot.x = THREE.MathUtils.lerp(s.rightKneeRot.x, targetRKneeX, lerpRate);
      rightKnee.current.rotation.x = s.rightKneeRot.x;
    }

    // Feet / Shoes
    if (leftFoot.current) {
      s.leftFootRot.x = THREE.MathUtils.lerp(s.leftFootRot.x, targetLFootX, lerpRate);
      leftFoot.current.rotation.x = s.leftFootRot.x;
    }
    if (rightFoot.current) {
      s.rightFootRot.x = THREE.MathUtils.lerp(s.rightFootRot.x, targetRFootX, lerpRate);
      rightFoot.current.rotation.x = s.rightFootRot.x;
    }
  });

  return (
    <group>
      {/* Dynamic Environmental Props */}
      {hasWall && <StudioWall />}
      {hasBench && <WorkoutBench />}
      {isFloorExercise && <ExerciseMat />}

      {/* Human Character Root */}
      <group ref={root} position={[0, 0, 0]}>
        {/* Hips & Pelvis */}
        <group ref={hips} position={[0, 1.05, 0]}>
          {/* Gym Shorts */}
          <mesh castShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.24, 0.26, 24]} />
            <meshStandardMaterial color="#2d3436" roughness={0.7} />
          </mesh>
          {/* Shorts athletic side stripes */}
          <mesh position={[-0.225, 0, 0]}>
            <boxGeometry args={[0.015, 0.24, 0.05]} />
            <meshStandardMaterial color="#6c5ce7" />
          </mesh>
          <mesh position={[0.225, 0, 0]}>
            <boxGeometry args={[0.015, 0.24, 0.05]} />
            <meshStandardMaterial color="#6c5ce7" />
          </mesh>

          {/* Torso & Spine */}
          <group ref={torso} position={[0, 0.14, 0]}>
            {/* Midriff / waist */}
            <mesh castShadow position={[0, 0.16, 0]}>
              <cylinderGeometry args={[0.23, 0.21, 0.22, 24]} />
              <meshStandardMaterial color="#6c5ce7" roughness={0.65} />
            </mesh>

            {/* Athletic Chest & T-Shirt */}
            <mesh castShadow position={[0, 0.42, 0]}>
              <cylinderGeometry args={[0.27, 0.23, 0.32, 24]} />
              <meshStandardMaterial color="#5b4bc4" roughness={0.6} />
            </mesh>
            {/* FitTrack Chest Logo badge */}
            <mesh position={[0, 0.44, 0.255]}>
              <boxGeometry args={[0.11, 0.05, 0.02]} />
              <meshStandardMaterial color="#00cec9" emissive="#00cec9" emissiveIntensity={0.3} />
            </mesh>

            {/* Neck */}
            <mesh position={[0, 0.63, 0]}>
              <cylinderGeometry args={[0.09, 0.1, 0.14, 20]} />
              <meshStandardMaterial color="#e5a67c" roughness={0.7} />
            </mesh>

            {/* Head & Face */}
            <group ref={head} position={[0, 0.82, 0]}>
              {/* Head mesh */}
              <mesh castShadow scale={[0.22, 0.26, 0.23]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#e5a67c" roughness={0.75} />
              </mesh>

              {/* Athletic Headband */}
              <mesh position={[0, 0.08, 0]}>
                <cylinderGeometry args={[0.225, 0.225, 0.06, 32]} />
                <meshStandardMaterial color="#6c5ce7" roughness={0.5} />
              </mesh>

              {/* Hair */}
              <mesh position={[0, 0.16, -0.04]} scale={[0.23, 0.15, 0.24]}>
                <sphereGeometry args={[1, 24, 24]} />
                <meshStandardMaterial color="#2d3436" roughness={0.9} />
              </mesh>
              {/* Hair bun / top crest */}
              <mesh position={[0, 0.24, -0.09]} scale={[0.11, 0.09, 0.11]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#2d3436" roughness={0.9} />
              </mesh>

              {/* Eyes */}
              <mesh position={[-0.08, 0.01, 0.21]}>
                <sphereGeometry args={[0.025, 16, 16]} />
                <meshStandardMaterial color="#1e272e" />
              </mesh>
              <mesh position={[0.08, 0.01, 0.21]}>
                <sphereGeometry args={[0.025, 16, 16]} />
                <meshStandardMaterial color="#1e272e" />
              </mesh>

              {/* Friendly confident smile */}
              <mesh position={[0, -0.09, 0.215]} scale={[0.06, 0.018, 0.015]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#c0392b" />
              </mesh>
            </group>

            {/* Left Shoulder & Upper Arm */}
            <group ref={leftShoulder} position={[-0.34, 0.52, 0]}>
              {/* Shoulder joint */}
              <mesh castShadow>
                <sphereGeometry args={[0.1, 20, 20]} />
                <meshStandardMaterial color="#5b4bc4" roughness={0.65} />
              </mesh>
              {/* Upper arm (biceps/triceps) */}
              <mesh castShadow position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.08, 0.075, 0.26, 20]} />
                <meshStandardMaterial color="#e5a67c" roughness={0.7} />
              </mesh>

              {/* Left Elbow & Forearm */}
              <group ref={leftElbow} position={[0, -0.34, 0]}>
                <mesh>
                  <sphereGeometry args={[0.075, 16, 16]} />
                  <meshStandardMaterial color="#e5a67c" roughness={0.7} />
                </mesh>
                <mesh castShadow position={[0, -0.18, 0]}>
                  <cylinderGeometry args={[0.07, 0.06, 0.26, 20]} />
                  <meshStandardMaterial color="#e5a67c" roughness={0.7} />
                </mesh>
                {/* Hand */}
                <group ref={leftHand} position={[0, -0.34, 0]}>
                  <mesh castShadow>
                    <sphereGeometry args={[0.065, 16, 16]} />
                    <meshStandardMaterial color="#e5a67c" roughness={0.7} />
                  </mesh>
                  {/* Dumbbell prop when bicep curls active */}
                  {hasDumbbells && <HexDumbbell />}
                </group>
              </group>
            </group>

            {/* Right Shoulder & Upper Arm */}
            <group ref={rightShoulder} position={[0.34, 0.52, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.1, 20, 20]} />
                <meshStandardMaterial color="#5b4bc4" roughness={0.65} />
              </mesh>
              <mesh castShadow position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.08, 0.075, 0.26, 20]} />
                <meshStandardMaterial color="#e5a67c" roughness={0.7} />
              </mesh>

              {/* Right Elbow & Forearm */}
              <group ref={rightElbow} position={[0, -0.34, 0]}>
                <mesh>
                  <sphereGeometry args={[0.075, 16, 16]} />
                  <meshStandardMaterial color="#e5a67c" roughness={0.7} />
                </mesh>
                <mesh castShadow position={[0, -0.18, 0]}>
                  <cylinderGeometry args={[0.07, 0.06, 0.26, 20]} />
                  <meshStandardMaterial color="#e5a67c" roughness={0.7} />
                </mesh>
                {/* Hand */}
                <group ref={rightHand} position={[0, -0.34, 0]}>
                  <mesh castShadow>
                    <sphereGeometry args={[0.065, 16, 16]} />
                    <meshStandardMaterial color="#e5a67c" roughness={0.7} />
                  </mesh>
                  {/* Dumbbell prop */}
                  {hasDumbbells && <HexDumbbell />}
                </group>
              </group>
            </group>
          </group>

          {/* Left Hip & Thigh */}
          <group ref={leftHip} position={[-0.15, -0.12, 0]}>
            {/* Upper Thigh */}
            <mesh castShadow position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.11, 0.09, 0.38, 24]} />
              <meshStandardMaterial color="#2d3436" roughness={0.7} />
            </mesh>
            {/* Lower Thigh above knee */}
            <mesh position={[0, -0.38, 0]}>
              <cylinderGeometry args={[0.09, 0.085, 0.12, 20]} />
              <meshStandardMaterial color="#e5a67c" roughness={0.7} />
            </mesh>

            {/* Left Knee & Calf */}
            <group ref={leftKnee} position={[0, -0.46, 0]}>
              <mesh>
                <sphereGeometry args={[0.085, 16, 16]} />
                <meshStandardMaterial color="#e5a67c" roughness={0.7} />
              </mesh>
              {/* Calf muscle */}
              <mesh castShadow position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.085, 0.065, 0.36, 20]} />
                <meshStandardMaterial color="#e5a67c" roughness={0.7} />
              </mesh>

              {/* Left Foot & Sneaker */}
              <group ref={leftFoot} position={[0, -0.44, 0.07]}>
                {/* Sneaker main body */}
                <mesh castShadow position={[0, 0, 0]} scale={[0.14, 0.1, 0.26]}>
                  <sphereGeometry args={[1, 24, 16]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.4} />
                </mesh>
                {/* Sneaker rubber outsole */}
                <mesh position={[0, -0.06, 0]}>
                  <boxGeometry args={[0.15, 0.035, 0.28]} />
                  <meshStandardMaterial color="#6c5ce7" roughness={0.5} />
                </mesh>
              </group>
            </group>
          </group>

          {/* Right Hip & Thigh */}
          <group ref={rightHip} position={[0.15, -0.12, 0]}>
            <mesh castShadow position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.11, 0.09, 0.38, 24]} />
              <meshStandardMaterial color="#2d3436" roughness={0.7} />
            </mesh>
            <mesh position={[0, -0.38, 0]}>
              <cylinderGeometry args={[0.09, 0.085, 0.12, 20]} />
              <meshStandardMaterial color="#e5a67c" roughness={0.7} />
            </mesh>

            {/* Right Knee & Calf */}
            <group ref={rightKnee} position={[0, -0.46, 0]}>
              <mesh>
                <sphereGeometry args={[0.085, 16, 16]} />
                <meshStandardMaterial color="#e5a67c" roughness={0.7} />
              </mesh>
              <mesh castShadow position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.085, 0.065, 0.36, 20]} />
                <meshStandardMaterial color="#e5a67c" roughness={0.7} />
              </mesh>

              {/* Right Foot & Sneaker */}
              <group ref={rightFoot} position={[0, -0.44, 0.07]}>
                <mesh castShadow position={[0, 0, 0]} scale={[0.14, 0.1, 0.26]}>
                  <sphereGeometry args={[1, 24, 16]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.06, 0]}>
                  <boxGeometry args={[0.15, 0.035, 0.28]} />
                  <meshStandardMaterial color="#6c5ce7" roughness={0.5} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
