import Logo from '../../../assets/logo.svg';
import { Button } from "@/components/ui/button"
import { Outlet } from 'react-router-dom';



const Navbar = () => {
    return (
      <>
          <header className="bg-white shadow-sm font-sans">
          <div className='bg-stone-900 w-full inline-block h-7'></div>
          <div className="container mx-auto flex items-center justify-between">
            <nav className="flex items-center space-x-10">
              <a href="#" className="text-gray-700 hover:text-gray-900">PRODUCTS</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">CUSTOMIZE & PERSONALIZE</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">OUR BLOG</a>
            </nav>

            <div className="App">
              <img src={Logo} alt="" className='w-36'/>
          </div>

                
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for a product" 
                  className="border border-gray-300 rounded-full px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M9 17a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </button>
              </div>
              
            </div>
            <Button variant='outline'>Login</Button> 
          </div>
        </header>
        <Outlet/>
      </>
    );
  };

export default Navbar;

  