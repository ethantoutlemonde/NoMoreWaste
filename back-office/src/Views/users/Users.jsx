import { DataGrid } from '@mui/x-data-grid';
import axiosClient from '../../axios-client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'edit', headerName: "Action", width: 200, renderCell: (params) => <EditButton user={params.row} /> }
];

function EditButton({ user }) {

    const deleteUser = (e) => {
        e.preventDefault();
        console.log('delete user', user);
        axiosClient.delete('/api/users/'+user.id).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <>
        <Link to={'/users/'+user.id} className='bg-blue-600 p-2 px-3 rounded-lg text-white hover:bg-blue-700 mr-2'>
            edit
        </Link>
        <button className='bg-red-500 rounded-lg text-white hover:bg-red-600' onClick={deleteUser}>
            Delete
        </button>
        
        </>
        
        // <PencilSquareIcon className="h-6 w-6 text-indigo-600 "/>
        // </a>
    );
}
export default function Users() {

    const [data, setData] = useState([]);

    // get users from the api at the loading of the component
    useEffect(() => {
        axiosClient.get('/api/users').then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    
    return (
        <div className='max-h-full'>
            <h1 className="text-2xl mb-4">Users</h1>
            <DataGrid rows={data} columns={columns} />

            <div className='mt-6'>
                <Link to='/users/create' className='bg-blue-600 p-2 px-3 rounded-lg text-white hover:bg-blue-700'>
                    Create User
                </Link>
            </div>
        </div>
    )
}
