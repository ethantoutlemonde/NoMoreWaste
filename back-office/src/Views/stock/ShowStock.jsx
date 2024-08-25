import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useTranslation } from "react-i18next";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editableProductId, setEditableProductId] = useState(null);
  const [modifiedFields, setModifiedFields] = useState({});
  const [maraudes, setMaraudes] = useState([]);
  const [selectedMaraude, setSelectedMaraude] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { t } = useTranslation("global");

  const fetchMaraudes = async () => {
    try {
      const response = await axiosClient.get("foodAid.indexNormal");
      setMaraudes(response.data);
      console.log('Maraudes fetched:', response.data);
    } catch (error) {
      setError(error.response?.data?.message || t('An error occurred'));
      console.error('Error fetching maraudes:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosClient.get("AdminProducts.index");
      setProducts(response.data);
      console.log('Products fetched:', response.data);
    } catch (error) {
      setError(error.response?.data?.message || t('An error occurred')); 
      console.error('Error fetching products:', error);
    }
  };

  const handleModifyProduct = async (productId) => {
    try {
      const response = await axiosClient.put(`/api/AdminProductEdit/${productId}`, modifiedFields);
      console.log('Product updated:', response.data);
      fetchProducts(); 
      setEditableProductId(null); 
      setModifiedFields({}); 
      setSuccessMessage(t('Product modified successfully'));
    } catch (error) {
      setError(error.response?.data?.message || t('An error occurred'));
      console.error('Error modifying product:', error);
    }
  };
  
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axiosClient.delete(`/api/AdminProductDelete/${productId}`);
      console.log('Product deleted:', response.data);
      fetchProducts();
      setSuccessMessage(t('Product deleted successfully'));
    } catch (error) {
      setError(error.response?.data?.message || t('An error occurred'));
      console.error('Error deleting product:', error);
    }
  };

  const handleFoodAid = async () => {
    console.log('selectedMaraude:', selectedMaraude);
    console.log('selectedProducts:', selectedProducts);
    try {
      const response = await axiosClient.patch(route("AdminProduct.addMaraude"), { maraude_id: selectedMaraude, product_ids: selectedProducts });
      console.log('Product added to maraude:', response.data);
      fetchProducts();
      setSuccessMessage(t('Product added to maraude successfully'));
    } catch (error) {
      setError(error.response?.data?.message || t('An error occurred'));
      console.error('Error adding product to maraude:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchMaraudes();
  }, []);

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
    console.log('selectedProducts:', selectedProducts);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {error && <div className="text-red-500">{t(error)}</div>}
        {successMessage && <div className="text-green-500">{t(successMessage)}</div>}
      {/* Search input */}
      <label htmlFor="table-search" className="sr-only">{t('Search')}</label>
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 dark:text-gray-400">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={t('Search for items')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='flex'>
          <div className="relative z-0 w-full mb-5 group">
              <select onChange={(e) => setSelectedMaraude(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                <option value="">{t('Food Aid')}</option>
                  {maraudes.map((maraude) => (
                <option key={maraude.id} value={maraude.id}>{maraude.name} - {maraude.start_at}</option>
                ))}
              </select>
          </div>
          <button onClick={handleFoodAid} className="font-medium text-white bg-green-600 px-4 py-2 rounded-lg dark:text-red-500 hover:bg-green-500 ml-2">{t('Add To Maraude')}</button>
        </div>
      </div>
      {/* Display filtered products */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="checkbox-all-search" className="sr-only">{t('Select All')}</label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Product name')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Product type')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Product description')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Quantity')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Expiration date')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Warehouse')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Food Aid')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Food Aid Quantity')}
            </th>
            <th scope="col" className="px-6 py-3">
              {t('Action')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input 
                    id={`checkbox-table-search-${product.id}`} 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                  />
                  <label htmlFor={`checkbox-table-search-${product.id}`} className="sr-only">{t('Select')}</label>
                </div>
              </td>
              <td className="px-6 py-4">
                {editableProductId === product.id ? (
                  <input
                    type="text"
                    className="w-full"
                    value={modifiedFields.product_name || product.product_name }
                    onChange={(e) => setModifiedFields({...modifiedFields, product_name: e.target.value})}
                  />
                ) : (
                  <span>{product.product_name}</span>
                )}
              </td>
              <td className="px-6 py-4">
                <span>{product.product_type.product_type}</span>
              </td>
              <td className="px-6 py-4">
                {editableProductId === product.id ? (
                  <input
                    type="text"
                    className="w-full"
                    value={modifiedFields.description || product.description}
                    onChange={(e) => setModifiedFields({...modifiedFields, description: e.target.value})}
                  />
                ) : (
                  <span>{product.description}</span>
                )}
              </td>
              <td className="px-6 py-4">
                {editableProductId === product.id ? (
                  <input
                    type="text"
                    className="w-full"
                    value={modifiedFields.quantity || product.quantity}
                    onChange={(e) => setModifiedFields({...modifiedFields, quantity: e.target.value})}
                  />
                ) : (
                  <span>{product.quantity}</span>
                )}
              </td>
              <td className="px-6 py-4">
                {editableProductId === product.id ? (
                  <input
                    type="text"
                    className='w-auto'
                    value={modifiedFields.expiration_date || product.expiration_date}
                    onChange={(e) => setModifiedFields({...modifiedFields, expiration_date: e.target.value})}
                  />
                ) : (
                  <span>{product.expiration_date}</span>
                )}
              </td>
              <td className="px-6 py-4">
                <span>{product.warehouse.warehouse_name}</span>
              </td>
              <td className="px-6 py-4">
                <span>{product?.food_aids?.name}</span>
              </td>
              <td className="px-6 py-4">
                {editableProductId === product.id ? (
                  <input
                    type="text"
                    className="w-full"
                    value={modifiedFields?.Quantity_Maraude || product?.Quantity_Maraude}
                    onChange={(e) => setModifiedFields({...modifiedFields, Quantity_Maraude: e?.target?.value})}
                  />
                ) : (
                  <span>{product?.Quantity_Maraude}</span>
                )}
              </td>
              <td className="px-6 py-4">
                {editableProductId === product.id ? (
                  <button onClick={() => handleModifyProduct(product.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{t('Validate')}</button>
                ) : (
                  <button onClick={() => setEditableProductId(product.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{t('Modify')}</button>
                )}
                <button onClick={() => handleDeleteProduct(product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2">{t('Delete')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
