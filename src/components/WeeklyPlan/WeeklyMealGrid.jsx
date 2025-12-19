// src/components/WeeklyPlan/WeeklyMealGrid.jsx
import React from 'react';
import WeeklyMealCell from './WeeklyMealCell';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

const MEAL_CELL_HEIGHT = '300px'; 
const MEAL_CELL_MARGIN = '70px'; 
const FIXED_COLUMN_WIDTH = '120px';

export default function WeeklyMealGrid({ meals, handleCellAction }) {
    
    const gridTemplateColumns = `${FIXED_COLUMN_WIDTH} repeat(${DAYS_OF_WEEK.length}, 1fr)`;
    
    const columnStyles = {
        padding: '20px 10px', 
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '20px' }}>
            
            <div 
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: gridTemplateColumns, 
                    minWidth: '1200px', 
                    borderRadius: '16px', 
                    backgroundColor: 'white' 
                }}
            >
    
                <div style={{ 
                    height: '40px',
                    position: 'sticky', 
                    left: 0, 
                    zIndex: 10,
                    backgroundColor: 'white'
                }}></div> 
                
                {DAYS_OF_WEEK.map(day => (
                    <div 
                        key={day} 
                        style={{ 
                            ...columnStyles, 
                            height: '40px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '24px',
                            backgroundColor: 'white'
                        }}
                    >
                        {day}
                    </div>
                ))}

                {MEAL_TYPES.map(mealType => (
                    <React.Fragment key={mealType}>
                        
                        <div 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'center', 
                                fontWeight: 'normal',
                                fontSize: '24px',
                                
                                position: 'sticky', 
                                left: 0, 
                                zIndex: 5,
                                backgroundColor: 'white',
                                
                                height: `calc(${MEAL_CELL_HEIGHT} + 20px + ${MEAL_CELL_MARGIN})`,  
                            }}
                        >
                            {mealType}
                        </div>
                        
                        {DAYS_OF_WEEK.map(day => (
                            <div 
                                key={`${day}-${mealType}`} 
                                style={{ 
                                    padding: '20px 10px',
                                    marginBottom: mealType !== 'Dinner' ? MEAL_CELL_MARGIN : '0' 
                                }}
                            >
                                <WeeklyMealCell
                                    meal={meals[day]?.[mealType]}
                                    day={day}
                                    mealType={mealType}
                                    handleCellAction={handleCellAction}
                                />
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}