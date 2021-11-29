import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
//import Loginwgoogle from "./Loginwgoogle";
import FacebookLogin from 'react-facebook-login';
import Google from '../../images/google-logo.png';
import Github from '../../images/github.png';
import Facebook from '../../images/facebook-new.png';


axios.defaults.withCredentials = true;



const Login = () => {

    const history = useHistory();

    const [user, setChange] = useState({
        email: "",
        pass: ""
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setChange({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        if (user.email && user.pass) {
            axios.post(`http://localhost:8000/login/${user.pass}/${user.email}`)
                .then(res => {
                    console.log(res)
                    alert(res.data.message)
                    console.log(res.data.result);
                    history.push("/")
                }).catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
        else {
            alert("Invalid input");
        }
    }

    const responseFacebook = async (response) => {
        console.clear();
        console.log(response.name, " + ", response.email, " + ", response.id);
        const res = await axios.post(`http://localhost:8000/loginwfb/${response.name}/${response.email}/${response.id}`);
        const data = res;
        console.log(data);
        alert(res.data.message);
        history.push('/')

    }

    const componentClicked = (response) => {
        console.log(response);
        //  history.push('/')

    }

    const failure = () => {
        alert("Login Failed");
        history.push('/')

    }

    const google = () => {
        window.open("http://localhost:8000/auth/google", "_self")
        // alert(ans.data.message);   
    }
    const github = () => {

        window.open("http://localhost:8000/auth/github", "_self")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-b bg-dark navbar-custom">
                <Link className="navbar-brand" to="/">GS-LAB</Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item active">
                            <Link to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about">About</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/login">Login</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/signup">Signup</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="login">
                <h1 className="logintitle">Choose Login Method</h1>
                <div className="wrapper">
                    <div className="left">
                        <div className="loginButton google" onClick={google}>
                            <img src={Google} alt="" className="iconf " />
                            Google
                        </div>
                        <div className="loginButton github" onClick={github}>
                            <img src={Github} alt="" className="iconf " />
                            Github
                        </div>
                        <div className="loginButton facebook">
                            {/*<img src={Facebook} alt="" className="iconf " />
                        Facebook*/}
                            <FacebookLogin
                                appId={process.env.REACT_APP_FACEBOOK_ID}
                                autoLoad={false}
                                fields="name,email,picture"
                                onClick={componentClicked}
                                callback={responseFacebook}
                                onFailure={failure}
                                cssClass="my-facebook-button-class"
                                icon="fa-facebook"
                            >
                            </FacebookLogin>
                        </div>
                    </div>

                    <div className="center">
                        <div className="line" />
                        <div className="or">OR</div>
                    </div>
                    <div className="right">
                        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter Email" ></input><br />
                        <input type="password" name="pass" value={user.pass} onChange={handleChange} placeholder="Enter Password" ></input><br />
                        <button className="button" onClick={login}>Login</button>
                        <span className="registerhere">Don't have an account? <a href="/signup">Register Here</a> </span>

                    </div>
                </div>
            </div>
            {/* <div className="login">
                <h1 className="logintitle">Choose Login Method</h1>
                <div className="wrapper">
                    <div className="left">
                            <div className="loginButton google" onClick={google}>
                        <img src={Google} alt="" className="iconf " />
                        Google
                    </div>
                            <FacebookLogin
                                appId={process.env.REACT_APP_FACEBOOK_ID}
                                autoLoad={false}
                                fields="name,email,picture"
                                onClick={componentClicked}
                                callback={responseFacebook}
                                onFailure={failure}
                                className="btnGoogle"
                            >
                            </FacebookLogin>
                        </div>
                    </div>

                    <div className="center">
                        <div className="line" />
                        <div className="or">OR</div>
                    </div>
                    <div className="right">
                        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter Email" ></input><br />
                        <input type="password" name="pass" value={user.pass} onChange={handleChange} placeholder="Enter Password" ></input><br />
                        <button className="button" onClick={login}>Login</button>
                        <span className="registerhere">Don't have an account? <a href="/signup">Register Here</a> </span>


                    </div>
                </div>
            </div> */}
            {/* <div className="login">
                <div className="login_image"></div>

                <div className="second_half">
                    <h1 className="h1">Welcome back!</h1>
                    <div className="input">
                        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter Email" ></input><br />
                        <input type="password" name="pass" value={user.pass} onChange={handleChange} placeholder="Enter Password" ></input><br />
                        <button className="button" onClick={login}>Login</button>
                        <Loginwgoogle/>
                        
                        <Loginwfb/>
                        <span className="registerhere">Don't have an account? <a href="/signup">Register Here</a> </span>
                        
                    </div>

                </div>
            </div> */}
        </>
    );
}

export default Login;