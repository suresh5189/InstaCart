import React from "react";
import GiftCardHome from "./GiftCardHome";
import Ocassion from "./Ocassion";
import GiftCardNav from "./GiftCardNav";
import GiftConvenience from "./GiftConvenience";
import Purchase from "./Purchase";
import FAQuestions from "./FAQuestions";
import Footer from "../Footer";

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
