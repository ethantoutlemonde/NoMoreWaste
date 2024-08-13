import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
  ];

export default function Admin() {
    const [data , setData] = useState([])

    useEffect(() => {
        axiosClient.get('/api/admin')
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
            <h1>Admin</h1>
            <DataGrid
                columns={columns}
                rows={data}
             />
        </>
    )
}