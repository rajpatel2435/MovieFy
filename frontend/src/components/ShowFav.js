import React from 'react'
import { Typography } from '@mui/material';
import MoviesSlider from './MoviesSlider';
import { useEffect,useState } from 'react';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    EffectCube,
    Autoplay,
  } from "swiper";
  import { Swiper, SwiperSlide } from "swiper/react";
const ShowFav = () => {
    const [products, setProducts] = useState([])
    const [show, setShow] = useState()
    useEffect(() => {
        getProducts();
      }, []);

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
    <div>
        <div>
        <Typography variant={"h5"} sx={{ marginTop: "5em" }}>
             Your Favourite Movies
            </Typography>
        </div>
        <div style={{marginTop:-40}}>
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
                    if(e.isFavourite){
                  return (
                    <>
                      <SwiperSlide key={e.id}>
     
                      <MoviesSlider item={e}/>
                   
                      </SwiperSlide>
                    </>
                  );}
                })
   
              }
            </>
          ) : (
            <Typography variant={"h5"} sx={{ marginTop: "5em" }}>
              No Products Available
            </Typography>
          )}
        </Swiper>
        </div>
    </div>
  )
}

export default ShowFav