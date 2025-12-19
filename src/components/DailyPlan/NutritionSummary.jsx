// src/components/DailyPlan/NutritionSummary.jsx
import React from 'react';

const NutritionBar = ({ label, current, goal, barColor, unit = 'g' }) => {
    const percent = goal > 0 ? Math.min(100, Math.round((current / goal) * 100)) : 0;

    return (
        <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '22px' }}>
                <p style={{ margin: 0, color: '#364153' }}>{label}</p>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{percent}%</p>
            </div>
            <div style={{ height: '15px', background: '#ccc', borderRadius: '999px', marginTop: '5px' }}>
                <div style={{ width: `${percent}%`, height: '100%', background: barColor, borderRadius: '999px', transition: 'width 0.3s ease-in-out' }}></div>
            </div>
            <p style={{ fontSize: '16px', color: '#4a5565', marginTop: '5px' }}>
                {Math.round(current)}/{goal}{unit}
            </p>
        </div>
    );
};

export default function NutritionSummary({ totals }) {
    const GOALS = {
        calories: 1600,
        protein: 70,
        carbs: 200,
        fat: 50
    };

    const current = totals || { calories: 0, protein: 0, carbs: 0, fat: 0 };

    return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '16px', padding: '30px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'normal', marginBottom: '40px' }}>Today’s Nutrition</h2>

            <NutritionBar 
                label="Calories" 
                current={current.calories} 
                goal={GOALS.calories} 
                barColor="#005bbb" 
                unit="kcal"
            />
            <NutritionBar 
                label="Protein" 
                current={current.protein} 
                goal={GOALS.protein} 
                barColor="#a9c7f8" 
            />
            <NutritionBar 
                label="Carbohydrates" 
                current={current.carbs} 
                goal={GOALS.carbs} 
                barColor="#d2e3fc" 
            />
            <NutritionBar 
                label="Fat" 
                current={current.fat} 
                goal={GOALS.fat} 
                barColor="#e8f1ff" 
            />

            <div style={{ background: '#e8f1ff', borderRadius: '16px', padding: '20px', marginTop: '30px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1c398e', marginBottom: '5px' }}>Health Tip</h3>
                <p style={{ fontSize: '20px', color: '#005bbb' }}>Remember to drink 6-8 glasses of water throughout the day to stay hydrated.</p>
            </div>
        </div>
    );
}