// src/components/NutritionCalculator/FloatingCalculatorWrapper.jsx
import React from 'react';
import NutritionCalculator from './NutritionCalculator';

export default function FloatingCalculatorWrapper() {
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', flexGrow: 1 }}>
            <NutritionCalculator isFloating={true} />
        </div>
    );
}