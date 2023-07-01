import React from "react";
import animationData from "../../Assests/animations/24151-ecommerce-animation.json";
import LottieAnimation from "../lottie";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LottieAnimation animationData={animationData} width={300} height={300} />
    </div>
  );
};

export default Loader;
