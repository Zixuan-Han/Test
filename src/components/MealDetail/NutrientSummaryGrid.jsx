// src/components/MealDetail/NutrientSummaryGrid.jsx
import React from 'react';

export default function NutrientSummaryGrid({ meal }) {
    const facts = [
        { label: 'Calories', value: meal?.calories ? `${meal.calories} kcal` : 'N/A' },
        { label: 'Carbs', value: meal?.carbs ? `${meal.carbs}g` : 'N/A' },
        { label: 'Protein', value: meal?.protein ? `${meal.protein}g` : 'N/A' },
        { label: 'Fiber', value: meal?.fiber ? `${meal.fiber}g` : '9g' },
        { label: 'Fat', value: meal?.fat ? `${meal.fat}g` : 'N/A' },
        { label: 'Sodium', value: meal?.sodium ? `${meal.sodium}mg` : '80mg' }
    ];

    return (
        <div style={{ backgroundColor: 'white', borderRadius: '19.403px', border: '1px solid #ccc', padding: '30px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Nutrition Facts</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px' }}>
                {facts.map(fact => (
                    <div key={fact.label} style={{ background: '#f5f5f5', borderRadius: '14px', padding: '15px', textAlign: 'center' }}>
                        <p style={{ color: '#4a5565', fontSize: '19.4px' }}>{fact.label}</p>
                        <p style={{ fontWeight: 'bold', fontSize: '19.4px' }}>{fact.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}