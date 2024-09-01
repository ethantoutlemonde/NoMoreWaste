import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import CircularProgress from '@mui/material/CircularProgress';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { DataGrid } from "@mui/x-data-grid";
import FoodCollectionParticipants from "../../../components/FoodCollectionParticipants";

export default function DetailFoodCollection() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // get the food collection with the given id using the API with axiosClient and useEffect hook
    // display the food collection data in the component
    useEffect(() => {
        fetchData();
            
    }
    , [id]);

    const fetchData = () => {
        axiosClient.get(`/api/foodCollection/${id}`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    };


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
            <div className="mt-2 grid grid-cols-2 gap-4">
            {loading ? <CircularProgress />
            :
            <>
            <div className="">
                <div className="flex mb-2">
                    <h1 className="text-xl mr-6 font-semibold">Detail of the FoodCollection of the {data?.date}</h1>
                    <div className="flex items-start gap-2">
                        <Link to={'update'} className='text-2xl hover:text-gray-700'><HiOutlinePencilSquare /></Link>
                        <button className='text-2xl text-red-500 hover:text-red-400' onClick={onDelete}><HiOutlineTrash /></button>
                    </div>
                    
                </div>
                
                <p>Date : {data?.date}</p>
                <p>Start Time : {data?.start_time}</p>
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
                
            </div>
            <div className="h-5/6">
                <FoodCollectionParticipants foodCollection={data} fetchData={fetchData}/>
                
            </div>
            <div>
                <h2 className="text-lg mb-4 mt-4">Map :</h2>
                <a href="./../../../../back-end\mapPlan\htmlFiles\trajet.html" download="trajet.html">Download</a>
            </div>
            </>
            }
            </div>
            
        </div>
    );
}