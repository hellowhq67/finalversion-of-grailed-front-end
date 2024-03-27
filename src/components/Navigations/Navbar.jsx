"use client";
import style from "./Style.module.css";
import Link from "next/link";
import Modals from "../authModal/Modals";
import React, { useState, useEffect } from "react";
import { UseAuth } from "@/app/context/AuthContext";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, logOut } = UseAuth();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    }
    checkAuthentication();
  }, [user]);
  const handelLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className={style.header}>
        <div className={style.logoCol}>
          <Link href={"/"}>
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
          <div className={style.inputcol}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              width={40}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input type="text" placeholder="search" className={style.input} />
            <button className={style.btn3}>SEARCH</button>
          </div>
        </div>
        <ul className={style.links}>
          {loading ? null : !user ? (
            <li>
              <Link onClick={handleOpen} className={style.sell} href="">
                SELL
              </Link>
            </li>
          ) : (
            <li>
              <Link className={style.sell} href={`/sell/${user.uid}`}>
                SELL
              </Link>
            </li>
          )}
       
          <li>
            <Link href="/products"> SHOP</Link>
          </li>
          <li>
            <Link href="/reads">READ</Link>
          </li>
          {loading ? null : !user ? (
         ''
          ) : (
            <li>
              <Link href="/favorites">
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </Link>
            </li>
          )}
          {loading ? null : !user ? (
            <>
              <li>
                <Link href="">
                  <button onClick={handleOpen} className={style.btn1}>
                    LOGIN
                  </button>
                </Link>
              </li>
              <li>
                <Link href="">
                  <button onClick={handleOpen} className={style.btn2}>
                    SIGN UP
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <li className={style.profileCon}>
              {" "}
              <Link href="/profile">
                <div className={style.userColwrapper}>
                  <Link href={`/profile/${user.uid}`}>
                    <img
                      src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1502403816.1643644406&semt=sph"
                      className={style.profile}
                      alt=""
                    />
                  </Link>
                </div>
              </Link>
              <div className={style.prfilDropdown}>
                <Link  href={`/profile/${user.uid}`}> {!user.displayName?user.email.slice(0,3):user.displayName} </Link>
                <Link href={"/massages"}>MESSAGES</Link>
                <Link href={"/favorites/"}>FAVORITES</Link>
                <Link href={"/massages"}>PURCHASES</Link>
                              <Link href={`/sell/${user.uid}`}>
                SELL
              </Link>
                <Link  href={`/sell/${user.uid}`}>FOR SALE</Link>
                <Link href={`/sell/${user.uid}`}>SOLD</Link>
                <Link  href={`/profile/${user.uid}`}>MY ACCOUNT</Link>
                <Link onClick={handelLogout} href="">
                  SIGN OUT
                </Link>
              </div>
            </li>
          )}
        </ul>
        <ul className={style.mobileMenus}>
          {!user ? <li onClick={handleOpen}>Sign In</li> : ""}
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width={30}
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </li>
          <li>
            <button className={style.bars} onClick={toggleSidebar}>
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
      <Modals handleOpen={handleOpen} open={open} handleClose={handleClose} />
      <Sidebar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
    </>
  );
}
