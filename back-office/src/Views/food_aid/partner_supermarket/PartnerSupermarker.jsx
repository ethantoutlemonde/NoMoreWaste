import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
  ];

export default function PartnerSupermarket() {

    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/api/supermarket')
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
        console.log(id)
        navigate(`/food_aid/partner_supermarket/${id}`)

    }
    return (
        <>
        <h1 className='text-2xl mb-4'>Partner Supermarket</h1>
        {loading ? <CircularProgress />
            :
            <DataGrid 
            columns={columns}
            rows={data}
            onRowClick={(params) => onClickHandle(params.id)}
            />
        }
        
        <Link to={'add'} className='fixed bottom-4 right-4 rounded bg-blue-600 text-white p-2 hover:bg-blue-500'>add Supermarket</Link>

        </>
    )
}