import React from "react";
import GiftCardHome from "./GiftCardHome";
import Ocassion from "./Ocassion";
import GiftConvenience from "./GiftConvenience";
import Purchase from "./Purchase";
import FAQuestions from "./FAQuestions";
import Footer from "../Home/Footer";

const GiftCard = () => {
  return (
    <>
      <div className="GiftCardMain">
        <GiftCardHome />
        <Ocassion />
        <GiftConvenience />
        <Purchase />
        <FAQuestions />
      </div>
      <Footer />
    </>
  );
};

export default GiftCard;
