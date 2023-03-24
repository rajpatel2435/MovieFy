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
            {/* <Route path="*" element={<h2>404 Page Not Found</h2>} /> */}
        </Routes>
        <Box sx={{ marginBottom: '7em' }} />

    </BrowserRouter >
    );
}