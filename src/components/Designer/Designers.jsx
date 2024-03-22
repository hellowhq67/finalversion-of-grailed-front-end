import React from "react";
import style from "./Style.module.css";
export default function Designers() {
  const data = [
    {
      img: "https://media-assets.grailed.com/prd/detail-page/be90043b1059462eb0c4b284dd415a37?w=400&h=400&fit=clip&q=40&auto=format",
      path: "",
    },
    {
      img: "https://media-assets.grailed.com/prd/detail-page/57c2a7cc871c4246b7b8da69ec0ba555?w=400&h=400&fit=clip&q=40&auto=format",
      path: "",
    },
    {
      img: "https://media-assets.grailed.com/prd/detail-page/2ef8bb8f02bc44e2ad0554ebf0d43777?w=400&h=400&fit=clip&q=40&auto=format",
      path: "",
    },
    {
      img: "https://media-assets.grailed.com/prd/detail-page/03b3e84c588e457ea24ad0c6698c49fd?w=400&h=400&fit=clip&q=40&auto=format",
      path: "",
    },
    {
      img: "https://media-assets.grailed.com/prd/detail-page/f2397a1b5937495c85c5ec39442ba5a4?w=400&h=400&fit=clip&q=40&auto=format",
      path: "",
    },
    {
      img: "https://media-assets.grailed.com/prd/detail-page/921ec6d0a7104c3eb35d714a6010d0e9?w=400&h=400&fit=clip&q=40&auto=format",
      path: "",
    },
    {
      img: "  https://media-assets.grailed.com/prd/misc/VCVILMVFFXOWVFRWMM-FYT4WQAWAYXEKQCRNFA?w=120&h=120&fit=clip&q=40&auto=format",
      path: "",
    },
    {
      img: "https://media-assets.grailed.com/prd/detail-page/bcb99181d13a45728db5f87c5d2ef338?w=1600&h=1600&fit=clip&auto=format",
      path: "",
    },
    {
      img: "https://media-assets.grailed.com/prd/detail-page/921ec6d0a7104c3eb35d714a6010d0e9?w=400&h=400&fit=clip&q=40&auto=format",
      path: "",
    },
  ];

  return (
    <>
      <div className={style.conteiner}>
        <div className={style.flexCol}>
          <h2 className={style.title}>Populer Designer</h2>
          <div className={style.wrapper}>
            {data.map((x) => {
              return (
                <>
                  <div className={style.card}>
                    <img src={x.img} alt="" />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
