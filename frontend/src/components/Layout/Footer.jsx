import React, { useState } from "react";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineShoppingCart,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
const subscribeSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email should be valid"),
});

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: subscribeSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      await axios
        .post(`${server}/user/subscribe`, {
          email: values.email,
        })
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
      setLoading(false);
      resetForm();
    },
  });

  const myClickHandler2 = (e, props) => {
    setOpenCart(props);
    setOpenWishlist(false);
    setSearchOpen(false);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  return (
    <>
      <div className="bg-[#000] text-white">
        <div className="md:flex md:justify-between md:items-center px-2 lg:px-4 bg-[#342ac8] py-4 lg:py-7">
          <h1 className="lg:text-[24px] md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5 text-[16px]">
            <span className="text-[#56d879]">Subscribe</span> us for get news
            events and offers
          </h1>
          <div>
            <form onSubmit={formik.handleSubmit} className="block lg:flex">
              <div className="block">
                <input
                  type="text"
                  required
                  placeholder="Enter your email..."
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                  className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-0 lg:mt-1">
                  {formik.touched.email && formik.errors.email}
                </p>
              </div>
              <button
                type="submit"
                className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full"
              >
                {loading ? (
                  <p className="flex">
                    <Spinner /> sending...
                  </p>
                ) : (
                  <p className="">Send</p>
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-4 lg:py-8 sm:text-center">
          <ul className="text-center sm:text-start flex sm:block flex-col items-center">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              className="w-28 h-28 m-auto"
              alt=""
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <br />
            <p>The home and elements needed to create beautiful products.</p>
            <div className="flex items-center mt-[15px]">
              <BsFacebook
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="icon facebook-icon"
              />
              <AiOutlineTwitter
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="icon twitter-icon"
              />
              <AiFillInstagram
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="icon instagram-icon"
              />
              <AiFillYoutube
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="icon youtube-icon"
              />
              <a
                href="https://api.whatsapp.com/send?phone=254741895028&text=Hey%20NinetyOne,%20what%20do%20I%20add"
                target="_blank"
                rel="noopener noreferrer"
                className="icon whatsapp-icon"
              >
                <AiOutlineWhatsApp size={20} />
              </a>
            </div>
          </ul>

          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">Company</h1>
            {footerProductLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">Shop</h1>
            {footercompanyLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">Support</h1>
            {footerSupportLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-white-400 text-sm pb-8 mb-[50px] lg:mb-0">
          <span>
            &copy; {new Date().getFullYear()} eShop. All rights reserved.
          </span>
          <span>Terms · Privacy Policy</span>
          <div className="sm:block flex items-center justify-center w-full">
            <img
              src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
              alt=""
            />
          </div>
        </div>
        <a
          href="https://api.whatsapp.com/send?phone=254726327352&text=Hey%20Craig,%20what%20do%20I%20add"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-16 lg:bottom-4 right-4 bg-green-500 text-white rounded-full p-3 hover:bg-green-600 transition duration-300 z-10 flex items-center justify-center group"
        >
          <AiOutlineWhatsApp size={24} />
          <span className="smart-text hidden group-hover:inline-block ml-2">
            Chat with us
          </span>
        </a>
        <div
          className="relative mr-[20px]"
          onClick={(e) => myClickHandler2(e, true)}
        >
          <div
            className="fixed bottom-24 lg:bottom-12 right-4 bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition duration-300 z-10 flex items-center justify-center group"
            style={{ marginBottom: "20px" }}
            onClick={(e) => myClickHandler2(e, true)}
          >
            <AiOutlineShoppingCart size={24} />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-5 h-5 top right p-0 m-0 text-white  text-[12px] leading-tight text-center">
              {cart && cart.length}
            </span>
          </div>
        </div>
      </div>
      {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
    </>
  );
};

export default Footer;
