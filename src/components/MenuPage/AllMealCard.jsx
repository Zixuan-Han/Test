// src/components/MenuPage/AllMealCard.jsx
import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import styles from '../../styles/App.module.css'; 
import { IconTextDetail } from './IconTextDetail'; 
import { getMealImage } from '../../routes/MenuPage'; 

export const AllMealCard = ({ meal }) => {
    const navigate = useNavigate(); 
    
    const imageSrc = getMealImage(meal.name);

    const handleViewRecipeClick = (e) => {
        e.stopPropagation(); 
        navigate(`/meal/${meal.id}`); 
    };

    const handleCardClick = () => {
        navigate(`/meal/${meal.id}`); 
    };


    const TimeIconSVG = (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#005BBB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    );

    const ServingsIconSVG = (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#005BBB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
        </svg>
    );

    const DifficultyIconSVG = (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#005BBB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
    );

    return (
        <div 
            className={styles.allMealCard} 
            onClick={handleCardClick} 
            style={{ 
                cursor: 'pointer',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                height: '100%' 
            }}
        >
            <div className={styles.allMealCardImage}>
                <img alt={meal.name} src={imageSrc} /> 
            </div>
            
            <div className={styles.allMealContent} style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                
                <div style={{ marginBottom: '5px', flexGrow: 1 }}> 
                    <h3 
                        className={styles.allMealName} 
                        style={{ 
                            fontSize: '18px', 
                            lineHeight: '1.3', 
                            minHeight: '45px', 
                            marginBottom: '2px' 
                        }}
                    >
                        {meal.name}
                    </h3>
                    
                    <div 
                        className={styles.allMealDetails} 
                        style={{ 
                            marginTop: '2px', 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            minHeight: '20px' 
                        }}
                    >
                        <IconTextDetail icon={TimeIconSVG} text={meal.time} />
                        <IconTextDetail icon={ServingsIconSVG} text={meal.servings} />
                        <IconTextDetail icon={DifficultyIconSVG} text={meal.difficulty} />
                    </div>
                </div>
                
            </div>
        </div>
    );
};