
import { Link, useLocation } from "react-router-dom";
import '../index.css'

export default function Movie() {
  const location = useLocation();
  const { state } = location;
  const movie=location.state.videoTitle
  console.log(movie)

  return (
    <div className="watch" style={{height:'100vh',width:'97vw',marginTop:'70px'}}>
      <Link to="/">
        <div className="back" style={{fontSize:'20px'}} >
  
          <img src={require("../Images/back.png")}  style={{marginLeft:'10px',height:'40px',marginTop:'5px'}}/>
          <span>{movie}</span>
   {/* {console.log(location.state.favourtie)} */}
        </div>

      </Link>
      <video
      style={{
        width: '100%',
        height: '100%',
        objectFit:'cover'
      }}
        className="video"
        autoPlay
        progress="true"
        controls
        src={require(`../video/${movie}`)}
      />
   
    </div>
  );
}