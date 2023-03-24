import React, { useState, useEffect } from "react";
import { Button, Container, Grid, TextField, Typography,Hidden} from "@mui/material";
import {  useNavigate } from "react-router-dom";

const FileUpload = () => {

  // use usestas to set the value after some process
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [fileErr, setFileErr] = useState(false);

  useEffect(() => {}, []);

  const navigate = useNavigate();

  const sty = () => {
    return {
      margin: "0.5em",
      width: "50%",
    };
  };

  const handleSubmit = async (req,res) => {

// console.log("requested body ------"+req.body.file);
//     console.log("file req "+file)

    if (req.file.filename && req.file) {
        let data = await fetch('http://127.0.0.1:6969/upload', {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify( req.file.filename, req.file ),
            headers: {
              "Content-type": "application/json",
                  "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        console.log("data new"+ data.json())
        let final = await data.json()
        if (final.fieldName) {
            navigate('/')
        } else {
            alert('Error occured while adding product')
        }
    }
}

let userId = JSON.parse(localStorage.getItem('user'))._id
console.log(userId);
  return (
    <Container style={{marginTop:'100px'}}>
      <form action="http://127.0.0.1:6969/upload/" method="post"  enctype="multipart/form-data" sx={{ width: "50%" }}>

        <Typography variant="h3" sx={{ padding: "0.5em" }}>
          Upload Movies
        </Typography>
        <Grid container direction={"column"}>
          <Grid item>
            <TextField
            name="name"
              variant="outlined"
              error={nameErr}
              helperText={nameErr ? "Enter a valid Name" : null}
              type={"text"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value === "" || e.target.value === null) {
                  setNameErr(true);
                } else {
                  setNameErr(false);
                }
              }}
              label="Name"
              sx={sty}
              required
            />
          </Grid>

            <input
            name="userId"
  
              type={"hidden"}
              value={userId}
   
     

           
            />
    
          <Grid item>
            <TextField
name="file"
              error={fileErr}
              helperText={fileErr ? "Enter a valid File" : ""}
              type={"file"}
              value={file}
              onChange={(e) => {
                setFile(e.target.value);
                if (e.target.value === "" || e.target.value === null) {
                  setFileErr(true);
                } else {
                  setFileErr(false);
                }
              }}
          
              sx={sty}
              required
            />
          </Grid>
          <Grid item>
            {/* <Button
              size="large"
              variant="contained"
              onClick={handleSubmit}
              sx={{ margin: "1em" }}
            >
              Submit File
            </Button>  */}
        <input type="submit" name="submit" style={{padding:'10px',width:'80px',marginLeft:'10px',backgroundColor:'black',color:'white'}} value="submit"/>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FileUpload;
