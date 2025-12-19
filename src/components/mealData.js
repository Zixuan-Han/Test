// src/components/mealData.js

export const recommendedMealsData = [
  {
    id: '1',
    name: 'Porridge with Flaxseed & Blueberries',
    category: 'Salads',
    rating: 4.5,
    time: '10 mins',
    servings: '1 serving',
    difficulty: 'Easy',
    calories: 350,
    protein: 12,
    carbs: 55,
    fat: 8,
    fiber: 9,
    sodium: 80,
    estimatedTotalCost: 2.20,
    tags: ['Low GI', 'High Fiber', 'Heart-Healthy'],
    type: ['Breakfast'],
    ingredients: [
      { name: 'Rolled Oats', amount: '40g', cost: 0.40 },
      { name: 'Flaxseed', amount: '10g', cost: 0.15 },
      { name: 'Blueberries', amount: '75g', cost: 1.00 },
      { name: 'Honey', amount: '7g', cost: 0.05 },
      { name: 'Almond Milk', amount: '240g', cost: 0.60 }
    ],
    instructions: [
      'Warm the almond milk in a saucepan.',
      'Add oats and cook until thickened.',
      'Stir in flaxseed.',
      'Top with blueberries and honey.',
      'Serve warm.'
    ],
    warnings: [
      { type: 'Gluten', text: 'Oats may contain gluten traces.' },
      { type: 'Tree Nuts', text: 'Contains almond milk.' }
    ],
    healthBenefits:
      'Supports heart and digestive health through fiber and omega-3 fats.',
    allergens: 'Vegetarian. May contain gluten traces.'
  },

  {
    id: '2',
    name: 'Healthy Buddha Bowl',
    category: 'Middle Eastern',
    rating: 4.8,
    time: '20 mins',
    servings: '1 serving',
    difficulty: 'Medium',
    calories: 420,
    protein: 15,
    carbs: 50,
    fat: 18,
    fiber: 12,
    sodium: 180,
    estimatedTotalCost: 3.90,
    tags: ['High Fiber', 'Vitamin-Rich'],
    type: ['Lunch', 'Dinner'],
    ingredients: [
      { name: 'Quinoa', amount: '85g', cost: 0.70 },
      { name: 'Kale', amount: '70g', cost: 0.70 },
      { name: 'Avocado', amount: '75g', cost: 1.50 },
      { name: 'Chickpeas', amount: '120g', cost: 0.60 },
      { name: 'Tahini', amount: '30g', cost: 0.40 }
    ],
    instructions: [
      'Cook quinoa.',
      'Prepare vegetables.',
      'Assemble all ingredients in a bowl.',
      'Drizzle tahini and season lightly.'
    ],
    warnings: [{ type: 'Sesame', text: 'Contains tahini.' }],
    healthBenefits: 'Balanced plant-based meal with healthy fats and fiber.',
    allergens: 'Vegan. Contains sesame.'
  },

  {
    id: '3',
    name: 'Lentil & Root Vegetable Bowl',
    category: 'Middle Eastern',
    rating: 4.6,
    time: '30 mins',
    servings: '1 serving',
    difficulty: 'Medium',
    calories: 380,
    protein: 18,
    carbs: 60,
    fat: 6,
    fiber: 15,
    sodium: 200,
    estimatedTotalCost: 2.95,
    tags: ['High Fiber', 'Plant Protein'],
    type: ['Lunch', 'Dinner'],
    ingredients: [
      { name: 'Lentils', amount: '90g', cost: 0.80 },
      { name: 'Sweet Potato', amount: '180g', cost: 0.90 },
      { name: 'Carrots', amount: '140g', cost: 0.40 },
      { name: 'Spinach', amount: '60g', cost: 0.80 },
      { name: 'Cumin', amount: '2g', cost: 0.05 }
    ],
    instructions: [
      'Cook lentils until tender.',
      'Roast root vegetables.',
      'Wilt spinach.',
      'Combine and season.'
    ],
    warnings: [
      { type: 'High Fiber', text: 'High fiber meal.' }
    ],
    healthBenefits: 'Supports energy and digestion with plant protein and iron.',
    allergens: 'Vegan and gluten-free.'
  },

  {
    id: '4',
    name: 'Peach & Ricotta Toast',
    category: 'Italian',
    rating: 4.7,
    time: '10 mins',
    servings: '1 serving',
    difficulty: 'Easy',
    calories: 280,
    protein: 10,
    carbs: 40,
    fat: 12,
    fiber: 5,
    sodium: 220,
    estimatedTotalCost: 3.35,
    tags: ['Calcium-Rich', 'Light Meal'],
    type: ['Lunch', 'Dinner'],
    ingredients: [
      { name: 'Sourdough', amount: '80g', cost: 0.80 },
      { name: 'Ricotta Cheese', amount: '120g', cost: 1.20 },
      { name: 'Peaches', amount: '150g', cost: 1.20 },
      { name: 'Walnuts', amount: '8g', cost: 0.15 }
    ],
    instructions: [
      'Toast bread.',
      'Spread ricotta.',
      'Add peaches and walnuts.'
    ],
    warnings: [
      { type: 'Dairy', text: 'Contains ricotta.' },
      { type: 'Nuts', text: 'Contains walnuts.' },
      { type: 'Gluten', text: 'Contains wheat bread.' }
    ],
    healthBenefits: 'Calcium and antioxidants support bone and heart health.',
    allergens: 'Contains dairy, gluten, nuts.'
  },

  {
    id: '5',
    name: 'Omelette & Apple Toast',
    category: 'Italian',
    rating: 4.4,
    time: '12 mins',
    servings: '1 serving',
    difficulty: 'Easy',
    calories: 340,
    protein: 16,
    carbs: 32,
    fat: 14,
    fiber: 6,
    sodium: 260,
    estimatedTotalCost: 2.25,
    tags: ['High Protein', 'Energy Boost'],
    type: ['Breakfast'],
    ingredients: [
      { name: 'Eggs', amount: '100g', cost: 1.00 },
      { name: 'Whole Grain Bread', amount: '40g', cost: 0.40 },
      { name: 'Green Apple', amount: '160g', cost: 0.80 },
      { name: 'Cinnamon', amount: '1g', cost: 0.05 }
    ],
    instructions: [
      'Cook omelette.',
      'Toast bread.',
      'Slice apple and sprinkle cinnamon.'
    ],
    warnings: [
      { type: 'Eggs', text: 'Contains eggs.' },
      { type: 'Gluten', text: 'Contains wheat.' }
    ],
    healthBenefits: 'Protein-rich breakfast supporting muscle and energy.',
    allergens: 'Contains eggs and gluten.'
  }
];

