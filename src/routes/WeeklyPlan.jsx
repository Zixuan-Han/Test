// src/components/WeeklyPlan.jsx
import React, { useState, useMemo } from 'react';
import styles from '../styles/App.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom'; 

import { Breadcrumb } from '../components/common/Breadcrumb'; 
import WeekNavigator from '../components/WeeklyPlan/WeekNavigator';
import WeeklyMealGrid from '../components/WeeklyPlan/WeeklyMealGrid';
import WeeklyNutritionSummary from '../components/WeeklyPlan/NutritionSummary'; 

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT_DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner']; 


const dateStringToDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); 
};

const getStartOfWeek = (dateObj) => {
    const day = dateObj.getDay(); 
    const diff = dateObj.getDate() - day; 
    const startOfWeek = new Date(dateObj);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
};

const getDayOfWeekString = (currentWeekStart, dayIndex) => {
    const date = new Date(currentWeekStart);
    date.setDate(currentWeekStart.getDate() + dayIndex); 
    
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};


export default function WeeklyPlan({ dailyPlanMeals, deleteFromDailyPlan }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const targetDayParam = searchParams.get('targetDay');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let initialStart;
    if (targetDayParam) {
        const targetDate = dateStringToDate(targetDayParam);
        initialStart = getStartOfWeek(targetDate);
    } else {
        initialStart = getStartOfWeek(new Date(2025, 10, 24)); 
    }
    
    const [currentWeekStart, setCurrentWeekStart] = useState(initialStart); 
    
    
    const meals = useMemo(() => {
        const currentWeekMeals = {};
        
        for (let i = 0; i < 7; i++) {
            const dayName = SHORT_DAYS_OF_WEEK[i];
            const dateStr = getDayOfWeekString(currentWeekStart, i);
            const dayPlan = dailyPlanMeals[dateStr] || {};
            
            const mappedDayMeals = {};
            MEAL_TYPES.forEach(mealType => {
                if (dayPlan[mealType] && dayPlan[mealType].length > 0) {
                    mappedDayMeals[mealType] = dayPlan[mealType][0]; 
                }
            });

            currentWeekMeals[dayName] = mappedDayMeals;
        }
        return currentWeekMeals;
    }, [currentWeekStart, dailyPlanMeals]);


    const handleWeekChange = (newDate) => {
        setCurrentWeekStart(newDate);
    };

    const handleCellAction = (actionType, dayString, mealType, mealId) => {
        
        const dayIndex = DAYS_OF_WEEK.indexOf(dayString);
        if (dayIndex === -1) return;

        const targetDay = getDayOfWeekString(currentWeekStart, dayIndex); 
        if (!targetDay) return;


        if (actionType === 'VIEW' && mealId) {
            navigate(`/meal/${mealId}`);
        
        } else if (actionType === 'DELETE') {
            const mealToDelete = meals[dayString] ? meals[dayString][mealType] : null;

            if (!mealToDelete || !deleteFromDailyPlan) {
                console.error(`Deletion failed: Meal not found or deleteFromDailyPlan function missing.`);
                alert(`Error: Meal not found for deletion or application setup error.`);
                return;
            }

            if (window.confirm(`Are you sure you want to delete the ${mealToDelete.name} (${mealType} for ${dayString})?`)) {
                
                deleteFromDailyPlan(targetDay, mealType, mealToDelete.instanceId); 
                
                alert(`System prompt: ${mealToDelete.name} deleted successfully.`);
            }
        
        } else {
            navigate(`/daily-plan?targetDay=${targetDay}`); 
        }
    };
    
    const weeklyCrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Meal Planning', path: '/plan' }, 
        { name: 'Weekly Plan', path: `/weekly-plan?targetDay=${targetDayParam || getTodayDateString()}` } 
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
                        currentWeekStart={currentWeekStart} 
                        handleCellAction={handleCellAction} 
                    />

                    <WeeklyNutritionSummary meals={meals} /> 
                </div>
            </div>
        </div>
    );
}