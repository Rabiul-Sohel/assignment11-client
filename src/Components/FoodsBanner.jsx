import React from "react";
import Container from "../Utility/Container";
import { TiArrowSortedDown } from "react-icons/ti";


const FoodsBanner = ({scrollToSection}) => {
    
  return (
    <Container>
      <div className="max-w-3xl text-center space-y-2">
        <h2 className="text-5xl font-bold">About Our Foods</h2>
        <p>Savor a symphony of flavors crafted with passion and precision in our food section. From tantalizing appetizers to mouthwatering entrees, our menu celebrates culinary artistry while embracing fresh, seasonal ingredients. Dive into a culinary journey that promises to delight your senses and leave you craving more.</p>
       
        <button onClick={()=> scrollToSection('section1')} className="text-6xl  inline"><TiArrowSortedDown /></button>
        
      </div>
    </Container>
  );
};

export default FoodsBanner;
