import { useAuth } from "../hooks/auth";
import { Link, Navigate, Outlet } from 'react-router-dom';
// import '../css/home.css';
import '../css/header.css';
import homePageImg from '../assets/img/homepage.png';
import DevenezBenevoleImg from '../assets/img/DevenezBenevoleImg.png';
import nomoreWasteHomepageImg from '../assets/img/nomorewasteHomepage.png';
import nomorewastePng from '../assets/img/nomorewastePng.png';
import { useRef, useState, useEffect } from "react";
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags'


export default function GuestLayout() {
    const { user, errorrr } = useAuth({ middleware: 'auth' })
    console.log('user :',user, errorrr);


    

    
    const { t, i18n } = useTranslation("global");
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const langDropdownHandler = () => {
        console.log('langDropdownHandler');
        setIsLangDropdownOpen(!isLangDropdownOpen);
    };

    // Fermer le dropdown si un clic est détecté à l'extérieur
    useEffect(() => {

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        setIsLangDropdownOpen(false);
    };

    if(user) {
        return <Navigate to='/' />
    }

    return(
        <>
        <header className="fixed top-0 w-full h-24 bg-white shadow flex items-center">
            <div className="header_container w-full">
                <Link to={"/home"}>
                    <img src={nomorewastePng} className="h-12" alt="" />
                </Link>
                
                <div>
                    {t("Actions")}
                </div>
                <div className="flex items-center gap-6">
                    <div>
                        <Link to={"/connexion"} className='rounded-lg bg-blue-600 text-white p-2 shadow hover:shadow-lg hover:bg-blue-700 duration-100'>
                            {t("Login")} / {t("Register")}
                        </Link>
                    </div>
                    <div className="relative"  ref={dropdownRef}>
                        <button onClick={langDropdownHandler} className="flex justify-between items-center rounded border border-white p-2 w-full hover:border-gray-300 duration-100">
                            <div className="mr-2">
                                {/* {t("Language")} */}
                                {selectedLanguage === 'en' ? <Flag code="GB" className='w-6'/> : selectedLanguage === 'fr' ?  <Flag code="FR" className='w-6'/> : t("Language")}
                            </div>
                            {isLangDropdownOpen ? (
                                <HiChevronDown className="items-center"/>
                            ) : (
                                <HiChevronRight className="items-center"/>
                            )}
                        </button>

                        {isLangDropdownOpen && (
                            <div className="absolute mt-2 bg-white p-3 rounded shadow w-auto min-w-fit z-50">
                                <div onClick={() => changeLanguage('en')} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-200 rounded px-2">
                                    <Flag code="GB" className='w-6'/>
                                    <span className='pr-6'>English</span>
                                </div>
                                <div onClick={() => changeLanguage('fr')} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-200 rounded px-2">
                                    <Flag code="FR" className='w-6'/>
                                    <span className='pr-6'>Français</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
            
        </header>
        <main className="mt-24 ">
            <Outlet />
            coucou{errorrr}
        </main>
        
        </>
    )
}