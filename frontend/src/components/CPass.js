import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const CPass = () => {

    const updatePassword = async () => {
        let data = await fetch('http://localhost:6969/password-reset/641e5b5203bf51e718eb2d4e/21dfb058b5dd0a34dd7b51194e1f04a034373be7bfaf921581dd98ad68b85b61', {
            method: "POST",
            body: JSON.stringify({ password}),
            headers: {
                "Content-type": "application/json",
            }
        })
        let result = await data.json()
        if (result) {
 
            alert('passsword set successfully')
            navigate('/login')
        }
    }
    const [password, setpassword] = useState('')


    const [passwordErr, setPasswordErr] = useState(false)


    useEffect(() => {
        let auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    }, [])


    const navigate = useNavigate()

    const sty = () => {
        return ({
            margin: '0.5em',
            width: '50%'
        })
    }

    



    return (
        <Container>
            <form sx={{ width: '50%' }}>
                <Typography variant='h3' sx={{ padding: '0.5em' }}>Login</Typography>
                <Grid container direction={'column'} >
        
          
                    <Grid item >
                        <TextField variant='outlined' error={passwordErr} helperText={passwordErr ? 'Enter a valid Email' : null} type={'password'} value={password} onChange={(e) => { setpassword(e.target.value); if (e.target.value === '' || e.target.value === null) { setPasswordErr(true) } else { setPasswordErr(false) } }} label='Password' sx={sty} required />
               </Grid>
                    <Grid item>
                        <Button size='large' variant='contained' onClick={updatePassword} sx={{ margin: '1em' }}>Reset Password</Button>
                 </Grid>

                
         
              
                </Grid>
            </form >
            <Link to={'/Forgot'}>Forgot Password</Link>
        </Container>
    )
}

export default CPass