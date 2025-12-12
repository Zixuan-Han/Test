// src/components/MealDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/App.module.css'; 

import { Breadcrumb } from './common/Breadcrumb'; 
import MealTimeSelector from './MealDetail/MealTimeSelector'; 
import NutrientSummaryGrid from './MealDetail/NutrientSummaryGrid'; 
import TabContentArea from './MealDetail/TabContentArea'; 

import { recommendedMealsData, allMealsData } from "./mealData";
import { getMealImage } from "./MenuPage";


const getMealDetails = (mealId) => {
    const allMeals = [...recommendedMealsData, ...allMealsData];
    return allMeals.find(meal => String(meal.id) === String(mealId));
};

const STAR_ICON_SVG = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#1E1E1E"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
);
const PLUS_ICON_WHITE = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const PLUS_ICON_BLACK = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);


export default function MealDetail() {
    const { mealId } = useParams();              
    const navigate = useNavigate();
    const meal = getMealDetails(mealId);         
    
    const [selectedTime, setSelectedTime] = useState('Breakfast');
    const [activeTab, setActiveTab] = useState('Nutritional Info');
    
    if (!meal) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.mainContent} style={{ paddingTop: '40px' }}>
                    <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>Meal Not Found</h1>
                    <p style={{ marginBottom: '24px' }}>
                        We couldn't find a meal with ID: <strong>{mealId}</strong>
                    </p>
                    <button
                        onClick={() => navigate('/menu')}
                        style={{
                            padding: '10px 24px',
                            borderRadius: '999px',
                            border: 'none',
                            background: '#005bbb',
                            color: 'white',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        Back to Menu
                    </button>
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
    
    const handleAddPlan = (type) => {
        alert(`Successfully added [${selectedTime}] to your [${type}]!Meal: ${meal.name}`);
        
        if (type === "Weekly Plan") {
            navigate('/weekly-plan');
        } else if (type === "Today's Plan") {
            navigate('/daily-plan');
        }
    };
    
    const handleViewRecipe = () => {
        alert("System prompt: Navigate to the Recipe detail page.");
        navigate('/recipes');
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
                            <img 
                                src={mealImageUrl}
                                alt={meal.name}
                                style={{
                                width: '100%',
                                height: '310px',   
                                objectFit: 'cover',
                                borderRadius: '12px',
                                display: 'block' 
                                }} 
                            />
                            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'white', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}>
                                {STAR_ICON_SVG}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '25px' }}>
                            {['Low GI', 'High Fiber', 'Cholesterol-Lowering', 'Heart-Healthy'].map(tag => (
                                <span key={tag} style={{ backgroundColor: 'white', padding: '5px 15px', borderRadius: '999px', fontSize: '15.794px' }}>{tag}</span>
                            ))}
                        </div>

                        <MealTimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} />

                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}> 
                            <button 
                                onClick={() => handleAddPlan("Today's Plan")}
                                style={{ background: '#005bbb', color: 'white', padding: '10px 20px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', fontWeight: '600', flexGrow: 1, justifyContent: 'center', minWidth: '250px' }}
                            >
                                {PLUS_ICON_WHITE} Add to Today’s Plan
                            </button>
                            <button
                                onClick={() => handleAddPlan("Weekly Plan")}
                                style={{ background: '#e8f1ff', color: 'black', padding: '10px 20px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', fontWeight: '600', flexGrow: 1, justifyContent: 'center', minWidth: '250px' }}
                            >
                                {PLUS_ICON_BLACK} Add to Weekly Plan
                            </button>
                        </div>
                        
                        <button
                            onClick={handleViewRecipe}
                            style={{ 
                                background: '#e8f1ff', 
                                color: 'black', 
                                marginTop: '22px', 
                                padding: '10px 20px', 
                                borderRadius: '999px', 
                                fontSize: '16px', 
                                fontWeight: '600', 
                                width: '100%', 
                                border: 'none', 
                                cursor: 'pointer'
                            }}
                        >
                            View Recipe
                        </button>
                    </div>
                    
                    <div style={{ flex: '1 1 400px' }}> 
                        
                        <NutrientSummaryGrid />

                        <div style={{ backgroundColor: 'white', borderRadius: '19.403px', border: '1px solid #ccc', padding: '30px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Key Ingredients</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {['Rolled Oats', 'Flaxseed', 'Blueberries', 'Whole Grain'].map(item => (
                                    <span key={item} style={{ background: '#e8f1ff', color: '#005bbb', padding: '10px 15px', borderRadius: '14px', fontSize: '19.403px' }}>{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                <TabContentArea activeTab={activeTab} setActiveTab={setActiveTab} />

            </main>
        </div>
    );
}
