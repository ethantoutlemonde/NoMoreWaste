import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import axiosClient from "../../axios-client";

export default function RegisterPartner() {
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [files, setFiles] = useState({
        idCard: null,
        ownership: null
    });
    const [success, setSuccess] = useState({});
    const [errors, setErrors] = useState({});
    const {t} = useTranslation("global");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const { name, files: [file] } = e.target;
        setFiles({
            ...files,
            [name]: file
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        console.log('submit');
        console.log(data);
        console.log(files)

        // FormData to handle file uploads
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('password', data.password);
        formData.append('idCard', files.idCard);
        formData.append('ownership', files.ownership);


        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        axiosClient.post(`/api/partner`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log(response)
            setData((prevData) => ({
                ...prevData,
                password: ''
            }));
            setSuccess(response.data)
            navigate('/connexion/login')
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.error);
            }
        })

    }
    return (
        <div className="container-80 flex justify-center">
            <div className="bg-gray-50 w-96 p-14 rounded-2xl mt-14 shadow-md">
                <h1 className="text-2xl font-semibold ">{t('Register as Partner')}</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-1 mt-6">
                    <label className="mt-2">{t("First Name")}</label>
                    <input name="first_name" type="text" value={data.first_name} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("First Name")} />
                    {errors.first_name && <p className="text-red-500">{errors.first_name[0]}</p>}
                    <label className="mt-2">{t("Last Name")}</label>
                    <input name="last_name" type="text" value={data.last_name} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Last Name")} />
                    {errors.last_name && <p className="text-red-500">{errors.last_name[0]}</p>}
                    <label className="mt-2">{t("Email")}</label>
                    <input name="email" type="email" value={data.email} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Email")} />
                    {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                    <label className="mt-2">{t("Phone")}</label>
                    <input name="phone" type="text" value={data.phone} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Phone")} />
                    {errors.phone && <p className="text-red-500">{errors.phone[0]}</p>}
                    <label className="mt-2">{t("Password")}</label>
                    <input name="password" type="password" value={data.password} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Password")} />
                    {errors.password && <p className="text-red-500">{errors.password[0]}</p>}

                    <label className="mt-2">{t("Id card of the owner")}</label>
                    <input name="idCard" type="file" onChange={handleFileChange} className="p-2 rounded-lg border shadow bg-white" />
                    {errors.idCard && <p className="text-red-500">{errors.idCard[0]}</p>}
                    
                    <label className="mt-2">{t("certificate of ownership")}</label>
                    <input name="ownership" type="file" onChange={handleFileChange} className="p-2 rounded-lg border shadow bg-white" />
                    {errors.ownership && <p className="text-red-500">{errors.ownership[0]}</p>}
                    <button className="mt-4 bg-blue-500 text-white p-2 rounded-lg border shadow hover:bg-blue-600 hover:shadow-md duration-100">
                        {t('Register')}
                    </button>
                    {success.success && <p className="text-green-500">{success.success}</p>}
                </form>

            </div>
        </div>
    )
}