// src/components/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/App.module.css'; 

import MealPlanningDropdown from './Header/MealPlanningDropdown'; 
import RecipesDropdown from './Header/RecipesDropdown';

const SearchIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);

const MicIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
);

export function Header() {
    return (
        <header className={styles.header} style={{ padding: '10px 20px' }}> 
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}> 
                <Link to="/" style={{ textDecoration: 'none', display: 'flex' }}>
                    <img
                        src="/images/logo.png"   
                        alt="NutriHelp Logo"
                        className={styles.headerLogo}
                        style={{ height: '35px', width: 'auto' }} 
                    />
                </Link>
                
                <nav className={styles.headerNav}>
                    <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', padding: 0, margin: 0, alignItems: 'center' }}>
                        <li>
                            <Link 
                                to="/" 
                                style={{ 
                                    textDecoration: 'none',
                                    color: '#4A5565',
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <MealPlanningDropdown />
                        </li>

                        <li>               
                            <RecipesDropdown />                     
                        </li>

                        <li>
                            <Link 
                                to="/scan"
                                style={{ 
                                    textDecoration: 'none',
                                    color: '#4A5565',
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                Scan
                            </Link>
                        </li>

                        <div style={{ padding: '0 5px', color: '#4A5565', fontSize: '18px', fontWeight: 'bold' }}>···</div>
                    </ul>
                </nav>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}> 
                <div className={styles.headerSearch} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: '25px', padding: '5px 15px', gap: '10px', width: '240px' }}>
                    {SearchIcon}
                    <input type="search" placeholder="Search" style={{ flexGrow: 1, border: 'none', background: 'none', outline: 'none', fontSize: '16px', width: '100%' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4A5565', borderLeft: '1px solid #ccc', paddingLeft: '10px' }}>
                        {MicIcon}
                    </div>
                </div>
                
                <div style={{ display: 'flex', gap: '20px', fontSize: '18px', fontWeight: '500', whiteSpace: 'nowrap' }}>
                    <Link to="/account" style={{ textDecoration: 'none', color: '#4A5565' }}>Account</Link>
                    <Link to="/logout" style={{ textDecoration: 'none', color: '#4A5565' }}>Login out</Link>
                </div>
            </div>
        </header>
    );
}