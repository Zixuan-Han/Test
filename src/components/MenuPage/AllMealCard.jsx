// src/components/MenuPage/AllMealCard.jsx
import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import styles from '../../styles/App.module.css'; 
import { IconTextDetail } from './IconTextDetail'; 
import { getMealImage } from '../MenuPage'; 

export const AllMealCard = ({ meal }) => {
    const navigate = useNavigate(); 
    
    const imageSrc = getMealImage(meal.name);

    const handleCardClick = () => {
        navigate(`/meal/${meal.id}`); 
    };

    const TimeIconSVG = (<svg width="17" height="17" viewBox="0 0 17 17" fill="#005BBB"><path d="M8.5 0.5C4.08 0.5 0.5 4.08 0.5 8.5C0.5 12.92 4.08 16.5 8.5 16.5C12.92 16.5 16.5 12.92 16.5 8.5C16.5 4.08 12.92 0.5 8.5 0.5ZM12.75 9.1L8.5 13.35L4.25 9.1H7.5V3.65H9.5V9.1H12.75Z"/></svg>);
    const ServingsIconSVG = (<svg width="17" height="17" viewBox="0 0 17 17" fill="#005BBB"><path d="M14.5 17C12.5 17 11.25 15.75 11.25 14.5C11.25 13.25 12.5 12 14.5 12C16.5 12 17.75 13.25 17.75 14.5C17.75 15.75 16.5 17 14.5 17ZM10.25 12.75V15.75H18.75V12.75H10.25ZM2.75 17C0.75 17 0 15.75 0 14.5C0 13.25 0.75 12 2.75 12C4.75 12 5.5 13.25 5.5 14.5C5.5 15.75 4.75 17 2.75 17ZM0 15.75V12.75H5.5V15.75H0ZM9 7C6.5 7 4.5 5 4.5 2.5C4.5 0 6.5 -1 9 -1C11.5 -1 13.5 0 13.5 2.5C13.5 5 11.5 7 9 7Z"/></svg>);
    const DifficultyIconSVG = (<svg width="17" height="17" viewBox="0 0 17 17" fill="#005BBB"><path d="M12.44 2.21C11.85 1.62 11.05 1.35 10.25 1.35C9.45 1.35 8.65 1.62 8.06 2.21C7.47 2.8 7.2 3.6 7.2 4.4V10.8C7.2 11.6 7.47 12.4 8.06 12.99C8.65 13.58 9.45 13.85 10.25 13.85C11.05 13.85 11.85 13.58 12.44 12.99C13.03 12.4 13.3 11.6 13.3 10.8V4.4C13.3 3.6 13.03 2.8 12.44 2.21Z"/></svg>);


    return (
        <div className={styles.allMealCard} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className={styles.allMealCardImage}>
                <img alt={meal.name} src={imageSrc} /> 
            </div>
            <div className={styles.allMealContent}>
                <h3 className={styles.allMealName}>{meal.name}</h3>
                <div className={styles.allMealDetails}>
                    <IconTextDetail icon={TimeIconSVG} text={meal.time} />
                    <IconTextDetail icon={ServingsIconSVG} text={meal.servings} />
                    <IconTextDetail icon={DifficultyIconSVG} text={meal.difficulty} />
                </div>
                <button className={styles.viewRecipe} onClick={handleCardClick}>View Recipe</button>
            </div>
        </div>
    );
};