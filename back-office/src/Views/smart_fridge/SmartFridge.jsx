import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useTranslation } from 'react-i18next';

const SmartFridge = () => {
    const { t } = useTranslation();
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [productTypeNames, setProductTypeNames] = useState([]);
    const [productTypeName, setProductTypeName] = useState([]);
    const [warehouseProducts, setWarehouseProducts] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [error, setError] = useState('');
    const [recipesIngredients, setRecipesIngredients] = useState([]);

    // Fetch Warehouses
    useEffect(() => {
        async function fetchWarehouses() {
            try {
                const response = await axiosClient.get("/api/warehouse");
                setWarehouses(response.data.warehouses);
            } catch (error) {
                setError(t("An error occurred while fetching warehouses"));
                console.error('Error:', error);
            }
        }
        fetchWarehouses();
    }, [t]);

//     // Fetch ProductTypes
//     useEffect(() => {
//         async function fetchProductTypes() {
//             try {
//                 const response = await axiosClient.get("/api/productType");
//                 const fetchedProductTypes = response.data.productTypes;
                
//                 // Create an array of productType_names
//                 const productTypeNamesArray = fetchedProductTypes.map(type => type.name);
//                 setProductTypeNames(productTypeNamesArray);
                
//                 // Log the array of productType_names
//                 console.table(productTypeNamesArray); // Display as a table in the console

//             } catch (error) {
//                 setError(error.message || t('An error occurred while fetching product types.'));
//                 console.error('Error:', error);
//             }
//         }
//         fetchProductTypes();
//     }, [t]);

//     // Fetch Products
//     useEffect(() => {
//         async function fetchProducts() {
//             try {
//                 const response = await axiosClient.get("/api/product");
//                 console.log('Full response:', response); // Log de la réponse entière
//                 console.log('Fetched products:', response.data); // Log des produits récupérés
//                 setProducts(response.data || []);
//             } catch (error) {
//                 setError(t("An error occurred while fetching products"));
//                 console.error('Error:', error);
//             }
//         }
//         fetchProducts();
//     }, [t]);

//     useEffect(() => {
//       async function fetchData() {
//         try {
//           const response = await axiosClient.get("/api/recipes");
//           console.log("Fetched recipes:", response.data); // Ajoutez ce log pour voir les données
//           setRecipes(Array.isArray(response.data) ? response.data : []);
//         } catch (error) {
//           setError(error.message || t('An error occurred while fetching recipes.'));
//           console.error('Error:', error);
//         }
//       }
//       fetchData();
//     }, []);


//     useEffect(() => {
//         if (selectedWarehouseId) {
//             const filteredProducts = products.filter(product => 
//                 product.warehouse_id === parseInt(selectedWarehouseId, 10)
//             );
//             setWarehouseProducts(filteredProducts);
//         } else {
//             setWarehouseProducts([]);
//         }
//     }, [selectedWarehouseId, products]);

//     useEffect(() => {
//       console.log('Warehouse products:', warehouseProducts);
//       const productTypeNamesArray = [];
//       warehouseProducts.forEach(product => {
//           const productTypeName = productTypeNames.find(name => name === product.product_type_name) || t('Unknown Type');
//           console.log(`Product: ${product.product_type}`);
          
//           productTypeNamesArray.push(product.product_type.product_type);

//           const recipeIngredients = recipes.ingredients;
//           setRecipesIngredients(recipeIngredients);
//       });
//       setProductTypeName(productTypeNamesArray);
//       console.log('Product Type Names Array:', productTypeNamesArray);
//       console.log('recipesIngredients:', recipesIngredients);
//   }, [warehouseProducts, productTypeNames, t]);
    const handleChange = (e) => {
      console.log('Selected Warehouse:', e.target.value);
      axiosClient.get(`/api/recipes/warehouse/${e.target.value}`)	
      .then((response) => {
        setRecipes(response.data);
        console.log('Fetched recipes:', response.data);
      })
      .catch((error) => {
        setError(error.message || t('An error occurred while fetching recipes.'));
        console.error('Error:', error);
      });
    };

    return (
        <div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">{error}</strong>
                </div>
            )}

            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center mb-8">
                {t('Available Recipes in Selected Warehouse')}
            </h2>

            <div>
                <label htmlFor="warehouse" className="block text-gray-700 text-sm font-bold mb-2">
                    {t('Select Warehouse')}
                </label>
                <select
                    id="warehouse"
                    value={selectedWarehouseId || ''}
                    onChange={(e)=> handleChange(e)}
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                >
                    <option value="" disabled>{t('Select a Warehouse')}</option>
                    {warehouses.map(warehouse => (
                        <option key={warehouse.id} value={warehouse.id}>{warehouse.warehouse_name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-8">
                <h3 className="font-semibold text-lg text-gray-800 leading-tight mb-4">
                    {t('Products in Selected Warehouse')}
                </h3>
                {warehouseProducts.length === 0 ? (
                    <p>{t('No products found in this warehouse')}</p>
                ) : (
                    <ul className="list-disc pl-5">
                        {warehouseProducts.map((product) => (
                            <li key={product.id}>
                                {product.product_name} - {product.quantity} units - {productTypeNames.find(name => name === product.product_type_name) || t('Unknown Type')}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredRecipes.length === 0 ? (
                    <p>{t('No recipes found')}</p>
                ) : (
                    filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="bg-white shadow-md rounded-lg p-4">
                            <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
                            <p>{t('Ingredients')}: {recipe.ingredients.join(' / ')}</p>
                            <p>{t('Instructions')}: {recipe.instructions}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SmartFridge;
