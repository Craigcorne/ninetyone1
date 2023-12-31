// import React, { useEffect, useState } from "react";
// import {
//   AiFillHeart,
//   AiOutlineHeart,
//   AiOutlineMessage,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import Typed from "react-typed";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
// import { backend_url, server } from "../../server";
// import styles from "../../styles/styles";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../redux/actions/wishlist";
// import { addTocart } from "../../redux/actions/cart";
// import { toast } from "react-toastify";
// import Ratings from "./Ratings";
// import axios from "axios";
// import { FiCopy } from "react-icons/fi";

// const ProductDetails = ({ data }) => {
//   console.log(data);
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { cart } = useSelector((state) => state.cart);
//   const { user, isAuthenticated } = useSelector((state) => state.user);
//   const { products } = useSelector((state) => state.products);
//   const [count, setCount] = useState(1);
//   const [click, setClick] = useState(false);
//   const [select, setSelect] = useState(0);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllProductsShop(data && data?.shop._id));
//     if (wishlist && wishlist.find((i) => i._id === data?._id)) {
//       setClick(true);
//     } else {
//       setClick(false);
//     }
//   }, [data, wishlist]);

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

//   const removeFromWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(removeFromWishlist(data));
//   };

//   const addToWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(addToWishlist(data));
//   };

//   const addToCartHandler = (id) => {
//     const isItemExists = cart && cart.find((i) => i._id === id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (data.stock < 1) {
//         toast.error("Product stock limited!");
//       } else {
//         const cartData = { ...data, qty: count };
//         dispatch(addTocart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   };

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

//   const avg = totalRatings / totalReviewsLength || 0;

//   const averageRating = avg.toFixed(2);

//   const handleMessageSubmit = async () => {
//     if (isAuthenticated) {
//       const groupTitle = data._id + user._id;
//       const userId = user._id;
//       const sellerId = data.shop._id;
//       await axios
//         .post(`${server}/conversation/create-new-conversation`, {
//           groupTitle,
//           userId,
//           sellerId,
//         })
//         .then((res) => {
//           navigate(`/inbox?${res.data.conversation._id}`);
//         })
//         .catch((error) => {
//           toast.error(error.response.data.message);
//         });
//     } else {
//       toast.error("Please login to create a conversation");
//     }
//   };

//   const copyToClipboard = (text) => {
//     console.log("text", text);
//     var textField = document.createElement("textarea");
//     textField.innerText = text;
//     document.body.appendChild(textField);
//     textField.select();
//     document.execCommand("copy");
//     textField.remove();
//     toast.info("Link copied to clipboard");
//   };

//

import React, { useEffect, useState } from "react";

import { formatDistanceToNow } from "date-fns";

import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Typed from "react-typed";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import { FiCopy } from "react-icons/fi";

const ProductDetails = ({ data }) => {
  console.log(data);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  // const [selectedSize, setSelectedSize] = useState("");
  // const [sizes, setSizes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
    if (data && data.sizes) {
      // setSizes(data.sizes);
      // setSelectedSize(data.sizes[0]);
    }
  }, [data, wishlist]);

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

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        // size: selectedSize
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

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

  const averageRating =
    totalReviewsLength > 0 ? (totalRatings / totalReviewsLength).toFixed(2) : 0;

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.post(
          `${server}/api/messages`,
          {
            recipientId: data.shop._id,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        navigate(`/messages/${response.data.conversation._id}`);
      } catch (error) {
        console.log("Error creating conversation: ", error);
      }
    } else {
      toast.error("Please login to send a message!");
    }
  };

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    toast.success("Product link copied to clipboard!");
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${data && data.images[select]}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((image, index) => (
                      <div
                        className={`${
                          select === index ? "border" : null
                        } cursor-pointer`}
                      >
                        <img
                          src={`${backend_url}${image}`}
                          alt=""
                          className="h-[100px] w-[100px] object-cover mr-3 mt-3"
                          // className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>
                <br />

                <div className="videlink">
                  <a href={data.video}> Video Product Link</a>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>

                <div className="disableStyles">
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        data.description.length > 450
                          ? data.description.slice(0, 450) + "..."
                          : data.description,
                    }}
                  ></p>
                </div>

                <br />
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

                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      ({averageRating}/5) Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
                <div className="flex gap-10 items-center my-3">
                  <h3 className="product-heading">Product Link :</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    <div className="flex items-center">
                      <FiCopy size={25} className="fs-5 me-2" />
                      <Typed
                        strings={["Click Here To Copy The Product Link"]}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p
            className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line disableStyles"
            dangerouslySetInnerHTML={{
              __html: data.description,
            }}
          ></p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item, index) => (
                <div className="w-full flex my-4" key={index}>
                  <img
                    src={`${backend_url}/${item.user.avatar}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt=""
                  />
                  <div className="pl-2">
                    <div className="flex w-full items-center">
                      <h1 className="font-[600] pr-2">{item.user.name}</h1>
                      <Ratings rating={item.rating} />
                    </div>
                    <p className="font-[400] text-[#000000a7]">
                      {item?.comment}
                    </p>
                    <p className="text-[#1307f1a7] text-sm">
                      {formatDistanceToNow(new Date(item?.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${backend_url}${data?.shop?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p
              className="pt-2"
              dangerouslySetInnerHTML={{
                __html: data.shop.description,
              }}
            ></p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
