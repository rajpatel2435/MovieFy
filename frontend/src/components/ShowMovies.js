
import React from "react";
import "../index.css";

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCube,
  Autoplay,
} from "swiper";
import {
  
  Container,
  Typography,
} from "@mui/material";


import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MoviesSlider from "./MoviesSlider";

function ShowMovies() {
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

    }
  };

  return (
    <>
    <div style={{color:'greenyellow'}}><Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}

        style={{ marginTop: "70px",color:"green" }}
        
     
      >
        <SwiperSlide>
          <div className="landing"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="landing4"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="landing2"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="landing3"></div>
        </SwiperSlide>
      </Swiper>
      </div>
      
      <div></div>
      <Container>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
       
          style={{ marginTop: "70px" }}
        >
          <SwiperSlide>
            <div className="landing"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="landing4"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="landing2"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="landing3"></div>
          </SwiperSlide>
        </Swiper>
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

export default ShowMovies;
