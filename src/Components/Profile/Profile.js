import React, { useEffect, useState } from "react";
import './profile.css';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";


const Profile = ({ checkAdmin }) => {
    const history = useHistory();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [id, setId] = useState();
    const [role , setrole] = useState();

    useEffect(async () => {
        try {
            const res = await axios.get('http://localhost:8000/profile', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });


            console.log(res.data);
            if (!res.status === 200) {
                throw new Error(res.error);
            }

            // setUser(res.data);
            setName(res.data[0].name);
            setEmail(res.data[0].email);
            setId(res.data[0].id);
            setrole(res.data[1]);
        } catch (error) {
            console.log(error);
            history.push('/login')
        }
    }, []);

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
                        <li className="nav-item"><Link to="/profile">Profile</Link></li>

                        {checkAdmin ? <li className="nav-item"><Link to="/admin/manage">ManageUser</Link></li> : <></>}

                        <li className="nav-item"><Link to="/logout">LogOut</Link></li>

                    </ul>
                </div>
            </nav>

            <div className="profile">
                <div className="profile_image_left"></div>

                <div className="details">
                    <div className="inner_detail">

                        <h1>Profile</h1>
                        <h3><span>Id :</span> {id}</h3>
                        <h3><span>Name :</span> {name} </h3>
                        <h3><span>Email : </span> {email}</h3>
                        <h3><span>Role : </span> {role}</h3>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile;