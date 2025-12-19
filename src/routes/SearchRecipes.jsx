import React, { useState, useEffect, useMemo } from 'react';
import styles from '../styles/App.module.css';
import { Breadcrumb } from '../components/common/Breadcrumb';
import SearchBarArea from '../components/SearchRecipes/SearchBarArea';
import CategoryFilter from '../components/SearchRecipes/CategoryFilter';
import RecipeGrid from '../components/SearchRecipes/RecipeGrid';
import { recommendedMealsData, allMealsData } from "../components/mealData";

export default function SearchRecipes() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [randomRecipes, setRandomRecipes] = useState([]);

    const allRecipes = useMemo(() => {
        const saved = localStorage.getItem('user_recipes');
        const localRecipes = saved ? JSON.parse(saved) : [];
        return [...localRecipes, ...recommendedMealsData, ...allMealsData];
    }, []);

    useEffect(() => {
        const shuffled = [...allRecipes].sort(() => 0.5 - Math.random());
        setRandomRecipes(shuffled.slice(0, 6));
    }, [allRecipes]);

    const filteredRecipes = useMemo(() => {
        if (!searchQuery && activeCategory === 'All') return randomRecipes;
        return allRecipes.filter(meal => {
            const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || meal.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory, allRecipes, randomRecipes]);

    const getDynamicTitle = () => {
        if (searchQuery) return `Results for '${searchQuery}'`;
        if (activeCategory !== 'All') return `${activeCategory} Recipes`;
        return 'Recommended Recipes';
    };

    return (
        <div className={styles.pageContainer} style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <div className={styles.mainContent}>
                <Breadcrumb crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Recipes', path: '/my-recipes' },
                    { name: 'Search Recipes', path: '' }
                ]} />
                <h1 style={{ textAlign: 'center', fontSize: '48px', fontWeight: 'bold', margin: '40px 0' }}>Recipes</h1>
                <SearchBarArea searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <div style={{ marginTop: '50px' }}>
                    <h2 style={{ fontSize: '30px', marginBottom: '30px', fontWeight: 'bold' }}>{getDynamicTitle()}</h2>
                    <RecipeGrid recipes={filteredRecipes} />
                </div>
            </div>
        </div>
    );
}