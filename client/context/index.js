import axios from "axios";
import Router from "next/router";
import { useState, createContext, useEffect } from "react";

const userContext = createContext();

const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: {},
        token: ""
    });

    useEffect(() => {
        const storedAuth = JSON.parse(window.localStorage.getItem('auth'));
        setState(storedAuth);

        if (storedAuth && storedAuth.token) {
            axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
            axios.defaults.headers.common["Authorization"] = `Bearer ${storedAuth.token}`;
        }

        // Optional: You can add an interceptor to handle response errors globally
        axios.interceptors.response.use(
            function (response) {
                return response;
            },
            function (error) {
                let res = error.response;
                if (res && (res.status === 401 || res.status === 403)) {
                    setState(null);
                    window.localStorage.removeItem('auth');
                    Router.push("/login");
                }
                return Promise.reject(error);
            }
        );

    }, []);

    return (
        <userContext.Provider value={[state, setState]}>
            {children}
        </userContext.Provider>
    );
}

export { userContext, UserProvider };
