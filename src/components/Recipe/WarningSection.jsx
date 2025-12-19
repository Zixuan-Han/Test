// src/components/Recipe/WarningSection.jsx
import React from 'react';

export default function WarningSection({ warnings }) {
    return (
        <div style={{ marginTop: '40px', backgroundColor: 'white', borderRadius: '16px', border: '2px solid #cc8a00', padding: '35px' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '32px' }}>⚠️</span>
                <div>
                    <h2 style={{ fontSize: '28px', margin: 0, fontWeight: 'normal' }}>Allergy & Dietary Warnings</h2>
                    <p style={{ color: '#cc8a00', fontSize: '20px', margin: '5px 0 0 0' }}>Contains Possible Allergens</p>
                </div>
            </div>

            <p style={{ fontSize: '18px', marginBottom: '20px' }}>This recipe may include the following ingredients that can trigger allergies:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {warnings?.map((w, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div style={{ width: '10px', height: '10px', background: '#cc8a00', borderRadius: '50%', marginTop: '8px', flexShrink: 0 }}></div>
                        <p style={{ fontSize: '18px', margin: 0 }}>
                            <strong style={{ fontSize: '20px' }}>{w.type}</strong> — {w.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}