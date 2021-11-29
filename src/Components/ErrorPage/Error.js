import React from "react";
import "./error.css";

const Error = () =>{
    return(
        <>
            <div className="error">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>Sorry.. Page Not Found</h2>
                    <p className="mb-5">
                        The page you are looking for might have been removed 
                         or it's temporarily unavailbale
                    </p>
                    <a href="/">Back To Homepage</a>
            </div>
        </>
    );
}

export default Error;