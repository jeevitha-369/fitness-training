import { useState } from "react";
import {
  loginDemoUser,
  registerDemoUser,
  DEFAULT_DEMO_ACCOUNT,
} from "../utils/authUtils";

export default function AuthPage({
  currentUser,
  onLoginSuccess,
  onLogout,
  onNavigate,
}) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("Beginner");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Switch between Login and Sign Up
  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setErrorMessage("");
    setSuccessMessage("");
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        if (!name.trim()) {
          setErrorMessage("Please enter your name.");
          setIsSubmitting(false);
          return;
        }
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match.");
          setIsSubmitting(false);
          return;
        }

        const res = await registerDemoUser({
          name,
          email,
          password,
          fitnessLevel,
        });

        if (res.success) {
          setSuccessMessage("Account created successfully! Welcome to FitTrack Pro.");
          setTimeout(() => {
            onLoginSuccess(res.user);
            onNavigate("dashboard");
          }, 1200);
        } else {
          setErrorMessage(res.error || "Failed to register account.");
        }
      } else {
        const res = await loginDemoUser(email, password);
        if (res.success) {
          setSuccessMessage(`Welcome back, ${res.user.name || "Athlete"}!`);
          setTimeout(() => {
            onLoginSuccess(res.user);
            onNavigate("dashboard");
          }, 1000);
        } else {
          setErrorMessage(res.error || "Authentication failed.");
        }
      }
    } catch {
      setErrorMessage("An unexpected error occurred during demo authentication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick 1-Click Demo Login
  const handleQuickDemoLogin = async () => {
    setEmail(DEFAULT_DEMO_ACCOUNT.email);
    setPassword("demo123");
    setErrorMessage("");
    setIsSubmitting(true);
    const res = await loginDemoUser(DEFAULT_DEMO_ACCOUNT.email, "demo123");
    setIsSubmitting(false);
    if (res.success) {
      setSuccessMessage(`Welcome back, ${res.user.name}!`);
      setTimeout(() => {
        onLoginSuccess(res.user);
        onNavigate("dashboard");
      }, 700);
    } else {
      setErrorMessage(res.error);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Security Disclaimer Banner */}
      <div className="auth-security-notice">
        <div className="notice-badge">DEMO MODE</div>
        <p className="notice-text">
          <strong>Frontend Demo:</strong> Local-only session with client-side SHA-256 encryption. Raw passwords are never saved in storage.
        </p>
      </div>

      <div className="auth-card-wrapper">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 5v14M18 5v14M2 9h4M18 9h4M2 15h4M18 15h4M6 12h12" />
              </svg>
            </div>
            <h1 className="auth-title">
              {currentUser?.isLoggedIn
                ? "Active Demo Session"
                : mode === "login"
                ? "Sign In to FitTrack"
                : "Create Demo Athlete Account"}
            </h1>
            <p className="auth-subtitle">
              {currentUser?.isLoggedIn
                ? `Signed in as ${currentUser.name} (${currentUser.email})`
                : mode === "login"
                ? "Enter your email and password."
                : "Create a local profile to track your fitness."}
            </p>
          </div>

          {/* If already logged in, offer quick logout or return */}
          {currentUser?.isLoggedIn ? (
            <div className="auth-logged-in-view">
              <div className="session-info-box">
                <div className="session-avatar">
                  {(currentUser.name || "JD").slice(0, 2).toUpperCase()}
                </div>
                <div className="session-details">
                  <h3 className="session-name">{currentUser.name}</h3>
                  <span className="session-email">{currentUser.email}</span>
                  <span className="session-level-chip">
                    {currentUser.fitnessLevel || "Beginner"} Level
                  </span>
                </div>
              </div>

              <div className="session-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => onNavigate("dashboard")}
                >
                  🚀 Return to Dashboard
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-block"
                  onClick={onLogout}
                >
                  🔒 Sign Out (Preserve Workout History)
                </button>
              </div>

              <p className="session-note text-muted-sm">
                Signing out clears your demo session while keeping your workout history intact.
              </p>
            </div>
          ) : (
            <>
              {/* Mode Switcher Tabs */}
              <div className="auth-tab-buttons">
                <button
                  type="button"
                  className={`auth-tab-btn ${mode === "login" ? "active" : ""}`}
                  onClick={() => handleSwitchMode("login")}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={`auth-tab-btn ${mode === "signup" ? "active" : ""}`}
                  onClick={() => handleSwitchMode("signup")}
                >
                  Create Account
                </button>
              </div>

              {/* Status Alerts */}
              {errorMessage && (
                <div className="alert-error-banner" role="alert">
                  <span className="alert-icon">⚠️</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="alert-success-banner" role="alert">
                  <span className="alert-icon">✓</span>
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="auth-form" noValidate>
                {mode === "signup" && (
                  <div className="form-group">
                    <label htmlFor="auth-name">Full Name</label>
                    <input
                      id="auth-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Jeevi D"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="auth-email">Email Address</label>
                  <input
                    id="auth-email"
                    type="email"
                    className="form-input"
                    placeholder="athlete@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label htmlFor="auth-password">Password</label>
                    <button
                      type="button"
                      className="toggle-pw-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                      tabIndex={-1}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="password-input-wrap">
                    <input
                      id="auth-password"
                      type={showPassword ? "text" : "password"}
                      className="form-input"
                      placeholder={mode === "signup" ? "At least 6 characters" : "Enter password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {mode === "signup" && (
                    <span className="input-hint">Minimum 6 characters. Stored as SHA-256 hash.</span>
                  )}
                </div>

                {mode === "signup" && (
                  <>
                    <div className="form-group">
                      <div className="label-row">
                        <label htmlFor="auth-confirm-password">Confirm Password</label>
                        <button
                          type="button"
                          className="toggle-pw-btn"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <input
                        id="auth-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-input"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="auth-level">Starting Fitness Level</label>
                      <select
                        id="auth-level"
                        className="form-select"
                        value={fitnessLevel}
                        onChange={(e) => setFitnessLevel(e.target.value)}
                      >
                        <option value="Beginner">Beginner (Foundations &amp; Flexibility)</option>
                        <option value="Intermediate">Intermediate (Core &amp; Calisthenics)</option>
                        <option value="Advanced">Advanced (High-Intensity &amp; Plyo)</option>
                      </select>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-block auth-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Processing..."
                    : mode === "login"
                    ? "Sign In to FitTrack"
                    : "Create Demo Profile"}
                </button>
              </form>

              {/* Quick 1-Click Demo Login Button */}
              {mode === "login" && (
                <div className="auth-quick-demo-section">
                  <div className="divider-row">
                    <span className="divider-line"></span>
                    <span className="divider-text">OR INSTANT ACCESS</span>
                    <span className="divider-line"></span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary btn-block quick-demo-btn"
                    onClick={handleQuickDemoLogin}
                    disabled={isSubmitting}
                  >
                    ⚡ Quick Demo Athlete Login
                  </button>
                  <span className="quick-demo-hint">
                    Instant login with test credentials.
                  </span>
                </div>
              )}

              {/* Return to App without login */}
              <div className="auth-footer-actions">
                <button
                  type="button"
                  className="link-btn-guest"
                  onClick={() => onNavigate("dashboard")}
                >
                  ← Continue as Guest
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
