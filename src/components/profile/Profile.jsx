"use client";
import Navbar from "@/components/Navigations/Navbar";
import NestedMenu from "@/components/Navigations/NestedMenu";
import React, { useState, useEffect } from "react";
import { UseAuth } from "@/app/context/AuthContext";
import style from "./style.module.css";
import ProductFlter from "../productFilter/ProductFlter";
import Feedback from "@/components/productFilter/Feedback";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase"; // Assuming you have a firebase configuration file
import axios from "axios";
import { Rating, StarIcon } from "@mui/material";
const fetchProducts = async () => {
  try {
    const response = await axios.get("https://adminpanellive.vercel.app/api/products");
    console.log("res", response);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default function Profile({ userID }) {
  const [activeTab, setActiveTab] = useState("listings"); // State to track active tab
  const [filters, setFilters] = useState({});
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [loading, setLoading] = useState(true);
  const { getAllUsersData } = UseAuth();
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({
    location: "",
    userDisplayName: "",
    userBio: "",
    reting: "",
    transaction: "",
    profileImage: "",
    feedbacks: Number,
    feedbacksdata: [],
  });
  useEffect(() => {
    const fetChUserData = async () => {
      try {
        const usersData = await getAllUsersData();
        const user = usersData.find((user) => user.userid === userID);
        console.log("user", user);

        if (user) {
          setUserData({
            location: user.location || "",
            userDisplayName: user.displayName || "",
            userBio: user.bio || "",
            reting: user.reting || "",
            transaction: user.feedbacks.length || "",
            profileImage: user.profileimgae || "",
            feedbacks: user.feedbacks.length || "",
            feedbacksdata: [user.feedbacks] || "",
          });
          localStorage.setItem(
            "userData",
            JSON.stringify({
              location: user.location || "",
              userDisplayName: user.displayName || "",
              userBio: user.bio || "",
              reting: user.reting || "",
              transaction: user.feedbacks.length || "",
              profileImage: user.profileimgae || "",
              feedbacks: user.feedbacks.length || "",
              feedbacksdata: user.feedbacks || "",
            })
          );
          // Save user data to local storage
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    const fetchData = async () => {
      const allProducts = await fetchProducts();
      setProducts(allProducts);
      setLoading(false);
    };
    fetChUserData();
    fetchData();
  }, []);

  // Filter products based on userID
  const filteredProducts = products.filter(
    (product) => product.userId === userID
  );
  const calculateDiscountPercentage = (price, floorPrice) => {
    return ((price - floorPrice) / price) * 100;
  };
  return (
    <div>
      <Navbar />
      <div style={{ margin: "4rem 0px", borderBottom: "1px solid black" }}>
        <NestedMenu />
      </div>
      <div className={style.profileWrapper}>
        <div className={style.profileCol}>
          <div className={style.profileRow}>
            <img
              className={style.proImgae}
              src={userData.profileImage}
              alt=""
            />
            <div className={style.profileFlex}>
              {userData ? (
                <div>
                  <h1>{userData.userDisplayName}</h1>
                  <h4>Joined in 2024</h4>

                  <p style={{display:"flex"}}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      width={20}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    {userData.location}
                  </p>
                </div>
              ) : (
                <div>Not logged in</div>
              )}
            </div>
          </div>

          <div className={style.profileInfo}>
            <div>
              <span>
                {" "}
                {userData.feedbacks}
                <Rating
                  name="half-rating-read"
                  defaultValue={3}
                  precision={3}
                  readOnly
                  style={{ color: "green" }}
                />
              </span>
              <p> reviews</p>
            </div>
            <div>
              <span>{userData.transaction}</span>
              <p>Transactions</p>
            </div>
            <div>
              <span>0</span>
              <p>Followers</p>
            </div>
          </div>
        </div>
        <div className={style.buttonCol}>
          <button className={style.editButton}>
            <Link
              style={{ textDecoration: "none", color: "black", padding: "2px" }}
              href="/profile/edit"
            >
              EDIT PROFILE
            </Link>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width={40}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={style.tabButton}>
        <span
          className={activeTab === "listings" ? style.activeTab : ""}
          onClick={() => handleTabChange("listings")}
        >
          Listings
        </span>
        <span
          className={activeTab === "feedback" ? style.activeTab : ""}
          onClick={() => handleTabChange("feedback")}
        >
          Feedback
        </span>
      </div>
      <div className={style.tab}>
        <hr />

        <div className={style.tabWrapper}>
          {activeTab === "listings" && (
            <>
              <div className="">
                {loading ? (
                  <p>Loading...</p>
                ) : filteredProducts.length === 0 ? (
                  <h2>No items for sale</h2>
                ) : (
                  <div className="">
                    {loading ? (
                      <p>Loading...</p>
                    ) : filteredProducts.length === 0 ? (
                      <h2>No items for sale</h2>
                    ) : (
                      <>
                        <ProductFlter products={filteredProducts} />
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
         {activeTab === "feedback" && (
            <>
              <div className={style.feedbackSection}>
                <div>
                  <div className={style.sallerFlex}>
                    <div className={style.sellerScore}>
                      <div>
                        <h2>Seller Score</h2>
                        <p>Feedback{userData.feedbacks}</p>
                      </div>
                      <div>
                        <Rating
                          name="half-rating-read"
                          defaultValue={userData.feedbacks}
                          precision={0.5}
                          readOnly
                          style={{ color: "darkgreen" }}
                        />
                      </div>
                      <div className={style.bacthCOL}>
                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.314)",
                            color: "grey",
                            padding: "8px 10px",
                            border: "1px solid rgba(54, 52, 52, 0.626)",
                          }}
                        >
                          FAST SHIPPER
                        </div>

                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.314)",
                            color: "grey",
                            padding: "8px 10px",
                            border: "1px solid rgba(54, 52, 52, 0.626)",
                          }}
                        >
                          ITEM AS DESCRIBED
                        </div>

                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.314)",
                            color: "grey",
                            padding: "8px 10px",
                            border: "1px solid rgba(54, 52, 52, 0.626)",
                          }}
                        >
                          QUICK REPLIES
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className={style.feedbackCol}>
                    {userData.feedbacksdata[0].map((x) => {
                      return (
                        <div className={style.feedcard} key={x.id}>
                          <div className={style.feedData}>
                            <span>March 8 2024</span>
                            <Rating
                              name="half-rating-read"
                              defaultValue={x.reting}
                              precision={0.5}
                              style={{
                                color:
                                  x.reting === 1
                                    ? "red"
                                    : x.reting === 3
                                    ? "yellow"
                                    : "darkgreen",
                              }}
                              readOnly
                            />

                            <p>{x.description}</p>
                            <div className={style.batchFiled}>
                              <div
                                style={{
                                  background: "rgba(243, 238, 238, 0.486)",
                                  color: "grey",
                                  padding: "4px 7px",
                                  fontSize: "10px",
                                }}
                              >
                                FAST SHIPPER
                              </div>
                              <div
                                style={{
                                  background: "rgba(243, 238, 238, 0.709)",
                                  color: "grey",
                                  padding: "4px 7px",
                                  fontSize: "10px",
                                }}
                              >
                                {x.bacth}
                              </div>
                            </div>

                            <Link href="" style={{ color: "black" }}>
                              {"BARBOUR × STREETWEAR × VINTAGE"}
                            </Link>
                            <p> {x.productName} </p>
                          </div>
                          <div>
                            <img src={x.productimgae} alt="" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
