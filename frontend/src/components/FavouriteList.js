import { green } from "@mui/material/colors";
import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCube,
  Autoplay,
} from "swiper";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  Container,
  Typography,
} from "@mui/material";

import { Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MoviesSlider from "./MoviesSlider";

function FavouriteList() {
  SwiperCore.use([Autoplay]);

  const [products, setProducts] = useState([]);
  const [show, setShow] = useState();
 
  useEffect(() => {
    getProducts();
  }, []);
  const navigate = useNavigate();
  
  const getProducts = async () => {
    let data = await fetch("http://127.0.0.1:6969/getFile", {
      method: "GET",
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    let result = await data.json();

    if (result.result) {
      setShow(false);
    } else {
      setShow(true);

      setProducts(result);
      console.log("result" + result);
      console.log(result[0].userId);
    }
  };

  return (
    <>
    <div style={{color:'greenyellow'}}>
      </div>
      
      <div></div>
      <Container>
       
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
        
       
       
          style={{ marginTop: "70px" }}
        >
          {show ? (
            <>
              {
                //    console.log({(JSON.parse(auth).name)});

                // console.log("auth Id"+ auth._id);
                // console.log(userId);

                products.map((e) => {
                  return (
                    <>
                      <SwiperSlide key={e.id}>
     
                      <MoviesSlider item={e}/>
                   
                      </SwiperSlide>
                    </>
                  );
                })
   
              }
            </>
          ) : (
            <Typography variant={"h5"} sx={{ marginTop: "5em" }}>
              No Products Available
            </Typography>
          )}
        </Swiper>
      </Container>
    </>
  );
}

export default FavouriteList;

