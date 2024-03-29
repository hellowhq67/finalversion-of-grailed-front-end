"use client";
import React, { useState, useEffect } from "react";
import { UseAuth } from "@/app/context/AuthContext";
import style from "./style.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Navigations/Navbar";
import NestedMenu from "../../Navigations/NestedMenu";
import Link from "next/link";

function AdressForm({ sellerID }) {
  const { AddressDetails, userDatas } = UseAuth();

  const [addressFormData, setAddressFormData] = useState({
    name: "",
    streetAddress: "",
    country: "",
    apt: "",
    state: "",
    zipcode: "",
  });

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddressDetails(
        addressFormData.name,
        addressFormData.streetAddress,
        addressFormData.country,
        addressFormData.apt,
        addressFormData.state,
        addressFormData.zipcode
      );
      toast.success("Address updated successfully");
      setAddressFormData({
        name: "",
        streetAddress: "",
        country: "",
        apt: "",
        state: "",
        zipcode: "",
      });
    } catch (error) {
      console.error("Error updating address:", error.message);
      toast.error("Error updating address");
    }
  };
  console.log("userdata", userDatas);

  return (
    <div>
      <ToastContainer />
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
              
            >
              MESSAGEAS
            </Link>
          </li>
          <li>
            <Link href="/profile/purchases"> PURCHASES</Link>
          </li>

          <li>
            <Link href="/profile/edit">{" MY ACCOUNT "}</Link>
          </li>

          <li>
            <Link href="/profile/edit"> PROFILE</Link>
          </li>
          <li>
            <Link
              href="/profile/address"
              style={{ textDecoration: "underline" }}
            >
              {"  ADDRESS "}
            </Link>
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

        <form className={style.formWrapper} onSubmit={handleAddressSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={addressFormData.name}
            onChange={(e) =>
              setAddressFormData({
                ...addressFormData,
                name: e.target.value,
              })
            }
            required
          />
          <label>Street Address:</label>
          <input
            type="text"
            value={addressFormData.streetAddress}
            onChange={(e) =>
              setAddressFormData({
                ...addressFormData,
                streetAddress: e.target.value,
              })
            }
            required
          />
     
          <label>Apt:</label>
          <input
            type="text"
            value={addressFormData.apt}
            onChange={(e) =>
              setAddressFormData({
                ...addressFormData,
                apt: e.target.value,
              })
            }
          />
          <label>State:</label>
          <input
            type="text"
            value={addressFormData.state}
            onChange={(e) =>
              setAddressFormData({
                ...addressFormData,
                state: e.target.value,
              })
            }
          />
          <label>Zipcode:</label>
          <input
            type="text"
            value={addressFormData.zipcode}
            onChange={(e) =>
              setAddressFormData({
                ...addressFormData,
                zipcode: e.target.value,
              })
            }
          />
          <button type="submit">Update Address</button>
        </form>
      </div>
    </div>
  );
}

export default AdressForm;
