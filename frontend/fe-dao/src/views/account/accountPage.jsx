import { BaggageClaim, ChevronLeft, PhoneCallIcon, Star, UserCircle } from 'lucide-react';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AccountSidebar = () => {
    return (
        <div className="flex h-screen bg-stone-200 space-x-6 p-4">
            {/* Sidebar */}
            <div className="w-64 bg-white rounded-sm">
                <div className="flex items-center justify-center h-16 mt-6 text-black hover:cursor-pointer hover:underline text-sm">
                    <span className=" font-semibold bg-slate-200 flex rounded-md p-1 pr-2"><ChevronLeft size={20}/> BACK</span>
                </div>
                
                {/* Navigation Links */}
                <nav className="mt-4 text-stone-700 font-medium">
                    {/* Account Info */}
                    <Link to="/account/orders" className="flex px-6 py-3  hover:bg-green-100 transition">
                    <UserCircle className='mr-4'/>Account Info
                    </Link>

                    {/* Favourites */}
                    <Link to="/account/orders" className="flex px-6 py-3  hover:bg-green-100 transition ">
                    <Star className='mr-4'/>
                    Favourites
                    </Link>

                    {/* Orders */}
                    <Link to="/account/orders" className="flex px-6 py-3  hover:bg-green-100 transition ">
                    <BaggageClaim className='mr-4'/>
                    Orders
                    </Link>

                    {/* Contact Staff */}
                    <Link to="/account/orders" className="flex px-6 py-3  hover:bg-green-100 transition ">
                    <PhoneCallIcon className='mr-4'/>
                    Contact Staff
                    </Link>
                </nav>

            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-10 bg-white rounded-sm">
                {<Outlet/>}
            </div>
        </div>
    );
}

export default AccountSidebar;
