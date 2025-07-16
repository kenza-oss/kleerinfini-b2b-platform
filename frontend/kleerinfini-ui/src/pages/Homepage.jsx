import React from "react";

import BussinesSection from "../components/BussinesSection";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import SearchSection from "../components/SearchSection";
import ExportProductsSection from "../components/ExportProductsSection";
import StepsGuideSection from "../components/StepsGuideSection";
import Whychoose from "../components/Whychoose";
import Signup from "../components/Signup";
import Footer from "../components/Footer";
import CertificationBadge from "../components/CertificationBadge"; // You mentioned this one

function Homepage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <SearchSection />
     
      <ExportProductsSection />
      <Signup />
      <BussinesSection />
      
      <StepsGuideSection />
       
       
        
      
       
      <Whychoose />
   
      <Footer />
 
    </div>
  );
}

export default Homepage;
