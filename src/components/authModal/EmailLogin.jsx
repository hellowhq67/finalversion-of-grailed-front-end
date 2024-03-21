"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useHistory hook
import { UseAuth } from "@/app/context/AuthContext";
import style from "./style.module.css";

import { toast, ToastContainer } from "react-toastify";
const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const route = useRouter();
  const { createAccountWithEmail } = UseAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await createAccountWithEmail(email, password); // Call your custom login method

      // Reset input fields
      setEmail("");
      setPassword("");
      // Show success message
      toast.success("Sign Up success");
      // Redirect to home page or any other desired route

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className={style.col} onSubmit={handleLogin}>
      <ToastContainer />
      <div style={{ width: "100%" }}>
        <h1 style={{ fontSize: "1.6rem" }}>Create an Account </h1>

      </div>
      <input
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}

        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <p style={{ textAlign: "center", fontSize: "12px" }}>
        THE PLATFORM FOR PERSONAL STYLE Buy sell discover authenticated
        pieces from the world top brands
      </p>
      {error && <p className={style.error}>{error}</p>}
      <button className={style.Btn} type="submit">Log In</button>
    </form>
  );
};

export default EmailLogin;
