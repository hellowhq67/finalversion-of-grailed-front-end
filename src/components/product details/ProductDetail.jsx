"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";
import Rating from "@mui/material/Rating";
import Navbar from "../Navigations/Navbar";
import NestedMenu from "../Navigations/NestedMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import FeCard from "../Sections/FeaturedCollection copy/FeCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Cards from "@/components/Sections/slider3/Cards";
import Cards2 from "../Sections/slider4/Cards2";
import Page from "../Sections/article/Page";
import Footer from "../Navigations/Footer";
import { UseAuth } from "@/app/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import ProductSilder from "../productSildersq/ProductSilder";
import Modals from "../authModal/Modals";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40rem",
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      "https://adminpanellive.vercel.app/api/products/total"
    );
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
function ProductDetail({ productId }) {
  const { user, getAllUsersData } = UseAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [open4, setOpen4] = React.useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  const [expanded, setExpanded] = React.useState(false);
  const [sellerProduct, setSellerproduct] = useState("");
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [userData, setUserData] = useState({
    location: "",
    userDisplayName: "",
    userBio: "",
    reting: "",
    transaction: "",
    profileImage: "",
    name: "",
    streetAddress: "",
    country: "",
    apt: "",
    state: "",
    zipcode: "",
    feedbacks: Number,
    feedbacksdata: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://adminpanellive.vercel.app/api/products/total/${productId}`
        );
        setProduct(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);
  const sellerID = product ? product.userId : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data

        // Fetch user data
        const usersData = await getAllUsersData();
        const user = usersData.find((user) => user.userid === sellerID);

        // If user data is found, set user data state and localStorage
        if (user) {
          const userData = {
            userBio: user.bio || "",
            reting: user.reting || "",
            transaction: user.feedbacks.length || "",
            profileImage: user.profileimgae || "",
            feedbacks: user.feedbacks.length || "",
            feedbacksdata: [user.feedbacks] || "",
            location: user.location || "",
          };
          setUserData(userData);
          localStorage.setItem("userData", JSON.stringify(userData));
        }

        // Fetch products for the seller
        const allProducts = await fetchProducts();
        const sellerProducts = allProducts.filter(
          (product) => product.userId === sellerID
        );
        setSellerproduct(sellerProducts);

        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    // Fetch data when sellerID or getAllUsersData changes
    if (sellerID) {
      fetchData();
    }
  }, [getAllUsersData, sellerID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to handle change in the select input
  const handleShippingChange = (event) => {
    setSelectedShipping(event.target.value);
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <ToastContainer position="bottom-right" />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <h2 style={{ textAlign: "center", fontWeight: "300" }}>
                REPORT LISTINGS
              </h2>
              <hr />

              <h3 style={{ textAlign: "center", fontWeight: "400" }}>
                Why are you reporting this listing
              </h3>

              <select
                name=""
                id="select"
                style={{
                  padding: "10px 40px",
                  width: "400px",
                  fontSize: "18px",
                }}
              >
                <option value="">Selling item</option>
                <option value="">TreadMarkCopy write</option>
                <option value="">Clone product</option>
              </select>
              <div>
                <textarea
                  style={{ padding: "10px 40px", width: "400px" }}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="add comment"
                ></textarea>
              </div>
              <button
                style={{
                  padding: "15px 20px",
                  background: "black",
                  color: "white",
                  width: "300px",
                }}
              >
                REPORT LISTINGS
              </button>
            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open2}
          onClose={handleClose2}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open2}>
            <Box sx={style}>
              <div>
                <h2 style={{ textAlign: "center", fontWeight: "300" }}>
                  {"Step 1 of 2: Make an Offer"}
                </h2>
                <hr />
              </div>

              <div>
                <hr />
                <div className={styles.offerModals}>
                  <div className={styles.offerInfo}>
                    <img width={50} src={product.productImage1} alt="" />
                    <div>
                      <p>{product.designers}</p>
                      <p>{product.productName}</p>
                    </div>
                  </div>
                  <div>
                    <h2>{product.price}</h2>
                  </div>
                </div>
                <hr />
              </div>
              <div>
                <p style={{ textAlign: "center" }}>OFFER PIRICE</p>
                <input
                  type="text"
                  placeholder=""
                  className={styles.offerInput}
                />
                <hr />
                <p style={{ textAlign: "center" }}>
                  shipping and taxes calculated in the next step
                </p>
                <p style={{ textAlign: "center", margin: "10px 0px" }}>
                  The seller has 24 hours to accept this offer
                </p>
              </div>
              <button
                style={{
                  padding: "15px 20px",
                  background: "black",
                  color: "white",
                  width: "300px",
                }}
              >
                REVIEW OFFER
              </button>
            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open3}
          onClose={handleClose3}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open3}>
            <Box sx={style}>
              <div>
                <h2 style={{ textAlign: "center", fontWeight: "300" }}>
                  Ask A Question
                </h2>
                <hr />
              </div>

              <div>
                <p>Send a massage</p>
                <textarea
                  style={{ padding: "10px 40px", width: "400px" }}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="send a massage"
                ></textarea>
              </div>
              <p style={{ textAlign: "center", fontSize: "13px" }}>
                We ensure that the items we review are authentic. All purchases{" "}
                <br /> made on Grailed are eligible for protection.
              </p>
              <button
                style={{
                  padding: "15px 20px",
                  background: "black",
                  color: "white",
                  width: "300px",
                }}
              >
                Send Message
              </button>
            </Box>
          </Fade>
        </Modal>
        <Modals
          handleOpen={handleOpen4}
          open={open4}
          handleClose={handleClose4}
        />

        <Navbar />
        <div style={{ marginTop: "5rem", borderBottom: "1px solid black" }}>
          <NestedMenu />
        </div>
        <span className={style.cetagoryLink} >
          <Link
            style={{ color: "black", fontSize:"13px",margin:"0p 4px" }}
            href={`/products/cetagory/${product.department.toLowerCase()}/${product.category.toLowerCase()}`}
          >
            {product.designers} {product.department.toLowerCase()}
          </Link>
          {"> "}
          <Link
            style={{ color: "black", fontSize:"13px",margin:"0p 4px" }}
            href={`/products/cetagory/${product.department.toLowerCase()}/${product.category.toLowerCase()}`}
          >
            {product.designers} {product.category.toLowerCase()}
          </Link>
          {"> "}
          <Link
            style={{ color: "black", fontSize:"13px",margin:"0p 4px" }}
            href={`/products/cetagory/${product.department.toLowerCase()}/${product.category.toLowerCase()}`}
          >
            {product.designers} {product.subcategory.toLowerCase()}
          </Link>
          {"> "}
          <span style={{color:"gray",fontSize:"12px"}}>{product.productName}</span>
        </span>
        <div className={styles.wrapper}>
          <ProductSilder
            productImage1={product.productImage1}
            productImage2={product.productImage2}
            productImage3={product.productImage3}
            productImage4={product.productImage4}
            productImage5={product.productImage4}
          />
          <div className={styles.infoWrapper}>
            <div className={styles.details}>
              {!product.vendor ? (
                ""
              ) : (
                <span className={styles.vendor}>{product.vendor}</span>
              )}
              <span>
                <Link
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                  href={`/profile/designer/${product.userId}`}
                >
                  {product.designers}
                </Link>
                {" X "}
                <Link
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                  href={`/profile/designer/${product.userId}`}
                >
                  {product.userName}
                </Link>
              </span>
              <p>{product.productName}</p>
              <p>
                <span className={styles.size}>SIZE:</span>
                {product.size}
              </p>
              <p>
                <span>Color:</span>
                {product.color}
              </p>
              <p>
                <span>Condition:</span>
                {product.condition}
              </p>
              <h1 className={styles.price}>${product.floorPrice}</h1>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>
                  {"+"} {product.shippings} Shipping —{userData.location} to
                </span>
                <div style={{ transform: "translateY(-3px)", margin: "4px" }}>
                  <FormControl variant="standard" sm={{ m: 1 }}>
                 <InputLabel id="demo-simple-select-standard-label">United States</InputLabel>
                    <Select
                      labelId="shipping-label"
                      id="shipping"
                      value={selectedShipping}
                      onChange={handleShippingChange}
                      label="Shipping"
                      sx={{ fontSize: "10px" }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="United States">United States</MenuItem>
                      <MenuItem value="Asia">Asia</MenuItem>
                      <MenuItem value="Europe">Europe</MenuItem>
                      <MenuItem value="Canada">Canada</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              {!user ? (
                <button className={styles.btn1} onClick={handleOpen4}>
                  {"PURCHEASE"}
                </button>
              ) : (
                <button className={styles.btn1} disabled={loading}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    href={`/checkout/${product._id}/${!user ? "" : user.uid}`}
                  >
                    {"PURCHEASE"}
                  </Link>
                </button>
              )}

              {product.acceptOffer ? (
                <button className={styles.btn2} onClick={handleOpen2}>
                  OFFER
                </button>
              ) : (
                ""
              )}
              <button onClick={handleOpen3} className={styles.btn2}>
                MESSAGE
              </button>

              <hr />
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                }}
                href={`/profile/designer/${product.userId}`}
              >
                {!userData ? (
                  <img
                    width={40}
                    height={40}
                    src="https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
                    alt=""
                  />
                ) : (
                  <>
                    <img
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%" }}
                      src={userData.profileImage}
                      alt=""
                    />
                  </>
                )}
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    {product.userName}
                  </div>
                  <span
                    style={{
                      margin: "5px 0px",
                      color: "black",
                      display: "flex",
                      fontSize: "12px",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                      style={{ color: "green", fontSize: "13px" }}
                    />
                    <p>{" 3reivews"}</p>
                  </span>
                  <div style={{ margin: "10px 0px", fontSize: "14px" }}>
                    {`${userData.transaction}  Transactions`}
                    <Link
                      href={`/profile/designer/${product.userId}`}
                      style={{ color: "black" }}
                    >
                      {`.${sellerProduct.length} items for sell`}
                    </Link>
                  </div>
                  <div
                    style={{
                      margin: "10px 0px",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        width={20}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                      FAST SHIPPER
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        width={20}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                        />
                      </svg>
                      quick reply
                    </span>
                  </div>

                  <button className={styles.followbtn}>Follow</button>
                </div>
              </Link>
              <div className={styles.feedFlex}>
                <h4>{"Seller FeedBack"}</h4>
                <Link
                  style={{ fontWeight: "bold", fontSize: "14px" }}
                  href={`/profile/designer/${product.userId}`}
                >
                  {"SELL ALL ->"}
                </Link>
              </div>

              <Swiper
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
                className={styles.swiper}
              >
                {!user ? (
                  <>
                    <SwiperSlide className={styles.swiperslide}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                        href={`/profile/designer/${product.userId}`}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "black",
                            }}
                          >
                            March 7 2024
                          </div>

                          <span style={{ margin: "10px 0px", color: "black" }}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={5}
                              precision={4}
                              style={{ color: "darkgreen", fontSize: "16px" }}
                              readOnly
                            />
                          </span>
                          <div style={{ margin: "10px 0px", color: "black" }}>
                            <span>{" very nice product "}</span>
                          </div>
                          <div>
                            <Link
                              href=""
                              style={{ margin: "10px 0px", color: "black" }}
                            >
                              {product.designers}
                            </Link>
                            <p style={{ margin: "10px 0px" }}>
                              Nike Vintage Y2K Nylon Baggy Track Pants Double
                              Swoosh
                            </p>
                          </div>
                        </div>
                        <img
                          width={100}
                          height={100}
                          src="https://media-assets.grailed.com/prd/listing/temp/542cf3edad86493a9600e874434abe0c?w=120&fit=clip&q=40&auto=format"
                          alt=""
                        />
                      </Link>
                    </SwiperSlide>
                    <SwiperSlide className={styles.swiperslide}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                        href={`/profile/designer/${product.userId}`}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "black",
                            }}
                          >
                            March 7 2024
                          </div>

                          <span style={{ margin: "10px 0px", color: "black" }}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={5}
                              precision={4}
                              style={{ color: "darkgreen", fontSize: "16px" }}
                              readOnly
                            />
                          </span>
                          <div style={{ margin: "10px 0px", color: "black" }}>
                            <span>{" very nice product "}</span>
                          </div>
                          <div>
                            <Link
                              href=""
                              style={{ margin: "10px 0px", color: "black" }}
                            >
                              {product.designers}
                            </Link>
                            <p style={{ margin: "10px 0px" }}>
                              Nike Vintage Y2K Nylon Baggy Track Pants Double
                              Swoosh
                            </p>
                          </div>
                        </div>
                        <img
                          width={100}
                          height={100}
                          src="https://media-assets.grailed.com/prd/listing/temp/542cf3edad86493a9600e874434abe0c?w=120&fit=clip&q=40&auto=format"
                          alt=""
                        />
                      </Link>
                    </SwiperSlide>

                    <SwiperSlide className={styles.swiperslide}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                        href={``}
                        onClick={handleOpen4}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "black",
                            }}
                          >
                            March 7 2024
                          </div>

                          <span style={{ margin: "10px 0px", color: "black" }}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={5}
                              precision={4}
                              style={{ color: "darkgreen", fontSize: "16px" }}
                              readOnly
                            />
                          </span>
                          <div style={{ margin: "10px 0px", color: "black" }}>
                            <span>{" very nice product "}</span>
                          </div>
                          <div>
                            <Link
                              href=""
                              style={{ margin: "10px 0px", color: "black" }}
                            >
                              {product.designers}
                            </Link>
                            <p style={{ margin: "10px 0px" }}>
                              Nike Vintage Y2K Nylon Baggy Track Pants Double
                              Swoosh
                            </p>
                          </div>
                        </div>
                        <img
                          width={100}
                          height={100}
                          src="https://media-assets.grailed.com/prd/listing/temp/542cf3edad86493a9600e874434abe0c?w=120&fit=clip&q=40&auto=format"
                          alt=""
                        />
                      </Link>
                    </SwiperSlide>
                  </>
                ) : (
                  <>
                    <SwiperSlide className={styles.swiperslide}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                        href={`/profile/designer/${product.userId}`}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "black",
                            }}
                          >
                            March 7 2024
                          </div>

                          <span style={{ margin: "10px 0px", color: "black" }}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={5}
                              precision={4}
                              style={{ color: "darkgreen", fontSize: "16px" }}
                              readOnly
                            />
                          </span>
                          <div style={{ margin: "10px 0px", color: "black" }}>
                            <span>{" very nice product "}</span>
                          </div>
                          <div>
                            <Link
                              href=""
                              style={{ margin: "10px 0px", color: "black" }}
                            >
                              {product.designers}
                            </Link>
                            <p style={{ margin: "10px 0px" }}>
                              Nike Vintage Y2K Nylon Baggy Track Pants Double
                              Swoosh
                            </p>
                          </div>
                        </div>
                        <img
                          width={100}
                          height={100}
                          src="https://media-assets.grailed.com/prd/listing/temp/542cf3edad86493a9600e874434abe0c?w=120&fit=clip&q=40&auto=format"
                          alt=""
                        />
                      </Link>
                    </SwiperSlide>
                    <SwiperSlide className={styles.swiperslide}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                        href={`/profile/designer/${product.userId}`}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "black",
                            }}
                          >
                            March 7 2024
                          </div>

                          <span style={{ margin: "10px 0px", color: "black" }}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={5}
                              precision={4}
                              style={{ color: "darkgreen", fontSize: "16px" }}
                              readOnly
                            />
                          </span>
                          <div style={{ margin: "10px 0px", color: "black" }}>
                            <span>{" very nice product "}</span>
                          </div>
                          <div>
                            <Link
                              href=""
                              style={{ margin: "10px 0px", color: "black" }}
                            >
                              {product.designers}
                            </Link>
                            <p style={{ margin: "10px 0px" }}>
                              Nike Vintage Y2K Nylon Baggy Track Pants Double
                              Swoosh
                            </p>
                          </div>
                        </div>
                        <img
                          width={100}
                          height={100}
                          src="https://media-assets.grailed.com/prd/listing/temp/542cf3edad86493a9600e874434abe0c?w=120&fit=clip&q=40&auto=format"
                          alt=""
                        />
                      </Link>
                    </SwiperSlide>

                    <SwiperSlide className={styles.swiperslide}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                        href={`/profile/designer/${product.userId}`}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "black",
                            }}
                          >
                            March 7 2024
                          </div>

                          <span style={{ margin: "10px 0px", color: "black" }}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={5}
                              precision={4}
                              style={{ color: "darkgreen", fontSize: "16px" }}
                              readOnly
                            />
                          </span>
                          <div style={{ margin: "10px 0px", color: "black" }}>
                            <span>{" very nice product "}</span>
                          </div>
                          <div>
                            <Link
                              href=""
                              style={{ margin: "10px 0px", color: "black" }}
                            >
                              {product.designers}
                            </Link>
                            <p style={{ margin: "10px 0px" }}>
                              Nike Vintage Y2K Nylon Baggy Track Pants Double
                              Swoosh
                            </p>
                          </div>
                        </div>
                        <img
                          width={100}
                          height={100}
                          src="https://media-assets.grailed.com/prd/listing/temp/542cf3edad86493a9600e874434abe0c?w=120&fit=clip&q=40&auto=format"
                          alt=""
                        />
                      </Link>
                    </SwiperSlide>
                  </>
                )}
              </Swiper>

              <div>
                <hr />
                <h2>Measurements</h2>
                <p>
                  Let the seller know youre interested in measurement details
                  Well notify you as soon as theyre added
                </p>
                <button className={styles.btn2}>REQUEST MEASUREMENTS</button>
                <hr />
              </div>

              <h2>Description</h2>

              <p className={styles.description}> {product.description}</p>
              <div>
                <h2>Tags</h2>
                <p style={{ border: "2px solid black ", padding: "10px 14px" }}>
                  {product.tag[0].map((x) => {
                    return <span style={{ fontWeight: "bold" }}>{x}</span>;
                  })}
                </p>
              </div>
              <div className={styles.reportBtns}>
                <button onClick={handleOpen}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    width={20}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                  {"    Report Listing "}
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    width={20}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Price Comparision
                </button>
              </div>
              <hr />
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <div style={{ display: "flex", marginBottom: "14px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      class="bi bi-lightning-charge"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z" />
                    </svg>
                    <h2 style={{ fontSize: "19px" }}>
                      Grailed Purchase Protection
                    </h2>
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    We want you to feel safe buying and selling on Grailed
                    Qualifying orders are covered by our Purchase Protection in
                    the rare case something goes wrong
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <h2 style={{ fontSize: "17px", fontWeight: "bold" }}>
                    How You are Protected
                  </h2>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                      Your purchase is covered if Grailed finds:
                    </Typography>
                    <Typography paragraph>
                      The item you purchased materially differs from its
                      description in color condition fabric andor measurement
                      You were sent the wrong item The item's authenticity
                      cannot be verified by u
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
            <div className={styles.svgs}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                width={50}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <span>0</span>
            </div>
          </div>
        </div>

        <Cards2 />
        <Cards />
        <div className={styles.serchCol}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            <div>
              <h2 style={{ margin: "10px 0px" }}>Releted Search</h2>
            </div>
            <div className={styles.reletedSearch}>
              <p>CK WOOL COAT</p>
              <p>CK WOOL COAT</p>
              <p>'WOOL COAT L</p>
              <p>'WOOL COAT L</p>
              <p>'WOOL COAT L</p>
              <p>'WOOL COAT L</p>
              <p>'WOOL COAT L</p>
              <p>'WOOL COAT L</p>
            </div>
          </div>
        </div>
        <FeCard />
        <Page />
        <Footer />
      </div>
    </>
  );
}

export default ProductDetail;
