import React from "react";
import styles from "./Banner.module.css";
import Link from "next/link";
export default function Banner2() {
  return (
    <div>
      <div
        className={styles.bannerCOl}
        style={{
          backgroundImage:
            "url('https://images.ctfassets.net/bdvz0u6oqffk/6Nt6EReVvGm6QkCuGyqkK/68ea21684b8178c18ffc60d66e26d032/about-hero.jpg')",
        }}
      >
        <h1>
          THE One stop destination for buying selling <br />
          and exploring fashion
        </h1>
        <button
          style={{
            padding: "15px 20px ",
            background: "blue",
            color: "white",
            width: "200px",
            fontSize: "20px",
            margin: "20px",
          }}
        >
          <Link style={{textDecoration:"none",color:"#ffff"}} href={`/products`}>Shop all</Link>
        </button>
      </div>
    </div>
  );
}
