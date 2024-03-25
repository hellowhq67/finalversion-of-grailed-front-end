"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import style from "./Style.module.css";

import { Pagination, Navigation } from "swiper/modules";

export default function Slider() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products when component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/products/total"
      );
      // Filter products where userName is "STAFPRODUCTS"
      const filteredProducts = response.data.products.filter(
        (product) => product.userName === "STAFPRODUCTS"
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const calculateDiscountPercentage = (price, floorPrice) => {
    return ((price - floorPrice) / price) * 100;
  };

  return (
    <div className={style.SliderCol}>
      <div className={style.wrapper}>
        <div className={style.flex}>
          <h2>Staff Picks</h2>{" "}
          <Link
            style={{ textDecoration: "none" }}
            href="/products/staf"
          >{`SEE ALL->`}</Link>
        </div>
        <Swiper
          slidesPerView={5} // Show 4 slides per view
          spaceBetween={20} // Space between slides
          modules={[Pagination, Navigation]}
          breakpoints={{
            "@0.00": {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            "@0.20": {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            "@0.48": {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            "@0.64": {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 5,
              spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          
          className={style.swiper}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className={style.swiperslide}>
              <div className={style.ProductSildes}>
                <Link
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "black",
                  }}
                  href={`/listlings/${product._id}`}
                >
                  <div className={style.link}>
                    <div className={style.imgCol}>
                      <img src={product.productImage1} alt="" />
                      {!product.vendor ? (
                        ""
                      ) : (
                        <span className={style.tags}>{product.vendor}</span>
                      )}
                    </div>
                    <div className={style.time}>
                      {" "}
                      about 1 hour{" "}
                      <span style={{ textDecoration: "line-through" }}>
                        {"(23 days)"}
                      </span>
                    </div>
                    <hr />
                    <div className={style.descCol}>
                      <p className={style.title}>
                        {product.productName.slice(0, 15)}...
                      </p>
                      <p className={style.desc}>{product.description.slice(0, 25)}</p>
                    </div>
                  </div>
                </Link>
                <div className={style.priceCol}>
                  <div className={style.price}>
                    <span style={{ color: "red", margin: "0px 2px" }}>
                      {" "}
                      ${product.floorPrice ? product.floorPrice : ""}
                    </span>
                    <span className={style.floorPrice}>${product.price}</span>
                    <span className={style.discount}>
                      {" "}
                      {`${calculateDiscountPercentage(
                        product.price,
                        product.floorPrice
                      ).toFixed(0)}% off`}
                    </span>
                  </div>
                  <button className={style.btn}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      width={20}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
