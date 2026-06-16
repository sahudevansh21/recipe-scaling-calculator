"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ScaledRecipeViewPage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [newServings, setNewServings] = useState('');
  const [scaledIngredients, setScaledIngredients] = useState([]);

  useEffect(() => {
    const storedRecipe = localStorage.getItem('tempRecipeForScaling');
    if (storedRecipe) {
      const parsedRecipe = JSON.parse(storedRecipe);
      setRecipe(parsedRecipe);
      setNewServings(parsedRecipe.originalServings.toString()); // Default to original servings
      // Initial calculation if recipe is loaded
      calculateScaledIngredients(parsedRecipe, parsedRecipe.originalServings);
    } else {
      // Redirect if no recipe data found
      router.push('/new-recipe');
    }
  }, [router]);

  const calculateScaledIngredients = (currentRecipe, desiredServings) => {
    if (!currentRecipe || !desiredServings || desiredServings <= 0) {
      setScaledIngredients([]);
      return;
    }
    const scaleFactor = desiredServings / currentRecipe.originalServings;
    const scaled = currentRecipe.ingredients.map(ing => ({
      ...ing,
      scaledQuantity: (ing.quantity * scaleFactor).toFixed(2), // Keep two decimal places
    }));
    setScaledIngredients(scaled);
  };

  useEffect(() => {
    if (recipe) {
      calculateScaledIngredients(recipe, parseFloat(newServings));
    }
  }, [newServings, recipe]);

  if (!recipe) {
    return <main className="container"><p className="glass-card text-center">Loading recipe or no recipe found...</p></main>;
  }

  return (
    <main className="container">
      <h1 className="page-title">Scaled Recipe View</h1>
      <div className="glass-card" style={{ maxWidth: '800px', width: '100%' }}>
        <h2 style={{ color: 'var(--gradient-purple)', marginBottom: '1rem' }}>{recipe.name}</h2>
        <p style={{ color: 'var(--text-medium)', marginBottom: '1.5rem' }}>
          Original Servings: <span style={{ fontWeight: 'bold', color: 'var(--text-light)' }}>{recipe.originalServings}</span>
        </p>

        <div className="form-group">
          <label htmlFor="newServings">Scale to New Servings:</label>
          <input
            type="number"
            id="newServings"
            className="input-field"
            value={newServings}
            onChange={(e) => setNewServings(e.target.value)}
            placeholder="Desired servings (e.g., 8)"
            min="1"
            step="0.5"
            required
          />
        </div>

        {parseFloat(newServings) > 0 && (
          <div className="scaled-recipe-output mt-4">
            <h2>Ingredients for {parseFloat(newServings)} Servings:</h2>
            <ul>
              {scaledIngredients.map((ing, index) => (
                <li key={index}>
                  <span>{ing.name}</span>
                  <span>{ing.scaledQuantity} {ing.unit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <button onClick={() => router.push('/new-recipe')} className="btn secondary-btn">
            Edit Original Recipe
          </button>
          <button onClick={() => router.push('/saved-recipes')} className="btn primary-btn">
            View Saved Recipes
          </button>
        </div>
      </div>
    </main>
  );
}
