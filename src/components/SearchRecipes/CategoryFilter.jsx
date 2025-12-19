// src/components/SearchRecipes/CategoryFilter.jsx
import React from 'react';

export default function CategoryFilter({ activeCategory, setActiveCategory }) {
    const categories = ['All', 'Salads', 'Middle Eastern', 'Italian', 'Thai'];

    return (
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                        padding: '10px 30px',
                        borderRadius: '999px',
                        border: '2px solid #cecece',
                        fontSize: '18px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: activeCategory === cat ? '#005bbb' : 'white',
                        color: activeCategory === cat ? 'white' : '#1a1a1a',
                        fontWeight: activeCategory === cat ? 'bold' : 'normal'
                    }}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}