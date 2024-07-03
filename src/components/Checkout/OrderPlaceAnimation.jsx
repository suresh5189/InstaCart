import React from "react";
import Lottie from "react-lottie";
import LottieAnimation from "../../lottie/LottieAnimation.json";

const OrderPlaceAnimation = ({ width, height, isVisible }) => {
  if (!isVisible) return null;
  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: LottieAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{ width, height }} className="LottieAnimation">
      <Lottie options={defaultOptions} width={width} height={height} />
      <h1 className="LottieAnimationText">Order Placed Successfully</h1>
    </div>
  );
};

export default OrderPlaceAnimation;