export const allMealsData = [
  {
    id: '6',
    name: 'Shrimp Pad Thai',
    category: 'Thai',
    rating: 4.9,
    time: '25 mins',
    servings: '2 servings',
    difficulty: 'Medium',
    calories: 550,
    protein: 25,
    carbs: 70,
    fat: 18,
    fiber: 4,
    sodium: 650,
    estimatedTotalCost: 10.30,
    type: ['Lunch', 'Dinner'],
    ingredients: [
      { name: 'Rice Noodles', amount: '200g', cost: 1.50 },
      { name: 'Shrimp', amount: '150g', cost: 7.00 },
      { name: 'Peanuts', amount: '35g', cost: 0.40 },
      { name: 'Bean Sprouts', amount: '100g', cost: 0.80 },
      { name: 'Lime', amount: '60g', cost: 0.60 }
    ],
    instructions: [
      'Soak noodles.',
      'Cook shrimp.',
      'Stir-fry noodles and combine.',
      'Serve with peanuts and lime.'
    ],
    warnings: [
      { type: 'Shellfish', text: 'Contains shrimp.' },
      { type: 'Peanuts', text: 'Contains peanuts.' }
    ],
    healthBenefits: 'Lean protein and minerals support immune health.',
    allergens: 'Contains shellfish and peanuts.'
  },

  {
    id: '7',
    name: 'Tomato Pasta',
    category: 'Italian',
    rating: 4.2,
    time: '15 mins',
    servings: '2 servings',
    difficulty: 'Easy',
    calories: 410,
    protein: 12,
    carbs: 75,
    fat: 5,
    fiber: 7,
    sodium: 450,
    estimatedTotalCost: 3.55,
    type: ['Lunch', 'Dinner'],
    ingredients: [
      { name: 'Whole Wheat Pasta', amount: '200g', cost: 1.20 },
      { name: 'Tomato Sauce', amount: '240g', cost: 1.50 },
      { name: 'Basil', amount: '10g', cost: 0.50 },
      { name: 'Garlic', amount: '6g', cost: 0.10 },
      { name: 'Olive Oil', amount: '14g', cost: 0.25 }
    ],
    instructions: [
      'Boil pasta.',
      'Prepare sauce.',
      'Combine and serve.'
    ],
    warnings: [{ type: 'Gluten', text: 'Contains wheat pasta.' }],
    healthBenefits: 'Tomatoes provide antioxidants supporting heart health.',
    allergens: 'Contains gluten.'
  },

  {
    id: '8',
    name: 'Tuna Salad',
    category: 'Salads',
    rating: 4.3,
    time: '10 mins',
    servings: '1 serving',
    difficulty: 'Easy',
    calories: 320,
    protein: 35,
    carbs: 8,
    fat: 14,
    fiber: 3,
    sodium: 380,
    estimatedTotalCost: 3.70,
    type: ['Lunch', 'Dinner'],
    ingredients: [
      { name: 'Canned Tuna', amount: '95g', cost: 2.00 },
      { name: 'Lettuce', amount: '80g', cost: 0.80 },
      { name: 'Cucumber', amount: '150g', cost: 0.50 },
      { name: 'Lemon', amount: '30g', cost: 0.40 }
    ],
    instructions: [
      'Drain tuna.',
      'Chop vegetables.',
      'Mix and season.'
    ],
    warnings: [{ type: 'Fish', text: 'Contains tuna.' }],
    healthBenefits: 'High-protein meal rich in omega-3.',
    allergens: 'Contains fish.'
  },

  {
    id: '12',
    name: 'Avocado Toast with Egg',
    category: 'Salads',
    rating: 4.7,
    time: '12 mins',
    servings: '1 serving',
    difficulty: 'Easy',
    calories: 360,
    protein: 14,
    carbs: 28,
    fat: 22,
    fiber: 8,
    sodium: 360,
    estimatedTotalCost: 2.63,
    type: ['Breakfast'],
    ingredients: [
      { name: 'Avocado', amount: '75g', cost: 1.50 },
      { name: 'Egg', amount: '50g', cost: 0.50 },
      { name: 'Multigrain Bread', amount: '40g', cost: 0.60 },
      { name: 'Red Pepper Flakes', amount: '0.3g', cost: 0.03 }
    ],
    instructions: [
      'Toast bread.',
      'Spread avocado.',
      'Top with egg and pepper flakes.'
    ],
    warnings: [
      { type: 'Eggs', text: 'Contains egg.' },
      { type: 'Gluten', text: 'Contains wheat bread.' }
    ],
    healthBenefits: 'Healthy fats and protein support satiety.',
    allergens: 'Contains eggs and gluten.'
  },

  {
    id: '13',
    name: 'Stuffed Eggplant with Tomato Salad',
    category: 'Middle Eastern',
    rating: 4.5,
    time: '35 mins',
    servings: '2 servings',
    difficulty: 'Medium',
    calories: 280,
    protein: 9,
    carbs: 38,
    fat: 11,
    fiber: 10,
    sodium: 280,
    estimatedTotalCost: 4.90,
    type: ['Lunch', 'Dinner'],
    ingredients: [
      { name: 'Eggplant', amount: '350g', cost: 2.50 },
      { name: 'Tomatoes', amount: '240g', cost: 1.50 },
      { name: 'Onion', amount: '50g', cost: 0.20 },
      { name: 'Olive Oil', amount: '28g', cost: 0.40 },
      { name: 'Herbs', amount: '10g', cost: 0.30 }
    ],
    instructions: [
      'Roast eggplant.',
      'Prepare filling.',
      'Stuff and serve with tomato salad.'
    ],
    warnings: [{ type: 'Nightshades', text: 'Contains eggplant and tomatoes.' }],
    healthBenefits: 'Fiber-rich vegetable dish supporting heart health.',
    allergens: 'Vegan and gluten-free.'
  },

  {
    id: '14',
    name: 'Avocado Beetroot Hummus Toast',
    category: 'Middle Eastern',
    rating: 4.6,
    time: '10 mins',
    servings: '1 serving',
    difficulty: 'Easy',
    calories: 310,
    protein: 11,
    carbs: 42,
    fat: 13,
    fiber: 9,
    sodium: 420,
    estimatedTotalCost: 3.05,
    type: ['Breakfast', 'Lunch'],
    ingredients: [
      { name: 'Beetroot Hummus', amount: '45g', cost: 1.00 },
      { name: 'Avocado', amount: '75g', cost: 1.50 },
      { name: 'Rye Bread', amount: '40g', cost: 0.50 },
      { name: 'Sesame Seeds', amount: '3g', cost: 0.05 }
    ],
    instructions: [
      'Toast bread.',
      'Spread hummus.',
      'Add avocado and sesame seeds.'
    ],
    warnings: [
      { type: 'Sesame', text: 'Contains sesame.' },
      { type: 'Gluten', text: 'Contains rye bread.' }
    ],
    healthBenefits: 'Supports circulation and heart health.',
    allergens: 'Vegan. Contains sesame and gluten.'
  }
];
