// src/components/WeeklyPlan/WeeklyMealGrid.jsx
import React from 'react';
import WeeklyMealCell from './WeeklyMealCell';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

export default function WeeklyMealGrid({ meals, handleCellAction }) {
    return (
        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', minWidth: '1200px', border: '1px solid #ccc', borderRadius: '16px', backgroundColor: 'white' }}>
                
                <div style={{ flex: '0 0 150px', padding: '20px 0', borderRight: '1px solid #ccc' }}>
                    <h4 style={{ fontSize: '24px', fontWeight: 'normal', margin: '15px 0 100px 0', textAlign: 'center' }}>Breakfast</h4>
                    <h4 style={{ fontSize: '24px', fontWeight: 'normal', margin: '15px 0 100px 0', textAlign: 'center' }}>Lunch</h4>
                    <h4 style={{ fontSize: '24px', fontWeight: 'normal', margin: '15px 0 0 0', textAlign: 'center' }}>Dinner</h4>
                </div>

                <div style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: `repeat(${DAYS_OF_WEEK.length}, 1fr)` }}>
                    
                    {DAYS_OF_WEEK.map(day => (
                        <div key={day} style={{ borderRight: day !== 'Sunday' ? '1px solid #ccc' : 'none', padding: '20px 10px' }}>
                            <h4 style={{ fontSize: '24px', fontWeight: 'normal', textAlign: 'center', marginBottom: '30px' }}>{day}</h4>
                            
                            {MEAL_TYPES.map(mealType => (
                                <div key={mealType} style={{ marginBottom: mealType !== 'Dinner' ? '70px' : '0' }}>
                                    <WeeklyMealCell
                                        meal={meals[day]?.[mealType]}
                                        day={day}
                                        mealType={mealType}
                                        handleCellAction={handleCellAction}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}