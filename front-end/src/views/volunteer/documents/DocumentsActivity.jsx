import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosClient from "../../../axios-client";
import { useTranslation } from "react-i18next";
import UploadDocument from "../../../components/UploadDocument";
import { useAuth } from "../../../hooks/auth";


export default function DocumentsActivity() {
    const [activityTypeDocuments, setActivityTypeDocuments] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [SelectedType, setSelectedType] = useState(null);
    const { id } = useParams();
    const { user} = useAuth({middleware: 'auth'});
    const {t} = useTranslation('global');


    useEffect(() => {
        fetchActivityTypeDocuments()
        fetchUserDocuments()
        setSelectedType(null)
    }, [id])

    const fetchActivityTypeDocuments = () => {
        axiosClient.get(`/api/activityType/${id}`)
        .then(response => {
            console.log(response.data.activityType)
            setActivityTypeDocuments(response.data.activityType.required_documents)
        })
        .catch(error => {
            console.error(error)
        })
    }

    const fetchUserDocuments = () => {
        axiosClient.get(`/api/volunteer/${user.id}/documents`)
        .then(response => {
            console.log(response.data)
            setDocuments(response.data)
        })
        .catch(error => {
            console.error(error)
        })
    }

    const handleUploadDocument = (type) => {
        console.log('handleDocument, type:', type);
        setSelectedType(type);
    }

    const handleDownloadDocument = (doc) => {
        console.log('document', doc)
        // navigate(`/food_aid/partner_document/${document.id}`)

        axiosClient.get(`/api/document/${doc.id}`, {
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
            link.setAttribute('download', doc.type.name + '-' + user.first_name + user.last_name + '.' + name);
            document.body.appendChild(link);
            link.click();
        })

    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className=" bg-white p-4 rounded-lg flex flex-col gap-4 shadow">
                <h2 className="text-lg font-medium">{t("Needed Documents")}</h2>

                    
                    {activityTypeDocuments?.map(type => (
                        <div className="w-full bg-gray-50 rounded-md p-2 grid grid-cols-6" key={type.id}>
                            <div>
                            {documents.map(doc => {
                                
                                if (doc.type_id === type.id) {
                                    switch (doc.status) {
                                        case 'approved':
                                            return <div key={doc.id} style={{ color: 'green' }}>🟢</div>;
                                        case 'pending':
                                            return <div key={doc.id} style={{ color: 'yellow' }}>🟡</div>;
                                        case 'rejected':
                                            return <div key={doc.id} style={{ color: 'red' }}>🔴</div>;
                                        default:
                                            return null;
                                    }
                                }
                                return null;
                            })}
                            </div>
                            <div className="col-span-3">{type.name}</div>
                            {documents.find(doc => doc.type_id === type.id)
                                ? <button onClick={() => handleDownloadDocument(documents.find(doc => doc.type_id === type.id))}>Download</button> 
                                : <button onClick={() => handleUploadDocument(type.id)}>Upload</button>
                            }
                        </div>
                    ))}

            </div>
            {SelectedType &&
            <UploadDocument type={SelectedType} fetchDocuments={fetchUserDocuments} />
            
            }
            
        </div>
    )
}