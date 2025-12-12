// src/components/MealDetail/NutrientSummaryGrid.jsx
import React from 'react';

const NutritionFacts = [
    { label: 'Calories', value: '280 kcal' },
    { label: 'Carbs', value: '45g' },
    { label: 'Protein', value: '8g' },
    { label: 'Fiber', value: '9g' },
    { label: 'Fat', value: '7g' },
    { label: 'Sodium', value: '80mg' }
];

export default function NutrientSummaryGrid() {
    return (
        <div style={{ backgroundColor: 'white', borderRadius: '19.403px', border: '1px solid #ccc', padding: '30px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Nutrition Facts</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px' }}>
                {NutritionFacts.map(fact => (
                    <div key={fact.label} style={{ background: '#f5f5f5', borderRadius: '14px', padding: '15px', textAlign: 'center' }}>
                        <p style={{ color: '#4a5565', fontSize: '19.4px' }}>{fact.label}</p>
                        <p style={{ fontWeight: 'bold', fontSize: '19.4px' }}>{fact.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}