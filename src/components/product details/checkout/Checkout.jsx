"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { UseAuth } from "@/app/context/AuthContext";
import style from "./style.module.css";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
import { Rating, StarIcon } from "@mui/material";
function Checkout({ productId, userID }) {
  const { getAllUsersData } = UseAuth();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
; // State to track active tab
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
    phoneNumber: "",
  });
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Step 2
  };
  const toggleSidebarclose = () => {
    setSidebarOpen(!sidebarOpen); // Step 2
  };
  useEffect(() => {
    let script;
    const addPaypalScript = async () => {
      script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AfHO8_amus0lRs9Kgt_mA2_ZO2diDC5pRwd5ISDsXxCay9IxEFj7uWe3Vdm4nNL7z8S3PEYrOnWdzltM";
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);
    };

    addPaypalScript();

    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://adminpanellive.vercel.app/api/products/${productId}`
        );
        setProduct(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data

        const usersData = await getAllUsersData();
        const user = usersData.find((user) => user.userid === userID);

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
            phoneNumber: user.phoneNumber || "",
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
              phoneNumber: user.phoneNumber || "",
            })
          );
        }

        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [getAllUsersData, userID]);
  
  return (
    <div>
      <ToastContainer />
      <nav className={style.checkout}>
        <Link className={style.logo} href={"/"}>
          <video
            className={style.logo}
            poster="https://assets.grailed.com/logo.jpg"
            width={200}
            autoPlay
            loop
            playsInline
            muted
          >
            <source
              src="https://assets.grailed.com/logo.webm"
              type="video/webm"
            />
            <source
              src="https://assets.grailed.com/logo.mp4"
              type="video/mp4"
            />
          </video>
        </Link>

        <h2 style={{ textAlign: "center" }}>{"ITEM CHECKOUT"}</h2>
      </nav>
      {!product ? (
        <>loading</>
      ) : (
        <div className={style.wrapper}>
          <div className={style.col1}>
            <div>
              <h2>Shipping Address</h2>
              <div className={style.addcard}>
                <div className={style.cardCol}>
                  <h2>{userData.userDisplayName}</h2>

                  <span>
                    <span>{userData.state}</span>
                    {`,`}
                    {userData.streetAddress}
                    {userData.zipcode}
                  </span>
                  <p>{userData.location}</p>
                </div>
                <button>{">"}</button>
              </div>
            </div>
            <div>
              <h2>Phone</h2>
              <div className={style.Numcol}>
                <h3>{userData.phoneNumber}</h3> <button>{">"}</button>{" "}
              </div>
              <p>{`Required for international transactions It will only be used for delivery related issues`}</p>
            </div>
            <div style={{ width: "30vw" }}>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AfHO8_amus0lRs9Kgt_mA2_ZO2diDC5pRwd5ISDsXxCay9IxEFj7uWe3Vdm4nNL7z8S3PEYrOnWdzltM",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical",color:"blue" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: !product.floorPrice ? product.price : product.floorPrice+product.shippings, // Pass the product price as the payment amount
                            currency_code: "USD", // Change to your currency code if needed
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    actions.order.capture()
                    toast.success("Payment approved!");
                    console.log("Payment approved:", data);
                  }}
                  onError={(err) => {
                    // Handle payment error
                    console.error("Payment error:", err);
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
          <div className={style.col2}>
            <div className={style.productCard}>
              <div className={style.infoCOl}>
                <img width={70} src={product.productImage1} alt="" />
                <div className={style.productInfo}>
                  <p>{product.designers}</p>
                  <h2 style={{ fontSize: "12px" }}>{product.productName}</h2>
                  <p>{product.size}</p>
                  <span>
                    seller{" "}
                    <Link
                      style={{
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                      href={`/profile/designer/${product.userId}`}
                    >
                      {product.userName}
                    </Link>
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "39px",
                }}
              >
                <span>
                  {"$"}
                  {!product.floorPrice ? product.price : product.floorPrice}
                </span>
                <div>
                  {" "}
                  <Rating
                    name="half-rating-read"
                    defaultValue={5}
                    precision={4}
                    style={{ color: "darkgreen", fontSize: "16px" }}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className={style.oderDetails}>
              <h2>Order Details</h2>
              <div className={style.oderCOl}>
                <div className={style.colflex}>
                  <span>Listings</span>{" "}
                  <span>
                    {!product.floorPrice ? product.price : product.floorPrice}
                  </span>
                </div>
                <div className={style.colflex}>
                  {" "}
                  <span>Shipping</span> <span>{product.shippings}</span>
                </div>
              </div>
              <div className={style.colflex} style={{ padding: " 6px 0px" }}>
                {" "}
                <h2
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  ORDER TOTAL
                </h2>{" "}
                <span>{!product.floorPrice ? product.price : product.floorPrice+product.shippings}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
