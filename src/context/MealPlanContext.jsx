// src/contexts/MealPlanContext.jsx

import React, { createContext, useState, useContext, useMemo } from 'react';

// 初始状态
// Daily Plan: { 'Breakfast': mealObject, 'Lunch': mealObject, ...}
const initialDailyPlan = {}; 

// Weekly Plan: { 'Monday': { 'Breakfast': mealObject, ... }, 'Tuesday': {}, ...}
const initialWeeklyPlan = {
    'Monday': {},
    'Tuesday': {},
    'Wednesday': {},
    'Thursday': {},
    'Friday': {},
    'Saturday': {},
    'Sunday': {},
};

// 1. 创建 Context
export const MealPlanContext = createContext(null);

// 2. 创建 Provider
export function MealPlanProvider({ children }) {
    const [dailyPlan, setDailyPlan] = useState(initialDailyPlan);
    const [weeklyPlan, setWeeklyPlan] = useState(initialWeeklyPlan);

    // 添加餐点逻辑 (用于 MealDetail 和 MenuPage 的卡片点击)
    const addMeal = (meal, type, day = null) => {
        // meal 对象必须是 MenuPage 中的完整 meal 对象
        const newMeal = { ...meal, type }; // 确保餐点对象有 type (Breakfast/Lunch/Dinner)

        if (day) { // Weekly Plan
            setWeeklyPlan(prev => ({
                ...prev,
                [day]: {
                    ...prev[day],
                    [type]: newMeal,
                },
            }));
            return `成功添加 [${type}] 到您的 [Weekly Plan] for ${day}！\n 餐点: ${meal.name}`;
        } else { // Daily Plan
            setDailyPlan(prev => ({
                ...prev,
                [type]: newMeal,
            }));
            return `成功添加 [${type}] 到您的 [Today's Plan]！\n 餐点: ${meal.name}`;
        }
    };

    // 从 Daily Plan 删除餐点 (传入餐点类型，如 'Breakfast')
    const deleteDailyMeal = (mealType) => {
        setDailyPlan(prev => {
            const newState = { ...prev };
            delete newState[mealType];
            return newState;
        });
    };

    // 从 Weekly Plan 删除餐点 (传入星期和餐点类型)
    const deleteWeeklyMeal = (day, mealType) => {
        setWeeklyPlan(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [mealType]: null, // 设为 null，让 WeeklyPlan.jsx 知道该槽位为空
            },
        }));
    };

    const contextValue = useMemo(() => ({
        dailyPlan,
        weeklyPlan,
        addMeal,
        deleteDailyMeal,
        deleteWeeklyMeal,
    }), [dailyPlan, weeklyPlan]);

    return (
        <MealPlanContext.Provider value={contextValue}>
            {children}
        </MealPlanContext.Provider>
    );
}

// 3. 自定义 Hook，方便在组件中使用
export function useMealPlan() {
    const context = useContext(MealPlanContext);
    if (!context) {
        throw new Error('useMealPlan must be used within a MealPlanProvider');
    }
    return context;
}