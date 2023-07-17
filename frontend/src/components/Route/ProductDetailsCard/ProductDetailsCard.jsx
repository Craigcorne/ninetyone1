// import React, { useEffect, useState } from "react";
// import {
//   AiFillHeart,
//   AiOutlineHeart,
//   AiOutlineMessage,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { RxCross1 } from "react-icons/rx";
// import { Link } from "react-router-dom";
// import { backend_url } from "../../../server";
// import styles from "../../../styles/styles";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { addTocart } from "../../../redux/actions/cart";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../../redux/actions/wishlist";
// import { NumericFormat } from "react-number-format";

// const ProductDetailsCard = ({ setOpen, data }) => {
//   const { cart } = useSelector((state) => state.cart);
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { products } = useSelector((state) => state.products);
//   const dispatch = useDispatch();
//   const [count, setCount] = useState(1);
//   const [click, setClick] = useState(false);
//   //   const [select, setSelect] = useState(false);

//   const totalReviewsLength =
//     products &&
//     products.reduce((acc, product) => acc + product.reviews.length, 0);

//   const totalRatings =
//     products &&
//     products.reduce(
//       (acc, product) =>
//         acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
//       0
//     );

//   const averageRating = totalRatings / totalReviewsLength || 0;

//   const handleMessageSubmit = () => {};

//   const incrementCount = () => {
//     setCount(count + 1);
//   };
//   const maximum = () => {
//     toast.error(" Qty Maxed Out");
//   };
//   const minimum = () => {
//     toast.error("Minimun Qty reached");
//   };

//   const decrementCount = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };

//   const addToCartHandler = (id) => {
//     const isItemExists = cart && cart.find((i) => i._id === id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (data.stock < count) {
//         toast.error("Product stock exceeded!");
//       } else {
//         const cartData = { ...data, qty: count };
//         dispatch(addTocart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   };

//   useEffect(() => {
//     if (wishlist && wishlist.find((i) => i._id === data._id)) {
//       setClick(true);
//     } else {
//       setClick(false);
//     }
//   }, [wishlist]);

//   const removeFromWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(removeFromWishlist(data));
//   };

//   const addToWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(addToWishlist(data));
//   };
//   const myClickHandler = (e, props) => {
//     setOpen(props);

//     if (!e) {
//       var e = window.event;
//       e.cancelBubble = true;
//     }
//     if (e.stopPropagation) {
//       e.stopPropagation();
//     }
//   };

//   return (
//     <div className="bg-[#fff]">
//       {data ? (
//         <div
//           onClick={(e) => myClickHandler(e, false)}
//           className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center"
//         >
//           <div
//             onClick={(e) => myClickHandler(e, true)}
//             className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4"
//           >
//             {" "}
//             <RxCross1
//               size={30}
//               className="absolute right-3 top-3 z-50"
//               onClick={(e) => myClickHandler(e, false)}
//             />
//             <div className="block w-full 800px:flex">
//               <div className="w-full 800px:w-[50%]">
//                 <img
//                   src={`${backend_url}${data.images && data.images[0]}`}
//                   alt=""
//                 />
//                 <div className="flex">
//                   <Link to={`/shop/preview/${data.shop._id}`} className="flex">
//                     <img
//                       src={`${backend_url}${data?.shop?.avatar}`}
//                       alt=""
//                       className="w-[50px] h-[50px] rounded-full mr-2"
//                     />
//                     <div>
//                       <h3 className={`${styles.shop_name}`}>
//                         {data.shop.name}
//                       </h3>
//                       <h5 className="pb-3 text-[15px]">{averageRating}/5</h5>
//                     </div>
//                   </Link>
//                 </div>
//                 <div
//                   className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
//                   onClick={handleMessageSubmit}
//                 >
//                   <span className="text-[#fff] flex items-center">
//                     Send Message <AiOutlineMessage className="ml-1" />
//                   </span>
//                 </div>
//                 <h5 className="text-[16px] text-[red] mt-5">
//                   {" "}
//                   <h5 className="text-[16px] text-[#68d284] mt-5 ml-4">
//                     {data?.sold_out !== 0 && (
//                       <span>
//                         ({data?.sold_out <= 0 ? 0 : data?.sold_out}) sold
//                       </span>
//                     )}
//                   </h5>
//                 </h5>
//               </div>

//               <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
//                 <h1 className={`${styles.productTitle} text-[20px]`}>
//                   {data.name}
//                 </h1>
//                 <div className="disableStyles">
//                   <p
//                     dangerouslySetInnerHTML={{
//                       __html: data.description,
//                     }}
//                   ></p>
//                 </div>

