import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProducerProfile from '../pages/ProducerProfile';
import ProducerRegister from '../pages/ProducerRegister';
import Homepage from '../pages/Homepage';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails'
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Products" element={<Products />} />
         <Route path="/ProductDetails" element={<ProductDetails />} />
        <Route path="/producer/:id" element={<ProducerProfile />} />
        <Route path="/producer-inscription" element={<ProducerRegister />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
