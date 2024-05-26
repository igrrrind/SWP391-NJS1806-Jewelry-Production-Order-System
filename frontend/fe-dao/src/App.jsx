import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
/*
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard'; */


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Customer routes */}
        <Route path="/" element={<MainLayout />}>
        {/*   <Route index element={<HomePage />} /> */}
        </Route>

        {/* Admin routes
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>  */}
      </Routes>
      
    </Router>
  );
};

export default App;