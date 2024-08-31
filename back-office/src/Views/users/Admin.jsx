import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    
    { field: 'email', headerName: 'Email', width: 150 },
  ];

export default function Admin() {
    const [data , setData] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/api/admin')
        .then(response => {
            console.log(response.data)
            setData(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })

        console.log(data)
    }, [])

    const onClickHandle = (id) => {
        console.log('coucou')
        console.log(id)
        navigate(`/users/admin/${id}`)

    }
    
    return (
        <>
            <h1 className='text-2xl mb-4'>Admin</h1>
            {loading ? <CircularProgress />
                :
                <DataGrid 
                columns={columns}
                rows={data}
                onRowClick={(params) => onClickHandle(params.id)}
                />
            }
             <Link to={'create'} className='fixed bottom-4 right-4 rounded bg-blue-600 text-white p-2 hover:bg-blue-500'>add Admin</Link>
        </>
    )
}