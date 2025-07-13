import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProducerProfile from '../pages/ProducerProfile';
import ProducerRegister from '../pages/ProducerRegister';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/producer/:id" element={<ProducerProfile />} />
        <Route path="/producer-inscription" element={<ProducerRegister />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
