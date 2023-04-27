import React, { useEffect, useState } from 'react'
import { IconButton, Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, Container, Typography } from '@mui/material'
import { TextField, Button } from '@mui/material';

const AllUsers = () => {

    const [users,setUsers]=useState([]);
    const [show, setShow] = useState();
    const [isBlock,setBlock]=useState(false)

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

    const updateUsers = async (id) => {

       
        let data = await fetch('http://127.0.0.1:6969/update-users/' + id, {
          method: "POST",
          body: JSON.stringify({ isBlock }),
          headers: {
            "Content-type": "application/json",
    
            "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
    
          }
        })
        let result = await data.json()
        if (result.modifiedCount) {
    
          alert('Updated')
          window.location.reload()
         
        }
      }

    const handleToggle = () => {
        setBlock((e) => !e);
       

       
       
      };
  return (
    <Container>
    {
         
    
        show ? <>
            <Typography Span variant={'h5'} sx={{ marginTop: '5em' }}> Available Users<br/> <Typography variant='h6' style={{border:"2px solid gray",padding:5,width:"25px"}} >{users.length-1}</Typography></Typography >
            <TableContainer component={Paper} sx={{ marginTop: '2em' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                        <TableCell></TableCell>
                            <TableCell>User's Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                              
          
                      users.map((e,index) => {
                         
                    
                               
                            return (
                              
                                <TableRow key={e._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{e.name}</TableCell>
                                    <TableCell>{e.email}</TableCell>
                                    <TableCell>
                                    {e.name==="admin"? true: e.isBlock? <Button variant='contained' onClick={()=>{handleToggle();updateUsers(e._id)}} color='secondary' size='large' sx={{ float: 'right', margin: '2em 0', marginRight: '5em' }}>Unblock</Button>:<Button variant='contained' onClick={()=>{handleToggle();updateUsers(e._id)}} color='secondary' size='large' sx={{ float: 'right', margin: '2em 0', marginRight: '5em' }}>Block</Button>}
 
                                    
                                    
                                    </TableCell>
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