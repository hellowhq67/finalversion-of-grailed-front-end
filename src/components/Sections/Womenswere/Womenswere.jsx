import React from "react";
import style from "./Style.module.css";
import Link from "next/link";
const data = [
  {
    img: "https://media-assets.grailed.com/prd/misc/896ade0245e148a0839fcc14ef64f0e0?w=180&h=180&fit=clip&q=40&auto=format",
    title: " Tops",
    path: "/products/cetagory/womenswear/top",
  },
  {
    img: "https://media-assets.grailed.com/prd/misc/8220856346fc451daf8563553d1fa35d?w=180&h=180&fit=clip&q=40&auto=format",
    title: " Bottoms",
    path: "/products/cetagory/womenswear/bottoms",
  },
  {
    img: "https://media-assets.grailed.com/prd/misc/a43b20a9b07649c18ebb20ebc274629d?w=180&h=180&fit=clip&q=40&auto=format",
    title: " Ootwear",
    path: "/products/cetagory/womenswear/top",
  },
  {
    img: "https://media-assets.grailed.com/prd/misc/d7544d6ba08c44a7b93481b9ce04ceae?w=180&h=180&fit=clip&q=40&auto=format",
    title: "Footwear",
    path: "/products/cetagory/womenswear/footwear",
  },
  {
    img: "https://media-assets.grailed.com/prd/misc/721a4fb50bd54bb690870aa51c1f266b?w=180&h=180&fit=clip&q=40&auto=format",
    title: " Bags",
    path: "/products/cetagory/womenswear/top",
  },
  {
    img: "https://media-assets.grailed.com/prd/misc/06b3f5e0aeb24c94a3a9e01a31ffe209?w=180&h=180&fit=clip&q=40&auto=format",
    title: " Accessories",
    path: "",
  },
];

export default function Womensweare() {
  return (
    <div className={style.conteiner}>
      <div className={style.Col}>
        <h2 className={style.title}>Shop by Womenswar</h2>
        <div>
          <div className={style.wrapper}>
            {data.map((x) => {
              return (
                <>
                  <Link style={{color:"black",textDecoration:"none",cursor:"pointer"}} href={x.path}>
                    <div className={style.card}>
                      <img src={x.img} alt="" />
                      <h4>{x.title}</h4>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
