import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProducerProfile from '../pages/ProducerProfile';
import ProducerRegister from '../pages/ProducerRegister';
import DjazagroPage from '../pages/DjazagroPage';
import ProducerDashboard from '../pages/ProducerDashboard';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/producer/:id" element={<ProducerProfile />} />
        <Route path="/producer-inscription" element={<ProducerRegister />} />
        <Route path="/djazagro" element={<DjazagroPage />} />
        <Route path="/producer-dashboard" element={<ProducerDashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
