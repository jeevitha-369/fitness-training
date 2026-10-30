/**
 * FitTrack Pro - Level-Specific Indian Diet Plans & Nutrition Guides
 * 
 * General Wellness Suggestions:
 * These plans provide balanced lifestyle inspiration using affordable,
 * widely available Indian ingredients. They do not constitute individualized medical
 * nutrition therapy, strict caloric deficits, or clinical prescriptions.
 */

export const DIET_DISCLAIMER =
  "Notice: These meal plans are general lifestyle and wellness suggestions designed to accompany physical activity with affordable, wholesome Indian foods. They are not medical nutrition advice or clinical weight-loss prescriptions. Please consult a qualified physician or registered dietitian for specific dietary requirements or health conditions.";

export const PORTION_GUIDE_MEASURES = [
  {
    measure: "1 Katori / Medium Bowl",
    equivalent: "~150 ml / 150g",
    examples: "Dal, cooked sabzi, curd, raita, sambar, cooked brown rice",
    icon: "🥣",
  },
  {
    measure: "1 Standard Cup",
    equivalent: "~200-240 ml",
    examples: "Milk, chaas (buttermilk), oats porridge, green tea",
    icon: "☕",
  },
  {
    measure: "1 Roti / Chapati",
    equivalent: "~30-35g whole wheat",
    examples: "Phulka made without heavy oil, bajra or jowar roti",
    icon: "🫓",
  },
  {
    measure: "Palm-Sized Portion",
    equivalent: "~100-120g",
    examples: "Low-fat paneer, grilled chicken breast, pressed tofu, fish fillet",
    icon: "✋",
  },
  {
    measure: "Fist-Sized Portion",
    equivalent: "~1 cup raw volume",
    examples: "Fresh green salad, steamed vegetables, chopped fruit",
    icon: "✊",
  },
  {
    measure: "Thumb-Sized Portion",
    equivalent: "~1 tablespoon (15g)",
    examples: "Ghee, cold-pressed mustard/peanut oil, mixed seeds, peanut butter",
    icon: "👍",
  },
];

export const VEG_PROTEIN_ALTERNATIVES = [
  {
    source: "Low-Fat Paneer / Cottage Cheese",
    serving: "100g (~18g protein)",
    bestFor: "Lunch, dinner curries, dry stir-fry with peppers",
    affordableTip: "Prepare at home using toned milk and lemon juice for fresh, cost-effective paneer.",
  },
  {
    source: "Soya Chunks / Nutrela",
    serving: "40g raw (~21g protein)",
    bestFor: "Pulao, curries, dry bhurji, evening snack wraps",
    affordableTip: "One of the most budget-friendly, protein-dense vegetarian foods available across India.",
  },
  {
    source: "Sprouted Moong / Kala Chana",
    serving: "1 katori cooked (~9-12g protein)",
    bestFor: "Mid-morning snack, salads, breakfast chaat with lemon & cucumber",
    affordableTip: "Sprouting at home triples enzyme content and improves bio-availability.",
  },
  {
    source: "Dals & Legumes (Toor, Moong, Masoor, Rajma, Chole)",
    serving: "1 large katori (~8-10g protein)",
    bestFor: "Paired with rotis or rice for a complete amino acid profile",
    affordableTip: "Combine two dal varieties or pair with whole grains for optimal nutrition.",
  },
  {
    source: "Curd / Fresh Dahi / Greek Yogurt",
    serving: "1 cup / 200g (~8-10g protein)",
    bestFor: "Accompaniment to meals, raita, morning smoothie, chaas",
    affordableTip: "Homemade curd provides natural gut-healthy probiotics and calcium.",
  },
  {
    source: "Roasted Chana / Sattu",
    serving: "40g (~9g protein)",
    bestFor: "Evening snack, sattu sharbat with cumin & lemon",
    affordableTip: "Traditional, minimally processed, low GI superfood with zero prep needed.",
  },
];

