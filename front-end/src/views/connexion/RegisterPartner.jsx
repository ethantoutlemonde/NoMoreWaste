import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import axiosClient from "../../axios-client";

export default function RegisterPartner() {
    const [data, setData] = useState({
        name: '',
        address: '',
        city: '',
        postal_code: '',
        country: '',
        email: '',
        phone: '',
        siret: '',
        password: ''

    });
    const [success, setSuccess] = useState({});
    const [errors, setErrors] = useState({});
    const {t} = useTranslation("global");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors({});
        console.log('submit')
        console.log(data)

        axiosClient.post(`/api/supermarket`, data)
        .then((response) => {
            console.log(response)
            setData((prevData) => ({
                ...prevData,
                password: ''
            }));
            setSuccess(response.data)
            navigate('/connexion/login/user')
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
                    <label className="mt-2">{t("Name")}</label>
                    <input name="name" type="text" value={data.name} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Name")} />
                    {errors.name && <p className="text-red-500">{errors.name[0]}</p>}

                    <label className="mt-2">{t("Address")}</label>
                    <input name="address" type="text" value={data.address} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Address")} />
                    {errors.address && <p className="text-red-500">{errors.address[0]}</p>}

                    <label className="mt-2">{t("City")}</label>
                    <input name="city" type="text" value={data.city} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("City")} />
                    {errors.city && <p className="text-red-500">{errors.city[0]}</p>}

                    <label className="mt-2">{t("Postal Code")}</label>
                    <input name="postal_code" type="text" value={data.postal_code} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Postal Code")} />
                    {errors.postal_code && <p className="text-red-500">{errors.postal_code[0]}</p>}

                    <label className="mt-2">{t("Country")}</label>
                    <input name="country" type="text" value={data.country} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Country")} />
                    {errors.country && <p className="text-red-500">{errors.country[0]}</p>}

                    <label className="mt-2">{t("Email")}</label>
                    <input name="email" type="email" value={data.email} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Email")} />
                    {errors.email && <p className="text-red-500">{errors.email[0]}</p>}

                    <label className="mt-2">{t("Phone")}</label>
                    <input name="phone" type="text" value={data.phone} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Phone")} />
                    {errors.phone && <p className="text-red-500">{errors.phone[0]}</p>}

                    <label className="mt-2">{t("SIRET Number")}</label>
                    <input name="siret" type="text" value={data.siret} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("SIRET Number")} />
                    {errors.siret && <p className="text-red-500">{errors.siret[0]}</p>}

                    <label className="mt-2">{t("Password")}</label>
                    <input name="password" type="password" value={data.password} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Password")} />
                    {errors.password && <p className="text-red-500">{errors.password[0]}</p>}

                    <button className="mt-4 bg-blue-500 text-white p-2 rounded-lg border shadow hover:bg-blue-600 hover:shadow-md duration-100">
                        {t('Register')}
                    </button>
                    {success.success && <p className="text-green-500">{success.success}</p>}
                </form>
            </div>
        </div>
    )
}