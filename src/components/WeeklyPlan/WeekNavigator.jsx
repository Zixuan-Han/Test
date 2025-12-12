// src/components/WeeklyPlan/WeekNavigator.jsx
import React from 'react';

const formatDateRange = (date) => {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(start.getDate() + 6); 

    const startMonth = start.toLocaleString('en-US', { month: 'short' });
    const endMonth = end.toLocaleString('en-US', { month: 'short' });

    const startDay = start.getDate();
    const endDay = end.getDate();
    const year = start.getFullYear();

    return `Week of ${startMonth} ${startDay}, ${year} – ${endMonth} ${endDay}, ${year}`;
};

export default function WeekNavigator({ currentWeekStart, onWeekChange }) {
    
    const changeWeek = (direction) => {
        const newDate = new Date(currentWeekStart);
        newDate.setDate(currentWeekStart.getDate() + direction * 7);
        onWeekChange(newDate);
    };

    const weekText = formatDateRange(currentWeekStart);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: '16px', padding: '15px 25px', border: '1px solid #ccc', maxWidth: '600px', margin: '0 auto' }}>
            
            <button onClick={() => changeWeek(-1)} style={{ fontSize: '30px', padding: '0 10px', background: 'none', border: 'none', cursor: 'pointer' }}>{'<'}</button>
            
            <div style={{ flexGrow: 1, textAlign: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'normal' }}>{weekText}</h3>
            </div>

            <button onClick={() => changeWeek(1)} style={{ fontSize: '30px', padding: '0 10px', background: 'none', border: 'none', cursor: 'pointer' }}>{'>'}</button>
        </div>
    );
}