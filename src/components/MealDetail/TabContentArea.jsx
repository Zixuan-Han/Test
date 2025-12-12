// src/components/MealDetail/TabContentArea.jsx
import React from 'react';

const NutritionContent = () => (
    <div style={{ padding: '25px 0' }}>
        <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px'}}>Complete Nutritional Information</h3>
        
        {[{ label: 'Calories', value: '280 kcal' }, { label: 'Protein', value: '8 g' }, { label: 'Carbohydrates', value: '45 g' }, { label: 'Fiber', value: '9 g' }].map((item, index) => (
            <div key={index} style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ccc'}}>
                <p style={{fontSize: '22px', color: '#364153'}}>{item.label}</p>
                <p style={{fontSize: '22px', fontWeight: 'bold'}}>{item.value}</p>
            </div>
        ))}
        
        <h4 style={{fontSize: '24px', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px'}}>Vitamins & Minerals</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {['Vitamin B1 (Thiamine): High', 'Vitamin B6: Moderate', 'Vitamin C', 'Vitamin K'].map((v, i) => (
                <li key={i} style={{ color: '#364153', fontSize: '22px', padding: '5px 0' }}>• {v}</li>
            ))}
        </ul>
    </div>
);

const BenefitsContent = () => (
    <div style={{ padding: '25px 0' }}>
        <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '15px'}}>Health Benefits</h3>
        <p style={{ color: '#364153', fontSize: '18px' }}>This oatmeal is rich in Omega-3 fatty acids and dietary fiber, which helps lower cholesterol, promotes digestive health, and is a heart-friendly choice.</p>
    </div>
);

const AllergensContent = () => (
    <div style={{ padding: '25px 0' }}>
        <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '15px'}}>Allergens & Dietary Info</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#364153', fontSize: '18px' }}>
            <li>Major Allergens: May contain trace amounts of gluten.</li>
            <li>Dietary Preference: Vegetarian-friendly.</li>
            <li>GI Value: Low (Low GI).</li>
        </ul>
    </div>
);

export default function TabContentArea({ activeTab, setActiveTab }) {
    const tabNames = ['Nutritional Info', 'Health Benefits', 'Allergens & Dietary Info'];
    
    let ContentComponent;
    switch (activeTab) {
        case 'Nutritional Info':
            ContentComponent = NutritionContent;
            break;
        case 'Health Benefits':
            ContentComponent = BenefitsContent;
            break;
        case 'Allergens & Dietary Info':
            ContentComponent = AllergensContent;
            break;
        default:
            ContentComponent = NutritionContent;
    }

    return (
        <div style={{ marginTop: '50px', marginBottom: '50px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '20px' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
                {tabNames.map(name => (
                    <button
                        key={name}
                        onClick={() => setActiveTab(name)}
                        style={{
                            flex: 1,
                            padding: '20px 0',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: activeTab === name ? '#005bbb' : '#4a5565',
                            borderBottom: activeTab === name ? '4px solid #005bbb' : '4px solid transparent',
                            transition: 'color 0.2s, border-bottom 0.2s'
                        }}
                    >
                        {name}
                    </button>
                ))}
            </div>
            
            <div style={{ padding: '30px' }}>
                <ContentComponent />
            </div>
        </div>
    );
}