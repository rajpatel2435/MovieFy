import React from 'react'
import { useState } from 'react';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

function GenMovies({ item: e }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavourite, setFavourite] = useState(false)
  const navigate = useNavigate()
  const trailer = "https://youtu.be/BzUv298D3uk?list=RDBzUv298D3uk"
  


  let userId = JSON.parse(localStorage.getItem('user'))._id
  console.log(userId);
  const updateProduct = async (id) => {

    let favUserId = JSON.parse(localStorage.getItem('user'))._id
    let data = await fetch('http://127.0.0.1:6969/favourite-product/' + id, {
      method: "POST",
      body: JSON.stringify({ isFavourite,favUserId }),
      headers: {
        "Content-type": "application/json",

        "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`

      }
    })
    let result = await data.json()
    console.log("result"+JSON.stringify(result))
    if (result.modifiedCount) {

      alert('Updated')
      window.location.reload()
     
    }
  }


  const handleToggle = () => {
    setFavourite((e) => !(e));
    updateProduct(e._id);
   
  };

  return (
    <>

      <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}  >
        {e.file.contentType == "image/jpeg" ||
          e.file.contentType == "image/png" ? (
          <>
            <div className="listitem">

              <Box
                component="img"
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  margin: 10,
                }}
                alt={e.name}
                src={
                  e.file.contentType == "image/jpeg"
                    ? require(`../Images/${e.filename}`)
                    : require("../Images/moviefy.jpeg")
                }

              />
              {isHovered && (
                <>
                  <div
                    style={{
                      marginTop: "-240px",
                      height: "auto",
                      width: 350,
                      maxHeight: { xs: 300, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                  >
                    <Link
                      to='/video'
                      state={{ videoTitle: e.filename }} // <-- state prop
                      key={e.name}
                    >
                      <Box
                        component="img"
                        sx={{
                          height: 233,
                          width: 350,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginLeft: 10,
                          marginTop: -2
                        }}
                        alt={e.name}
                        src={
                          e.file.contentType == "image/jpeg"
                            ? require(`../Images/${e.filename}`)
                            : require("../Images/moviefy.jpeg")
                        }

                      />
                    </Link>

                    <div style={{ marginLeft: "80px" }}>
                      <div className="itemInfoTop" >
                        {e.name}
                      </div>
                      <div className="desc">
                      {e.description}
                      </div>
                      
                    </div>
                    <Link
                      to='/video'
                      state={{ videoTitle: e.filename }} // <-- state prop
                      key={e.name}
                    >
                    <Button variant='contained'  color='secondary' size='large' sx={{ float: 'right', margin: '2em 0', marginRight: '5em' }}>Watch Now</Button>
                    </Link>
                    {/* {e.isFavourite? <Button variant='contained' onClick={handleToggle} color='secondary' size='large' sx={{ float: 'right', margin: '2em 0', marginRight: '5em' }}>Remove</Button>:<Button variant='contained' onClick={handleToggle} color='secondary' size='large' sx={{ float: 'right', margin: '2em 0', marginRight: '5em' }}>ADD</Button>} */}

                  </div>
                </>
              )}

            </div>
          </>
        ) : (
          <>
            <div
              className="listItem"
              style={{ marginLeft: "80px", marginTop: "50px", }}
            //   style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}

            >
              <div style={{
                marginTop: "50px",
                height:250
              }}>

                <video
                  src={require(`../video/${e.filename}`)}
                  style={{


                    height: 200,
                    width: 260,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },

                    marginTop: -2
                  }}

                  controls
                  muted
                  loop
                ></video>
                {isHovered && (
                  <>
                    <div
                      style={{
                        marginTop: "-200px",
                        height: "auto",
                        width: 200,
                        maxHeight: { xs: 300, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                        marginRight: 40
                      }}
                    >
                      <Link
                        to='/video'
                        state={{ videoTitle: e.filename }} // <-- state prop
                        key={e.name}
                      >
                        <video
                          src={require(`../video/${e.filename}`)}

                          style={{
                            height: 200,
                            width: 260,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 200, md: 250 },
                          }}

                          muted
                          loop
                        ></video>
                      </Link>
                      <div
                        className="itemInfo"
                        style={{ marginTop: "-25px" }}
                      >
                        <div className="itemInfoTop">
                          {e.name}
                        </div>
                        <div className="desc">
                          {e.description}
                        </div>

                      </div>
                 
                      <Link
                      to='/video'
                      state={{ videoTitle: e.filename }} // <-- state prop
                      key={e.name}
                    >
                    <Button variant='contained'  color='secondary' size='large' sx={{ float: 'right', margin: '2em 0', marginLeft: '5em',width:"200px" }}>Watch Now</Button>
                    </Link>

                    </div>
                  </>
                )}
              </div>


            </div>
          </>
        )}


      </div>


    </>
  )
}

export default GenMovies