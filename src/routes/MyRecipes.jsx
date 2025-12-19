import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/App.module.css';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { recommendedMealsData, allMealsData } from '../components/mealData'; //
import { getMealImage } from './MenuPage'; //

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#005BBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const TimeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#005BBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const ServingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#005BBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
  </svg>
);

const DifficultyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#005BBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const STORAGE_KEY = 'user_recipes';
function readLocalRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}
function writeLocalRecipes(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
function mergeRecipes(staticList, localList) {
  const localIds = new Set(localList.map(r => String(r.id)));
  const staticFiltered = staticList.filter(r => !localIds.has(String(r.id)));
  return [...localList, ...staticFiltered];
}

export default function MyRecipes() {
  const navigate = useNavigate();
  const location = useLocation();
  const interFont = { fontFamily: "'Inter', sans-serif" };

  const staticData = useMemo(() => [...recommendedMealsData, ...allMealsData], []);

  const [recipes, setRecipes] = useState(() => {
    const local = readLocalRecipes();
    return mergeRecipes(staticData, local);
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 默认按创建日期
  const [successInfo, setSuccessInfo] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('recipe_success');
      if (!raw) return;
      const info = JSON.parse(raw);
      if (info && info.newRecipe) setSuccessInfo(info);
      sessionStorage.removeItem('recipe_success');
    } catch { }
  }, [location.key]);

  useEffect(() => {
    const legacyNewRecipe = location.state?.newRecipe;
    const legacyIsEdit = location.state?.isEdit;
    if (!legacyNewRecipe) return;
    const saved = readLocalRecipes();
    const filtered = saved.filter(r => String(r.id) !== String(legacyNewRecipe.id));
    const updatedLocal = [legacyNewRecipe, ...filtered];
    writeLocalRecipes(updatedLocal);
    setRecipes(mergeRecipes(staticData, updatedLocal));
    setSuccessInfo({ newRecipe: legacyNewRecipe, isEdit: Boolean(legacyIsEdit) });
  }, [location.state, staticData]);

  const filteredRecipes = useMemo(() => {
    let result = recipes.filter(r =>
      (r.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.category || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'alphabetical') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'cuisine') {
      result.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
    } else if (sortBy === 'date') {
      result.sort((a, b) => String(b.id).localeCompare(String(a.id)));
    }
    return result;
  }, [recipes, searchTerm, sortBy]);

  const handleDelete = (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    const saved = readLocalRecipes();
    const updatedLocal = saved.filter(r => String(r.id) !== String(id));
    writeLocalRecipes(updatedLocal);
    setRecipes(mergeRecipes(staticData, updatedLocal));
  };

  const successRecipe = successInfo?.newRecipe;
  const successIsEdit = Boolean(successInfo?.isEdit);

  return (
    <div className={styles.pageContainer} style={interFont}>
      <div className={styles.mainContent}>
        <Breadcrumb crumbs={[{ name: 'Home', path: '/' }, { name: 'Recipes', path: '' }]} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '40px 0' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '600', margin: 0 }}>My Recipes</h1>
          <button onClick={() => navigate('/create-recipe')} style={createBtnStyle}>
            + Create New Recipe
          </button>
        </div>

        {successRecipe && (
          <div style={newlyCreatedContainerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span style={{ fontSize: '28px' }}>✨</span>
              <h2 style={{ fontSize: '24px', color: '#005BBB', margin: 0, fontWeight: '600' }}>
                {successIsEdit ? 'Successfully Updated!' : 'Successfully Created!'}
              </h2>
              <div style={{ marginLeft: 'auto' }}>
                <button onClick={() => setSuccessInfo(null)} style={closeBtnStyle}>Close</button>
              </div>
            </div>
            <div style={{ maxWidth: '350px' }}>
              <RecipeCard
                recipe={successRecipe}
                onEdit={() => navigate(`/edit-recipe/${successRecipe.id}`, { state: { currentData: successRecipe } })}
                onDelete={() => handleDelete(successRecipe.id, successRecipe.name)}
                onView={() => navigate(`/recipe/${successRecipe.id}`, { state: { newRecipe: successRecipe } })}
                isHighlighted={true}
              />
            </div>
          </div>
        )}

        <div style={filterBarContainerStyle}>
          <div style={searchBoxWrapperStyle}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search my recipes..."
              style={searchFieldInputStyle}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={sortBoxWrapperStyle}>
            <label style={sortLabelTextStyle}>Sort by :</label>
            <select style={sortSelectFieldStyle} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date Created</option>
              <option value="cuisine">Cuisine Type</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        <div style={gridStyle}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={() => navigate(`/edit-recipe/${recipe.id}`, { state: { currentData: recipe } })}
                onDelete={() => handleDelete(recipe.id, recipe.name)}
                onView={() => navigate(`/recipe/${recipe.id}`, { state: { newRecipe: recipe } })}
              />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px', color: '#9CA3AF' }}>
              <p style={{ fontSize: '20px' }}>No recipes found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ recipe, onEdit, onDelete, onView, isHighlighted }) {
  return (
    <div style={{ ...cardStyle, border: isHighlighted ? '2px solid #005BBB' : '1px solid #E5E7EB' }}>
      <div style={{ cursor: 'pointer' }} onClick={onView}>
        <img src={recipe.image || getMealImage(recipe.name)} alt={recipe.name} style={imageStyle} />
        <div style={{ padding: '15px' }}>
          <span style={categoryTagStyle}>{recipe.category || 'General'}</span>
          <h3 style={recipeNameStyle}>{recipe.name}</h3>
          
          <div style={detailRowStyle}>
            <div style={iconTextStyle}><TimeIcon /> <span>{recipe.time}</span></div>
            <div style={iconTextStyle}><ServingsIcon /> <span>{recipe.servings}</span></div>
            <div style={iconTextStyle}><DifficultyIcon /> <span>{recipe.difficulty || 'Medium'}</span></div>
          </div>
        </div>
      </div>

      <div style={actionRowStyle}>
        <button onClick={onEdit} style={editButtonStyle}>
          <EditIcon /> <span>Edit</span>
        </button>
        <button onClick={onDelete} style={deleteButtonStyle}>
          <TrashIcon /> <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

const newlyCreatedContainerStyle = { backgroundColor: '#E8F1FF', borderRadius: '24px', padding: '30px 40px', marginBottom: '40px', border: '2px dashed #005BBB' };
const closeBtnStyle = { border: '1px solid #D1D5DC', background: 'white', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer' };
const createBtnStyle = { backgroundColor: '#005BBB', color: 'white', padding: '12px 28px', borderRadius: '30px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', fontFamily: "'Inter', sans-serif" };

const filterBarContainerStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', gap: '15px' };
const searchBoxWrapperStyle = { display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '10px 15px', borderRadius: '8px', border: '1px solid #E5E7EB', flex: 1, gap: '10px' };
const searchFieldInputStyle = { border: 'none', background: 'transparent', width: '100%', fontSize: '14px', outline: 'none', color: '#6B7280' };
const sortBoxWrapperStyle = { display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '10px 15px', borderRadius: '8px', border: '1px solid #E5E7EB', gap: '10px', minWidth: '220px' };
const sortLabelTextStyle = { fontSize: '14px', color: '#9CA3AF', whiteSpace: 'nowrap' };
const sortSelectFieldStyle = { border: 'none', outline: 'none', fontSize: '14px', color: '#9CA3AF', backgroundColor: 'transparent', cursor: 'pointer', width: '100%' };

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', paddingBottom: '80px' };
const cardStyle = { backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };
const imageStyle = { width: '100%', height: '200px', objectFit: 'cover' };
const categoryTagStyle = { fontSize: '12px', color: '#005BBB', backgroundColor: '#E8F1FF', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', textTransform: 'uppercase' };
const recipeNameStyle = { fontSize: '18px', margin: '10px 0', fontWeight: '600', color: '#1A1A1A', minHeight: '45px', lineHeight: '1.3' };
const actionRowStyle = { display: 'flex', borderTop: '1px solid #F3F4F6', padding: '15px', gap: '12px' };

const editButtonStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  backgroundColor: '#E8F1FF',
  color: '#005BBB',
  border: 'none',
  padding: '10px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  fontFamily: "'Inter', sans-serif"
};

const deleteButtonStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  backgroundColor: '#005BBB',
  color: '#ffffff',
  border: 'none',
  padding: '10px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  fontFamily: "'Inter', sans-serif"
};

const detailRowStyle = { display: 'flex', justifyContent: 'space-between', marginTop: '10px' };
const iconTextStyle = { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#5A5A5A' };

