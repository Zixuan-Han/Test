import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/App.module.css';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { recommendedMealsData, allMealsData } from '../components/mealData';

const STORAGE_KEY = 'user_recipes';

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#005BBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

function readLocalRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalRecipes(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function normalizeNumberString(value) {
  return String(value ?? '').replace(/[^0-9.]/g, '');
}

function toMinsString(v) {
  const n = normalizeNumberString(v);
  return n ? `${n} mins` : '';
}

function toServingsString(v) {
  const n = normalizeNumberString(v);
  if (!n) return '';
  return Number(n) === 1 ? `${n} serving` : `${n} servings`;
}

export default function CreateRecipe() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const mealId = params.mealId || params.id;

  const interFont = { fontFamily: "'Inter', sans-serif" };
  const mealTimeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const countries = ['American', 'Chinese', 'French', 'Italian', 'Japanese', 'Mexican', 'Middle Eastern', 'Thai', 'Vietnamese'];

  const staticData = useMemo(() => [...recommendedMealsData, ...allMealsData], []);

  const isEditMode = Boolean(mealId || location.state?.currentData?.id);

  const [recipeData, setRecipeData] = useState({
    name: '',
    category: '',
    type: [],
    time: '',
    servings: '',
    difficulty: 'Medium',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    sodium: '',
    estimatedTotalCost: '',
    ingredients: [{ name: '', amount: '', cost: '' }],
    instructions: [''],
    warnings: [{ type: '', text: '' }],
    image: null
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEditMode) return;

    const fromState = location.state?.currentData;
    if (fromState) {
      setRecipeData({
        ...fromState,
        time: normalizeNumberString(fromState.time),
        servings: normalizeNumberString(fromState.servings),
        ingredients: fromState.ingredients?.length ? fromState.ingredients : [{ name: '', amount: '', cost: '' }],
        instructions: fromState.instructions?.length ? fromState.instructions : [''],
        warnings: fromState.warnings?.length ? fromState.warnings : [{ type: '', text: '' }],
        type: Array.isArray(fromState.type) ? fromState.type : (fromState.type ? [fromState.type] : [])
      });
      return;
    }

    const idToFind = mealId || location.state?.currentData?.id;
    if (!idToFind) return;

    const local = readLocalRecipes();
    const localHit = local.find(r => String(r.id) === String(idToFind));
    const staticHit = staticData.find(r => String(r.id) === String(idToFind));
    const found = localHit || staticHit;
    if (!found) return;

    setRecipeData({
      ...found,
      time: normalizeNumberString(found.time),
      servings: normalizeNumberString(found.servings),
      ingredients: found.ingredients?.length ? found.ingredients : [{ name: '', amount: '', cost: '' }],
      instructions: found.instructions?.length ? found.instructions : [''],
      warnings: found.warnings?.length ? found.warnings : [{ type: '', text: '' }],
      type: Array.isArray(found.type) ? found.type : (found.type ? [found.type] : [])
    });
  }, [isEditMode, mealId, location.state, staticData]);

  const handleAICalculate = () => {
    const hasIngredients = recipeData.ingredients.some(ing => (ing.name || '').trim() !== '');
    if (!hasIngredients) {
      alert('Please provide ingredients first.');
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      let totalCal = 0;
      let totalPro = 0;
      let totalCost = 0;

      const updatedIngredients = recipeData.ingredients.map(ing => {
        const numericWeight = parseFloat(normalizeNumberString(ing.amount)) || 0;
        const itemCost = (numericWeight * 0.025).toFixed(2);

        totalCost += parseFloat(itemCost);
        totalCal += numericWeight * 2.5;
        totalPro += numericWeight * 0.12;

        return { ...ing, cost: itemCost };
      });

      setRecipeData(prev => ({
        ...prev,
        ingredients: updatedIngredients,
        calories: String(Math.round(totalCal)),
        protein: String(Math.round(totalPro)),
        estimatedTotalCost: totalCost.toFixed(2)
      }));

      setIsCalculating(false);
    }, 900);
  };

  const handleSave = () => {
    if (!recipeData.name?.trim() || !recipeData.time || !recipeData.servings) {
      const nextErrors = {
        name: !recipeData.name?.trim(),
        time: !recipeData.time,
        servings: !recipeData.servings
      };
      setErrors(nextErrors);
      alert('Please fill in required fields.');
      return;
    }

    const targetId = mealId || location.state?.currentData?.id || recipeData.id || Date.now().toString();

    const finalData = {
      ...recipeData,
      id: targetId,
      time: toMinsString(recipeData.time),
      servings: toServingsString(recipeData.servings)
    };

    const saved = readLocalRecipes();
    const filtered = saved.filter(r => String(r.id) !== String(finalData.id));
    const updatedLocal = [finalData, ...filtered];
    writeLocalRecipes(updatedLocal);

    sessionStorage.setItem(
      'recipe_success',
      JSON.stringify({ newRecipe: finalData, isEdit: isEditMode })
    );

    navigate('/my-recipes');
  };

  return (
    <div className={styles.pageContainer} style={interFont}>
      <div className={styles.mainContent}>
        <Breadcrumb
          crumbs={[
            { name: 'Home', path: '/' },
            { name: 'Recipes', path: '/my-recipes' },
            { name: isEditMode ? 'Edit Recipe' : 'Create Recipe', path: '' }
          ]}
        />

        <h1 style={{ textAlign: 'center', fontSize: '36px', margin: '40px 0', fontWeight: '600', ...interFont }}>
          {isEditMode ? 'Edit Recipe' : 'Create Recipe'}
        </h1>

        {/* Basic Info */}
        <div style={cardStyle}>
          <h3 style={{ ...sectionTitleStyle, ...interFont }}>Basic Information</h3>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ ...labelStyle, ...interFont }}>Recipe Name *</label>
            <input
              type="text"
              style={{ ...inputStyle, ...interFont, borderColor: errors.name ? '#EF4444' : '#D1D5DC' }}
              value={recipeData.name}
              onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ ...labelStyle, ...interFont }}>Cuisine *</label>
              <input
                list="clist"
                placeholder="Search..."
                style={{ ...inputStyle, ...interFont }}
                value={recipeData.category}
                onChange={(e) => setRecipeData({ ...recipeData, category: e.target.value })}
              />
              <datalist id="clist">
                {countries.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div>
              <label style={{ ...labelStyle, ...interFont }}>Meal Time *</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {mealTimeOptions.map(o => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setRecipeData(prev => ({
                      ...prev,
                      type: (prev.type || []).includes(o)
                        ? prev.type.filter(x => x !== o)
                        : [...(prev.type || []), o]
                    }))}
                    style={{
                      ...tagStyle,
                      ...interFont,
                      backgroundColor: (recipeData.type || []).includes(o) ? '#005BBB' : 'white',
                      color: (recipeData.type || []).includes(o) ? 'white' : '#4A5565'
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
            <div>
              <label style={{ ...labelStyle, ...interFont }}>Cooking Time (mins) *</label>
              <input
                type="number"
                style={{ ...inputStyle, ...interFont, borderColor: errors.time ? '#EF4444' : '#D1D5DC' }}
                value={recipeData.time}
                onChange={(e) => setRecipeData({ ...recipeData, time: e.target.value })}
              />
            </div>

            <div>
              <label style={{ ...labelStyle, ...interFont }}>Serving Size *</label>
              <select
                style={{ ...inputStyle, ...interFont, borderColor: errors.servings ? '#EF4444' : '#D1D5DC' }}
                value={recipeData.servings}
                onChange={(e) => setRecipeData({ ...recipeData, servings: e.target.value })}
              >
                <option value="">Select servings</option>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'serving' : 'servings'}</option>)}
              </select>
            </div>
          </div>

          <div>
            <input
              type="file"
              id="pic"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => setRecipeData({ ...recipeData, image: reader.result });
                reader.readAsDataURL(file);
              }}
            />
            <label htmlFor="pic" style={{ ...uploadBtnStyle, ...interFont }}>
              <UploadIcon />
              <span style={{ marginLeft: '10px' }}>Upload Image</span>
            </label>
            {recipeData.image && <img src={recipeData.image} alt="preview" style={previewImgStyle} />}
          </div>
        </div>

        {/* Ingredients */}
        <div style={cardStyle}>
          <h3 style={{ ...sectionTitleStyle, ...interFont }}>Ingredients & Cost Analysis</h3>

          {(recipeData.ingredients || []).map((ing, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '15px', marginBottom: '15px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Ingredient"
                style={{ ...inputStyle, ...interFont, flex: 2 }}
                value={ing.name || ''}
                onChange={(e) => {
                  const list = [...recipeData.ingredients];
                  list[idx] = { ...list[idx], name: e.target.value };
                  setRecipeData({ ...recipeData, ingredients: list });
                }}
              />

              <input
                type="text"
                placeholder="Amount (e.g. 200g)"
                style={{ ...inputStyle, ...interFont, flex: 1 }}
                value={ing.amount || ''}
                onChange={(e) => {
                  const list = [...recipeData.ingredients];
                  list[idx] = { ...list[idx], amount: e.target.value };
                  setRecipeData({ ...recipeData, ingredients: list });
                }}
              />

              <div style={{ ...inputStyle, ...interFont, flex: 1, backgroundColor: '#F9FAFB', color: '#005BBB', display: 'flex', alignItems: 'center' }}>
                $ {ing.cost || '0.00'}
              </div>

              <button
                onClick={() => {
                  if (recipeData.ingredients.length <= 1) return;
                  setRecipeData({ ...recipeData, ingredients: recipeData.ingredients.filter((_, i) => i !== idx) });
                }}
                style={iconBtnStyle}
                type="button"
              >
                <TrashIcon />
              </button>
            </div>
          ))}

          <button
            onClick={() => setRecipeData({ ...recipeData, ingredients: [...recipeData.ingredients, { name: '', amount: '', cost: '' }] })}
            style={{ ...addBtnStyle, ...interFont }}
            type="button"
          >
            + Add Ingredient
          </button>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'center' }}>
            <h3 style={{ ...sectionTitleStyle, ...interFont }}>AI Smart Analysis</h3>
            <button onClick={handleAICalculate} disabled={isCalculating} style={{ ...aiBtnStyle, ...interFont }} type="button">
              {isCalculating ? '⚡ Analyzing...' : '✨ AI Smart Calculate'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
            {['calories', 'protein', 'carbs', 'fat'].map(f => (
              <div key={f}>
                <label style={{ ...labelStyle, ...interFont }}>{f.toUpperCase()}</label>
                <input type="text" style={{ ...readOnlyStyle, ...interFont }} value={recipeData[f] || ''} readOnly />
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ ...sectionTitleStyle, ...interFont }}>Allergy & Dietary Warnings</h3>

          {(recipeData.warnings || []).map((warn, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Type"
                style={{ ...inputStyle, ...interFont, flex: 1 }}
                value={warn.type || ''}
                onChange={(e) => {
                  const list = [...recipeData.warnings];
                  list[idx] = { ...list[idx], type: e.target.value };
                  setRecipeData({ ...recipeData, warnings: list });
                }}
              />

              <input
                type="text"
                placeholder="Detail"
                style={{ ...inputStyle, ...interFont, flex: 2 }}
                value={warn.text || ''}
                onChange={(e) => {
                  const list = [...recipeData.warnings];
                  list[idx] = { ...list[idx], text: e.target.value };
                  setRecipeData({ ...recipeData, warnings: list });
                }}
              />

              <button
                onClick={() => {
                  if (recipeData.warnings.length <= 1) return;
                  setRecipeData({ ...recipeData, warnings: recipeData.warnings.filter((_, i) => i !== idx) });
                }}
                style={iconBtnStyle}
                type="button"
              >
                <TrashIcon />
              </button>
            </div>
          ))}

          <button
            onClick={() => setRecipeData({ ...recipeData, warnings: [...(recipeData.warnings || []), { type: '', text: '' }] })}
            style={{ ...addBtnStyle, ...interFont }}
            type="button"
          >
            + Add Warning
          </button>
        </div>

        <div style={cardStyle}>
          <h3 style={{ ...sectionTitleStyle, ...interFont }}>Recipe Steps</h3>

          {(recipeData.instructions || []).map((step, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <textarea
                placeholder={`Step ${idx + 1}`}
                style={{ ...inputStyle, ...interFont, height: '60px', flex: 1 }}
                value={step || ''}
                onChange={(e) => {
                  const list = [...recipeData.instructions];
                  list[idx] = e.target.value;
                  setRecipeData({ ...recipeData, instructions: list });
                }}
              />

              <button
                onClick={() => {
                  if (recipeData.instructions.length <= 1) return;
                  setRecipeData({ ...recipeData, instructions: recipeData.instructions.filter((_, i) => i !== idx) });
                }}
                style={iconBtnStyle}
                type="button"
              >
                <TrashIcon />
              </button>
            </div>
          ))}

          <button
            onClick={() => setRecipeData({ ...recipeData, instructions: [...(recipeData.instructions || []), ''] })}
            style={{ ...addBtnStyle, ...interFont }}
            type="button"
          >
            + Add Step
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px', paddingBottom: '80px' }}>
          <button onClick={handleSave} style={{ ...actionBtnStyle, ...interFont, backgroundColor: '#005BBB', color: 'white' }} type="button">
            Save Recipe
          </button>
          <button onClick={() => navigate(-1)} style={{ ...actionBtnStyle, ...interFont, backgroundColor: '#E8F1FF', color: '#111' }} type="button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}


const cardStyle = { backgroundColor: 'white', borderRadius: '16px', padding: '40px 50px', marginBottom: '30px', border: '1px solid #E5E7EB' };
const sectionTitleStyle = { fontSize: '24px', fontWeight: '600', marginBottom: '20px' };
const labelStyle = { display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4A5565' };
const inputStyle = { width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #D1D5DC', fontSize: '15px', outline: 'none' };
const readOnlyStyle = { ...inputStyle, backgroundColor: '#F3F4F6' };
const tagStyle = { padding: '8px 16px', borderRadius: '20px', border: '1px solid #D1D5DC', cursor: 'pointer' };
const uploadBtnStyle = { display: 'inline-flex', alignItems: 'center', padding: '10px 20px', border: '1.5px solid #005BBB', borderRadius: '10px', color: '#005BBB', cursor: 'pointer', fontWeight: '600' };
const previewImgStyle = { height: '80px', borderRadius: '8px', marginLeft: '20px', verticalAlign: 'middle' };
const addBtnStyle = { background: 'none', border: '1.5px solid #005BBB', color: '#005BBB', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' };
const aiBtnStyle = { backgroundColor: '#E8F1FF', border: '1.5px dashed #005BBB', color: '#005BBB', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' };
const actionBtnStyle = { width: '250px', height: '60px', border: 'none', borderRadius: '35px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' };
const iconBtnStyle = { background: 'none', border: 'none', color: '#000000ff', cursor: 'pointer' };