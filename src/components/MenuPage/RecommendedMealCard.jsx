// src/components/MenuPage/RecommendedMealCard.jsx
import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/App.module.css';
import { getMealImage } from '../MenuPage'; 

export const RecommendedMealCard = ({ meal }) => {
    const navigate = useNavigate();
    
    const imageSrc = getMealImage(meal.name);

    const handleCardClick = () => {
        navigate(`/meal/${meal.id}`); 
    };

    const timeIcon = (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5.5" stroke="#2B7FFF" strokeWidth="0.9"/>
            <path d="M6 3V6.5L8 8.5" stroke="#2B7FFF" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    return (
        <div className={styles.recCard} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className={styles.recCardImage}>
                <img alt={meal.name} src={imageSrc} /> 
                <div className={styles.recCardTimeTag}>
                    {timeIcon}
                    <p>{meal.time}</p>
                </div>
            </div>
            <div className={styles.recCardContent}>
                <h3 className={styles.recCardName}>{meal.name}</h3>
                <div className={styles.recTags}>
                    {meal.tags.map((tag, idx) => (
                        <span key={idx} className={styles.recTag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};