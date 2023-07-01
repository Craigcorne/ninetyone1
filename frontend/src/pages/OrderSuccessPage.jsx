import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import animationData from "../Assests/animations/107043-success.json";
import Meta from "../components/Meta";

import { Link } from "react-router-dom";
import LottieAnimation from "../components/lottie";

const OrderSuccessPage = () => {
  return (
    <div>
      <Meta title="Orders" />

      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  // const defaultOptions = {
  //   loop: false,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <LottieAnimation
          animationData={animationData}
          width={300}
          height={300}
        />
        <h5 className="text-center mb-0 text-[25px] text-[#000000a1]">
          Order Placed successfully
        </h5>
        <Link
          to="/profile"
          className="m-auto w-32 group mt-2 relative h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Order Details
        </Link>
        <br />
        <br />
      </div>
    </div>
  );
};

export default OrderSuccessPage;
