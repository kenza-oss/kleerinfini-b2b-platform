import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProducerProfile from '../pages/ProducerProfile';
import ProducerRegister from '../pages/ProducerRegister';
import Registration from '../client-dashboard/pages/Registration';
import AboutPage from '../client-dashboard/pages/AboutPage';
import HomePage from '../client-dashboard/pages/HomePage';
import DashboardLayout from '../client-dashboard/pages/DashboardLayout';
import MyProfile from '../client-dashboard/components/ProfileForm';
import DashboardHome from '../client-dashboard/pages/DashboardHome';
import ProgrammesExport from '../client-dashboard/pages/Valorisation';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/producer/:id" element={<ProducerProfile />} />
        <Route path="/producer-inscription" element={<ProducerRegister />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardLayout/>} />
        <Route path="/dashboard2" element={<DashboardHome/>} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/valorisation" element={<ProgrammesExport />} />


        {/* Add more routes as needed */}
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
