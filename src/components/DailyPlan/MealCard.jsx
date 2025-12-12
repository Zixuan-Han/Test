// src/components/DailyPlan/MealCard.jsx
import React from 'react';

const DeleteIcon = (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" stroke="black" strokeWidth="2"><path d="M10 12V17M14 12V17M4 6H20M7 6V4A2 2 0 0 1 9 2H15A2 2 0 0 1 17 4V6M5 6H19V20A2 2 0 0 1 17 22H7A2 2 0 0 1 5 20V6Z"/></svg>
);
const AddIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);


export default function MealCard({ type, meal, onAdd, onDelete }) {
    const icon = type === 'Breakfast' ? '🍳' : type === 'Lunch' ? '🍚' : '🍜';

    if (meal) {
        return (
            <div style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '16px', marginBottom: '20px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 'normal' }}>{icon} {type}</h3>
                    <button onClick={() => onDelete(meal.id)} style={{ padding: '5px', borderRadius: '50%' }}>{DeleteIcon}</button>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px 0' }}>
                    <img src={meal.image} alt={meal.name} style={{ width: '140px', height: '120px', objectFit: 'cover', borderRadius: '18px' }} />
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '5px' }}>{meal.name}</h4>
                        <p style={{ fontSize: '16px', color: '#005bbb', marginBottom: '5px' }}>{meal.serving}</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {meal.tags.map(tag => (
                                <span key={tag} style={{ fontSize: '14px', color: '#005bbb', background: '#e8f1ff', padding: '3px 8px', borderRadius: '10px' }}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '15px' }}>
                    <button onClick={onAdd} style={{ background: '#e8f1ff', padding: '10px 20px', borderRadius: '999px', fontSize: '20px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        {AddIcon} Add Meal
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '16px', marginBottom: '20px', padding: '20px', height: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'normal', textAlign: 'center', marginBottom: '30px' }}>{icon} {type}</h3>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={onAdd} style={{ background: '#e8f1ff', padding: '10px 40px', borderRadius: '999px', fontSize: '20px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        {AddIcon} Add Meal
                    </button>
                </div>
            </div>
        );
    }
}