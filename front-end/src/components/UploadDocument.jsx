import { useState } from "react";
import axiosClient from "../axios-client";
import { useTranslation } from "react-i18next";

export default function UploadDocument({type, fetchDocuments}) {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [success, setSuccess] = useState({});
    const [errors, setErrors] = useState({});
    const {t} = useTranslation('global');

    const handleFileChange = (e) => {
        const { files: [file] } = e.target;
        setFile(file);
    };


    const submitDocument = (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess({});
        console.log('submitDocument, file:', file);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('type', type);
        axiosClient.post('/api/document', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('submitDocument, response:', response);
            setSuccess(response.data);
            fetchDocuments();
        })
        .catch(error => {
            console.log('submitDocument, error:', error);
            setErrors(error.response.data.error);
        })
    }
    return (
        <>
        <div className="col-span-1 bg-white p-4 rounded-lg  shadow">
                <h2 className="text-lg font-medium mb-4">{t("Upload your File")}</h2>
                <form onSubmit={submitDocument} className="flex flex-col gap-4">
                    <input name="name" type="text" placeholder={t('Name')} onChange={(e) => setName(e.target.value)} className="p-2 rounded-lg border shadow" />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                    <input name="file" type="file" onChange={handleFileChange} className="p-2 rounded-lg border shadow" />
                    {errors.file && <p className="text-red-500">{errors.file}</p>}
                    <button type="submit" className="bg-blue-400 text-white p-2 rounded-lg border shadow hover:bg-blue-500 hover:shadow-md duration-100">{t("Upload")}</button>
                </form>
                {success.success && <p className="text-green-500">{success.success}</p>}
                {errors.error && <p className="text-red-500">{errors.error}</p>}
                {errors.type && <p className="text-red-500">{errors.type}</p>}
            </div>
        </>
    )
}