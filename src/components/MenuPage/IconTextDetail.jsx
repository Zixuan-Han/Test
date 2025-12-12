// src/components/MenuPage/IconTextDetail.jsx
import React from 'react';
import styles from '../../styles/App.module.css'; 

export const IconTextDetail = ({ icon, text }) => {
    return (
        <div className={styles.detailItem}>
            {icon}
            <p>{text}</p>
        </div>
    );
};