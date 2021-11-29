import React, { useEffect } from "react";
import { useHistory } from "react-router";
const Alert = () =>{
    const history = useHistory();
    useEffect(()=>{
        alert("Permission denied ... ");
        history.push('/profile');
    } ,[]);
    
    return (
        <>
        
        </>
    );
}

export default Alert;