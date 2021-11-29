import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useHistory } from 'react-router';
import axios  from 'axios';

const Loginwfb = () =>{

    const history = useHistory();
    const responseFacebook = async (response) => {
        console.clear();
        console.log(response.name," + " ,response.email ," + ", response.id);
         const res = await axios.post(`http://localhost:8000/loginwfb/${response.name}/${response.email}/${response.id}`);
         const data = res;
         console.log(data);
         alert(res.data.message);
        history.push('/')

      }
       
      const componentClicked = (response) =>{
          console.log(response);
        //  history.push('/')

        }

        const failure = () =>{
            alert("Login Failed");
            history.push('/')

        }
      return(
          <>
                <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_ID}
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} 
                onFailure = {failure}
                className = "btnGoogle"
                >
                </FacebookLogin>
        </>
      );
}

export default Loginwfb;