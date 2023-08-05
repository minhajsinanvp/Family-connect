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

    return (
        <userContext.Provider value={[state, setState]}>

            {children}
        </userContext.Provider>
    )
} 
  

export {userContext, UserProvider};