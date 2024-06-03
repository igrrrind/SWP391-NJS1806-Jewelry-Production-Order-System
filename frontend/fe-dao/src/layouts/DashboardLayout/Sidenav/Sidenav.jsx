import { Gem, Home, ShoppingBag, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '@/components/ui/button';


const Sidenav = () => {

  const { currentUser, logout } = useAuth();


  const handleLogOut = async () => {
      await logout();
      navigate("/");
  }
  

  return (
    <div className="flex h-screen xl:h-screen flex-col p-4 bg-stone-900 text-white min-w-[210px]">
      <div className='h-[50px]'></div>
      <div className="flex items-center mb-6 mx-auto">
        <span className="text-xl font-bold">PACIFA ADMIN</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
               <Home className='inline-block'/> &nbsp; Home 
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-products" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
               <Gem className='inline-block'/> &nbsp; Products
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-orders" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
               <ShoppingBag className='inline-block'/> &nbsp; Orders
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            <UsersRound className='inline-block' /> &nbsp; Manage Users
            </Link>
          </li>
        </ul>
      </nav>
      {currentUser && (
        <div className="mt-auto">
          <Button 
            onClick={handleLogOut}
            className=" border-2 border-cyan-50 block w-full py-2.5 px-4 mb-10 rounded transition duration-200 hover:bg-gray-700"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidenav;