// src/components/Recipe/RecipeHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipeHeader({ meal, onPrint, onShare, onDelete, onEdit }) {
    const navigate = useNavigate();

    const timeIcon = (
        <svg width="15" height="15" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5.5" stroke="#005BBB" strokeWidth="0.9"/>
            <path d="M6 3V6.5L8 8.5" stroke="#005BBB" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    const servingIcon = (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#005BBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    );

    const difficultyIcon = (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#005BBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
    );

    const starIcon = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFB800">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
    );

    const btnStyle = {
        padding: '10px 22px',
        borderRadius: '24px',
        border: '1px solid #cecece',
        background: 'white',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap'
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            marginBottom: '35px',
            paddingBottom: '10px'
        }}>
            <div>
                <h1 style={{ fontSize: '40px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#1a1a1a' }}>
                    {meal.name}
                </h1>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {starIcon}
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{meal.rating}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#005BBB', fontSize: '16px', fontWeight: '500' }}>
                        {timeIcon} <span>{meal.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#005BBB', fontSize: '16px', fontWeight: '500' }}>
                        {servingIcon} <span>{meal.servings}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#005BBB', fontSize: '16px', fontWeight: '500' }}>
                        {difficultyIcon} <span>{meal.difficulty}</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button 
                    onClick={onPrint} 
                    style={{...btnStyle, border: '1px solid #005BBB', color: '#005BBB'}}
                >
                    Print PDF
                </button>
                <button 
                    onClick={onShare} 
                    style={{...btnStyle, border: '1px solid #005BBB', color: '#005BBB'}}
                >
                    Share
                </button>
                <button 
                    onClick={onEdit} 
                    style={{...btnStyle, border: '1px solid #005BBB', color: '#005BBB'}}
                >
                    Edit
                </button>
                <button 
                    onClick={onDelete} 
                    style={{ ...btnStyle, backgroundColor: '#005BBB', color: 'white', border: 'none' }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}