import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const index = () => {

    const updatePassword = async (id,token) => {
        let data = await fetch('http://localhost:6969/password-reset/', {
            method: "POST",
            body: JSON.stringify({ password}),
            headers: {
                "Content-type": "application/json",
            }
        })
        let result = await data.json()
        if (result) {
 
            alert('passsword set successfully')
        
        }else{
          alert("eroro")
        }
    }
    const [password, setpassword] = useState('')


    const [passwordErr, setPasswordErr] = useState(false)






    const sty = () => {
        return ({
            margin: '0.5em',
            width: '50%'
        })
    }

    



    return (
        <Container>
            <form sx={{ width: '50%' }} action="" method='post' >
                <Typography variant='h3' sx={{ padding: '0.5em' }}>Login</Typography>
                <Grid container direction={'column'} >
        
          
                    {/* <Grid item >
                        <TextField variant='outlined' error={passwordErr} helperText={passwordErr ? 'Enter a valid Email' : null} type={'password'} value={password} onChange={(e) => { setpassword(e.target.value); if (e.target.value === '' || e.target.value === null) { setPasswordErr(true) } else { setPasswordErr(false) } }} label='Password' sx={sty} required />
               </Grid> */}
               <Grid item >
               <TextField 
        type="password"
        id="password"
        name="password"
        
        placeholder="New Password"
        onChange={(event) =>
          setpassword(event.target.value)
        }
        sx={sty}
      />
         </Grid>
                    <Grid item>
                        {/* <Button size='large' variant='contained' onClick={updatePassword} sx={{ margin: '1em' }}>Reset Password</Button> */}

                        <input type="submit" name="submit" style={{padding:'10px',width:'80px',marginLeft:'10px',backgroundColor:'black',color:'white'}} value="submit"/>
                 </Grid>

         
              
                </Grid>
            </form >
        
        </Container>
    )
}

export default index