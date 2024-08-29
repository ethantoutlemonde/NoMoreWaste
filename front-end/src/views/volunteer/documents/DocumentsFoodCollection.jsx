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
        console.log('DocumentsFoodCollection, user:', user);
        axiosClient.get(`/api/volunteer/${user.id}/documents`)
        .then(response => {
            console.log('DocumentsFoodCollection, response:', response);
        })
    }, []);

    const handleUploadDocument = (type) => {
        console.log('handleClickDocument, type:', type);
        setSelectedType(type);
    }

    const handleDownloadDocument = (type) => {
        console.log('handleDownloadDocument, type:', type);
    }

    
    return (
        <>
        {/* <div>DocumentsFoodCollection</div> */}
        <div className="grid grid-cols-2 gap-4">
            <div className=" bg-white p-4 rounded-lg flex flex-col gap-4 shadow">
                <h2 className="text-lg font-medium">{t("Driver")}</h2>
                <div className="w-full bg-gray-50 rounded-md p-2 grid grid-cols-6">
                    <div className="col-span-1">
                        {documents.some(doc => doc.type === 1) ? <div>🟢</div> : <div>🔴</div>}
                    </div>
                    
                    <div className="col-span-4">{t("Id card")}</div>
                    <div className="col-span-1">
                    {documents.some(doc => doc.type === 1) 
                        ? <button onClick={() => handleDownloadDocument(documents.find(doc => doc.type === 1))}>Download</button> 
                        : <button onClick={() => handleUploadDocument(1)}>Upload</button>
                    }
                    </div>
                </div>
                <div className="w-full bg-gray-50 rounded-md p-2 grid grid-cols-6">
                    <div className="col-span-1">
                        {documents.some(doc => doc.type === 3) ? <div>🟢</div> : <div>🔴</div>}
                    </div>
                    
                    <div className="col-span-4">{t("Driving license")}</div>
                    <div className="col-span-1">
                    {documents.some(doc => doc.type === 1) 
                        ? <button onClick={() => handleDownloadDocument(documents.find(doc => doc.type === 1))}>Download</button> 
                        : <button onClick={() => handleUploadDocument(2)}>Upload</button>
                    }
                    </div>
                </div>
                <div className="w-full bg-gray-50 rounded-md p-2 grid grid-cols-6">
                    <div className="col-span-1">
                        {documents.some(doc => doc.type === 3) ? <div>🟢</div> : <div>🔴</div>}
                    </div>
                    
                    <div className="col-span-4">{t("Criminal record")}</div>
                    <div className="col-span-1">
                    {documents.some(doc => doc.type === 1) 
                        ? <button onClick={() => handleDownloadDocument(documents.find(doc => doc.type === 1))}>Download</button> 
                        : <button onClick={() => handleUploadDocument(3)}>Upload</button>
                    }
                    </div>
                </div>
            </div>
            <div className=" bg-white p-4 rounded-lg flex flex-col gap-4 shadow">
                <h2 className="text-lg font-medium">{t("Volunteer")}</h2>
                <div className="w-full bg-gray-50 rounded-md p-2 grid grid-cols-6">
                    <div className="col-span-1">
                        {documents.some(doc => doc.type === 1) ? <div>🟢</div> : <div>🔴</div>}
                    </div>
                    
                    <div className="col-span-4">{t("Id card")}</div>
                    <div className="col-span-1">
                    {documents.some(doc => doc.type === 1) 
                        ? <button onClick={() => handleDownloadDocument(documents.find(doc => doc.type === 1))}>Download</button> 
                        : <button onClick={() => handleUploadDocument(4)}>Upload</button>
                    }
                    </div>
                </div>
                <div className="w-full bg-gray-50 rounded-md p-2 grid grid-cols-6">
                    <div className="col-span-1">
                        {documents.some(doc => doc.type === 3) ? <div>🟢</div> : <div>🔴</div>}
                    </div>
                    
                    <div className="col-span-4">{t("Criminal record")}</div>
                    <div className="col-span-1">
                    {documents.some(doc => doc.type === 1) 
                        ? <button onClick={() => handleDownloadDocument(documents.find(doc => doc.type === 1))}>Download</button> 
                        : <button onClick={() => handleUploadDocument(5)}>Upload</button>
                    }
                    </div>
                </div>
            </div>
            {SelectedType &&
            <UploadDocument type={SelectedType} />
            
            }
            
        </div>
        
            
        </>
    )
}