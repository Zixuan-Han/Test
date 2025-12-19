// src/components/WeeklyPlan/NutritionSummary.jsx
import React, { useMemo } from 'react';

const NutritionBar = ({ label, current, goal, barColor, unit = 'g' }) => {
    const percent = goal > 0 ? Math.min(100, Math.round((current / goal) * 100)) : 0;

    return (
        <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '22px' }}>
                <p style={{ margin: 0, color: '#364153' }}>{label}</p>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{percent}%</p>
            </div>
            <div style={{ height: '15px', background: '#ccc', borderRadius: '999px', marginTop: '5px' }}>
                <div style={{ width: `${percent}%`, height: '100%', background: barColor, borderRadius: '999px', transition: 'width 0.5s ease' }}></div>
            </div>
            <p style={{ fontSize: '16px', color: '#4a5565', marginTop: '5px' }}>
                {Math.round(current)}/{goal} {unit}
            </p>
        </div>
    );
};

export default function WeeklyNutritionSummary({ meals }) {
    const weeklyTotals = useMemo(() => {
        const t = { calories: 0, protein: 0, carbs: 0, fat: 0 };
        if (!meals) return t;

        Object.values(meals).forEach(dayMeals => {
            Object.values(dayMeals).forEach(meal => {
                if (meal) {
                    t.calories += parseFloat(meal.calories) || 0;
                    t.protein += parseFloat(meal.protein) || 0;
                    t.carbs += parseFloat(meal.carbs) || 0;
                    t.fat += parseFloat(meal.fat) || 0;
                }
            });
        });
        return t;
    }, [meals]);

    const WEEKLY_GOALS = {
        calories: 11200, // 1600 * 7
        protein: 490,    // 70 * 7
        carbs: 1400,     // 200 * 7
        fat: 350         // 50 * 7
    };

    return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '16px', padding: '30px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'normal', marginBottom: '40px' }}>This Week's Nutrition Summary</h2>

            <NutritionBar 
                label="Calories" 
                current={weeklyTotals.calories} 
                goal={WEEKLY_GOALS.calories} 
                barColor="#005bbb" 
                unit="kcal"
            />
            <NutritionBar 
                label="Protein" 
                current={weeklyTotals.protein} 
                goal={WEEKLY_GOALS.protein} 
                barColor="#a9c7f8" 
            />
            <NutritionBar 
                label="Carbohydrates" 
                current={weeklyTotals.carbs} 
                goal={WEEKLY_GOALS.carbs} 
                barColor="#d2e3fc" 
            />
            <NutritionBar 
                label="Fat" 
                current={weeklyTotals.fat} 
                goal={WEEKLY_GOALS.fat} 
                barColor="#e8f1ff" 
            />

            <div style={{ background: '#e8f1ff', borderRadius: '16px', padding: '20px', marginTop: '30px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1c398e', marginBottom: '5px' }}>Health Tip</h3>
                <p style={{ fontSize: '20px', color: '#005bbb' }}>You're doing great this week! Keep maintaining this balanced diet.</p>
            </div>
        </div>
    );
}