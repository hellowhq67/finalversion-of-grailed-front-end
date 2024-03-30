"use client";
import Navbar from "@/components/Navigations/Navbar";
import NestedMenu from "@/components/Navigations/NestedMenu";
import React, { useState, useEffect } from "react";
import { UseAuth } from "@/app/context/AuthContext";
import style from "./style.module.css";
import Link from "next/link";
import axios from "axios";
import { Rating, StarIcon } from "@mui/material";
const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/products/total");
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export default function SellPro({ userID }) {
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
         
          // Save user data to local storage
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

 
    fetChUserData();

  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await fetchProducts();
      setProducts(allProducts);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter products based on userID
  const filteredProducts = products.filter(
    (product) => product.userId === userID
  );
const handleDeleteProduct = async (productId) => {
  try {
    const response = await fetch(`https://adminpanellive.vercel.app/api/products/total/${productId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      console.log("Product deleted successfully");
      // Update the products state to remove the deleted product
      setProducts(products.filter((product) => product._id !== productId));
    } else {
      throw new Error('Failed to delete product');
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};


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
          <button className={style.edits}><Link href='/sell/new'>{'+ NEW LISTINGS'}</Link></button>
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
      <div className={style.listingsWrapper}>
        <div className={style.listingsWrapperCol}>
          <div>
            <ul className={style.profileLink}>
              <li>
                <h4 href="">MY ITEMS</h4>
              </li>
              <li>
                <Link style={{textDecoration:"underline",color:"black"}} href="/sell">FOR SELL</Link>
              </li>
              <li>
                <Link href="/sell/sold/">SOLD</Link>
              </li>
              
            </ul>
            <ul className={style.profileLink}>
              <li>
                <h4>MY PROFILE</h4>
              </li>
              <li>
                <Link href="/sell/feedback">FEEDBACK</Link>
              </li>
          
              <li>
                <Link href="/sell/payments">PAYMENTS</Link>
              </li>
              <li>
                <Link href="/sell/settings">SETTINGS</Link>
              </li>
              <li>
                <Link href="/help">HELP</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h1>For Sale</h1>
            {loading ? (
              <p>Loading...</p>
            ) : filteredProducts.length === 0 ? (
              <h2>No items for sale</h2>
            ) : (
              <table className={style.productTable}>
                <thead>
                  <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img src={product.productImage1} alt={product.productName} style={{ width: "50px" }} />
                      </td>
                      <td>{product.productName}</td>
                      <td>${product.price}</td>
                      <td>
                        <button onClick={() => handleDeleteProduct(product._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
