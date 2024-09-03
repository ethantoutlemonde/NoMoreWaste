import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import axiosClient from '../../axios-client';

export default function ActivityParticipants({activity_id}) {
    const [selection, setSelection] = useState([]);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [selectedVolunteer, setSelectedVolunteer] = useState('');
    const [participants, setParticipants] = useState([]);
    const [error, setError] = useState('');

    function selectionHandler(selected) {
        setSelection(selected);
        
    }

    useEffect(() => {
        axiosClient.get(`/api/beneficiaryAdmin/`)
            .then(response => {
                console.log(response.data);
                setBeneficiaries(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        fetchParticipants();
    }, []);

    const fetchParticipants = () => {
        axiosClient.get(`/api/activity/${activity_id}/participants`)
            .then(response => {
                console.log(response.data);
                setParticipants(response.data.participants);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleDelete = async () => {
        setError('');
        console.log(selection);
    
        try {
            await Promise.all(selection.map(itemId => axiosClient.delete(`/api/activity/${activity_id}/participants`, {params: {volunteer_id: itemId}})));
    
            // setData(data.filter(row => !selection.includes(row.id)));
            fetchParticipants();
        } catch (error) {
            console.log(error);
            setError(error.response.data);
        }
    
        
    }
    
    const handleAdd = () => {
        setError('');
        setSelectedVolunteer('');
        console.log(selectedVolunteer);
        axiosClient.post(`/api/activity/${activity_id}/participants`, {volunteer_id: selectedVolunteer})
        .then(response => {
            console.log(response);
            fetchParticipants();
        })
        .catch(error => {
            console.error(error);
            setError(error.response.data);
        });
    }

    return (
        <>
        <h2 className="text-xl font-medium mb-4">List of all participants</h2>
                <DataGrid 
                    rows={participants} 
                    columns={[
                        { field: 'id', headerName: 'ID', width: 70 },
                        { field: 'first_name', headerName: 'First Name', width: 150 },
                        { field: 'last_name', headerName: 'Last Name', width: 150 },
                        { field: 'email', headerName: 'Email', width: 200 },
                        { field: 'phone', headerName: 'Phone', width: 150 },
                    ]} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                    onRowSelectionModelChange={(selected) => selectionHandler(selected)}
                />
                <button onClick={handleDelete} className='bg-red-500 p-2 text-white rounded-md mt-2 disabled:bg-red-300 mr-10' disabled={selection.length ===0}>
                    Delete
                </button>
                <select name="user_id" value={selectedVolunteer} onChange={(e) => setSelectedVolunteer(e.target.value)} className="bg-slate-100 rounded p-2 mr-2">
                        <option value="" defaultChecked disabled>Choose a volunteer</option>
                        {beneficiaries.map((beneficiary, index) => (
                            <option key={index} value={beneficiary.id}>{beneficiary.first_name} {beneficiary.last_name}</option>
                        ))}

                </select>
                <button onClick={handleAdd} className='bg-blue-500 text-white rounded-md p-2'>Add a Volunteer</button>
                {error.message && <p className="text-red-500">{error.message}</p>}
        </>
    )
}