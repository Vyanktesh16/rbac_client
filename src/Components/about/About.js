import React from "react";
import './about.css';
import { Link } from "react-router-dom";

const About = ({auth }) => {
    return (
        <>
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
                     { auth ? 
                    <> 
                    <li className="nav-item"><Link  to="/profile">Profile</Link></li>
                    
                    <li className="nav-item"><Link  to="/logout">LogOut</Link></li>
                     </> :
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
        <div className="about">
            <div className="half"></div>
            <div className="inner_div">
            <h1>Beyond Code – Real Value Delivered</h1>
                <p>Our ‘Beyond Code’ philosophy ensures that we invest in finding the latest and the best way to deliver real value. Of course, we write the best code to meet your needs. But we also love to push boundaries and try something new. Along with numerous “first of its kind” solutions for our customers, we have always invested in our IP assets and open source contributions to help deliver a faster time to market.
                    Years of working with technology giants, enterprises, and innovative startups has helped us in understanding the challenges and pains you face at each stage of the growth journey. We are your technology partner that looks beyond code.</p>
            </div>
        </div>
        </>
    );
}

export default About;