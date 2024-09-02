import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import CircularProgress from '@mui/material/CircularProgress';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { DataGrid } from "@mui/x-data-grid";
import OutreachParticipants from "../../../components/OutreachParticipants";
import ProductsTable from "../../../components/ProductsTable";
import OutreachProductsTable from "../../../components/OutreachProductsTable";

export default function DetailOutreach() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [outreachProducts, setOutreachProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();
    const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        fetchProducts();
            
    }
    , [id]);

    const fetchData = () => {
        axiosClient.get(`/api/outreach/${id}`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const fetchProducts = () => {
        axiosClient.get(`/api/product`)
            .then(response => {
                console.log(response.data);
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError(error.response.data.error);
            });
        
        axiosClient.get(`/api/outreach/${id}/products`)
            .then(response => {
                console.log(response.data);
                setOutreachProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError(error.response.data.error);
            });
    }


    // delete the food collection with the given id using the API with axiosClient
    const onDelete = () => {
        console.log('delete', id);
        axiosClient.delete(`/api/outreach/${id}`)
            .then(() => {
                navigate('./..');
            });
    };

    const handleAddProduct = () => {
        console.log('add product');
        console.log(selectedProduct.product_name, selectedProductQuantity);
        axiosClient.post(`/api/outreach/${id}/products`, {product_id: selectedProduct.id, quantity: selectedProductQuantity})
            .then(() => {
                fetchData();
                fetchProducts();
            })
            .catch(error => {
                console.error(error);
                setError(error.response.data);
            });
    }
    return (
        <>
        <h1>Detail Outreach</h1>
        {error?.error && <p className="text-red-500">{error.error}</p>}
        {loading ? <CircularProgress />:
        <div className="grid grid-cols-2 gap-6">
            <div>
                <h1 className="text-xl mr-6 font-semibold">Outreach information of the {data?.date}</h1>
                <p>Date : {data?.date}</p>
                <p>Start Time : {data?.start_time}</p>
                <div className="h-2/3 mt-4">
                    <OutreachParticipants outreach={data} fetchData={fetchData}/>
                </div>
                
                
            </div>
            <div className="h-2/3 mt-4">
            <div className="h-96 mb-10">
            <ProductsTable products={products} fetchData={fetchProducts} setSelectedProduct={setSelectedProduct}/>
            </div>
                
                {selectedProduct &&
                <>
                    <p className="mb-2 mt-2">Select the numbre of {selectedProduct.product_name} you want to add to the outreach :</p>
                    <select name="quantity" id="" value={selectedProductQuantity} onChange={(e) => setSelectedProductQuantity(e.target.value)} className="bg-slate-100 rounded p-2 mr-2">
                        {[...Array(selectedProduct.quantity).keys()].map((i) => (
                            <option key={i} value={i+1}>{i+1}</option>
                        ))}
                    </select>
                    {error.quantity && <p className="text-red-500">{error.quantity}</p>}
                    <button onClick={handleAddProduct} className='bg-blue-500 text-white rounded-md p-2'>Add Product</button>
                </>
                 
                 }
                 <div className="h-96 mt-4">
                 <OutreachProductsTable products={outreachProducts} fetchData={fetchData} />
                 </div>
                
                
            </div>
            
        </div>
}
        
        </>
    )
}