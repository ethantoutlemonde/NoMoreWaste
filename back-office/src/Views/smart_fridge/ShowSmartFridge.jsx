import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useTranslation } from 'react-i18next';

const ShowSmartFridge = () => {
  const { t } = useTranslation("global");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: ''
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get("/api/recipes");
        console.log("Fetched recipes:", response.data);
        setRecipes(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setError(error.message || t('An error occurred while fetching recipes.'));
        console.error('Error:', error);
      }
    }

    fetchData();
  }, [t]);

  const handleDelete = async (id) => {
    setError('');
    setSuccessMessage('');
    const confirmDelete = window.confirm(t('Are you sure you want to delete this recipe?'));
    if (confirmDelete) {
      try {
        const response = await axiosClient.delete(`/api/recipes/${id}`);
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
        setSuccessMessage(t(response.data.message));
      } catch (error) {
        setError(error.message || t('An error occurred while deleting the recipe.'));
        console.error('Error:', error);
        if (error.response?.status === 500) {
          setError(t("This recipe cannot be deleted."));
        }
      }
    }
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      name: recipe.name,
      ingredients: recipe.ingredients.join(', '),
      instructions: recipe.instructions
    });
  };

  const handleCloseModal = () => {
    setEditingRecipe(null);
    setFormData({ name: '', ingredients: '', instructions: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await axiosClient.put(`/api/recipes/${editingRecipe.id}`, {
        name: formData.name,
        ingredients: formData.ingredients.split(',').map(item => item.trim()),
        instructions: formData.instructions
      });

      if (response.status === 200) {
        setSuccessMessage(t("Successfully updated recipe."));
        setEditingRecipe(null);
        setRecipes(prevRecipes =>
          prevRecipes.map(recipe =>
            recipe.id === editingRecipe.id ? { ...response.data.recipe } : recipe
          )
        );
      } else {
        console.error('Failed to update recipe');
      }
    } catch (error) {
      setError(t(error.response?.data?.errors?.name || 'This recipe already exists.'));
      console.error('Error:', error);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">{error}</strong>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">{successMessage}</strong>
        </div>
      )}

      <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center mb-8">
        {t('Recipe List')}
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder={t('Search recipe')}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRecipes.length === 0 ? (
          <p>{t('No recipes found')}</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
              <h3 className="font-semibold text-lg mb-2">
                {recipe.ingredients.join(' / ')}
              </h3>
              <button
                onClick={() => handleEdit(recipe)}
                className="m-2 bg-teal-400 hover:bg-teal-300 text-white px-4 py-2 rounded mt-2"
              >
                {t('Edit')}
              </button>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="m-2 bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                {t('Delete')}
              </button>
            </div>
          ))
        )}
      </div>

      {editingRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4 text-center">{t('Edit Recipe')}</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">{t('Recipe Name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded mt-2 mb-4"
              />
              <label htmlFor="ingredients">{t('Ingredients')}</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded mt-2 mb-4"
                rows="4"
              />
              <label htmlFor="instructions">{t('Instructions')}</label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded mt-2 mb-4"
                rows="4"
              />
              <button type="submit" className="m-2 bg-green-400 hover:bg-green-300 text-white px-4 py-2 rounded mt-2">
                {t('Validate')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowSmartFridge;
