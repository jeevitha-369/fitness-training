import { useState, useMemo } from "react";
import {
  DIET_PLANS,
  DIET_DISCLAIMER,
  PORTION_GUIDE_MEASURES,
  VEG_PROTEIN_ALTERNATIVES,
  GROCERY_PANTRY_LIST,
} from "../data/dietData";
import WaterTracker from "../components/WaterTracker";

export default function DietPlan({
  activeLevel = "Beginner",
  dietaryPreference = "veg",
  onSelectLevel,
  onDietPreferenceChange,
  onNavigate,
  showToast,
}) {
  const selectedLevel = activeLevel || "Beginner";
  const isVeg = dietaryPreference !== "nonveg";

  const handleDietToggle = (vegValue) => {
    if (onDietPreferenceChange) {
      onDietPreferenceChange(vegValue ? "veg" : "nonveg");
    }
  };

  // Date-based Meal Checklist persistence
  const getTodayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const todayKey = getTodayKey();
  const mealStorageKey = `fittrack_meals_${todayKey}_${selectedLevel}`;

  // Use a refresh trigger counter to update memoized meals from localStorage
  const [mealRefreshCount, setMealRefreshCount] = useState(0);

  const completedMeals = useMemo(() => {
    try {
      const saved = localStorage.getItem(mealStorageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mealStorageKey, mealRefreshCount]);

  // Save meal checklist to localStorage
  const handleToggleMeal = (mealId) => {
    try {
      const current = localStorage.getItem(mealStorageKey);
      const prev = current ? JSON.parse(current) : [];
      const updated = prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId];
      localStorage.setItem(mealStorageKey, JSON.stringify(updated));
      setMealRefreshCount((c) => c + 1);
      if (showToast) {
        showToast(updated.includes(mealId) ? "✓ Meal marked as completed!" : "Meal unchecked");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetMeals = () => {
    if (window.confirm("Reset today's meal checklist for this plan?")) {
      try {
        localStorage.removeItem(mealStorageKey);
        setMealRefreshCount((c) => c + 1);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Grocery pantry checklist
  const [groceryChecks, setGroceryChecks] = useState(() => {
    try {
      const saved = localStorage.getItem("fittrack_grocery_checks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleToggleGrocery = (itemKey) => {
    setGroceryChecks((prev) => {
      const updated = { ...prev, [itemKey]: !prev[itemKey] };
      try {
        localStorage.setItem("fittrack_grocery_checks", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Active Plan
  const plan = DIET_PLANS[selectedLevel] || DIET_PLANS.Beginner;
  const totalMeals = plan.meals.length;
  const completedCount = completedMeals.length;
  const progressPercent = Math.round((completedCount / totalMeals) * 100);

  // Active View Tab: 'meals' | 'portion' | 'protein' | 'grocery'
  const [activeTab, setActiveTab] = useState("meals");

  return (
    <div className="diet-page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <span className="page-overline">HOLISTIC NUTRITION &amp; NOURISHMENT</span>
          <h1 className="page-title">Balanced Indian Diet Plans</h1>
          <p className="page-subtitle">
            Balanced daily Indian meal plans and portion guidance for each fitness level.
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onNavigate && onNavigate("tracker")}
          >
            🎯 Open Exercise Tracker
          </button>
        </div>
      </div>

      {/* Medical / Wellness Advisory Banner */}
      <div className="diet-disclaimer-banner">
        <span className="disclaimer-icon">🩺</span>
        <div className="disclaimer-text">
          <strong>General Wellness:</strong> Wholesome lifestyle meal plans with common Indian foods. Not individualized medical advice.
        </div>
      </div>

      {/* Main Controls Card: Level Switcher & Veg/Non-Veg Toggle */}
      <div className="diet-control-bar">
        {/* Fitness Level Switcher */}
        <div className="diet-level-tabs">
          {["Beginner", "Intermediate", "Advanced"].map((lvl) => {
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                type="button"
                className={`diet-level-btn ${isSelected ? "active" : ""}`}
                onClick={() => {
                  if (onSelectLevel) onSelectLevel(lvl);
                }}
              >
                <span className="diet-lvl-icon">
                  {lvl === "Beginner" ? "🌱" : lvl === "Intermediate" ? "⚡" : "🔥"}
                </span>
                <span className="diet-lvl-name">{lvl} Plan</span>
                {isSelected && <span className="active-pill-dot">● Active</span>}
              </button>
            );
          })}
        </div>

        {/* Veg vs Non-Veg Toggle Switch */}
        <div className="diet-preference-selector">
          <span className="pref-label">Food Preference:</span>
          <div className="pref-btn-group">
            <button
              type="button"
              className={`pref-btn veg ${isVeg ? "selected" : ""}`}
              onClick={() => handleDietToggle(true)}
            >
              <span className="food-dot veg-dot"></span>
              Vegetarian
            </button>
            <button
              type="button"
              className={`pref-btn nonveg ${!isVeg ? "selected" : ""}`}
              onClick={() => handleDietToggle(false)}
            >
              <span className="food-dot nonveg-dot"></span>
              Non-Vegetarian
            </button>
          </div>
        </div>
      </div>

      {/* Plan Header Info Card */}
      <div className="diet-plan-overview-card">
        <div className="overview-header-row">
          <div>
            <span className="overview-badge">
              {plan.level.toUpperCase()} ROUTINE • {isVeg ? "VEGETARIAN" : "NON-VEGETARIAN"}
            </span>
            <h2 className="overview-title">{plan.title}</h2>
            <p className="overview-tagline">{plan.tagline}</p>
          </div>

          <div className="overview-metrics-box">
            <div className="overview-metric">
              <span className="om-label">REFERENCE CALORIES</span>
              <strong className="om-val">{plan.targetCalorieRange}</strong>
            </div>
            <div className="overview-metric">
              <span className="om-label">HYDRATION TARGET</span>
              <strong className="om-val">{plan.hydrationTarget}</strong>
            </div>
          </div>
        </div>

        <div className="overview-focus-callout">
          <strong>Program Nutrition Focus:</strong> {plan.focus}
        </div>

        {/* Daily Meal Checklist Progress Bar */}
        <div className="meal-checklist-progress-bar-wrap">
          <div className="progress-labels-row">
            <span className="checklist-title">
              📋 Today&apos;s Meal Checklist Progress ({completedCount} of {totalMeals} Meals Logged)
            </span>
            <span className="checklist-pct">{progressPercent}% Completed</span>
          </div>
          <div className="stat-progress-bar">
            <div
              className="stat-progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          {completedCount > 0 && (
            <div className="checklist-reset-row">
              <span className="checklist-hint">
                ✓ Recorded for {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </span>
              <button
                type="button"
                className="checklist-reset-btn"
                onClick={handleResetMeals}
              >
                Reset Checklist
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="diet-subtabs-nav">
        <button
          type="button"
          className={`diet-subtab-btn ${activeTab === "meals" ? "active" : ""}`}
          onClick={() => setActiveTab("meals")}
        >
          🍽️ Daily Meals ({totalMeals})
        </button>
        <button
          type="button"
          className={`diet-subtab-btn ${activeTab === "portion" ? "active" : ""}`}
          onClick={() => setActiveTab("portion")}
        >
          🥣 Portion Measures Guide
        </button>
        <button
          type="button"
          className={`diet-subtab-btn ${activeTab === "protein" ? "active" : ""}`}
          onClick={() => setActiveTab("protein")}
        >
          💪 Indian Protein Alternatives
        </button>
        <button
          type="button"
          className={`diet-subtab-btn ${activeTab === "grocery" ? "active" : ""}`}
          onClick={() => setActiveTab("grocery")}
        >
          🛒 Grocery &amp; Pantry Checklist
        </button>
      </div>

      {/* TAB 1: DAILY MEALS */}
      {activeTab === "meals" && (
        <div className="diet-meals-layout">
          <div className="meals-list-column">
            {plan.meals.map((meal, index) => {
              const option = isVeg ? meal.vegOption : meal.nonVegOption;
              const isDone = completedMeals.includes(meal.id);

              return (
                <div
                  key={meal.id}
                  className={`meal-card ${isDone ? "meal-completed" : ""}`}
                >
                  <div className="meal-card-header">
                    <div className="meal-timing-wrap">
                      <span className="meal-num-badge">#{index + 1}</span>
                      <div>
                        <span className="meal-timing">⏰ {meal.timing}</span>
                        <h3 className="meal-name">{meal.name}</h3>
                      </div>
                    </div>

                    <div className="meal-status-wrap">
                      <span className={`meal-food-badge ${isVeg ? "veg-badge" : "nonveg-badge"}`}>
                        <span className={`food-dot ${isVeg ? "veg-dot" : "nonveg-dot"}`}></span>
                        {isVeg ? "Vegetarian" : "Non-Veg"}
                      </span>
                      <button
                        type="button"
                        className={`meal-check-btn ${isDone ? "checked" : ""}`}
                        onClick={() => handleToggleMeal(meal.id)}
                        aria-label={`Mark ${meal.name} as ${isDone ? "incomplete" : "completed"}`}
                      >
                        {isDone ? "✓ Completed" : "Mark as Eaten"}
                      </button>
                    </div>
                  </div>

                  <div className="meal-content">
                    <h4 className="meal-recipe-title">{option.title}</h4>
                    <p className="meal-recipe-desc">{option.description}</p>

                    <div className="meal-meta-grid">
                      <div className="meal-meta-box">
                        <span className="meta-box-label">PORTION</span>
                        <p className="meta-box-value">{option.portion}</p>
                      </div>

                      <div className="meal-meta-box">
                        <span className="meta-box-label">ALTERNATIVE</span>
                        <p className="meta-box-value">{option.proteinAlternative}</p>
                      </div>
                    </div>

                    <div className="meal-macros-strip">
                      <span className="macros-tag">NUTRITION:</span>
                      <span className="macros-val">{option.macros}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Embedded Water Tracker & Hydration Guide */}
          <div className="diet-sidebar-column">
            <WaterTracker />

            <div className="diet-sidebar-card hydration-tips-card">
              <div className="tips-card-header">
                <span className="tips-badge">HYDRATION ADVISORY</span>
                <h4 className="tips-title">Hydration &amp; Meal Timing Rules</h4>
              </div>
              <ul className="tips-bullets-list">
                <li>
                  <strong>Drink 1-2 glasses of warm water</strong> shortly after waking to activate metabolism.
                </li>
                <li>
                  <strong>Pause 30 mins before &amp; after meals:</strong> Avoid drinking large amounts of water immediately during meals to maintain digestive gastric strength.
                </li>
                <li>
                  <strong>Electrolyte Balance:</strong> Sip on fresh coconut water or spiced chaas (buttermilk) during sweaty workout days.
                </li>
                <li>
                  <strong>Whole Foods First:</strong> Favor home-cooked lentils, whole grains, and local seasonal greens over packaged bars.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PORTION MEASURES GUIDE */}
      {activeTab === "portion" && (
        <div className="portion-guide-section">
          <div className="section-intro">
            <h3 className="section-heading">Familiar Household &amp; Hand Portion Measures</h3>
            <p className="section-subtext">
              Use standard Indian katoris, cups, and hand guidelines as simple everyday portion references.
            </p>
          </div>

          <div className="portion-cards-grid">
            {PORTION_GUIDE_MEASURES.map((p, idx) => (
              <div key={idx} className="portion-card">
                <div className="portion-card-top">
                  <span className="portion-icon">{p.icon}</span>
                  <div>
                    <h4 className="portion-name">{p.measure}</h4>
                    <span className="portion-equiv">{p.equivalent}</span>
                  </div>
                </div>
                <div className="portion-examples">
                  <strong>Typical Foods:</strong> {p.examples}
                </div>
              </div>
            ))}
          </div>

          <div className="hand-guide-infobox">
            <h4>🖐️ Quick Hand Measurement Rule of Thumb:</h4>
            <div className="hand-rules-grid">
              <div className="hand-rule">
                <strong>Palm (Thickness &amp; Area)</strong>
                <span>= 1 Serving of Protein (Paneer, Tofu, Chicken Breast)</span>
              </div>
              <div className="hand-rule">
                <strong>Closed Fist</strong>
                <span>= 1 Serving of Vegetables &amp; Fruit (Carrots, Cucumbers, Greens)</span>
              </div>
              <div className="hand-rule">
                <strong>Cupped Hand</strong>
                <span>= 1 Serving of Complex Carbs (Rice, Oats, Poha)</span>
              </div>
              <div className="hand-rule">
                <strong>Thumb</strong>
                <span>= 1 Serving of Healthy Fats (Ghee, Mustard Oil, Peanut Butter)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INDIAN VEGETARIAN PROTEIN ALTERNATIVES */}
      {activeTab === "protein" && (
        <div className="protein-guide-section">
          <div className="section-intro">
            <h3 className="section-heading">High-Quality, Affordable Indian Vegetarian Protein Sources</h3>
            <p className="section-subtext">
              Nutrient-dense, budget-friendly Indian protein sources to support your workouts.
            </p>
          </div>

          <div className="protein-cards-grid">
            {VEG_PROTEIN_ALTERNATIVES.map((item, idx) => (
              <div key={idx} className="protein-card">
                <div className="protein-card-header">
                  <span className="protein-dot">🌱</span>
                  <div>
                    <h4 className="protein-source-title">{item.source}</h4>
                    <span className="protein-yield-badge">{item.serving}</span>
                  </div>
                </div>
                <div className="protein-body">
                  <p>
                    <strong>Recommended Meal Pairing:</strong> {item.bestFor}
                  </p>
                  <div className="protein-budget-tip">
                    <span className="tip-label">💡 Budget &amp; Prep Tip:</span> {item.affordableTip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GROCERY & PANTRY CHECKLIST */}
      {activeTab === "grocery" && (
        <div className="grocery-section">
          <div className="section-intro">
            <h3 className="section-heading">Weekly Shopping &amp; Pantry Essentials Checklist</h3>
            <p className="section-subtext">
              Essential pantry staples to support your weekly fitness and meal plans.
            </p>
          </div>

          <div className="grocery-grid">
            {GROCERY_PANTRY_LIST.map((cat, catIdx) => (
              <div key={catIdx} className="grocery-category-card">
                <h4 className="grocery-cat-title">{cat.category}</h4>
                <div className="grocery-checklist">
                  {cat.items.map((item, itemIdx) => {
                    const itemKey = `item_${catIdx}_${itemIdx}`;
                    const isChecked = !!groceryChecks[itemKey];
                    return (
                      <label
                        key={itemKey}
                        className={`grocery-item-row ${isChecked ? "checked" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleGrocery(itemKey)}
                          className="grocery-checkbox"
                        />
                        <span className="grocery-item-text">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Medical Disclaimer (Expandable) */}
      <div className="diet-page-footer">
        <details className="diet-medical-details">
          <summary className="diet-medical-summary">
            ⚠️ <strong>Medical &amp; Nutrition Advisory</strong> (Click to read details)
          </summary>
          <p className="footer-disclaimer-text">
            {DIET_DISCLAIMER}
          </p>
        </details>
      </div>
    </div>
  );
}
