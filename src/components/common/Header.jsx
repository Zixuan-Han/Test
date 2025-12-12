// src/components/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/App.module.css'; 


import MealPlanningDropdown from './Header/MealPlanningDropdown'; 



const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Recipes', path: '/recipes' }, 
    { name: 'Scan', path: '/scan' }, 
];

const SearchIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);


export function Header() {
    return (
        <header className={styles.header}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img
                        src="/images/logo.png"   
                        alt="NutriHelp Logo"
                        className={styles.headerLogo}
                    />
                </Link>
                
                <nav className={styles.headerNav}>
                    <ul style={{ listStyle: 'none', display: 'flex', gap: '30px', padding: 0, margin: 0 }}>
                        <li>
                            <Link 
                                to="/" 
                                style={{ 
                                    textDecoration: 'none',
                                    color: '#4A5565',
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    paddingBottom: '5px'
                                }}
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <MealPlanningDropdown />
                        </li>

                        <li>
                            <Link 
                                to="/recipes"
                                style={{ 
                                    textDecoration: 'none',
                                    color: '#4A5565',
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    paddingBottom: '5px'
                                }}
                            >
                                Recipes
                            </Link>
                        </li>

                        <li>
                            <Link 
                                to="/scan"
                                style={{ 
                                    textDecoration: 'none',
                                    color: '#4A5565',
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    paddingBottom: '5px'
                                }}
                            >
                                Scan
                            </Link>
                        </li>

                        <div style={{ padding: '0 5px', color: '#4A5565' }}>...</div>
                    </ul>

                </nav>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <div className={styles.headerSearch}>
                    {SearchIcon}
                    <input type="search" placeholder="Search" style={{ flexGrow: 1, border: 'none', background: 'none' }} />
                    <div style={{ padding: '0 5px' }}>Mic</div>
                </div>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link to="/account" style={{ textDecoration: 'none', color: '#4A5565' }}>Account</Link>
                    <Link to="/logout" style={{ textDecoration: 'none', color: '#4A5565' }}>Login out</Link>
                </div>
            </div>
        </header>
    );
}