//                 <div className="flex pt-3">
//                   <h4 className={`${styles.productDiscountPrice}`}>
//                     <NumericFormat
//                       value={data.discountPrice}
//                       displayType={"text"}
//                       thousandSeparator={true}
//                       prefix={"Ksh "}
//                     />
//                     {}
//                   </h4>
//                   <h3 className={`${styles.price}`}>
//                     <NumericFormat
//                       value={data.originalPrice ? data.originalPrice : null}
//                       displayType={"text"}
//                       thousandSeparator={true}
//                       prefix={"Ksh "}
//                     />
//                   </h3>
//                 </div>
//                 <div className="flex items-center mt-12 justify-between pr-3">
//                   <div>
//                     <button
//                       className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
//                       onClick={decrementCount}
//                     >
//                       -
//                     </button>
//                     <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
//                       {count}
//                     </span>
//                     <button
//                       className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
//                       onClick={count < data.stock ? incrementCount : maximum}
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div>
//                     {click ? (
//                       <AiFillHeart
//                         size={30}
//                         className="cursor-pointer"
//                         onClick={() => removeFromWishlistHandler(data)}
//                         color={click ? "red" : "#333"}
//                         title="Remove from wishlist"
//                       />
//                     ) : (
//                       <AiOutlineHeart
//                         size={30}
//                         className="cursor-pointer"
//                         onClick={() => addToWishlistHandler(data)}
//                         title="Add to wishlist"
//                       />
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
//                   onClick={() => addToCartHandler(data._id)}
//                 >
//                   <span className="text-[#fff] flex items-center">
//                     Add to cart <AiOutlineShoppingCart className="ml-1" />
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default ProductDetailsCard;

import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { NumericFormat } from "react-number-format";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [selectedSize, setSelectedSize] = useState(""); // Add state for selected size

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  const handleMessageSubmit = () => {};

  const maximum = () => {
    toast.error("Qty Maxed Out");
  };

  const minimum = () => {
    toast.error("Minimum Qty reached");
  };

  const incrementCount = () => {
    if (count < data.stock) {
      setCount(count + 1);
    } else {
      maximum();
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      minimum();
    }
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock exceeded!");
      } else {
        const cartData = { ...data, qty: count }; // Add selected size to cartData
        // size: selectedSize
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const myClickHandler = (e, props) => {
    setOpen(props);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  // const handleSizeChange = (e) => {
  //   setSelectedSize(e.target.value);
  // };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div
          onClick={(e) => myClickHandler(e, false)}
          className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center"
        >
          <div
            onClick={(e) => myClickHandler(e, true)}
            className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4"
          >
            {" "}
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={(e) => myClickHandler(e, false)}
            />
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${data.images && data.images[0]}`}
                  alt=""
                />
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">{averageRating}/5</h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  {" "}
                  <h5 className="text-[16px] text-[#68d284] mt-5 ml-4">
                    {data?.sold_out !== 0 && (
                      <span>
                        ({data?.sold_out <= 0 ? 0 : data?.sold_out}) sold
                      </span>
                    )}
                  </h5>
                </h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <div className="disableStyles">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  ></p>
                </div>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    <NumericFormat
                      value={data.discountPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh "}
                    />
                    {}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    <NumericFormat
                      value={data.originalPrice ? data.originalPrice : null}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh "}
                    />
                  </h3>
                </div>
                {data.stock < 1 ? (
                  <p className="text-red-600">Out Of Stock</p>
                ) : (
                  <div className="w-full mt-4">
                    <div className="w-full flex">
                      <div className="w-1/2">
                        <div className="text-lg font-bold">Qty:</div>
                        <div className="flex items-center mt-2">
                          <div
                            className={`${
                              count <= 1
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-gray-300 cursor-pointer"
                            } w-10 h-10 flex items-center justify-center rounded-full`}
                            onClick={decrementCount}
                          >
                            <span className="text-xl">-</span>
                          </div>
                          <div className="mx-4">{count}</div>
                          <div
                            className={`${
                              count >= data.stock
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-gray-300 cursor-pointer"
                            } w-10 h-10 flex items-center justify-center rounded-full`}
                            onClick={
                              count >= data.stock ? maximum : incrementCount
                            }
                          >
                            <span className="text-xl">+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {data.stock < 1 ? (
                  ""
                ) : (
                  <div
                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                )}
                {/* <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div> */}
                {/* <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-3">
                    Select Size:
                  </h4>
                  <div className="flex items-center">
                    {data.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`${
                          selectedSize === size
                            ? "bg-teal-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        } mr-2 px-4 py-2 rounded-md`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
