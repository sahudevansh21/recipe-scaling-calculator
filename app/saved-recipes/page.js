"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SavedRecipesPage() {
  const router = useRouter();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    setSavedRecipes(recipes);
  };

  const handleDeleteRecipe = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== id);
      localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
      setSavedRecipes(updatedRecipes);
    }
  };

  const handleLoadRecipe = (recipe) => {
    // Option 1: Load for editing in new-recipe page
    localStorage.setItem('loadedRecipeForEditing', JSON.stringify(recipe));
    router.push('/new-recipe');

    // Option 2 (alternative): Load directly to scaled-recipe-view
    // localStorage.setItem('tempRecipeForScaling', JSON.stringify(recipe));
    // router.push('/scaled-recipe-view');
  };

  return (
    <main className="container">
      <h1 className="page-title">Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p className="glass-card text-center" style={{ maxWidth: '600px', width: '100%' }}>
          No recipes saved yet. <Link href="/new-recipe" style={{ color: 'var(--gradient-cyan)', textDecoration: 'none' }}>Start a new one</Link>!
        </p>
      ) : (
        <div className="recipe-list">
          {savedRecipes.map(recipe => (
            <div key={recipe.id} className="glass-card recipe-item">
              <div>
                <h3>{recipe.name}</h3>
                <p>Original Servings: {recipe.originalServings}</p>
                <p style={{ fontSize: '0.9em', color: 'var(--text-dark)' }}>{recipe.ingredients.length} ingredients</p>
              </div>
              <div className="recipe-item-actions">
                <button onClick={() => handleLoadRecipe(recipe)} className="btn primary-btn btn-small">
                  Load/Edit
                </button>
                <button onClick={() => handleDeleteRecipe(recipe.id)} className="btn danger-btn btn-small">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
