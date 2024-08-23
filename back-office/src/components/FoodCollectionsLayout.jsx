import { Link, Outlet, NavLink } from 'react-router-dom'

export default function FoodCollectionsLayout() {
    return (
        <>
        <div className="bg-gray-50 w-full rounded-xl p-4">
            <nav className='flex flex-row gap-4'>
            <NavLink 
                    className={({ isActive }) => 
                        isActive 
                        ? 'bg-blue-500 text-white p-2 rounded-lg border shadow' 
                        : 'bg-white p-2 rounded-lg border hover:bg-gray-50 hover:shadow'
                    } 
                    to={'/food_aid/food_collections/index'}
                >
                    Food Collections
                </NavLink>
                <NavLink 
                    className={({ isActive }) => 
                        isActive 
                        ? 'bg-blue-500 text-white p-2 rounded-lg border shadow' 
                        : 'bg-white p-2 rounded-lg border hover:bg-gray-50 hover:shadow'
                    } 
                    to={'/food_aid/food_collections/new'}
                >
                    New Food Collection
                </NavLink>
            </nav>

            <Outlet />
            

        </div>
        
        </>
    )
}