import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import CircularProgress from '@mui/material/CircularProgress';
import { HiOutlineTrash } from "react-icons/hi";

export default function DetailFoodCollection() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // get the food collection with the given id using the API with axiosClient and useEffect hook
    // display the food collection data in the component
    useEffect(() => {
        axiosClient.get(`/api/foodCollection/${id}`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
            
    }
    , [id]);

    // delete the food collection with the given id using the API with axiosClient
    const onDelete = () => {
        console.log('delete', id);
        axiosClient.delete(`/api/foodCollection/${id}`)
            .then(() => {
                navigate('./..');
            });
    };
    return (
        <div className="mt-4">
            <Link className="bg-white rounded py-1 px-2 hover:bg-slate-50 border-gray-100 border " to={'./..'}>Return</Link>
            <div className="mt-2">
            {loading ? <CircularProgress />
            :
            <div>
                <div className="flex justify-between mb-2">
                    <h1 className="text-xl  font-semibold">Detail of the FoodCollection of the {data?.date}</h1>
                    <button className='text-2xl text-red-500 hover:text-red-400' onClick={onDelete}><HiOutlineTrash /></button>
                </div>
                
                <p>Date : {data?.date}</p>
                <h2 className="text-lg mb-4 mt-4">List of collected supermarkets : </h2>
                <div className="flex flex-row flex-wrap gap-4">
                    {data?.supermarkets.map(supermarket => (
                        <Link to={`/food_aid/partner_supermarket/${supermarket.id}`} key={supermarket.id} className="bg-white w-fit p-4 rounded-lg shadow hover:shadow-md duration-100">
                            <p className="font-semibold">{supermarket.name}</p>
                            <p>{supermarket.address}</p>
                            <p>{supermarket.email}</p>
                            <p>{supermarket.phone}</p>
                            

                            
                        </Link>
                    ))}
                </div>
                <h2 className="text-lg mb-4 mt-4">Map :</h2>
            </div>
            }
            </div>
            
        </div>
    );
}