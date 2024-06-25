import React from "react";
import HomePage from "./HomePage";
import HomePageBar from "./HomePageBar";
import Payment from "./Payment";
import DeliveryGrocery from "./DeliveryGrocery";
import GroceryMarketPlace from "./GroceryMarketPlace";
import CommonQuestion from "./CommonQuestion";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const Home = ({ isLoggedIn, handleLogin }) => {
  return (
    <>
      <ToastContainer />
      <div>
        <HomePageBar />
        <HomePage isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
        <Payment />
        <DeliveryGrocery />
        <GroceryMarketPlace />
        <CommonQuestion />
        <Footer />
      </div>
    </>
  );
};

export default Home;
