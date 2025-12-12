// src/components/Breadcrumb.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ChevronRightSVG = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#687385" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);


export const Breadcrumb = ({ crumbs = [] }) => {
    return (
        <div style={{ padding: '20px 0', fontSize: '16px', display: 'flex', alignItems: 'center', margin: '0 auto', maxWidth: '1280px' }}>
            {crumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                    <Link 
                        to={crumb.path} 
                        style={{ 
                            color: index === crumbs.length - 1 ? '#005bbb' : '#687385', 
                            fontWeight: index === crumbs.length - 1 ? '600' : '400',
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '300px' 
                        }}
                    >
                        {crumb.name}
                    </Link>
                    {index < crumbs.length - 1 && (
                        <span style={{ margin: '0 8px', width: '12px', height: '12px', display: 'flex', alignItems: 'center' }}>
                            {ChevronRightSVG}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};