"use client";
import React from "react";
import style from "./Style.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useState, useEffect } from "react";
import { UseAuth } from "@/app/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase"; // Assuming you have a firebase configuration file

function Sidebar({ toggleSidebar, isOpen }) {
  const [loading, setLoading] = useState(true);
  const { user, logOut } = UseAuth();
  const [location, setLocation] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handelLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setLocation(userData.location || ""); // Assuming location is stored as a field in the user document
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
    setLoading(false);
  }, [user]);
  return (
    <div className={`${style.Sidebar} ${isOpen ? "" : style.closed}`}>
      <Accordion style={{ border: "none", background: "none" }}>
        <AccordionSummary
          expandIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-caret-down"
              viewBox="0 0 16 16"
            >
              <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
            </svg>
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ fontWeight: "bold" }}>
          {user ? (
                 <div>{user.email && <p> {user.email}</p>}</div>
               ) : (
                 <div>Not logged in</div>
               )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={style.checkboxMobile}>
     <Link href={"/favorites"}>FAVORITES</Link>
            <Link href={""}>PURCHASES</Link>
            {!user ? (
              ""
            ) : (
              <Link href={`/profile/${user && user.uid}`}>MY ACCOUNT</Link>
            )}
            {!user ? (
              ""
            ) : (
              <Link href={` /profile/address/${user && user.uid}`}>
                Address
              </Link>
            )}

            {!user ? "" : <Link href={`/sell/${user && user.uid}`}>Sell</Link>}

            <Link onClick={handelLogout} href="">
              SIGN OUT
            </Link>
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
              className="bi bi-caret-down"
              viewBox="0 0 16 16"
            >
              <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
            </svg>
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ fontWeight: "bold" }}>MENSWEAR</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={style.checkboxMobile}>
            <Link href="/products/cetagory/menswear/top">TOPS</Link>
            <Link href="/products/cetagory/menswear/bottoms">bottoms</Link>
            <Link href="/products/cetagory/menswear/footwear">footwear</Link>
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
              className="bi bi-caret-down"
              viewBox="0 0 16 16"
            >
              <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
            </svg>
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ fontWeight: "bold" }}>Womenswear</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={style.checkboxMobile}>
            <Link href="/products/cetagory/womenswear/top">TOPS</Link>
            <Link href="/products/cetagory/womenswear/bottoms">bottoms</Link>
            <Link href="/products/cetagory/womenswear/footwear">footwear</Link>
          </div>
        </AccordionDetails>
      </Accordion>
      <div className={style.otherLinks}>
        <Link href="">Designer</Link>
        <Link href="">Sneakers</Link>

        <Link href="/products">Shop</Link>
        <Link href="/products">collections</Link>
        <Link href="/products">for you</Link>
        <Link href="/about">About</Link>
      </div>
    </div>
  );
}

export default Sidebar;
