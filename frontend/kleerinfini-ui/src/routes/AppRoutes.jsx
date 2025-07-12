import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProducerProfile from '../pages/ProducerProfile';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/producer/:id" element={<ProducerProfile />} />
        {/* Add more routes here later */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
