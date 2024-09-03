import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function BeneficiaryActivityLayout() {

    return (
        <div className="container-80 p-10 bg-gray-50 rounded-3xl">
            <nav className='my-6 flex gap-4'>
                <NavLink to={'/beneficiary/activities/all'} className={({ isActive }) => 
                        isActive 
                        ? ' p-2 rounded-lg bg-blue-500 shadow text-white' 
                        : 'bg-white p-2 rounded hover:bg-gray-50 shadow'
                    } >All Activities</NavLink>
                <NavLink to={'/beneficiary/activities/myActivities'} className={({ isActive }) => 
                        isActive 
                        ? ' p-2 rounded-lg bg-blue-500 shadow text-white' 
                        : 'bg-white p-2 rounded hover:bg-gray-50 shadow'
                    } >My Activities</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}