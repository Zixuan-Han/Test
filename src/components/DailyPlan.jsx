// src/components/DailyPlan.jsx
import React, { useState } from 'react';
import styles from '../styles/App.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

import DateList from './DailyPlan/DateList';
import MealCard from './DailyPlan/MealCard';
import NutritionSummary from './DailyPlan/NutritionSummary';
import { Breadcrumb } from './common/Breadcrumb'; 

//const initialMeals = [
//    { id: 1, type: 'Breakfast', name: 'Oatmeal with Blueberries', serving: '1 Serving', tags: ['Moderate Meal', 'Heart-Healthy'], image: 'https://picsum.photos/140/120?random=1' },
//   { id: 2, type: 'Lunch', name: 'Grilled Fish with Pumpkin Purée', serving: '1 Serving', tags: ['Full Meal', 'High Protein'], image: 'https://picsum.photos/140/120?random=2' },
//   { id: 3, type: 'Dinner', name: 'Steamed Vegetables', serving: '1 Serving', tags: ['Light Meal', 'Low Fat'], image: 'https://picsum.photos/140/120?random=3' },
//];
const initialMeals = [];

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

const PLUS_ICON_BLACK = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);


export default function DailyPlan() {
    const navigate = useNavigate();


    const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 28)); 
    const [meals, setMeals] = useState(initialMeals);

    const handleDateChange = (newDate) => {
        setCurrentDate(newDate);
    };

    const handleAddMeal = (mealType) => {
        alert(`System prompt: Navigate to the Menu page to select a ${mealType} meal.`);
        navigate('/menu');
    };

    const handleDeleteMeal = (id) => {
        const mealName = meals.find(m => m.id === id)?.name || 'This meal';
        if (window.confirm(`Are you sure you want to delete ${mealName}?`)) {
            setMeals(meals.filter(meal => meal.id !== id));
            alert(`System prompt: ${mealName} deleted successfully.`);
        }
    };

    const handleGoToWeeklyPlan = () => {
        navigate('/weekly-plan');
    };
    
    const dailyCrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Meal Planning', path: '/plan' }, 
        { name: 'Daily Plan', path: '/daily-plan' } 
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContent}>
                
                <Breadcrumb crumbs={dailyCrumbs} />

                <div style={{ padding: '20px 0', width: '100%' }}>
                    <DateList 
                        currentDate={currentDate} 
                        onDateChange={handleDateChange} 
                    />
                </div>

                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '30px' }}>
                    
                    <div style={{ flex: '1 1 600px' }}>
                        {MEAL_TYPES.map(type => {
                            const meal = meals.find(m => m.type === type);
                            return (
                                <MealCard
                                    key={type}
                                    type={type}
                                    meal={meal}
                                    onAdd={() => handleAddMeal(type)}
                                    onDelete={meal ? () => handleDeleteMeal(meal.id) : null} 
                                />
                            );
                        })}
                    </div>

                    <div style={{ flex: '1 1 400px' }}>
                        <NutritionSummary />
                    </div>

                        <button
                            onClick={handleGoToWeeklyPlan}
                            style={{ 
                                background: '#005bbb', 
                                color: 'white', 
                                                        
                                padding: '15px 20px', 
                                borderRadius: '15px', 
                                
                                width: '100%', 
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '18px', 
                                fontWeight: 'bold',
                                textAlign: 'center',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                            }}
                        >
                            Go to Weekly Plan
                        </button>
                </div>

            </div>
        </div>
    );
}