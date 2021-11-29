import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css"
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";
import Manage from "./Components/homepage/Manage";
import About from "./Components/about/About";
import ErrorPage from "./Components/ErrorPage/Error";
import "./nav.css"
import MainPage from "./Components/homepage/Mainpage";
import Profile from "./Components/Profile/Profile";
import Logout from "./Components/logout/Logout";
import axios from "axios";
import Alert from './Components/homepage/Alert';

const App = () => {
 
  const [auth ,setauth] = useState(false);
  const [checkAdmin , setAdmin] = useState(false);
 
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
}, []);

 console.log( "User Athenticated" , auth);
  
  return (<>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <MainPage auth={auth} setauth={setauth} setAdmin={setAdmin} />

          </Route>
          <Route exact path="/login">
          <Login /> 
          </Route>

          <Route exact path="/signup">
          <Register /> 
          </Route>

          <Route exact path="/admin/manage">
          {console.log("Login status : " ,auth ,"Admin : ",checkAdmin)}
             {
                auth && checkAdmin ? <Manage auth={auth}/>
              : <><Profile/> </>
            }
          </Route>

          <Route exact path="/about">
            <About auth={auth} />

          </Route>

          <Route exact path="/profile">
            {
               auth ? <Profile checkAdmin={checkAdmin}/>
              : <MainPage />
            }
          </Route>

          <Route exact path="/logout">
          {
               auth ? <Logout setAdmin={setAdmin} setauth={setauth}/>
              : <Login />
            }
          </Route>

          <Route >
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>


  </>);
}

export default App;

//--openssl-legacy-provider