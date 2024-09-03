import { useAuth } from "../hooks/auth";
import { Link, Navigate, NavLink } from 'react-router-dom';
import '../css/header.css';
import nomorewastePng from '../assets/img/nomorewastePng.png';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';


export default function VolunteerLayout() {
    const { user } = useAuth({ middleware: 'auth' })
    const { t } = useTranslation("global");
    const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
    const dropdownActivityRef = useRef(null);

    

    const activityDropdownHandler = () => {
        // console.log('userDropdownHandler');
        setIsActivityDropdownOpen(!isActivityDropdownOpen);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownActivityRef.current && !dropdownActivityRef.current.contains(event.target)) {
                setIsActivityDropdownOpen(false);

            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownActivityRef]);



    if(!user) {
        return <Navigate to='/home' />
    }

    if(user.type === 2) {
        console.log('Beneficiary');
        return <Navigate to='/beneficiary' />
    }

    return (
        <>
            <div className="flex gap-4">
                <NavLink to={'/volunteer/documents'} className={({ isActive }) => 
                        isActive 
                        ? ' p-2 rounded-lg bg-gray-50 hover:shadow' 
                        : 'bg-white p-2 rounded-lg hover:bg-gray-50 hover:shadow'
                    } >{t("Documents")}
                </NavLink>
                <div className="relative"  ref={dropdownActivityRef}>
                        <button onClick={activityDropdownHandler} className="p-2 flex justify-between items-center rounded hover:bg-gray-50 duration-100">
                            <span>{t("Activities")}</span>
                            {isActivityDropdownOpen ? (
                                <HiChevronDown className="items-center"/>
                            ) : (
                                <HiChevronRight className="items-center"/>
                            )}
                        </button>

                        {isActivityDropdownOpen && (
                            <div className="absolute mt-2 bg-white p-3 rounded shadow w-auto min-w-fit z-50 flex flex-col gap-2">
                                <Link className="hover:underline" to={'/volunteer/Activity/participate'}>Participate</Link>
                                <Link className="hover:underline"  to={'/volunteer/Activity'}>My Activities</Link>
                            </div>
                        )}
                    </div>
                <NavLink to={'/volunteer/foodAid'} className={({ isActive }) => 
                        isActive 
                        ? ' p-2 rounded-lg bg-gray-50 hover:shadow' 
                        : 'bg-white p-2 rounded-lg hover:bg-gray-50 hover:shadow'
                    } >{t("Food Aid")}
                </NavLink>
            </div>
            
        </>
    )
}