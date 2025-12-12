// src/components/Plan.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/App.module.css';

import { Breadcrumb } from './common/Breadcrumb'; 

import GoalSummary from './Plan/GoalSummary';
import GoalSettings from './Plan/GoalSettings';
import PreferenceSettings from './Plan/PreferenceSettings';


export default function Plan() {
    const navigate = useNavigate();
    const planCompletionPercent = 72;

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleAddClick = (type) => {
        alert(`System prompt: New ${type} settings saved successfully.`);
    };
    
    const planCrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Meal Planning', path: '/plan' }, 
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContent}>
                
                <Breadcrumb crumbs={planCrumbs} />
                
                <main style={{ paddingTop: '30px', paddingBottom: '80px' }}>
                    
                    <h2 style={{ fontSize: '30px', fontWeight: 'normal', marginBottom: '20px' }}>Plan</h2>

                    <GoalSummary 
                        completion={planCompletionPercent} 
                        onGoToDailyPlan={() => handleNavigation('/daily-plan')}
                    />

                    <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '50px' }}>

                        <section>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Your Goals</h2>
                            <GoalSettings onAdd={handleAddClick} />
                        </section>

                        <section>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Your Preferences</h2>
                            <PreferenceSettings onAdd={handleAddClick} />
                        </section>
                        
                        <section>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Manage Your Plan</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                                
                                <PlanNavigationCard
                                    title="Daily Plan"
                                    description="Review and adjust today's meals."
                                    buttonText="Open Daily Plan"
                                    onClick={() => handleNavigation('/daily-plan')}
                                />

                                <PlanNavigationCard
                                    title="Weekly Plan"
                                    description="Review and adjust your week."
                                    buttonText="Open Weekly Plan"
                                    onClick={() => handleNavigation('/weekly-plan')}
                                />
                            </div>
                        </section>
                        
                        <div style={{ paddingBottom: '20px' }}>
                            
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

const PlanNavigationCard = ({ title, description, buttonText, onClick }) => (
    <div style={{ background: 'white', border: '1px solid #ccc', borderRadius: '12px', padding: '40px' }}>
        <h3 style={{ fontSize: '22px', color: '#111111', marginBottom: '10px' }}>{title}</h3>
        <p style={{ fontSize: '18px', color: '#687385', marginBottom: '30px' }}>{description}</p>
        <button 
            onClick={onClick}
            style={{ background: '#005bbb', color: 'white', padding: '10px 40px', borderRadius: '999px', fontSize: '18px', fontWeight: 'normal', border: 'none', cursor: 'pointer' }}
        >
            {buttonText}
        </button>
    </div>
);
