import { useEffect} from "react";
import './mainpage.css';
import { Link } from "react-router-dom";
import axios from 'axios';

const MainPage = ({auth , setauth , setAdmin }) => {

       const callProfile = async () => {
        try {

       console.log(process.env);
            const res = await axios.get('http://localhost:8000/', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
    
            console.log(res.data);
            setauth(res.data);
            if (!res.status === 200) {
                throw new Error(res.error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const admin = async () =>{
      try {
          const res = await axios.get('http://localhost:8000/role', {
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
    
          setAdmin(res.data);
    
      } catch (error) {
          console.log(error);
      }
    }
    useEffect(() => {
        callProfile();
       admin();
    }, [callProfile ,admin ]);
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-b bg-dark navbar-custom">
                <Link className="navbar-brand" to="/" >GS-LAB</Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item active">
                            <Link to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about">About</Link>
                        </li>
                        {auth  ?
                            <>

                                <li className="nav-item"><Link to="/profile">Profile</Link></li>

                                <li className="nav-item"><Link to="/logout">LogOut</Link></li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link to="/login">Login</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/signup">Signup</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
            <div className="mainpage">
                <h1>Role based Access controll</h1>
                <div className="inner-div">
                    <ol>
                        <li>Express Js</li>
                        <li>React Js</li>
                        <li>Postgress with Knex js</li>
                        <li>Styling</li>
                        <li>Styling :
                            <ul>
                                <li>CSS</li>
                                <li>bootstrap</li>
                            </ul>
                        </li>
                        <li>
                            Schemas :
                            <ul>
                                <li>rbac.users</li>
                                <li>rbac.roles</li>
                                <li>rbac.userroles</li>

                            </ul>
                        </li>
                    </ol>
                </div>

            </div>
        </>
    );
}

export default MainPage;