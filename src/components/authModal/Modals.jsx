"use client";
import React, { useEffect, useState } from "react";
import { UseAuth } from "@/app/context/AuthContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import style from "./style.module.css";
import SignIn from "./SignIn";
import Log from "./Log";
import EmailLogin from "./EmailLogin";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25rem",
  height: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexDirection: "column",
};

export default function Modals({ open, handleClose }) {
  const [activeTab, setActiveTab] = useState("signIn");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const { user, googleSignIn, logOut } = UseAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  const handleEmailLoginClick = () => {
    handleTabChange("emailLogin");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles}>
        {activeTab === "signIn" && <SignIn />}
        {activeTab === "logIn" && <Log />}
        {activeTab === "emailLogin" && <EmailLogin />}
        <hr />
        <div className={style.btnCol}>
        {activeTab !== "emailLogin" && ( // Conditional rendering to hide the button
            <button className={style.btn4} onClick={handleEmailLoginClick}>
              CREATE ACCOUNT WITH EMAIL
            </button>
          )}

          <span
            style={{ textAlign: "center", cursor: "pointer" }}
            onClick={() =>
              activeTab === "signIn"
                ? handleTabChange("logIn")
                : activeTab === "logIn"
                ? handleTabChange("emailLogin")
                : handleTabChange("signIn")
            }
          >
            {activeTab === "signIn"
              ? "Already have an account?:LOG IN"
              : activeTab === "logIn"
              ? "Login with email"
              : "SIGN IN"}
          </span>
        </div>
      </Box>
    </Modal>
  );
}
