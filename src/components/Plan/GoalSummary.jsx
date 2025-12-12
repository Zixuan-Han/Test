// src/components/Plan/GoalSummary.jsx
import React from 'react';

const ChevronRight = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

const CircularProgress = ({ percent }) => {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    
    return (
        <div style={{ width: '200px', height: '200px', position: 'relative', flexShrink: 0 }}>
            <svg viewBox="0 0 200 200" style={{ position: 'absolute', top: 0, left: 0 }}>
                <circle cx="100" cy="100" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="16" />
            </svg>
            <svg viewBox="0 0 200 200" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)', transformOrigin: 'center center' }}>
                <circle
                    cx="100" cy="100" r={radius} fill="none" stroke="#005BBB" strokeWidth="16"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <p style={{ fontSize: '42px', fontWeight: 'bold', margin: 0, color: '#111111' }}>{percent}%</p>
                <p style={{ fontSize: '14px', color: '#687385', margin: 0 }}>Complete</p>
            </div>
        </div>
    );
};


export default function GoalSummary({ completion, onGoToDailyPlan }) {
    return (
        <div style={{ 
            background: 'white', 
            border: '1px solid #ccc', 
            borderRadius: '16px', 
            padding: '35px', 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-start', 
            gap: '50px', 
        }}>
            

            <CircularProgress percent={completion} />

            <div style={{ flex: '1 1 0', minWidth: '300px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 'normal', color: '#111111', marginBottom: '10px' }}>Your Plan Overview</h2>
                <p style={{ fontSize: '20px', color: '#4a5565', marginBottom: '30px' }}>
                    You are on track! Continue following your personalized meal plan to achieve your health goals.
                </p>
                
                <button 
                    onClick={onGoToDailyPlan}
                    style={{ 
                        background: '#005bbb', 
                        color: 'white', 
                        padding: '12px 48px', 
                        borderRadius: '999px', 
                        fontSize: '20px', 
                        fontWeight: 'normal', 
                        border: 'none', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '17px',
                        cursor: 'pointer'
                    }}
                >
                    Go to Today's Plan {ChevronRight}
                </button>
            </div>
        </div>
    );
}