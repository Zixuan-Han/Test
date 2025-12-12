// src/components/WeeklyPlan.jsx
import React, { useState } from 'react';
import styles from '../styles/App.module.css';
import { useNavigate } from 'react-router-dom';

import { Breadcrumb } from './common/Breadcrumb'; 
import WeekNavigator from './WeeklyPlan/WeekNavigator';
import WeeklyMealGrid from './WeeklyPlan/WeeklyMealGrid';
import WeeklyNutritionSummary from './WeeklyPlan/NutritionSummary'; 

const initialWeeklyMeals = {
    'Monday': {}, 
    'Tuesday': {}, 
    'Wednesday': {}, 
    'Thursday': {}, 
    'Friday': {}, 
    'Saturday': {}, 
    'Sunday': {}, 
};

export default function WeeklyPlan() {
    const navigate = useNavigate();
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date(2025, 10, 24)); 
    const [meals, setMeals] = useState(initialWeeklyMeals); 

    
    const handleWeekChange = (newDate) => {
        setCurrentWeekStart(newDate);
    };

    const handleCellAction = (actionType, day, mealType, mealId) => {
        if (actionType === 'ADD') {
            navigate(`/daily-plan?targetDay=${day}`); 
        
        } else if (actionType === 'VIEW') {
            navigate(`/meal/${mealId}`);
        
        } else if (actionType === 'DELETE') {
            if (window.confirm(`Are you sure you want to delete the ${mealType} for ${day}?`)) {
                setMeals(prevMeals => {
                    const newMeals = { ...prevMeals };
                    newMeals[day] = { ...newMeals[day] }; 
                    
                    delete newMeals[day][mealType];
                    
                    if (Object.keys(newMeals[day]).length === 0) {
                         newMeals[day] = {}; 
                    }

                    return newMeals; 
                });
                alert(`System prompt: ${mealType} deleted successfully.`);
            }
        }
    };
    
    const weeklyCrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Meal Planning', path: '/plan' }, 
        { name: 'Weekly Plan', path: '/weekly-plan' } 
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContent}>
                
                <Breadcrumb crumbs={weeklyCrumbs} />

                <div style={{ padding: '20px 0 40px 0' }}>
                    <WeekNavigator 
                        currentWeekStart={currentWeekStart} 
                        onWeekChange={handleWeekChange} 
                    />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
                    
                    <WeeklyMealGrid 
                        meals={meals} 
                        handleCellAction={handleCellAction} 
                    />

                    <WeeklyNutritionSummary />

                </div>
            </div>
        </div>
    );
}