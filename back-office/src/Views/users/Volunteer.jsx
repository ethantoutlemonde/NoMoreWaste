import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
  ];

export default function Volunteer() {

    const [data , setData] = useState([])

    useEffect(() => {
        axiosClient.get('/api/volunteer')
        .then(response => {
            console.log(response.data)
            setData(response.data)
        })
        .catch(error => {
            console.log(error)
        })

        console.log(data)
    }, [])
    
    return (
        <>
            <h1 className='text-2xl mb-4'>Volunteer</h1>
            <DataGrid
                columns={columns}
                rows={data}
             />
            <Link to={'create'} className='fixed bottom-4 right-4 rounded bg-blue-600 text-white p-2 hover:bg-blue-500'>add Volunteer</Link>

        </>
    )
}