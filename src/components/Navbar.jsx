import { useState } from "react";

export default function Navbar({
  activePage,
  onNavigate,
  currentUser,
  onLogout,
  profileName,
  fitnessLevel,
  historyCount = 0,
  theme = "light",
  onToggleTheme,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "workouts", label: "Workouts", icon: "📋" },
    { id: "tracker", label: "Tracker", icon: "🎯" },
    { id: "exerciseGuide", label: "Workout Guide", icon: "🎥" },
    { id: "dietPlan", label: "Diet Plan", icon: "🥗" },
    { id: "progress", label: "Progress", icon: "📈" },
    { id: "history", label: "History", icon: "⏱️" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name || !name.trim()) return "JD";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const displayName = currentUser?.isLoggedIn
    ? currentUser.name
    : profileName || "Jeevi D";

  const displayLevel = currentUser?.isLoggedIn
    ? currentUser.fitnessLevel || fitnessLevel || "Beginner"
    : fitnessLevel || "Beginner";

  return (
    <header className="fittrack-navbar">
      <div className="navbar-container">
        {/* Brand */}
        <div
          className="navbar-brand"
          onClick={() => handleNavClick("dashboard")}
          role="button"
          tabIndex={0}
        >
          <div className="brand-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 5v14M18 5v14M2 9h4M18 9h4M2 15h4M18 15h4M6 12h12" />
            </svg>
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <span className="brand-name">FitTrack</span>
              <span className="brand-pro-badge">PRO</span>
            </div>
            <span className="brand-tagline">Personal Workout Studio</span>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop & Mobile Navigation Links */}
        <nav className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item-btn ${isActive ? "active" : ""}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className="nav-item-icon">{item.icon}</span>
                <span className="nav-item-label">{item.label}</span>
                {item.id === "history" && historyCount > 0 && (
                  <span className="nav-badge">{historyCount}</span>
                )}
                {item.id === "dietPlan" && (
                  <span className="nav-sub-badge">NEW</span>
                )}
              </button>
            );
          })}

          {/* Mobile-only controls inside drawer */}
          <div className="mobile-auth-row">
            {onToggleTheme && (
              <button
                type="button"
                className="theme-toggle-btn mobile-theme-btn"
                onClick={onToggleTheme}
                aria-label="Toggle light and dark theme"
              >
                {theme === "dark" ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
              </button>
            )}
            {currentUser?.isLoggedIn ? (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger mobile-logout-btn"
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
              >
                🔒 Sign Out ({currentUser.email})
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-sm btn-primary mobile-login-btn"
                onClick={() => handleNavClick("auth")}
              >
                🔑 Sign In / Register
              </button>
            )}
          </div>
        </nav>

        {/* User Status / Quick Chip, Theme Toggle & Auth Button */}
        <div className="navbar-right">
          {onToggleTheme && (
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}
          {currentUser?.isLoggedIn ? (
            <div className="nav-auth-logged-in-wrap">
              <button
                type="button"
                className="user-profile-chip"
                onClick={() => handleNavClick("profile")}
                title={`Signed in as ${currentUser.email}. Click for Profile Settings.`}
              >
                <div className="avatar-circle">
                  {getInitials(displayName)}
                </div>
                <div className="user-info-text">
                  <span className="user-name-display">{displayName}</span>
                  <span className="user-level-badge">{displayLevel}</span>
                </div>
              </button>

              <button
                type="button"
                className="navbar-logout-btn"
                onClick={onLogout}
                title="Sign out of demo session (workout history is preserved)"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="nav-auth-logged-out-wrap">
              <button
                type="button"
                className="user-profile-chip guest-chip"
                onClick={() => handleNavClick("profile")}
                title="Guest Mode • Click for Profile"
              >
                <div className="avatar-circle guest-avatar">
                  {getInitials(displayName)}
                </div>
                <div className="user-info-text">
                  <span className="user-name-display">{displayName}</span>
                  <span className="user-level-badge">{displayLevel}</span>
                </div>
              </button>

              <button
                type="button"
                className="btn btn-sm btn-outline-primary nav-signin-btn"
                onClick={() => handleNavClick("auth")}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
