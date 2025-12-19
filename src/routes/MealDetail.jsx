// src/components/MealDetail.jsx
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/App.module.css'; 

import { Breadcrumb } from '../components/common/Breadcrumb'; 
import MealTimeSelector from '../components/MealDetail/MealTimeSelector'; 
import NutrientSummaryGrid from '../components/MealDetail/NutrientSummaryGrid'; 
import TabContentArea from '../components/MealDetail/TabContentArea'; 

import { recommendedMealsData, allMealsData } from "../components/mealData"; 
import { getMealImage } from "./MenuPage";


const getMealDetails = (mealId) => {
    const allMeals = [...recommendedMealsData, ...allMealsData];
    return allMeals.find(meal => String(meal.id) === String(mealId));
};

const STAR_ICON_SVG = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#1E1E1E"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
);

const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

export default function MealDetail({ addToDailyPlan }) { 
    const { mealId } = useParams();              
    const navigate = useNavigate();
    
    const meal = useMemo(() => getMealDetails(mealId), [mealId]);         
    
    const [selectedTime, setSelectedTime] = useState('Breakfast');
    const [activeTab, setActiveTab] = useState('Nutritional Info');
    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    const [isAdded, setIsAdded] = useState(false); 
    
    if (!meal) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.mainContent} style={{ paddingTop: '40px' }}>
                    <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>Meal Not Found</h1>
                    <button onClick={() => navigate('/menu')} style={{ padding: '10px 24px', borderRadius: '999px', border: 'none', background: '#005bbb', color: 'white', fontSize: '16px', cursor: 'pointer' }}>Back to Menu</button>
                </div>
            </div>
        );
    }

    const mealImageUrl = getMealImage(meal.name);

    const detailCrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Meal Planning', path: '/plan' }, 
        { name: 'Menu', path: '/menu' }, 
        { name: meal.name, path: `/meal/${mealId}` }
    ];
    
    const handleAddPlan = () => {
        if (!selectedTime || !selectedDate) {
            alert("Please select a target date and meal time.");
            return;
        }

        const mealData = {
            id: meal.id,
            name: meal.name,
            calories: parseFloat(meal.calories) || 0, 
            protein: parseFloat(meal.protein) || 0,
            carbs: parseFloat(meal.carbs) || 0,
            fat: parseFloat(meal.fat) || 0,
            servings: meal.servings || '1',
            image: mealImageUrl,
            tags: meal.tags || [], 
        };
        
        addToDailyPlan(mealData, selectedDate, selectedTime);
        setIsAdded(true);
        setTimeout(() => {
            navigate(`/daily-plan?targetDay=${selectedDate}`);
        }, 800);
    };
    
    const handleViewRecipe = () => {
        navigate(`/recipe/${meal.id}`);
    };

    const buttonStyle = {
        padding: '10px 20px', 
        borderRadius: '999px', 
        fontSize: '16px', 
        fontWeight: '600', 
        width: '100%', 
        border: 'none', 
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'background-color 0.2s'
    };


    return (
        <div className={styles.pageContainer}> 
            <div className={styles.mainContent}> 
                <Breadcrumb crumbs={detailCrumbs} />
            </div>
            
            <main className={styles.mainContent} style={{ paddingTop: '40px' }}>
                <h1 style={{ fontSize: '30px', fontWeight: '600', marginBottom: '5px' }}>{meal.name}</h1>
                <p style={{ color: '#4a5565', fontSize: '14.783px', marginBottom: '30px' }}>
                    A nutritious meal option (Meal ID: {mealId})
                </p>
                
                <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 500px', minWidth: '300px' }}> 
                        <div style={{ borderRadius: '15.794px', overflow: 'hidden', position: 'relative', marginBottom: '22px' }}>
                            <img src={mealImageUrl} alt={meal.name} style={{ width: '100%', height: '310px', objectFit: 'cover', borderRadius: '12px', display: 'block' }} />
                            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'white', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}>
                                {STAR_ICON_SVG}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '25px' }}>
                            {(meal.tags || ['Low GI', 'High Fiber', 'Heart-Healthy']).map(tag => (
                                <span key={tag} style={{ backgroundColor: 'white', padding: '5px 15px', borderRadius: '999px', fontSize: '15.794px' }}>{tag}</span>
                            ))}
                        </div>

                        <MealTimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                        <div style={{ marginBottom: '10px' }}>
                            <button onClick={handleAddPlan} disabled={isAdded} style={{ ...buttonStyle, background: isAdded ? '#10b981' : '#005bbb', color: 'white' }}>
                                {isAdded ? '✅ Added! Redirecting...' : 'Add to Plan'}
                            </button>
                        </div>
                        
                        <button onClick={handleViewRecipe} style={{ ...buttonStyle, background: '#e8f1ff', color: 'black', marginTop: '12px', border: '1px solid #005bbb' }}>
                            View Recipe
                        </button>
                    </div>
                    
                    <div style={{ flex: '1 1 400px' }}> 
                        <NutrientSummaryGrid meal={meal} />

                        <div style={{ backgroundColor: 'white', borderRadius: '19.403px', border: '1px solid #ccc', padding: '30px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Key Ingredients</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {(meal.ingredients || []).map((item, index) => (
                                    <span key={index} style={{ background: '#e8f1ff', color: '#005bbb', padding: '10px 15px', borderRadius: '14px', fontSize: '19.403px' }}>
                                        {typeof item === 'string' ? item : item.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                <TabContentArea activeTab={activeTab} setActiveTab={setActiveTab} meal={meal} />
            </main>
        </div>
    );
}