import { green } from '@mui/material/colors'
import React from 'react'
import '../index.css'
import SwiperCore,{ Navigation, Pagination, Scrollbar, A11y,EffectCube,Autoplay } from 'swiper';

import { Grid } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
function Home() {
    SwiperCore.use([Autoplay])
  return (
    <>
  <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y,EffectCube]}


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
      onSlideChange={() => console.log('slide change')}
      style={{marginTop:'70px'}}
     
    >
      <SwiperSlide><div className='landing'></div></SwiperSlide>
      <SwiperSlide><div className='landing4'></div></SwiperSlide>
      <SwiperSlide><div className='landing2'></div></SwiperSlide>
      <SwiperSlide><div className='landing3'></div></SwiperSlide>
     
    </Swiper>


    <div>
    <Grid container spacing={2}>
  <Grid item xs={7}>
  <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y,EffectCube]}


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
      onSlideChange={() => console.log('slide change')}
      style={{marginTop:'70px'}}
     
    >
      <SwiperSlide><div className='landing5'></div></SwiperSlide>
      <SwiperSlide><div className='landing4'></div></SwiperSlide>
      <SwiperSlide><div className='landing6'></div></SwiperSlide>
      <SwiperSlide><div className='landing7'></div></SwiperSlide>
     
    </Swiper>
  </Grid>
  <Grid item xs={5} style={{marginTop:'20px'}}>
  <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTe54R0b4shFwMR_PJHtxIOu8nOzRW3y7bRov12B8J8-sxl96FS"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Tár
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Set in the international world of Western classical music, the film centers on Lydia Tár, widely considered one of the greatest living composer-conductors and the very first female director of a major German orchestra.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Watch Now</Button>

      </CardActions>
    </Card>
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6bItuX4m-sJ6kivOG4pXCTKGfzMUMAxcinA&usqp=CAU"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Women Talking
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Do nothing, stay and fight, or leave. In 2010, the women of an isolated religious community grapple with reconciling a brutal reality with their faith.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Watch Now</Button>

      </CardActions>
    </Card>
  </Grid>

</Grid>
    
    </div>

</>

  )
}

export default Home