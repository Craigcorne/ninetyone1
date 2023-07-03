import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { brandingData } from "../../../static/data";
import styles from "../../../styles/styles";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";
import { backend_url, server } from "../../../server";

const Categories = () => {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${server}/category/categories`);
      const sortedCategories = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCategoriesData(sortedCategories);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  // scrolls
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Categories</h1>
        </div>
      </div>
      <div className="scrollDivScroll">
        <MdChevronLeft className="rightScroll" onClick={slideLeft} size={40} />
        <div
          className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
          id="categories"
        >
          <div
            className="categoryCard"
            id="slider"
            style={{ scrollBehavior: "smooth" }}
          >
            {categoriesData.map((category) => (
              <div className="categoryCardDetails" key={category._id}>
                <h5>{category.name}</h5>
                <img
                  src={`${backend_url}${category?.image}`}
                  className="w-[120px] object-cover"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <MdChevronRight className="leftScroll" onClick={slideRight} size={40} />
      </div>
    </>
  );
};

export default Categories;
