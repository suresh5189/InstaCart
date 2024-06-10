import React, { useState } from "react";
import HomePage from "./HomePage";
import HomePageBar from "./HomePageBar";
import Payment from "./Payment";
import DeliveryGrocery from "./DeliveryGrocery";
import GroceryMarketPlace from "./GroceryMarketPlace";
import CommonQuestion from "./CommonQuestion";
import Footer from "./Footer";

const Home = ({isLoggedIn}) => {
  return (
    <div>
      <HomePageBar />
      <HomePage isLoggedIn={isLoggedIn}/>
      <Payment />
      <DeliveryGrocery />
      <GroceryMarketPlace />
      <CommonQuestion />
      <Footer />
    </div>
  );
};

export default Home;
