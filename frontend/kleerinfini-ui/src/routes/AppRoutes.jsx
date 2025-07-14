import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProducerProfile from '../pages/ProducerProfile';
import ProducerRegister from '../pages/ProducerRegister';
import Registration from '../client-dashboard/pages/Registration';
import AboutPage from '../client-dashboard/pages/AboutPage';
import HomePage from '../client-dashboard/pages/HomePage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/producer/:id" element={<ProducerProfile />} />
        <Route path="/producer-inscription" element={<ProducerRegister />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
