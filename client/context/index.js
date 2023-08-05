import axios from "axios";
import Router from "next/router";
import { useState, createContext, useEffect } from "react";



const userContext = createContext();



const UserProvider = ({children}) =>{
    const [state,setState] = useState({
        user: {},
        token : ""
    })

    // grabbing the token and user from local storage
    useEffect(()=>{

        setState(JSON.parse(window.localStorage.getItem('auth')))

    },[])

    axios.interceptors.response.use(function (response) {
        // Do something before request is sent
        return response;
      }, function (error) {
        // Do something with request error
        let res = error.response;
       

            setState(null);
            window.localStorage.removeItem('auth');
            // Router.push("/login")    

        
      } )

    return (
        <userContext.Provider value={[state, setState]}>

            {children}
        </userContext.Provider>
    )
} 
  

export {userContext, UserProvider};