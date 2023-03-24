import React, { useEffect, useState } from 'react'
import { IconButton, Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, Container, Typography } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const History = () => {

    const [products, setProducts] = useState([])
    const [show, setShow] = useState()

    useEffect(() => {
        getProducts()
    }, [])
 


    const getProducts = async () => {
        
        let data = await fetch('http://127.0.0.1:6969/products', {
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
            console.log(result[0].userId);

        }

    }

    const deleteItem = async (pid) => {
        let data = await fetch('http://127.0.0.1:6969/product/' + pid, {
            method: "DELETE",
            headers: {
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        let result = await data.json()
        if (result.deletedCount) {
            getProducts();
     alert('Deleted');
      
        } else {
            alert('Error deleting')
        }
    }
    let auth = localStorage.getItem('user');
    let userCid=JSON.parse(auth)._id;

    return (
        <Container>
            {
                 
            
                show ? <>
                    < Typography variant={'h5'} sx={{ marginTop: '5em' }}> Products Available</Typography >
                    <TableContainer component={Paper} sx={{ marginTop: '2em' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name of Product</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                      
                                //    console.log({(JSON.parse(auth).name)});
                                    
                                    // console.log("auth Id"+ auth._id);
                                    // console.log(userId);
                             
                                products.map(e => {
                                 
                                    if(e.userId===userCid){
                                       
                                    return (
                                        <TableRow key={e._id}>
                                            <TableCell>{e.name}</TableCell>
                                            <TableCell>{e.price}</TableCell>
                                            <TableCell>{e.company}</TableCell>
                                            <TableCell width={50} onClick={() => deleteItem(e._id)}><IconButton color='error'><DeleteOutlineIcon color='error' size='large' sx={{ cursor: 'pointer' }} /></IconButton></TableCell>
                                        </TableRow>
                                    )
                                    }return null;
                                    }
                                
                                    )}
                                  
                            </TableBody>
                        </Table>
                    </TableContainer>
                </> : <Typography variant={'h5'} sx={{ marginTop: '5em' }}>No Products Available</Typography>
            }
        </Container >)
}

export default History