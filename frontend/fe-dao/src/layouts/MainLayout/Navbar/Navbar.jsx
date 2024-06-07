import Logo from '../../../assets/logo.svg';
import { Button } from "@/components/ui/button"
import { useNavigate,Outlet, Link } from 'react-router-dom'; 
import { useAuth } from '../../../contexts/AuthContext';
import { useState } from 'react';
import { ShoppingCartIcon } from 'lucide-react';




const Navbar = () => {

    const [cartItems, setCartItems] = useState(3);

    const navigate = useNavigate(); 
    const handleClick = () => navigate('/login'); 
    return (
      <>
          <header className="bg-white shadow-sm font-sans">

          <div className='bg-stone-900 w-full inline-block h-7'></div>

          <div className="container mx-auto items-center grid grid-cols-3">
          <div>
            <nav className="flex items-center space-x-10 text-sm">
              <Link to="/products" className="text-gray-700 hover:text-gray-900">PRODUCTS</Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">CUSTOMIZE & PERSONALIZE</Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">OUR BLOG</Link>
            </nav>
          </div>

          <div className="logo flex justify-center">
             <Link to="/"><img src={Logo} alt="" className='w-24'/></Link>
          </div>

                
          <div className='flex justify-between'>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for a product" 
                  className="border border-gray-300 rounded-full px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" text-sm
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M9 17a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </button>
              </div>
              
            </div>
            <Button variant='outline' onClick={handleClick}>Login</Button> 

            <div className="relative hover:cursor-pointer">
                    <ShoppingCartIcon className="h-8 w-8 text-gray-800" />
                    {cartItems > 0 && (
                        <span className="absolute top-0 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {cartItems}
                        </span>
                    )}
             </div>
          </div>

            
          </div>
        </header>
        <Outlet/>
      </>
    );
  };

export default Navbar;

  
  