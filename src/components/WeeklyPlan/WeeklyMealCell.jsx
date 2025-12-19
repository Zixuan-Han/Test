// src/components/WeeklyPlan/WeeklyMealCell.jsx
import React from 'react';

const AddIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#005BBB" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

const DeleteIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6M9 2h6"></path>
    </svg>
);


export default function WeeklyMealCell({ meal, day, mealType, handleCellAction }) {
    
    const handleCellBodyClick = (e) => {
        e.stopPropagation(); 
        handleCellAction('ADD', day, mealType); 
    };

    const handleViewDetailClick = (e) => {
        e.stopPropagation(); 
        handleCellAction('VIEW', day, mealType, meal.id);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        handleCellAction('DELETE', day, mealType, meal.id);
    };

    if (meal) {
        return (
            <div 
                onClick={handleCellBodyClick} 
                style={{ 
                    backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '10px', 
                    padding: '10px', height: '300px', cursor: 'pointer', position: 'relative' 
                }}
            >
                <h4 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '10px' }}>{meal.name}</h4>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {meal.tags && Array.isArray(meal.tags) && meal.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '12px', color: '#005bbb', background: '#e8f1ff', padding: '3px 6px', borderRadius: '10px' }}>{tag}</span>
                    ))}
                </div>
                <p style={{ fontSize: '14px', color: '#687385', margin: '10px 0' }}>{meal.time}</p>

                <div style={{ position: 'absolute', bottom: '10px', width: '90%', display: 'flex', justifyContent: 'space-between' }}>
                    
                    <button 
                        onClick={handleViewDetailClick} 
                        style={{ 
                            background: '#e8f1ff', color: '#005bbb', padding: '5px 10px', 
                            borderRadius: '999px', fontSize: '14px', fontWeight: 'bold' 
                        }}
                    >
                        View
                    </button>
                    
                    <button onClick={handleDeleteClick} style={{ background: 'none', color: 'black', padding: '5px', borderRadius: '999px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px', border: 'none' }}>
                        {DeleteIcon}
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div 
                onClick={handleCellBodyClick} 
                style={{ 
                    backgroundColor: '#f0f0f0', border: '2px dashed #ccc', borderRadius: '10px', 
                    height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    justifyContent: 'center', cursor: 'pointer' 
                }}
            >
                {AddIcon}
                <span style={{ color: '#005bbb', marginTop: '10px', fontSize: '16px', fontWeight: '600' }}>Add Meal</span>
            </div>
        );
    }
}