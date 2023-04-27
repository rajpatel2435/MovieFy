import React, { useEffect, useState } from 'react'
import { Button, Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

function Favorites() {

    const [favBook, setFavBook] = useState([])
    const [show, setShow] = useState()

    let auth = JSON.parse(sessionStorage.getItem('user'))

    const navigate = useNavigate()

    useEffect(() => {
        getMooviesInfo()
    }, [])




    const getMooviesInfo = async () => {

        let id = JSON.parse(localStorage.getItem('user'))._id
        let availBooks = await fetch(`http://127.0.0.1:6969/user-movies/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        let favorite = await availBooks.json()

        if (favorite.length > 0) {

            let data = await fetch('http://127.0.0.1:6969/getFile', {
                method: "GET",
                headers: {
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let result = await data.json()


            const intersection = result.filter(element => favorite.includes(element._id));

            setShow(true)
            setFavBook(intersection)

        } else {
            setShow(false)
        }
    }


    const deleteItem = async (pid) => {

        let newFav = favBook.map(e => e._id)


        newFav = newFav.filter(item => item !== pid)


 
        let id = JSON.parse(localStorage.getItem('user'))._id


        let data = await fetch(`http://127.0.0.1:6969/update-fav/${id}`, {
            method: 'post',
            body: JSON.stringify({ favorites: newFav }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })
        let userInfo = await data.json()
        if (userInfo) {
            if (userInfo.modifiedCount) {
                getMooviesInfo()
            } else {
                alert('Something wrong')
            }
        } else {
            alert('Something went wrong, Try again later!')
        }


    }

    return (
        <Container>
   
                {show ? <>
                    <Typography sx={{ fontFamily: 'Roboto', fontSize: '3em', fontWeight: 'bold',marginTop:'100px' }}>Your Favorites 🎦</Typography>
                    <TableContainer component={Paper} sx={{ marginTop: '2em' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>Description</TableCell>
                                   
                                    <TableCell />
<TableCell/>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {favBook.map(e => {
                                    return (
                                        <TableRow key={e._id}>

                                            <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1em' }}>{e.name}</TableCell>
                                            <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1em' }}>{e.description}</TableCell>
                                            <TableCell  ><Button variant={'contained'} color='error' onClick={() => deleteItem(e._id)}>Remove Movie</Button></TableCell>
                                            <Link
                      to='/video'
                      state={{ videoTitle: e.filename }} // <-- state prop
                      key={e.name}
                    >  <TableCell  ><Button variant={'contained'} style={{backgroundColor:'black'}}>Watch Now</Button></TableCell>
                          </Link>                  

                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                    </TableContainer>

                </> : <Typography variant={'h5'} sx={{ marginTop: '5em' }}>No Movies in Favorites!</Typography>}
        
        </Container >
    )
}

export default Favorites