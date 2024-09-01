import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import CircularProgress from '@mui/material/CircularProgress';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { DataGrid } from "@mui/x-data-grid";
import OutreachParticipants from "../../../components/OutreachParticipants";

export default function DetailOutreach() {
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


    // delete the food collection with the given id using the API with axiosClient
    const onDelete = () => {
        console.log('delete', id);
        axiosClient.delete(`/api/outreach/${id}`)
            .then(() => {
                navigate('./..');
            });
    };
    return (
        <>
        <h1>Detail Outreach</h1>
        {loading ? <CircularProgress />:
        <div className="grid grid-cols-2">
            <div>
            <h1 className="text-xl mr-6 font-semibold">Outreach information of the {data?.date}</h1>
                <p>Date : {data?.date}</p>
                <p>Start Time : {data?.start_time}</p>
                <div className="h-2/3 mt-4">
                    <OutreachParticipants outreach={data} fetchData={fetchData}/>
                </div>
                
            </div>
            
        </div>
}
        
        </>
    )
}