// src/components/SearchRecipes/SearchBarArea.jsx
import React from 'react';

const SearchIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);

export default function SearchBarArea({ searchQuery, setSearchQuery }) {
    return (
        <div style={{ 
            backgroundColor: 'white', 
            border: '2px solid #cecece', 
            borderRadius: '12px', 
            padding: '15px 25px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px', 
            marginBottom: '20px'
        }}>
            {SearchIcon}

            <input 
                type="text" 
                placeholder="Search recipes by name, cuisine, or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                    border: 'none', 
                    outline: 'none', 
                    fontSize: '18px', 
                    width: '100%', 
                    color: '#333',
                    fontFamily: "'Inter', sans-serif" 
                }}
            />

        </div>
    );
}