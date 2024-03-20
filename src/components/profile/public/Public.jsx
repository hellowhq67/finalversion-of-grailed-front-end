"use client";
import Navbar from "@/components/Navigations/Navbar";
import NestedMenu from "@/components/Navigations/NestedMenu";
import React, { useState, useEffect } from "react";
import { UseAuth } from "@/app/context/AuthContext";
import style from "./style.module.css";
import { Rating, StarIcon } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import axios from "axios";
import Footer from "@/components/Navigations/Footer";
const fetchProducts = async () => {
  try {
    const response = await axios.get("https://adminpanellive.vercel.app/api/products/total");
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export default function Public({ sellerID }) {
  const { getAllUsersData } = UseAuth();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("listings"); // State to track active tab
  const [userData, setUserData] = useState({
    location: "",
    userDisplayName: "",
    userBio: "",
    reting: "",
    transaction: "",
    profileImage: "",
    name: "",
    streetAddress: "",
    country: "",
    apt: "",
    state: "",
    zipcode: "",
    feedbacks: Number,
    feedbacksdata: [],
  });
  const id = "65f48ae4ddcd139ce52b3818";
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Step 2
  };
  const toggleSidebarclose = () => {
    setSidebarOpen(!sidebarOpen); // Step 2
  };

  console.log(userData.feedbacksdata);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data

        const usersData = await getAllUsersData();
        const user = usersData.find((user) => user.userid === sellerID);

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
            name: user.addressname || "",
            streetAddress: user.streetaddress || "",
            country: user.country || "",
            apt: user.apt || "",
            state: user.state || "",
            zipcode: user.zipcode || "",
          });

          // Save user data to local storage
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
              name: user.addressname || "",
              streetAddress: user.streetaddress || "",
              country: user.country || "",
              apt: user.apt || "",
              state: user.state || "",
              zipcode: user.zipcode || "",
            })
          );
        }
        const fetchData = async () => {
          const allProducts = await fetchProducts();
          const filteredProducts = allProducts.filter(
            (product) => product.userId === sellerID
          );

          setProducts(filteredProducts);
          setLoading(false);
        };

        fetchData();

        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [getAllUsersData, sellerID]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters({ ...filters, [name]: checked });
  };
  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value === "lowPrice") {
      setProducts([...products.sort((a, b) => a.price - b.price)]);
    } else if (value === "highPrice") {
      setProducts([...products.sort((a, b) => b.price - a.price)]);
    } else if (value === "new") {
      setProducts([
        ...products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      ]);
    } else {
      // Default sorting or any other sorting logic
    }
  };

  // Function to filter products based on selected filters
  const filterProducts = (product) => {
    // Check if product matches all selected filters
    for (const filter in filters) {
      if (filters[filter] && filter !== "minPrice" && filter !== "maxPrice") {
        if (filter === "size") {
          if (!product.size.includes(filters[filter])) {
            return false;
          }
        } else if (filter === "minPrice") {
          if (parseInt(product.price) < parseInt(filters[filter])) {
            return false;
          }
        } else if (filter === "maxPrice") {
          if (parseInt(product.price) > parseInt(filters[filter])) {
            return false;
          }
        } else if (
          product.department !== filter &&
          product.category !== filter &&
          product.subcategory !== filter &&
          product.designers !== filter &&
          product.conditon !== filter
        ) {
          return false;
        }
      }
    }
    return true;
  };
  const calculateDiscountPercentage = (price, floorPrice) => {
    return ((price - floorPrice) / price) * 100;
  };

  // Filter products based on userID

  if (loading) {
    return <div>Loading...</div>;
  } // Step 1
  return (
    <div>
      <Navbar />
      <div style={{ margin: "4rem 0px", borderBottom: "1px solid black" }}>
        <NestedMenu />
      </div>
      <div className={style.profileWrapper}>
        <div className={style.profileCol}>
          <div className={style.proimg}>
            <img
              className={style.proImgae}
              src={userData.profileImage}
              alt=""
            />
            <div className={style.infos}>
              <h1>{userData.userDisplayName}</h1>
              <h4>Joined in 2024</h4>
              <p style={{ display: "flex" }}>
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
              <p>{userData.state}</p>
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
                  precision={0.5}
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
          <butto className={style.edits}>Follow</butto>
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
      {/*==========================================================================================================================================================*/}
      {/*==========================================================================================================================================================*/}
      {/*==========================================================================================================================================================*/}
      {/*==========================================================================================================================================================*/}
      {/*==========================================================================================================================================================*/}

      <div className={style.tabButton}>
        <div className={style.bio}>
          <p>{userData.userBio.slice(0, 40)}</p>
          <p>{userData.userBio.slice(40, 80)}</p>
          <p>{userData.userBio.slice(80, 200)}</p>
        </div>
        <div>
          {" "}
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
      </div>
      <div className={style.tab}>
        <hr />

        {/*==========================================================================================================================================================*/}
        {/*==========================================================================================================================================================*/}
        {/*==========================================================================================================================================================*/}
        {/*==========================================================================================================================================================*/}
        {/*==========================================================================================================================================================*/}
        {/*==========================================================================================================================================================*/}
        {/*==========================================================================================================================================================*/}
        {/*==========================================================================================================================================================*/}
        {/*==========================================================================================================================================================*/}

        <div className={style.tabWrapper}>
          {activeTab === "listings" && (
            <>
              <div>
                <div className={style.fiterButton} onClick={toggleSidebar}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    width={30}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                    />
                  </svg>
                </div>
                <div className={style.wrapper2}>
                  <span style={{ fontWeight: "bold" }}>
                    {products.length} listings
                  </span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      className={style.fiterButton}
                      onClick={toggleSidebar}
                      style={{
                        background: "black",
                        color: "white",
                        border: "none",
                        padding: "10px 25px",
                        fontWeight: "bold",
                      }}
                    >
                      filter
                    </button>
                    <select
                      className={style.selectFliter}
                      onChange={handleSortChange}
                    >
                      <option value="">Sort By: Default</option>
                      <option value="trending">Sort By: Trending</option>
                      <option value="lowPrice">Sort By: Low Price</option>
                      <option value="highPrice">Sort By: High Price</option>
                      <option value="new">Sort By: New</option>
                    </select>
                  </div>
                </div>
                <div className={style.wrapper}>
                  <div
                    className={`${style.productFilter} ${
                      sidebarOpen ? "" : style.closed
                    }`}
                  >
                    <button
                      className={style.close}
                      onClick={toggleSidebarclose}
                    >
                      X
                    </button>
                    <div className={style.sizeBox}>
                      <p>
                        Set up to filter out listings that are not in your size.
                      </p>
                      <button className={style.btn}>ADD MY SIZE</button>
                    </div>

                    <Accordion
                      style={{ border: "none", background: "none" }}
                      defaultExpanded
                    >
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontWeight: "bold" }}>
                          Department
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <label style={style.label}>
                            <input
                              type="checkbox"
                              name="MENSWEAR"
                              onChange={handleCheckboxChange}
                            />{" "}
                            Meanswear
                          </label>
                          <label style={style.label}>
                            <input
                              type="checkbox"
                              name="WOMENSWEAR"
                              onChange={handleCheckboxChange}
                            />{" "}
                            Womeanswear
                          </label>
                        </div>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion style={{ border: "none" }} defaultExpanded>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontWeight: "bold" }}>
                          Cetagory
                        </Typography>
                      </AccordionSummary>
                      <Accordion style={{ border: "none" }} defaultExpanded>
                        <AccordionSummary
                          expandIcon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-caret-down"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                            </svg>
                          }
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <Typography style={{ fontWeight: "bold" }}>
                            menwear
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {/*==================top==========================*/}
                          <Accordion style={{ border: "none" }}>
                            <AccordionSummary
                              expandIcon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-caret-down"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                                </svg>
                              }
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography style={{ fontWeight: "bold" }}>
                                top
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className={style.checkbox}>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="TOPS"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>All tops</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="LONG SLEEVE T-SHIRTS"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span> LONG SLEEVE T-SHIRTS</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="POLOS"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>POLOS</span>
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                          {/*==================topclose==========================*/}
                          {/*==================bottom==========================*/}

                          <Accordion style={{ border: "none" }}>
                            <AccordionSummary
                              expandIcon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-caret-down"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                                </svg>
                              }
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography style={{ fontWeight: "bold" }}>
                                Bottoms
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className={style.checkbox}>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="BOTTOMS"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>All bottoms</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="CASUAL PANTS"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>CASUAL PANTS</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="CROPPED PANTS"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>CROPPED PANTS</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="DENIM"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>DENIM</span>
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>

                          {/*==================footwear==========================*/}

                          <Accordion style={{ border: "none" }}>
                            <AccordionSummary
                              expandIcon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-caret-down"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                                </svg>
                              }
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography style={{ fontWeight: "bold" }}>
                                Footwear
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className={style.checkbox}>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="FOOTWEAR"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span> All Footwear</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="SHOES"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>SHOES</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="SNEAKERS"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>SNEAKERS</span>
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>

                          {/*==================footwear==========================*/}
                        </AccordionDetails>
                      </Accordion>
                      <Accordion style={{ border: "none" }}>
                        <AccordionSummary
                          expandIcon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-caret-down"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                            </svg>
                          }
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <Typography style={{ fontWeight: "bold" }}>
                            Womaneswear
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {/*==================top==========================*/}
                          <Accordion style={{ border: "none" }}>
                            <AccordionSummary
                              expandIcon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-caret-down"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                                </svg>
                              }
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography style={{ fontWeight: "bold" }}>
                                top
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className={style.checkbox}>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="BLOUSES"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>BLOUSES</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="BODYSUITS"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>BODYSUITS</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="BUTTON UPS"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>All tops</span>
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                          {/*==================topclose==========================*/}
                          {/*==================bottom==========================*/}

                          <Accordion style={{ border: "none" }}>
                            <AccordionSummary
                              expandIcon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-caret-down"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                                </svg>
                              }
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography style={{ fontWeight: "bold" }}>
                                Bottoms
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className={style.checkbox}>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="Jeans"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>Jeans</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="Leggings"
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  <span>Leggings</span>
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>

                          {/*==================bottom==========================*/}
                          {/*==================footwear==========================*/}
                          <Accordion style={{ border: "none" }}>
                            <AccordionSummary
                              expandIcon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-caret-down"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                                </svg>
                              }
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography style={{ fontWeight: "bold" }}>
                                Footwear
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className={style.checkbox}>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="FOOTWEARS"
                                    value={""}
                                  />{" "}
                                  <span>All Footwear</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="Casual Pants"
                                    value={"Boots"}
                                  />{" "}
                                  <span>Boots</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="Cropped Pants"
                                    value={"hells"}
                                  />{" "}
                                  <span> hells</span>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    name="Denim"
                                    value={""}
                                  />{" "}
                                  <span>Denim</span>
                                </span>
                              </div>
                            </AccordionDetails>
                          </Accordion>

                          {/*==================footwear==========================*/}
                        </AccordionDetails>
                      </Accordion>
                    </Accordion>

                    <Accordion style={{ border: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontWeight: "bold" }}>
                          Size
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <span>
                            <input
                              type="checkbox"
                              name="26"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>26</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="27"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>27</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="29"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>29</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="30"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>30</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="42"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>42</span>
                          </span>
                        </div>
                        <AccordionDetails>
                          <div className={style.checkbox}>
                            <span>
                              <input
                                type="checkbox"
                                name="XXS/40"
                                onChange={handleCheckboxChange}
                              />{" "}
                              <span> XXS/40</span>
                            </span>
                            <span>
                              <input
                                type="checkbox"
                                name="XS/42"
                                onChange={handleCheckboxChange}
                              />{" "}
                              <span> XS/42</span>
                            </span>
                            <span>
                              <input
                                type="checkbox"
                                name=" S/44"
                                onChange={handleCheckboxChange}
                              />{" "}
                              <span> S/44-46</span>
                            </span>
                            <span>
                              <input
                                type="checkbox"
                                name="L/53-54 "
                                onChange={handleCheckboxChange}
                              />{" "}
                              L/53-54 <span></span>
                            </span>
                          </div>
                        </AccordionDetails>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ border: "none", background: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontWeight: "bold" }}>
                          Designer
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <label style={style.label}>
                            <input
                              type="checkBox"
                              name="Gucchi"
                              onChange={handleCheckboxChange}
                            />{" "}
                            Gucchi
                          </label>
                          <label style={style.label}>
                            <input
                              type="checkBox"
                              name="Louis Vuitton"
                              onChange={handleCheckboxChange}
                            />{" "}
                            Louis Vuitton
                          </label>
                          <label style={style.label}>
                            <input
                              type="checkBox"
                              name="Jacquemus"
                              onChange={handleCheckboxChange}
                            />{" "}
                            Jacquemus
                          </label>
                          <label style={style.label}>
                            <input
                              type="checkBox"
                              name="Kapital"
                              onChange={handleCheckboxChange}
                            />{" "}
                            Kapital
                          </label>
                          <label style={style.label}>
                            <input
                              type="checkBox"
                              name="Loewe<"
                              onChange={handleCheckboxChange}
                            />{" "}
                            Loewe
                          </label>
                        </div>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion style={{ border: "none", background: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontWeight: "bold" }}>
                          Condition
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <label style={style.label}>
                            <input
                              type="checkBox"
                              name="new"
                              onChange={handleCheckboxChange}
                            />{" "}
                            New
                          </label>
                          <label style={style.label}>
                            <input
                              type="checkBox"
                              name="used"
                              onChange={handleCheckboxChange}
                            />{" "}
                            Used
                          </label>
                          <label style={style.label}>
                            <input
                              type="checkBox"
                              name="gently_used"
                              onChange={handleCheckboxChange}
                            />{" "}
                            Gently Used
                          </label>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                  <div className={style.productWrapprer}>
                    {products.filter(filterProducts).map((x) => {
                      return (
                        <>
                          <div key={x._id} className={style.ProductSildes}>
                            <Link
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "black",
                              }}
                              href={`/listlings/${x._id}`}
                              passHref
                            >
                              <div className={style.imgCol}>
                                <img src={x.productImage1} alt="" />
                                <span className={style.tags}>{x.vendor}</span>
                              </div>
                              <p>
                                {" "}
                                about 1 hour{" "}
                                <span
                                  style={{ textDecoration: "line-through" }}
                                >
                                  {"(23 days)"}
                                </span>
                              </p>
                              <hr />

                              <div className={style.descCol}>
                                <p className={style.title}>
                                  {x.productName.slice(0, 15)}...
                                </p>
                                <p>{x.description.slice(0, 25)}</p>
                              </div>
                            </Link>
                            <div className={style.priceCol}>
                              <p className={style.price}>
                                <span
                                  style={{ color: "red", margin: "0px 2px" }}
                                >
                                  {" "}
                                  ${x.floorPrice}
                                </span>
                                <span className={style.floorPrice}>
                                  ${x.price}
                                </span>
                                <span className={style.discount}>
                                  {" "}
                                  {`${calculateDiscountPercentage(
                                    x.price,
                                    x.floorPrice
                                  ).toFixed(0)}% off`}
                                </span>
                              </p>
                              <button className={style.btn}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  width={24}
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
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
          {/*==========================================================================================================================================================*/}
          {/*==========================================================================================================================================================*/}
          {/*==========================================================================================================================================================*/}
          {/*==========================================================================================================================================================*/}
          {/*==========================================================================================================================================================*/}
          {/*==========================================================================================================================================================*/}
          {/*==========================================================================================================================================================*/}
          {/*==========================================================================================================================================================*/}

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
                        <>
                          <Link
                            style={{ textDecoration: "none", color: "black" }}
                            href={`/listings/${id}`}
                          >
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
                                <p>
                             
                                  {x.productName}{" "}
                                </p>
                              </div>
                              <div>
                                <Link href={`/listings/${id}`}>
                                  <img src={x.productimgae} alt="" />
                                </Link>
                              </div>
                            </div>
                          </Link>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
