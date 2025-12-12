// src/pages/MenuPage.js
import React, { useState } from "react";
import "../styles/menuPage.css";

const recommendedMealsData = [
  {
    id: "oatmeal-blueberries",
    name: "Oatmeal with Blueberries",
    image: "/images/oatmeal-blueberries.jpg",
    time: "15 mins",
    tags: ["High Fiber", "Heart-Healthy"],
    type: "Breakfast",
  },
  {
    id: "healthy-buddha-bowl",
    name: "Healthy Buddha Bowl",
    image: "/images/healthy-buddha-bowl.jpg",
    time: "20 mins",
    tags: ["High Fiber", "Vitamins-Rich"],
    type: "Lunch",
  },
  {
    id: "lentil-root-bowl",
    name: "Lentil & Root Vegetable Bowl",
    image: "/images/lentil-root-bowl.jpg",
    time: "25 mins",
    tags: ["High Fiber", "Plant Protein"],
    type: "Dinner",
  },
  {
    id: "peach-ricotta-toast",
    name: "Peach & Ricotta Toast",
    image: "/images/peach-ricotta-toast.jpg",
    time: "10 mins",
    tags: ["High Fiber", "Calcium-Rich"],
    type: "Breakfast",
  },
  {
    id: "omelette",
    name: "Omelette with Vegetables",
    image: "/images/omelette.jpg",
    time: "10 mins",
    tags: ["High Fiber"],
    type: "Breakfast",
  },
];

const allMealsData = [
  {
    id: "shrimp-pad-thai",
    name: "Shrimp Pad Thai",
    image: "/images/shrimp-pad-thai.jpg",
    time: "25 mins",
    servings: "2 Serving",
    difficulty: "Medium",
    type: "Dinner",
  },
  {
    id: "steamed-vegetables",
    name: "Steamed Vegetables",
    image: "/images/steamed-vegetables.jpg",
    time: "12 mins",
    servings: "2 Serving",
    difficulty: "Easy",
    type: "Lunch",
  },
  {
    id: "tuna-salad",
    name: "Tuna Salad",
    image: "/images/tuna-salad.jpg",
    time: "10 mins",
    servings: "1–2 Serving",
    difficulty: "Easy",
    type: "Lunch",
  },
  {
    id: "avocado-toast-egg",
    name: "Avocado Toast with Egg",
    image: "/images/avocado-toast-egg.jpg",
    time: "10 mins",
    servings: "1 Serving",
    difficulty: "Easy",
    type: "Breakfast",
  },
  {
    id: "stuffed-eggplant",
    name: "Stuffed Eggplant with Tomato Salad",
    image: "/images/stuffed-eggplant.jpg",
    time: "30 mins",
    servings: "2 Serving",
    difficulty: "Medium",
    type: "Dinner",
  },
  {
    id: "avocado-beetroot-toast",
    name: "Avocado Beetroot Hummus Toast",
    image: "/images/avocado-beetroot-toast.jpg",
    time: "8 mins",
    servings: "1 Serving",
    difficulty: "Easy",
    type: "Breakfast",
  },
];

export default function MenuPage() {
  const [searchText, setSearchText] = useState("");
  const [activeType, setActiveType] = useState("All");

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Others", "All"];

  const filterMeals = (meals) =>
    meals.filter((meal) => {
      const matchesSearch = meal.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesType =
        activeType === "All"
          ? true
          : activeType === "Others"
          ? !["Breakfast", "Lunch", "Dinner"].includes(meal.type)
          : meal.type === activeType;

      return matchesSearch && matchesType;
    });

  const visibleRecommended = filterMeals(recommendedMealsData);
  const visibleAllMeals = filterMeals(allMealsData);

  return (
    <div className="menu-page">
      <div className="menu-breadcrumb">
        <button className="back-button">← Back</button>
        <span className="breadcrumb-text">Meal Planning / Add Meal</span>
      </div>

      <div className="menu-search-row">
        <input
          className="menu-search-input"
          type="text"
          placeholder="Search for foods, recipes, or meals"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="menu-filters">
        {mealTypes.map((type) => (
          <button
            key={type}
            className={
              "filter-chip" + (activeType === type ? " filter-chip-active" : "")
            }
            onClick={() => setActiveType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <section>
        <h2 className="section-title">Recommended Meals</h2>
        <div className="recommended-grid">
          {visibleRecommended.map((meal) => (
            <div className="recommended-card" key={meal.id}>
              <div className="recommended-image-wrapper">
                <img src={meal.image} alt={meal.name} />
              </div>
              <div className="recommended-info">
                <span className="recommended-time">{meal.time}</span>
                <h3 className="recommended-name">{meal.name}</h3>
                <div className="recommended-tags">
                  {meal.tags.map((tag) => (
                    <span className="tag-pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {visibleRecommended.length === 0 && (
            <p className="empty-hint">No recommended meals found.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="section-title">All Meals &amp; Recipes</h2>
        <div className="all-meals-grid">
          {visibleAllMeals.map((meal) => (
            <div className="all-meal-card" key={meal.id}>
              <div className="all-meal-image-wrapper">
                <img src={meal.image} alt={meal.name} />
              </div>
              <div className="all-meal-info">
                <h3 className="all-meal-name">{meal.name}</h3>
                <div className="all-meal-meta">
                  <span>⏱ {meal.time}</span>
                  <span>👥 {meal.servings}</span>
                  <span>📊 {meal.difficulty}</span>
                </div>
                <button className="view-recipe-link">View Recipe</button>
              </div>
            </div>
          ))}
          {visibleAllMeals.length === 0 && (
            <p className="empty-hint">No meals match your search.</p>
          )}
        </div>
      </section>
    </div>
  );
}
