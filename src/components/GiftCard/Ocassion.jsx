import React from "react";
import Support from '../../images/GiftCard1.webp';
import Virtual from '../../images/GiftCard2.webp';
import Congrats from '../../images/GiftCard3.webp';

const Ocassion = () => {
  return (
    <div className="Occasion">
      <div className="OccasionHeading">Perfect for any occasion</div>
      <div className="OccasionContainer">
        <div className="OccasionImageContainer">
          <img src={Support} alt="" className="OccasionImage" />
          <h2 className="OccasionText">Support loved ones</h2>
        </div>
        <div className="OccasionImageContainer">
          <img src={Virtual} alt="" className="OccasionImage" />
          <h2 className="OccasionText">Support loved ones</h2>
        </div>
        <div className="OccasionImageContainer">
          <img src={Congrats} alt="" className="OccasionImage" />
          <h2 className="OccasionText">Support loved ones</h2>
        </div>
      </div>
    </div>
  );
};

export default Ocassion;
