// src/components/Plan/GoalSettings.jsx
import React from 'react';

const goals = ['Weight management', 'Blood sugar control', 'Heart health', 'Maintain energy'];

const GoalTag = ({ text }) => (
    <div style={{ background: '#e8f1ff', color: '#005bbb', padding: '12px 22px', borderRadius: '13px', fontSize: '20px', fontWeight: 'normal', display: 'inline-block' }}>
        {text}
    </div>
);

export default function GoalSettings({ onAdd }) {
    const AddButton = (
        <button onClick={() => onAdd('Goal')} style={{ background: '#005bbb', color: 'white', padding: '12px 22px', borderRadius: '13px', fontSize: '20px', fontWeight: 'normal', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            + Add
        </button>
    );

    return (
        <div style={{ background: 'white', border: '1px solid #ccc', borderRadius: '16px', padding: '21px 30px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '30px 50px' }}>
            {goals.map(goal => (
                <GoalTag key={goal} text={goal} />
            ))}
            {AddButton}
        </div>
    );
}