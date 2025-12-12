// src/components/MenuPage/FilterButton.jsx
import React from 'react';
import styles from '../../styles/App.module.css'; 

export const FilterButton = ({ type, isSelected, onClick }) => {
    const buttonClass = isSelected ? styles.filterButtonActive : styles.filterButton;

    return (
        <button
            onClick={() => onClick(type)}
            className={buttonClass}
        >
            {type}
        </button>
    );
};