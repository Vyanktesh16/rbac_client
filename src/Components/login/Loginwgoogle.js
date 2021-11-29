import React from "react";
import axios from 'axios';
import {GoogleLogin} from 'react-google-login';
import './google.css';
import { useHistory } from "react-router";


const Loginwgoogle = () => {
 const history =useHistory();
  const handleLogin = async (googleData) => {
   
    let token= googleData.tokenId;
    const res = await axios.post(`http://localhost:8000/api/v1/auth/google/${token}`);
    const data = res;
    console.log(data);
    alert(res.data.message);
    
    history.push('/');
  }

 const handleLoginFail = () =>{
  alert("Login Failed Please try again");
    
  history.push('/login');
 }
  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_ID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        className="btnGoogle"
        onFailure={handleLoginFail}
        cookiePolicy={'single_host_origin'}
      />

 
  
    </>
  );
}

export default Loginwgoogle ;