export const GROCERY_PANTRY_LIST = [
  {
    category: "Grains & Complex Carbs",
    items: [
      "Whole wheat atta (Chakki fresh)",
      "Rolled oats or steel-cut oats",
      "Brown rice or unpolished parboiled rice",
      "Poha (flattened rice) / Suji / Dalia",
      "Millets (Bajra, Jowar, or Ragi flour)",
    ],
  },
  {
    category: "Protein Essentials",
    items: [
      "Toor dal, Yellow moong dal, Green moong",
      "Kala chana (black chickpeas) & Kabuli chana",
      "Soya chunks / nuggets",
      "Fresh milk (toned/cow's milk) for homemade paneer/curd",
      "Eggs (free-range or standard brown/white eggs)",
      "Chicken breast / Fresh freshwater fish (for non-veg)",
    ],
  },
  {
    category: "Vegetables & Greens",
    items: [
      "Spinach (Palak), Methi, or seasonal greens",
      "Cucumbers, Tomatoes, Carrots (for daily salads)",
      "Bell peppers (Capsicum), Lauki (Bottle gourd), Bhindi",
      "Onions, Ginger, Garlic, Green chillies",
    ],
  },
  {
    category: "Fruits & Healthy Fats",
    items: [
      "Bananas, Apples, Papaya, Seasonal fruits (Guava/Oranges)",
      "Raw peanuts / Almonds / Walnuts",
      "Flaxseeds or Chia seeds",
      "Cold-pressed mustard oil, sesame oil, or pure Desi Ghee (in moderation)",
      "Roasted chana (Bengal gram)",
    ],
  },
];

