// src/components/MealDetail/MealTimeSelector.jsx
import React from 'react';

const MealTimeButton = ({ time, isSelected, onClick }) => {
    const icon = time === 'Breakfast' ? '🍳' : time === 'Lunch' ? '🍚' : '🍜';
    const baseStyle = { 
        border: '1.974px solid', 
        borderRadius: '9.871px', 
        width: '30%', 
        minWidth: '100px',
        padding: '13.82px 0', 
        textAlign: 'center',
        fontSize: '15.794px',
        fontWeight: 'normal',
        cursor: 'pointer'
    };
    const activeStyle = { 
        borderColor: '#2b7fff', 
        color: '#1447e6', 
        backgroundColor: '#e8f1ff'
    };
    const defaultStyle = { 
        borderColor: '#d1d5dc', 
        color: '#364153',
        backgroundColor: 'white'
    };
    
    return (
        <button 
            onClick={onClick} 
            style={{...baseStyle, ...(isSelected ? activeStyle : defaultStyle)}}
        >
            <span style={{fontFamily: 'Arimo'}}>{icon}</span>
            <span style={{fontFamily: 'Inter', marginLeft: '5px'}}>{time}</span>
        </button>
    );
};

export default function MealTimeSelector({ selectedTime, setSelectedTime, selectedDate, setSelectedDate }) {
    const times = ['Breakfast', 'Lunch', 'Dinner'];

    return (
        <div style={{ backgroundColor: 'white', borderRadius: '20.729px', border: '1px solid #ccc', padding: '36px 39px', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15.794px', fontWeight: '600', marginBottom: '14px' }}>Add to Plan</h4>
            
            <div style={{ marginBottom: '25px' }}>
                <h5 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#4a5565' }}>Select Date:</h5>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #ddd'
                    }}
                />
            </div>

            <h5 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#4a5565' }}>Select Meal Time:</h5>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}> 
                {times.map(time => (
                    <MealTimeButton 
                        key={time} 
                        time={time} 
                        isSelected={selectedTime === time} 
                        onClick={() => setSelectedTime(time)} 
                    />
                ))}
            </div>
        </div>
    );
}