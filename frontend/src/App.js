import React from 'react';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

import Login from './components/Login';
import Signup from './components/Signup';
import History from './components/History';
import FileUpload from './components/FileUpload';
import Forgot from './components/Forgot';
import AllUsers from './components/AllUsers';
import ShowFiles from './components/ShowFiles';
import UpdateMov from './components/UpdateMov';
import CPass from './components/CPass';
import Video from './components/Video';
import ShowMovies from './components/ShowMovies';
import MoviesSlider from './components/MoviesSlider';
import FavouriteList from './components/FavouriteList';
import ShowFav from './components/ShowFav';
import Comedy from './components/Comedy';
import SearchMov from './components/SearchMov';
import UserSelfInfo from './components/UserSelfInfo';

export default function App() {
    return (
       
             



        <BrowserRouter>
        <Box sx={{marginTop:'40px'}}/>
        <Navbar />
        
        <Routes>
<Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/History' element={<History/>} />
            <Route path='/FileUpload' element={<FileUpload/>} />
            <Route path='/Forgot' element={<Forgot/>}/>
            <Route path='/users' element={<AllUsers/>}/>
            <Route path='/showFiles' element={<ShowFiles/>}/>
            <Route path='/updateMovies' element={<UpdateMov/>}/>
            <Route path='/CPass' element={<CPass/>}/>
            <Route path='/video' element={<Video />}/>
            <Route path='/showMovies' element={<ShowMovies />}/>
            <Route path='/sliderMovie' element={<MoviesSlider />}/>
            <Route path='/favourite' element={<FavouriteList />}/>
            <Route path='/favouriteMovies' element={<ShowFav/>} />
            <Route path='/comedy' element={<Comedy/>} />
            <Route path='/searchMovies' element={<SearchMov/>} />
            <Route path='/userSelfInfo' element={<UserSelfInfo/>} />
            {/* <Route path="*" element={<h2>404 Page Not Found</h2>} /> */}
        </Routes>
        <Box sx={{ marginBottom: '7em' }} />

    </BrowserRouter >
    );
}