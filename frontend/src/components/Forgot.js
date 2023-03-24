import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const Forgot = () => {

    const updatePassword = async () => {
        let data = await fetch('http://127.0.0.1:6969/password-reset/', {
            method: "POST",
            body: JSON.stringify({ email}),
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
    const [email, setEmail] = useState('')


    const [emailErr, setEmailErr] = useState(false)


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
                        <TextField variant='outlined' error={emailErr} helperText={emailErr ? 'Enter a valid Email' : null} type={'email'} value={email} onChange={(e) => { setEmail(e.target.value); if (e.target.value === '' || e.target.value === null) { setEmailErr(true) } else { setEmailErr(false) } }} label='Email' sx={sty} required />
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

export default Forgot