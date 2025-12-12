// src/components/DailyPlan/DateList.jsx
import React from 'react';

const getMonthName = (monthIndex) => {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthIndex];
};


const getVisibleDates = (currentDate) => {
    const date = currentDate.getDate();
    const dates = [];
    for (let i = -7; i <= 7; i++) {
        const d = new Date(currentDate);
        d.setDate(date + i);
        dates.push(d);
    }
    return dates;
};

const DateItem = ({ day, date, isSelected, onClick }) => (
    <div 
        onClick={onClick}
        style={{ 
            width: '44px', height: '44px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '20px', cursor: 'pointer', flexShrink: 0,
            backgroundColor: isSelected ? '#005bbb' : '#f0f0f0',
            color: isSelected ? 'white' : 'black',
        }}>
        {date}
    </div>
);

export default function DateList({ currentDate, onDateChange }) {
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const visibleDates = getVisibleDates(currentDate);
    const displayedMonth = getMonthName(currentMonth);

    
    const handleArrowClick = (days) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDay + days);
        onDateChange(newDate);
    };

    const handleSelectChange = (type, value) => {
        let newDate = new Date(currentDate);
        if (type === 'month') {
            newDate.setMonth(value); 
        } else if (type === 'year') {
            newDate.setFullYear(value);
        }
        onDateChange(newDate);
    };
    
    const handleDayClick = (dateObj) => {
        onDateChange(dateObj);
    };

    const monthOptions = Array.from({ length: 12 }, (_, i) => ({ value: i, label: getMonthName(i) }));
    const yearOptions = [2024, 2025, 2026].map(y => ({ value: y, label: y.toString() }));


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
                
                <select 
                    value={currentMonth} 
                    onChange={(e) => handleSelectChange('month', parseInt(e.target.value))}
                    style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #ccc', fontSize: '20px' }}
                >
                    {monthOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                
                <select 
                    value={currentYear} 
                    onChange={(e) => handleSelectChange('year', parseInt(e.target.value))}
                    style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #ccc', fontSize: '20px' }}
                >
                    {yearOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '16px', padding: '15px 30px', border: '1px solid #ccc' }}>
                
                <button onClick={() => handleArrowClick(-1)} style={{ fontSize: '30px', padding: '0 10px', background: 'none', border: 'none', cursor: 'pointer' }}>{'<'}</button>
                
                <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', flexGrow: 1, justifyContent: 'flex-start', padding: '0 10px' }}>
                    {visibleDates.map((d, index) => (
                        <DateItem 
                            key={index} 
                            day={d.getDay()} 
                            date={d.getDate()} 
                            isSelected={d.toDateString() === currentDate.toDateString()} 
                            onClick={() => handleDayClick(d)}
                        />
                    ))}
                </div>

                <button onClick={() => handleArrowClick(1)} style={{ fontSize: '30px', padding: '0 10px', background: 'none', border: 'none', cursor: 'pointer' }}>{'>'}</button>
            </div>
        </div>
    );
}