// src/components/MealDetail/TabContentArea.jsx
import React from 'react';

const NutritionContent = ({ meal }) => (
    <div style={{ padding: '25px 0' }}>
        <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px'}}>Complete Nutritional Information</h3>
        {[
            { label: 'Calories', value: `${meal?.calories || 280} kcal` },
            { label: 'Protein', value: `${meal?.protein || 8} g` },
            { label: 'Carbohydrates', value: `${meal?.carbs || 45} g` },
            { label: 'Fiber', value: `${meal?.fiber || 9} g` },
            { label: 'Total Fat', value: `${meal?.fat || 7} g` },
            { label: 'Sodium', value: `${meal?.sodium || 80} mg` }
        ].map((item, index) => (
            <div key={index} style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ccc'}}>
                <p style={{fontSize: '22px', color: '#364153'}}>{item.label}</p>
                <p style={{fontSize: '22px', fontWeight: 'bold'}}>{item.value}</p>
            </div>
        ))}
    </div>
);

const BenefitsContent = ({ meal }) => (
    <div style={{ padding: '25px 0' }}>
        <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '15px'}}>Health Benefits</h3>
        <p style={{ color: '#364153', fontSize: '18px' }}>
            {meal?.healthBenefits || "This meal provides essential nutrients to support overall health and energy levels throughout the day."}
        </p>
    </div>
);

const AllergensContent = ({ meal }) => (
    <div style={{ padding: '25px 0' }}>
        <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '15px'}}>Allergens & Dietary Info</h3>
        <p style={{ color: '#364153', fontSize: '18px' }}>
            {meal?.allergens || "Always check labels for accurate dietary information."}
        </p>
    </div>
);

export default function TabContentArea({ activeTab, setActiveTab, meal }) {
    const tabNames = ['Nutritional Info', 'Health Benefits', 'Allergens & Dietary Info'];
    
    let Content;
    switch (activeTab) {
        case 'Nutritional Info': Content = <NutritionContent meal={meal} />; break;
        case 'Health Benefits': Content = <BenefitsContent meal={meal} />; break;
        case 'Allergens & Dietary Info': Content = <AllergensContent meal={meal} />; break;
        default: Content = <NutritionContent meal={meal} />;
    }

    return (
        <div style={{ marginTop: '50px', marginBottom: '50px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '20px' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
                {tabNames.map(name => (
                    <button key={name} onClick={() => setActiveTab(name)} style={{ flex: 1, padding: '20px 0', fontSize: '24px', fontWeight: 'bold', color: activeTab === name ? '#005bbb' : '#4a5565', borderBottom: activeTab === name ? '4px solid #005bbb' : '4px solid transparent', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {name}
                    </button>
                ))}
            </div>
            <div style={{ padding: '30px' }}>{Content}</div>
        </div>
    );
}