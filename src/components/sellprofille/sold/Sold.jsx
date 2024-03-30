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
    const response = await axios.get("https://adminpanellive.vercel.app/api/products/total");
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export default function Sold() {

  const { getAllUsersData,user } = UseAuth();
  const userID = user? user.uid :null;
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
        const users = usersData.find((users) => users.userid === userID);

        if (users) {
          setUserData({
            location: users.location || "",
            userDisplayName: users.displayName || "",
            userBio: users.bio || "",
            reting: users.reting || "",
            transaction: users.feedbacks.length || "",
            profileImage: users.profileimgae || "",
            feedbacks: users.feedbacks.length || "",
            feedbacksdata: [users.feedbacks] || "",
          });
         
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

 
    fetChUserData();

  }, []);


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
                <Link  href={`/sell/${userID}`}>FOR SELL</Link>
              </li>
              <li>
                <Link style={{textDecoration:"underline",color:"black"}}  href="/sell/sold/">SOLD</Link>
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
                <Link href="/payments">PAYMENTS</Link>
              </li>
              <li>
                <Link href="/settings">SETTINGS</Link>
              </li>
              <li>
                <Link href="/help">HELP</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h1>Sold</h1>
            <p>you have no items for sold</p>
          </div>
        </div>
      </div>
    </div>
  );
}
