import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineCheck, HiOutlineXMark  } from "react-icons/hi2";
import CircularProgress from '@mui/material/CircularProgress';

export default function DetailVolunteer() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    const [loadingBan, setLoadingBan] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axiosClient.get(`/api/users/${id}`)
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

    const onDelete = () => {
        console.log('delete', id)
        axiosClient.delete(`/api/users/${id}`)
        .then(() => {
            navigate('./..')
        })
    }

    const onBanned = (bool) => {
        setLoadingBan(true)
        console.log('ban', id)
        axiosClient.patch(`/api/users/${id}`, {banned: bool})
        .then(() => {
            setData(prevData => ({
                ...prevData,
                banned: bool
            }));
            setLoadingBan(false)
        }
        )
    }

    const handleClickDownloadDocument = (doc) => () => {
        console.log('document', doc)
        // navigate(`/food_aid/partner_document/${document.id}`)

        axiosClient.get(`/api/documentAdmin/${doc.id}`, {
            responseType: 'blob' // Important: Axios va traiter la réponse comme un blob
        })
        .then(response => {
            console.log(response)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            var name = doc.path.split('.')
            name = name[name.length -1]
            console.log("Name :",name)
            link.setAttribute('download', doc.type.name + '-' + data.first_name + data.last_name + '.' + name);
            document.body.appendChild(link);
            link.click();
        })

    }

    const handleClickDocument = (doc, status) => () => {
        console.log('document', doc)
        axiosClient.patch(`/api/documentAdmin/${doc.id}`, {status: status})
        .then(response => {
            console.log(response)
            setData(prevData => ({
                ...prevData,
                documents: prevData.documents.map(document => {
                    if (document.id === doc.id) {
                        return {
                            ...document,
                            status: status
                        }
                    }
                    return document
                })
            }))
        })
    }


    return (
        <>
        <Link className="bg-slate-50 rounded py-1 px-2 hover:bg-slate-100 border-slate-100 border " to={'./..'}>Return</Link>
        <div className='mt-4 flex flex-row gap-6'>

        
        {loading ? <CircularProgress />
            :
            <>
            <div className="flex flex-col w-80 bg-slate-50 p-10 rounded-xl">
                
                
                <h1 className='text-2xl font-semibold mb-6'>Detail :</h1>
                <div className='flex justify-between mb-2'>
                    <Link className='text-2xl hover:text-gray-700' to={'update'}><HiOutlinePencilSquare /></Link>
                    <button className='text-2xl text-red-500 hover:text-red-400' onClick={onDelete}><HiOutlineTrash /></button>
                </div>
                <h2 className='text-lg font-semibold'>First Name</h2>
                <p className='mb-4'>{data?.first_name}</p>
                <h2 className='text-lg font-semibold'>Last Name</h2>
                <p className='mb-4'>{data?.last_name}</p>
                <h2 className='text-lg font-semibold'>Phone</h2>
                <p className='mb-4'>{data?.phone}</p>
                <h2 className='text-lg font-semibold'>Email</h2>
                <p className='mb-4'>{data?.email}</p>
                <div className='flex'>
                    {data?.banned ?  <button className='bg-green-500 rounded-md py-1 px-2 text-white w-fit' onClick={() => onBanned(false)}>Unban</button> : <button className='bg-red-500 rounded-md py-1 px-2 text-white w-fit' onClick={() => onBanned(true)}>Ban</button>}
                    {loadingBan && <CircularProgress />}
                </div>
            </div>
            {data.documents.length !== 0 &&
            <div className="flex flex-col bg-slate-50 p-10 rounded-xl">
                <h1 className='text-2xl font-semibold mb-6'>Documents :</h1>
                <div className='flex flex-row flex-wrap gap-4'>
                {data?.documents?.map((document) => (
                      <div className="bg-white w-40 p-4 rounded-lg shadow ">
                        {document.status === 'rejected' ? <p className='text-red-500'>Rejected</p> : document.status === 'approved' ?  <p className='text-green-500'>Validated</p> : <p className='text-yellow-500'>Pending</p>}
                        <div></div>
                        <p className="font-semibold">{document.type.name}</p>
                        {/* <p>{document.path}</p> */}
                        {/* <p>{document.type.name}</p> */}
                        <div className='grid grid-cols-2 gap-2 mt-2'>
                            <button onClick={handleClickDownloadDocument(document)} className='bg-blue-500 p-1 text-white rounded hover:bg-blue-600 hover:shadow-md duration-100 col-span-2'>Download</button>
                            <button onClick={handleClickDocument(document, 'rejected')} className='bg-red-500 p-1 text-white rounded hover:bg-red-600 hover:shadow-md duration-100 col-span-1 flex justify-center items-center'><HiOutlineXMark/></button>
                            <button onClick={handleClickDocument(document, 'approved')} className='bg-green-500 p-1 text-white rounded hover:bg-green-600 hover:shadow-md duration-100 col-span-1 flex justify-center items-center'><HiOutlineCheck className='text-lg' /></button>

                        </div>
                        
                    </div>
                ))}
                </div>
                
            </div>
            }
            </>
        }
        </div>
        </>
    )
}