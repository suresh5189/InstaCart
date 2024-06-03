import React, { useState } from "react";
import Data from "../data/storeData";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [visibleCount, setVisibleCount] = useState(9);

  const navigate = useNavigate();

  const showMore = () => {
    setVisibleCount(visibleCount + 6);
  };

  const showLess = () => {
    setVisibleCount(9);
  };

  const handleDetail = () => {
    navigate("/storedetails");
  };

  return (
    <div className="home">
      <div className="headerDiv">
        <header className="header">
          Choose your store in
          <span className="headerTextColor"> San Francisco Bay Area</span>
        </header>
      </div>
      <div className="HomePageButtonDiv" onClick={handleDetail}>
        {Data.slice(0, visibleCount).map(({ image, title, option }) => {
          return (
            <div className="buttonHome">
              <div className="buttonHomeLogo">
                <div className="buttonHomeLogoImage">
                  <a href="/">
                    <img src={image} alt={title} />
                  </a>
                </div>
                <div className="LogoTextDiv">
                  <div className="LogoText">
                    <span className="LogoTextTitle">{title}</span>
                  </div>
                  <div>
                    <span className="LogoTextSubTitle">{option}</span>
                  </div>
                  <div>
                    <span className="LogoTextSubTitleButton">Accepts EBT</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="showMoreLessButtons">
        {visibleCount < Data.length ? (
          <span onClick={showMore} className="ShowMore">
            Show All
          </span>
        ) : (
          <span onClick={showLess} className="ShowLess">
            Show Less
          </span>
        )}
      </div>
    </div>
  );
}

export default HomePage;
