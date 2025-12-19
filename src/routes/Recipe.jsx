import React, { useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/App.module.css';
import { Breadcrumb } from '../components/common/Breadcrumb';
import RecipeHeader from '../components/Recipe/RecipeHeader';
import IngredientsCost from '../components/Recipe/IngredientsCost';
import InstructionsList from '../components/Recipe/InstructionsList';
import WarningSection from '../components/Recipe/WarningSection';
import { recommendedMealsData, allMealsData } from '../components/mealData';
import { getMealImage } from './MenuPage';

export default function Recipe() {
    const { mealId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const meal = useMemo(() => {
        if (location.state && location.state.newRecipe) return { ...location.state.newRecipe, id: mealId };
        
        const saved = localStorage.getItem('user_recipes');
        if (saved) {
            const localData = JSON.parse(saved);
            const foundLocal = localData.find(m => String(m.id) === String(mealId));
            if (foundLocal) return foundLocal;
        }

        const allMeals = [...recommendedMealsData, ...allMealsData];
        return allMeals.find(m => String(m.id) === String(mealId));
    }, [mealId, location.state]);

    if (!meal) return <div className={styles.pageContainer}>Meal Not Found</div>;

    const handlePrint = () => window.print();
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Recipe link copied to clipboard!");
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${meal.name}"?`)) {
            const saved = localStorage.getItem('user_recipes');
            if (saved) {
                const localData = JSON.parse(saved).filter(r => String(r.id) !== String(mealId));
                localStorage.setItem('user_recipes', JSON.stringify(localData));
            }
            navigate('/my-recipes');
        }
    };

    const handleEdit = () => {
        navigate(`/edit-recipe/${mealId}`, { state: { currentData: meal } });
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContent}>
                <Breadcrumb crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Recipes', path: '/my-recipes' },
                    { name: meal.name, path: '' }
                ]} />
                <main style={{ padding: '40px 0' }}>
                    <RecipeHeader meal={meal} onPrint={handlePrint} onShare={handleShare} onDelete={handleDelete} onEdit={handleEdit} />
                    <img src={meal.image || getMealImage(meal.name)} alt={meal.name} style={{ width: '100%', height: '450px', objectFit: 'cover', borderRadius: '20px', marginBottom: '40px', border: '1px solid #eee' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '32px', alignItems: 'start' }}>
                        <IngredientsCost meal={meal} />
                        <InstructionsList instructions={meal.instructions} />
                    </div>
                    {meal.warnings && <WarningSection warnings={meal.warnings} />}
                </main>
            </div>
        </div>
    );
}