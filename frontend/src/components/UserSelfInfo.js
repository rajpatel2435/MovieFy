import { Button, Container, Grid, TextField, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function UserSelfInfo() {

    let user=localStorage.getItem('user')
console.log(JSON.parse(user)._id)
    const [name, setName] = useState(JSON.parse(user).name)
    const [email, setEmail] = useState(JSON.parse(user).email)
    const [password, setPassword] = useState(JSON.parse(user).password)
    const [nameErr, setNameErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)

    const updateUser = async (id) => {
        let data = await fetch('http://127.0.0.1:6969/update-self/' + id, {
            method: "POST",
            body: JSON.stringify({ name,email,password}),
            headers: {
                "Content-type": "application/json",

                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })

        let result = await data.json()
        console.log("result"+result)
        if (result.user) {  
           
            alert('Updated')
            localStorage.setItem("user", JSON.stringify(result.user))
            window.location.reload(false);
        }
    }
  

               
               const sty = () => {
                return ({
                    margin: '0.5em',
                    width: '120%'
                })
            }

                // console.log("auth Id"+ auth._id);
                // console.log(userId);
  return (
<>
<Container sx={{overflow:'hidden',display:"flex",justifyContent:"center",flex:"1",alignItems:'center',marginTop:"80px"}}>
            <form sx={{ width: '50%' }}>
                <Typography variant='h3' sx={{ padding: '0.5em' }}>Profile</Typography>
                <Grid container direction={'column'} >
                    <Grid item >
                        <TextField variant='outlined' error={nameErr} type={'text'} value={name} onChange={(e) => { setName(e.target.value); if (e.target.value === '' || e.target.value === null) { setNameErr(true) } else { setNameErr(false) } }} label='Name' sx={sty} required />
                    </Grid>
                    <Grid item >
                        <TextField variant='outlined' error={emailErr} type={'email'} value={email} onChange={(e) => { setEmail(e.target.value); if (e.target.value === '' || e.target.value === null) { setEmailErr(true) } else { setEmailErr(false) } }} label='Email' sx={sty} required />
                    </Grid>
                    <Grid item >
                        <TextField variant='outlined' error={passwordErr} type={'password'} value={password} onChange={(e) => { setPassword(e.target.value); if (e.target.value === '' || e.target.value === null) { setPasswordErr(true) } else { setPasswordErr(false) } }} label='Password' sx={sty} required />
                    </Grid>
                    <Grid item>
                        <Button size='large' variant='contained' onClick={()=>updateUser(JSON.parse(user)._id)}  sx={{ margin: '1em' }}>Update</Button>
                    </Grid>
                   
                </Grid>
            </form >
        </Container>
</>

  )
}

export default UserSelfInfo