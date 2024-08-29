import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RegisterChooser() {
    const {t} = useTranslation("global");
    return (
        <div className="container-80 flex justify-center">
            <div className="bg-gray-50 w-96 p-14 rounded-2xl mt-14 shadow-md">
                <h1 className="text-2xl font-semibold">{t("Would you want to register as a")} </h1>
                <div className="flex flex-col gap-4 mt-4">
                    <Link to="beneficiary" className="bg-blue-400 text-white p-2 rounded-lg border shadow hover:bg-blue-500 hover:shadow-md duration-100">
                        {t("Beneficiary")}
                    </Link>
                    {t("Or")}
                    <Link to="volunteer" className="bg-blue-400 text-white p-2 rounded-lg border shadow hover:bg-blue-500 hover:shadow-md duration-100">
                        {t("Volunteer")}
                    </Link>
                    {t("Or")}
                    <Link to="partner" className="bg-blue-400 text-white p-2 rounded-lg border shadow hover:bg-blue-500 hover:shadow-md duration-100">
                        {t("Partner")}
                    </Link>
                </div>

            </div>
        </div>
    )
}