import { useEffect, useState } from "react"
import axiosClient from "../../../axios-client";
import { useAuth } from "../../../hooks/auth";
import { useTranslation } from "react-i18next";
import UploadDocument from "../../../components/UploadDocument";

export default function DocumentsFoodCollection() {
    const { user } = useAuth({ middleware: 'auth' })
    const [documents, setDocuments] = useState([]);
    const [SelectedType, setSelectedType] = useState(null);
    const {t} = useTranslation('global');
    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = () => {
        console.log('DocumentsFoodCollection, user:', user);
        axiosClient.get(`/api/volunteer/${user.id}/documents`)
        .then(response => {
            console.log('DocumentsFoodCollection, response:', response);
            setDocuments(response.data);
            documents.some(doc => doc.type_id === 1) ? console.log(true) : console.log(false); ;
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
        <>
        {/* <div>DocumentsFoodCollection</div> */}
        <div className="grid grid-cols-2 gap-4">
            <div className=" bg-white p-4 rounded-lg flex flex-col gap-4 shadow">
                <h2 className="text-lg font-medium">{t("Driver")}</h2>
                <div className="w-full bg-gray-50 rounded-md p-2 grid grid-cols-6">
                    <div className="col-span-1">
                    {documents.map(doc => {
                        if (doc.type_id === 1) {
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
                    
                    <div className="col-span-4">{t("Id card")}</div>
                    <div className="col-span-1">
                    {documents.some(doc => doc.type_id === 1) 
                        ? <button onClick={() => handleDownloadDocument(documents.find(doc => doc.type_id === 1))}>Download</button> 
                        : <button onClick={() => handleUploadDocument(1)}>Upload</button>
                    }
                    </div>
                </div>
                <div className="w-full bg-gray-50 rounded-md p-2 grid grid-cols-6">
                    <div className="col-span-1">
                    {documents.map(doc => {
                        if (doc.type_id === 2) {
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
                    
                    <div className="col-span-4">{t("Driving license")}</div>
                    <div className="col-span-1">
                    {documents.some(doc => doc.type_id === 2) 
                        ? <button onClick={() => handleDownloadDocument(documents.find(doc => doc.type_id === 2))}>Download</button> 
                        : <button onClick={() => handleUploadDocument(2)}>Upload</button>
                    }
                    </div>
                </div>
                <div className="w-full bg-gray-50 rounded-md p-2 grid grid-cols-6">
                    <div className="col-span-1">
                    {documents.map(doc => {
                        if (doc.type_id === 3) {
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
                    
                    <div className="col-span-4">{t("Criminal record")}</div>
                    <div className="col-span-1">
                    {documents.some(doc => doc.type_id === 3) 
                        ? <button onClick={() => handleDownloadDocument(documents.find(doc => doc.type_id === 3))}>Download</button> 
                        : <button onClick={() => handleUploadDocument(3)}>Upload</button>
                    }
                    </div>
                </div>
            </div>
            <div className=" bg-white p-4 rounded-lg flex flex-col gap-4 shadow">
                <h2 className="text-lg font-medium">{t("Volunteer")}</h2>
                <div className="w-full bg-gray-50 rounded-md p-2 grid grid-cols-6">
                    <div className="col-span-1">
                    {documents.map(doc => {
                        if (doc.type_id === 1) {
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
                    
                    <div className="col-span-4">{t("Id card")}</div>
                    <div className="col-span-1">
                    {documents.some(doc => doc.type_id === 1) 
                        ? <button onClick={() => handleDownloadDocument(documents.find(doc => doc.type_id === 1))}>Download</button> 
                        : <button onClick={() => handleUploadDocument(1)}>Upload</button>
                    }
                    </div>
                </div>
                <div className="w-full bg-gray-50 rounded-md p-2 grid grid-cols-6">
                    <div className="col-span-1">
                    {documents.map(doc => {
                        if (doc.type_id === 3) {
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
                    
                    <div className="col-span-4">{t("Criminal record")}</div>
                    <div className="col-span-1">
                    {documents.some(doc => doc.type_id === 3) 
                        ? <button onClick={() => handleDownloadDocument(documents.find(doc => doc.type_id === 3))}>Download</button> 
                        : <button onClick={() => handleUploadDocument(3)}>Upload</button>
                    }
                    </div>
                </div>
            </div>
            {SelectedType &&
            <UploadDocument type={SelectedType} fetchDocuments={fetchDocuments} />
            
            }
            
        </div>
        
            
        </>
    )
}