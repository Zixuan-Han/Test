// src/components/MenuPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/App.module.css';

import { Breadcrumb } from '../components/common/Breadcrumb'; 
import { FilterButton } from '../components/MenuPage/FilterButton'; 
import { RecommendedMealCard } from '../components/MenuPage/RecommendedMealCard'; 
import { AllMealCard } from '../components/MenuPage/AllMealCard'; 

import { recommendedMealsData, allMealsData } from "../components/mealData";


const imageModules = import.meta.glob(
  '../images/MenuPage/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

const imageMap = Object.entries(imageModules).reduce((acc, [path, mod]) => {
  const fileNameWithExt = path.split('/').pop(); 
  const fileName = fileNameWithExt
    .replace(/\.[^/.]+$/, "")                     
    .toLowerCase();                               

  acc[fileName] = mod.default;
  return acc;
}, {});


export function getMealImage(mealName) {
  const key = mealName.toLowerCase().trim();      
  const fallback = "https://via.placeholder.com/300x200?text=No+Image";

  return imageMap[key] || fallback;
}

const SearchIconSVG = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/> 
        <line x1="16.65" y1="16.65" x2="23" y2="23"/>
    </svg>
);


export default function MenuPage() {
    const [selectedMealType, setSelectedMealType] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Others', 'All'];

    const filterMeals = (meals) => {
        return meals.filter((meal) => {
            const matchesType = selectedMealType === 'All' || meal.type.includes(selectedMealType);
            const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesType && matchesSearch;
        });
    };

    const filteredRecommendedMeals = filterMeals(recommendedMealsData);
    const filteredAllMeals = filterMeals(allMealsData);

    const menuCrumbs = [
        { name: 'Home', path: '/' }, 
        { name: 'Meal Planning', path: '/plan' }, 
        { name: 'Menu', path: '/menu' } 
    ];

    return (
        <div className={styles.pageContainer}>
            
            <div className={styles.mainContent}>
                <Breadcrumb crumbs={menuCrumbs} />
            </div>

            <div className={styles.searchFilterSectionWrapper}>
                <div className={styles.mainContent}>
                    
                    <div className={styles.searchInputContainer}>
                        {SearchIconSVG}
                        <input
                            type="text"
                            placeholder="Search for foods, recipes, or meals"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles.filterButtons}>
                        {mealTypes.map(type => (
                            <FilterButton 
                                key={type} 
                                type={type} 
                                isSelected={selectedMealType === type} 
                                onClick={setSelectedMealType}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <main className={styles.mainContent}>
                
                <section>
                    <h2 className={styles.sectionTitle}>Recommended Meals</h2>
                    <div className={styles.recommendedContainer}>
                        {filteredRecommendedMeals.length > 0 ? (
                            filteredRecommendedMeals.map((meal) => (
                                <RecommendedMealCard key={meal.id} meal={meal} />
                            ))
                        ) : (<p style={{color: 'var(--color-gray-dark)'}}>No recommended meals found.</p>)}
                    </div>
                </section>

                <section style={{paddingBottom: '48px'}}>
                    <h2 className={styles.sectionTitle}>All Meals </h2>
                    <div className={styles.allMealsGrid}>
                        {filteredAllMeals.length > 0 ? (
                            filteredAllMeals.map((meal) => (
                                <AllMealCard key={meal.id} meal={meal} />
                            ))
                        ) : (<p style={{color: 'var(--color-gray-dark)'}}>No matching meals found.</p>)}
                    </div>
                </section>
            </main>
        </div>
    );
}