import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


const Register = () => {
    const [user, setreg] = useState({
        name: "",
        email: "",
        pass: "",
        repass: ""
    })

    const history = useHistory();
    const eventHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setreg({
            ...user,
            [name]: value
        })
    }

    const register = async () => {
        const { pass, repass } = user;
        if ((pass === repass)) {
             
             axios.post(`http://localhost:8000/register/${user.name}/${user.email}/${user.pass}`)
                 .then(res => {
                     alert(res.data.message)
                     history.push("/login")
                 }).catch(Error =>{
                     console.log(Error);
                 })
        }
        else {
            alert("Password do not match");
        }
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
            <div className="register">

                <div className="card_image_left"></div>

                <div className="register_input">
                    <h1>Sign Up</h1>

                    <input name="name" value={user.name} type="email" onChange={eventHandle} placeholder="Enter Full Name" ></input> <br />
                    <input name="email" value={user.email} type="email" onChange={eventHandle} placeholder="Enter Email" ></input> <br />
                    <input name="pass" value={user.pass} type="password" onChange={eventHandle} placeholder="Enter Password" ></input> <br />
                    <input name="repass" value={user.repass} type="password" onChange={eventHandle} placeholder="Confirme Password" ></input> <br />
                    <button className="register_button" onClick={register}>SignUp</button> <br />

                    <div className="loginhere">Already have account ? <Link to="/login">Login Here</Link></div>

                </div>

            </div>
        </>
    );

}

export default Register;
