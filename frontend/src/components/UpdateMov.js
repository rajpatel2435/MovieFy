import { Button, Container, TextField, Box } from '@mui/material'
import { IconButton, Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, Typography } from '@mui/material'
import Collapse from '@mui/material/Collapse';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import React, { Fragment, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const UpdateMov = () => {
    const [key, setKey] = useState('')
    const [err, setErr] = useState(false)
    const [products, setProducts] = useState([])
    const [showRes, setShowRes] = useState(false)
    const [open, setOpen] = useState(false);
    const [rowNo, setRowNo] = useState()
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [genreErr,setGenreErr]=useState(false)
    const [description, setDescription] = useState('')


    const searchProduct = async () => {
        if (key.length === 0) {
            setErr(true)
        } else {
            let data = await fetch('http://127.0.0.1:6969/search/' + key, {
                method: "POST",
                headers: {
                    "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })

            let result = await data.json();
            console.log(result.length+"lengthh");
    
                if(result.result){
                setProducts(result)
                setShowRes(true)
       
            } else {
           
                    setProducts(result)
                    setShowRes(true)
                 
            }
        }
    }

    const deleteItem = async (pid) => {
        let data = await fetch('http://127.0.0.1:6969/getFile/' + pid, {
            method: "DELETE",
            headers: {
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        let result = await data.json()
        if (result.deletedCount) {
            setOpen(false)
            searchProduct()
         
          
            alert('Deleted')
        } else {
            alert('Error deleting')
        }
    }

    const sty = () => {
        return ({
            margin: '0.5em',
            width: '30%'
        })
    }

    const showEditForm = async (id) => {
        let data = await fetch('http://127.0.0.1:6969/search-id/' + id, {
            method: "POST",
            headers: {
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        })
        let result = await data.json()
        if (result.result) {
            alert('Something went wrong')
        } else {
            setName(result[0].name)
            setGenre(result[0].genre)
            setDescription(result[0].description)
        }
    }


const updateProduct = async (id) => {
        let data = await fetch('http://127.0.0.1:6969/update-product/' + id, {
            method: "POST",
            body: JSON.stringify({ name, genre, description }),
            headers: {
                "Content-type": "application/json",

                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        let result = await data.json()
        if (result.modifiedCount) {  
            setOpen(false)
            searchProduct()
            alert('Updated')
        }
    }
    let auth = localStorage.getItem('user');
    let userCid=JSON.parse(auth)._id;

    const showCom = () => {
        return (products.result ?
            <Box>
                <Typography variant={'h5'} sx={{ marginTop: '2em' }}>No items found...</Typography>
            </Box>
            :
            <Box>
                
             
                <Typography variant={'h5'} sx={{ marginTop: '4em' }}>Search Results ({products.length} Products Find)</Typography>
                <TableContainer component={Paper} sx={{ marginTop: '2em' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Name of Movies</TableCell>
                                <TableCell>Images</TableCell>
                                <TableCell>Genre</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {
                      
                            products.map((e, index) => {

if(e.userId===userCid){
    

  
                                return (<Fragment key={e._id}>
                                    <TableRow  >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{e.name}</TableCell>
                                        <TableCell>{e.filename}</TableCell>
                                        <TableCell>{e.genre}</TableCell>
                                        <TableCell>{e.description}</TableCell>
                                        <TableCell width={50} ><IconButton onClick={() => { setOpen(!open); setRowNo(index); showEditForm(e._id) }} color='secondary'><EditIcon size='large' sx={{ cursor: 'pointer' }} /></IconButton></TableCell>
                                        <TableCell width={50} ><IconButton onClick={() => deleteItem(e._id)} color='error'><DeleteOutlineIcon size='large' sx={{ cursor: 'pointer' }} /></IconButton></TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={open && rowNo === index} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1, textAlign: 'center' }}>
                                                    <Typography variant="h6" gutterBottom component="div" color='secondary'>
                                                        Edit The Product
                                                    </Typography>
                                
      <FormControl sx={sty}>
        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
        <Select
        name="genre"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={genre}
          label="Genre"
          onChange={(e) => {
            setGenre(e.target.value);
            console.log("gennnnnn"+e.target.value)
            if (e.target.value === "" || e.target.value === null) {
              setGenreErr(true);
            } else {
              setGenreErr(false);
            }
          }}
          error={genreErr}
          helperText={genreErr ? "Enter a valid Genre" : null}
          required
        
        >
          <MenuItem value="Action">Action</MenuItem>
          <MenuItem value="Comedy">Comedy</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
        </Select>
      </FormControl>

                                                    <TextField variant='outlined' color='secondary' type={'text'} onChange={(e) => setName(e.target.value)} value={name} label='Product Name' sx={sty} required />

                                                    <TextField variant='outlined'  color='secondary' type={'text'} onChange={(e) => setDescription(e.target.value)} value={description} label='Description' sx={sty} required />
                                                    <Button variant='contained' onClick={() => updateProduct(e._id)} color='secondary' size='large' sx={{ float: 'right', width: '10%', margin: '2em 0', marginRight: '5em' }}>Update</Button>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </Fragment>
                                )
    } return null;
    })}
      {/* <p>Total Products:  {products.length}</p> */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box >
        )
    }


    return (
        <Container>
            <Box sx={{ display: 'flex',marginTop:'100px' }}>
                <TextField onKeyPress={(ev) => ev.key === 'Enter' ? searchProduct() : null} variant='outlined' onChange={(e) => { if (e === '') { setErr(true) } else { setKey(e.target.value); setErr(false) } }} label={err ? 'Enter a valid product to search...' : 'Search...'} error={err} sx={{ width: '50%' }} value={key} />
                <IconButton onClick={searchProduct} size='large' ><SearchIcon fontSize='large' color='primary' /></IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={() => { setShowRes(false); setKey('') }}>Clear Search</Button>
            </Box>
            <Box>
                {showRes ? showCom() : null}
            </Box>
        </Container >
    )
}

export default UpdateMov