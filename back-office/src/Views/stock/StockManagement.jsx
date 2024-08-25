import React from "react";
import AuthenticatedAdminLayout from "@/Layouts/AdminLayouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import Warehouse from "../../components/WarehouseLayout";
import ProductType from "../../components/ProductTypeLayout";
import Product from "../../components/ProductLayout";

export default function StockManagement() {
    const {t} = useTranslation("global");
    const user = usePage().props.auth.user;
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <AuthenticatedAdminLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {locale.translations["Manage users"]}
                </h2>
            }
            app={app}
        >
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select your country
                </label>
                <select
                    id="tabs"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setActiveTab(e.target.value)}
                    value={activeTab}
                >
                    <option value="profile">Profile</option>
                    <option value="dashboard">Dashboard</option>
                    <option value="settings">Settings</option>
                </select>
            </div>

            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                activeTab === "profile"
                                    ? "border-blue-600"
                                    : "border-transparent"
                            }`}
                            onClick={() => setActiveTab("profile")}
                        >
                            {locale.translations["Stock"]}
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                activeTab === "dashboard"
                                    ? "border-blue-600"
                                    : "border-transparent"
                            }`}
                            onClick={() => setActiveTab("dashboard")}
                        >
                            {locale.translations["Wearhouse"]}
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                activeTab === "settings"
                                    ? "border-blue-600"
                                    : "border-transparent"
                            }`}
                            onClick={() => setActiveTab("settings")}
                        >
                            {locale.translations["product type"]}
                        </button>
                    </li>
                </ul>
            </div>

            <div id="default-tab-content">
                {activeTab === "profile" && (
                    <div
                        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        <Product />
                    </div>
                )}
                {activeTab === "dashboard" && (
                    <div
                        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        role="tabpanel"
                        aria-labelledby="dashboard-tab"
                    >
                        <Warehouse />
                    </div>
                )}
                {activeTab === "settings" && (
                    <div
                        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        role="tabpanel"
                        aria-labelledby="settings-tab"
                    >
                        <ProductType />
                    </div>
                )}
            </div>
        </AuthenticatedAdminLayout>
    );
}
