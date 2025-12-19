// src/App.jsx
import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './styles/App.module.css';

import { Header } from './components/common/Header';
import MenuPage from './routes/MenuPage'; 
import MealDetail from './routes/MealDetail'; 
import DailyPlan from './routes/DailyPlan'; 
import WeeklyPlan from './routes/WeeklyPlan'; 
import Plan from './routes/Plan'; 
import Recipe from './routes/Recipe'; 
import MyRecipes from './routes/MyRecipes';
import CreateRecipe from './routes/CreateRecipe';
import SearchRecipes from './routes/SearchRecipes';
import FloatingTools from './components/common/FloatingTools'; 

let nextMealInstanceId = 100; 

export default function App() {
    const [dailyPlanMeals, setDailyPlanMeals] = useState({});

    const addToDailyPlan = (mealData, date, time) => {
        setDailyPlanMeals(prevPlan => {
            const datePlan = prevPlan[date] || { Breakfast: [], Lunch: [], Dinner: [] };
            const currentMeals = datePlan[time] || [];
            
            const newMealInstance = {
                ...mealData,
                instanceId: nextMealInstanceId++, 
                time: time,
            };

            return {
                ...prevPlan,
                [date]: {
                    ...datePlan,
                    [time]: [...currentMeals, newMealInstance], 
                },
            };
        });
    };

    const deleteFromDailyPlan = (date, time, instanceId) => {
        setDailyPlanMeals(prevPlan => {
            const datePlan = prevPlan[date];
            if (!datePlan) return prevPlan;
            const currentMeals = datePlan[time] || [];
            return {
                ...prevPlan,
                [date]: {
                    ...datePlan,
                    [time]: currentMeals.filter(m => m.instanceId !== instanceId)
                }
            };
        });
    };

    return (
        <Router>
            <div className={styles.appContainer}>
                <div className={styles.mainContent}>
                    <Header /> 
                </div>
                
                <Routes>
                    <Route path="/" element={<Plan dailyPlanMeals={dailyPlanMeals} />} /> 
                    <Route path="/plan" element={<Plan dailyPlanMeals={dailyPlanMeals} />} />
                    <Route path="/menu" element={<MenuPage />} />
                    
                    <Route 
                        path="/meal/:mealId" 
                        element={<MealDetail addToDailyPlan={addToDailyPlan} />} 
                    />
                    
                    <Route 
                        path="/recipe/:mealId" 
                        element={<Recipe />} 
                    />

                    <Route path="/search-recipes" element={<SearchRecipes />} />

                    <Route path="/create-recipe" element={<CreateRecipe />} />

                    <Route path="/edit-recipe/:mealId" element={<CreateRecipe />} />

                    <Route path="/my-recipes" element={<MyRecipes />} />
                    
                    <Route 
                        path="/daily-plan" 
                        element={
                            <DailyPlan 
                                dailyPlanMeals={dailyPlanMeals} 
                                deleteFromDailyPlan={deleteFromDailyPlan}
                            />
                        } 
                    /> 
                    
                    <Route 
                        path="/weekly-plan" 
                        element={
                            <WeeklyPlan 
                                dailyPlanMeals={dailyPlanMeals}
                                deleteFromDailyPlan={deleteFromDailyPlan} 
                            />
                        } 
                    /> 
                </Routes>
            </div>
            
            <FloatingTools />
            
        </Router>
    );
}