export const DIET_PLANS = {
  Beginner: {
    level: "Beginner",
    title: "Foundational Balance Routine",
    tagline: "Gentle, balanced nutrition to cultivate consistent daily energy and habits.",
    targetCalorieRange: "~1,700 - 1,950 kcal (General Reference)",
    hydrationTarget: "2.0 - 2.5 Liters daily (8-10 glasses)",
    focus: "Digestibility, wholesome whole grains, steady hydration, sustainable habit formation without drastic restriction.",
    meals: [
      {
        id: "b-breakfast",
        timing: "7:30 AM – 8:30 AM",
        name: "Wholesome Morning Starter",
        vegOption: {
          title: "Vegetable Oats Upma OR Vegetable Poha with Sprouted Moong",
          description: "Cooked with diced carrots, green peas, curry leaves, and a sprinkle of roasted peanuts.",
          portion: "1.5 medium katoris (approx. 200g) + 1 glass lukewarm lemon water or green tea",
          proteinAlternative: "Add 2 tbsp boiled sprouts or 30g paneer cubes for added protein.",
          macros: "~320 kcal • 9g Protein • 52g Carbs • 8g Fat",
        },
        nonVegOption: {
          title: "2 Boiled Whole Eggs + 2 Slices Whole Grain Toast with Mint Chutney",
          description: "Simple boiled or lightly scrambled eggs seasoned with black pepper, turmeric, and fresh coriander.",
          portion: "2 eggs + 2 slices brown/multigrain bread + sliced tomato & cucumber",
          proteinAlternative: "Vegetarian equivalent: 100g fresh paneer bhurji with whole grain toast.",
          macros: "~340 kcal • 16g Protein • 32g Carbs • 14g Fat",
        },
      },
      {
        id: "b-midmorning",
        timing: "10:30 AM – 11:30 AM",
        name: "Mid-Morning Fresh Energy",
        vegOption: {
          title: "Seasonal Fresh Fruit + Handful of Soaked Almonds",
          description: "One medium apple, 1 banana, or 1 cup papaya cubes paired with 5-6 overnight soaked almonds and 2 walnut halves.",
          portion: "1 medium fruit (~150g) + 6 soaked almonds",
          proteinAlternative: "Substitute nuts with 2 tablespoons roasted chana (Bengal gram).",
          macros: "~160 kcal • 4g Protein • 24g Carbs • 6g Fat",
        },
        nonVegOption: {
          title: "Seasonal Fresh Fruit + Handful of Soaked Almonds",
          description: "Fresh seasonal fruit (apple, orange, or papaya) accompanied by 5 soaked almonds.",
          portion: "1 fruit + 5 almonds + 1 glass of fresh water",
          proteinAlternative: "N/A - Wholesome whole food fruit snack.",
          macros: "~160 kcal • 4g Protein • 24g Carbs • 6g Fat",
        },
      },
      {
        id: "b-lunch",
        timing: "1:00 PM – 2:00 PM",
        name: "Nourishing Thali Meal",
        vegOption: {
          title: "Whole Wheat Rotis + Thick Yellow Moong Dal + Mixed Vegetable Sabzi + Fresh Dahi",
          description: "Balanced home-cooked thali with light ghee on rotis, steamed seasonal greens, and homemade probiotic curd.",
          portion: "2 medium phulkas + 1 katori dal (150ml) + 1 katori sabzi + 1 katori fresh curd (100g) + cucumber salad",
          proteinAlternative: "Swap moong dal with Rajma or Chole 2-3 times a week for variety.",
          macros: "~510 kcal • 18g Protein • 75g Carbs • 12g Fat",
        },
        nonVegOption: {
          title: "Homestyle Chicken Curry (or Fish Curry) + 2 Rotis + Steamed Rice + Green Salad",
          description: "Cooked in minimal oil with onion, tomato, garlic, and turmeric gravy, paired with whole wheat roti.",
          portion: "100g lean chicken breast or fish fillet + 2 rotis (or 1 roti + half katori rice) + crunchy cucumber salad",
          proteinAlternative: "Vegetarian equivalent: 100g Paneer/Tofu Tikka with dal and rotis.",
          macros: "~530 kcal • 32g Protein • 62g Carbs • 14g Fat",
        },
      },
      {
        id: "b-eveningsnack",
        timing: "5:00 PM – 5:30 PM",
        name: "Pre-Evening Recharge",
        vegOption: {
          title: "Spiced Buttermilk (Chaas) + Roasted Makhana or Roasted Chana",
          description: "Refreshing churned curd with roasted cumin (jeera), mint, and pink salt, with crunchy roasted lotus seeds.",
          portion: "1 tall glass chaas (250ml) + 1 small bowl roasted makhana/chana (30g)",
          proteinAlternative: "Add 1 tablespoon roasted flaxseed powder to the chaas.",
          macros: "~140 kcal • 6g Protein • 18g Carbs • 4g Fat",
        },
        nonVegOption: {
          title: "Boiled Egg Whites (2) with Chaat Masala OR Spiced Chaas with Roasted Chana",
          description: "Quick, clean evening fuel paired with hydration.",
          portion: "2 egg whites with pepper + green tea OR 1 glass chaas with 30g roasted chana",
          proteinAlternative: "Vegetarian equivalent: 1 small cup sprouted kala chana chaat.",
          macros: "~130 kcal • 10g Protein • 12g Carbs • 2g Fat",
        },
      },
      {
        id: "b-dinner",
        timing: "7:45 PM – 8:45 PM",
        name: "Light & Restorative Dinner",
        vegOption: {
          title: "Moong Dal Khichdi with Vegetables OR 2 Rotis with Lauki/Tinda Sabzi & Curd",
          description: "Comforting, easy-to-digest khichdi with ghee tempering or light vegetable curry with whole wheat rotis.",
          portion: "1.5 katori vegetable dal khichdi + 1 katori dahi + roasted papad (optional)",
          proteinAlternative: "Top khichdi with 40g crushed paneer or 2 tablespoons boiled soya granules.",
          macros: "~420 kcal • 14g Protein • 66g Carbs • 9g Fat",
        },
        nonVegOption: {
          title: "Light Grilled Fish / Chicken Breast with Steamed Veggies & 1 Roti",
          description: "Pan-seared chicken or freshwater fish seasoned with ginger, lemon juice, black pepper, and turmeric.",
          portion: "120g fish or chicken + 1 whole wheat roti + 1 bowl steamed beans & carrots",
          proteinAlternative: "Vegetarian equivalent: 120g grilled paneer with sautéed vegetables.",
          macros: "~440 kcal • 30g Protein • 38g Carbs • 11g Fat",
        },
      },
    ],
  },

  Intermediate: {
    level: "Intermediate",
    title: "Active Performance & Recovery Plan",
    tagline: "High-nutrient fuel engineered to support daily calisthenics, core progression, and lean muscle repair.",
    targetCalorieRange: "~2,050 - 2,350 kcal (General Reference)",
    hydrationTarget: "2.8 - 3.2 Liters daily (11-13 glasses)",
    focus: "Optimal protein distribution, sustained glycogen replenishment, electrolyte preservation, and muscle repair.",
    meals: [
      {
        id: "i-breakfast",
        timing: "7:00 AM – 8:00 AM",
        name: "High-Protein Energy Kickoff",
        vegOption: {
          title: "Paneer & Besan Chilla (2) with Mint Coriander Chutney + Warm Chia Water",
          description: "Wholesome gram flour pancakes stuffed with 50g grated low-fat paneer, chopped onions, and spinach.",
          portion: "2 medium chillas + 2 tbsp mint chutney + 1 cup warm milk or soaked chia water",
          proteinAlternative: "Use crumbled organic tofu or soaked sattu batter for variety.",
          macros: "~420 kcal • 20g Protein • 44g Carbs • 16g Fat",
        },
        nonVegOption: {
          title: "3 Egg Omelette (1 Whole + 2 Whites) with Sautéed Veggies & 2 Multigrain Toasts",
          description: "Fluffy omelette cooked with bell peppers, mushrooms, and onions, lightly brushed with pure ghee.",
          portion: "3 eggs omelette + 2 slices multigrain bread + 1 sliced orange",
          proteinAlternative: "Vegetarian equivalent: 100g Paneer bhurji with 2 multigrain rotis.",
          macros: "~440 kcal • 26g Protein • 36g Carbs • 16g Fat",
        },
      },
      {
        id: "i-midmorning",
        timing: "10:30 AM – 11:15 AM",
        name: "Electrolyte & Muscle Feed",
        vegOption: {
          title: "Fresh Tender Coconut Water + Sprouted Kala Chana Salad",
          description: "Natural hydration packed with potassium, paired with steamed sprouted black chickpeas tossed with lemon and chaat masala.",
          portion: "1 fresh coconut water (250ml) + 1 katori sprouted chana chaat (~100g)",
          proteinAlternative: "Sprinkle 1 tbsp roasted pumpkin seeds or hemp hearts on top.",
          macros: "~210 kcal • 9g Protein • 34g Carbs • 3g Fat",
        },
        nonVegOption: {
          title: "Fresh Tender Coconut Water + 2 Boiled Eggs with Rock Salt",
          description: "Quick electrolyte balance combined with complete bioavailable egg protein.",
          portion: "1 coconut water + 2 boiled eggs sprinkled with black pepper & cumin",
          proteinAlternative: "Vegetarian equivalent: 1 katori sprouted moong chaat with coconut slices.",
          macros: "~230 kcal • 14g Protein • 16g Carbs • 10g Fat",
        },
      },
      {
        id: "i-lunch",
        timing: "1:00 PM – 2:00 PM",
        name: "Power Fuel Thali",
        vegOption: {
          title: "2 Multigrain Rotis + 1 Katori Rajma/Chole + 50g Soya Chunks Curry + Cucumber Salad",
          description: "Dual-source plant protein combining slow-digesting kidney beans and ultra-rich soya chunks.",
          portion: "2 rotis + 1 katori thick rajma curry + 1 small bowl soya chunks sabzi + green salad",
          proteinAlternative: "Substitute soya chunks with 70g grilled low-fat paneer or tofu.",
          macros: "~590 kcal • 32g Protein • 84g Carbs • 12g Fat",
        },
        nonVegOption: {
          title: "Grilled Chicken Breast (150g) OR Fish Masala + Brown Rice + Dal Tadka + Salad",
          description: "Tender chicken cooked with Indian aromatic spices, served with wholesome brown rice and yellow lentils.",
          portion: "150g chicken breast + 1 katori brown rice (150g cooked) + 1 katori dal + raw onion & lime salad",
          proteinAlternative: "Vegetarian equivalent: 150g Paneer/Soy steak with brown rice and dal.",
          macros: "~620 kcal • 42g Protein • 70g Carbs • 14g Fat",
        },
      },
      {
        id: "i-eveningsnack",
        timing: "5:00 PM – 5:45 PM",
        name: "Pre-Workout Primer / Sustained Recovery",
        vegOption: {
          title: "Roasted Sattu Drink (or Peanut Butter Toast) + 1 Banana",
          description: "Traditional Bihari sattu beverage mixed with water, roasted jeera, and lemon juice — instant natural energy.",
          portion: "2 tbsp sattu in 300ml water + 1 medium ripe banana (eaten 45 mins before training)",
          proteinAlternative: "Alternatively: 1 slice whole wheat bread with 1 tbsp natural peanut butter.",
          macros: "~240 kcal • 9g Protein • 44g Carbs • 4g Fat",
        },
        nonVegOption: {
          title: "1 Banana + 2 Boiled Egg Whites OR Whey/Sattu Protein Shake",
          description: "Easily assimilated pre-workout carbohydrates with clean amino acids for muscle preservation.",
          portion: "1 banana + 2 boiled egg whites with lemon juice & pinch of rock salt",
          proteinAlternative: "Vegetarian equivalent: 1 glass sattu sharbat with banana.",
          macros: "~210 kcal • 10g Protein • 34g Carbs • 2g Fat",
        },
      },
      {
        id: "i-dinner",
        timing: "8:00 PM – 8:45 PM",
        name: "Lean Muscle Repair Supper",
        vegOption: {
          title: "Paneer Bhurji (100g) + 2 Whole Wheat Phulkas + Palak Dal + Tomato Salad",
          description: "Sautéed paneer with onions, ginger, and tomatoes paired with iron-rich spinach dal for cellular recovery.",
          portion: "100g paneer bhurji + 2 rotis + 1 katori palak dal + lemon tossed salad",
          proteinAlternative: "Swap paneer with soya bean bhurji or crumbled organic tofu.",
          macros: "~520 kcal • 27g Protein • 56g Carbs • 18g Fat",
        },
        nonVegOption: {
          title: "Tandoori/Pan-Grilled Chicken (140g) + 2 Phulkas + Steamed Broccoli/Beans + Dahi",
          description: "Spiced with hung curd, ginger garlic paste, kashmiri chilli, and dry roasted in a skillet or oven.",
          portion: "140g grilled chicken + 2 phulkas (or 1 bowl quinoa) + sautéed veggies + 1/2 katori dahi",
          proteinAlternative: "Vegetarian equivalent: 140g grilled paneer and soya chunks skewers.",
          macros: "~540 kcal • 38g Protein • 48g Carbs • 16g Fat",
        },
      },
    ],
  },

  Advanced: {
    level: "Advanced",
    title: "Peak Energy & Athletic Reconstruction Plan",
    tagline: "Calibrated nutrition for demanding training schedules, explosive plyometrics, and rapid tissue recovery.",
    targetCalorieRange: "~2,400 - 2,750 kcal (General Reference)",
    hydrationTarget: "3.2 - 3.8 Liters daily (13-15 glasses)",
    focus: "Targeted post-workout glycogen reload, increased amino acid pool, anti-inflammatory spices (turmeric, ginger), and deep recovery.",
    meals: [
      {
        id: "a-breakfast",
        timing: "7:00 AM – 8:00 AM",
        name: "Champion Morning Fuel Engine",
        vegOption: {
          title: "Super Oats Bowl with Crushed Nuts, Seeds, Paneer OR Soya Protein Oats",
          description: "Rolled oats cooked with milk, topped with banana slices, 10 almonds, chia seeds, and 50g fresh soft paneer cubes.",
          portion: "1.5 cups cooked oatmeal + 200ml milk + 1 sliced banana + 15g seeds/nuts + 50g paneer",
          proteinAlternative: "Mix in 30g natural sattu powder or unflavored plant protein into the warm oats.",
          macros: "~560 kcal • 28g Protein • 76g Carbs • 18g Fat",
        },
        nonVegOption: {
          title: "4 Eggs (2 Whole + 2 Whites) Scrambled + 2 Multigrain Rotis + 1 Glass Fresh Milk",
          description: "Hearty protein breakfast with turmeric, black pepper, and baby spinach folded into farm-fresh eggs.",
          portion: "4 eggs scrambled + 2 whole wheat rotis lightly crisped + 200ml milk + 1 fruit",
          proteinAlternative: "Vegetarian equivalent: 130g Paneer/Tofu scramble with 2 multigrain rotis.",
          macros: "~580 kcal • 36g Protein • 52g Carbs • 22g Fat",
        },
      },
      {
        id: "a-midmorning",
        timing: "10:30 AM – 11:15 AM",
        name: "Cellular Recovery & Micronutrients",
        vegOption: {
          title: "Sprouted Moong & Kala Chana Chaat + Handful of Walnuts & Raisins",
          description: "Dual sprout powerhouse tossed with diced tomatoes, onions, pomegranate seeds, coriander, and fresh lime.",
          portion: "1.5 katoris mixed sprouts (150g) + 4 walnut halves + 10 raisins",
          proteinAlternative: "Add 30g boiled soya chunks or paneer cubes to the chaat bowl.",
          macros: "~280 kcal • 14g Protein • 44g Carbs • 6g Fat",
        },
        nonVegOption: {
          title: "Sprout Chaat with 3 Boiled Egg Whites OR 80g Steamed Chicken Salad",
          description: "High bio-availability protein paired with live enzymes and vitamin C.",
          portion: "1 katori sprouts + 3 boiled egg whites seasoned with chaat masala and lemon",
          proteinAlternative: "Vegetarian equivalent: 1 katori sprout chaat with 40g roasted paneer cubes.",
          macros: "~260 kcal • 20g Protein • 32g Carbs • 4g Fat",
        },
      },
      {
        id: "a-lunch",
        timing: "1:00 PM – 2:00 PM",
        name: "Athletic Reconstruction Thali",
        vegOption: {
          title: "3 Multigrain Rotis + Rich Soya Chunks Curry (60g raw) + Dal Makhani/Chole + Raita",
          description: "Abundant plant protein delivering full spectrum amino acids for advanced athletic rebuilding.",
          portion: "3 rotis + 1 large bowl soya curry (60g soya chunks) + 1 katori dal + 1 katori vegetable raita",
          proteinAlternative: "Pair soya chunks with 60g low-fat paneer for complementary taste.",
          macros: "~690 kcal • 42g Protein • 92g Carbs • 16g Fat",
        },
        nonVegOption: {
          title: "Chicken Breast / Mutton Keema (Lean, 180g) + 2 Rotis + 1 Cup Steamed Rice + Dal",
          description: "High-protein athlete portion cooked with traditional Indian whole spices without heavy cream or excess butter.",
          portion: "180g cooked chicken or fish + 2 rotis + 1 katori rice + 1 katori dal + fresh salad",
          proteinAlternative: "Vegetarian equivalent: 180g Paneer & Soya Tikka platter with rotis and dal.",
          macros: "~720 kcal • 54g Protein • 78g Carbs • 18g Fat",
        },
      },
      {
        id: "a-eveningsnack",
        timing: "4:45 PM – 5:30 PM",
        name: "Explosive Pre/Post Performance Fuel",
        vegOption: {
          title: "Peanut Butter Banana Toast (2 Slices) + Roasted Chana + Green Tea",
          description: "Complex slow-burning carbohydrates and potassium to protect against cramps and fatigue.",
          portion: "2 whole wheat toasts + 2 tbsp pure peanut butter + 1 sliced banana + 30g roasted chana",
          proteinAlternative: "Drink 1 glass of homemade sattu sharbat with jaggery or pink salt.",
          macros: "~360 kcal • 14g Protein • 52g Carbs • 12g Fat",
        },
        nonVegOption: {
          title: "3 Boiled Eggs (1 Whole + 2 Whites) + 1 Banana + Handful of Almonds",
          description: "Clean, natural pre-workout fuel offering rapid absorption and steady blood glucose.",
          portion: "3 eggs + 1 ripe banana + 8-10 raw almonds + 1 glass water",
          proteinAlternative: "Vegetarian equivalent: 2 peanut butter banana sandwiches + chaas.",
          macros: "~320 kcal • 18g Protein • 34g Carbs • 12g Fat",
        },
      },
      {
        id: "a-dinner",
        timing: "8:00 PM – 9:00 PM",
        name: "Deep Overnight Tissue Rejuvenation",
        vegOption: {
          title: "Grilled Paneer & Tofu Steak (130g total) + 2 Phulkas + Sautéed Seasonal Greens + Haldi Doodh",
          description: "Golden milk with pure turmeric and black pepper before bed supports joint recovery and sound sleep.",
          portion: "130g paneer/tofu with ginger garlic marinade + 2 phulkas + sautéed palak & beans + 1 small cup turmeric milk",
          proteinAlternative: "Blend boiled kala chana paste with herbs for pan-grilled vegan patties.",
          macros: "~610 kcal • 34g Protein • 58g Carbs • 22g Fat",
        },
        nonVegOption: {
          title: "Grilled Fish Tikka or Chicken Breast (160g) + 2 Rotis + Dal + Green Salad + Haldi Doodh",
          description: "Omega-3 rich freshwater fish or lean chicken breast cooked on a griddle, served with anti-inflammatory turmeric milk.",
          portion: "160g fish or chicken + 2 phulkas + 1 katori yellow moong dal + salad + 1 small glass turmeric milk",
          proteinAlternative: "Vegetarian equivalent: 150g grilled spiced paneer and mushroom tikka with rotis.",
          macros: "~630 kcal • 48g Protein • 54g Carbs • 20g Fat",
        },
      },
    ],
  },
};
