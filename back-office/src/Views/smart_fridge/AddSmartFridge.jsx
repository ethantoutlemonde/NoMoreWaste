import React, { useState } from 'react';
import axiosClient from '../../axios-client';
import { useTranslation } from 'react-i18next';

const AddSmartFridge = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]); // État pour les ingrédients
  const [recipeName, setRecipeName] = useState(''); // État pour le nom de la recette
  const [instructions, setInstructions] = useState(''); // État pour les instructions
  const [successMessage, setSuccessMessage] = useState(''); // Message de succès
  const [errorMessage, setErrorMessage] = useState(''); // Message d'erreur

  // Gérer le changement de produit
  const handleProductChange = (event, index) => {
    const updatedProducts = [...products];
    updatedProducts[index] = event.target.value;
    setProducts(updatedProducts);
  };

  // Ajouter un champ de produit
  const addProductInput = () => {
    setProducts([...products, '']);
  };

  // Supprimer un champ de produit
  const removeProductInput = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  // Enregistrer la recette
  const saveRecipe = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axiosClient.post("/api/recipes", {
        name: recipeName, // Assurez-vous que le nom du champ correspond à celui attendu par l'API
        ingredients: products, // Assurez-vous que le nom du champ correspond à celui attendu par l'API
        instructions,
      });

      setSuccessMessage(t('Recipe created successfully!'));  // Message de succès
      setProducts([]);  // Réinitialiser les champs
      setRecipeName('');
      setInstructions('');
    } catch (error) {
      // Gérer les erreurs renvoyées par le backend
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        let errorMessages = '';
        if (errors.name) {
          errorMessages += `${t(errors.name[0])}\n`;
        }
        if (errors.ingredients) {
          errorMessages += `${t(errors.ingredients[0])}\n`;
        }
        setErrorMessage(errorMessages.trim());
      } else {
        setErrorMessage(t('An error occurred while creating the recipe.'));
      }
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div>
      <div>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">{errorMessage}</strong>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">{successMessage}</strong>
          </div>
        )}

        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder={t('Recipe Name')}
          className="mb-4 p-2 w-full border rounded"
        />
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder={t('Preparation Instructions')}
          className="mb-4 p-2 w-full border rounded"
          rows="4"
        />
        {products.map((product, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={product}
              onChange={(event) => handleProductChange(event, index)}
              placeholder={t('Enter Product')}
              className="mr-2 p-2 border rounded w-full"
            />
            <button
              onClick={() => removeProductInput(index)}
              className="items-center px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-400"
            >
              {t('Remove')}
            </button>
          </div>
        ))}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={addProductInput}
            className="items-center px-4 py-3 rounded-lg text-white bg-teal-400 hover:bg-teal-300"
          >
            {t('Add Product')}
          </button>
          <button
            onClick={saveRecipe}
            className="items-center px-4 py-3 rounded-lg text-white bg-green-400 hover:bg-green-300"
          >
            {t('Save Recipe')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSmartFridge;
