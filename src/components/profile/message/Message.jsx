"use client";
import Navbar from "@/components/Navigations/Navbar";
import NestedMenu from "@/components/Navigations/NestedMenu";
import style from "./style.module.css";
import { UseAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import Link from "next/link";
function Message() {
  const [activeTab, setActiveTab] = useState("buy"); // State to track active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const { user } = UseAuth();
  if (!user) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <div
        style={{
          margin: "4rem 0px",
          borderBottom: "1px solid black",
          width: "100%",
        }}
      >
        <NestedMenu />
      </div>
      <div className={style.profileEditWrappper}>
        <ul className={style.profileLink}>
          <li>
            <Link
              href="/profile/message"
              style={{ textDecoration: "underline" }}
            >
              {" "}
              MESSAGEAS
            </Link>
          </li>
          <li>
            <Link href="/profile/purchases"> PURCHASES</Link>
          </li>


          <li>
            <Link href=""> MY ACCOUNT</Link>
          </li>
          <li>
            <Link href="/profile/edit"> PROFILE</Link>
          </li>
          <li>
            <Link href={`/profile/address/${user.uid}`}>ADDRESS </Link>
          </li>
          <li>
            <Link href="">NOTIFICATIONS </Link>
          </li>
          <li>
            <Link href="">DEVICES </Link>
          </li>
          <li>
            <Link href="/about/contact">HELP</Link>
          </li>
        </ul>
        <div className={style.tabSection}>
          <div className={style.tabCol}>
            <span
              className={activeTab === "buy" ? style.activeTab : ""}
              onClick={() => handleTabChange("buy")}
            >
              BUY MESSAGE
            </span>
            <span
              className={activeTab === "sell" ? style.activeTab : ""}
              onClick={() => handleTabChange("sell")}
            >
              {" "}
              BUY SELL MESSAGE
            </span>
          </div>

          <div className={style.tab}>
            {activeTab === "buy" && (
              <>
                <div><p>{`Your conversations will appear here when you make an offer, ask a question, or purchase an item.`}</p></div>
              </>
            )}
            {activeTab === "sell" && (
              <>
                <div>{"Sell massage "}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
