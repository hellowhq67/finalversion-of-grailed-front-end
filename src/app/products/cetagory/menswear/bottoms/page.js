"use client"
import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import Navbar from '@/components/Navigations/Navbar'
import NestedMenu from '@/components/Navigations/NestedMenu'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Link from 'next/link';
import axios from 'axios';
import Footer from '@/components/Navigations/Footer'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
export default function page() {
  const [filters, setFilters] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false); // Step 1
  const [minPrice, setMinPrice] = useState(""); // State for minimum price
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalpro, settotalpro] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [keywords, setKeywords] = useState(""); // Step 1
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Step 2
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products/total/');
      // Filter products with category "TOPS" and department "MENSWEAR"
      const filteredProducts = response.data.products.filter(product => product.category === "BOTTOMS" && product.department === "MENSWEAR");
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  // Function to handle min price input change
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters({ ...filters, [name]: checked });
  };
  const calculateDiscountPercentage = (price, floorPrice) => {
    return ((price - floorPrice) / price) * 100;
  };
  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
    if (option === "lowPrice") {
      setProducts([...products.sort((a, b) => a.price - b.price)]);
    } else if (option === "highPrice") {
      setProducts([...products.sort((a, b) => b.price - a.price)]);
    } else if (option === "new") {
      setProducts([
        ...products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      ]);
    } else {
      // Default sorting or any other sorting logic
    }
  };
  const filterProducts = (product) => {
    // Check if product matches all selected filters
    for (const filter in filters) {
      if (filters[filter] && filter !== "minPrice" && filter !== "maxPrice") {
        if (filter === "size") {
          if (!product.size.includes(filters[filter])) {
            return false;
          }
        } else if (filter === "minPrice") {
          if (parseInt(product.price) < parseInt(filters[filter])) {
            return false;
          }
        } else if (filter === "maxPrice") {
          if (parseInt(product.price) > parseInt(filters[filter])) {
            return false;
          }
        } else if (
          product.department !== filter &&
          product.category !== filter &&
          product.subcategory !== filter &&
          product.designers !== filter &&
          product.conditon !== filter
        ) {
          return false;
        }
      }
    }
    // Check min and max price filter
    if (minPrice && parseInt(product.floorPrice) < parseInt(minPrice)) {
      return false;
    }
    if (maxPrice && parseInt(product.floorPrice) > parseInt(maxPrice)) {
      return false;
    }
    if (
      keywords &&
      !product.productName.toLowerCase().includes(keywords.toLowerCase())
    ) {
      return false;
    }

    return true;
  };

  // Function to handle min price input change
  const handleMinPriceChange = (event) => {
    const { value } = event.target;
    setMinPrice(value);
  };

  // Function to handle max price input change
  const handleMaxPriceChange = (event) => {
    const { value } = event.target;
    setMaxPrice(value);
  };
  const handleKeywordsChange = (event) => {
    const { value } = event.target;
    setKeywords(value);
  };
  return (

    <div>
      <Navbar />
      <div style={{ marginTop: '4rem ', border: '1px solid black', width: "100vw" }}>
        <NestedMenu />
      </div>
  
           
      <div className={style.fiterButton} onClick={toggleSidebar}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width={30}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>

      </div>
      <div className={style.wrapper2}>
        <span style={{ fontWeight: "bold" }}>{products.length} listings <span>{`mens > bottom`}</span></span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button style={{ background: "black", color: "white", border: "none", padding: "10px 25px", fontWeight: "bold" }}>Follow</button>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Sort By</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sortOption}
              onChange={handleSortChange}
              label="Sort by"

            >
              <MenuItem value="lowPrice">Low Price</MenuItem>
              <MenuItem value="highPrice">High Price</MenuItem>
              <MenuItem value="new">New</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={style.wrapper}>
      <div
          className={`${style.productFilter} ${
            sidebarOpen ? "" : style.closed
          }`}
        >
          <div className={style.sizeBox}>
            <p>Set up to filter out listings that are not in your size.</p>
            <button className={style.btn}>ADD MY SIZE</button>
          </div>

          <Accordion
            style={{ border: "none", background: "none" }}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                </svg>
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography style={{ fontWeight: "bold" }}>Department</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={style.checkbox}>
                <label style={style.label}>
                  <input
                    type="checkbox"
                    name="MENSWEAR"
                    onChange={handleCheckboxChange}
                  />{" "}
                  Meanswear
                </label>
                <label style={style.label}>
                  <input
                    type="checkbox"
                    name="WOMENSWEAR"
                    onChange={handleCheckboxChange}
                  />{" "}
                  Womeanswear
                </label>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{ border: "none" }} defaultExpanded>
            <AccordionSummary
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                </svg>
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography >Cetagory</Typography>
            </AccordionSummary>
            <div>
              <Accordion
                style={{ border: "none", boxShadow: "none" }}
                defaultExpanded
              >
                <AccordionSummary
                  expandIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-caret-down"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                    </svg>
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>menwear</Typography>
                </AccordionSummary>
                <div>
                  {/*==================top==========================*/}
                  <div>
                    <Accordion style={{ border: "none", boxShadow: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontSize: "13px" }}>
                          top
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <span>
                            <input
                              type="checkbox"
                              name="TOPS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>All tops</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="LONG SLEEVE T-SHIRTS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span> LONG SLEEVE T-SHIRTS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="POLOS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>POLOS</span>
                          </span>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                  {/*==================topclose==========================*/}
                  {/*==================bottom==========================*/}
                  <div>
                    <Accordion style={{ border: "none", boxShadow: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontSize: "13px" }}>
                          Bottoms
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <span>
                            <input
                              type="checkbox"
                              name="JEANS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>JEANS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="JOGGERS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>JOGGERS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="JUMPSUITS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>JUMPSUITS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="LEGGINGS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>LEGGINGS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="MAXI SKIRTS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>MAXI SKIRTS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="MIDI SKIRTS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>MIDI SKIRTS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="MINI SKIRTS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>MINI SKIRTS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="PANTS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>PANTS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="SHORTS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>SHORTS</span>
                          </span>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                  {/*==================footwear==========================*/}
                  <div>
                    <Accordion style={{ border: "none", boxShadow: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontSize: "13px" }}>
                          Footwear
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <span>
                            <input
                              type="checkbox"
                              name="FOOTWEAR"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span> All Footwear</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="SHOES"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>SHOES</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="SNEAKERS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>SNEAKERS</span>
                          </span>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                  {/*==================footwear==========================*/}

                  <div>
                    <Accordion style={{ border: "none", boxShadow: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontSize: "13px" }}>
                          Accessories
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <span>
                            <input
                              type="checkbox"
                              name="BAGS & LUGGAGE"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>BAGS & LUGGAGE</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="BELTS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>BELTS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="GLASSES"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>GLASSES</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="GLOVES & SCARVES"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>GLOVES & SCARVES</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="HATS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>HATS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="JEWELRY & WATCHES"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>JEWELRY & WATCHES</span>
                          </span>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                  {/*==================footwear==========================*/}

                  <div>
                    <Accordion style={{ border: "none", boxShadow: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontSize: "13px" }}>
                          Outwear
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <span>
                            <input
                              type="checkbox"
                              name="JACKETS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>JACKETS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="COATS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>COATS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="BLAZERS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>BLAZERS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="VESTS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>VESTS</span>
                          </span>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </Accordion>

              <Accordion
                style={{ border: "none", boxShadow: "none" }}
                defaultExpanded
              >
                <AccordionSummary
                  expandIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-caret-down"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                    </svg>
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>womaneswear</Typography>
                </AccordionSummary>
                <div>
                  {/*==================top==========================*/}
                  <div>
                    <Accordion style={{ border: "none", boxShadow: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontSize: "13px" }}>
                          top
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <span>
                            <input
                              type="checkbox"
                              name="BLOUSES"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>BLOUSES</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="BODYSUITS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>BODYSUITS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="BUTTON UPS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>All tops</span>
                          </span>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  {/*==================topclose==========================*/}
                  {/*==================bottom==========================*/}
                  <div>
                    <Accordion style={{ border: "none", boxShadow: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontSize: "13px" }}>
                          Bottoms
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <span>
                            <input
                              type="checkbox"
                              name="Jeans"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>Jeans</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="Leggings"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>Leggings</span>
                          </span>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  {/*==================bottom==========================*/}
                  {/*==================footwear==========================*/}
                  <div>
                    <Accordion style={{ border: "none", boxShadow: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography style={{ fontSize: "13px" }}>
                          Footwear
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails style={{ padding: "0px" }}>
                        <div className={style.checkbox}>
                          <span>
                            <input
                              type="checkbox"
                              name="FOOTWEARS"
                              value={""}
                            />{" "}
                            <span>All Footwear</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="Casual Pants"
                              value={"Boots"}
                            />{" "}
                            <span>Boots</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="Cropped Pants"
                              value={"hells"}
                            />{" "}
                            <span> hells</span>
                          </span>
                          <span>
                            <input type="checkbox" name="Denim" value={""} />{" "}
                            <span>Denim</span>
                          </span>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  {/*==================footwear==========================*/}
                  {/*==================footwear==========================*/}
                  {/*==================footwear==========================*/}
                  <div>
                    <Accordion style={{ border: "none", boxShadow: "none" }}>
                      <AccordionSummary
                        expandIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                          </svg>
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>Outwear</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={style.checkbox}>
                          <span>
                            <input
                              type="checkbox"
                              name="BLAZERS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>BLAZERS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="BOMBERS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>BOMBERS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="COATS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>COATS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="DENIM JACKETS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>DENIM JACKETS</span>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name="DOWN JACKETS"
                              onChange={handleCheckboxChange}
                            />{" "}
                            <span>DOWN JACKETS</span>
                          </span>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  {/*==================footwear==========================*/}{" "}
                  {/*==================footwear==========================*/}{" "}
                  {/*==================footwear==========================*/}
                  <div></div>
                  {/*==================footwear==========================*/}
                </div>
              </Accordion>
            </div>
          </Accordion>

          <Accordion style={{ border: "none" }}>
            <AccordionSummary
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                </svg>
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography >Size</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={style.checkbox}>
                <span>
                  <input
                    type="checkbox"
                    name="26"
                    onChange={handleCheckboxChange}
                  />{" "}
                  <span>26</span>
                </span>
                <span>
                  <input
                    type="checkbox"
                    name="27"
                    onChange={handleCheckboxChange}
                  />{" "}
                  <span>27</span>
                </span>
                <span>
                  <input
                    type="checkbox"
                    name="29"
                    onChange={handleCheckboxChange}
                  />{" "}
                  <span>29</span>
                </span>
                <span>
                  <input
                    type="checkbox"
                    name="30"
                    onChange={handleCheckboxChange}
                  />{" "}
                  <span>30</span>
                </span>
                <span>
                  <input
                    type="checkbox"
                    name="42"
                    onChange={handleCheckboxChange}
                  />{" "}
                  <span>42</span>
                </span>
              </div>
              <AccordionDetails>
                <div className={style.checkbox}>
                  <span>
                    <input
                      type="checkbox"
                      name="XXS/40"
                      onChange={handleCheckboxChange}
                    />{" "}
                    <span> XXS/40</span>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="XS/42"
                      onChange={handleCheckboxChange}
                    />{" "}
                    <span> XS/42</span>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name=" S/44"
                      onChange={handleCheckboxChange}
                    />{" "}
                    <span> S/44-46</span>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="L/53-54 "
                      onChange={handleCheckboxChange}
                    />{" "}
                    L/53-54 <span></span>
                  </span>
                </div>
              </AccordionDetails>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{ border: "none", background: "none" }}>
            <AccordionSummary
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                </svg>
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography >Designer</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={style.checkbox}>
                <label style={style.label}>
                  <input
                    type="checkBox"
                    name="Gucchi"
                    onChange={handleCheckboxChange}
                  />{" "}
                  Gucchi
                </label>
                <label style={style.label}>
                  <input
                    type="checkBox"
                    name="Louis Vuitton"
                    onChange={handleCheckboxChange}
                  />{" "}
                  Louis Vuitton
                </label>
                <label style={style.label}>
                  <input
                    type="checkBox"
                    name="Jacquemus"
                    onChange={handleCheckboxChange}
                  />{" "}
                  Jacquemus
                </label>
                <label style={style.label}>
                  <input
                    type="checkBox"
                    name="Kapital"
                    onChange={handleCheckboxChange}
                  />{" "}
                  Kapital
                </label>
                <label style={style.label}>
                  <input
                    type="checkBox"
                    name="Loewe<"
                    onChange={handleCheckboxChange}
                  />{" "}
                  Loewe
                </label>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{ border: "none", background: "none" }}>
            <AccordionSummary
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                </svg>
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography >Condition</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={style.checkbox}>
                <label style={style.label}>
                  <input
                    type="checkBox"
                    name="new"
                    onChange={handleCheckboxChange}
                  />{" "}
                  New
                </label>
                <label style={style.label}>
                  <input
                    type="checkBox"
                    name="used"
                    onChange={handleCheckboxChange}
                  />{" "}
                  Used
                </label>
                <label style={style.label}>
                  <input
                    type="checkBox"
                    name="gently_used"
                    onChange={handleCheckboxChange}
                  />{" "}
                  Gently Used
                </label>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{ border: "none", background: "none" }}>
            <AccordionSummary
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                </svg>
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: "flex" }}>
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  style={{ width: "100%", padding: "10px" }}
                  onChange={handleMinPriceChange}
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  style={{ width: "100%", padding: "10px" }}
                  onChange={handleMaxPriceChange}
                />
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{ border: "none", background: "none" }}> 
            <AccordionSummary
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                </svg>
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Filter By Keyword</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{display:"flex",border:"1px solid black"}}>

                <input
                  type="text"
                  placeholder="Enter keywords"
                  value={keywords}
                  style={{ border: "none", outline: "none",padding:"10px" }}
                  onChange={handleKeywordsChange}
                />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={style.productWrapprer}>

          {products.filter(filterProducts).map((x) => {
            return <>

              <div key={x._id} className={style.ProductSildes}>
                <Link style={{ textDecoration: "none", cursor: "pointer", color: "black" }} href={`/listlings/${x._id}`} passHref>
                  <div className={style.imgCol}>
                    <img src={x.productImage1} alt="" />
                    {!x.vendor?"":<span className={style.tags}>{x.vendor}</span>}
                  </div>
                  <p> about 1 hour <span style={{textDecoration:"line-through"}}>{'(23 days)'}</span></p>
                  <hr />
                  <div className={style.descCol}>
                    <p className={style.title}>
                      {x.productName.slice(0, 15)}...
                    </p>
                    <p>{x.description.slice(0, 25)}</p>
                  </div>
                </Link>
                <div className={style.priceCol}>
                  <p className={style.price}>
                    <span style={{ color: "red", margin: "0px 2px" }}> ${x.floorPrice?x.floorPrice:""}</span>
                    <span className={style.floorPrice}>
                      ${x.price}
                    </span>
                    <span className={style.discount}>  {`${calculateDiscountPercentage(x.price, x.floorPrice).toFixed(0)}% off`}</span>
                  </p>
                  <button className={style.btn}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      width={24}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          })

          }
        </div>

      </div>

      <Footer />
    </div>
  )
}
