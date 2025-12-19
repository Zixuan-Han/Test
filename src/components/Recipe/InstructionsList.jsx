// src/components/Recipe/InstructionsList.jsx
import React from 'react';

export default function InstructionsList({ instructions }) {
    return (
        <div style={{ background: 'white', padding: '35px', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '35px', fontWeight: 'normal' }}>Instructions</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {instructions?.map((step, index) => (
                    <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                        <div style={{ 
                            background: '#005bbb', 
                            color: 'white', 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            flexShrink: 0,
                            fontWeight: 'bold',
                            fontSize: '18px'
                        }}>
                            {index + 1}
                        </div>
                        <p style={{ fontSize: '18px', lineHeight: '1.6', margin: 0, color: '#1a1a1a', paddingTop: '5px' }}>
                            {step}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}