"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewRecipePage() {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState('');
  const [originalServings, setOriginalServings] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);

  useEffect(() => {
    // Check if there's a recipe to load (e.g., from 'Load' in saved recipes)
    const loadedRecipe = localStorage.getItem('loadedRecipeForEditing');
    if (loadedRecipe) {
      const parsedRecipe = JSON.parse(loadedRecipe);
      setRecipeName(parsedRecipe.name);
      setOriginalServings(parsedRecipe.originalServings);
      setIngredients(parsedRecipe.ingredients);
      localStorage.removeItem('loadedRecipeForEditing'); // Clear it after loading
    }
  }, []);

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = ingredients.map((ing, i) => {
      if (i === index) {
        return { ...ing, [field]: value };
      }
      return ing;
    });
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const validateForm = () => {
    if (!recipeName.trim() || !originalServings || isNaN(originalServings) || parseFloat(originalServings) <= 0) {
      alert('Please enter a valid recipe name and original serving size (must be a positive number).');
      return false;
    }
    for (const ing of ingredients) {
      if (!ing.name.trim() || !ing.quantity || isNaN(ing.quantity) || parseFloat(ing.quantity) <= 0 || !ing.unit.trim()) {
        alert('Please ensure all ingredient fields (name, quantity, unit) are filled and quantity is a positive number.');
        return false;
      }
    }
    return true;
  };

  const handleScaleRecipe = () => {
    if (!validateForm()) return;

    const recipeData = {
      name: recipeName,
      originalServings: parseFloat(originalServings),
      ingredients: ingredients.map(ing => ({
        ...ing,
        quantity: parseFloat(ing.quantity)
      })),
    };
    localStorage.setItem('tempRecipeForScaling', JSON.stringify(recipeData));
    router.push('/scaled-recipe-view');
  };

  const handleSaveRecipeLocally = () => {
    if (!validateForm()) return;

    const newRecipe = {
      id: Date.now(), // Simple unique ID
      name: recipeName,
      originalServings: parseFloat(originalServings),
      ingredients: ingredients.map(ing => ({
        ...ing,
        quantity: parseFloat(ing.quantity)
      })),
    };

    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    const updatedRecipes = [...savedRecipes, newRecipe];
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    alert('Recipe saved successfully!');
    // Optionally clear form or redirect
    setRecipeName('');
    setOriginalServings('');
    setIngredients([{ name: '', quantity: '', unit: '' }]);
  };

  return (
    <main className="container">
      <h1 className="page-title">New Recipe</h1>
      <div className="glass-card" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="form-group">
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            type="text"
            id="recipeName"
            className="input-field"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="e.g., Classic Tomato Soup"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="originalServings">Original Servings</label>
          <input
            type="number"
            id="originalServings"
            className="input-field"
            value={originalServings}
            onChange={(e) => setOriginalServings(e.target.value)}
            placeholder="e.g., 4"
            min="1"
            required
          />
        </div>

        <h2 style={{ color: 'var(--gradient-cyan)', marginTop: '2rem', marginBottom: '1rem' }}>Ingredients</h2>
        {ingredients.map((ing, index) => (
          <div key={index} className="ingredient-row">
            <input
              type="text"
              className="input-field"
              placeholder="Ingredient Name (e.g., Diced Tomatoes)"
              value={ing.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              required
            />
            <input
              type="number"
              className="input-field"
              placeholder="Quantity (e.g., 28)"
              value={ing.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              min="0.01"
              step="0.01"
              required
            />
            <input
              type="text"
              className="input-field"
              placeholder="Unit (e.g., oz or cans)"
              value={ing.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              required
            />
            {ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredient(index)} className="remove-ingredient-btn">
                &times;
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="btn secondary-btn" style={{ width: '100%', marginTop: '1rem' }}>
          Add Ingredient
        </button>

        <div className="form-actions">
          <button type="button" onClick={handleSaveRecipeLocally} className="btn secondary-btn">
            Save Recipe Locally
          </button>
          <button type="button" onClick={handleScaleRecipe} className="btn primary-btn">
            Scale Recipe
          </button>
        </div>
      </div>
    </main>
  );
}
