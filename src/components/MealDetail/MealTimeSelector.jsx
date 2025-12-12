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

export default function MealTimeSelector({ selectedTime, setSelectedTime }) {
    const times = ['Breakfast', 'Lunch', 'Dinner'];

    return (
        <div style={{ backgroundColor: 'white', borderRadius: '20.729px', border: '1px solid #ccc', padding: '36px 39px', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15.794px', fontWeight: '600', marginBottom: '14px' }}>Add to</h4>
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