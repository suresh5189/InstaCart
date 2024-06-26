import React from "react";
import Lottie from "react-lottie";
import NoFavoriteFound from "../../lottie/NoFavoriteFound.json";

const NoFavoriteFOundAnimation = ({ width, height }) => {
  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: NoFavoriteFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{ width, height }} className="LottieFavoriteAnimation">
      <Lottie options={defaultOptions} width={width} height={height} />
      <h1 className="LottieFavoriteAnimationText">No Favorite Product Found</h1>
    </div>
  );
};

export default NoFavoriteFOundAnimation;
