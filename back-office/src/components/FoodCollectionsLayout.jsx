import { Link, Outlet } from 'react-router-dom'

export default function FoodCollectionsLayout() {
    return (
        <>
        <div className="bg-gray-50 w-full rounded-xl p-4">
            <nav className='flex flex-row gap-4'>
                <Link className='bg-white p-2 rounded-lg border hover:bg-gray-50' to={'/food_aid/food_collections'}>Food Collections</Link>
                <Link className='bg-white p-2 rounded-lg border hover:bg-gray-50' to={'/food_aid/food_collections/new'}>New Food Collection</Link>
            </nav>

            <Outlet />
            

        </div>
        
        </>
    )
}