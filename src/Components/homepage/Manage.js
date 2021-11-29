import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import "./manage.css"
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true ;

const Manage = () => {
    const [user, userList] = useState([]);

    const getList = async () => {
        try {
            console.log("Im in fetch state");
            const response = await axios.get("http://localhost:8000/manage" , {withCredentials: true});
            userList(response.data);
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getList();
    }, []);


    const deleteuser = async (id) => {
        try {
            axios.post(`http://localhost:8000/manage/${id}`)
                .then(res => {
                    alert(res.data.message)
                    window.location.reload();
                })

        } catch (error) {
            console.log(error);
        }
    }


    const [editrole, updaterole] = useState('client');

    const handlevent = (e) => {
        console.log(e.target.value);
        updaterole(e.target.value);
    }

    const edit = async (id) => {
        try {
            console.log(editrole);
            const role = editrole;
            axios.post(`http://localhost:8000/addrole/${id}/${role}`)
                .then(res => {
                    alert(res.data.message)
                })
        } catch (error) {
            console.log(error);
        }
    }

    let str = "";

    const viewrole = async (id) => {
        try {
            const res = await axios.post(`http://localhost:8000/viewrole/${id}`);


            for (let i = 0; i < res.data.length; i++)
                str = res.data[i].role + " & " + str;

            const temp = str.substring(0, str.length - 2).toUpperCase();
            str = "";
            alert(temp);

        } catch (error) {
            console.log(error);
        }
    }
      const refreshPage = ()=>{
     window.location.reload();
  }

    return (
        <Fragment>
           <nav className="navbar navbar-expand-lg navbar-b bg-dark navbar-custom">
            <Link className="navbar-brand"  to="/">GS-LAB</Link>
            
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav m-auto">
                    <li className="nav-item active">
                        <Link to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link  to="/about">About</Link>
                    </li>
                    <li className="nav-item"><Link  to="/profile">Profile</Link></li>
                    
                    <li className="nav-item"><Link  to="/admin/manage">ManageUser</Link></li>
                    

                    <li className="nav-item"><Link  to="/logout">LogOut</Link></li>
                    
                </ul>
            </div>
            </nav>
            {""}
            <div className="main">
                <h1 className="h1manage">Manage User</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map(item => (

                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button className="btn" onClick={() => viewrole(item.id)}>view role</button>
                                    </td>
                                    <td>
                                        <select defaultValue="client" onChange={handlevent}>
                                            <option value="admin" >admin</option>
                                            <option value="client" >client</option>
                                        </select>
                                        <button className="btn" onClick={() => edit(item.id)}>Add role</button>

                                    </td>
                                    <td>
                                        <button className="btn-danger" onClick={() => deleteuser(item.id)}>delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button onClick={refreshPage}>Refresh</button>
            </div>
        </Fragment>
    );
}

export default Manage;