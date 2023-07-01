import React from "react";
import Lottie from "lottie-react";

const LottieAnimation = ({ animationData, width, height }) => {
  return (
    <Lottie
      animationData={animationData}
      style={{ width, height }}
      loop={false}
      autoplay={true}
    />
  );
};

export default LottieAnimation;
