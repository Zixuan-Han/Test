// src/components/SearchRecipes/RecipeGrid.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getMealImage } from '../../routes/MenuPage';

const RecipeCard = ({ meal }) => {
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

    return (
        <div 
            style={{ 
                backgroundColor: 'white', borderRadius: '17px', border: '2px solid #e5e7eb', 
                overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' 
            }}
            onClick={() => navigate(`/recipe/${meal.id}`)}
        >
            <div style={{ height: '200px', width: '100%' }}>
                <img 
                    src={getMealImage(meal.name)} alt={meal.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
            </div>
            <div style={{ padding: '20px', flexGrow: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 15px 0', color: '#0a0a0a' }}>{meal.name}</h3>
                
                <div style={{ display: 'flex', gap: '20px', color: '#005BBB', fontSize: '15px', marginBottom: '20px', fontWeight: '500' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {timeIcon} <span>{meal.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {servingIcon} <span>{meal.servings}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {difficultyIcon} <span>{meal.difficulty}</span>
                    </div>
                </div>

                <span style={{ color: '#005BBB', textDecoration: 'underline', fontSize: '16px', fontWeight: 'bold' }}>
                    View Recipe
                </span>
            </div>
        </div>
    );
};

export default function RecipeGrid({ recipes }) {
    if (recipes.length === 0) {
        return <p style={{ textAlign: 'center', fontSize: '18px', padding: '50px', color: '#4a5565' }}>No recipes found in this category.</p>;
    }

    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '24px',
            paddingBottom: '40px'
        }}>
            {recipes.map(meal => (
                <RecipeCard key={meal.id} meal={meal} />
            ))}
        </div>
    );
}