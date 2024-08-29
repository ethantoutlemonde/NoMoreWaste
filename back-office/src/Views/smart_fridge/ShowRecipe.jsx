import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { useTranslation } from 'react-i18next';


export default function ShowRecipe() {
    const {id} = useParams();
    const { t } = useTranslation();
    const [recipe, setRecipe] = useState({});
    const [error, setError] = useState('');
    useEffect(() => {
        axiosClient.get(`/api/recipes/${id}`)
            .then((response) => {
                console.log('Fetched recipe:', response.data);
                setRecipe(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);


    return (
        <>
        {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">{error}</strong>
        </div>
      )}
        <Link to="./.." className="text-teal-500 hover:text-teal-300">{t('Back to Smart Fridge')}</Link>
        { recipe &&
            <div className="bg-white p-6 rounded-lg shadow-lg relative max-w w-full">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
                    {t('Recipe Details')}
                </h2>
                <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
                <p className="mb-4">{t('Ingredients')}: {recipe.ingredients?.join(', ')}</p>
                <p>{t('Instructions')}: {recipe.instructions}</p>
            </div>
    }
    </>
    );
}