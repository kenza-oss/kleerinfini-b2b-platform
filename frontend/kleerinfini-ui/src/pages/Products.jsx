import React from 'react'
import Header from "../components/Header";
import Product from "../components/ProductGrid";
import HeroProducts from '../components/HeroProducts';

import SearchBar from '../components/SearchBar';
import Footer from "../components/Footer";

function Products () {
  return (
    <div>
            <Header />
            <HeroProducts/>
            <SearchBar />
             <Product />
                
                   <Footer />
    </div>
    
  )
}

export default Products