// src/components/DailyPlan.jsx
import React, { useState, useMemo } from 'react';
import styles from '../styles/App.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

import DateList from '../components/DailyPlan/DateList';
import NutritionSummary from '../components/DailyPlan/NutritionSummary';
import { Breadcrumb } from '../components/common/Breadcrumb'; 

const TrashIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6M9 2h6"></path>
    </svg>
);


const PlannedMealCard = ({ meal, onDelete }) => {
    const navigate = useNavigate(); 
    
    const handleCardClick = () => {
        navigate(`/meal/${meal.id}`);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); 
        if (onDelete) {
            onDelete();
        }
    };

    return (
        <div 
            onClick={handleCardClick} 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '10px 15px', 
                backgroundColor: '#F7F8FA', 
                borderRadius: '10px', 
                marginBottom: '8px',
                border: '1px solid #E5E7EB',
                cursor: 'pointer', 
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img 
                    src={meal.image || '/path/to/default/meal.png'} 
                    alt={meal.name} 
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} 
                />
                <div>
                    <div style={{ fontSize: '1rem', fontWeight: '500', margin: 0 }}>{meal.name}</div>
                </div>
            </div>
            {onDelete && (
                <button 
                    onClick={handleDeleteClick} 
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        color: '#EF4444', 
                        padding: '5px',
                    }}
                >
                    {TrashIcon} 
                </button>
            )}
        </div>
    );
};


const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

const PLUS_ICON_BLACK = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const getDisplayDateText = (dateStr) => {
    const dateObj = new Date(dateStr + 'T00:00:00'); 
    if (isNaN(dateObj)) return dateStr;

    return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
};

const getBreadcrumbDateText = (dateStr) => {
    const dateObj = new Date(dateStr + 'T00:00:00');
    if (isNaN(dateObj)) return dateStr;
    
    return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};


export default function DailyPlan({ dailyPlanMeals, deleteFromDailyPlan }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    
    const initialDate = searchParams.get('targetDay') || getTodayDateString();
    const [currentDate, setCurrentDate] = useState(initialDate); 
    
    const mealsForDay = dailyPlanMeals[currentDate] || {};
    
    const nutritionTotals = useMemo(() => {
        const t = { calories: 0, protein: 0, carbs: 0, fat: 0 };
        Object.values(mealsForDay).forEach(mealList => {
            mealList.forEach(meal => {
                t.calories += parseFloat(meal.calories) || 0;
                t.protein += parseFloat(meal.protein) || 0;
                t.carbs += parseFloat(meal.carbs) || 0;
                t.fat += parseFloat(meal.fat) || 0;
            });
        });
        return t;
    }, [mealsForDay]);
    
    const handleDeleteMeal = (time, instanceId) => {
        deleteFromDailyPlan(currentDate, time, instanceId); 
    };

    const handleAddMeal = (mealType) => {
        navigate(`/menu?targetTime=${mealType}&targetDay=${currentDate}`); 
    };

    const handleGoToWeeklyPlan = () => {
        navigate(`/weekly-plan?targetDay=${currentDate}`);
    };

    const dailyCrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Meal Planning', path: '/plan' }, 
        { 
            name: getBreadcrumbDateText(currentDate), 
            path: `/daily-plan?targetDay=${currentDate}` 
        }
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContent}>
                
                <Breadcrumb crumbs={dailyCrumbs} />
                
                <h1 style={{fontSize: '32px', fontWeight: 'bold', margin: '15px 0'}}>
                    {getDisplayDateText(currentDate)} Meal Plan
                </h1>
                
                <div style={{ padding: '20px 0', width: '100%' }}>
                    <DateList 
                        currentDate={new Date(currentDate + 'T00:00:00')} 
                        onDateChange={(newDate) => {
                             const newDateString = [
                                newDate.getFullYear(),
                                String(newDate.getMonth() + 1).padStart(2, '0'),
                                String(newDate.getDate()).padStart(2, '0'),
                             ].join('-');
                             navigate(`/daily-plan?targetDay=${newDateString}`);
                             setCurrentDate(newDateString);
                        }} 
                    />
                </div>

                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '30px' }}>
                    
                    <div style={{ flex: '1 1 600px' }}>
                        {MEAL_TYPES.map(type => {
                            const mealsList = mealsForDay[type] || [];
                            
                            return (
                                <div key={type} style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '16px', marginBottom: '20px', padding: '20px' }}>
                                    <h3 style={{ fontSize: '24px', fontWeight: 'normal', marginBottom: '15px' }}>
                                        {type} ({mealsList.length} items)
                                    </h3>

                                    {mealsList.map(meal => (
                                        <PlannedMealCard 
                                            key={meal.instanceId}
                                            meal={meal}
                                            onDelete={() => handleDeleteMeal(type, meal.instanceId)}
                                        />
                                    ))}

                                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <button 
                                            onClick={() => handleAddMeal(type)} 
                                            style={{ background: '#e8f1ff', padding: '10px 40px', borderRadius: '999px', fontSize: '20px', display: 'inline-flex', alignItems: 'center', gap: '10px', border: 'none', cursor: 'pointer' }}
                                        >
                                            {PLUS_ICON_BLACK} Add Meal
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        
                        <NutritionSummary totals={nutritionTotals} />
                        
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
        </div>
    );
}