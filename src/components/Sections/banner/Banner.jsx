import React from "react";
import styles from "./Banner.module.css";
import Link from "next/link";
export default function Banner() {
  return (
    <div className={styles.hero}>
      <video
        poster="/heroVideoPoster.jpg"
        src="https://videos.ctfassets.net/bdvz0u6oqffk/2z5u1zVuSQbfB5oRyHXvgR/4fa7c0ce24f0d39308c7d571d60ee5e3/desktop-hp-video.mp4"
        autoPlay
        playsInline
        loop
        muted
      />
      <div className={styles.herocontent}>
        <h3>THE PLATFORM FOR PERSONAL STYLE</h3>
        <h4>
          Buy, sell, discover authenticated pieces from the world’s top brands.
        </h4>
        <div>
          <button className={`${styles.btn} ${styles.btn1}`}>
           <Link  href={'/products/cetagory/menswear/top'}>SHOP MENSWEAR</Link>
          </button>
          <button className={`${styles.btn} ${styles.btn2}`}>
        
           <Link  href={'/products/cetagory/womenswear/top'}>SHOP MENSWEAR</Link>

          </button>
        </div>
      </div>
    </div>
  );
}
