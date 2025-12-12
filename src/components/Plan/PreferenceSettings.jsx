// src/components/Plan/PreferenceSettings.jsx
import React from 'react';

const dietaryPreferences = ['Low Sodium', 'High Fiber', 'High Protein', 'Plant-Based'];
const restrictions = ['Nuts', 'Shellfish'];

const PreferenceTag = ({ text }) => (
    <div style={{ background: '#e8f1ff', color: '#005bbb', padding: '12px 22px', borderRadius: '13px', fontSize: '20px', fontWeight: 'normal', display: 'inline-block' }}>
        {text}
    </div>
);


export default function PreferenceSettings({ onAdd }) {
    const AddButton = (type) => (
        <button onClick={() => onAdd(type)} style={{ background: '#005bbb', color: 'white', padding: '12px 22px', borderRadius: '13px', fontSize: '20px', fontWeight: 'normal', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            + Add
        </button>
    );

    return (
        <div style={{ background: 'white', border: '1px solid #ccc', borderRadius: '16px', padding: '30px' }}>
            
            <div style={{ marginBottom: '30px' }}>
                <p style={{ fontSize: '20px', fontWeight: 'normal', color: '#111111', marginBottom: '15px' }}>Dietary Preferences</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 50px' }}>
                    {dietaryPreferences.map(pref => (
                        <PreferenceTag key={pref} text={pref} />
                    ))}
                    {AddButton('Preference')}
                </div>
            </div>

            <div>
                <p style={{ fontSize: '20px', fontWeight: 'normal', color: '#111111', marginBottom: '15px' }}>Current Restrictions</p>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px 50px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 'normal', color: '#111111' }}>Allergies:</span>
                    {restrictions.map(res => (
                        <PreferenceTag key={res} text={res} />
                    ))}
                    {AddButton('Restriction')}
                </div>
            </div>
        </div>
    );
}