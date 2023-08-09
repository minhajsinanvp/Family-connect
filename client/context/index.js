import Router from "next/router";
import { useState, createContext, useEffect } from "react";
import axios from "axios";

const userContext = createContext();

const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: {},
        token: ""
    });

    // grabbing the token and user from local storage
    useEffect(() => {
        // Parse auth data from local storage
        const authData = JSON.parse(window.localStorage.getItem('auth'));
        // console.log(authData);
        setState(authData);
        const token = state && state.token ? state.token : "";
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

 


        // Set default Axios configuration

    }, [state && state.token]);


    const token = state && state.token ? state.token : "";
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;




    // Commented out this line since it's already set in the useEffect above
    // axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Enable this interceptor to handle response errors
    // axios.interceptors.response.use(
    //     function (response) {
    //         return response;
    //     },
    //     function (error) {
    //         let res = error.response;

    //         if (res.status === 401) { // Unauthorized
    //             setState(null);
    //             window.localStorage.removeItem('auth');
    //             Router.push("/login");
    //         }

    //         return Promise.reject(error);
    //     }
    // );

    return (
        <userContext.Provider value={[state, setState]}>
            {children}
        </userContext.Provider>
    );
}

export { userContext, UserProvider };
