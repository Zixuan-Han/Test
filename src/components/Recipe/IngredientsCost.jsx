// src/components/Recipe/IngredientsCost.jsx
import React from 'react';

export default function IngredientsCost({ meal }) {
    return (
        <div style={{ background: 'white', padding: '35px', borderRadius: '16px', border: '1px solid #e5e7eb', height: 'fit-content' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '20px', fontWeight: 'normal' }}>Ingredients & Estimated Cost</h2>
            <p style={{ color: '#5a5a5a', fontSize: '16px', marginBottom: '20px' }}>(AI-Generated)</p>
            
            <div style={{ marginBottom: '30px' }}>
                {meal.ingredients?.map((ing, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '8px', height: '8px', background: '#005bbb', borderRadius: '50%' }}></div>
                            <span style={{ fontSize: '18px' }}>
                                {typeof ing === 'string' ? ing : `${ing.name} (${ing.amount})`}
                            </span>
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: '500' }}>
                            ${ing.cost ? Number(ing.cost).toFixed(2) : '0.00'}
                        </span>
                    </div>
                ))}
            </div>

            <div style={{ borderTop: '2px solid #d1d5dc', paddingTop: '20px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <span style={{ fontSize: '22px' }}>Estimated Total Cost</span>
                    <span style={{ fontSize: '28px', color: '#005bbb', fontWeight: 'bold' }}>
                        ${meal.estimatedTotalCost ? Number(meal.estimatedTotalCost).toFixed(2) : '0.00'} AUD
                    </span>
                </div>
                <button style={{ width: '100%', padding: '15px', background: '#005bbb', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', cursor: 'pointer' }}>
                    Shop Ingredients
                </button>
            </div>
        </div>
    );
}