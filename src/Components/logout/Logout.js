import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { GoogleLogout } from 'react-google-login';


const Logout = ({ setauth, setAdmin }) => {
    const history = useHistory();
    
    useEffect(() => {

        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_ID}
            buttonText="Are You sure"
        >
        </GoogleLogout>
        axios.get('http://localhost:8000/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            setauth(false);
            setAdmin(false);
            alert(res.data.message);
            history.push('/');
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <>
        </>
    )
}
export default Logout;