// src/components/common/Header/MealPlanningDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChevronDown = (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4A5565" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

export default function MealPlanningDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const menuItems = [
        { name: 'Menu', path: '/menu' }, 
        { name: 'Daily Plan', path: '/daily-plan' },
        { name: 'Weekly Plan', path: '/weekly-plan' } 
    ];
    
    const linkStyle = {
        textDecoration: 'none', 
        color: '#4A5565', 
        fontSize: '18px', 
        fontWeight: '500',
        padding: '0',
        fontFamily: "'Inter', sans-serif"
    };

    return (
        <div ref={dropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '2px' }}>
            
            <Link
                to="/plan"
                style={linkStyle}
            >
                Meal Planning
            </Link>

            <button
                onClick={toggleDropdown}
                style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '2px 5px 0 0', height: '100%', display: 'flex', alignItems: 'center'
                }}
            >
                {ChevronDown}
            </button>


            {isOpen && (
                <div style={{
                    position: 'absolute', top: '100%', left: '0', zIndex: 100,
                    backgroundColor: 'white', border: '1px solid #ccc',
                    borderRadius: '8px', minWidth: '180px', marginTop: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            style={{
                                display: 'block', padding: '10px 15px',
                                textDecoration: 'none', color: '#1E1E1E',
                                fontSize: '16px',
                                fontFamily: "'Inter', sans-serif",
                                borderBottom: index < menuItems.length - 1 ? '1px solid #eee' : 'none'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}