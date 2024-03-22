"use client";
import Navbar from "@/components/Navigations/Navbar";
import NestedMenu from "@/components/Navigations/NestedMenu";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Footer from "@/components/Navigations/Footer";

export default function page() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://adminpanellive.vercel.app/api/blog");
        if (response.ok) {
          const data = await response.json();
          setBlogs(data.Blogs);
        } else {
          throw new Error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Divide blogs into four sections
  const section1 = blogs.slice(0, Math.ceil(blogs.length / 4));
  const section2 = blogs.slice(
    Math.ceil(blogs.length / 4),
    Math.ceil((2 * blogs.length) / 4)
  );
  const section3 = blogs.slice(
    Math.ceil((2 * blogs.length) / 4),
    Math.ceil((3 * blogs.length) / 4)
  );
  const section4 = blogs.slice(Math.ceil((3 * blogs.length) / 4), blogs.length);
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "4rem", borderBottom: "1px solid black" }}>
        <NestedMenu />
      </div>
      <div
        className={styles.bannerCOl}
        style={{
          backgroundImage:
            "url('https://images.ctfassets.net/bdvz0u6oqffk/6Nt6EReVvGm6QkCuGyqkK/68ea21684b8178c18ffc60d66e26d032/about-hero.jpg')",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <h1 className={styles.bannerText}>
            Grailed is the one stop destination <br /> for buying selling and
            exploring <br /> menswear and womenswear import Navbar from{" "}
          </h1>
          <button>EXPLORE</button>
        </div>
      </div>
      <div className={styles.contentCol}>
        {section1.map((blog) => (
          <div className={styles.contentCards}>
            <img src={blog.blogimg} alt="" />
            <div className={styles.desc}>
              <h2>{blog.title}</h2>
              <p>{blog.desc}</p>
              <div className={styles.buttons}>
                <button className={styles.btn}> BROWSE THE SHOP</button>
                <button className={styles.btn}>BUYER PROTECTION</button>
              </div>
            </div>
          </div>
        ))}
        {section2.map((blog) => (
          <div className={styles.contentCards}>
            <div className={styles.desc}>
              <h2>{blog.title}</h2>
              <p>{blog.desc}</p>
              <div className={styles.buttons}>
                <button className={styles.btn}> BROWSE THE SHOP</button>
                <button className={styles.btn}>BUYER PROTECTION</button>
              </div>
            </div>
            <img src={blog.blogimg} alt="" />
          </div>
        ))}
      </div>
      <div
        className={styles.bannerCOl2}
        style={{
          backgroundImage:
            "url(' https://images.ctfassets.net/bdvz0u6oqffk/2tqXZIj93WYMs8kgGi0kmu/6ca7b2e30f323ce1b25fbef662c06a8b/fee-back.jpg')",
        }}
      ></div>

      <div className={styles.contentCol}>
        {section3.map((blog) => (
          <div className={styles.contentCards}>
            <img src={blog.blogimg} alt="" />
            <div className={styles.desc}>
              <h2>{blog.title}</h2>
              <p>{blog.desc}</p>
              <div className={styles.buttons}>
                <button className={styles.btn}> BROWSE THE SHOP</button>
                <button className={styles.btn}>BUYER PROTECTION</button>
              </div>
            </div>
          </div>
        ))}
        {section4.map((blog) => (
          <div className={styles.contentCards}>
            <img src={blog.blogimg} alt="" />
            <div className={styles.desc}>
              <h2>{blog.title}</h2>
              <p>{blog.desc}</p>
              <div className={styles.buttons}>
                <button className={styles.btn}> BROWSE THE SHOP</button>
                <button className={styles.btn}>BUYER PROTECTION</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
