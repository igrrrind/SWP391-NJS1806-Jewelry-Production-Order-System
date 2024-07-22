import Logo from '../../../assets/logo-cropped.webp';
import { Button } from "@/components/ui/button"
import { useNavigate,Outlet, Link, useLocation } from 'react-router-dom'; 
import { useAuth } from '../../../contexts/AuthContext';
import { useState } from 'react';
import { BellDot, Cog, ShoppingCartIcon, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import AccountSidebar from '@/views/account/accountPage';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const components = [
  {
    title: "RINGS",
    href: "/products/rings"
  },
  {
    title: "NECKLACES",
    href: "/products/necklaces"
  },
  {
    title: "BRACELETS",
    href: "/products/bracelets"
  },
  {
    title: "EARRINGS",
    href: "/products/earrings"
  },
  {
    title: "CHARM",
    href: "/products/charms"
  }
]




const Navbar = () => {
    const navigate = useNavigate(); 
    const handleClick = () => navigate('/login'); 
    const handleCartClick = () => navigate('/cart');
    const { currentUser, logout, userDetails } = useAuth()
    const  {list} = useSelector(state => state.cart)

    const handleLogOut = async () => {
      await logout();
      navigate("/");
  }


    const location = useLocation();
    const isAccountRoute = location.pathname.startsWith('/account');

    return (
      <>
          <header className="bg-white shadow-sm font-sans">

          <div className='bg-stone-900 w-full h-7 text-gray-200 text-sm flex justify-center items-center'>{userDetails && <>Happy shopping, {userDetails.firstName}{currentUser.displayName}</>}</div>

          <div className="container mx-auto items-center grid grid-cols-3 py-2">
          <div>
            {/*
            <nav className="flex items-center justify-between text-sm">
              <Link to="/products" className="text-gray-700 hover:text-gray-900">PRODUCTS</Link>
              <Link to="/customize" className="text-gray-700 hover:text-gray-900">CUSTOMIZE & PERSONALIZE</Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">OUR BLOG</Link>
            </nav> */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>PRODUCTS</NavigationMenuTrigger>
                  <NavigationMenuContent>
                  <ul className="grid w-[200px] p-2 md:w-[200px] md:grid-cols-1 lg:w-[200px] rounded-none ">
                    <p className='font-medium p-2 '>TYPES</p>
                    {components.map((component) => (
                      <Link key={component.title} to={component.href}>
                        <p className='hover:bg-stone-200 p-2 rounded-lg transition text-light text-sm'>{component.title}</p>
                      </Link>
                    ))}
                  </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link to="/customize">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    CUSTOMIZE & PERSONALIZE
                  </NavigationMenuLink>
                </Link>
                  
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link to="/customize">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    OUR BLOG
                  </NavigationMenuLink>
                </Link>
                  
                </NavigationMenuItem>
                
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="logo flex justify-center">
             <Link to="/"><img src={Logo} alt="" className='w-20'/></Link>
          </div>

                
          <div className='flex justify-between'>
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
            {!currentUser &&
            <Button variant='outline' onClick={handleClick}>Login</Button> 
            }

            

            <div className="relative flex items-center hover:cursor-pointer">
                <ShoppingCartIcon className="h-6 w-6 text-gray-800" onClick={handleCartClick} />
                {list.length > 0 && (
                    <span className="absolute top-0 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        {list?.length}
                    </span>
                )}
            </div>

            {currentUser &&
             
             <DropdownMenu>
               <DropdownMenuTrigger asChild>
               <div className="flex items-center">
               <BellDot className="h-6 w-6 hover:cursor-pointer"/>
               </div>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
               <DropdownMenuItem><Link to='/account'>Account Settings</Link></DropdownMenuItem>
               <DropdownMenuItem><Link to='/account/orders'>Order History</Link></DropdownMenuItem>
               {userDetails &&  userDetails.roleName !== "Customer" && <DropdownMenuItem><Link to='/dashboard' className='flex items-center text-blue-600'> <span><Cog /> </span>&nbsp;Dashboard</Link></DropdownMenuItem>}
               <DropdownMenuItem className="text-red-500" onClick={handleLogOut}>Logout</DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>
 
 
             }

                    
            {currentUser &&
             
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <div className="flex items-center">
              <User className="h-6 w-6 hover:cursor-pointer"/>
              </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              <DropdownMenuItem><Link to='/account'>Account Settings</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to='/account/orders'>Order History</Link></DropdownMenuItem>
              {userDetails &&  userDetails.roleName !== "Customer" && <DropdownMenuItem><Link to='/dashboard' className='flex items-center text-blue-600'> <span><Cog /> </span>&nbsp;Dashboard</Link></DropdownMenuItem>}
              <DropdownMenuItem className="text-red-500" onClick={handleLogOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


            }

          </div>


          

            
          </div>
        </header>
         <div>
          {isAccountRoute? <AccountSidebar/> :       
          <Outlet/>}
        </div>  
      </>
    );
  };

export default Navbar;

  
  