import { useContext, useEffect, useState } from "react";
import axios from 'axios';


import { useRouter } from "next/router";

import { LoadingOutlined } from "@ant-design/icons"
import { userContext } from "../../context";




function userRoute({ children }) {
    const [ok, setOk] = useState("")
    const router = useRouter()

    const[state,setState] = useContext(userContext)

    useEffect(() => {
        getCurrentUser()
    }, [state && state.token])


    const getCurrentUser = async () => {

        try {

            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/loggedUser`, {
                headers : {
                    "Authorization" : `Bearer ${state.token}`
                }
            })

            if(data.ok)
            {
                setOk(true)
            }


        } catch (error) {
                router.push("/login")
        }

    }

     process.browser && state === null && setTimeout(()=> {
        getCurrentUser()
     },1000)
    return !ok ? (<LoadingOutlined spin className="d-flex justify-content-center display-1 text-primary p-5"/>) : (<>{children}</>)
    
}

export default userRoute