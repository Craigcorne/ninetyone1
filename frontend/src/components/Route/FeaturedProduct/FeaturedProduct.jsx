import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const firstFive = allProductsData && allProductsData.slice(0, 10);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>

        <div className="overflow-x-auto flex space-x-4 mb-12 border-0 ">
          {data &&
            data.map((i, index) => (
              <div className="flex-none w-[250px] h-[400px]" key={index}>
                <ProductCard data={i} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
