import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './views/login/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import ManageOrdersPage from './views/dashboard/manage-orders/ManageOrders';
import ManageProductsPage from './views/dashboard/manage-products/ManageProducts';
import { AuthProvider } from './contexts/AuthContext';
import AddProductPage from './views/dashboard/manage-products/add-product/AddProductPage';




const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        
        {/* Customer routes */}
        <Route path="/" element={<MainLayout />}>
        {/*   <Route index element={<HomePage />} /> */}
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