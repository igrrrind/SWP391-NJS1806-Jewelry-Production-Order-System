import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './views/login/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import ManageOrdersPage from './views/dashboard/manage-orders/ManageOrders';
import ManageProductsPage from './views/dashboard/manage-products/ManageProducts';
import { AuthProvider } from './contexts/AuthContext';
import AddProductPage from './views/dashboard/manage-products/add-product/AddProductPage';
import HomePage from './views/home/HomePage';
import ProductPage from './views/products/ProductsPage';


const products = {
  rings: {
    title: "Rings",
    description: "Explore our exquisite collection of rings.",
  },
  bracelets: {
    title: "Bracelets",
    description: "Discover our stylish bracelets.",
  },
  charms: {
    title: "Charms",
    description: "Find the perfect charm for any occasion.",
  },
  necklaces: {
    title: "Necklaces",
    description: "Elegant and beautiful necklaces for you.",
  },
  earrings: {
    title: "Earrings",
    description: "Browse through our selection of earrings.",
  },
};


const App = () => {

  return (
    <Router>
      <AuthProvider>
      <Routes>
        
        {/* Customer routes */}
        <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />}/> 
        </Route>

        <Route path="/products" element={<MainLayout />}>
              <Route index element={<ProductPage title="Our Products" description="Where else, if not from us" />}/> 

              {Object.entries(products).map(([key, { title, description }]) => (
              <Route 
                key={key} 
                path={key} 
                element={<ProductPage title={title} description={description} />} 
              />
            ))}
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="manage-orders" element={<ManageOrdersPage />}/>        
              <Route path="manage-products" element={<ManageProductsPage />}>          
              </Route> 
              <Route path="add-product" element={<AddProductPage />} />
        </Route>  

        <Route path="/login" element={<LoginPage />}>
        {/*   <Route index element={<HomePage />} /> */}
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;