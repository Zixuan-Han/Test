// src/components/WeeklyPlan/NutritionSummary.jsx
import React from 'react';

const NutritionBar = ({ label, current, goal, percent, barColor }) => (
    <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '22px' }}>
            <p style={{ margin: 0, color: '#364153' }}>{label}</p>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{percent}%</p>
        </div>
        <div style={{ height: '15px', background: '#ccc', borderRadius: '999px', marginTop: '5px' }}>
            <div style={{ width: `${percent}%`, height: '100%', background: barColor, borderRadius: '999px' }}></div>
        </div>
        {current && goal && (
            <p style={{ fontSize: '16px', color: '#4a5565', marginTop: '5px' }}>{current}/{goal} {label !== 'Calories' ? 'g' : 'kcal'}</p>
        )}
    </div>
);

export default function WeeklyNutritionSummary() {
    return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '16px', padding: '30px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'normal', marginBottom: '40px' }}>This Week's Nutrition Summary</h2>

            <NutritionBar label="Calories" current={7200} goal={8400} percent={85} barColor="#005bbb" />
            <NutritionBar label="Protein" current={420} goal={525} percent={80} barColor="#a9c7f8" />
            <NutritionBar label="Carbohydrates" current={850} goal={1050} percent={80} barColor="#d2e3fc" />
            <NutritionBar label="Fat" current={220} goal={280} percent={78} barColor="#e8f1ff" />

            <div style={{ background: '#e8f1ff', borderRadius: '16px', padding: '20px', marginTop: '30px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1c398e', marginBottom: '5px' }}>Health Tip</h3>
                <p style={{ fontSize: '20px', color: '#005bbb' }}>You're doing great this week!</p>
            </div>
        </div>
    );
}