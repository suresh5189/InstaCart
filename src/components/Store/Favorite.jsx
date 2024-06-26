import React from "react";
import { useSelector } from "react-redux";
import NoFavoriteFOundAnimation from "./NoFavoriteFoundAnimation";

const Favorite = () => {
  const favoriteDetails = useSelector((state) => state.favorite.favorites);
  console.log(favoriteDetails);

  return (
    <>
      <div className="FavoriteHeading">
        <h1>Favorite Products : </h1>
      </div>
      <div className="Favorite">
      {favoriteDetails && favoriteDetails.length > 0 ? (
        favoriteDetails.map(({ id, image, title, actual_price, label }) => (
            <div className="FavoriteDiv" key={id}>
              <div className="FavoriteImageDiv">
                <img src={image} alt="" className="FavoriteImage" />
              </div>
              <div className="FavoriteTitleDiv">
                <span className="FavoriteTitle">{title}</span>
              </div>
              <div className="FavoritePriceDiv">
                <span className="FavoritePrice">Price : {actual_price}</span>
              </div>
              <div className="FavoriteLabelDiv">
                <span className="FavoriteLabel">{label}</span>
              </div>
            </div>
        ))
    ) : (
        <div className="NotFoundFavoriteAnimationDiv">
          <NoFavoriteFOundAnimation width={400} height={400} />
        </div>
      )}
      </ div>
    </>
  );
};

export default Favorite;
