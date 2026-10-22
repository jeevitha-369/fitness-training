import { useState } from "react";

export default function Navbar({
  activePage,
  onNavigate,
  profileName,
  fitnessLevel,
  historyCount = 0,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "workouts", label: "Workout Plans", icon: "📋" },
    { id: "tracker", label: "Exercise Tracker", icon: "🎯" },
    { id: "exerciseGuide", label: "Workout Guide", icon: "🎥" },
    { id: "progress", label: "Progress", icon: "📈" },
    { id: "history", label: "Workout History", icon: "⏱️" },
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

        {/* Desktop Navigation */}
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
              </button>
            );
          })}
        </nav>

        {/* User Status / Quick Chip */}
        <div className="navbar-right">
          <button
            type="button"
            className="user-profile-chip"
            onClick={() => handleNavClick("profile")}
            title="Open Profile Settings"
          >
            <div className="avatar-circle">
              {getInitials(profileName)}
            </div>
            <div className="user-info-text">
              <span className="user-name-display">{profileName || "Jeevi D"}</span>
              <span className="user-level-badge">{fitnessLevel || "Beginner"}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
