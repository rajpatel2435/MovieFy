import { green } from "@mui/material/colors";
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

import GenMovies from './GenMovies'
import "../index.css";
const Comedy = () => {
    SwiperCore.use([Autoplay])
    const [products, setProducts] = useState([])
    const [show, setShow] = useState()
    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        
        let data = await fetch('http://127.0.0.1:6969/getFile', {
            method: "GET",
            headers: {
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
  

        let result = await data.json();

        if (result.result) {
            setShow(false)
        } else {
            setShow(true)

            setProducts(result)
   

        }

    }

  return (
    <div>

 <Container>
 <div className="comedy"></div>
        {/* <Swiper
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
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
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
        </Swiper> */}
  
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
        
        
       
          style={{ marginTop: "20px" }}
        >
          {show ? (
            <>
              {
                //    console.log({(JSON.parse(auth).name)});

                // console.log("auth Id"+ auth._id);
                // console.log(userId);

                products.map((e) => {
                    if(e.genre=="Comedy")
                  return (
                    <>
               
                      <SwiperSlide key={e.id}>
     
                      <GenMovies item={e}/>
                   
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

    </div>
  )
}

export default Comedy