// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './styles/App.module.css';

import { Header } from './components/common/Header';
import MenuPage from './components/MenuPage'; 
import MealDetail from './components/MealDetail'; 
import DailyPlan from './components/DailyPlan'; 
import WeeklyPlan from './components/WeeklyPlan'; 
import Plan from './components/Plan'; 


export default function App() {
    return (
        <Router>
            <div className={styles.pageContainer}>
                <div className={styles.mainContent}>
                    <Header /> 
                </div>
                
                <Routes>
                    <Route path="/" element={<Plan />} /> 
                    
                    <Route path="/plan" element={<Plan />} />
                    
                    <Route path="/menu" element={<MenuPage />} />
                    
                    <Route path="/meal/:mealId" element={<MealDetail />} />
                    
                    <Route path="/daily-plan" element={<DailyPlan />} /> 
                    
                    <Route path="/weekly-plan" element={<WeeklyPlan />} /> 
                </Routes>
            </div>
        </Router>
    );
}