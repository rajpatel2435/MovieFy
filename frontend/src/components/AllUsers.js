import React, { useEffect, useState } from 'react'
import { IconButton, Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, Container, Typography } from '@mui/material'


const AllUsers = () => {

    const [users,setUsers]=useState([]);
    const [show, setShow] = useState()

    useEffect(() => {
        getUsers()
    }, [])
 
    const getUsers= async () => {
        
        let data = await fetch('http://127.0.0.1:6969/users', {
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

            setUsers(result)
            console.log(result[0].userId);

        }

    }
  return (
    <Container>
    {
         
    
        show ? <>
            <Typography Span variant={'h5'} sx={{ marginTop: '5em' }}> Available Users<br/> <Typography variant='h6' style={{border:"2px solid gray",padding:5,width:"25px"}} >{users.length-1}</Typography></Typography >
            <TableContainer component={Paper} sx={{ marginTop: '2em' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>User's Name</TableCell>
                            <TableCell>Email</TableCell>
                           
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                              
                        //    console.log({(JSON.parse(auth).name)});
                            
                            // console.log("auth Id"+ auth._id);
                            // console.log(userId);
                     
                      users.map(e => {
                         
                    
                               
                            return (
                              
                                <TableRow key={e._id}>
                               
                                    <TableCell>{e.name}</TableCell>
                                    <TableCell>{e.email}</TableCell>
                                    
                                </TableRow>
                        
                            )
                    
                        }
                        
                            )}
                          
                    </TableBody>
                </Table>
            </TableContainer>
        </> : <Typography variant={'h5'} sx={{ marginTop: '5em' }}>No Users Available</Typography>
    }
</Container >
  )
}

export default AllUsers