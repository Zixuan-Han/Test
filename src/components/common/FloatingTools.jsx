// src/components/common/FloatingTools.jsx
import React, { useState } from 'react';
import FloatingCalculatorWrapper from '../NutritionCalculator/FloatingCalculatorWrapper';

export default function FloatingTools() {
    const [isOpen, setIsOpen] = useState(false);

    const CalculatorIcon = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="8" x2="8" y2="8"></line>
            <line x1="16" y1="12" x2="8" y2="12"></line>
            <line x1="16" y1="16" x2="8" y2="16"></line>
        </svg>
    );

    const triggerBtnStyle = {
        position: 'fixed',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)', 
        width: '50px',
        height: '70px',
        backgroundColor: '#005BBB',
        color: 'white',
        border: 'none',
        borderRadius: '12px 0 0 12px', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '-4px 0 15px rgba(0,0,0,0.2)',
        zIndex: 3000,
        transition: 'all 0.3s ease',
        fontFamily: "'Inter', sans-serif"
    };

    return (
        <>
            <button 
                style={triggerBtnStyle}
                onClick={() => setIsOpen(!isOpen)}
                onMouseOver={(e) => e.currentTarget.style.paddingRight = '10px'}
                onMouseOut={(e) => e.currentTarget.style.paddingRight = '0px'}
            >
                {CalculatorIcon}
                <span style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>CALC</span>
            </button>

            {isOpen && (
                <div style={{
                    position: 'fixed', 
                    top: '0',
                    right: '0', 
                    width: '450px', 
                    height: '100vh', 
                    backgroundColor: 'white', 
                    boxShadow: '-10px 0 40px rgba(0,0,0,0.2)', 
                    zIndex: 3001, 
                    display: 'flex', 
                    flexDirection: 'column',
                    animation: 'slideIn 0.3s ease-out'
                }}>

                    <div style={{ 
                        padding: '20px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        borderBottom: '1px solid #eee' 
                    }}>
                        <h3 style={{ margin: 0, color: '#005BBB', fontFamily: "'Inter', sans-serif" }}>Nutrition Analyzer</h3>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#666' }}
                        >✕</button>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        <FloatingCalculatorWrapper />
                    </div>
                </div>
            )}

            {isOpen && (
                <div 
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 2999
                    }}
                />
            )}

            <style>
                {`
                    @keyframes slideIn {
                        from { transform: translateX(100%); }
                        to { transform: translateX(0); }
                    }
                `}
            </style>
        </>
    );
}