 import { useState, useEffect } from "react";

function Profile({ setSelectedWorkout }) {
  const [name, setName] = useState(() => {
    return localStorage.getItem("profileName") || "";
  });

  const [fitnessLevel, setFitnessLevel] = useState(() => {
    return localStorage.getItem("fitnessLevel") || "Beginner";
  });

  const [goal, setGoal] = useState(() => {
    return localStorage.getItem("fitnessGoal") || "Build Strength";
  });

  const [saved, setSaved] = useState(false);

  const saveProfile = () => {
    localStorage.setItem("profileName", name);
    localStorage.setItem("fitnessLevel", fitnessLevel);
    localStorage.setItem("fitnessGoal", goal);

    setSelectedWorkout(fitnessLevel);

    setSaved(true);
  };

  useEffect(() => {
    setSaved(false);
  }, [name, fitnessLevel, goal]);

  return (
    <div className="profile-page">

      <h1>My Profile</h1>

      <p>Manage your fitness information.</p>

      <div className="profile-card">

        {/* Name */}
        <label>Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Fitness Level */}
        <label>Fitness Level</label>

        <select
          value={fitnessLevel}
          onChange={(e) => setFitnessLevel(e.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Fitness Goal */}
        <label>Fitness Goal</label>

        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="Build Strength">
            Build Strength
          </option>

          <option value="Improve Fitness">
            Improve Fitness
          </option>

          <option value="Increase Flexibility">
            Increase Flexibility
          </option>

          <option value="Stay Active">
            Stay Active
          </option>
        </select>

        {/* Save Button */}
        <button onClick={saveProfile}>
          Save Profile
        </button>

        {/* Success Message */}
        {saved && (
          <div className="profile-success">
            ✓ Profile saved successfully!
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;